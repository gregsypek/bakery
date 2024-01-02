import styled from "styled-components";

const ButtonText = styled.button`
	color: var(--color-black-900);
	font-weight: 500;
	text-align: center;
	transition: all 0.3s;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);

	&:hover,
	&:active {
		color: var(--color-brand-800);
	}
`;

export default ButtonText;
