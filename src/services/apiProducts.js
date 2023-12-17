import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
	let { data, error } = await supabase.from("products").select("*");

	if (error) {
		console.error(error);
		throw new Error("Products could not be loaded");
	}

	return data;
}

export async function createEditProduct(newProduct, id) {
	const hasImagePath = newProduct.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newProduct.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newProduct.image
		: `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;
	// https://qlujsantxvzzmdxlnmjj.supabase.co/storage/v1/object/public/product-images/product-01.png

	//1.Create/edit product
	let query = supabase.from("products");

	//A) Create
	if (!id) query = query.insert([{ ...newProduct, image: imagePath }]);

	//B) Edit
	if (id)
		query = query.update({ ...newProduct, image: imagePath }).eq("id", id);

	const { data, error } = await query
		.select() //to return newly created object
		.single();

	if (error) {
		console.error(error);
		throw new Error("Product could not be created");
	}

	//2. Upload image

	const { error: storageError } = await supabase.storage
		.from("product-images")
		.upload(imageName, newProduct.image);

	//3.Delete the product if there was an error uploading image
	if (storageError) {
		await supabase.from("products").delete().eq("id", data.id);
		console.log(storageError);
		throw new Error(
			"Product image could not be uploaded and the cabin was not created"
		);
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
