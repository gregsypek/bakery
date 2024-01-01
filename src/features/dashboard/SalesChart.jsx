/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-700);
	}
`;

// const fakeData = [
// 	{ label: "Jan 09", totalSales: 480, extrasSales: 320 - 300 },
// 	{ label: "Jan 10", totalSales: 580, extrasSales: 400 - 300 }
// ];

function SalesChart({ orders, numDays }) {
	console.log("🚀 ~ file: SalesChart.jsx:61 ~ SalesChart ~ orders:", orders);
	console.log("🚀 ~ file: SalesChart.jsx:61 ~ SalesChart ~ numDays:", numDays);
	const { isDarkMode } = useDarkMode();

	//Return the array of dates within the specified time interval
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: orders
				.filter((order) => isSameDay(date, new Date(order.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: orders
				.filter((order) => isSameDay(date, new Date(order.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});

	const colors = isDarkMode
		? {
				totalSales: { stroke: "#875d3b", fill: "#A6764F" },
				extrasSales: { stroke: "#a0a0a1", fill: "#a0a0a1" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				totalSales: { stroke: "#875d3b", fill: "#A6764F" },
				extrasSales: { stroke: "#A6764F", fill: "#FEF7DB" },
				text: "#374151",
				background: "#fff",
		  };

	return (
		<StyledSalesChart>
			<Heading as="h2">Sales</Heading>
			<ResponsiveContainer height={300} width={"100%"}>
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit="$"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>

					<CartesianGrid strokeDasharray="4" />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						unit="$"
					/>
					<Area
						dataKey={"extrasSales"}
						type={"monotone"}
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extra sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

SalesChart.propTypes = {
	orders: PropTypes.arrayOf({
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
	}),
	numDays: PropTypes.number,
};
export default SalesChart;
