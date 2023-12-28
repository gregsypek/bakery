import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
	HiOutlineChatBubbleBottomCenterText,
	HiOutlineCheckCircle,
	HiOutlineCurrencyDollar,
	HiOutlineHomeModern,
} from "react-icons/hi2";
import PropTypes from "prop-types";

import DataItem from "../../ui/DataItem";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledOrderDataBox = styled.section`
	/* Box */
	background-color: var(--color-brand-200);
	border: 2px solid var(--color-brand-900);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Header = styled.header`
	background-color: var(--color-blue-900);
	padding: 2rem 4rem;
	color: var(--color-brand-100);
	font-size: 1.8rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& div:first-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-weight: 600;
		font-size: 1.8rem;
	}

	& span {
		font-family: "Sono";
		font-size: 2rem;
		margin-left: 4px;
	}
`;

const Section = styled.section`
	padding: 3.2rem 4rem 1.2rem;
`;

const Client = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;
	margin-bottom: 1.6rem;
	color: var(--color-brand-800);

	& p:first-of-type {
		font-weight: 500;
		color: var(--color-blue-900);
	}
`;

const Price = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.6rem 3.2rem;
	border-radius: var(--border-radius-sm);
	margin-top: 2.4rem;

	background-color: ${(props) =>
		props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};
	color: ${(props) =>
		props.isPaid ? "var(--color-black-900)" : "var(--color-black-900)"};

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Footer = styled.footer`
	padding: 1.6rem 4rem;
	font-size: 1.2rem;
	color: var(--color-grey-500);
	text-align: right;
`;

// A purely presentational component
function OrderDataBox({ order }) {
	const {
		created_at,
		deliveryDate,
		hasDelivery,
		isPaid,
		observations,
		status,
		totalPrice,
		clients: { fullName: clientName, email },
		orderItems,
		//orderItems=[{quantity:3, productId:45, products:{name: 'soup'}}]
	} = order;

	return (
		<StyledOrderDataBox>
			<Header>
				<div>
					<HiOutlineHomeModern />
					<ul>
						{orderItems.map((item, index) => (
							<li key={index}>
								{item.quantity}
								<span>&times; </span> {item.products.name}
							</li>
						))}
					</ul>
				</div>

				<p>
					{format(new Date(created_at), "EEE, MMM dd yyyy")} (
					{isToday(new Date(created_at))
						? "Today"
						: formatDistanceFromNow(deliveryDate)}
					) &mdash; {format(new Date(deliveryDate), "EEE, MMM dd yyyy")}
				</p>
			</Header>

			<Section>
				<Client>
					<p>{clientName}</p>
					<span>&bull;</span>
					<p>{email}</p>
				</Client>

				{observations && (
					<DataItem
						icon={<HiOutlineChatBubbleBottomCenterText />}
						label="Observations"
					>
						{observations}
					</DataItem>
				)}

				<DataItem icon={<HiOutlineCheckCircle />} label="Delivery included?">
					{hasDelivery ? "Yes" : "No"}
				</DataItem>

				<Price isPaid={isPaid}>
					<DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
						{formatCurrency(totalPrice)}

						{status && <p>{status}</p>}
					</DataItem>

					<p>{isPaid ? "Paid" : "Will pay at bakery"}</p>
				</Price>
			</Section>

			<Footer>
				<p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
			</Footer>
		</StyledOrderDataBox>
	);
}

OrderDataBox.propTypes = {
	order: PropTypes.shape({
		created_at: PropTypes.string,
		deliveryDate: PropTypes.string,
		hasDelivery: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf([undefined]),
		]),
		isPaid: PropTypes.bool,
		observations: PropTypes.string,
		status: PropTypes.string,
		totalPrice: PropTypes.number,
		clients: PropTypes.shape({
			fullName: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
		}),
		orderItems: PropTypes.arrayOf(
			PropTypes.shape({
				quantity: PropTypes.number,
				productId: PropTypes.number,
				products: PropTypes.shape({
					name: PropTypes.string,
				}),
			})
		),
	}),
};
export default OrderDataBox;
