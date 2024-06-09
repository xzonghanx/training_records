import { useState, useEffect } from "react";
import { fetchFilterOptions } from "../../utilities/users-service";

import debug from "debug";
const log = debug("pern:components:PersonnelFilters");

export default function PersonnelFilters({ filters, setFilters }) {
	const [filterOptions, setFilterOptions] = useState({
		unitOptions: [],
		serviceOptions: [],
		vocationOptions: [],
		teamOptions: [],
		qCodeOptions: [],
		currencyLvlOptions: [],
	});

	useEffect(() => {
		const getFilterOptions = async () => {
			try {
				const data = await fetchFilterOptions();
				log(data);
				setFilterOptions(data);
			} catch (error) {
				log("error getting filter options", error);
			}
		};
		getFilterOptions();
	}, []);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	return (
		<tr>
			<th></th>
			<th></th>
			<th></th>
			<th>
				<select name='unit' value={filters.unit} onChange={handleFilterChange}>
					<option value=''>All Units</option>
					{filterOptions.unitOptions.map((option) => (
						<option key={option.unit} value={option.unit}>
							{option.unit}
						</option>
					))}
				</select>
			</th>
			<th></th>
			<th>
				<select name='service' value={filters.service} onChange={handleFilterChange}>
					<option value=''>All Service Type</option>
					{filterOptions.serviceOptions.map((option) => (
						<option key={option.service} value={option.service}>
							{option.service}
						</option>
					))}
				</select>
			</th>
			<th>
				<select name='vocation' value={filters.vocation} onChange={handleFilterChange}>
					<option value=''>All Vocations</option>
					{filterOptions.vocationOptions.map((option) => (
						<option key={option.vocation} value={option.vocation}>
							{option.vocation}
						</option>
					))}
				</select>
			</th>
			<th>
				<select name='team' value={filters.team} onChange={handleFilterChange}>
					<option value=''>All Teams</option>
					{filterOptions.teamOptions.map((option) => (
						<option key={option.team} value={option.team}>
							{option.team}
						</option>
					))}
				</select>
			</th>
			<th>
				<select name='qCode' value={filters.qCode} onChange={handleFilterChange}>
					<option value=''>All Q Codes</option>
					{filterOptions.qCodeOptions.map((option) => (
						<option key={option.q_code} value={option.q_code}>
							{option.q_code}
						</option>
					))}
				</select>
			</th>
			<th></th>
			<th>
				<select name='currencyLvl' value={filters.currencyLvl} onChange={handleFilterChange}>
					<option value=''>All Currency Lvls</option>
					{filterOptions.currencyLvlOptions.map((option) => (
						<option key={option.currency_Lvl} value={option.currency_lvl}>
							{option.currency_lvl}
						</option>
					))}
				</select>
			</th>
		</tr>
	);
}
