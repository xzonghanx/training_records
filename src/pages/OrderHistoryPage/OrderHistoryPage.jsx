import debug from "debug";
import { Outlet } from "react-router-dom";
import { checkToken } from "../../utilities/users-service";

const log = debug("mern:pages:OrderHistoryPage");

export default function OrderHistoryPage() {
	const handleCheckToken = async () => {
		const expDate = await checkToken();
		log("expDate: %o", expDate);
	};

	return (
		<>
			<p>OrderHistoryPage</p>
			<button onClick={handleCheckToken}>Check Login</button>
			<Outlet />
		</>
	);
}

//Outlet returns what is provided from the previous route element=<xxx>
