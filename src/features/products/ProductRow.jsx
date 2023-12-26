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
import Menus from "../../ui/Menus";

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
	width: fit-content;
	text-transform: uppercase;
	font-size: 1.1rem;
	font-weight: 500;
	padding: 0.4rem 1.2rem;
	border-radius: 100px;
	color: var(--color-black-900);
	background-color: var(--color-green-700);
`;
const Stock = styled.div`
	font-weight: 500;
	color: var(--color-black-900);
`;

function ProductRow({ product }) {
	const { isDeleting, deleteProduct } = useDeleteProduct();
	// eslint-disable-next-line no-unused-vars
	const { isCreating, createProduct } = useCreateProduct();

	const {
		// id: productId,
		productId,
		name,
		regularPrice,
		image,
		discount,
		stockQuantity,
	} = product;

	function handleDuplicate() {
		console.log("DUPLICATE!!!!!!!!!");
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
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={productId} />

						<Menus.List id={productId}>
							<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>

							<Modal.Open opens="edit">
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>

							<Modal.Open opens="delete">
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit">
							<CreateProductForm productToEdit={product} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								resource="product"
								disabled={isDeleting}
								onConfirm={() => deleteProduct(productId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

ProductRow.propTypes = {
	product: PropTypes.shape({
		productId: PropTypes.number,
		name: PropTypes.string,
		regularPrice: PropTypes.number,
		image: PropTypes.string,
		discount: PropTypes.number,
		stockQuantity: PropTypes.number,
	}),
};

export default ProductRow;
