import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import ProductAmount from "./ProductAmount";
import { useAppDispatch } from "@/app/hooks";
import { editQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { CartItem, formatAsDollars } from "@/utils";

export default function CartItemsList({ cart }: { cart: CartItem[] }) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  return (
    <div>
      {cart.map((item) => {
        return (
          <Card
            key={item.itemId}
            className="flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
            />
            <div className="sm:ml-4 md:ml-12 sm:w-48">
              <h3 className="capitalize font-medium">{item.name}</h3>
              <h4 className="mt-2 capitalize text-sm">{item.company}</h4>
              <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                color :{" "}
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: item.color,
                  }}
                ></span>
              </p>
            </div>
            <div>
              <ProductAmount
                currentQuantity={item.quantity}
                changeQuantity={(quantity: number) => {
                  dispatch(editQuantity({ itemId: item.itemId, quantity }));
                  toast({ description: "Amount Updated" });
                }}
                // mode={Mode.CartItem}
              />
              <Button
                variant="link"
                className="-ml-4"
                onClick={() => {
                  dispatch(removeFromCart(item.itemId));
                  toast({ description: "Item removed from cart" });
                }}
              >
                remove
              </Button>
            </div>
            <p className="font-medium sm:ml-auto">
              {formatAsDollars(item.price.toString())}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
