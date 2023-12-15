import styled from "styled-components";

const StyledHeader = styled.header`
	background-color: var(--color-brand-100);
	padding: 1rem 4rem;
	border-bottom: 1px solid var(--color-brand-500);
`;

function Header() {
	return <StyledHeader>Header</StyledHeader>;
}

export default Header;
