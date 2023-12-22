import styled from "styled-components";
import { differenceInDays, format, isToday, parseISO } from "date-fns";

import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import PropTypes from "prop-types";

const Product = styled.div`
	font-size: 1.6rem;
	font-weight: 500;
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
		created_at,
		// extrasPrice,
		deliveryDate,
		hasDelivery,
		// isPaid,
		// observations,
		status,
		totalPrice,
		clients: { fullName: clientName, email },
		orderItems,
		// orderItems: { quantity },
		// products: { name },
		products,
	},
}) {
	const statusToTagName = {
		confirmed: "green",
		unconfirmed: "red",
		null: "red",
	};
	const deliveryToTagName = {
		true: "green",
		false: "red",
		null: "blue",
	};

	const startDate = parseISO(created_at);
	const endDate = parseISO(deliveryDate);

	const numberOfDays = differenceInDays(endDate, startDate);
	return (
		<Table.Row>
			<Product>{orderId}</Product>
			<Stacked>
				<span>{clientName}</span>
				<span>{email}</span>
			</Stacked>
			<Stacked>
				<span>
					{isToday(new Date(created_at))
						? "Today"
						: formatDistanceFromNow(deliveryDate)}
				</span>
				<span>{format(new Date(created_at), "MMM dd yyyy")} </span>
			</Stacked>
			<Stacked>
				<span>{numberOfDays} day left</span>
				<span>{format(new Date(deliveryDate), "MMM dd yyyy")}</span>
			</Stacked>
			<Stacked>
				<span>
					{orderItems.map((item, index) => (
						<span key={index}>
							{item.quantity} &times; {products.name}
							{index < orderItems.length - 1 && ","}{" "}
						</span>
					))}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status ?? "new"}</Tag>

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
		status: PropTypes.string,
		hasDelivery: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf([undefined]),
		]),
		// deliveryDate: PropTypes.instanceOf(Date),
		deliveryDate: PropTypes.string,
		created_at: PropTypes.string,
		totalPrice: PropTypes.number,
		clients: PropTypes.shape({
			fullName: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
		}),
		// orderItems: PropTypes.shape({ quantity: PropTypes.number }),
		orderItems: PropTypes.arrayOf(
			PropTypes.shape({
				quantity: PropTypes.number,
				// inne właściwości związane z orderItems
			})
		),
		products: PropTypes.shape({ name: PropTypes.string, id: PropTypes.id }),
	}),
};

export default OrderRow;
