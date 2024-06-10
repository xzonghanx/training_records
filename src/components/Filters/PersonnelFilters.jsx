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
		<tr className='bg-gray-200 divide-y divide-gray-200'>
			<th></th>
			<th></th>
			<th></th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='unit'
					value={filters.unit}
					onChange={handleFilterChange}>
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
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='service'
					value={filters.service}
					onChange={handleFilterChange}>
					<option value=''>All Service Type</option>
					{filterOptions.serviceOptions.map((option) => (
						<option key={option.service} value={option.service}>
							{option.service}
						</option>
					))}
				</select>
			</th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='vocation'
					value={filters.vocation}
					onChange={handleFilterChange}>
					<option value=''>All Vocations</option>
					{filterOptions.vocationOptions.map((option) => (
						<option key={option.vocation} value={option.vocation}>
							{option.vocation}
						</option>
					))}
				</select>
			</th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='team'
					value={filters.team}
					onChange={handleFilterChange}>
					<option value=''>All Teams</option>
					{filterOptions.teamOptions.map((option) => (
						<option key={option.team} value={option.team}>
							{option.team}
						</option>
					))}
				</select>
			</th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='qCode'
					value={filters.qCode}
					onChange={handleFilterChange}>
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
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-5'
					name='currencyLvl'
					value={filters.currencyLvl}
					onChange={handleFilterChange}>
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
