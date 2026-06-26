import { useState } from "react"
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [otpsent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    function sendOtp() {
        if (!email || email.trim() === "") {
            toast.error("Email is required");
            return;
        }

        setLoading(true);

        api.post("/users/send-otp", { email: email.trim() })
            .then((res) => {
                setOtpSent(true)
                setLoading(false)
                toast.success(res.data.message);
            })
            .catch((error) => {
                console.log(error.response?.data);
                toast.error(error.response?.data?.message || "Request failed");
            })
            .finally(() => setLoading(false));
    }

    function verifyOTP() {

        if (newPassword != confirmPassword) {
            toast.error("password do not match")
            return
        }

        setLoading(true)

        api.post("users/verify-otp", {
            email: email,
            otp: otp,
            password: newPassword
        }).then((res) => {
            toast.success("Password changed successfully");
            navigate("/login");

        }).catch((error) => {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Request failed");
        }).finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')]">
            {loading && <LoadingScreen />}
            {
                otpsent ?
                    <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center gap-6 p-6">
                        <h1 className="text-3xl font-semibold text-white">Enter Your Email</h1>
                        <input value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@example.com" className="w-full text-white h-[40px] rounded-md px-2 border border-white" />
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="w-full text-white h-[40px] rounded-md px-2 border border-white" />
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Enter New Password" className="w-full text-white h-[40px] rounded-md px-2 border border-white" />
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm New Password" className="w-full text-white h-[40px] rounded-md px-2 border border-white" />
                        <button disabled={loading} onClick={verifyOTP} className="w-full h-[40px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                    </div>
                    :
                    <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center gap-6 p-6">
                        <h1 className="text-2xl font-semibold text-white">Enter your email </h1>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded text-white" />
                        <button disabled={loading} onClick={sendOtp} className="w-full p-2 bg-accent text-white rounded">{loading ? "Sending OTP..." : "Send OTP"}</button>
                    </div>
            }
        </div>
    )
}