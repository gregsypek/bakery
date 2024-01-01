import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrderSalesAfterDate } from "../../services/apiOrders";

export function useRecentOrdersSales() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));

	//subDays - Subtract the specified number of days from the given date.
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: orders } = useQuery({
		queryFn: () => getOrderSalesAfterDate(queryDate),
		queryKey: ["orders", `last-${numDays}`],
	});

	return { isLoading, orders, numDays };
}
