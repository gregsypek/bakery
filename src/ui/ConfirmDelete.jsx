import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import PropTypes from "prop-types";

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-brand-300);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
	return (
		<StyledConfirmDelete>
			<Heading as="h3">Delete {resource}</Heading>
			<p>
				Are you sure you want to delete this {resource} permanently? This action
				cannot be undone.
			</p>

			<div>
				<Button variation="empty" onClick={onCloseModal} disabled={disabled}>
					Cancel
				</Button>
				<Button variation="danger" onClick={onConfirm} disabled={disabled}>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}
ConfirmDelete.propTypes = {
	resource: PropTypes.string,
	disabled: PropTypes.bool,
	onCloseModal: PropTypes.func,
	onConfirm: PropTypes.func,
};
export default ConfirmDelete;
