/* Unused file, was going to be used for search but issues arised requiring this file to be
   merged with both search files. 
   
   People who have worked on this file: Autumn, Matthew, Josh
   Last worked on: 4/15/2024*/

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch, onShowAll, onFilterChange }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [viewFilters, setViewFilters] = useState(false);

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchClick = () => {
		if (onSearch) {
			onSearch(searchTerm);
		}
	};

	const handleFilterClick = () => {
		setViewFilters(true);
	};

	const handleShowAllClick = () => {
		setSearchTerm(""); // Reset search term
		if (onShowAll) {
			onShowAll();
		}
	};

	const handleDegreeChange = (event) => {
		const degree = event.target.value;
		onFilterChange({ degree });
	};

	const handleLocationChange = (event) => {
		const location = event.target.value;
		onFilterChange({ location });
	};

	return (
		<div className="search-bar">
			<FontAwesomeIcon icon={fas.faBars} onClick={handleFilterClick} />

			{viewFilters && (
				<div>
					<button onClick={handleShowAllClick}>Show All</button>
					{/* Filter by Degree */}
					<select onChange={(event) => handleDegreeChange(event)}>
						<option value="">Filter by Degree</option>
						<option value="Bachelor">Bachelor's</option>
						<option value="Master">Master's</option>
						<option value="Associate">Associate's</option>
					</select>
					{/* Filter by Location */}
					<select onChange={handleLocationChange}>
						<option value="">Filter by Location</option>
						<option value="alabama">Alabama</option>
						<option value="alaska">Alaska</option>
						<option value="arizona">Arizona</option>
						<option value="arkansas">Arkansas</option>
						<option value="california">California</option>
						<option value="colorado">Colorado</option>
						<option value="connecticut">Connecticut</option>
						<option value="delaware">Delaware</option>
						<option value="florida">Florida</option>
						<option value="georgia">Georgia</option>
						<option value="hawaii">Hawaii</option>
						<option value="idaho">Idaho</option>
						<option value="illinois">Illinois</option>
						<option value="indiana">Indiana</option>
						<option value="iowa">Iowa</option>
						<option value="kansas">Kansas</option>
						<option value="kentucky">Kentucky</option>
						<option value="louisiana">Louisiana</option>
						<option value="maine">Maine</option>
						<option value="maryland">Maryland</option>
						<option value="massachusetts">Massachusetts</option>
						<option value="michigan">Michigan</option>
						<option value="minnesota">Minnesota</option>
						<option value="mississippi">Mississippi</option>
						<option value="missouri">Missouri</option>
						<option value="montana">Montana</option>
						<option value="nebraska">Nebraska</option>
						<option value="nevada">Nevada</option>
						<option value="new_hapmshire">New Hampshire</option>
						<option value="new_jersey">New Jersey</option>
						<option value="new_mexico">New Mexico</option>
						<option value="new_york">New York</option>
						<option value="north_carolina">North Carolina</option>
						<option value="north_dakota">North Dakota</option>
						<option value="ohio">Ohio</option>
						<option value="oklahoma">Oklahoma</option>
						<option value="oregon">Oregon</option>
						<option value="pennsylvania">Pennsylvania</option>
						<option value="rhode_island">Rhode Island</option>
						<option value="south_carolina">South Carolina</option>
						<option value="south_dakota">South Dakota</option>
						<option value="tennessee">Tennessee</option>
						<option value="texas">Texas</option>
						<option value="utah">Utah</option>
						<option value="vermont">Vermont</option>
						<option value="virginia">Virginia</option>
						<option value="washington">Washington</option>
						<option value="west_virginia">West Virginia</option>
						<option value="wisconsin">Wisconsin</option>
						<option value="wyoming">Wyoming</option>
					</select>
				</div>
			)}

			<div className="search">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder="Search"
				/>
				<FontAwesomeIcon
					icon={fas.faSearch}
					onClick={handleSearchClick}
					style={{ cursor: "pointer" }}
				/>
			</div>
		</div>
	);
}

export { SearchBar };
