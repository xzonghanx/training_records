import "../../../index.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import PersonnelOverviewPage from "../PersonnelOverviewPage/PersonnelOverviewPage";
import PersonnelDetailsPage from "../PersonnelDetailsPage/PersonnelDetailsPage";
import AuthoriseRecordsPage from "../AuthoriseRecordsPage/AuthoriseRecordsPage";
import AddAuthorisationPage from "../AddAuthorisationPage/AddAuthorisationPage";
import EditAuthorisationPage from "../EditAuthorisationPage/EditAuthorisationPage";
import CreatePersonnelPage from "../CreatePersonnelPage/CreatePersonnelPage";
import EditPersonnelPage from "../EditPersonnelPage/EditPersonnelPage";
import QualificationsPage from "../QualificationsPage/QualificationsPage";
import AmendQualificationsPage from "../AmendQualificationsPage/AmendQualificationsPage";
import UsersPage from "../UsersPage/UsersPage";
import NavBar from "../../../src/components/NavBar/NavBar";
import UserTimeout from "../../components/UserTimeout/UserTimeout";
import { getUser } from "../../utilities/users-service";
import debug from "debug";
const log = debug("pern:pages:App:App");

function App() {
	const [user, setUser] = useState(getUser());
	const isAdmin = user?.u_appt === "oic" || user?.u_appt === "admin";
	log("user %o", user);
	const [showTimeout, setShowTimeout] = useState(false);

	return (
		<>
			<nav></nav>
			<main className='App'>
				{user ? (
					<>
						{/* <NavBar setUser={setUser} isAdmin={isAdmin} /> */}
						<Routes>
							<Route path='/' element={<AuthPage setUser={setUser} />} />
							<Route
								path='/timeout'
								element={
									<UserTimeout setUser={setUser} setShowTimeout={setShowTimeout}>
										<AuthPage setUser={setUser} />
									</UserTimeout>
								}
							/>
							<Route
								path='/*'
								element={
									showTimeout ? (
										<Navigate to='/timeout' replace />
									) : (
										<UserTimeout setUser={setUser}>
											{user && <NavBar setUser={setUser} isAdmin={isAdmin} />}
											<Routes>
												<Route path='/personnel' element={<PersonnelOverviewPage />} />
												<Route path='/personnel/new' element={<CreatePersonnelPage />} />
												<Route path='/personnel/:personId' element={<PersonnelDetailsPage />} />
												<Route path='/personnel/:personId/edit' element={<EditPersonnelPage />} />
												<Route path='/authorisation' element={<AuthoriseRecordsPage />} />
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
												<Route path='/qualifications' element={<QualificationsPage />} />
												<Route path='/qualifications/new' element={<AmendQualificationsPage />} />
												<Route
													path='/qualifications/:q_id/edit'
													element={<AmendQualificationsPage />}
												/>
												<Route path='/users' element={<UsersPage />} />
											</Routes>
										</UserTimeout>
									)
								}
							/>
							{/* <Route path='/personnel' element={<PersonnelOverviewPage />} />
							<Route path='/personnel/new' element={<CreatePersonnelPage />}>
								<Route path='' element={<TeamsPage />} />
							</Route>
							<Route path='/personnel/:personId' element={<PersonnelDetailsPage />} />
							<Route path='/personnel/:personId/edit' element={<EditPersonnelPage />}>
								<Route path='' element={<TeamsPage />} />
							</Route>
							<Route path='/authorisation' element={<AuthoriseRecordsPage />} />
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
							<Route path='/qualifications' element={<QualificationsPage />} />
							<Route path='/qualifications/new' element={<AmendQualificationsPage />} />
							<Route path='/qualifications/:q_id/edit' element={<AmendQualificationsPage />} />
							<Route path='/users' element={<UsersPage />} /> */}
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
