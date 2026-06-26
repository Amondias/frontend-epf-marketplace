import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher...",
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          py-3
          pl-11
          pr-4
          text-sm
          shadow-sm
          transition
          focus:border-indigo-500
          focus:outline-none
          focus:ring-4
          focus:ring-indigo-100
        "
      />
    </div>
  );
}