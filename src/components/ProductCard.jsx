import getFormattedPrice from "../utils/price-Formatter"
import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product
    const labelledPrice = product.labeledprice ?? product.labelledPrice
    const currentPrice = Number(product.price)
    const originalPrice = Number(labelledPrice)

    return (
        <Link to={`/overview/${product.productId}`} className="w-72 h-[420px] flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-accent/20 dark:hover:shadow-accent-dark/30 hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden group">
            <div className="w-full h-[55%] overflow-hidden bg-slate-100 dark:bg-slate-900 flex justify-center items-center">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name}/>
            </div>
            <div className="w-full h-[45%] p-5 flex flex-col justify-between">
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2">{product.name}</h1>
                <div className="flex flex-col">
                    {
                        labelledPrice != null && !isNaN(currentPrice) && !isNaN(originalPrice) && currentPrice < originalPrice && (
                            <p className="text-sm text-slate-400 dark:text-slate-500 line-through mb-1">{getFormattedPrice(labelledPrice)}</p>
                        )
                    }
                    <p className="text-accent dark:text-blue-400 text-xl font-extrabold">{getFormattedPrice(product.price)}</p>
                </div>
            </div>
        </Link>
    )
}