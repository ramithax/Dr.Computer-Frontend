import Login from "./pages/Loginpage"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage"
import Register from "./pages/Registerpage"
import Admin from "./pages/Adminpage";
import Testpage from "./pages/testpage";
import { Toaster } from "react-hot-toast";

function App() {
  

  return (
    <div className="min-h-screen w-full flex flex-col">
      
      <Toaster position="top-right" />

      <div className="flex-grow">
        <Routes>
           
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/*" element={<Home/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App
