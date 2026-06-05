import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Productspage from "./Productspage";
import ProductOverview from "./Productoverview";
import Cartpage from "./Cartpage";
import Checkoutpage from "./Checkoutpage";

export default function Home(){
    return(
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/products" element={<Productspage /> }/>
                <Route path="contact" element={<h1>Contact page</h1>} />
                <Route path="overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<Cartpage />} />
                <Route path="/checkout" element={<Checkoutpage />} />
                <Route path="/*" element={<h1>404 not found</h1>} />
                
            </Routes>
        </div>
    )
}