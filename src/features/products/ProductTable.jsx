// import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function ProductTable() {
	const { isLoading, products } = useProducts();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	const filterValue = searchParams.get("discount") || "all";
	let filteredProducts;
	if (filterValue === "all") filteredProducts = products;
	if (filterValue === "no-discount")
		filteredProducts = products.filter((product) => product.discount === 0);
	if (filterValue === "with-discount")
		filteredProducts = products.filter((product) => product.discount > 0);
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
					data={filteredProducts}
					render={(product) => (
						<ProductRow product={product} key={product.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default ProductTable;
