const sample = [
    {},
    {},
    {}
]

export function getCart(){
    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []
    }
    const cart = JSON.parse(cartString)
    return cart
}

export function addToCart(product,qty){
    const cart = getCart()

    const existingProductIndex = cart.findIndex(
        (item) => {
            return item.productId === product.productId
        }
    )

    if(existingProductIndex == -1 && qty > 0){
        cart.push({
            productId : product.productId,
            name : product.name,
            image : product.images[0],
            price : product.price,
            labelledPrice : product.labelledPrice,
            qty: qty
        })
    }
    if(existingProductIndex != -1){

        cart[existingProductIndex].qty += qty
        if(cart[existingProductIndex].qty <= 1){
            cart.splice(existingProductIndex, 1)
        }
    }

    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart",cartString)
}

export function getTotal(cart){
    const cart = getCart()

    let total = 0

    cart.forEach((item) => {
        total += item.price * item.qty
    })

    return total
}