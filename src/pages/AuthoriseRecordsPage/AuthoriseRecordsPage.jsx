import { useState, useEffect } from "react";
import { fetchAllPersonnel } from "../../utilities/personnel-service";
import { getUser, fetchUsers } from "../../utilities/users-service";
import { signRecord, deleteRecords } from "../../utilities/authorisation-service";
import Filters from "../../components/Filters/Filters";
import moment from "moment-timezone";

import debug from "debug";
const log = debug("pern:pages:AuthoriseRecordsPage");

export default function AuthoriseRecordsPage() {
	const [records, setRecords] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const user = getUser();
	const [users, setUsers] = useState();

	const [filters, setFilters] = useState({
		unit: "",
		vocation: "",
		team: "",
		qCode: "",
		qType: "",
		instSigningField: "",
		trgSigningField: "",
		offSigningField: "",
		sortQDate: "desc",
	});

	const filterAndSortRecords = (records, filters) => {
		let filteredRecords = records.filter((record) => {
			const matchesUnit = !filters.unit || record.unit?.includes(filters.unit);
			const matchesVocation = !filters.vocation || record.vocation?.includes(filters.vocation);
			const matchesTeam = !filters.team || record.team?.includes(filters.team);
			const matchesQCode = !filters.qCode || record.q_code?.includes(filters.qCode);
			const matchesQType = !filters.qType || record.q_type?.includes(filters.qType);

			const matchesInstSigningField =
				!filters.instSigningField ||
				(filters.instSigningField === "signed" ? record.instructor_sign : !record.instructor_sign);
			const matchesTrgSigningField =
				!filters.trgSigningField ||
				(filters.trgSigningField === "signed" ? record.trainingIC_sign : !record.trainingIC_sign);
			const matchesOffSigningField =
				!filters.offSigningField ||
				(filters.offSigningField === "signed" ? record.officer_sign : !record.officer_sign);

			return (
				matchesUnit &&
				matchesVocation &&
				matchesTeam &&
				matchesQCode &&
				matchesQType &&
				matchesInstSigningField &&
				matchesTrgSigningField &&
				matchesOffSigningField
			);
		});

		filteredRecords.sort((a, b) => {
			const dateA = new Date(a.q_date);
			const dateB = new Date(b.q_date);
			return filters.sortQDate === "asc" ? dateA - dateB : dateB - dateA;
		});

		return filteredRecords;
	};

	const filteredRecords = filterAndSortRecords(records, filters);

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
			<p className='text-2xl font-bold my-4 text-center'>Authorise Records Page</p>
			<div className='flex space-x-4'>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'
					onClick={handleSign}>
					Sign Selected
				</button>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'
					onClick={handleDelete}>
					Delete Selected
				</button>
			</div>
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
					<Filters filters={filters} setFilters={setFilters} />
				</thead>
				<tbody>
					{filteredRecords.map((person) => (
						<tr key={person.ath_id}>
							<td>{person.person_id}</td>
							<td>{person.name}</td>
							<td>{person?.unit}</td>
							<td>{person?.vocation}</td>
							<td>{person?.team}</td>
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
