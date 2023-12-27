import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { useParams } from "react-router-dom";

export function useOrder() {
	const { orderId } = useParams();
	const {
		isLoading,
		data: order,
		error,
	} = useQuery({
		queryKey: ["order", orderId],
		queryFn: () => getOrder(orderId),
		retry: false, //react query fetch data 3 times in case of fails
	});

	return { isLoading, error, order };
}
