import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { useCreateProduct } from "./useCreateProduct";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

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
		<Table.Row>
			<Img src={image} />
			<Product>{name}</Product>
			<Stock>{stockQuantity}</Stock>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
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
		</Table.Row>
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
