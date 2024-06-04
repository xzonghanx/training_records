import { useState } from "react";
import { useParams } from "react-router-dom";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
// import debug from "debug";
// const log = debug("pern:pages:AddAuthorisationPage");

export default function AddAuthorisationPage() {
	const [authRecords, setAuthRecords] = useState([]);
	const { personId } = useParams();

	return (
		<>
			<h1>Add Authorisation Page</h1>
			<AuthorisationForm
				authRecords={authRecords}
				setAuthRecords={setAuthRecords}
				personId={personId}
			/>
		</>
	);
}
