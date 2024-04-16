/* This file defines a generic error popup. 

   People who have worked on this file: Josh
   Last worked on: 11/20/2023*/

import React from "react";

const ErrorPopup = ({ message, onClose }) => (
  <div className="errorpopup">
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default ErrorPopup;