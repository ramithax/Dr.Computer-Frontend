import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import getFormattedPrice from "../../utils/price-Formatter";
import formatTimestamp from "../../utils/date-formatter";
import AdminOrderModal from "../../components/orderModal";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalOrders, setTotalOrders] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("token");

		setLoading(true);

		api.get(`/order/${pageNumber}/${pageSize}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				setOrders(res.data.orders);
				setTotalOrders(res.data.totalOrders);
				setTotalPages(res.data.totalPages);
			})
			.catch((err) => {
				console.error("Failed to fetch orders", err);
			})
			.finally(() => {
				setLoading(false);
			});

	}, [pageNumber, pageSize, refreshKey]);

	return (
		<div className="w-full h-full flex flex-col items-center">

			{/* Header */}
			<div className="w-full h-[100px] bg-white shadow-2xl mb-10 rounded-lg flex p-4 items-center justify-between">
				<h1 className="text-2xl font-semibold">All Orders</h1>
				<div className="h-full gap-4 flex items-center">
					Total Orders: {totalOrders}
				</div>
			</div>

			{/* Table with loading overlay */}
			<div className="w-full relative">

				{loading && <LoadingScreen />}

				<table className="w-full text-center rounded-lg overflow-hidden">
					<thead className="bg-accent text-white h-[40px]">
						<tr>
							<th className="w-[7%]">Order ID</th>
							<th className="w-[22%]">Email</th>
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
						{orders.length === 0 && !loading ? (
							<tr>
								<td colSpan="9" className="py-4">
									No orders found
								</td>
							</tr>
						) : (
							orders.map((order) => (
								<tr
									className="odd:bg-gray-300 even:bg-white h-[60px]"
									key={order.orderId}
								>
									<td>{order.orderId}</td>
									<td>{order.email}</td>
									<td>{order.firstName} {order.lastName}</td>
									<td>{order.city}</td>
									<td>{order.phone}</td>
									<td>{order.status}</td>
									<td>{formatTimestamp(order.date)}</td>
									<td>{getFormattedPrice(order.totalAmount)}</td>
									<td>
										<div className="w-full flex justify-center items-center gap-4">
											<AdminOrderModal
												isAdmin={true}
												order={order}
												refresh={() => setRefreshKey(prev => prev + 1)}
											/>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>

			</div>

			{/* Pagination */}
			<div className="p-2 fixed bottom-4 bg-white shadow-2xl flex justify-center items-center">

				<select
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
					className="h-full px-4 border-r"
				>
					<option value={2}>2 per page</option>
					<option value={5}>5 per page</option>
					<option value={10}>10 per page</option>
					<option value={20}>20 per page</option>
				</select>

				<div className="h-full flex items-center justify-center gap-4">

					<button
						disabled={loading || pageNumber === 1}
						onClick={() => setPageNumber(prev => prev - 1)}
						className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
					>
						Previous
					</button>

					<span>
						Page {pageNumber} of {totalPages}
					</span>

					<button
						disabled={loading || pageNumber === totalPages}
						onClick={() => setPageNumber(prev => prev + 1)}
						className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
					>
						Next
					</button>

				</div>
			</div>

		</div>
	);
}