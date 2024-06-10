import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchSearchedPersonnel } from "../../utilities/personnel-service";
import PersonnelFilters from "../../components/Filters/PersonnelFilters";

import debug from "debug";
const log = debug("pern:pages:PersonnelOverviewPage");

export default function PersonnelOverviewPage() {
	const [allPersonnel, setAllPersonnel] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
		unit: "",
		service: "",
		vocation: "",
		team: "",
		qCode: "",
		currencyLvl: "",
	});

	const filteredPersonnel = allPersonnel.filter((person) => {
		const matchesUnit = !filters.unit || person.unit?.includes(filters.unit);
		const matchesService = !filters.service || person.service?.includes(filters.vocation);
		const matchesVocation = !filters.vocation || person.vocation?.includes(filters.vocation);
		const matchesTeam = !filters.team || person.team?.includes(filters.team);
		const matchesQCode = !filters.qCode || person.q_code?.includes(filters.qCode);
		const matchesCurrency =
			!filters.currencyLvl || person.currency_lvl?.includes(filters.currencyLvl);

		return (
			matchesUnit &&
			matchesService &&
			matchesVocation &&
			matchesTeam &&
			matchesQCode &&
			matchesCurrency
		);
	});

	useEffect(() => {
		const getSearchPersonnel = async () => {
			try {
				const data = await fetchSearchedPersonnel(searchQuery);
				log("fetchSearchedPersonnel: %o", data);
				setAllPersonnel(data);
			} catch (error) {
				log("error fetching searched personnel", error);
			}
		};
		getSearchPersonnel();
	}, [searchQuery]);

	const handleClickRow = (personId) => {
		navigate(`/personnel/${personId}`);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<p className='text-2xl font-bold my-4 text-center'>Personnel Overview Page</p>

			<div>
				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'>
					<Link to='/personnel/new'>Create New Personnel</Link>
				</button>
			</div>
			<br />
			<input
				className='border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-1/6 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2'
				type='text'
				placeholder='Search by Name or NRIC'
				value={searchQuery}
				onChange={handleSearchChange}
			/>
			<br />
			<div></div>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>NRIC</th>
						<th>Unit</th>
						<th>ORD</th>
						<th>Service</th>
						<th>Vocation</th>
						<th>Team</th>
						<th>Qualification</th>
						<th>Latest Authorisation Date</th>
						<th>Currency Level</th>
					</tr>
				</thead>
				<PersonnelFilters filters={filters} setFilters={setFilters} />
				<tbody>
					{filteredPersonnel.map((person, index) => (
						<tr
							key={person.person_id}
							onClick={() => handleClickRow(person.person_id)}
							style={{ cursor: "pointer" }}>
							<td>{index + 1}</td>
							<td>{person.name}</td>
							<td>{person.nric}</td>
							<td>{person.unit}</td>
							<td>{new Date(person?.ord).toLocaleDateString()}</td>
							<td>{person.service}</td>
							<td>{person.vocation}</td>
							<td>{person.team}</td>
							<td>{person?.q_code}</td>
							<td>{person.q_date ? new Date(person.q_date).toLocaleDateString() : null}</td>
							<td>{person?.currency_lvl}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
