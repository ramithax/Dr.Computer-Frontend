import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../utils/api";

export default function UserData() {

    const [user, setUser] = useState(null)
    const [value, setValue] = useState("me")

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setUser(res.data.user)
            }).catch((error) => {
                setUser(null)
            })
        }

    }, [])

    return (
        <>
            {
                user == null ? <div className="text-sm font-medium">
                    <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-dark transition-colors">
                        Login
                    </Link>
                    <span className="text-slate-400 mx-1"> | </span>
                    <Link to="/signup" className="text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-dark transition-colors">
                        Sign up
                    </Link>
                </div> :
                    <div className="text-slate-700 dark:text-slate-200 flex items-center font-medium">
                        <img src={user.image} className="w-8 h-8 rounded-full inline-block mr-2 border border-slate-200 dark:border-slate-700" alt="User Profile" />
                        <select className="bg-transparent outline-none cursor-pointer text-sm" value={value} onChange={
                            (e) => {
                                const selected = e.target.value;
                                setValue(selected);

                                if (selected == "settings") {
                                    navigate("/settings")
                                }
                                if (selected == "my-orders") {
                                    navigate("/my-orders")
                                }
                                if (selected == "logout") {
                                    localStorage.removeItem("token");
                                    setUser(null);
                                    setValue("me");
                                    navigate("/")
                                }
                            }
                        }>
                            <option value="me" className="text-slate-900">{user.firstname}</option>
                            <option value="settings" className="text-slate-900">Settings</option>
                            <option value="my-orders" className="text-slate-900">My orders</option>
                            <option value="logout" className="text-slate-900">Logout</option>
                        </select>

                    </div>
            }
        </>
    )
}