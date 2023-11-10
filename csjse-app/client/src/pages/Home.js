import React from "react";
import Button from "../components/Button";
import "../styles/Home.css";
import { Route, Link, Routes } from "react-router-dom";

function Home() {  
  return (
      <>
      <div className="m-5">
        <div className="flex flex-row gap-5">
          <div className="basis-3/5">
            <h1 className="text-3xl font-medium">Christian Schools Job Board</h1>
          </div>
          <div className="basis-2/5 flex flex-row gap-5 items-center justify-end">
            <Button bg="black" btnText="Create Account" textColor="white" />
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </div>
      
      </>
    
  );
}
//<Button bg...> creates a button based off the import from the top of the page that imports from the components
    //this button will have a black bacground, text that says 'create account' and a white text color as stated in the inputs
//<Link to...> This code makes a piece of text that is clickable, and when clicked will take you to the page indicated by to='' and the text of the button is found at >Login<
    //we can probably find a way to move this into a button later

//'exports' the function 'Home' to allow use in other files that will import this file
export default Home;
