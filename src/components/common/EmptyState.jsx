export default function EmptyState({

    title = "Aucune donnée",

    description = ""

}) {

    return (

        <div className="bg-white p-10 rounded shadow text-center">

            <h2 className="text-xl font-semibold">

                {title}

            </h2>

            <p className="text-gray-500 mt-2">

                {description}

            </p>

        </div>

    );
}