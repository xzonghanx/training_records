import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllQualifications } from "../../utilities/qualification-service";
import { getUser } from "../../utilities/users-service";

import debug from "debug";
const log = debug("pern:pages:QualificationsPage");

export default function QualificationsPage() {
	const [qualifications, setQualifications] = useState([]);
	const user = getUser();
	const isAdmin = user?.u_appt === "oic" || user?.u_appt === "admin";
	// log(isAdmin);
	const navigate = useNavigate();

	useEffect(() => {
		const getAllQualifications = async () => {
			try {
				const data = await fetchAllQualifications();
				setQualifications(data);
			} catch (error) {
				log("error getting qualifications", error);
			}
		};
		getAllQualifications();
	}, []);

	const handleClickRow = (q_id) => {
		isAdmin ? navigate(`/qualifications/${q_id}/edit`) : log("no access rights");
	};

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Qualification Chart</p>
			<div className='flex justify-center'>
				{isAdmin ? (
					<button
						className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'
						type='submit'
						onClick={() => navigate("/qualifications/new")}>
						Add Courses
					</button>
				) : null}
			</div>
			<div className='flex justify-center'>
				<table className='divide-y divide-gray-200'>
					<thead className='bg-gray-300'>
						<tr>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Qualification Name
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Qualification Code
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Task 1 Desc
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Task 2 Desc
							</th>
							<th
								scope='col'
								className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Task 3 Desc
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-100 divide-y divide-gray-200'>
						{qualifications.map((qual) => (
							<tr
								key={qual.q_id}
								onClick={() => handleClickRow(qual.q_id)}
								style={{ cursor: "pointer" }}>
								<td>{qual?.q_name}</td>
								<td>{qual?.q_code}</td>
								<td>{qual?.task1}</td>
								<td>{qual?.task2}</td>
								<td>{qual?.task3}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
