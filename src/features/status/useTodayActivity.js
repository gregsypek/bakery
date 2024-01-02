import { useQuery } from "@tanstack/react-query";
import { getOrdersTodayActivity } from "../../services/apiOrders";

export function useTodayActivity() {
	const { isLoading, data: activities } = useQuery({
		queryFn: () => getOrdersTodayActivity(),
		queryKey: ["today-activity"],
	});

	return { activities, isLoading };
}
