import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProduct } from "../../services/apiProducts";

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-brand-400);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

// const Error = styled.span`
// 	font-size: 1.4rem;
// 	color: var(--color-red-700);
// `;

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
	const { register, handleSubmit, reset } = useForm();

	function onSubmit(data) {
		mutate(data);
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow>
				<Label htmlFor="name">Product name</Label>
				<Input type="text" id="name" {...register("name")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="stockQuantity">Stock quantity</Label>
				<Input
					type="number"
					id="stockQuantity"
					{...register("stockQuantity")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input type="number" id="regularPrice" {...register("regularPrice")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Product photo</Label>
				<FileInput id="image" accept="image/*" />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="empty" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add product</Button>
			</FormRow>
		</Form>
	);
}

export default CreateProductForm;
