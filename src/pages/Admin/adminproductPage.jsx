import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import DeleteButton from "../../components/DeleteButton";


export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			const token = localStorage.getItem("token");
			api
				.get("/products", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res.data);
					setProducts(res.data);
					setLoading(false);
				});
		}
	}, [loading]);

	//backend call products fetch and setProducts

	return (
		<div className="w-full h-full ">
			<div className="w-full h-[100px] bg-white shadow-2xl mb-10 rounded-lg flex p-4 items-center justify-between">
                <h1 className="text-2xl font-semibold">All Products</h1>
                <div className="h-full gap-4 flex items-center">
                    {products.length} Products
                </div>                
            </div>
			{
				loading && <LoadingScreen/>
			}
			<table className="w-full text-center rounded-lg overflow-hidden">
				<thead className="bg-accent text-white h-[40px] ">
					<tr>
						<th className="w-[5%]"></th>
						<th className="w-[7%]">Product ID</th>
						<th className="w-[22%]">Name</th>
						<th className="w-[9%]">Price</th>
						<th className="w-[9%]">Labelled Price</th>
						<th className="w-[7%]">Brand</th>
						<th className="w-[7%]">Model</th>
						<th className="w-[9%]">Category</th>
						<th className="w-[5%]">Availability</th>
						<th className="w-[5%]">Stock</th>
						<th className="w-[15%]">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => {
						return (
							<tr className="odd:bg-gray-300 even:bg-white h-[60px]" key={product.productId}>
								<td>
									<img
										src={product.images[0]}
										alt={product.name}
										className="w-16 h-16  rounded"
									/>
								</td>
								<td>{product.productId}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.labelledPrice}</td>
								<td>{product.brand}</td>
								<td>{product.model}</td>
								<td>{product.category}</td>
								<td>{product.isAvailable ? "Available" : "Out of Stock"}</td>
								<td>{product.stock}</td>
								<td>
									<div className="w-full flex justify-center items-center gap-4">
										<DeleteButton productId={product.productId} refresh={()=>setLoading(true)} />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<Link
				to="/admin/add-product"
				className="bg-accent w-[80px] h-[80px] rounded-full text-white text-2xl flex justify-center items-center fixed bottom-4 right-4 shadow-2xl hover:bg-white hover:text-accent"
			>
				<FaPlus />
			</Link>
		</div>
	);
}