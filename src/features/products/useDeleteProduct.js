import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct() {
	const queryProduct = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
		mutationFn: (id) => deleteProductApi(id),
		onSuccess: () => {
			toast.success("Product successfully deleted");
			//invalidateQueries only work on useClient and we have special hook useQueryClient to get one
			queryProduct.invalidateQueries({
				queryKey: ["products"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteProduct };
}
