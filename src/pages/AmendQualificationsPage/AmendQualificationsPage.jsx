import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	fetchOneQualification,
	addQualification,
	editQualification,
} from "../../utilities/qualification-service";
import debug from "debug";
const log = debug("pern:pages:AmendQualificationsPage");

export default function AmendQualificationsPage() {
	const [qualification, setQualification] = useState([]);
	const navigate = useNavigate();
	const { q_id } = useParams();

	useEffect(() => {
		const getOneQualification = async () => {
			try {
				const data = await fetchOneQualification(q_id);
				setQualification(data);
			} catch (error) {
				log("error getting qualification", error);
			}
		};
		getOneQualification();
	}, [q_id]);

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		log("data, %o", data);
		if (q_id) {
			const response = await editQualification(q_id, data);
			log("edit response, %o", response);
			navigate(`/qualifications`);
		} else {
			const response = await addQualification(data);
			log("add response, %o", response);
			setQualification([]);
		}
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<label htmlFor='qualification name'>Qualification Name</label>
				<input
					type='text'
					name='q_name'
					value={qualification?.q_name || ""}
					onChange={(evt) => setQualification({ ...qualification, q_name: evt.target.value })}
				/>
				<br />
				<label htmlFor='qualification code'>Qualification Code</label>
				<input
					type='text'
					name='q_code'
					value={qualification?.q_code || ""}
					onChange={(evt) => setQualification({ ...qualification, q_code: evt.target.value })}
				/>
				<br />
				<label htmlFor='task1'>Task 1 Details</label>
				<input
					type='text'
					name='task1'
					value={qualification?.task1 || ""}
					onChange={(evt) => setQualification({ ...qualification, task1: evt.target.value })}
				/>
				<br />
				<label htmlFor='task2'>Task 2 Details</label>
				<input
					type='text'
					name='task2'
					value={qualification?.task2 || ""}
					onChange={(evt) => setQualification({ ...qualification, task2: evt.target.value })}
				/>
				<br />
				<label htmlFor='task3'>Task 3 Details</label>
				<input
					type='text'
					name='task3'
					value={qualification?.task3 || ""}
					onChange={(evt) => setQualification({ ...qualification, task3: evt.target.value })}
				/>
				<br />

				<button type='submit'>SAVE</button>
			</form>
		</>
	);
}
