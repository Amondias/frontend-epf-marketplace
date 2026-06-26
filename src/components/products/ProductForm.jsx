import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function ProductForm({
  formData,
  categories = [],
  loading = false,
  onChange,
  onSubmit,
}) {
  return (
    <Card className="p-6">
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <Input
          name="title"
          value={formData.title || ""}
          onChange={onChange}
          placeholder="Nom du produit"
        />

        <textarea
          name="description"
          value={formData.description || ""}
          onChange={onChange}
          rows={5}
          placeholder="Description"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={onChange}
            placeholder="Prix"
          />

          <Input
            type="number"
            name="quantity"
            value={formData.quantity || ""}
            onChange={onChange}
            placeholder="Stock"
          />
        </div>

        <select
          name="category_id"
          value={formData.category_id || ""}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">
            Sélectionner une catégorie
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <Input
          type="file"
          name="image"
          onChange={onChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer le produit"}
        </Button>
      </form>
    </Card>
  );
}
