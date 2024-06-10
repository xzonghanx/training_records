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
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
					type='submit'
					onClick={handleSign}>
					Sign Selected
				</button>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
					type='submit'
					onClick={handleDelete}>
					Delete Selected
				</button>
			</div>
			<table className='w-full table-fixed divide-y divide-gray-200 mb-5'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Personnel ID
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Name
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Unit
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Vocation
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Team
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Qualification Code
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Qualification Type
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Qualification Date
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>
							Task 1 Date
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Task 2 Date
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Task 3 Date
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Instructor Sign-off
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Instructor Timestamp
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Training IC Sign-off
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Training IC Timestamp
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Officer-in-Charge Sign-off
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:text-xxs sm:tracking-tighter'>
							Officer-in-Charge Timestamp
						</th>
						<th
							scope='col'
							className='px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Select
						</th>
					</tr>
					<Filters filters={filters} setFilters={setFilters} />
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{filteredRecords.map((person) => (
						<tr key={person.ath_id}>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person.person_id}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person.name}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person?.unit}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person?.vocation}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person?.team}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person?.q_code}</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>{person?.q_type}</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}
							</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.task1 ? new Date(person.task1).toLocaleDateString() : null}
							</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.task2 ? new Date(person.task2).toLocaleDateString() : null}
							</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.task3 ? new Date(person.task3).toLocaleDateString() : null}
							</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>
								{person.instructor_sign
									? users?.find((user) => user.u_sign === person.instructor_sign).u_name
									: null}
							</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.instructor_ts
									? moment.utc(person.instructor_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>
								{person.trainingic_sign
									? users?.find((user) => user.u_sign === person.trainingic_sign).u_name
									: null}
							</td>
							<td className='px-1 py-0 whitespace-wrap border text-xs'>
								{person.trainingic_ts
									? moment.utc(person.trainingic_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td className='px-1 py-0 whitespace-nowrap border text-xs'>
								{person.officer_sign
									? users?.find((user) => user.u_sign === person.officer_sign).u_name
									: null}
							</td>
							<td className='px-1 py-0 whitespace-wrap  text-xs'>
								{person.officer_ts
									? moment.utc(person.officer_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							{/* <td>
								{person.officer_ts
									? moment(person.officer_ts).tz("Asia/Singapore").format("MMM Do YY, h:mm a")
									: null}
							</td> */}
							<td className='px-1 py-0 whitespace-nowrap border'>
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
