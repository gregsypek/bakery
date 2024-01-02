import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrderAfterDate } from "../../services/apiOrders";

export function useRecentOrders() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));

	//subDays - Subtract the specified number of days from the given date.
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: ordersData } = useQuery({
		queryFn: () => getOrderAfterDate(queryDate),
		queryKey: ["ordersData", `last-${numDays}`],
	});

	const inProgress = ordersData?.filter(
		(order) => order.status === "inprogress"
	);

	const completed = ordersData?.filter((order) =>
		["completed", "shipped", "delivered"].includes(order.status)
	);
	const categories = ordersData?.map((order) => order.category);

	return { isLoading, ordersData, inProgress, completed, categories };
}
