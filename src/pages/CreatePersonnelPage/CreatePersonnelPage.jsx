import { useState } from "react";
import PersonnelForm from "../../components/PersonnelForm/PersonnelForm";
import Teams from "../../components/Teams/Teams";
// import debug from "debug";
// const log = debug("pern:pages:CreatePersonnelPage");

export default function CreatePersonnelPage() {
	const [person, setPerson] = useState([]);

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Create Personnel Page</p>
			<div className='flex justify-center items-center space-x-1 w-full'>
				<PersonnelForm person={person} setPerson={setPerson} />
				<Teams />
			</div>
		</>
	);
}
