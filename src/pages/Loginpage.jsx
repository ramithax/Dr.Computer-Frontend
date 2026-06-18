import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api";
import { BsGoogle } from "react-icons/bs";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    async function handlelogin() {
        setloading(true)
        toast.success(`Email: ${email} Password: ${password}`);
        try {
            const res = await api.post("/users/login", {
                email: email,
                password: password,
            })
            localStorage.setItem("token", res.data.token)

            if (res.data.isadmin) {
                navigate("/admin")
            } else {
                navigate("/")
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred during login.");
        }
        setloading(false)
    }

    return (
        <div className=" bg-[url('/login-bg.jpg')] w-full h-full flex justify-center items-center">

            <div className="w-[400px] h-[600px] backdrop-blur-md shadow-2xl shadow-white rounded-xl flex-col p-4">
                <h1 className="w-full h-[80px] text-center text-3xl font-bold text-amber-50">Login</h1>
                <div className="w-full">
                    <label className="text-white text-lg flex items-center">Email</label>
                    <input type="email" className="w-full h-[40px] rounded-md px-2 border border-white " placeholder="Enter your email address" onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    }
                        value={email}
                    />
                </div>
                <div className="w-full mt-5 ">
                    <label className="text-white text-lg flex items-center">Password</label>
                    <input type="password" className="w-full h-[40px] rounded-md px-2 border border-white " placeholder="Enter your password" onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }
                        value={password}
                    />
                </div>
                <p className="w-full h-2 text-sm mt-5 text-white text-left">Forgot your Password? click{" "}<Link className="font-bold text-accent" to="/forget_pq">Here</Link></p>
                <button disabled={loading} className="w-full h-[40px] mt-6 bg-accent text-white rounded-md hover:bg-[#E36A6A]/80 transition duration-300" onClick={handlelogin}>{
                    loading ? "Loading..." : "Login"
                }
                </button>
                <p className="w-full h-2 text-sm mt-5 text-white text-left">Don't have a account? click{" "}<Link className="font-bold text-accent" to="/forget_pq">Here</Link></p>
                <button className="w-full h-[50px] bg-accent mt-5 text-white rounded-lg flex justify-center items-center gap-2"><BsGoogle /> Sign In with Google</button>

            </div>
        </div>
    )
}