export default function ProductCard(props){

    const product = props.product

    return (
        <div className="w-72 h-96 bg-white rounded-lg shadow-xl ">
            <img src={product.images[0]} className="w-full h-3/4 object-cover rounded-tr-lg"/>

            <p>{product.price}</p>
        </div>
    )
}