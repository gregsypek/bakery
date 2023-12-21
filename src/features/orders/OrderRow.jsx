import styled from "styled-components";

import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";

const Product = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(----color-black-800);
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-black-800);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-weight: 500;
`;

function OrderRow({
	order: {
		id: orderId,
		// created_at,
		// extrasPrice,
		hasDelivery,
		// isPaid,
		// observations,
		status,
		totalPrice,
		clients: { fullName: clientName, email },
		// items: { productId: id }, //FIXME: CHECK THIS
	},
}) {
	const statusToTagName = {
		confirmed: "green",
		unconfirmed: "red",
	};
	const deliveryToTagName = {
		true: "green",
		false: "red",
	};
	return (
		<Table.Row>
			<Product>{orderId}</Product>
			<Stacked>
				<span>{clientName}</span>
				<span>{email}</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status}</Tag>
			<Tag type={deliveryToTagName[hasDelivery]}>
				{hasDelivery ? <span>ON</span> : <span>OFF</span>}
			</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>
		</Table.Row>
	);
}
OrderRow.propTypes = {
	order: PropTypes.shape({
		id: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
		hasDelivery: PropTypes.boolean,

		totalPrice: PropTypes.number.isRequired,
		clients: PropTypes.shape({
			fullName: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
		}),
	}),
};

export default OrderRow;
