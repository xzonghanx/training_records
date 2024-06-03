import { useState } from "react";
import PersonnelForm from "../../components/PersonnelForm/PersonnelForm";
// import debug from "debug";
// const log = debug("pern:pages:CreatePersonnelPage");

export default function CreatePersonnelPage() {
	const [person, setPerson] = useState([]);

	return (
		<>
			<h1>Create Personnel Page</h1>
			<PersonnelForm person={person} setPerson={setPerson} />
		</>
	);
}
