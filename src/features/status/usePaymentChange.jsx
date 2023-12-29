import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function usePaymentChange() {
	const queryClient = useQueryClient();
	// const navigate = useNavigate();

	const paymentChanged = useMutation(
		({ orderId, isPaid }) => updateOrder(orderId, { isPaid }), //The first argument is a function that will be invoked when the mutation is triggered.
		{
			onSuccess: (data) => {
				toast.success(
					`Order #${data.id}: Payment status successfully updated to ${
						data.isPaid ? "Paid" : "Unpaid"
					}.`
				);
				queryClient.invalidateQueries({ active: true });
				// navigate("/");
			},
			onError: () => {
				console.error("Error while updating payment");
				toast.error("There was an error while updating payment");
			},
		}
	);

	return { paymentChanged, isPaymentChanged: paymentChanged.isLoading };
}
