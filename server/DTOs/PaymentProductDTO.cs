using Newtonsoft.Json;

namespace server.DTOs;

public class PaymentProductDTO
{
    [JsonProperty("productId")]
    public int ProductId { get; set; }

    [JsonProperty("brand")]
    public string Brand { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("price")]
    public decimal Price { get; set; }

    [JsonProperty("quantity")]
    public int Quantity { get; set; }

    [JsonProperty("color")]
    public string? Color { get; set; }

    [JsonProperty("size")]
    public string? Size { get; set; }
}

public class PaymentIntentCreateRequest
{
    [JsonProperty("products")]
    public PaymentProductDTO[] Products { get; set; }
}