import { type LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  SectionTitle,
  OrdersList,
  ComplexPaginationContainer,
} from "@/components";
import { type ReduxStore } from "@/app/store";
import { customFetch, OrdersResponse } from "@/utils";

// Loader
export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const { user } = store.getState().user;

    if (!user) {
      toast({ description: "Please login to continue" });
      return redirect("/login");
    }

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    try {
      const response = await customFetch.get<OrdersResponse>("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toast({ description: "Failed to fetch orders" });
      return null;
    }
  };

// Route
export default function Orders() {
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1)
    return <SectionTitle text="Please make an order" />;
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}
