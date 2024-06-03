import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOnePersonnel } from "../../utilities/personnel-service";

import debug from "debug";
const log = debug("pern:pages:PersonnelDetailsPage");

export default function PersonnelDetailsPage() {
	const [personnel, setPersonnel] = useState([]);
	const { personId } = useParams();
	// const user = getUser();

	useEffect(() => {
		const getPersonnel = async () => {
			try {
				const data = await fetchOnePersonnel(personId);
				log("getOnePersonnel: %o", data);
				setPersonnel(data);
			} catch (error) {
				log("error getting person details", error);
			}
		};
		getPersonnel();
	}, [personId]);

	return (
		<>
			<h1>Personnel Details page</h1>
			<table>
				<thead>
					<tr>
						<th>Personnel ID</th>
						<th>Name</th>
						<th>NRIC</th>
						<th>Unit</th>
						<th>ORD</th>
						<th>Service</th>
						<th>Vocation</th>
						<th>Team</th>
						<th>Qualifcation</th>
						<th>Latest Authorisation Date</th>
						<th>Currency Level</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{personnel[0]?.person_id}</td>
						<td>{personnel[0]?.name}</td>
						<td>{personnel[0]?.nric}</td>
						<td>{personnel[0]?.unit}</td>
						<td>{new Date(personnel[0]?.ord).toLocaleDateString()}</td>
						<td>{personnel[0]?.service}</td>
						<td>{personnel[0]?.vocation}</td>
						<td>{personnel[0]?.team}</td>
						<td>{personnel[0]?.q_code}</td>
						<td>{personnel[0]?.q_date}</td> {/*need to change to latest date*/}
						<td>CL X </td> {/*need to change to derive CL based on latest Q date*/}
					</tr>
				</tbody>
			</table>
			<br />
			<h2>Authorisations</h2>
			<table>
				<thead>
					<tr>
						<th>Qualification Code</th>
						<th>Qualification Type</th>
						<th>Qualification Date</th>
						<th>Task 1 Date</th>
						<th>Task 2 Date</th>
						<th>Task 3 Date</th>
						<th>Instructor Sign-off</th>
						<th>Instructor Timestamp</th>
						<th>Training IC Sign-off</th>
						<th>Training IC Timestamp</th>
						<th>Officer-in-Charge Sign-off</th>
						<th>Officer-in-Charge Timestamp</th>
					</tr>
				</thead>
				<tbody>
					{personnel.map((person) => (
						<tr key={person.ath_id}>
							<td>{person?.q_code}</td>
							<td>{person?.q_type}</td>
							<td>{person?.q_date}</td>
							<td>{person?.task1}</td>
							<td>{person?.task2}</td>
							<td>{person?.task3}</td>
							<td>{person?.instructor_sign}</td>
							<td>{person?.instructor_ts}</td>
							<td>{person?.trainingic_sign}</td>
							<td>{person?.trainingic_ts}</td>
							<td>{person?.officer_sign}</td>
							<td>{person?.officer_ts}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
