import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.main`
	background-color: var(--color-brand-200);
	padding: 20px;
`;

function App() {
	return (
		<>
			<StyledApp>
				<GlobalStyles />
				<div>
					<Button>Test</Button>
					<Input />
				</div>
			</StyledApp>
		</>
	);
}

export default App;
