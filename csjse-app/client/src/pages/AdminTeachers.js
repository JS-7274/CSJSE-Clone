/* AdminTeachers.js */
/* Displays information for the admin user on the list of teachers and their details. */

import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/Teachers.css";
import TeachersList from "../components/TeacherList";

function AdminTeachers() {
  // State to store the selected teacher
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  // State to store the search result
  const [searchResult, setSearchResult] = useState([]);
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the filter options
  const [filterOptions, setFilterOptions] = useState({ degree: "", location: "" });
  // State to store the selected degree filter
  const [selectedDegree, setSelectedDegree] = useState("");
  // State to store the selected location filter
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

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    fetchTeachers();
  };

  // Function to handle selecting a teacher
  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  // Function to handle degree filter change
  const handleDegreeChange = (event) => {
    const degree = event.target.value;
    setSelectedDegree(degree);
    setFilterOptions({ ...filterOptions, degree });
    fetchTeachers();
  };

  // Function to handle location filter change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setFilterOptions({ ...filterOptions, location });
    fetchTeachers();
  };

  const handleDeleteTeacher = async () => {
      try {
          // Check if a teacher is selected
          if (!selectedTeacher || !selectedTeacher.teacher_staff_id) {
              console.error('No teacher selected for deletion');
              return; // Exit early if no teacher is selected
          }

          console.log('Deleting teacher:', selectedTeacher.teacher_staff_id); // Log the teacher ID

          // Make API calls to delete records from different tables
          await deleteFromAPI(`http://localhost:5000/api/deleteSavedJobs/${selectedTeacher.teacher_staff_id}`);
          await deleteFromAPI(`http://localhost:5000/api/deleteJobApplications/${selectedTeacher.teacher_staff_id}`);
          await deleteFromAPI(`http://localhost:5000/api/deleteReference/${selectedTeacher.teacher_staff_id}`);
          await deleteFromAPI(`http://localhost:5000/api/deleteTeacherProfile/${selectedTeacher.teacher_staff_id}`);

          // If deletion is successful, reset the selected teacher
          setSelectedTeacher(null);
          // Refresh the teacher list
          fetchTeachers();
      } catch (error) {
          console.error('Error deleting teacher:', error);
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
        <button onClick={() => {}}>Show All</button>
        <select value={selectedDegree} onChange={handleDegreeChange}>
          <option value="">Filter by Degree</option>
          <option value="Bachelor">Bachelor's</option>
          <option value="Master">Master's</option>
          <option value="Associate">Associate's</option>
        </select>
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
        </div>
      </div>
      <div className="info-display">
        <div className="columns-container">
          <div className="teacher-list-column">
            <TeachersList
              onSelectTeacher={handleSelectTeacher}
              searchResult={searchResult}
              searchTerm={searchTerm}
              selectedDegree={selectedDegree}
              selectedLocation={selectedLocation}
            />
          </div>
          <div className="teacher-info-column">
            {selectedTeacher && (
              <div>
                <h2>{selectedTeacher.school_name}</h2>
                <p>Name: {selectedTeacher.first_name} {selectedTeacher.last_name}</p>
                <p>Testimony: {selectedTeacher.testimony}</p>
                <p>Certifications: {selectedTeacher.degree}</p>
                <p>Phone: {selectedTeacher.phone}</p>
                <p>Contact Email: {selectedTeacher.contact_email}</p>
                <p>Location: {selectedTeacher.location}</p>
                <p>Zip: {selectedTeacher.zip}</p>
                <p>Resume: {selectedTeacher.job_resume}</p>
                <p>certifications: {selectedTeacher.degree}</p>
                <p>Experience: {selectedTeacher.experience}</p>
                <p>User ID: {selectedTeacher.teacher_staff_id}</p>
                <button onClick={selectedTeacher ? handleDeleteTeacher : () => {}}>Delete Teacher</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTeachers;
