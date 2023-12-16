import styled from "styled-components";

const FileInput = styled.input`
	font-size: 1.4rem;
	border-radius: var(--border-radius-sm);
	background-color: var(--color-brand-200);
	border: 2px solid var(--color-brand-800);

	&::file-selector-button {
		font: inherit;
		font-weight: 500;
		padding: 0.8rem 1.2rem;
		margin-right: 1.2rem;
		border-radius: var(--border-radius-sm);
		border: none;
		color: var(--color-brand-500);
		background-color: var(--color-brand-600);

		cursor: pointer;
		transition: color 0.2s, background-color 0.2s;

		&:hover {
			background-color: var(--color-brand-700);
		}
	}
`;

export default FileInput;
