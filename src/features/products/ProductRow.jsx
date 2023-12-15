import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-brand-700);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Product = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-black-900);
`;

const Price = styled.div`
	font-weight: 600;
`;

const Discount = styled.div`
	font-weight: 500;
	color: var(--color-green-700);
`;
const Stock = styled.div`
	font-weight: 500;
	color: var(--color-black-900);
`;

// eslint-disable-next-line react/prop-types
function ProductRow({ product }) {
	console.log("🚀 ~ file: ProductRow.jsx:52 ~ ProductRow ~ product:", product);

	// eslint-disable-next-line react/prop-types
	const { name, regularPrice, image, discount, stockQuantity } = product;

	return (
		<TableRow role="role">
			<Img src={image} />
			<Product>{name}</Product>
			<Price>{formatCurrency(regularPrice)}</Price>
			<Discount>{formatCurrency(discount)}</Discount>
			<Stock>{stockQuantity}</Stock>
			<button>Delete</button>
		</TableRow>
	);
}

export default ProductRow;
