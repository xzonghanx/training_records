import { addPerson, editPerson } from "../../utilities/personnel-service";
import { useNavigate } from "react-router-dom";

import debug from "debug";
const log = debug("pern:pages:PersonnelForm");

export default function PersonnelForm({ person, setPerson, personId }) {
	const navigate = useNavigate();

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
				<input
					type='text'
					name='service'
					value={person?.service || ""}
					onChange={(evt) => setPerson({ ...person, service: evt.target.value })}
				/>
				<br />
				<label htmlFor='vocation'>Vocation</label>
				<input
					type='text'
					name='vocation'
					value={person?.vocation || ""}
					onChange={(evt) => setPerson({ ...person, vocation: evt.target.value })}
				/>
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
				<input
					type='text'
					name='qualification'
					value={person?.qualification || ""}
					onChange={(evt) => setPerson({ ...person, qualification: evt.target.value })}
				/>
				<br />
				<button type='submit'>SAVE</button>
			</form>
		</>
	);
}
