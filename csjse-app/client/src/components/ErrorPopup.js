/* This file defines a generic error popup. */

import React from "react";

const ErrorPopup = ({ message, onClose }) => (
  <div className="errorpopup">
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default ErrorPopup;