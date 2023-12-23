import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
	const queryClient = useQueryClient();
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

	//QUERY
	const {
		isLoading,
		data: { data: orders, count } = {},
		error,
	} = useQuery({
		queryKey: ["orders", filter, sortBy, page], //acts like dependency in useEffect
		queryFn: () => getOrders({ filter, sortBy, page }),
	});

	//PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["orders", filter, sortBy, page + 1],
			queryFn: () => getOrders({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["orders", filter, sortBy, page - 1],
			queryFn: () => getOrders({ filter, sortBy, page: page - 1 }),
		});
	return { isLoading, error, orders, count };
}
