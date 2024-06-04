import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPerson, editPerson } from "../../utilities/personnel-service";
import { fetchAllQualifications } from "../../utilities/authorisation-service";

import debug from "debug";
const log = debug("pern:pages:PersonnelForm");

export default function PersonnelForm({ person, setPerson, personId }) {
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
	// log("allQualifications: %o", qualifications);

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		log("data, %o", data);
		if (personId) {
			const response = await editPerson(data, personId);
			log("edit response, %o", response);
			navigate(`/personnel/${personId}`);
		} else {
			const response = await addPerson(data);
			log("add response, %o", response);
			setPerson([]);
		}
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					name='name'
					value={person?.name || ""}
					onChange={(evt) => setPerson({ ...person, name: evt.target.value })}
				/>
				<br />
				<label htmlFor='nric'>NRIC</label>
				<input
					type='text'
					name='nric'
					value={person?.nric || ""}
					onChange={(evt) => setPerson({ ...person, nric: evt.target.value })}
				/>
				<br />
				<label htmlFor='unit'>Unit</label>
				<input
					type='text'
					name='unit'
					value={person?.unit || ""}
					onChange={(evt) => setPerson({ ...person, unit: evt.target.value })}
				/>
				<br />
				<label htmlFor='ord'>ORD</label>
				<input
					type='date'
					name='ord'
					value={person?.ord || ""}
					onChange={(evt) => setPerson({ ...person, ord: evt.target.value })}
				/>
				<br />
				<label htmlFor='service'>Service</label>
				<select
					name='service'
					onChange={(evt) => setPerson({ ...person, service: evt.target.value })}>
					<option value={person?.service || ""}>{person?.service || ""}</option>
					<option value='NSF'>NSF</option>
					<option value='NSmen'>NSmen</option>
					<option value='REGULAR'>REGULAR</option>
				</select>
				<br />
				<label htmlFor='vocation'>Vocation</label>
				<select
					name='vocation'
					onChange={(evt) => setPerson({ ...person, vocation: evt.target.value })}>
					<option value={person?.vocation || ""}>{person?.vocation || ""}</option>
					<option value='AFE'>AFE</option>
					<option value='AFE'>PNR</option>
					<option value='AFE'>FD ENGR</option>
				</select>
				<br />
				<label htmlFor='team'>Team</label>
				<input
					type='text'
					name='team'
					value={person?.team || ""}
					onChange={(evt) => setPerson({ ...person, team: evt.target.value })}
				/>
				<br />
				<label htmlFor='qualification'>Qualification</label>
				<select
					name='qualification'
					onChange={(evt) => setPerson({ ...person, qualification: evt.target.value })}>
					<option value={person?.qualification || ""}>{person?.qualification || ""}</option>
					{qualifications?.map((qual) => (
						<option key={qual?.q_id} value={qual?.q_code}>
							{qual?.q_name}
						</option>
					))}
				</select>
				<br />
				<button type='submit'>SAVE</button>
			</form>
		</>
	);
}
