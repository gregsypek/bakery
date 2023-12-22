import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
	const [searchParams] = useSearchParams();

	//FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };
	// : { field: "status", value: filterValue, method: "gte" };

	const {
		isLoading,
		data: orders,
		error,
	} = useQuery({
		queryKey: ["orders", filter],
		queryFn: () => getOrders({ filter }),
	});

	return { isLoading, error, orders };
}
