import { useState, useEffect } from "react";
import { getUser, fetchUsers } from "../../utilities/users-service";
import SignUpForm from "../../../src/components/SignUpForm/SignUpForm";

import debug from "debug";
const log = debug("pern:pages:UsersPage");

export default function UsersPage() {
	const user = getUser();
	const isAdmin = user.u_appt === ("admin" || "oic");
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
			<h1>Registered Users</h1>
			{isAdmin ? <button onClick={() => setShowForm(!showForm)}>Enroll users</button> : null}
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
