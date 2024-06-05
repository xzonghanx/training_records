import { useState, useEffect } from "react";
import { fetchAllQualifications } from "../../utilities/authorisation-service";

import debug from "debug";
const log = debug("pern:pages:QualificationsPage");

export default function QualificationsPage() {
	const [qualifications, setQualifications] = useState([]);
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

	return (
		<>
			<h1>Qualifications Chart</h1>

			<table>
				<thead>
					<tr>
						<th>Qualification Name</th>
						<th>Qualification Code</th>
						<th>Task 1 Desc</th>
						<th>Task 2 Desc</th>
						<th>Task 3 Desc</th>
					</tr>
				</thead>
				<tbody>
					{qualifications.map((qual) => (
						<tr key={qual.q_id}>
							<td>{qual?.q_name}</td>
							<td>{qual?.q_code}</td>
							<td>{qual?.task1}</td>
							<td>{qual?.task2}</td>
							<td>{qual?.task3}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
