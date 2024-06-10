import { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
// import debug from "debug";
// const log = debug("pern:pages:AddAuthorisationPage");

export default function AddAuthorisationPage() {
	const [authRecords, setAuthRecords] = useState([]);
	const { personId } = useParams();

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Add Authorisation Page</p>
			<AuthorisationForm
				authRecords={authRecords}
				setAuthRecords={setAuthRecords}
				personId={personId}
			/>
			<Outlet />
		</>
	);
}
