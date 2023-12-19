// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";
import ProductTable from "./ProductTable";

function AddProduct() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="product-form">
					<Button>Add new product</Button>
				</Modal.Open>
				<Modal.Window name="product-form">
					<CreateProductForm />
				</Modal.Window>

				<Modal.Open opens="table">
					<Button>Show table</Button>
				</Modal.Open>
				<Modal.Window name="table">
					<ProductTable />
				</Modal.Window>
			</Modal>
		</div>
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
