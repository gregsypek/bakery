import styled from "styled-components";
import { useRecentOrdersSales } from "./useRecentOrdersSales";
import Spinner from "../../ui/Spinner";
import { useRecentOrders } from "./useRecentOrders";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import CategoryChart from "./CategoryChart";
import TodayActivity from "../status/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 3.4rem;

	> :first-child {
		/* grid-row: 1 / span 1; */
		grid-column: 1/-1;
		/* This sets the element to cover the first row */
	}
`;

function DashboardLayout() {
	const { orders, isLoading, numDays } = useRecentOrdersSales();

	const {
		// ordersData,
		isLoading: isLoadingData,
		inProgress,
		completed,
		categories,
	} = useRecentOrders();

	if (isLoading || isLoadingData) return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats orders={orders} inProgress={inProgress} completed={completed} />
			<TodayActivity />
			<CategoryChart categories={categories} />
			<SalesChart orders={orders} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
