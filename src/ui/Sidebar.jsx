import styled from "styled-components";

const StyledSidebar = styled.header`
	background-color: var(--color-brand-900);
	padding: 1rem 4rem;
	border-bottom: 1px solid var(--color-brand-500);

	grid-row: 1/-1;
`;

function Sidebar() {
	return <StyledSidebar>Sidebar</StyledSidebar>;
}

export default Sidebar;
