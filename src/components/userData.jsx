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
                user == null ? <div>
                    <Link to="/login" className="text-white hover:text-gray-500">
                        Login
                    </Link>
                    <span className="text-white"> | </span>
                    <Link to="/register" className="text-white hover:text-gray-500">
                        Register
                    </Link>
                </div> :
                    <div className="text-white">
                        <img src={user.image} className="w-6 h-6 rounded-full inline-block mr-2" />
                        <select className="bg-transparent border-b outline-none inline-block " value={value} onChange={
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
                                    navigate("/")
                                }
                            }
                        }>
                            <option value="me">{user.firstname}</option>
                            <option value="settings" className="bg-accent text-white">Settings</option>
                            <option value="my-orders" className="bg-accent text-white">My orders</option>
                            <option value="logout" className="bg-accent text-white">Logout</option>
                        </select>

                    </div>
            }
        </>
    )
}