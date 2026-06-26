export function formatPrice(value) {
    const amount = Number(value || 0);
    return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function getErrorMessage(error, fallback = "Une erreur est survenue.") {
    return error?.response?.data?.message || fallback;
}

export function statusLabel(status) {
    const labels = {
        draft: "Brouillon",
        published: "Publie",
        sold: "Vendu",
        inactive: "Désactivé",
        pending: "En attente",
        confirmed: "Confirmee",
        shipped: "Expediee",
        delivered: "Livree",
        cancelled: "Annulee",
    };

    return labels[status] || status || "Inconnu";
}

export function statusVariant(status) {
    if (["published", "confirmed", "delivered"].includes(status)) {
        return "success";
    }

    if (["pending", "draft"].includes(status)) {
        return "warning";
    }

    if (["cancelled", "inactive", "sold"].includes(status)) {
        return "danger";
    }

    return "neutral";
}

export function buildProductFormData(values, file) {
    const data = new FormData();

    Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            // Ensure numeric fields are sent in a consistent format
            if (key === "quantity") {
                const n = Number(value);
                // only append if it's a valid number
                if (!Number.isNaN(n)) {
                    data.append(key, String(Math.trunc(n)));
                }
            } else if (key === "price" || key === "sale_price") {
                const n = Number(value);
                if (!Number.isNaN(n)) {
                    data.append(key, String(n));
                }
            } else {
                data.append(key, value);
            }
        }
    });

    if (file) {
        data.append("image", file);
    }

    return data;
}
