import { useState, useEffect } from "react";
import { fetchAllPersonnel } from "../../utilities/personnel-service"; //TODO update to authorisation??
import { getUser, fetchUsers } from "../../utilities/users-service";
import { signRecord, deleteRecords } from "../../utilities/authorisation-service";
import moment from "moment-timezone";

import debug from "debug";
const log = debug("pern:pages:AuthoriseRecordsPage");

export default function AuthoriseRecordsPage() {
	const [records, setRecords] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const user = getUser();
	const [users, setUsers] = useState();

	//TODO set state for filters then search based on filters.
	//create filtered state for records. (select option to set)
	//then map filteredrecords

	//TODO update state and refresh after sign/delete
	//currently using window.location.reload();
	//see if can change to update state and include dependency in useEffect.

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
		const getUsers = async () => {
			try {
				const data = await fetchUsers();
				log("fetchUsers: %o", data);
				setUsers(data);
			} catch (error) {
				log("error getting users", error);
			}
		};
		getUsers();
		getAllRecords();
	}, []);

	const handleCheckboxChange = (id) => {
		setSelectedIds((prevSelectedIds) =>
			prevSelectedIds.includes(id)
				? prevSelectedIds.filter((selectedId) => selectedId !== id)
				: [...prevSelectedIds, id]
		);
		log("selectedIDs", selectedIds);
	};

	const handleSign = async () => {
		log("selectedIds, %o", selectedIds);
		const athId = selectedIds;
		const response = await signRecord({ athId, user });
		log("signed, %o", response);
		window.location.reload();
	};

	const handleDelete = async () => {
		log("selectedIds, %o", selectedIds);
		const athId = selectedIds;
		const response = await deleteRecords({ athId });
		log("signed, %o", response);
		window.location.reload();
	};

	return (
		<>
			<h1>Authorise Records page</h1>
			<button onClick={handleSign}>Sign Selected</button>
			<button onClick={handleDelete}>Delete Selected</button>
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
						<th>Select</th>
					</tr>
				</thead>
				<tbody>
					{records.map((person) => (
						<tr key={person.ath_id}>
							<td>{person.person_id}</td>
							<td>{person.name}</td>
							<td>{person.unit}</td>
							<td>{person.vocation}</td>
							<td>{person.team}</td>
							<td>{person?.q_code}</td>
							<td>{person?.q_type}</td>
							<td>{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}</td>
							<td>{person.task1 ? new Date(person.task1).toLocaleDateString() : null}</td>
							<td>{person.task2 ? new Date(person.task2).toLocaleDateString() : null}</td>
							<td>{person.task3 ? new Date(person.task3).toLocaleDateString() : null}</td>
							<td>
								{person.instructor_sign
									? users.find((user) => user.u_sign === person.instructor_sign).u_name
									: null}
							</td>
							<td>
								{person.instructor_ts
									? moment(person.instructor_ts).tz("Asia/Singapore").format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td>
								{person.trainingic_sign
									? users?.find((user) => user.u_sign === person.trainingic_sign).u_name
									: null}
							</td>
							<td>
								{person.trainingic_ts
									? moment(person.trainingic_ts).tz("Asia/Singapore").format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td>
								{person.officer_sign
									? users.find((user) => user.u_sign === person.officer_sign).u_name
									: null}
							</td>
							<td>
								{person.officer_ts
									? moment(person.officer_ts).tz("Asia/Singapore").format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td>
								<input
									type='checkbox'
									checked={selectedIds.includes(person.ath_id)}
									onChange={() => handleCheckboxChange(person.ath_id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
