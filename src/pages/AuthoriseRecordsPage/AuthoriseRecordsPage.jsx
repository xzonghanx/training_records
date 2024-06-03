import { useState, useEffect } from "react";
import { fetchAllPersonnel } from "../../utilities/personnel-service"; //TODO UPDATE THIS

import debug from "debug";
const log = debug("pern:pages:AuthoriseRecordsPage");

export default function AuthoriseRecordsPage() {
	const [records, setRecords] = useState([]);

	//set state for filters then search based on filters.

	useEffect(() => {
		const getAllRecords = async () => {
			try {
				const data = await fetchAllPersonnel();
				log("getAllRecords: %o", data);
				setRecords(data);
			} catch (error) {
				log("error getting nominal roll", error);
			}
		};
		getAllRecords();
	}, []);

	const handleSign = () => {
		log("sign");
	};

	return (
		<>
			<h1>Authorise Records page</h1>
			<table>
				<thead>
					<tr>
						<th>Personnel ID</th>
						<th>Name</th>
						<th>Unit</th>
						<th>Vocation</th>
						<th>Team</th>
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
					{records.map((person) => (
						<tr key={person.person_id}>
							<td>{person.person_id}</td>
							<td>{person.name}</td>
							<td>{person.unit}</td>
							<td>{person.vocation}</td>
							<td>{person.team}</td>
							<td>{person?.q_code}</td>
							<td>{person?.q_type}</td>
							<td>{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}</td>
							<td>{person?.task1}</td>
							<td>{person?.task2}</td>
							<td>{person?.task3}</td>
							<td>{person.instructor_sign ? "instructor name?" : null}</td>
							<td>{person?.instructor_ts}</td>
							<td>{person?.trainingic_sign}</td>
							<td>{person?.trainingic_ts}</td>
							<td>{person?.officer_sign}</td>
							<td>{person?.officer_ts}</td>
							<td>
								<input type='checkbox' />
							</td>
							<td>
								<button onClick={() => handleSign(person.person_id)}>sign</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
