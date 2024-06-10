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
						<td>{new Date(personnel[0]?.latest_q_date).toLocaleDateString()}</td>
						<td>{personnel[0]?.currency_lvl}</td>
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
						<tr
							key={person.ath_id}
							onClick={() => handleClickRow(person.person_id, person.ath_id)}
							style={{ cursor: "pointer" }}>
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
							<td>
								<button
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
