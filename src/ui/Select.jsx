import { styled } from "styled-components";
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
`;

function Select({ options, value, onChange, $type, ...props }) {
	return (
		<StyledSelect value={value} onChange={onChange} $type={$type} {...props}>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
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
