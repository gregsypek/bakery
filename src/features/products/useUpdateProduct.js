import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditProduct } from "../../services/apiProducts";

export function useUpdateProduct() {
	const queryClient = useQueryClient();
	const { mutate: updateProduct, isLoading: isUpdating } = useMutation({
		mutationFn: ({ newProductData, productId }) =>
			createEditProduct(newProductData, productId),
		onSuccess: () => {
			toast.success("Product successfully edited");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateProduct };
}
