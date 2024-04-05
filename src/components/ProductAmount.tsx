import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "./ui/select";

type ProductAmountProps = {
  currentQuantity: number;
  changeQuantity: (quantity: number) => void;
};

export default function ProductAmount({
  currentQuantity,
  changeQuantity,
}: ProductAmountProps) {
  return (
    <>
      {/* <h4 className="font-medium mb-2">Amount : </h4> */}
      <Select
        defaultValue={currentQuantity.toString()}
        onValueChange={(value) => changeQuantity(Number(value))}
      >
        <SelectTrigger className={"w-[180px]"}>
          <SelectValue placeholder="Select a quantity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quantity</SelectLabel>
            {Array.from({ length: 10 }, (_, i) => {
              const quantity = i + 1;
              return (
                <SelectItem key={quantity} value={quantity.toString()}>
                  {quantity.toString()}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
