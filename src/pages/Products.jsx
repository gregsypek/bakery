import ProductTable from "../features/products/ProductTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddProduct from "../features/products/AddProduct";

function Products() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All products</Heading>
				<p>Filter/sort</p>
			</Row>
			<Row>
				<ProductTable />
				<AddProduct />
			</Row>
		</>
	);
}

export default Products;
