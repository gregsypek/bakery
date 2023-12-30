import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
	background-color: var(--color-brand-100);
	padding: 1rem 4rem;
	border-bottom: 1px solid var(--color-brand-500);
`;

function Header() {
	return (
		<StyledHeader>
			<Logout />
		</StyledHeader>
	);
}

export default Header;
