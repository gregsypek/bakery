import { getToday } from "../utils/helpers";
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
		.select("*, cabins(*), guests(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Order not found");
	}

	return data;
}

// Returns all ORDERS that are were created after the given date. Useful to get orders created in the last 30 days, for example.
export async function getOrdersAfterDate(date) {
	const { data, error } = await supabase
		.from("orders")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("orders")
		// .select('*')
		.select("*, guests(fullName)")
		.gte("startDate", date)
		.lte("startDate", getToday());

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("orders")
		.select("*, guests(fullName, nationality, countryFlag)")
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
		)
		.order("created_at");

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL orders ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}
	return data;
}

export async function updateOrder(id, obj) {
	const { data, error } = await supabase
		.from("orders")
		.update(obj)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Order could not be updated");
	}
	return data;
}

export async function deleteOrder(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from("orders").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Order could not be deleted");
	}
	return data;
}
