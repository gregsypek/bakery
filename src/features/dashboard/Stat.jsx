import styled from "styled-components";
import PropTypes from "prop-types";

const StyledStat = styled.div`
	/* Box */
	position: relative;
	border: 2px solid var(--color-brand-200);
	border-radius: var(--border-radius-lg);
	color: var(--color-white-700);

	padding: 1.4rem;
	display: flex;
	flex-direction: column;
	width: 20rem;
	height: 80%;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	position: absolute;
	left: -5rem;
	height: 13rem;
	width: auto;
`;

const Title = styled.h5`
	/* align-self: end; */
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-white-700);
`;

const Value = styled.p`
	font-size: 2.4rem;
	line-height: 1;
	font-weight: 500;
`;

function Stat({ src, title, value }) {
	return (
		<StyledStat>
			<Image src={src} alt="dashboard icon" />
			<Title>{title}</Title>
			<Value>{value}</Value>
		</StyledStat>
	);
}

Stat.propTypes = {
	title: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	// value: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Stat;
