import SectionTitle from "./SectionTitle";
import ProductsGrid from "./ProductsGrid";

export default function FeaturedProducts() {
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </section>
  );
}
