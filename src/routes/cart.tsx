import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionTitle, CartItemsList, CartTotals } from "@/components";
import { useAppSelector } from "@/app/hooks";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  if (cart.length === 0) return <SectionTitle text="Empty cart" />;

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cart={cart} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />

          <Button asChild className="mt-8 w-full">
            {user ? (
              <Link to="/checkout"> Proceed to checkout</Link>
            ) : (
              <Link to="/login">Please Login</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
