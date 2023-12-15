import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import {
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
} from "react-icons/hi2";
import { LuChefHat } from "react-icons/lu";
import { TbBread } from "react-icons/tb";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin-top: 2rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-black-900);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		background-color: var(--color-brand-400);

		border-radius: var(--border-radius-lg);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-black-900);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-black-900);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to="/dashboard">
						<HiOutlineHome />
						<span>Home</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/orders">
						<HiOutlineCalendarDays />
						<span>Orders</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/products">
						<TbBread />
						<span>Products</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/users">
						<LuChefHat />
						<span>Users</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/settings">
						<HiOutlineCog6Tooth />
						<span>Settings</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
