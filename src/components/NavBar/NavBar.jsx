import { NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser, isAdmin }) {
	const handleLogout = () => {
		logOut();
		setUser(null);
	};

	return (
		<header className='flex flex-wrap justify-between sm:justify-start sm:flex-nowrap w-full bg-white bg-opacity-75 text-sm py-4 mb-5 drop-shadow-xl shadow-xl'>
			<nav
				className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between'
				aria-label='Global'>
				<NavLink to='/personnel'>Personnel Overview</NavLink>
				&nbsp; | &nbsp;
				<NavLink to='/authorisation'>Authorise Records</NavLink>
				&nbsp; | &nbsp;
				<NavLink to='/qualifications'>Qualifications</NavLink>
				&nbsp; | &nbsp;
				{isAdmin ? <NavLink to='/users'>Users</NavLink> : ""}
				&nbsp; | &nbsp;
				<NavLink to='' onClick={handleLogout}>
					Logout
				</NavLink>
			</nav>
		</header>
	);
}
