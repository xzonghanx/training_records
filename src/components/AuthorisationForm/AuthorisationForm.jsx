import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAuthorisation, editAuthorisation } from "../../utilities/authorisation-service";
import { fetchAllQualifications } from "../../utilities/qualification-service";
import Input from "../Input/Input";
import debug from "debug";
const log = debug("pern:pages:AuthorisationForm");

export default function AuthorisationForm({ authRecords, setAuthRecords, personId, athId }) {
	const [qualifications, setQualifications] = useState([]);
	const [error, setError] = useState("");
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
		// log("data, %o", data);
		try {
			if (athId) {
				const response = await editAuthorisation(athId, data);
				log("edit response, %o", response);
				setError("");
				navigate(`/personnel/${personId}`);
			} else {
				const response = await addAuthorisation(data);
				log("add response, %o", response);
				setError("");
				setAuthRecords([]);
			}
		} catch (error) {
			setError("Invalid or Incomplete Fields");
		}
	};

	return (
		<>
			<form
				className='flex min-h-screen items-center justify-center'
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<fieldset className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5'>
					<legend className='font-black block mb-2 text-sm  text-gray-900'>
						Authorisation Form
					</legend>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Qualification Name/Code
					</label>
					<select
						className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-[12rem]'
						name='q_code'
						onChange={(evt) => setAuthRecords({ ...authRecords, q_code: evt.target.value })}>
						<option value={authRecords?.q_code || ""}>{authRecords?.q_code || ""}</option>
						{qualifications?.map((qual) => (
							<option key={qual?.q_id} value={qual?.q_code}>
								{qual?.q_name} / {qual?.q_code}
							</option>
						))}
					</select>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Qualification Type
					</label>
					<select
						className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-[12rem]'
						name='q_type'
						onChange={(evt) => setAuthRecords({ ...authRecords, q_type: evt.target.value })}>
						<option value={authRecords?.q_type || ""}>{authRecords?.q_type || ""}</option>
						<option value='initial'>initial</option>
						<option value='post'>post</option>
					</select>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Qualification Date
					</label>
					<Input
						type='date'
						name='q_date'
						value={authRecords?.q_date || ""}
						onChange={(evt) => setAuthRecords({ ...authRecords, q_date: evt.target.value })}
					/>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 1 Date
					</label>
					<Input
						type='date'
						name='task1'
						value={authRecords?.task1 || ""}
						onChange={(evt) => setAuthRecords({ ...authRecords, task1: evt.target.value })}
					/>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 2 Date
					</label>
					<Input
						type='date'
						name='task2'
						value={authRecords?.task2 || ""}
						onChange={(evt) => setAuthRecords({ ...authRecords, task2: evt.target.value })}
					/>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Task 3 Date
					</label>
					<Input
						type='date'
						name='task3'
						value={authRecords?.task3 || ""}
						onChange={(evt) => setAuthRecords({ ...authRecords, task3: evt.target.value })}
					/>
					<br />
					<button
						className='ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
						type='submit'>
						Save
					</button>
					<div className='flex justify-start w-full text-red-600'>{error ? error : ""}</div>
				</fieldset>
			</form>
		</>
	);
}
