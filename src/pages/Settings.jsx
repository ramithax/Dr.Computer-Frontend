import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import fileUpload from "../utils/mediaUpload";
import LoadingScreen from "../components/loadingScreen";

export default function Settings() {

    const [user, setUser] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setUser(res.data.user)
                setFirstName(res.data.user.firstname)
                setLastName(res.data.user.lastname)
                setImage(res.data.user.image)
            }).catch((error) => {
                setUser(null)
                navigate("/")
                toast.error(error?.response?.data?.message || "An error occurred during login.");
            })
        } else {
            navigate("/")
        }

    }, [])

    async function handleUpdateProfile() {
        setLoading(true)

        const token = localStorage.getItem("token")

        if (token == null) {
            navigate("/")
            return
        }

        let imageUrl = user.image || ""

        try {
            if (image != null) {
                imageUrl = await fileUpload(image);
            }
            const token = localStorage.getItem("token");
            await api.put(
                "/users/update-profile",
                {
                    firstname: firstName,
                    lastname: lastName,
                    image: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setLoading(false);
            window.location.reload()

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error?.response);
            console.log("DATA:", error?.response?.data);
            toast.error(error?.response?.data?.message || "An error occurred while updating the profile");
        } finally {
            setLoading(false)
        }

    }

    async function changePassword() {
        if (password != confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            await api.put("/users/update-password",
                { password: password }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setLoading(false)
            toast.success("Password changed successfully")
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred while changing password");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full gap-4 overflow y-scroll pb-20 flex flex-col lg:flex-row justify-center items-center">
            <div className="w-[400px] p-4 h-[400px] bg-white shadow-2xl rounded-lg flex flex-col">
                <h1 className="text-2xl font-semibold mb-4">Profile Information</h1>
                <label className="text-sm font-medium">First Name</label>
                <input
                    type="text"
                    className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <label className="text-sm font-medium">Last Name</label>
                <input
                    type="text"
                    className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                <label className="text-sm font-medium">Profile Image</label>
                <input
                    type="file"
                    className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />
                <button
                    className="w-full h-[40px] bg-accent/80 text-white rounded-md hover:bg-accent"
                    onClick={handleUpdateProfile}
                >
                    Update Profile
                </button>
            </div>

            <div className="w-[400px] p-4 h-[400px] bg-white shadow-2xl rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Change Password</h1>
                <label className="text-sm font-medium">New Password</label>
                <input
                    type="password"
                    className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <label className="text-sm font-medium">Confirm New Password</label>
                <input
                    type="password"
                    className="w-full h-[40px] border border-gray-300 rounded-md px-2 mb-4"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                <button
                    className="w-full h-[40px] bg-accent/80 text-white rounded-md hover:bg-accent"
                    onClick={changePassword}
                >
                    Change Password
                </button>
            </div>
            {
                Loading && <LoadingScreen />
            }
        </div>
    );
}