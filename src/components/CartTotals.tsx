import { Card, CardTitle } from "./ui/card";
import CartTotalRow from "./CartTotalRow";
import { useAppSelector } from "@/app/hooks";

export default function CartTotals() {
  const { cart, shipping, taxPercentage } = useAppSelector(
    (state) => state.cart,
  );
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal += cart[i].price * cart[i].quantity;
  }
  const tax = taxPercentage * cartTotal;
  const orderTotal = tax + cartTotal + shipping;

  return (
    <Card className="p-8 bg-muted">
      <CartTotalRow label="Subtotal" amount={cartTotal} />
      <CartTotalRow label="Shipping" amount={shipping} />
      <CartTotalRow label="Tax" amount={tax} />
      <CardTitle className="mt-8">
        <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
}
