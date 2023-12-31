import styled from "styled-components";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
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
