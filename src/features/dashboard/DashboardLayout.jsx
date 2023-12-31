import styled from "styled-components";
import { useRecentOrdersSales } from "./useRecentOrdersSales";
import Spinner from "../../ui/Spinner";
import { useRecentOrders } from "./useRecentOrders";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { orders, isLoading } = useRecentOrdersSales();
	console.log(
		"🚀 ~ file: DashboardLayout.jsx:15 ~ DashboardLayout ~ orders:",
		orders
	);
	const {
		ordersData,
		isLoading: isLoadingData,
		inProgress,
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
			<div className="">Statistics</div>
			<div className="">Todays activity</div>
			<div className="">Chart order progress</div>
			<div className="">chart sales</div>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
