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
		`var(--color-${props.backgroundColor}-700) ` || "var(--color-brand-200)"};
	padding: 0.2rem 1rem;
	color: ${(props) => props.color || "var(--color-black-900)"};
	text-transform: ${(props) => (props.text ? props.text : "uppercase")};
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	border: 2px solid var(--color-black-800);
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
				<Box colSpan={1} start={1} backgroundColor={statusToTagName[status]}>
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
				<Box colSpan={1} start={1} backgroundColor={"green"}>
					<HiOutlineAtSymbol />
				</Box>
				<Box colSpan={4} start={2} backgroundColor={"green"}>
					<p>{clientName}</p>
				</Box>
				<Box colSpan={2} start={6} backgroundColor={"green"}>
					<p>{email}</p>
				</Box>

				{/* #4 ROW */}
				<Box colSpan={4} start={2} backgroundColor={"cream"}>
					{"PRODUCT"}
				</Box>
				<Box colSpan={1} start={6} backgroundColor={"cream"}>
					{"QUANTITY"}
				</Box>
				<Box colSpan={1} start={7} backgroundColor={"cream"}>
					{"PRICE"}
				</Box>

				{/* #5 ROWS */}
				{orderItems.map((item, index) => (
					<>
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
					</>
				))}

				{/* {#6 ROW} */}
				<Box colSpan={4} start={2} backgroundColor={"cream"}>
					{"TOTAL"}
				</Box>
				<Box colSpan={1} start={6} backgroundColor={"cream"}>
					{orderItems.reduce((acc, cur) => {
						return acc + cur.quantity;
					}, 0)}
				</Box>
				<Box colSpan={1} start={7} backgroundColor={"cream"}>
					{totalPriceWithoutDelivery}
				</Box>

				{/* #7 ROW */}
				<Box colSpan={1} start={1} backgroundColor={"beige"}>
					<HiOutlineTruck />
				</Box>
				<Box colSpan={4} start={2} backgroundColor={"beige"}>
					{"Delivery included?"}
				</Box>
				<Box colSpan={1} start={6} color={"brand"} backgroundColor={"beige"}>
					{hasDelivery ? "Yes" : "No"}
				</Box>
				<Box colSpan={1} start={7} color={"brand"} backgroundColor={"beige"}>
					{hasDelivery ? settings.deliveryFee : 0}
				</Box>

				{/* #8 ROW */}
				<Box colSpan={1} start={1} backgroundColor={"beige"}>
					<HiOutlineCreditCard />
				</Box>
				<Box colSpan={3} start={2} backgroundColor={"beige"}>
					{"Is Paid?"}
				</Box>
				<Box colSpan={1} start={5} color={"brand"} backgroundColor={"beige"}>
					{isPaid ? "Yes" : "No"}
				</Box>
				<Box colSpan={2} start={6} color={"brand"} backgroundColor={"beige"}>
					{isPaid ? "ALREADY PAID" : "WILL PAY AT BAKERY"}
				</Box>

				{/* {#9 ROW} */}
				<Box colSpan={4} start={2} color={"white"} backgroundColor={"black"}>
					{"FINAL PRICE"}
				</Box>
				<Box colSpan={2} start={6} color={"white"} backgroundColor={"black"}>
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
