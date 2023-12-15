import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.header`
	/* background-color: var(--color-brand-900); */
	background: linear-gradient(
		180deg,
		#a6764f 0%,
		rgba(166, 118, 79, 0.9) 80.28%,
		rgba(166, 118, 79, 0.69) 100%
	);
	padding: 2rem 2.5rem;
	box-sizing: border-box;
	grid-row: 1/-1;
`;

// const Frame = styled.div`
// 	box-shadow: 0 0 0 2px var(--color-brand-800);
// 	border-radius: var(--border-radius-lg);
// 	width: 100%;
// 	height: 100%;
// 	padding: 15px;
// `;

function Sidebar() {
	return (
		<StyledSidebar>
			{/* <Frame> */}
			<Logo />
			<MainNav />
			{/* </Frame> */}
		</StyledSidebar>
	);
}

export default Sidebar;
