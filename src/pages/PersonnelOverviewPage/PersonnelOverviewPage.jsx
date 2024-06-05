import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllPersonnel } from "../../utilities/personnel-service";

import debug from "debug";
const log = debug("pern:pages:PersonnelOverviewPage");

export default function PersonnelOverviewPage() {
	const [allPersonnel, setAllPersonnel] = useState([]);
	const navigate = useNavigate();
	// const user = getUser();

	//TODO fetchAllPersonnel needs to remvoe duplicates of name --> only select latest authorisation.

	useEffect(() => {
		const getAllPersonnel = async () => {
			try {
				const data = await fetchAllPersonnel();
				// log("getAllPersonnel: %o", data);
				setAllPersonnel(data);
			} catch (error) {
				log("error getting nominal roll", error);
			}
		};
		getAllPersonnel();
	}, []);

	const handleClickRow = (personId) => {
		navigate(`/personnel/${personId}`);
	};

	return (
		<>
			<h1>Personnel Overview page</h1>

			<div>
				<Link to='/personnel/new'>Create New Personnel</Link>
			</div>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>NRIC</th>
						<th>Unit</th>
						<th>ORD</th>
						<th>Service</th>
						<th>Vocation</th>
						<th>Team</th>
						<th>Qualification</th>
						<th>Latest Authorisation Date</th>
						<th>Currency Level</th>
					</tr>
				</thead>
				<tbody>
					{allPersonnel.map((person, index) => (
						<tr
							key={person.person_id}
							onClick={() => handleClickRow(person.person_id)}
							style={{ cursor: "pointer" }}>
							<td>{index + 1}</td>
							<td>{person.name}</td>
							<td>{person.nric}</td>
							<td>{person.unit}</td>
							<td>{new Date(person?.ord).toLocaleDateString()}</td>
							<td>{person.service}</td>
							<td>{person.vocation}</td>
							<td>{person.team}</td>
							<td>{person?.q_code}</td>
							<td>{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}</td>
							{/* //TODO need to change to latest date*/}
							<td>CL X</td> {/* //TODOneed to change to derive CL based on latest Q date*/}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
