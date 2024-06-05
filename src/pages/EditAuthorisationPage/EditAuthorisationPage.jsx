import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
import { fetchOneAuthorisationRecord } from "../../utilities/authorisation-service";
import moment from "moment-timezone";
import debug from "debug";
const log = debug("pern:pages:EditAuthorisationPage");

export default function EditAuthorisationPage() {
	const [authRecords, setAuthRecords] = useState([]);
	const { personId, athId } = useParams();

	useEffect(() => {
		const getOneAuthorisationRecord = async () => {
			try {
				const data = await fetchOneAuthorisationRecord(athId);
				log("getOneAuthorisationRecord: %o", data);
				data.q_date = moment(data.q_date).tz("Asia/Singapore").format().split("T")[0];
				data.task1 = moment(data.task1).tz("Asia/Singapore").format().split("T")[0];
				data.task2 = moment(data.task2).tz("Asia/Singapore").format().split("T")[0];
				data.task3 = moment(data.task3).tz("Asia/Singapore").format().split("T")[0];
				setAuthRecords(data);
			} catch (error) {
				log("error getting person details", error);
			}
		};
		getOneAuthorisationRecord();
	}, [athId]);

	return (
		<>
			<h1>Edit Authorisation Page</h1>
			<AuthorisationForm
				authRecords={authRecords}
				setAuthRecords={setAuthRecords}
				personId={personId}
				athId={athId}
			/>
			<Outlet />
		</>
	);
}
