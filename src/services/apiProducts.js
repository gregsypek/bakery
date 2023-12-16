import supabase from "./supabase";

export async function getProducts() {
	let { data, error } = await supabase.from("products").select("*");

	if (error) {
		console.error(error);
		throw new Error("Products could not be loaded");
	}

	return data;
}

export async function deleteProduct(id) {
	const { data, error } = await supabase.from("products").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Product could not be deleted");
	}

	return data;
}
