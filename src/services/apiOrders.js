import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getOrders({ filter, sortBy, page }) {
	let query = supabase
		.from("orders")
		.select(
			"id, created_at, deliveryDate, extrasPrice, hasDelivery, isPaid, observations, status, totalPrice, clients(fullName, email), orderItems(quantity, productId, products(name))",
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
	const { data: orderData, error: orderError } = await supabase
		.from("orders")
		.select(
			"*, clients(*), products(*), orderItems(quantity, productId, products(name, regularPrice)))"
		)
		.eq("id", id)
		.single();
	if (orderError) {
		console.error(orderError);
		throw new Error("Order not found");
	}

	// Get data from settings - deliveryFee - as well
	const { data, error } = await supabase
		.from("settings")
		.select("deliveryFee")
		.eq("id", 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings not found");
	}

	const orderWithSettings = {
		...orderData,
		settings: data,
	};

	return orderWithSettings;
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
		throw new Error(`Order could not be updated", ${error.message}`);
	}
	return data;
}

export async function deleteOrder(id) {
	const { data, error } = await supabase.from("orders").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Order could not be deleted");
	}
	return data;
}

//NOTE: not working but delete cascade in supabase helps to delete like above (all related foreign keys after deletion will be deleted as well)

// export async function deleteOrder(id) {
// 	console.log("🚀 ~ file: apiProducts.js:76 ~ deleteOrder ~ id:", id);
// 	try {
// 		// Check if the order is referenced in the orderItems table
// 		const { data: orderItemsData, error: orderItemsError } = await supabase
// 			.from("orderItems")
// 			.select("id")
// 			.eq("orderId", id);

// 		if (orderItemsError) {
// 			console.error(orderItemsError);
// 			throw new Error("Error checking order references in orderItems table");
// 		}

// 		console.log(
// 			"🚀 ~ file: apiOrders.js:90 ~ deleteOrder ~ orderItemsData:",
// 			orderItemsData
// 		); //id24
// 		// If order is referenced in orderItems, delete those orderItems first
// 		if (orderItemsData && orderItemsData.length > 0) {
// 			for (const orderItem of orderItemsData) {
// 				console.log(
// 					"🚀 ~ file: apiOrders.js:117 ~ deleteOrder ~  orderItem.id:",
// 					orderItem.id
// 				);
// 				await supabase.from("orderItems").delete().eq("id", orderItem.id);
// 			}
// 		}

// 		// Now, delete the order
// 		const { data, error } = await supabase.from("orders").delete().eq("id", id);

// 		if (error) {
// 			console.error(error);
// 			throw new Error("Order could not be deleted");
// 		}

// 		return data;
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error("Error deleting order");
// 	}
// }

//Returns all ORDERS that were created after the given date. Useful to get orders created in the last 30 days, for example. date must be in ISOString.

export async function getOrderSalesAfterDate(date) {
	const { data, error } = await supabase
		.from("orders")
		.select("created_at,totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}
	return data;
}

//Returns all Orders for table with client table
export async function getOrderAfterDate(date) {
	const { data, error } = await supabase
		.from("orders")
		.select("*, clients(fullName)")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}
	return data;
}
