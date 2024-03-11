import React, { useState } from "react";
import { SchoolHeader } from "../components/Headers";
import "../styles/Teachers.css";
import TeachersList from "../components/TeacherList";
import { SearchBar } from "../components/SearchBar";

function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // Set the search term

    // Make an API request to fetch teachers based on the search term
    fetch(`http://localhost:5000/api/teachers${searchTerm ? `?searchQuery=${searchTerm}` : ''}`)
      .then(response => response.json())
      .then(data => {
        // Assuming the API response has a 'teachers' field with the filtered list
        const filteredTeachers = data.teachers;

        console.log("Searching for:", searchTerm);

        // Set the filtered teachers to update the TeachersList component
        setSearchResult(filteredTeachers);
      })
      .catch(error => console.error('Error fetching filtered teachers list:', error));
  };

  const handleShowAll = () => {
    // Fetch all teachers when "Show All" button is clicked
    fetch("http://localhost:5000/api/teachers")
      .then(response => response.json())
      .then(data => setSearchResult(data.teachers))
      .catch(error => console.error('Error fetching all teachers:', error));
  };

  return (
    <div>
      <SchoolHeader></SchoolHeader>
      <SearchBar onSearch={handleSearch} onShowAll={handleShowAll}></SearchBar>
      <div className="info-display">
        <div className="columns-container">
          <div className="teacher-list-column">
            <TeachersList onSelectTeacher={handleSelectTeacher} searchResult={searchResult} searchTerm={searchTerm} />
          </div>
          <div className="teacher-info-column">
            {selectedTeacher && (
              <div>
                <h2>Teacher Information</h2>
                <p>Name: {selectedTeacher.first_name} {selectedTeacher.last_name}</p>
				        <p>Testimony: {selectedTeacher.testimony}</p>
                <p>Contact-Email: {selectedTeacher.contact_email}</p>
                <p>Resume: </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;