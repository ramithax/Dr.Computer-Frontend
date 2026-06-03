import getFormattedPrice from "../utils/price-Formatter"
import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product
    const labelledPrice = product.labeledprice ?? product.labelledPrice
    const currentPrice = Number(product.price)
    const originalPrice = Number(labelledPrice)

    return (
        <Link to={`/overview/${product.productId}`} className="w-72 h-96 flex flex-col bg-white rounded-lg shadow-xl">
            <img src={product.images[0]} className="w-full h-[60%] object-cover rounded-t-lg"/>
            <div className="w-full h-[40%] p-4 flex flex-col justify-between">
                <h1 className=" text-lg font-semibold">{product.name}</h1>
                {
                    labelledPrice != null && !isNaN(currentPrice) && !isNaN(originalPrice) && currentPrice < originalPrice && (
                        <p className="text-accent line-through">{getFormattedPrice(labelledPrice)}</p>
                    )
                }
                <p className="text-gray-700 text-lg font-semibold">{getFormattedPrice(product.price)}</p>
            </div>
        </Link>
    )
}