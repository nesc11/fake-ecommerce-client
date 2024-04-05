import { useLoaderData, Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ProductsResponse, formatAsDollars } from "@/utils";

export default function ProductsGrid() {
  const results = useLoaderData() as ProductsResponse;
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.data.map((product) => {
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className="p-4">
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className="rounded-md h-64 md:h-48 w-full object-cover"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold capitalize">
                    {product.attributes.title}
                  </h2>
                  <p className="text-primary font-light mt-2">
                    {formatAsDollars(product.attributes.price)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
