export function getCart(){
    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []
    }
    const cart = JSON.parse(cartString)
    return cart
}

export function addToCart(product, qty) {
    const cart = getCart()

    const existingProductIndex = cart.findIndex(
        (item) => item.product.productId === product.productId
    )

    if (existingProductIndex === -1 && qty > 0) {
        const labelledPrice = product.labeledprice ?? product.labelledPrice
        cart.push({
            product: {
                productId: product.productId,
                name: product.name,
                image: product.images[0],
                price: product.price,
                labelledPrice,
                labeledprice: labelledPrice,
            },
            qty: qty,
        })
    } else if (existingProductIndex !== -1) {
        cart[existingProductIndex].qty += qty

        if (cart[existingProductIndex].qty <= 0) {
            cart.splice(existingProductIndex, 1)
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart))
}


export function getTotal(cart){
    
    let total = 0

    cart.forEach((item) => {
        const price = item.product?.price ?? item.price
        total += Number(price) * item.qty
    })

    return total
}