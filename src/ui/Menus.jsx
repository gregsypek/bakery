import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import PropTypes from "prop-types";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
	/* position: relative; */
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-700);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-black-800);
	}
`;

const StyledList = styled.ul`
	/* position: fixed; */
	position: absolute;
	z-index: 1000;

	background-color: var(--color-brand-100);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.$position.x}px;
	top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-brand-400);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-black-900);
		transition: all 0.3s;
	}
`;

const MenusContext = createContext();

function Menus({ children }) {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState(null);

	const close = () => setOpenId("");
	const open = setOpenId;

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

function Toggle({ id }) {
	const { openId, close, open, setPosition } = useContext(MenusContext);

	function handleClick(e) {
		e.stopPropagation();
		const rect = e.target.closest("button").getBoundingClientRect();
		setPosition({
			x: window.innerWidth - rect.width - rect.x + scrollX,
			y: rect.y + rect.height + 8 + scrollY,
		});

		openId === "" || openId !== id ? open(id) : close();
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ id, children }) {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick(close, false);

	if (openId !== id) return null;

	return createPortal(
		<StyledList $position={position} ref={ref}>
			{children}
		</StyledList>,
		document.body
	);
}
function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

Menus.propTypes = {
	children: PropTypes.node,
};
Toggle.propTypes = {
	id: PropTypes.number,
};
List.propTypes = {
	id: PropTypes.number,
	children: PropTypes.node,
};
Button.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	onClick: PropTypes.func,
};
export default Menus;
