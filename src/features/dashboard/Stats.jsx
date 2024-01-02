import PropTypes from "prop-types";
import Stat from "./Stat";
import { styled } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDarkMode } from "../../context/DarkModeContext";

function Stats({ orders, inProgress, completed }) {
	const { isDarkMode } = useDarkMode();

	const StyledBar = styled.div`
		background-color: ${isDarkMode ? "#2B190B" : "#402510"};
		display: flex;
		align-items: center;
		gap: 10%;
		border-radius: var(--border-radius-xl);
		padding: 0.5rem 5rem;
	`;

	//1.
	const numOrders = orders?.length;
	//2.
	const sales = orders?.reduce((acc, cur) => acc + cur.totalPrice, 0);
	//3.
	const inprogress = inProgress?.length;
	//4
	const completedRate = completed?.length / orders?.length;

	return (
		<StyledBar>
			<Stat title="Orders" src={"/orders.png"} value={numOrders} />
			<Stat title="Sales" src={"/sales.png"} value={formatCurrency(sales)} />
			<Stat title="Progress state" src={"/stats.png"} value={inprogress} />
			<Stat
				title="Progress rate"
				src={"/progress.png"}
				value={Math.round(completedRate * 100) + "%"}
			/>
		</StyledBar>
	);
}

export default Stats;

const orderPropTypesShape = PropTypes.shape({
	id: PropTypes.number.isRequired,
	status: PropTypes.string,
	hasDelivery: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf([undefined]),
	]),
	deliveryDate: PropTypes.string,
	created_at: PropTypes.string,
	totalPrice: PropTypes.number,
	clients: PropTypes.shape({
		fullName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}),
	orderItems: PropTypes.arrayOf(
		PropTypes.shape({
			quantity: PropTypes.number,
			productId: PropTypes.number,
		})
	),
});

Stats.propTypes = {
	orders: PropTypes.arrayOf(orderPropTypesShape),
	inProgress: PropTypes.arrayOf(orderPropTypesShape),
	completed: PropTypes.arrayOf(orderPropTypesShape),
};
