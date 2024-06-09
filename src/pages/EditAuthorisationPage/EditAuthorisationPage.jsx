import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
import { fetchOneAuthorisationRecord, deleteRecord } from "../../utilities/authorisation-service";
import Teams from "../../components/Teams/Teams";
import moment from "moment-timezone";
import debug from "debug";
const log = debug("pern:pages:EditAuthorisationPage");

export default function EditAuthorisationPage() {
	const [authRecords, setAuthRecords] = useState([]);
	const { personId, athId } = useParams();
	const navigate = useNavigate();

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

	const handleDelete = async () => {
		log("handle delete");
		await deleteRecord(athId);
		navigate(`/personnel/${personId}`);
	};

	return (
		<>
			<h1>Edit Authorisation Page</h1>
			<AuthorisationForm
				authRecords={authRecords}
				setAuthRecords={setAuthRecords}
				personId={personId}
				athId={athId}
			/>
			<br />
			<button onClick={handleDelete}>DELETE Record</button>
			<Teams />
		</>
	);
}
