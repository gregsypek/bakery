import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "new", label: "New" },
					{ value: "inprogress", label: "Inprogress" },
					{ value: "completed", label: "Completed" },
					{ value: "shipped", label: "Shipped" },
					{ value: "delivered", label: "Delivered" },
				]}
			/>

			<SortBy
				options={[
					{ value: "deliveryDate-desc", label: "Sort by date (recent first)" },
					{ value: "deliveryDate-asc", label: "Sort by date (earlier first)" },
					{
						value: "totalPrice-desc",
						label: "Sort by amount (high first)",
					},
					{ value: "totalPrice-asc", label: "Sort by amount (low first)" },
				]}
			/>
		</TableOperations>
	);
}

export default OrderTableOperations;
