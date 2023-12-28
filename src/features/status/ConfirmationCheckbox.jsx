import Checkbox from "../../ui/Checkbox";
import PropTypes from "prop-types";

export function ConfirmationCheckbox({ checked, onChange, label }) {
	return (
		<Checkbox checked={checked} onChange={onChange}>
			{label}
		</Checkbox>
	);
}
ConfirmationCheckbox.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};
