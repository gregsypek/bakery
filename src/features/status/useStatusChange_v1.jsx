import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useStatusCompleted() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: statusCompleted, isLoading: isStatusCompleted } = useMutation(
		{
			mutationFn: (orderId) =>
				updateOrder(orderId, {
					status: "completed",
				}),

			onSuccess: (data) => {
				toast.success(
					`Order #${data.id} status successfully updated to 'completed'`
				);
				queryClient.invalidateQueries({ active: true });
				navigate("/");
			},
			onError: () => toast.error("There was an error while updating status"),
		}
	);

	return { statusCompleted, isStatusCompleted };
}
