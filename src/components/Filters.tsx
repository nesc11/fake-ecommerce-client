import { Form, useLoaderData, Link } from "react-router-dom";
import { Button } from "./ui/button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import { ProductsResponseWithParams } from "@/utils";

export default function Filters() {
  const results = useLoaderData() as ProductsResponseWithParams;
  console.log(results.data);
  return (
    <Form className="border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}

      <FormInput
        type="search"
        label="search product"
        name="search"
        defaultValue={results.params.search || ""}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        options={results.meta.categories}
        defaultValue={results.params.category}
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        options={results.meta.companies}
        defaultValue={results.params.company}
      />
      {/* ORDER */}
      <FormSelect
        label="order by"
        name="order"
        options={["a-z", "z-a", "high", "low"]}
        defaultValue={results.params.order}
      />
      {/* PRICE */}
      <FormRange
        label="price"
        name="price"
        defaultValue={results.params.price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        defaultValue={results.params.shipping}
      />
      <Button type="submit" size="sm" className="self-end mb-2">
        Search
      </Button>
      <Button
        type="button"
        asChild
        size="sm"
        variant="outline"
        className="self-end mb-2"
      >
        <Link to="/products">reset</Link>
      </Button>
    </Form>
  );
}
