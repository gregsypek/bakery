import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProductTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
				]}
			/>

			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
					{ value: "name-desc", label: "Sort by name (Z-A)" },
					{ value: "stockQuantity-asc", label: "Sort by stock (low first)" },
					{ value: "stockQuantity-desc", label: "Sort by stock (high first)" },
					{ value: "regularPrice-asc", label: "Sort by price (low first)" },
					{ value: "regularPrice-desc", label: "Sort by price (high first)" },
				]}
			/>
		</TableOperations>
	);
}

export default ProductTableOperations;
