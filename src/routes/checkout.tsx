import {
  Form,
  redirect,
  type LoaderFunction,
  type ActionFunction,
} from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { SectionTitle, CartTotals, FormInput, SubmitBtn } from "@/components";
import { useAppSelector } from "@/app/hooks";
import { type ReduxStore } from "@/app/store";
import { type CheckoutInfo, formatAsDollars, customFetch } from "@/utils";
import { clearCart } from "@/features/cart/cartSlice";

// Loader
export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const { user } = store.getState().user;
    if (!user) {
      toast({ description: "Please login!" });
      return redirect("/login");
    }

    return null;
  };

// Action
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data.name);
    if (!data.name || !data.address) {
      toast({ description: "Please fill all the fields!" });
      return null;
    }

    const { user } = store.getState().user;
    if (!user) {
      toast({ description: "Please login to place an order!" });
      return redirect("/login");
    }

    const { cart, shipping, taxPercentage } = store.getState().cart;
    let cartTotal = 0;
    let cartItemsNumber = 0;
    for (let i = 0; i < cart.length; i++) {
      cartTotal += cart[i].price * cart[i].quantity;
      cartItemsNumber += cart[i].quantity;
    }
    const orderTotal = taxPercentage * cartTotal + cartTotal + shipping;

    const info: CheckoutInfo = {
      name: data.name as string,
      address: data.address as string,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems: cart,
      numItemsInCart: cartItemsNumber,
    };

    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        },
      );
      console.log(response);
      store.dispatch(clearCart());
      toast({ description: "Order placed!" });
      return redirect("/orders");
    } catch (error) {
      toast({ description: "Order failed!" });
      return null;
    }
  };

// Route
export default function Checkout() {
  const { cart } = useAppSelector((state) => state.cart);
  if (cart.length === 0) return <SectionTitle text="Empty cart" />;
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <Form method="post" className="flex flex-col gap-y-4">
          <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
          <FormInput label="first name" name="name" type="text" />
          <FormInput label="address" name="address" type="text" />
          <SubmitBtn text="Place Your Order" className="mt-4" />
        </Form>
        <CartTotals />
      </div>
    </>
  );
}
