import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getOrders({ filter, sortBy, page }) {
	let query = supabase
		.from("orders")
		.select(
			"id, created_at, deliveryDate, extrasPrice, hasDelivery, isPaid, status, totalPrice, clients(fullName, email), orderItems(quantity, productId, products(name))",
			{ count: "exact" }
		);

	//FILTER
	if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

	//SORT
	if (sortBy)
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === "asc",
		});

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}
	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error("Orders could not be loaded");
	}
	return { data, count };
}

export async function getOrder(id) {
	const { data, error } = await supabase
		.from("orders")
		.select("*, clients(*), products(*), orderItems(*))")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Order not found");
	}

	console.log("🚀 ~ file: apiOrders.js:49 ~ getOrder ~ data:", data);
	return data;
}
