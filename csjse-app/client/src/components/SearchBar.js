import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
	return (
		<div className="search-bar">
			{/*add hamburger icon and searcch icon*/}
			<FontAwesomeIcon icon={fas.faBars} />
			<div className="search">
				<p>Search</p>
				<FontAwesomeIcon icon={fas.faMagnifyingGlass} />
			</div>
		</div>
	);
}

export { SearchBar };
