import { type LoaderFunction } from "react-router-dom";
import { Filters, ProductsContainer, PaginationContainer } from "@/components";
import {
  customFetch,
  type ProductsResponse,
  type ProductsResponseWithParams,
} from "@/utils";

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const response = await customFetch<ProductsResponse>("/products", { params });
  return { ...response.data, params };
};

export default function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}
