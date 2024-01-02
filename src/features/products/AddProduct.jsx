// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";
import { styled } from "styled-components";

// import ProductTable from "./ProductTable";
const StyledDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

function AddProduct() {
	return (
		<StyledDiv>
			<Modal>
				<Modal.Open opens="product-form">
					<Button>Add new product</Button>
				</Modal.Open>
				<Modal.Window name="product-form">
					<CreateProductForm />
				</Modal.Window>

				{/* <Modal.Open opens="table">
					<Button>Show table</Button>
				</Modal.Open>
				<Modal.Window name="table">
					<ProductTable />
				</Modal.Window> */}
			</Modal>
		</StyledDiv>
	);
}

// function AddProduct() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>
// 				Add new product
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateProductForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddProduct;
