export default function ProductReviews({
    reviews = [],
}) {
    return (
        <div className="space-y-4">

            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-white p-4 rounded shadow"
                >
                    <h4 className="font-bold">
                        {review.user?.name}
                    </h4>

                    <p>
                        {review.comment}
                    </p>
                </div>
            ))}

        </div>
    );
}