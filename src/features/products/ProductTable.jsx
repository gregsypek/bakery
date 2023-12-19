// import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";
import Table from "../../ui/Table";

function ProductTable() {
	const { isLoading, products } = useProducts();

	if (isLoading) return <Spinner />;
	return (
		<Table columns="0.6fr 1.8fr 1.8fr 1fr 1fr 1fr;">
			<Table.Header>
				<div></div>
				<div>Product</div>
				<div>Stack Quantity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			{products.map((product) => (
				<ProductRow product={product} key={product.id} />
			))}
		</Table>
	);
}

export default ProductTable;
