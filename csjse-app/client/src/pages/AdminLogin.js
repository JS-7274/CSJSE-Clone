/* This page will handle the login functionality for Admin users. */

import React, { useState } from "react";
import "../styles/LoginandCreate.css";
import "../styles/FailedLogin.css";
import LoginFailed from "../components/FailedLogin";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showFailedLogin, setFailedLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // Redirect to AdminBuffer upon successful login
            window.location.href = `/AdminBuffer/${user.uid}`;
        } catch (error) {
            console.error("Error during login:", error.message);
            setFailedLogin(true);
        }
    };

    return (
        <div className="backgroundColor">
            <div className="login-container">
                {showFailedLogin && <div className="overlay" />}
                {showFailedLogin && <LoginFailed onClose={() => setFailedLogin(false)} />}

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Admin Login</h2>
                    <div className="form-group">
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="youremail@domain.com"
                            id="email"
                            name="email"
                            required
                            disabled={showFailedLogin}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            className="input-field"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="*******"
                            id="password"
                            name="password"
                            required
                            disabled={showFailedLogin}
                        />
                    </div>
                    <button type="submit" className="button" disabled={showFailedLogin}>
                        Log In
                    </button>
                </form>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}
