import {useState,useEffect} from 'react'
import api from '../utils/api'
import LoadingScreen from '../components/loadingScreen'
import Productcard from '../components/ProductCard'

export default function Productspage(){

        const [products,setProducts]=useState([])
        const [loading,setLoading]=useState(true) 

        useEffect(()=>{
            if(loading){
                api.get("/products").then((res)=>{
                    setProducts(res.data)
                    setLoading(false)
                }).catch((err)=>{
                    console.log(err)
                    setLoading(false)
                })
            }
        },[loading])

    return(

        <div className="w-full h-full flex-wrap gap-6 flex justify-center items-center">
            {
                loading && <LoadingScreen />
            }
            {
                !loading && 
                <>
                    {
                        products.map((product)=>{
                            return(
                                <Productcard key={product.productId} product={product} />
                            )
                        })
                    }
                </>
            }
        </div>
    )
}