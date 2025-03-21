import { AiOutlineAim, AiOutlinePhone } from 'react-icons/ai';

type AddressDisplayProps = {
  fullName: string;
  contactNumber: string;
  country: string;
  city: string;
  addressLine: string;
  addressLineSecond?: string;
};

export default function AddressDisplay({
  fullName,
  contactNumber,
  country,
  city,
  addressLine,
  addressLineSecond,
}: AddressDisplayProps) {
  return (
    <div className="flex flex-col p-4 gap-1">
      <span className="text-lg font-semibold">Delivery Address</span>
      <div className="flex flex-col w-full bg-slate-50 rounded p-3 gap-2">
        <span className="font-semibold">{fullName}</span>
        <div className="flex items-center gap-2 text-gray-700 whitespace-break-spaces break-words">
          <AiOutlineAim color="gray" size={22} />
          <p>
            {addressLine} {addressLineSecond ? addressLineSecond : ''}
            <br />
            {city}, {country}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <AiOutlinePhone color="gray" size={22} />
          <span>{contactNumber}</span>
        </div>
      </div>
    </div>
  );
}
