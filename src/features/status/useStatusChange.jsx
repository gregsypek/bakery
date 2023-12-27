import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useStatusChange() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const statusChanged = useMutation(
		({ orderId, status }) => updateOrder(orderId, { status }), //The first argument is a function that will be invoked when the mutation is triggered.
		{
			onSuccess: (data) => {
				toast.success(
					`Order #${data.id} status successfully updated to ${data.status}`
				);
				queryClient.invalidateQueries({ active: true });
				navigate("/");
			},
			onError: () => {
				console.error("Error while updating status");
				toast.error("There was an error while updating status");
			},
		}
	);

	return { statusChanged, isStatusChanged: statusChanged.isLoading };
}
