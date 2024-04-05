import { Separator } from "./ui/separator";
import { formatAsDollars } from "@/utils";

type CartTotalRowProps = {
  label: string;
  amount: number;
  lastRow?: boolean;
};

export default function CartTotalRow({
  label,
  amount,
  lastRow,
}: CartTotalRowProps) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatAsDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}
