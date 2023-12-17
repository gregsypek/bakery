import { styled } from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-brand-400);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-800);
`;

function FormRow({ label, error, children }) {
	return (
		<StyledFormRow>
			{/* only use children.props when you know that there will only one children element */}
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

FormRow.propTypes = {
	label: PropTypes.string,
	error: PropTypes.string,
	children: PropTypes.element, // Expect only one element, for more use PropTypes.node
};
export default FormRow;
