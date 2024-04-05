import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/app/hooks";

export default function CartButton() {
  const { cart } = useAppSelector((state) => state.cart);
  let cartItemsNumber = 0;
  for (let i = 0; i < cart.length; i++) {
    cartItemsNumber += cart[i].quantity;
  }
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link to="/cart">
        <ShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {cartItemsNumber}
        </span>
      </Link>
    </Button>
  );
}
