import React, { useState, useEffect } from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/Schools.css";
import { SearchBar } from "../components/SearchBar";
import SchoolList from "../components/SchoolList";

function Schools() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({ gradeRange: "", location: "" });
  const [selectedGradeRange, setSelectedGradeRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    // Fetch all schools when the component mounts
    fetchSchools();
  }, []);

  // Function to fetch schools based on filter options
  const fetchSchools = () => {
    const { gradeRange, location } = filterOptions;
    let url = `http://localhost:5000/api/schools?searchQuery=${searchTerm}`;
    if (gradeRange) {
      url += `&degree=${gradeRange}`;
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
        setSearchResult(data.schools);
      })
      .catch(error => console.error('Error fetching filtered schools list:', error));
  };

  // Function to reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGradeRange("");
    setSelectedLocation("");
    setFilterOptions({ gradeRange: "", location: "" });
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchSchools(); // Trigger re-fetch when search term changes
  };

  // Function to handle showing all schools
  const handleShowAll = () => {
    resetFilters(); // Reset filters
    fetchSchools(); // Trigger re-fetch when "Show All" is clicked
  };

  // Function to handle selecting a school
  const handleSelectSchool = (school) => {
    setSelectedSchool(school);
  };

  // Function to handle grade range change
  const handleGradeRangeChange = (event) => {
    const gradeRange = event.target.value;
    setSelectedGradeRange(gradeRange);
    setFilterOptions({ ...filterOptions, gradeRange });
    fetchSchools(); // Trigger fetching schools when grade range filter changes
  };

  // Function to handle location change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setFilterOptions({ ...filterOptions, location });
    fetchSchools(); // Trigger fetching schools when location filter changes
  };

  return (
    <div>
      <TeacherStaffHeader></TeacherStaffHeader>
      <div className="search-bar">
        <button onClick={handleShowAll}>Show All</button>
        {/* Filter by Grade Range */}
        <select value={selectedGradeRange} onChange={handleGradeRangeChange}>
          <option value="">Filter by Grade Range</option>
          <option value="K-12">K-12</option>
          <option value="Elementary">Elementary</option>
          <option value="Middle">Middle</option>
          <option value="High">High</option>
        </select>
        {/* Filter by Location */}
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Filter by Location</option>
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
          <div className="school-list-column">
            <SchoolList onSelectSchool={handleSelectSchool} searchResult={searchResult} searchTerm={searchTerm} selectedGradeRange={selectedGradeRange} selectedLocation={selectedLocation} />
          </div>
          <div className="school-info-column">
            {selectedSchool && (
              <div>
                <h2>{selectedSchool.school_name}</h2>
                <p>Population: {selectedSchool.school_population}</p>
                <p>Statement of Faith: {selectedSchool.statement_of_faith}</p>
                <p>Covenantal: {selectedSchool.covenantal}</p>
                <p>Teacher Count: {selectedSchool.teacher_count}</p>
                <p>Administrative Structure: {selectedSchool.administrative_structure}</p>
                <p>Phone: {selectedSchool.phone}</p>
                <p>Contact Email: {selectedSchool.contact_email}</p>
                <p>Location: {selectedSchool.location}</p>
                <p>Campus Number: {selectedSchool.campus_number}</p>
                <p>Accreditation: {selectedSchool.accreditation}</p>
                <p>Grade Range: {selectedSchool.grade_range}</p>
                <p>About: {selectedSchool.about}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schools;