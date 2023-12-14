import { styled } from "styled-components";

const Button = styled.button`
	border: 3px solid black;
	font-weight: 500;
	padding: 1.2rem 1.6rem;
	border-radius: var(--border-radius-lg);
	color: var(--color-brand-100);
	background-color: var(--color-brand-900);
	cursor: pointer;
	&:hover {
		background-color: var(--color-black-900);
		color: var(--color-black-900);
	}
`;
export default Button;
