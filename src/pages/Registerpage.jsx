import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api";
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from "@react-oauth/google";

export default function Register() {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const googleLogin = useGoogleLogin(
        {
            onSuccess: (response) => {
                console.log(response)
                api.post("/users/google-login", {
                    accessToken: response.access_token
                }).then((res) => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.token)
                    navigate("/")

                }).catch((error) => {
                    toast.error(error?.response?.data?.message || "An error occurred during login.");
                })
            },
            onError: (error) => {
                console.log(error)
            }
        }
    )


    async function handleRegister() {

        if (!email || !password || !firstName || !lastName) {
            toast.error("Please fill all fields");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setloading(true);

        try {
            await api.post("/users", {
                email,
                password,
                firstname: firstName,
                lastname: lastName,
            });

            toast.success("Account created successfully!");
            navigate("/");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed.");
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center flex justify-center items-center px-4">

            ```
            <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6">

                {/* Title */}
                <h1 className="text-center text-3xl font-bold text-white mb-6">
                    Create Account
                </h1>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-white text-sm mb-1 block">Email</label>
                    <input
                        type="email"
                        className="w-full h-[42px] rounded-lg px-3 bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Name Row */}
                <div className="flex gap-3 mb-4">
                    <div className="w-1/2">
                        <label className="text-white text-sm mb-1 block">First Name</label>
                        <input
                            type="text"
                            className="w-full h-[42px] rounded-lg px-3 bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="text-white text-sm mb-1 block">Last Name</label>
                        <input
                            type="text"
                            className="w-full h-[42px] rounded-lg px-3 bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="text-white text-sm mb-1 block">Password</label>
                    <input
                        type="password"
                        className="w-full h-[42px] rounded-lg px-3 bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label className="text-white text-sm mb-1 block">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full h-[42px] rounded-lg px-3 bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Register Button */}
                <button
                    disabled={loading}
                    onClick={handleRegister}
                    className="w-full h-[45px] mt-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/80 transition disabled:opacity-60"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <div className="flex-1 h-[1px] bg-white/30"></div>
                    <span className="px-3 text-white text-sm">OR</span>
                    <div className="flex-1 h-[1px] bg-white/30"></div>
                </div>

                {/* Google */}
                <button
                    onClick={googleLogin}
                    className="w-full h-[45px] bg-white text-black rounded-lg flex justify-center items-center gap-2 font-medium hover:bg-gray-200 transition"
                >
                    <BsGoogle /> Continue with Google
                </button>

                {/* Login Link */}
                <p className="text-sm text-white mt-5 text-center">
                    Already have an account?{" "}
                    <Link className="font-semibold text-accent hover:underline" to="/login">
                        Login
                    </Link>
                </p>

            </div>
            ```

        </div>

    )
}