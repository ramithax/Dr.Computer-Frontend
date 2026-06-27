import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Productspage from "./Productspage";
import ProductOverview from "./Productoverview";
import Cartpage from "./Cartpage";
import Checkoutpage from "./Checkoutpage";
import MyOrdersPage from "./myOrdersPage";
import Settings from "./Settings";
import { Link } from "react-router-dom";

const HeroSection = () => (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950">
        <h1>Welcome to Dr. Computer</h1>
    </div>
);

export default function Home() {
    return (
        <div className="w-full h-full">
            <Header />
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/products" element={<Productspage />} />
                <Route path="/contact" element={<h1>Contact page</h1>} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<Cartpage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/checkout" element={<Checkoutpage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/*" element={<h1>404 not found</h1>} />

            </Routes>
        </div>
    )
}