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
          <div className="dropdown">
            <button className="dropbtn">Create Account</button>
            <div className="dropdown-content">
              <Link>Teachers/Staff</Link>
              <Link>Schools</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Login</button>
            <div className="dropdown-content">
              <Link to="/Login">Teachers/Staff</Link>
              <Link to="/Login">Schools</Link>
            </div>
          </div>
        </div>
      </header>
      <div className="hero">
        {/*<div class="hero-content">
          <h1>Where Educators Embrace Faith and Calling</h1>
  </div>*/}
      </div>
      <div>
        <p>
        Where Educators Embrace Faith and Calling!

Explore a specialized platform tailored for educators seeking fulfilling careers within Christian schools. We're dedicated to connecting passionate educators with opportunities that integrate teaching excellence with Christian values.
        </p>
      </div>
      <div className="info-section">
        <img
          src={HeroImage}
          alt="teacher facing a room of students"
        />
        <p>
        Discover Purposeful Roles:
Unlock a treasure trove of job listings from Christian schools committed to academic excellence infused with faith-based principles. Whether you're an educator, administrator, or support staff, find roles that let you nurture minds while fostering spiritual growth.
        </p>
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
