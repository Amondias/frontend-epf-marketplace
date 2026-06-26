import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";

export default function UnauthorizedPage() {
    return (
        <MainLayout>
            <div className="mx-auto max-w-2xl px-6 py-20 text-center">
                <h1 className="text-3xl font-black text-slate-950">Acces non autorise</h1>
                <p className="mt-3 text-slate-600">
                    Votre compte ne dispose pas des droits necessaires pour consulter cette page.
                </p>
                <Link to="/" className="mt-6 inline-flex">
                    <Button>Retour a l'accueil</Button>
                </Link>
            </div>
        </MainLayout>
    );
}
