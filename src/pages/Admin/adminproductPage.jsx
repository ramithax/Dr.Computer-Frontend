import FloatingAddButton from "../../components/addbutton"
import { useState } from "react"

export default function AdminProductsPage(){

    const [products,setProducts]=useState([])

    return(
        <div className="w-full h-full relative">
            <h1 className="text-3xl font-bold text-gray-500">Admin Products Page</h1>
            <FloatingAddButton />
        </div>
    )
}