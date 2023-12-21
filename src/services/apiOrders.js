import supabase from "./supabase";

export async function getOrders() {
	const { data, error } = await supabase
		.from("orders")
		.select(
			"id, created_at, extrasPrice, hasDelivery, isPaid, status, totalPrice, clients(fullName, email)"
		);

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
