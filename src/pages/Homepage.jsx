import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Productspage from "./Productspage";
import ProductOverview from "./Productoverview";
import Cartpage from "./Cartpage";
import Checkoutpage from "./Checkoutpage";
import MyOrdersPage from "./myOrdersPage";
import Settings from "./Settings";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

const HeroSection = () => (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-2xl space-y-6">
            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700">
                <Zap size={14} className="text-amber-600" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Expert-curated hardware</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-cyan-500">
                    Perfect System
                </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Premium components, vetted expertise, and the confidence that comes from 20+ years building computers right.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                    href="/products"
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    Explore Components <ArrowRight size={18} />
                </a>
                <a
                    href="#how-we-work"
                    className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    Learn More
                </a>
            </div>
        </div>

        {/* Decorative element - subtle tech pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-300 dark:from-slate-800 to-transparent opacity-30" />
    </div>
);

const TrustSection = () => (
    <section className="w-full py-16 md:py-24 px-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Why choose us</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-3 mb-4">
                    Built on expertise
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Every component is selected for quality and compatibility. We don't just sell hardware—we ensure it works.
                </p>
            </div>

            {/* Trust grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Shield,
                        label: "Quality Verified",
                        text: "Every component tested and certified compatible with our systems."
                    },
                    {
                        icon: Zap,
                        label: "Expert Support",
                        text: "Our specialists help you choose components that match your needs perfectly."
                    },
                    {
                        icon: Clock,
                        label: "Fast Shipping",
                        text: "Order today, build tomorrow. We ship within 24 hours."
                    }
                ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={idx} className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-amber-600 dark:hover:border-amber-600 transition-colors">
                            <IconComponent size={32} className="text-amber-600 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {item.label}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const CategoriesSection = () => (
    <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="mb-16">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Browse by category</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-3">
                    Find what you need
                </h2>
            </div>

            {/* Category cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: "Processors", desc: "Intel & AMD CPUs", color: "from-cyan-500" },
                    { title: "Motherboards", desc: "LGA1700, AM5 & more", color: "from-amber-500" },
                    { title: "Graphics Cards", desc: "NVIDIA & AMD GPUs", color: "from-purple-500" },
                    { title: "Memory & Storage", desc: "RAM, SSD, HDD", color: "from-blue-500" }
                ].map((cat, idx) => (
                    <a
                        key={idx}
                        href="/products"
                        className="group p-8 bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-amber-600 dark:hover:border-amber-600 transition-all duration-300 cursor-pointer"
                    >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} to-transparent opacity-80 mb-4`} />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 transition-colors">
                            {cat.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {cat.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-amber-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            Browse <ArrowRight size={16} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = () => (
    <section className="w-full py-20 md:py-28 px-4 bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to build?
            </h2>
            <p className="text-lg text-slate-300">
                Start exploring our inventory of premium components. Our experts are here to help.
            </p>
            <a
                href="/products"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                Start Shopping <ArrowRight size={20} className="ml-2" />
            </a>
        </div>
    </section>
);

export default function Home() {
    return (
        <div className="w-full h-full">
            <Header />
            <Routes>
                <Route path="/" element={
                    <div className="w-full">
                        <HeroSection />
                        <TrustSection />
                        <CategoriesSection />
                        <CTASection />
                    </div>
                } />
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