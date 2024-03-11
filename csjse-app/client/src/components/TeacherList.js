import React, { useEffect, useState } from 'react';

function TeachersList({ onSelectTeacher, searchResult, searchTerm }) {
  const [allTeachers, setAllTeachers] = useState([]);
  
  useEffect(() => {
    // Fetch all teachers when the component mounts
    fetch("http://localhost:5000/api/teachers")
      .then((response) => response.json())
      .then((data) => setAllTeachers(data.teachers))
      .catch((error) => console.error("Error fetching all teachers:", error));
  }, []);
  
  return (
    <div className="teacher-list-column teacher-boxes">
      <h2>Teachers List</h2>
      {searchTerm ? (
        <ul>
          {searchResult.length > 0 ? (
            searchResult.map((teacher) => (
              <li key={teacher.teacher_id} onClick={() => onSelectTeacher(teacher)} className="teacher-box">
                {teacher.first_name} {teacher.last_name}
              </li>
            ))
          ) : (
            <p>No teachers found</p>
          )}
        </ul>
      ) : (
        <ul>
          {allTeachers.map((teacher) => (
            <li key={teacher.teacher_id} onClick={() => onSelectTeacher(teacher)} className="teacher-box">
              {teacher.first_name} {teacher.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeachersList;