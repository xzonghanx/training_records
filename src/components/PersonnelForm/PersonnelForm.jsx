import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPerson, editPerson } from "../../utilities/personnel-service";
import Input from "../Input/Input";

import debug from "debug";
const log = debug("pern:pages:PersonnelForm");

export default function PersonnelForm({ person, setPerson, personId }) {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		// log("data, %o", data);
		try {
			if (personId) {
				const response = await editPerson(data, personId);
				log("edit response, %o", response);
				setError("");
				navigate(`/personnel/${personId}`);
			} else {
				const response = await addPerson(data);
				log("add response, %o", response);
				setError("");
				setPerson([]);
			}
		} catch (error) {
			setError("Invalid or Incomplete Fields");
		}
	};

	return (
		<>
			<form
				className='flex min-h-screen items-center justify-center w-2/5'
				onSubmit={(e) => {
					handleSave(e);
				}}>
				<fieldset className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5'>
					<legend className='font-black block mb-2 text-sm  text-gray-900'>Personnel Form</legend>
					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Name
					</label>
					<Input
						type='text'
						name='name'
						value={person?.name || ""}
						onChange={(evt) => setPerson({ ...person, name: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						NRIC
					</label>
					<Input
						type='text'
						name='nric'
						value={person?.nric || ""}
						onChange={(evt) => setPerson({ ...person, nric: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Unit
					</label>
					<Input
						type='text'
						name='unit'
						value={person?.unit || ""}
						onChange={(evt) => setPerson({ ...person, unit: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						ORD
					</label>
					<Input
						type='date'
						name='ord'
						value={person?.ord || ""}
						onChange={(evt) => setPerson({ ...person, ord: evt.target.value })}
					/>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Service
					</label>
					<select
						className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-[12rem]'
						name='service'
						onChange={(evt) => setPerson({ ...person, service: evt.target.value })}>
						<option value={person?.service || ""}>{person?.service || ""}</option>
						<option value='NSF'>NSF</option>
						<option value='NSmen'>NSmen</option>
						<option value='REGULAR'>REGULAR</option>
					</select>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Vocation
					</label>
					<select
						className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-[12rem]'
						name='vocation'
						onChange={(evt) => setPerson({ ...person, vocation: evt.target.value })}>
						<option value={person?.vocation || ""}>{person?.vocation || ""}</option>
						<option value='AFE'>AFE</option>
						<option value='PNR'>PNR</option>
						<option value='FD ENGR'>FD ENGR</option>
					</select>

					<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-left'>
						Team
					</label>
					<Input
						type='text'
						name='team'
						value={person?.team || ""}
						onChange={(evt) => setPerson({ ...person, team: evt.target.value })}
					/>

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
