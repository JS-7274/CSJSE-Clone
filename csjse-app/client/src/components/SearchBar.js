import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch, onShowAll }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleShowAllClick = () => {
    setSearchTerm(""); // Reset search term
    if (onShowAll) {
      onShowAll();
    }
  };

  return (
    <div className="search-bar">
      <button onClick={handleShowAllClick}>Show All</button>
      {/* ... (existing search bar content) */}
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