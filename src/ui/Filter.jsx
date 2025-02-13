import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledFilter = styled.div`
	border: 2px solid var(--color-brand-900);
	background-color: var(--color-brand-100);
	color: var(--color-black-900);

	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-lg);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-400);
			color: var(--color-black-900);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	function handleClick(value) {
		searchParams.set(filterField, value);
		if (searchParams.get("page")) searchParams.set("page", 1);

		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					$active={option.value === currentFilter}
					disabled={option.value === currentFilter}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

Filter.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	filterField: PropTypes.string,
};

export default Filter;
