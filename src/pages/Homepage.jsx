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
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-6 drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Upgrade Your Setup
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Discover premium computers, accessories, and tech gear at unbeatable prices. Elevate your performance today.
        </p>
        <Link to="/products" className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-accent/50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Shop Now
        </Link>
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