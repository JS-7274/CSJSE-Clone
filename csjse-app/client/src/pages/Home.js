import React from "react";
import "../styles/Home.css";
import HeroImage from "../assets/teacher07.jpg";
import { Link } from "react-router-dom";

function Home() {  
  return (
    <div>
      <header className="header">
        <div className="logo">Christian Schools Job Search</div>
        <div className="buttons">
        <Link to="/SchoolCreateAcc" className="button">Create School Account</Link>
          <Link to="/TeacherCreateAcc" className="button">Create Account</Link>
          <Link to="/Login" className="button">Login</Link>
        </div>
      </header>
      <div className="hero">
      
      </div>
      <div className="info-section">
        {/*<img
          src={HeroImage}
          alt="teacher facing a room of students"
          className="hero"
    />*/}
      </div>
    </div>
  );
}
//<Button bg...> creates a button based off the import from the top of the page that imports from the components
    //this button will have a black bacground, text that says 'create account' and a white text color as stated in the inputs
    //AM 11/10 because we will be using CSS, I don't think we will need to utilize components for things like buttons
//<Link to...> This code makes a piece of text that is clickable, and when clicked will take you to the page indicated by to='' and the text of the button is found at >Login<
    //we can probably find a way to move this into a button later
    //AM 11/10 Link to... can stay, we can add button styling

//'exports' the function 'Home' to allow use in other files that will import this file
export default Home;
