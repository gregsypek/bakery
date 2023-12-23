import supabase from "./supabase";

export async function getOrders({ filter, sortBy }) {
	let query = supabase
		.from("orders")
		.select(
			"id, created_at, deliveryDate, extrasPrice, hasDelivery, isPaid, status, totalPrice, clients(fullName, email), orderItems(quantity, productId, products(name))"
		);

	//FILTER
	if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

	//SORT
	if (sortBy)
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === "asc",
		});
	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error("Orders could not be loaded");
	}
	return data;
}

export async function getOrder(id) {
	const { data, error } = await supabase
		.from("orders")
		.select("*, clients(*), products(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Order not found");
	}

	return data;
}
