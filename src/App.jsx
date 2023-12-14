import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
	/* background-color: var(--color-brand-100); */
	background-color: var(--color-black-900);

	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row type="horizontal">
					<Heading as="h1">Bakery</Heading>

					<div>
						<Heading as="h3">Bakery</Heading>
						<Button>Test</Button>
						<Button variation="secondary">Test</Button>
					</div>
				</Row>
				<Row type="vertical">
					<Heading as="h3">Form</Heading>
					<form>
						<Input type="number" placeholder="Number of products" />
					</form>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
