/* Serves as a page that will allow admin users to search for schools. */

import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/Schools.css";
import { SearchBar } from "../components/SearchBar";
import SchoolList from "../components/SchoolList";

function AdminSchools() {
  const [selectedSchool, setSelectedSchool] = useState(null); // Add state to store what school is selected
  const [searchResult, setSearchResult] = useState([]); // Add state to store the result of search
  const [searchTerm, setSearchTerm] = useState(""); // Add state to store the search term
  const [filterOptions, setFilterOptions] = useState({ gradeRange: "", location: "" }); // Add state to store filter options
  const [selectedGradeRange, setSelectedGradeRange] = useState(""); // Add state to sotre grade range filter
  const [selectedLocation, setSelectedLocation] = useState(""); // Add state to store location filter
  const [searchZip, setSearchZip] = useState(""); // Add state to store zip
  const [looking, setLooking] = useState(false); // Add state to store the looking filter
  const [showMoreInfo, setShowMoreInfo] = useState(false); // State to toggle additional information

  useEffect(() => {
    // Fetch all schools when the file is called
    fetchSchools();
  }, []);

  // Function to fetch schools based on filter options
  const fetchSchools = () => {
    // Create variable to store the filter options
    const { gradeRange, location, zip, looking } = filterOptions;

    // Add filter options to url request for an API call based on server.js
    let url = `http://localhost:5000/api/schools?searchQuery=${searchTerm}`;
    if (gradeRange) {
      url += `&degree=${gradeRange}`;
    }
    if (location) {
      url += `&location=${location}`;
    }
    if (zip) {
      url += `&zip=${zip}`;
    }
    if (looking) {
      url += `&looking=true`;
    }

    // Make api call
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
    // Updates all states to "" or the equivalent of empty or NULL
    setSearchTerm("");
    setSelectedGradeRange("");
    setSelectedLocation("");
    setSearchZip("");
    setLooking(false);
    setFilterOptions({ gradeRange: "", location: "", looking: false });
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // Updates search term state with whatever is searched
    fetchSchools(); // Trigger re-fetch when search term changes
  };

  // Function to handle zip search
  const handleZipSearch = (searchZip) => {
    setSearchZip(searchZip); // Updates search term state with whatever is searched
    fetchSchools(); // Trigger re-fetch when search term changes
  };

  // Function to handle showing all schools
  const handleShowAll = () => {
    resetFilters(); // Reset filters
    fetchSchools(); // Trigger re-fetch when "Show All" is clicked
  };

  // Function to handle selecting a school
  const handleSelectSchool = (school) => {
    setSelectedSchool(school); // Update state to whatever school is selected
  };

  // Function to handle grade range change
  const handleGradeRangeChange = (event) => {
    // Create variable to store grade range and update filters accordingly
    const gradeRange = event.target.value;
    setSelectedGradeRange(gradeRange);
    setFilterOptions({ ...filterOptions, gradeRange });
    fetchSchools(); // Trigger fetching schools when grade range filter changes
  };

  // Function to handle location change
  const handleLocationChange = (event) => {
    // Create variable to store location and update filters accordingly
    const location = event.target.value;
    setSelectedLocation(location);
    setFilterOptions({ ...filterOptions, location });
    fetchSchools(); // Trigger fetching schools when location filter changes
  };

  // Function to handle looking filter change
  const handleLookingChange = (event) => { 
    const looking = event.target.checked;
    setLooking(looking);
    fetchSchools();
  };

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const handleDeleteSchool = async (schoolId) => {
      try {
          // Make API calls to delete records from different tables
          await deleteFromAPI(`http://localhost:5000/api/deleteJobPostingsBySchool/${schoolId}`);
          await deleteFromAPI(`http://localhost:5000/api/deleteSchool/${schoolId}`);
          // No need to delete references or saved jobs as they are not directly related to schools

          // If deletion is successful, reset the selected school
          setSelectedSchool(null);
          // Refresh the school list
          fetchSchools();
      } catch (error) {
          console.error('Error deleting school:', error);
          // Handle error as needed
      }
  };

  const deleteFromAPI = async (url) => {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
          throw new Error(`Failed to delete from ${url}`);
      }
  };

  return (
    <div>
      <AdminHeader></AdminHeader>
      <div className="search-bar">
        <button onClick={handleShowAll}>Show All</button>
        {/* Filter by Grade Range */}
        <select value={selectedGradeRange} onChange={handleGradeRangeChange}>
          <option value="">Filter by Grade Range</option>
          <option value="K-12">K-12</option>
          <option value="Elementary">Elementary</option>
          <option value="Middle">Middle</option>
          <option value="High">High</option>
          <option value="College">College</option>
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
          <label>
            Looking to Hire:
            <input
              type="checkbox"
              checked={looking}
              onChange={handleLookingChange}
            />
          </label>
        </div>
        <div className="search">
          {/* Zip Search box */}
          <input
            type="text"
            value={searchZip}
            onChange={(e) => handleZipSearch(e.target.value)}
            placeholder="Zip (First 3 digits)"
          />
          {/* Search icon (not here yet) */}
        </div>
        <div className="search">
          {/* Search box */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
          {/* Search icon (not here yet) */}
        </div>
      </div>
      <div className="info-display">
        <div className="columns-container">
          <div className="school-list-column">
            {/* Calls school list to return list of schools based on passed through criteria */}
            <SchoolList
              onSelectSchool={handleSelectSchool}
              searchResult={searchResult}
              searchTerm={searchTerm}
              selectedGradeRange={selectedGradeRange}
              selectedLocation={selectedLocation}
              searchZip={searchZip}
              looking={looking}
            />
          </div>
          <div className="school-info-column">
            {/* Displays information of the school */}
            {selectedSchool && (
              <div>
                <h2>{selectedSchool.school_name}</h2>
                <p>About: {selectedSchool.about}</p>
                <p>Location: {selectedSchool.location}</p>
                <p>Zip: {selectedSchool.zip}</p>
                <p>Number of Campuses: {selectedSchool.campus_number}</p>
                <p>Accreditation: {selectedSchool.accreditation}</p>
                <p>Grade Range: {selectedSchool.grade_range}</p>
                <p>Contact Email: {selectedSchool.contact_email}</p>
                <p>Phone: {selectedSchool.phone}</p>
                <p>User ID: {selectedSchool.school_id}</p>
                {/* Button to toggle more information */}
                <button onClick={() => handleDeleteSchool(selectedSchool.school_id)}>Delete School</button>
                <button onClick={toggleMoreInfo}>
                  {showMoreInfo ? "Hide More Info" : "Show More Info"}
                </button>
                {/* Additional information */}
                {showMoreInfo && (
                  <>
                    <p>Population: {selectedSchool.school_population}</p>
                    <p>Statement of Faith: {selectedSchool.statement_of_faith}</p>
                    <p>Covenantal: {selectedSchool.covenantal}</p>
                    <p>Teacher Count: {selectedSchool.teacher_count}</p>
                    <p>Administrative Structure: {selectedSchool.administrative_structure}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSchools;