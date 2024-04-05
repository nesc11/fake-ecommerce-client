import { useState } from "react";
import { type LoaderFunction, Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ProductColors, ProductAmount } from "@/components";
import {
  SingleProductResponse,
  customFetch,
  formatAsDollars,
  CartItem,
} from "@/utils";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/features/cart/cartSlice";

// Loader
export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  const response = await customFetch<SingleProductResponse>(
    `/products/${params.id}`,
  );
  return response.data;
};

// Route
export default function Product() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const results = useLoaderData() as SingleProductResponse;

  //  Local states (Quantity and color of the product)
  const [color, setColor] = useState<string>(results.data.attributes.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  console.log(color, quantity);

  //  Structure for a cart item
  const item: CartItem = {
    itemId: results.data.id + color,
    productId: results.data.id,
    image: results.data.attributes.image,
    name: results.data.attributes.title,
    company: results.data.attributes.company,
    price: Number(results.data.attributes.price),
    quantity,
    color,
  };

  return (
    <section>
      <div className="flex gap-x-2 h-6 items-center">
        <Button asChild variant="link" size="sm">
          <Link to="/">Home</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button asChild variant="link" size="sm">
          <Link to="/products">Products</Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={results.data.attributes.image}
          alt={results.data.attributes.title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        <div>
          <h1 className="capitalize text-3xl font-bold">
            {results.data.attributes.title}
          </h1>
          <h4 className="text-xl mt-2">{results.data.attributes.company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {formatAsDollars(results.data.attributes.price)}
          </p>
          <p className="mt-6 leading-8">
            {results.data.attributes.description}
          </p>
          <div className="flex gap-x-8 items-end">
            <ProductColors
              currentColor={color}
              colors={results.data.attributes.colors}
              changeColor={(color: string) => setColor(color)}
            />
            <ProductAmount
              currentQuantity={quantity}
              changeQuantity={(quantity: number) => setQuantity(quantity)}
            />
          </div>

          <Button
            size="lg"
            className="mt-10"
            onClick={() => {
              dispatch(addToCart(item));
              toast({ description: "Item added to cart" });
            }}
          >
            Add to bag
          </Button>
        </div>
      </div>
    </section>
  );
}
