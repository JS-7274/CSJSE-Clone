/* The purpose of this file is to work in tandem with schools.js to display schools that are searched 
   and filtered. This file creates a compoenent for the list of schools that will appear on the left. */

import React, { useEffect, useState } from 'react';

function SchoolList({ onSelectSchool, searchResult, searchTerm, selectedGradeRange, selectedLocation, searchZip, looking }) {
  const [allSchools, setAllSchools] = useState([]); // Add state
  const [filteredSchools, setFilteredSchools] = useState([]); // Add state to store filtered schools
  
  useEffect(() => {
    // Fetch all schools when the file is called
    fetch("http://localhost:5000/api/schools")
      .then((response) => response.json())
      .then((data) => {
        setAllSchools(data.schools);
        setFilteredSchools(data.schools); // Initially set filtered schools to all schools
      })
      .catch((error) => console.error("Error fetching all schools:", error));
  }, []);

  useEffect(() => {
    // Update filtered schools when search result, selected grade range, or selected location changes
    if (searchTerm || selectedGradeRange || selectedLocation || searchZip) {
      const filtered = allSchools.filter(school =>
        (school.school_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedGradeRange ? school.grade_range === selectedGradeRange : true) &&
        (selectedLocation ? school.location.toLowerCase() === selectedLocation.toLowerCase() : true) &&
        (school.zip.includes(searchZip)) &&
        (!looking || school.looking) 
      );
      setFilteredSchools(filtered); // Update state to filtered
    } else {
      setFilteredSchools(allSchools); // Update state to not filtered (if there are no filters)
    }
  }, [searchResult, searchTerm, selectedGradeRange, selectedLocation, searchZip, looking, allSchools]);
  
  return (
    <div className="school-list-column school-boxes">
      <h2>Schools List</h2>
      <ul>
        {filteredSchools && filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <li key={school.school_id} onClick={() => onSelectSchool(school)} className="school-box">
              {school.school_name}
            </li>
          ))
        ) : (
          <p>No schools found</p>
        )}
      </ul>
    </div>
  );
}

export default SchoolList;