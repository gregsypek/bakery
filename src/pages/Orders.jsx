import OrdersTable from "../features/orders/OrdersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Orders() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All Orders</Heading>
			</Row>
			<p>TEST</p>
			<OrdersTable />
		</>
	);
}

export default Orders;
