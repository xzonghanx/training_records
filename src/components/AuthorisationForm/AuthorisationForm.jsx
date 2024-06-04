import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchAllQualifications, addAuthorisation } from "../../utilities/authorisation-service";
import debug from "debug";
const log = debug("pern:pages:AuthorisationForm");

export default function AuthorisationForm({ authRecords, setAuthRecords, personId }) {
	const [qualifications, setQualifications] = useState([]);
	// const navigate = useNavigate();

	useEffect(() => {
		const getAllQualifications = async () => {
			try {
				const data = await fetchAllQualifications();
				setQualifications(data);
			} catch (error) {
				log("error getting qualifications", error);
			}
		};
		getAllQualifications();
	}, []);

	//TODO save; also differentiate add and edit form.
	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		log("data, %o", data);

		const response = await addAuthorisation(personId, data);
		log("add response, %o", response);
		setAuthRecords([]);

		// if (personId) {
		// 	const response = await editPerson(data, personId);
		// 	log("edit response, %o", response);
		// 	navigate(`/personnel/${personId}`);
		// } else {
		// 	const response = await addPerson(data);
		// 	log("add response, %o", response);
		// 	setPerson([]);
		// }
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<label htmlFor='qualification'>Qualification Name/Code</label>
				<select
					name='qCode'
					onChange={(evt) => setAuthRecords({ ...authRecords, qualification: evt.target.value })}>
					<option value={authRecords?.qualification || ""}>
						{authRecords?.qualification || ""}
					</option>
					{qualifications?.map((qual) => (
						<option key={qual?.q_id} value={qual?.q_code}>
							{qual?.q_name} / {qual?.q_code}
						</option>
					))}
				</select>
				<br />
				<label htmlFor='qualification type'>Qualification Type</label>
				<select
					name='qType'
					onChange={(evt) => setAuthRecords({ ...authRecords, qType: evt.target.value })}>
					<option value={authRecords?.qType || ""}>{authRecords?.qType || ""}</option>
					<option value='initial'>initial</option>
					<option value='post'>post</option>
				</select>
				<br />
				<label htmlFor='qualification date'>Qualification Date</label>
				<input
					type='date'
					name='qDate'
					value={authRecords?.qDate || ""}
					onChange={(evt) => setAuthRecords({ ...authRecords, qDate: evt.target.value })}
				/>
				<br />
				<label htmlFor='task 1 date'>Task 1 Date</label>
				<input
					type='date'
					name='task1'
					value={authRecords?.task1 || ""}
					onChange={(evt) => setAuthRecords({ ...authRecords, task1: evt.target.value })}
				/>
				<br />
				<label htmlFor='task 2 date'>Task 2 Date</label>
				<input
					type='date'
					name='task2'
					value={authRecords?.task2 || ""}
					onChange={(evt) => setAuthRecords({ ...authRecords, task2: evt.target.value })}
				/>
				<br />
				<label htmlFor='task 3 date'>Task 3 Date</label>
				<input
					type='date'
					name='task3'
					value={authRecords?.task3 || ""}
					onChange={(evt) => setAuthRecords({ ...authRecords, task3: evt.target.value })}
				/>
				<br />
				<button type='submit'>SAVE</button>
			</form>
		</>
	);
}
