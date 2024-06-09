import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAuthorisation, editAuthorisation } from "../../utilities/authorisation-service";
import { fetchAllQualifications } from "../../utilities/qualification-service";
import debug from "debug";
const log = debug("pern:pages:AuthorisationForm");

export default function AuthorisationForm({ authRecords, setAuthRecords, personId, athId }) {
	const [qualifications, setQualifications] = useState([]);
	const navigate = useNavigate();

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

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		data.personId = personId;
		log("data, %o", data);
		if (athId) {
			const response = await editAuthorisation(athId, data);
			log("edit response, %o", response);
			navigate(`/personnel/${personId}`);
		} else {
			const response = await addAuthorisation(data);
			log("add response, %o", response);
			setAuthRecords([]);
		}
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<label htmlFor='qualification'>Qualification Name/Code</label>
				<select
					name='q_code'
					onChange={(evt) => setAuthRecords({ ...authRecords, q_code: evt.target.value })}>
					<option value={authRecords?.q_code || ""}>{authRecords?.q_code || ""}</option>
					{qualifications?.map((qual) => (
						<option key={qual?.q_id} value={qual?.q_code}>
							{qual?.q_name} / {qual?.q_code}
						</option>
					))}
				</select>
				<br />
				<label htmlFor='qualification type'>Qualification Type</label>
				<select
					name='q_type'
					onChange={(evt) => setAuthRecords({ ...authRecords, q_type: evt.target.value })}>
					<option value={authRecords?.q_type || ""}>{authRecords?.q_type || ""}</option>
					<option value='initial'>initial</option>
					<option value='post'>post</option>
				</select>
				<br />
				<label htmlFor='qualification date'>Qualification Date</label>
				<input
					type='date'
					name='q_date'
					value={authRecords?.q_date || ""}
					onChange={(evt) => setAuthRecords({ ...authRecords, q_date: evt.target.value })}
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
