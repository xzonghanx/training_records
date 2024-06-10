import { useState, useEffect } from "react";
import { fetchFilterOptions } from "../../utilities/users-service";

import debug from "debug";
const log = debug("pern:components:Filters");

export default function Filters({ filters, setFilters }) {
	const [filterOptions, setFilterOptions] = useState({
		unitOptions: [],
		vocationOptions: [],
		teamOptions: [],
		qCodeOptions: [],
		qTypeOptions: [],
	});

	useEffect(() => {
		const getFilterOptions = async () => {
			try {
				const data = await fetchFilterOptions();
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

	const handleSortChange = (e) => {
		const { value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			sortQDate: value,
		}));
	};

	return (
		<tr>
			<th></th>
			<th></th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
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
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
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
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
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
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
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
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
					name='qType'
					value={filters.qType}
					onChange={handleFilterChange}>
					<option value=''>All Q Types</option>
					{filterOptions.qTypeOptions.map((option) => (
						<option key={option.q_type} value={option.q_type}>
							{option.q_type}
						</option>
					))}
				</select>
			</th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
					value={filters.sortQDate}
					onChange={handleSortChange}>
					<option value='asc'>Ascending</option>
					<option value='desc'>Descending</option>
				</select>
			</th>
			<th></th>
			<th></th>
			<th></th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
					name='instSigningField'
					value={filters.instSigningField}
					onChange={handleFilterChange}>
					<option value=''>All</option>
					<option value='signed'>Signed</option>
					<option value='not_signed'>Not Signed</option>
				</select>
			</th>
			<th></th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
					name='trgSigningField'
					value={filters.trgSigningField}
					onChange={handleFilterChange}>
					<option value=''>All</option>
					<option value='signed'>Signed</option>
					<option value='not_signed'>Not Signed</option>
				</select>
			</th>
			<th></th>
			<th>
				<select
					className='border-opacity-60 border-slate-500 ring-offset-background focus-visible:ring-ring flex
				text-left rounded-md border text-xs file:border-0 file:bg-transparent file:text-xs file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5'
					name='offSigningField'
					value={filters.offSigningField}
					onChange={handleFilterChange}>
					<option value=''>All</option>
					<option value='signed'>Signed</option>
					<option value='not_signed'>Not Signed</option>
				</select>
			</th>
			<th></th>
			<th></th>
		</tr>
	);
}
