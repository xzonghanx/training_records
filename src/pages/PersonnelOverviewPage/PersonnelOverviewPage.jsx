import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchSearchedPersonnel } from "../../utilities/personnel-service";

import debug from "debug";
const log = debug("pern:pages:PersonnelOverviewPage");

export default function PersonnelOverviewPage() {
	const [allPersonnel, setAllPersonnel] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	// const user = getUser(); //TODO to use for superadmin / signature.

	//fetchAllPersonnel needs to remove duplicates of name --> only select latest authorisation; can calculate currency lv
	//TODO done in server side, put in more data to verify

	useEffect(() => {
		const getSearchPersonnel = async () => {
			try {
				const data = await fetchSearchedPersonnel(searchQuery);
				log("fetchSearchedPersonnel: %o", data);
				setAllPersonnel(data);
			} catch (error) {
				log("error fetching searched personnel", error);
			}
		};
		getSearchPersonnel();
	}, [searchQuery]);

	const handleClickRow = (personId) => {
		navigate(`/personnel/${personId}`);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<h1>Personnel Overview page</h1>

			<div>
				<Link to='/personnel/new'>Create New Personnel</Link>
			</div>

			<input
				type='text'
				placeholder='Search by Name or NRIC'
				value={searchQuery}
				onChange={handleSearchChange}
			/>

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
							<td>{person?.currency_lvl}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
