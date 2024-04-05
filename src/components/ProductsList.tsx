import { useLoaderData, Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ProductsResponse, formatAsDollars } from "@/utils";

export default function ProductsList() {
  const results = useLoaderData() as ProductsResponse;
  return (
    <div className="mt-12 grid gap-y-8">
      {results.data.map((product) => {
        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card>
              <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className="h-64 w-full md:h-48 md:w-48 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize">
                    {product.attributes.title}
                  </h2>
                  <h4>{product.attributes.company}</h4>
                </div>
                <p className="text-primary md:ml-auto">
                  {formatAsDollars(product.attributes.price)}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
