/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
	height: 100vh;
	background-color: var(--color-brand-100);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	background-color: var(--color-brand-200);
	border: 1px solid var(--color-brand-800);
	border-radius: var(--border-radius-md);

	padding: 4.8rem;
	flex: 0 1 96rem;
	text-align: center;

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		margin-bottom: 3.2rem;
		color: var(--color-black-900);
	}
`;
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<>
			<GlobalStyles />
			<StyledErrorFallback>
				<Box>
					<Heading>Something went wrong :)</Heading>
					<p>{error.message}</p>
					<Button size="large" onClick={resetErrorBoundary}>
						Try again
					</Button>
				</Box>
			</StyledErrorFallback>
		</>
	);
}

export default ErrorFallback;
