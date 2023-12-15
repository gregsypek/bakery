import { useEffect } from "react";
import { getProducts } from "../services/apiProducts";

function Products() {
	useEffect(() => {
		getProducts().then((data) => console.log("data", data));
	}, []);
	return (
		<div>
			<span>products</span>
			<img
				src="https://qlujsantxvzzmdxlnmjj.supabase.co/storage/v1/object/public/product-images/product-01.png"
				alt="2"
			/>
		</div>
	);
}

export default Products;
