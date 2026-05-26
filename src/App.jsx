import Login from "./pages/Loginpage"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage"
import Register from "./pages/Registerpage"
import Admin from "./pages/Adminpage";
import Testpage from "./pages/testpage";
import { Toaster } from "react-hot-toast";

function App() {
  

  return (
    <div className="h-screen w-full bg-[#937181]">
      
      <Toaster position="top-right" />

      <Routes>
         
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/admin/*" element={<Admin/>}/>

      </Routes>
    </div>
  )
}

export default App
