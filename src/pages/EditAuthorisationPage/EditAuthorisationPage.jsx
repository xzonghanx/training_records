import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import AuthorisationForm from "../../components/AuthorisationForm/AuthorisationForm";
import { fetchOneAuthorisationRecord, deleteRecord } from "../../utilities/authorisation-service";
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
			<p className='text-2xl font-bold my-4 text-center'>Edit Authorisation Page</p>
			<div className='flex justify-center'>
				<button
					type='submit'
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					onClick={handleDelete}>
					DELETE Record
				</button>
			</div>
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
