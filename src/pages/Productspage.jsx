import { useState, useEffect } from 'react'
import api from '../utils/api'
import LoadingScreen from '../components/loadingScreen'
import Productcard from '../components/ProductCard'

export default function Productspage() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/products")
            .then((res) => {
                console.log("DATA:", res.data)
                setProducts(res.data)
            })
            .catch((err) => {
                console.log("API ERROR:", err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (

        <div className="w-full min-h-[calc(100vh-80px)] py-10 px-4 flex flex-col items-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-10 animate-in fade-in slide-in-from-top-4">Our Products</h1>
            <div className="w-full max-w-7xl flex flex-wrap gap-8 justify-center items-center">
                {
                    loading && <LoadingScreen />
                }
                {
                    !loading &&
                    <>
                        {
                            products.map((product) => {
                                return (
                                    <Productcard key={product.productId} product={product} />
                                )
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}