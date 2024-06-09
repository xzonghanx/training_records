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
			<h1>Teams Breakdown</h1>

			<table>
				<thead>
					<tr>
						<th>Team</th>
						<th>Strength</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => (
						<tr key={team.team}>
							<td>{team.team}</td>
							<td>{team.team_count} pax</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
