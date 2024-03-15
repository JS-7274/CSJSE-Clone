import React, { useState, useEffect } from "react";
import { SchoolHeader } from "../components/Headers";
import "../styles/Teachers.css";
import TeachersList from "../components/TeacherList";

function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ degree: "", location: "" });
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    // Fetch all teachers when the component mounts
    fetchTeachers();
  }, []);

  // Function to fetch teachers based on filter options
  const fetchTeachers = () => {
    const { degree, location } = filterOptions;
    let url = `http://localhost:5000/api/teachers?searchQuery=${searchTerm}`;
    if (degree) {
      url += `&degree=${degree}`;
    }
    if (location) {
      url += `&location=${location}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResult(data.teachers);
      })
      .catch(error => console.error('Error fetching filtered teachers list:', error));
  };

  // Function to reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDegree("");
    setSelectedLocation("");
    setFilterOptions({ degree: "", location: "" });
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchTeachers(); // Trigger re-fetch when search term changes
  };

  // Function to handle showing all teachers
  const handleShowAll = () => {
    resetFilters(); // Reset filters
    fetchTeachers(); // Trigger re-fetch when "Show All" is clicked
  };

  // Function to handle selecting a teacher
  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  // Function to handle degree change
  const handleDegreeChange = (event) => {
    const degree = event.target.value;
    setSelectedDegree(degree);
    setFilterOptions({ ...filterOptions, degree });
    fetchTeachers(); // Trigger fetching teachers when degree filter changes
  };

  // Function to handle location change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setFilterOptions({ ...filterOptions, location });
    fetchTeachers(); // Trigger fetching teachers when location filter changes
  };

  return (
    <div>
      <SchoolHeader></SchoolHeader>
      <div className="search-bar">
        <button onClick={handleShowAll}>Show All</button>
        {/* Filter by Degree */}
        <select value={selectedDegree} onChange={handleDegreeChange}>
          <option value="">Filter by Degree</option>
          <option value="Bachelor">Bachelor's</option>
          <option value="Master">Master's</option>
          <option value="Associate">Associate's</option>
        </select>
        {/* Filter by Location */}
        <select value={selectedLocation} onChange={handleLocationChange}>
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
          <option value="utah">utah</option>
          <option value="vermont">Vermont</option>
          <option value="virginia">Virginia</option>
          <option value="washington">Washington</option>
          <option value="west_virginia">West Virginia</option>
          <option value="wisconsin">Wisconsin</option>
          <option value="wyoming">Wyoming</option>
        </select>
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
          {/* Search icon */}
        </div>
      </div>
      <div className="info-display">
        <div className="columns-container">
          <div className="teacher-list-column">
            <TeachersList onSelectTeacher={handleSelectTeacher} searchResult={searchResult} searchTerm={searchTerm} selectedDegree={selectedDegree} selectedLocation={selectedLocation} />
          </div>
          <div className="teacher-info-column">
            {/* Teacher information */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;