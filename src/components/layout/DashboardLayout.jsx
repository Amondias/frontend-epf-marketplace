import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex pt-6">

                <Sidebar />

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}