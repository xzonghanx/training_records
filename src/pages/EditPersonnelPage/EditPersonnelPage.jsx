import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOnePersonnel } from "../../utilities/personnel-service";
import PersonnelForm from "../../components/PersonnelForm/PersonnelForm";
import moment from "moment-timezone";
import debug from "debug";
const log = debug("pern:pages:EditPersonnelPage");

export default function EditPersonnelPage() {
	const [person, setPerson] = useState([]);
	const { personId } = useParams();

	useEffect(() => {
		const getPersonnel = async () => {
			try {
				const data = await fetchOnePersonnel(personId);
				// log("getOnePersonnel: %o", data);
				//TODO change this data, change fetch details to just details without JOIN
				const datum = data[0];
				const ordDate = moment(datum.ord).tz("Asia/Singapore").format().split("T")[0];
				// log("newdate %s", ordDate);
				datum.ord = ordDate;
				log("datum: %o", datum);
				setPerson(datum);
			} catch (error) {
				log("error getting person details", error);
			}
		};
		getPersonnel();
	}, [personId]);

	return (
		<>
			<h1>Edit Personnel Page</h1>
			<PersonnelForm person={person} setPerson={setPerson} personId={personId} />
		</>
	);
}
