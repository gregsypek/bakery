import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import { formatDistanceFromNow } from "../../utils/helpers";
import {
	HiOutlineAtSymbol,
	HiOutlineCalendarDays,
	HiOutlineCreditCard,
	HiOutlineTruck,
} from "react-icons/hi2";
// import Tag from "../../ui/Tag";
import { statusToTagName } from "../status/statusTagName";
import React from "react";

const StyledOrderDataBox = styled.section`
	display: grid;
	gap: 0.5rem;
	grid-template-columns: repeat(7, minmax(min-content, 1fr));
	grid-template-rows: auto;
	overflow: hidden;
`;

const Box = styled.div`
	grid-column: ${(props) => `${props.start} / span ${props.colSpan}`};
	background-color: ${(props) =>
		`var(--color-${props.$backgroundcolor}-700) ` || "var(--color-brand-200)"};
	padding: 0.2rem 1rem;
	//TODO: fix color props.color as above and change colors after
	color: ${(props) => props.color || "var(--color-black-600)"};
	text-transform: ${(props) => (props.text ? props.text : "uppercase")};
	font-size: 1.6rem;
	font-weight: 400;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	border: 2px solid var(--color-black-700);
	/* border: 1.5px solid statusToTagName[status]; */
	border-radius: var(--border-radius-md);

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}
`;
const P = styled.p`
	margin-left: auto;
`;

const Footer = styled.footer`
	padding: 1rem 2rem;
	font-size: 1.3rem;
	color: var(--color-grey-500);
	text-align: right;
`;

function OrderDataBox({ order }) {
	const {
		created_at,
		deliveryDate,
		hasDelivery,
		isPaid,
		// observations,
		status,
		// totalPrice,
		clients: { fullName: clientName, email },
		orderItems,
		settings,
	} = order;

	const totalPriceWithoutDelivery = orderItems.reduce((acc, cur) => {
		return acc + cur.quantity * cur.products.regularPrice;
	}, 0);

	return (
		<>
			<StyledOrderDataBox>
				{/* #1 ROW */}
				<Box
					colSpan={1}
					start={1}
					color={"black"}
					$backgroundcolor={statusToTagName[status]}
				>
					{status.replace("-", " ")}
				</Box>

				{/* #2 ROW */}
				<Box colSpan={1} start={1}>
					<HiOutlineCalendarDays />
				</Box>
				<Box colSpan={4} start={2}>
					{format(new Date(created_at), "EEE, MMM dd yyyy")} (
					{isToday(new Date(created_at))
						? "Today"
						: formatDistanceFromNow(deliveryDate)}
					)
				</Box>
				<Box colSpan={2} start={6}>
					{format(new Date(deliveryDate), "EEE, MMM dd yyyy")}
				</Box>
				{/* #3 ROW */}
				<Box colSpan={1} start={1} $backgroundcolor={"blue"}>
					<HiOutlineAtSymbol />
				</Box>
				<Box colSpan={4} start={2} $backgroundcolor={"blue"}>
					<p>{clientName}</p>
				</Box>
				<Box colSpan={2} start={6} $backgroundcolor={"blue"}>
					<p>{email}</p>
				</Box>

				{/* #4 ROW */}
				<Box colSpan={4} start={2} color="black" $backgroundcolor={"cream"}>
					{"PRODUCT"}
				</Box>
				<Box colSpan={1} start={6} color="black" $backgroundcolor={"cream"}>
					{"QUANTITY"}
				</Box>
				<Box colSpan={1} start={7} color="black" $backgroundcolor={"cream"}>
					{"PRICE"}
				</Box>

				{/* #5 ROWS */}
				{orderItems.map((item, index) => (
					<React.Fragment key={index}>
						<Box colSpan={1} start={1}>
							#{index + 1}
						</Box>
						<Box colSpan={4} start={2}>
							{item.products.name}
						</Box>
						<Box colSpan={1} start={6} color={"brand"}>
							{item.quantity}
						</Box>
						<Box colSpan={1} start={7} color={"brand"}>
							{item.products.regularPrice}
						</Box>
					</React.Fragment>
				))}

				{/* {#6 ROW} */}
				<Box colSpan={4} start={2} color="black" $backgroundcolor={"cream"}>
					{"TOTAL"}
				</Box>
				<Box colSpan={1} start={6} color="black" $backgroundcolor={"cream"}>
					{orderItems.reduce((acc, cur) => {
						return acc + cur.quantity;
					}, 0)}
				</Box>
				<Box colSpan={1} start={7} color="black" $backgroundcolor={"cream"}>
					{totalPriceWithoutDelivery}
				</Box>

				{/* #7 ROW */}
				<Box colSpan={1} start={1} $backgroundcolor={"beige"}>
					<HiOutlineTruck />
				</Box>
				<Box colSpan={4} start={2} $backgroundcolor={"beige"}>
					{"Delivery included?"}
				</Box>
				<Box colSpan={1} start={6} color={"brand"} $backgroundcolor={"beige"}>
					{hasDelivery ? "Yes" : "No"}
				</Box>
				<Box colSpan={1} start={7} color={"brand"} $backgroundcolor={"beige"}>
					{hasDelivery ? settings.deliveryFee : 0}
				</Box>

				{/* #8 ROW */}
				<Box colSpan={1} start={1} $backgroundcolor={"beige"}>
					<HiOutlineCreditCard />
				</Box>
				<Box colSpan={3} start={2} $backgroundcolor={"beige"}>
					{"Is Paid?"}
				</Box>
				<Box colSpan={1} start={5} color={"brand"} $backgroundcolor={"beige"}>
					{isPaid ? "Yes" : "No"}
				</Box>
				<Box colSpan={2} start={6} color={"brand"} $backgroundcolor={"beige"}>
					{isPaid ? "ALREADY PAID" : "WILL PAY AT BAKERY"}
				</Box>

				{/* {#9 ROW} */}
				<Box colSpan={4} start={2} color="black" $backgroundcolor={"cream"}>
					{"FINAL PRICE"}
				</Box>
				<Box colSpan={2} start={6} color="black" $backgroundcolor={"cream"}>
					{totalPriceWithoutDelivery + (hasDelivery ? settings.deliveryFee : 0)}
				</Box>
			</StyledOrderDataBox>
			<Footer>
				<P>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</P>
			</Footer>
		</>
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
		settings: PropTypes.shape({
			deliveryFee: PropTypes.number,
		}),
	}),
};
export default OrderDataBox;
