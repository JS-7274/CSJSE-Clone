import React, {useState} from "react";
//import "../index.css";

export default function Login() {
    //creates two variables (email and pass) along with 2 functions to change them, useState being empty means they start off empty
    //useState allows us to edit variables based on inputs we get to my understanding
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    //passes in (e) as a parameter, e.preventDefault() forces the page to not reload on subission, console.log(email) puts whatever is input for email into the console, probably replace for actual login code
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@domain.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password" />
                    <button type="submit">Log In</button>
                </form>
                <button className="link-btn">Don't have an account? Register here</button>
            </div>
        </div>
    )
}
//<div className = "App"> gives the div the name App which lets it reference a style in app.css
//<div className = "auth...container"> gives the div that name to apply stylings from app.css
//<h2>Login</h2> header for the login form
//<form className='login-form'...> start of a form element  and takes in the handle submit function from above
//<label htmlfor-"email"> marks a html element taking a form input, 'thmlfor="email"' gives it the id 'email'
//<input value={email}... creates an input element that will take in an email (variable made earlier) then calls the setEmail function to what is input
//<button type="submit"... creates a button html element, type="submit" makes it trigger a submit of the form on click, the >Log In< gives the button the text "Log In"