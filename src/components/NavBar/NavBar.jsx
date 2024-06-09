import { NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser, isAdmin }) {
	const handleLogout = () => {
		logOut();
		setUser(null);
	};

	return (
		<nav>
			<NavLink to='/personnel'>Personnel Overview</NavLink>
			&nbsp; | &nbsp;
			<NavLink to='/authorisation'>Authorise Records</NavLink>
			&nbsp; | &nbsp;
			<NavLink to='/qualifications'>Qualifcations</NavLink>
			&nbsp; | &nbsp;
			{isAdmin ? <NavLink to='/users'>Users</NavLink> : ""}
			&nbsp; | &nbsp;
			<NavLink to='' onClick={handleLogout}>
				Logout
			</NavLink>
		</nav>
	);
}
