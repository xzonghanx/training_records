import { useState, useEffect } from "react";
import { fetchTeams } from "../../utilities/personnel-service";

import debug from "debug";
const log = debug("pern:components:Teams");

export default function Teams() {
	const [teams, setTeams] = useState([]);
	useEffect(() => {
		const getTeams = async () => {
			try {
				const data = await fetchTeams();
				setTeams(data);
			} catch (error) {
				log("error getting teams", error);
			}
		};
		getTeams();
	}, []);

	return (
		<>
			<div className='flex justify-center flex-col items-center w-2/5 my-10'>
				<div className='font-black block mb-2 text-sm  text-gray-900'>Teams Breakdown</div>

				<table className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg'>
					<thead className='bg-gray-200'>
						<tr>
							<th className='text-sm font-medium text-gray-900 px-1 py-1 text-left'>Team</th>
							<th className='text-sm font-medium text-gray-900 px-1 py-1 text-left'>Strength</th>
						</tr>
					</thead>
					<tbody>
						{teams.map((team) => (
							<tr key={team.team}>
								<td className='text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap'>
									{team.team}
								</td>
								<td className='text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap'>
									{team.team_count} pax
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
