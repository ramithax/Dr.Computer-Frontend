import { useState, useEffect } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import Productcard from "../components/ProductCard";

export default function Productspage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);


    const fetchProducts = () => {
        setLoading(true);

        api.get("/products")
            .then((res) => {
                console.log("DATA:", res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log("API ERROR:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    function searchProducts() {
        if (!query.trim()) return;

        console.log("Searching:", query);

        setSearching(true);

        api.get("/products/search/" + query)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log("SEARCH ERROR:", err);
            })
            .finally(() => {
                setSearching(false);
            });
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] py-10 px-4 flex flex-col items-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-10">
                Our Products
            </h1>

            {/* 🔍 Search Bar */}
            <div className="w-full max-w-7xl flex flex-col items-center gap-6">
                <div className="w-full flex justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-[400px] h-[40px] rounded-lg p-2 border"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchProducts();
                            }
                        }}
                    />

                    <button
                        onClick={searchProducts}
                        disabled={searching}
                        className="w-[120px] h-[40px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {searching ? "Searching..." : "Search"}
                    </button>

                    <button
                        onClick={() => {
                            setQuery("");
                            fetchProducts();
                        }}
                        className="w-[140px] h-[40px] bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        All Products
                    </button>
                </div>


                {loading && <LoadingScreen />}


                {!loading && (
                    <div className="w-full flex flex-wrap gap-8 justify-center items-center">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Productcard
                                    key={product.productId}
                                    product={product}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-lg">
                                No products found
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}