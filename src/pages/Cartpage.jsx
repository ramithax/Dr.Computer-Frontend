import { useState } from "react"
import { getCart } from "../utils/cart"

export default function Cartpage() {
  const [cart, setCart] = useState(getCart())

  return (
    <div className="w-full h-full overflow-y-scroll flex items-center flex-col">
      {cart.map((cartItem, index) => {
        const product = cartItem?.product
        if (!product) return null // skip invalid items

        return (
          <div
            className="w-[600px] h-[150px] flex-row shadow-xl my-4"
            key={index}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full aspect-square"
            />
            <div className="h-full w-[450px] flex flex-col p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}
