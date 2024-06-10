import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUser, fetchUsers } from "../../utilities/users-service";
import { fetchOnePersonnel, deleteOnePerson } from "../../utilities/personnel-service";
import { signRecord } from "../../utilities/authorisation-service";
import moment from "moment-timezone";

import debug from "debug";
const log = debug("pern:pages:PersonnelDetailsPage");

export default function PersonnelDetailsPage() {
	const [personnel, setPersonnel] = useState([]);
	const { personId } = useParams();
	const navigate = useNavigate();
	const user = getUser();
	const [users, setUsers] = useState();

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
		getPersonnel();
	}, [personId]);

	const handleDelete = async () => {
		log("handle delete");
		await deleteOnePerson(personId);
		navigate(`/personnel`);
	};

	const handleClickRow = (personId, athId) => {
		navigate(`/personnel/${personId}/authorisation/${athId}`);
	};

	const handleSign = async (ath_id) => {
		const athId = [ath_id];
		const response = await signRecord({ athId, user });
		log("signed, %o", response);
		window.location.reload();
	};

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Personnel Details page</p>
			<div className='flex space-x-4'>
				<Link to={`/personnel/${personId}/edit`}>
					<button
						className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
						type='submit'>
						EDIT Personnel Details
					</button>
				</Link>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'
					onClick={handleDelete}>
					DELETE Personnel Details
				</button>
			</div>

			<table className='divide-y divide-gray-200'>
				<thead className='bg-slate-200'>
					<tr>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Personnel ID
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Name
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							NRIC
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Unit
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							ORD
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Service
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Vocation
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Team
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Qualifcation
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Latest Authorisation Date
						</th>
						<th
							scope='col'
							className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Currency Level
						</th>
					</tr>
				</thead>
				<tbody className='bg-gray-100 divide-y divide-gray-200'>
					<tr>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.person_id}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.name}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.nric}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.unit}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>
							{new Date(personnel[0]?.ord).toLocaleDateString()}
						</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.service}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.vocation}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.team}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.q_code}</td>
						<td className='px-2 py-1 whitespace-nowrap border'>
							{new Date(personnel[0]?.latest_q_date).toLocaleDateString()}
						</td>
						<td className='px-2 py-1 whitespace-nowrap border'>{personnel[0]?.currency_lvl}</td>
					</tr>
				</tbody>
			</table>
			<br />

			<Link to={`/personnel/${personId}/authorisation/new`}>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'>
					Add Authorisation Record
				</button>
			</Link>
			<table className='min-w-full table-fixed divide-y divide-gray-50 mb-5'>
				<thead className='bg-slate-200'>
					<tr>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Qualification Code
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Qualification Type
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Qualification Date
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Task 1 Date
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Task 2 Date
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Task 3 Date
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Instructor Sign-off
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Instructor Timestamp
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Training IC Sign-off
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Training IC Timestamp
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Officer-in-Charge Sign-off
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							Officer-in-Charge Timestamp
						</th>
						<th
							scope='col'
							className='px-2 py-2 text-left text-xs sm:text-xxs font-medium text-gray-500 uppercase tracking-wider '>
							SIGN
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{personnel.map((person) => (
						<tr
							key={person.ath_id}
							onClick={() => handleClickRow(person.person_id, person.ath_id)}
							style={{ cursor: "pointer" }}>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>{person?.q_code}</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>{person?.q_type}</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.task1 ? new Date(person.task1).toLocaleDateString() : null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.task2 ? new Date(person.task2).toLocaleDateString() : null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.task3 ? new Date(person.task3).toLocaleDateString() : null}
							</td>

							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.instructor_sign
									? users?.find((user) => user.u_sign === person.instructor_sign).u_name
									: null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.instructor_ts
									? moment.utc(person.instructor_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>

							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.trainingic_sign
									? users?.find((user) => user.u_sign === person.trainingic_sign).u_name
									: null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.trainingic_ts
									? moment.utc(person.trainingic_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>

							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.officer_sign
									? users?.find((user) => user.u_sign === person.officer_sign).u_name
									: null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								{person.officer_ts
									? moment.utc(person.officer_ts).format("MMM Do YY, h:mm a")
									: null}
							</td>
							<td className='px-2 py-1 whitespace-nowrap border text-xs'>
								<button
									className='ring-offset-background focus-visible:ring-ring flex h-5 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
									type='submit'
									onClick={(e) => {
										e.stopPropagation();
										handleSign(person.ath_id);
									}}>
									sign
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
