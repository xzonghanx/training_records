import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import PersonnelOverviewPage from "../PersonnelOverviewPage/PersonnelOverviewPage";
import PersonnelDetailsPage from "../PersonnelDetailsPage/PersonnelDetailsPage";
import AuthoriseRecordsPage from "../AuthoriseRecordsPage/AuthoriseRecordsPage";
import AddAuthorisationPage from "../AddAuthorisationPage/AddAuthorisationPage";
import EditAuthorisationPage from "../EditAuthorisationPage/EditAuthorisationPage";
import CreatePersonnelPage from "../CreatePersonnelPage/CreatePersonnelPage";
import EditPersonnelPage from "../EditPersonnelPage/EditPersonnelPage";
import QualificationsPage from "../QualificationsPage/QualificationsPage";
import NavBar from "../../../src/components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
const log = debug("pern:pages:App:App");

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
							{/* <Route path='/qualifications' element={<QualificationsPage />} /> */}
							{/* use this for later, when creating admin landing page */}
							<Route
								path='/personnel/:personId/authorisation/new'
								element={<AddAuthorisationPage />}>
								<Route path='' element={<QualificationsPage />} />
							</Route>
							<Route
								path='/personnel/:personId/authorisation/:athId'
								element={<EditAuthorisationPage />}>
								<Route path='' element={<QualificationsPage />} />
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
