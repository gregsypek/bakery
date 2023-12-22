// import SortBy from "ui/SortBy";

import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "new", label: "New" },
					{ value: "processing", label: "Processing" },
					{ value: "shipped", label: "Shipped" },
					{ value: "canceled", label: "Canceled" },
					{ value: "completed", label: "Completed" },
				]}
			/>

			{/* <SortBy
				options={[
					{ value: "startDate-desc", label: "Sort by date (recent first)" },
					{ value: "startDate-asc", label: "Sort by date (earlier first)" },
					{
						value: "totalPrice-desc",
						label: "Sort by amount (high first)",
					},
					{ value: "totalPrice-asc", label: "Sort by amount (low first)" },
				]}
			/> */}
		</TableOperations>
	);
}

export default OrderTableOperations;
