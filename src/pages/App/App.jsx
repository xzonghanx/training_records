import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import debug from "debug";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../../src/components/NavBar";
import { getUser } from "../../utilities/users-service";
const log = debug("mern:pages:App:App");

function App() {
	const [user, setUser] = useState(getUser());
	log("user %o", user);

	return (
		<>
			<nav></nav>
			<main className='App'>
				{user ? (
					<>
						<NavBar setUser={setUser} />
						<Routes>
							<Route path='/orders/new' element={<NewOrderPage />} />
							<Route path='/orders' element={<OrderHistoryPage />} />

							{/* Opened up Route to allow use of Outlet, allows 2 Routes to be displayed */}
							<Route path='/orders2' element={<OrderHistoryPage />}>
								<Route path='new' element={<NewOrderPage />} />
							</Route>
						</Routes>
					</>
				) : (
					<AuthPage setUser={setUser} />
				)}
			</main>
		</>
	);
}

export default App;
