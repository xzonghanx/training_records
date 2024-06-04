import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import PersonnelOverviewPage from "../PersonnelOverviewPage/PersonnelOverviewPage";
import PersonnelDetailsPage from "../PersonnelDetailsPage/PersonnelDetailsPage";
import AuthoriseRecordsPage from "../AuthoriseRecordsPage/AuthoriseRecordsPage";
import AddAuthorisationPage from "../AddAuthorisationPage/AddAuthorisationPage";
import EditPersonnelPage from "../EditPersonnelPage/EditPersonnelPage";
import NavBar from "../../../src/components/NavBar";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
const log = debug("pern:pages:App:App");

//TODO remove after testing out Outlet
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import CreatePersonnelPage from "../CreatePersonnelPage/CreatePersonnelPage";

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
							<Route path='/personnel' element={<PersonnelOverviewPage />} />
							<Route path='/personnel/new' element={<CreatePersonnelPage />} />
							<Route path='/personnel/:personId' element={<PersonnelDetailsPage />} />
							<Route path='/personnel/:personId/edit' element={<EditPersonnelPage />} />
							<Route path='/authorisation' element={<AuthoriseRecordsPage />} />
							<Route path='/authorisation/:personId/new' element={<AddAuthorisationPage />} />
							{/* Opened up Route to allow use of Outlet, allows 2 Routes to be displayed. this path is /orders2/new*/}
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
