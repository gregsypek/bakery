import styled from "styled-components";
import { useRecentOrdersSales } from "./useRecentOrdersSales";
import Spinner from "../../ui/Spinner";
import { useRecentOrders } from "./useRecentOrders";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import CategoryChart from "./CategoryChart";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;

	> :first-child {
		/* grid-row: 1 / span 1; */
		grid-column: 1/-1;
		/* This sets the element to cover the first row */
	}
`;

function DashboardLayout() {
	const { orders, isLoading, numDays } = useRecentOrdersSales();
	console.log(
		"🚀 ~ file: DashboardLayout.jsx:15 ~ DashboardLayout ~ orders:",
		orders
	);
	const {
		ordersData,
		isLoading: isLoadingData,
		inProgress,
		completed,
		categories,
	} = useRecentOrders();
	console.log(
		"🚀 ~ file: DashboardLayout.jsx:20 ~ DashboardLayout ~ inProgress:",
		inProgress
	);
	console.log(
		"🚀 ~ file: DashboardLayout.jsx:20 ~ DashboardLayout ~ ordersData:",
		ordersData
	);

	if (isLoading || isLoadingData) return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats orders={orders} inProgress={inProgress} completed={completed} />
			{/* <div>Today</div> */}
			<CategoryChart categories={categories} />
			<SalesChart orders={orders} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
