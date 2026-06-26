import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ProductCard({
  product,
  showActions = true,
  onAddToCart,
}) {
  const image =
    product?.images?.[0] ||
    product?.image ||
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
  const title = product?.title || product?.name || "Produit";
  const rawQuantity = product?.quantity ?? product?.stock;
  const quantityNum = rawQuantity == null ? null : Number(rawQuantity);
  const isOutOfStock = quantityNum === 0;
  const isDisabled = product?.status === "inactive";
  const price = product?.effective_price || product?.price;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product?.category?.name && (
          <div className="absolute left-3 top-3">
            <Badge>{product.category.name}</Badge>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
              Rupture de stock
            </span>
          </div>
        )}

        {product?.status === "inactive" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              Désactivé
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {product?.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            {price} FCFA
          </span>

          <span className="text-sm text-slate-500">
            Stock : {quantityNum == null ? "-" : quantityNum}
          </span>
        </div>

        {showActions && (
          <div className="mt-5 flex gap-3">
            <Link
              to={`/products/${product.id}`}
              className="flex-1"
            >
              <Button className="w-full">
                Voir
              </Button>
            </Link>

            <Button
              variant="secondary"
              className="flex-1"
              disabled={isOutOfStock || isDisabled}
              onClick={() => onAddToCart?.(product)}
            >
              {isOutOfStock ? "Rupture de stock" : isDisabled ? "Désactivé" : "Panier"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
