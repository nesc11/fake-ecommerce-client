import { useState } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { formatAsDollars } from "@/utils";

type FormRangeProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

export default function FormRange({
  name,
  label,
  defaultValue,
}: FormRangeProps) {
  const step = 1000;
  const topPrice = 100000;
  const [maxPrice, setMaxPrice] = useState(
    () => Number(defaultValue) || topPrice,
  );
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize flex justify-between">
        {name || label}
        <span>{formatAsDollars(maxPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        value={[maxPrice]}
        max={topPrice}
        step={step}
        onValueChange={(value) => setMaxPrice(value[0])}
        className="mt-4"
      />
    </div>
  );
}
