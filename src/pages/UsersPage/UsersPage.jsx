import { useState, useEffect } from "react";
import { getUser, fetchUsers } from "../../utilities/users-service";
import SignUpForm from "../../../src/components/SignUpForm/SignUpForm";

import debug from "debug";
const log = debug("pern:pages:UsersPage");

export default function UsersPage() {
	const user = getUser();
	const isAdmin = user?.u_appt === "oic" || user?.u_appt === "admin";
	const [users, setUsers] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await fetchUsers();
				setUsers(data);
			} catch (error) {
				log("error getting Users", error);
			}
		};
		getUsers();
	}, []);

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Registered Users</p>
			{isAdmin ? (
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'
					onClick={() => setShowForm(!showForm)}>
					Enroll Users
				</button>
			) : null}
			{showForm ? <SignUpForm /> : null}

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Unit</th>
						<th>Appointment</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.user_id}>
							<td>{user.u_name}</td>
							<td>{user.u_email}</td>
							<td>{user.u_unit}</td>
							<td>{user.u_appt}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
