import ProductCard from "./ProductCard";
import EmptyState from "../ui/EmptyState";

export default function ProductGrid({
  products = [],
  onAddToCart,
}) {
  if (!products.length) {
    return (
      <EmptyState
        title="Aucun produit trouvé"
        description="Essayez de modifier vos filtres."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}