import { BsGift } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AdminProductsPage from "./Admin/adminproductpage";
import AdminAddProductForm from "./Admin/adminAddProductForm";
import AdminEditProductForm from "./Admin/adminEditProduct";
import AdminOrdersPage from "./Admin/adminOrdersPage";
import api from "../utils/api";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import AdminUsersPage from "./Admin/adminUsersPage";

export default function AdminPage() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (!res.data.user.isadmin) {
                    toast.error("You are not authorized to access admin page")
                    navigate("/")
                }
                setUser(res.data.user)
            }).catch((error) => {
                setUser(null)
                navigate("/")
                toast.error(error?.response?.data?.message || "An error occurred during login.");
            })
        } else {
            navigate("/")
        }

    }, [])

    return (
        <div className="w-full min-h-screen flex bg-white">

            {/* Sidebar */}
            <div className="w-[300px] h-screen fixed left-0 top-0 bg-white flex flex-col shadow-2xl">
                <div className="w-full h-[100px] py-4 px-2">
                    <img src="/logo.png" className="h-full object-contain" />
                </div>

                <Link to="/admin" className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100 hover:text-black transition">
                    <FiShoppingCart />
                    <span>Orders</span>
                </Link>

                <Link to="/admin/products" className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100 hover:text-black transition">
                    <BsGift />
                    <span>Products</span>
                </Link>

                <Link to="/admin/users" className="w-full p-4 text-xl text-gray-500 flex items-center gap-4 hover:bg-gray-100 hover:text-black transition">
                    <TbUsers />
                    <span>Users</span>
                </Link>
            </div>

            {/* Content */}
            <div className="ml-[300px] w-[calc(100%-300px)] min-h-screen p-4 overflow-y-auto">
                {user == null ? <LoadingScreen /> :
                    <Routes>
                        <Route path="/" element={<AdminOrdersPage />} />
                        <Route path="products" element={<AdminProductsPage />} />
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="addproduct" element={<AdminAddProductForm />} />
                        <Route path="editproduct/:productId" element={<AdminEditProductForm />} />
                    </Routes>}
            </div>

        </div>
    )
}