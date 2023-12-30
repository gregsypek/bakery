import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
	background-color: var(--color-brand-100);
	padding: 1rem 4rem;
	border-bottom: 1px solid var(--color-brand-500);

	display: flex;
	gap: 2.4rem;
	align-items: center;
	justify-content: flex-end;
`;

function Header() {
	return (
		<StyledHeader>
			<UserAvatar />
			<HeaderMenu />
		</StyledHeader>
	);
}

export default Header;
