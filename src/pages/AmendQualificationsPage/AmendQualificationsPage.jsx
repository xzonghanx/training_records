import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	fetchOneQualification,
	addQualification,
	editQualification,
} from "../../utilities/qualification-service";
import { getUser } from "../../utilities/users-service";
import Input from "../../components/Input/Input";
import debug from "debug";
const log = debug("pern:pages:AmendQualificationsPage");

export default function AmendQualificationsPage() {
	const [qualification, setQualification] = useState([]);
	const navigate = useNavigate();
	const { q_id } = useParams();
	const user = getUser();
	const isAdmin = user?.u_appt === "oic" || user?.u_appt === "admin";
	// log(user);
	// log(isAdmin);

	useEffect(() => {
		const getOneQualification = async () => {
			try {
				const data = await fetchOneQualification(q_id);
				setQualification(data);
			} catch (error) {
				log("error getting qualification", error);
			}
		};
		if (q_id) {
			getOneQualification();
		}
		if (!isAdmin) {
			navigate("/qualifications");
		}
	}, [q_id, isAdmin, navigate]);

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		data.user = user.u_appt; //passed u_appt to validate in server.
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
			<p className='text-2xl font-bold my-4 text-center'>Amend Qualification Page</p>
			<form
				className='flex items-center justify-center'
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<fieldset className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5'>
					<legend className='font-black block mb-2 text-sm  text-gray-900'>
						Qualifications Form
					</legend>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Qualification Name
					</label>
					<Input
						type='text'
						name='q_name'
						value={qualification?.q_name || ""}
						onChange={(evt) => setQualification({ ...qualification, q_name: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Qualification Code
					</label>
					<Input
						type='text'
						name='q_code'
						value={qualification?.q_code || ""}
						onChange={(evt) => setQualification({ ...qualification, q_code: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 1 Details
					</label>
					<Input
						type='text'
						name='task1'
						value={qualification?.task1 || ""}
						onChange={(evt) => setQualification({ ...qualification, task1: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 2 Details
					</label>
					<Input
						type='text'
						name='task2'
						value={qualification?.task2 || ""}
						onChange={(evt) => setQualification({ ...qualification, task2: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 3 Details
					</label>
					<Input
						type='text'
						name='task3'
						value={qualification?.task3 || ""}
						onChange={(evt) => setQualification({ ...qualification, task3: evt.target.value })}
					/>

					<button
						className='ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
						type='submit'>
						SAVE
					</button>
				</fieldset>
			</form>
		</>
	);
}
