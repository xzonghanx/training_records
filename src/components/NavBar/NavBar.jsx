import { NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser }) {
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
			<NavLink to='' onClick={handleLogout}>
				Logout
			</NavLink>
		</nav>
	);
}
