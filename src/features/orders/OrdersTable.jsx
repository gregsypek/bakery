import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import { useOrders } from "./useOrders";

function OrdersTable() {
	const { orders, isLoading } = useOrders();

	if (isLoading) return <Spinner />;

	if (!orders.length) return <Empty resourceName="orders" />;

	return (
		<Menus>
			<Table columns="0.5fr 1.5fr 1.2fr 1.2fr 1.4fr 1fr 1fr 1fr 3.2rem">
				<Table.Header>
					<div>Order</div>
					<div>Client</div>
					<div>Order Date</div>
					<div>Due Date</div>
					<div>Product</div>
					<div>Status</div>
					<div>Delivery</div>
					<div>Amount</div>
					{/* for operations like duplicate, edit */}
					<div></div>
				</Table.Header>
				<Table.Body
					data={orders}
					render={(order) => <OrderRow key={order.id} order={order} />}
				></Table.Body>
			</Table>
		</Menus>
	);
}

export default OrdersTable;
