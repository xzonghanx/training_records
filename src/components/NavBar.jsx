import { NavLink } from "react-router-dom";
import { logOut } from "../utilities/users-service";

export default function NavBar({ setUser }) {
	const handleLogout = () => {
		logOut();
		setUser(null);
	};

	return (
		<nav>
			<NavLink to='/orders'>Order History</NavLink>
			&nbsp; | &nbsp;
			<NavLink to='/orders/new'>New Order</NavLink>
			&nbsp; | &nbsp;
			<NavLink to='' onClick={handleLogout}>
				Logout
			</NavLink>
		</nav>
	);
}
