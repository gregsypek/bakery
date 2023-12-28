import Button from "../../ui/Button";
import PropTypes from "prop-types";

export function ChangeStatusButton({ onClick, disabled }) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			Change status
		</Button>
	);
}

ChangeStatusButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
};
