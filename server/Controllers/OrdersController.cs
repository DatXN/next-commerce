using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Data;
using server.DTOs;
using Stripe;

namespace server.Controllers;

public class OrdersController : BaseController
{
    private readonly CommerceContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> userManager;

    public OrdersController(
        CommerceContext context,
        IConfiguration configuration,
        UserManager<User> userManager
    )
    {
        this.userManager = userManager;
        _context = context;
        _configuration = configuration;
    }

    // api/orders/
    [Authorize(Roles = "ADMIN")]
    [HttpGet]
    public async Task<ActionResult> GetOrders(
        [FromQuery] int? orderId,
        [FromQuery] string? sort,
        [FromQuery] int pn = 1
    )
    {
        const int pageSize = 10;

        var query = _context.Orders.AsQueryable();

        if (orderId.HasValue)
        {
            query = query.Where(q => q.Id == orderId);
        }

        switch (sort)
        {
            case "priceAsc":
                query = query.OrderBy(q => q.OrderTotal);
                break;
            case "priceDesc":
                query = query.OrderByDescending(q => q.OrderTotal);
                break;
            case "dateAsc":
                query = query.OrderBy(q => q.OrderDate);
                break;
            default:
                // Default sorting: latest orders (dateDesc)
                query = query.OrderByDescending(q => q.OrderDate);
                break;
        }

        var totalOrders = await query.CountAsync();

        var orders = await query
            .Skip((pn - 1) * pageSize)
            .Take(pageSize)
            .Include(o => o.Address)
            .ToListAsync();

        var orderDTOs = new List<OrderDTO>();

        foreach (var order in orders)
        {
            var orderItemDTOs = await _context.OrderItems
                .Where(i => i.OrderId == order.Id)
                .Include(i => i.Product)
                .Select(
                    item =>
                        new OrderItemDTO
                        {
                            Brand = item.Product.Brand,
                            Name = item.Product.Name,
                            ImageSrc =
                                item.Product.Images != null && item.Product.Images.Any()
                                    ? item.Product.Images.First().src
                                    : "/assets/logo.png",
                            ImageAlt =
                                item.Product.Images != null && item.Product.Images.Any()
                                    ? item.Product.Images.First().alt
                                    : item.Product.Brand,
                            Color = item.Color,
                            Size = item.Size,
                            Price = item.Price,
                            Quantity = item.Quantity
                        }
                )
                .ToListAsync();

            orderDTOs.Add(
                new OrderDTO
                {
                    OrderID = order.Id,
                    OrderDate = order.OrderDate,
                    OrderStatus = order.OrderStatus,
                    OrderTotal = order.OrderTotal,
                    OrderInvoice = order.OrderInvoice,
                    OrderTrace = order.OrderTrace,
                    Address = new AddressDTO
                    {
                        FullName = order.Address.FullName,
                        ContactNumber = order.Address.ContactNumber,
                        Country = order.Address.Country,
                        City = order.Address.City,
                        AddressLine = order.Address.AddressLine,
                        AddressLineSecond = order.Address.AddressLineSecond
                    },
                    OrderItems = orderItemDTOs
                }
            );
        }

        return Ok(
            new
            {
                PageSize = pageSize,
                PageNumber = pn,
                TotalOrders = totalOrders,
                Orders = orderDTOs
            }
        );
    }

    // api/orders/add
    [HttpPost("add")]
    public async Task<ActionResult<OrderDTO>> AddOrder([FromBody] string paymentIntent)
    {
        try
        {
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

            var paymentIntentService = new PaymentIntentService();
            var paymentIntentData = await paymentIntentService.GetAsync(paymentIntent);

            if (
                paymentIntentData.Metadata.TryGetValue("products", out var productsJson)
                && paymentIntentData.Amount == paymentIntentData.AmountReceived
            )
            {
                var user = await userManager.Users
                    .Include(u => u.Address)
                    .SingleOrDefaultAsync(u => u.UserName == User.Identity.Name);

                if (user == null || user.Address == null)
                {
                    return BadRequest();
                }

                var invoiceExist = await _context.Orders.AnyAsync(
                    o => o.OrderInvoice == paymentIntent
                );

                if (invoiceExist)
                {
                    return BadRequest("already-exist");
                }

                List<OrderItem> products = JsonConvert.DeserializeObject<List<OrderItem>>(
                    productsJson
                );

                double doubleTotalAmount = paymentIntentData.Amount / 100.0;
                decimal totalAmount = (decimal)doubleTotalAmount;

                DateTime orderDate = DateTime.Now;
                string date = orderDate.ToString("dd/MM/yyyy HH:mm:ss");

                var order = new Order
                {
                    UserID = user.Id,
                    OrderInvoice = paymentIntent,
                    OrderDate = date,
                    AddressID = user.Address.Id,
                    OrderItems = products,
                    OrderTotal = totalAmount
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                var orderItemDTOs = await _context.OrderItems
                    .Where(i => i.OrderId == order.Id)
                    .Include(i => i.Product)
                    .Select(
                        item =>
                            new OrderItemDTO
                            {
                                Brand = item.Product.Brand,
                                Name = item.Product.Name,
                                ImageSrc =
                                    item.Product.Images != null && item.Product.Images.Any()
                                        ? item.Product.Images.First().src
                                        : "/assets/logo.png",
                                ImageAlt =
                                    item.Product.Images != null && item.Product.Images.Any()
                                        ? item.Product.Images.First().alt
                                        : item.Product.Brand,
                                Color = item.Color,
                                Size = item.Size,
                                Price = item.Price,
                                Quantity = item.Quantity
                            }
                    )
                    .ToListAsync();

                var orderDTOs = new OrderDTO
                {
                    OrderID = order.Id,
                    OrderDate = order.OrderDate,
                    OrderTotal = totalAmount,
                    OrderStatus = order.OrderStatus,
                    OrderInvoice = order.OrderInvoice,
                    OrderTrace = order.OrderTrace,
                    Address = new AddressDTO
                    {
                        FullName = user.Address.FullName,
                        ContactNumber = user.Address.ContactNumber,
                        Country = user.Address.Country,
                        City = user.Address.City,
                        AddressLine = user.Address.AddressLine,
                        AddressLineSecond = user.Address.AddressLineSecond
                    },
                    OrderItems = orderItemDTOs
                };

                return Ok(orderDTOs);
            }
            else
            {
                return BadRequest("bad-payment-intent");
            }
        }
        catch (System.Exception)
        {
            return BadRequest("failed");
        }
    }
}
