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

	//PAGINATION
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	const {
		isLoading,
		data: { data: orders, count } = {},
		error,
	} = useQuery({
		queryKey: ["orders", filter, sortBy, page], //acts like dependency in useEffect
		queryFn: () => getOrders({ filter, sortBy, page }),
	});

	return { isLoading, error, orders, count };
}
