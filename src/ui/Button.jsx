import { css, styled } from "styled-components";

const sizes = {
	small: css`
		font-size: 1.2rem;
		padding: 0.3rem 0.8rem;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	`,
	medium: css`
		font-size: 1.4rem;
		padding: 1rem 1.6rem;
		font-weight: 500;
	`,
	large: css`
		font-size: 1.6rem;
		padding: 1rem 2.4rem;
		font-weight: 500;
	`,
};

const variations = {
	primary: css`
		color: var(--color-brand-100);
		background-color: var(--color-brand-900);
		border: 2px solid var(--color-brand-900);

		&:hover {
			background-color: var(--color-black-900);
		}
	`,
	secondary: css`
		color: var(--color-brand-100);
		background: var(--color-black-900);
		border: 2px solid var(--color-brand-100);

		&:hover {
			background-color: var(--color-black-800);
		}
	`,
	empty: css`
		color: var(--color-black-900);
		background: var(--color-brand-100);
		border: 2px solid var(--color-black-900);

		&:hover {
			background-color: var(--color-brand-900);
		}
	`,
	danger: css`
		color: var(--color-brand-100);
		background-color: var(--color-red-800);

		&:hover {
			background-color: var(--color-red-900);
		}
	`,
};

const Button = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);

	${(props) => sizes[props.$size]}
	${(props) => variations[props.$variation]}
`;

Button.defaultProps = {
	$variation: "primary",
	$size: "medium",
};

export default Button;
