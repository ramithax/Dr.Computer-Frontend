import Login from "./pages/Loginpage"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage"
import Register from "./pages/Registerpage"
import Admin from "./pages/Adminpage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';

//347676760178-7o72bbj038hd6d9d1a183tt1kqka704r.apps.googleusercontent.com

function App() {


  return (
    <GoogleOAuthProvider clientId="347676760178-7o72bbj038hd6d9d1a183tt1kqka704r.apps.googleusercontent.com">
      <div className="min-h-screen w-full flex flex-col">

        <Toaster position="top-right" />

        <div className="flex-grow">
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/*" element={<Home />} />

          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider >
  )
}

export default App
