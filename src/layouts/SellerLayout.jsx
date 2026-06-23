import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function SellerLayout({ children }) {

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar type="seller" />

                <main className="flex-1 p-6">

                    {children}

                </main>

            </div>

        </div>
    );
}