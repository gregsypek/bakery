import { css, styled } from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 2px solid
		${(props) =>
			props.$type === "white"
				? "var(--color-brand-700)"
				: "var(--color-brand-200)"};
	border-radius: var(--border-radius-lg);
	background-color: var(--color-brand-100);
	font-weight: 500;
	box-shadow: var(--shadow-sm);

	${(props) =>
		props.$type === "brown" &&
		css`
			border: 2px solid var(--color-brand-800);
			background-color: var(--color-brand-400);
			border-radius: var(--border-radius-md);
			color: var(--color-black-900);
			font-weight: 400;
		`}
`;

function Select({ options, value, onChange, $type, ...props }) {
	return (
		<StyledSelect value={value} onChange={onChange} $type={$type} {...props}>
			{options.map((option, index) => (
				<option value={option.value} key={option.value ?? index}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}

Select.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	),
	value: PropTypes.string,
	onChange: PropTypes.func,
	$type: PropTypes.string,
	// ...PropTypes.object,
};

export default Select;
