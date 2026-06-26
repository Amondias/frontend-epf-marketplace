export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                    <div>

                        <h3 className="text-2xl font-black">
                            EPF<span className="text-indigo-600">Market</span>
                        </h3>

                        <p className="mt-4 text-slate-500 max-w-md">
                            Marketplace moderne destinée aux acheteurs,
                            vendeurs et administrateurs.
                        </p>

                    </div>

                    <div className="text-sm text-slate-500">
                        © 2026 Tous droits réservés.
                    </div>

                </div>

            </div>

        </footer>
    );
}