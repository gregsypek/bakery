import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { useCreateProduct } from "./useCreateProduct";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

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

function ProductRow({ product }) {
	const { isDeleting, deleteProduct } = useDeleteProduct();
	const { isCreating, createProduct } = useCreateProduct();

	// eslint-disable-next-line react/prop-types
	const {
		id: productId,
		name,
		regularPrice,
		image,
		discount,
		stockQuantity,
	} = product;

	function handleDuplicate() {
		createProduct({
			name: `Copy of ${name}`,
			regularPrice,
			image,
			discount,
			stockQuantity,
		});
	}
	return (
		<TableRow role="role">
			<Img src={image} />
			<Product>{name}</Product>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<Stock>{stockQuantity}</Stock>
			<div>
				<button onClick={handleDuplicate} disabled={isCreating}>
					<HiSquare2Stack />{" "}
				</button>
				<Modal>
					<Modal.Open opens="edit">
						<button>
							<HiPencil />
						</button>
					</Modal.Open>
					<Modal.Window name="edit">
						<CreateProductForm productToEdit={product} />
					</Modal.Window>

					<Modal.Open opens="delete">
						<button>
							<HiTrash />
						</button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resource="cabins"
							disabled={isDeleting}
							onConfirm={() => deleteProduct(productId)}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</TableRow>
	);
}

ProductRow.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		regularPrice: PropTypes.number.isRequired,
		image: PropTypes.string,
		discount: PropTypes.number,
		stockQuantity: PropTypes.number,
	}),
};

export default ProductRow;
