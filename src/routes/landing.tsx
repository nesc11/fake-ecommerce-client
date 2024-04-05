import { type LoaderFunction } from "react-router-dom";
import { Hero, FeaturedProducts } from "@/components";
import { customFetch, type ProductsResponse } from "@/utils";

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(
    "/products/?featured=true",
  );
  return response.data;
};

export default function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
