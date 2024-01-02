import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
	const { isCreating, createProduct } = useCreateProduct();
	const { isUpdating, updateProduct } = useUpdateProduct();

	const isWorking = isCreating || isUpdating;

	const { productId: editId, ...editValues } = productToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			updateProduct(
				{ newProductData: { ...data, image }, productId: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createProduct(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label="stockQuantity" error={errors?.stockQuantity?.message}>
				<Input
					type="number"
					id="stockQuantity"
					disabled={isWorking}
					defaultValue={0}
					{...register("stockQuantity", { required: "This field is required" })}
				/>
			</FormRow>
			<FormRow label="regularPrice" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price quantity should be at least 1",
						},
					})}
				/>
			</FormRow>
			<FormRow label="discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							//getValues returns an object
							value <= getValues().regularPrice ||
							"Discount should be less than regular price",
					})}
				/>
			</FormRow>
			<FormRow label="description" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label="image">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					$variation="empty"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isCreating}>
					{isEditSession ? "Edit product" : "Create new product"}
				</Button>
			</FormRow>
		</Form>
	);
}

CreateProductForm.propTypes = {
	productToEdit: PropTypes.shape({
		productId: PropTypes.number,
		name: PropTypes.string,
		regularPrice: PropTypes.number,
		image: PropTypes.string,
		discount: PropTypes.number,
		stockQuantity: PropTypes.number,
	}),
	onCloseModal: PropTypes.func,
};

export default CreateProductForm;
