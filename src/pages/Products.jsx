import { useState } from "react";
import ProductTable from "../features/products/ProductTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateProductForm from "../features/products/CreateProductForm";

function Products() {
	const [showForm, setShowForm] = useState(false);
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All products</Heading>
				<p>Filter/sort</p>
			</Row>
			<Row>
				<ProductTable />
				<Button onClick={() => setShowForm((show) => !show)}>
					Add new product
				</Button>
				{showForm && <CreateProductForm />}
			</Row>
		</>
	);
}

export default Products;
