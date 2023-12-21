import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createProduct } from "../../services/apiProducts";
import FormRow from "../../ui/FormRow";

function CreateProductForm() {
	const queryClient = useQueryClient();
	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			toast.success("New product successfully created");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>
			<FormRow label="stockQuantity" error={errors?.stockQuantity?.message}>
				<Input
					type="number"
					id="stockQuantity"
					disabled={isCreating}
					defaultValue={0}
					{...register("stockQuantity", { required: "This field is required" })}
				/>
			</FormRow>
			<FormRow label="regularPrice" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				{/* The $ prefix signals to styled-components to exclude the prop from being passed to the DOM. */}
				<Button $variation="empty" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add product</Button>
			</FormRow>
		</Form>
	);
}

export default CreateProductForm;
