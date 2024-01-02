/* eslint-disable react/prop-types */
//TODO: Add proptypes
import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
// import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
	display: grid;
	grid-template-columns: 12rem 2rem 1fr 2rem 12rem;
	gap: 1.2rem;
	align-items: center;

	font-size: 1.4rem;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-700);

	&:first-child {
		border-top: 1px solid var(--color-grey-700);
	}
`;

const Client = styled.div`
	font-weight: 500;
`;
//TODO: CHeck why small buttons doesn't work and delete this temporarily solution
const SmallButton = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	font-size: 1.2rem;
	padding: 0.3rem 0.8rem;
	text-transform: uppercase;
	font-weight: 600;
	text-align: center;
	color: var(--color-brand-100);
	background-color: var(--color-brand-900);
	border: 2px solid var(--color-brand-900);

	&:hover {
		background-color: var(--color-black-900);
	}
`;

function TodayItem({ activity }) {
	const {
		id,
		status,
		clients: { fullName },
	} = activity;

	return (
		<StyledTodayItem>
			{status === "new" && <Tag type="orange">New</Tag>}
			{status === "inprogress" && <Tag type="yellow">In Progress</Tag>}
			{status === "completed" && <Tag type="blue">Completed</Tag>}
			{status === "shipped" && <Tag type="grey">Shipped</Tag>}
			{status === "delivered" && <Tag type="green">Delivered</Tag>}

			<p>⊙</p>
			<Client>{fullName}</Client>
			<p>⊙</p>

			<SmallButton as={Link} to={`/status/${id}`}>
				Check order
			</SmallButton>
		</StyledTodayItem>
	);
}

export default TodayItem;
