import { createContext, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Empty from "./Empty";

const StyledTable = styled.div`
	border: 2px solid var(--color-black-600);

	font-size: 1.4rem;
	background-color: var(--color-brand-100);

	border-radius: 7px;
	overflow: hidden;
`;

const CommonRow = styled.header`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2.4rem;
	align-items: center;
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;

	background-color: var(--color-black-600);
	border-bottom: 1px solid var(--color-brand-600);
	/* outline: 2px solid var(--color-brand-600); */
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;

	color: var(--color-brand-100);
`;

const StyledBody = styled.section`
	margin: 0.4rem 0;
	background-color: var(--color-brand-100);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-brand-700);
	}
`;

const Footer = styled.footer`
	background-color: var(--color-brand-100);
	display: flex;
	justify-content: center;
	padding: 1.2rem;

	&:not(:has(*)) {
		display: none;
	}
`;

// const Empty = styled.p`
// 	font-size: 1.6rem;
// 	font-weight: 500;
// 	text-align: center;
// 	margin: 2.4rem;
// `;

const TableContext = createContext();

function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}
function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader role="row" $columns={columns} as="header">
			{children}
		</StyledHeader>
	);
}
function Row({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow role="row" $columns={columns}>
			{children}
		</StyledRow>
	);
}
function Body({ data, render }) {
	if (!data.length) return <Empty>No data to show</Empty>;
	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

Table.propTypes = {
	columns: PropTypes.string,
	children: PropTypes.node,
};
Header.propTypes = {
	children: PropTypes.node,
};
Row.propTypes = {
	children: PropTypes.node,
};
Body.propTypes = {
	data: PropTypes.array,
	render: PropTypes.func,
};
export default Table;
