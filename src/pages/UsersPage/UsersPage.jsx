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
			<div className='flex justify-center'>
				{isAdmin ? (
					<button
						className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
						type='submit'
						onClick={() => setShowForm(!showForm)}>
						Enroll Users
					</button>
				) : null}
				{showForm ? <SignUpForm /> : null}
			</div>
			<div className='flex justify-center'>
				<table className='divide-y divide-gray-200'>
					<thead className='bg-gray-300'>
						<tr>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Name
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Email
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Unit
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Appointment
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-100 divide-y divide-gray-200'>
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
			</div>
		</>
	);
}
