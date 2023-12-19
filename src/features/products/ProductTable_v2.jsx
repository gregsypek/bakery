// import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import { styled } from "styled-components";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";

const Table = styled.div`
	border: 1px solid var(--color-brand-400);
	font-size: 1.4rem;
	background-color: var(--color-brand-200);
	margin-top: var(--margin-top-sm);
	border-radius: var(--border-radius-lg);
	overflow: hidden;
`;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-black-900);
	border-bottom: 1px solid var(--color-brand-400);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-brand-100);
	padding: 1.6rem 2.4rem;
`;

function ProductTable() {
	const { isLoading, products } = useProducts();

	if (isLoading) return <Spinner />;
	return (
		<Table role="table">
			<TableHeader role="row">
				<div></div>
				<div>Product</div>
				<div>Price</div>
				<div>Discount</div>
				<div>Stack Quantity</div>
				<div></div>
			</TableHeader>
			{products.map((product) => (
				<ProductRow product={product} key={product.id} />
			))}
		</Table>
	);
}

export default ProductTable;
