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

	//SORT
	const sortByRaw = searchParams.get("sortBy") || "deliveryDate-asc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: orders,
		error,
	} = useQuery({
		queryKey: ["orders", filter, sortBy], //acts like dependency in useEffect
		queryFn: () => getOrders({ filter, sortBy }),
	});

	return { isLoading, error, orders };
}
