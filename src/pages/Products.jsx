import ProductTable from "../features/products/ProductTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Products() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All products</Heading>
				<p>Filter/sort</p>
			</Row>
			<Row>
				<ProductTable />
			</Row>
		</>
	);
}

export default Products;
