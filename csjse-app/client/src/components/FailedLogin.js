import React from 'react';


//Show this if a login attempt failed
const LoginFailed = ({ onClose }) => (
    <div className="loginfailed">
        <p>Account Entered Does Not Exist</p>
        <button onClick={onClose}>Close</button>
    </div>
);

export default LoginFailed;