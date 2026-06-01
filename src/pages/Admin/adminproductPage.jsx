import FloatingAddButton from "../../components/addbutton"
import { useEffect, useState } from "react"
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import LoadingScreen from "../../components/loadingScreen";

export default function AdminProductsPage(){

    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        if(loading){
            const token=localStorage.getItem("token")
        api.get("/products",{
            headers:{
                Authorization : `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
        })
        }
    }
    ,[loading]);

    return(
        <div className="w-full h-full relative">
            {
                loading && <LoadingScreen />
            }
            <table>
                <thead>
                    <tr>
                        <th>-</th>
                        <th>ProductID</th>
                        <th>Name</th>
                        <th>price</th>
                        <th>Labeled price</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Category</th>
                        <th>Availability</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product)=>{
                            return <tr key={product.productId}>
                                <td>
                                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded"/>
                                </td>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.labelledPrice}</td>
                                <td>{product.brand}</td>
                                <td>{product.model}</td>
                                <td>{product.category}</td>
                                <td>{product.isAvailable ? "Available" : "Out of stock"}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className="w-[100px] bg-red-500 text-white hover:bg-red-700 rounded" onClick={
                                        ()=>{
                                            const token=localStorage.getItem("token")
                                            api.delete("/products/"+product.productId,{
                                                headers:{
                                                    Authorization:`Bearer ${token}`
                                                }
                                            }).then(()=>{
                                                toast.success("Product deleted successfully")
                                                setLoading(!loading)
                                            }).catch(()=>{
                                                toast.error("Error deleting product")
                                            })
                                        }
                                    }>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <FloatingAddButton />
        </div>
    )
}