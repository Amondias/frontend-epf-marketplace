export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="
          rounded-lg
          border
          px-4
          py-2
          text-sm
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Précédent
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            rounded-lg
            px-4
            py-2
            text-sm
            transition

            ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "border hover:bg-slate-50"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="
          rounded-lg
          border
          px-4
          py-2
          text-sm
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Suivant
      </button>
    </div>
  );
}