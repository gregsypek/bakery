// import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function ProductTable() {
	const { isLoading, products } = useProducts();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!products.length) return <Empty resourceName="products" />;

	// 1. Filter
	const filterValue = searchParams.get("discount") || "all";

	let filteredProducts;
	if (filterValue === "all") filteredProducts = products;
	if (filterValue === "no-discount")
		filteredProducts = products.filter((product) => product.discount === 0);
	if (filterValue === "with-discount")
		filteredProducts = products.filter((product) => product.discount > 0);

	// 2. Sort

	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	const sortedProducts =
		field === "name"
			? filteredProducts.sort((a, b) => a.name.localeCompare(b.name) * modifier)
			: filteredProducts.sort((a, b) => (a[field] - b[field]) * modifier);
	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 1.8fr 1fr 1fr 1fr;">
				<Table.Header>
					<div></div>
					<div>Product</div>
					<div>Stack Quantity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					// data={products}
					// data={filteredProducts}
					data={sortedProducts}
					render={(product, index) => (
						<ProductRow product={product} key={index} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default ProductTable;
