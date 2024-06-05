import { useState, useEffect } from "react";
import { fetchAllPersonnel } from "../../utilities/personnel-service";
import { getUser, fetchUsers, fetchFilterOptions } from "../../utilities/users-service";
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
	const [teamFilter, setTeamFilter] = useState("");
	const [qCodeFilter, setQCodeFilter] = useState("");
	const [qTypeFilter, setQTypeFilter] = useState("");
	const [signingFieldFilter, setSigningFieldFilter] = useState("");
	const [filterOptions, setFilterOptions] = useState({
		teamOptions: [],
		qCodeOptions: [],
		qTypeOptions: [],
	});

	// const handleTeamFilterChange = (e) => setTeamFilter(e.target.value);
	// const handleQCodeFilterChange = (e) => setQCodeFilter(e.target.value);
	// const handleQTypeFilterChange = (e) => setQTypeFilter(e.target.value);
	// const handleSigningFieldFilterChange = (e) => setSigningFieldFilter(e.target.value);

	const filterRecords = (record) => {
		const matchesTeam = !teamFilter || record.team?.includes(teamFilter);
		const matchesQCode = !qCodeFilter || record.q_code?.includes(qCodeFilter);
		const matchesQType = !qTypeFilter || record.q_type?.includes(qTypeFilter);
		const matchesSigningField =
			!signingFieldFilter ||
			(signingFieldFilter === "signed" ? record.officer_sign : !record.officer_sign); //TODO apply to all 3 fields or based on user logged in.

		return matchesTeam && matchesQCode && matchesQType && matchesSigningField;
	};

	const filteredRecords = records.filter(filterRecords);

	//TODO filter functions (above)

	useEffect(() => {
		const getAllRecords = async () => {
			try {
				const data = await fetchAllPersonnel();
				// log("getAllRecords: %o", data);
				setRecords(data);
			} catch (error) {
				log("error getting nominal roll", error);
			}
		};
		const getUsers = async () => {
			try {
				const data = await fetchUsers();
				// log("fetchUsers: %o", data);
				setUsers(data);
			} catch (error) {
				log("error getting users", error);
			}
		};
		const getFilterOptions = async () => {
			try {
				const data = await fetchFilterOptions();
				setFilterOptions(data);
			} catch (error) {
				log("error getting filter options", error);
			}
		};
		getUsers();
		getAllRecords();
		getFilterOptions();
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
		// setRecords(records.map((record) => athId.includes(record.ath_id) ? { ...record, officer_sign: user?.u_name } : record));
		window.location.reload();
	};

	const handleDelete = async () => {
		log("selectedIds, %o", selectedIds);
		const athId = selectedIds;
		const response = await deleteRecords({ athId });
		log("signed, %o", response);
		setRecords(records.filter((record) => !athId.includes(record.ath_id)));
	};

	return (
		<>
			<h1>Authorise Records page</h1>
			{/* //TODO testing filters below --> change to SELECT OPTION type, but get all available options in initial state, add html labels.*/}
			<div>
				{/* <input placeholder='Filter by team' value={teamFilter} onChange={handleTeamFilterChange} />
				<input
					placeholder='Filter by Q Code'
					value={qCodeFilter}
					onChange={handleQCodeFilterChange}
				/>
				<input
					placeholder='Filter by Q Type'
					value={qTypeFilter}
					onChange={handleQTypeFilterChange}
				/> */}
				<select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
					<option value=''>All Teams</option>
					{filterOptions.teamOptions.map((option) => (
						<option key={option.team} value={option.team}>
							{option.team}
						</option>
					))}
				</select>
				<select value={qCodeFilter} onChange={(e) => setQCodeFilter(e.target.value)}>
					<option value=''>All Q Codes</option>
					{filterOptions.qCodeOptions.map((option) => (
						<option key={option.q_code} value={option.q_code}>
							{option.q_code}
						</option>
					))}
				</select>
				<select value={qTypeFilter} onChange={(e) => setQTypeFilter(e.target.value)}>
					<option value=''>All Q Types</option>
					{filterOptions.qTypeOptions.map((option) => (
						<option key={option.q_type} value={option.q_type}>
							{option.q_type}
						</option>
					))}
				</select>
				<select value={signingFieldFilter} onChange={(e) => setSigningFieldFilter(e.target.value)}>
					<option value=''>All</option>
					<option value='signed'>Signed</option>
					<option value='not_signed'>Not Signed</option>
				</select>
			</div>
			{/* //TODO testing filters above; if it works can put the filter SELECT as a ROW between thead and tbody */}
			<br />

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
					{/* //TODO records.map */}
					{filteredRecords.map((person) => (
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
									? users?.find((user) => user.u_sign === person.instructor_sign).u_name
									: null}
							</td>
							<td>
								{person.instructor_ts
									? moment.utc(person.instructor_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td>
								{person.trainingic_sign
									? users?.find((user) => user.u_sign === person.trainingic_sign).u_name
									: null}
							</td>
							<td>
								{person.trainingic_ts
									? moment.utc(person.trainingic_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td>
								{person.officer_sign
									? users?.find((user) => user.u_sign === person.officer_sign).u_name
									: null}
							</td>
							<td>
								{person.officer_ts
									? moment.utc(person.officer_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							{/* <td>
								{person.officer_ts
									? moment(person.officer_ts).tz("Asia/Singapore").format("MMM Do YY, h:mm a")
									: null}
							</td> */}
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
