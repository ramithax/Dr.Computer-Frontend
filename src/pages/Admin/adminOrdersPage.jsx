import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import getFormattedPrice from "../../utils/price-Formatter";
import formatTimestamp from "../../utils/date-formatter";


export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [orderCount, setOrderCount] = useState(0);

	useEffect(() => {
		if (loading) {
			console.log("calling");
			const token = localStorage.getItem("token");
			api.get("/order/1/10", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					console.log("got it");
					console.log(res.data.orders);
					setOrders(res.data.orders);
					setLoading(false);
				});
		}
	}, [loading]);

	//backend call products fetch and setProducts

	return (
		<div className="w-full h-full ">
			<div className="w-full h-[100px] bg-white shadow-2xl mb-10 rounded-lg flex p-4 items-center justify-between">
				<h1 className="text-2xl font-semibold">All Orders</h1>
				<div className="h-full gap-4 flex items-center">
					{orders.length} Orders
				</div>
			</div>
			{
				loading && <LoadingScreen />
			}
			<table className="w-full text-center rounded-lg overflow-hidden">
				<thead className="bg-accent text-white h-[40px] ">
					<tr>
						<th className="w-[7%]">Order ID</th>
						<th className="w-[22%]">Eamil</th>
						<th className="w-[9%]">Name</th>
						<th className="w-[9%]">City</th>
						<th className="w-[7%]">Phone</th>
						<th className="w-[7%]">Status</th>
						<th className="w-[9%]">Date</th>
						<th className="w-[5%]">Total Amount</th>
						<th className="w-[15%]">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => {
						return (
							<tr className="odd:bg-gray-300 even:bg-white h-[60px]" key={order.orderId}>
								<td>{order.orderId}</td>
								<td>{order.email}</td>
								<td>{order.firstName} {order.lastName}</td>
								<td>{order.city}</td>
								<td>{formatTimestamp(order.date)}</td>
								<td>{order.phone}</td>
								<td>{order.status}</td>
								<td>{getFormattedPrice(order.totalAmount)}</td>
								<td>hi</td>
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