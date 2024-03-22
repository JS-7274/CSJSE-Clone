/* AdminHome.js */
/* Displays information for the admin user on their own home page. */

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import "../styles/Profiles.css";
import "../styles/LogoutConfirmation.css";
import { AdminHeader } from "../components/Headers";
import LogoutConfirmation from "../components/LogoutConfirmation";

const AdminHome = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                window.location.href = "/AdminLogin";
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = () => {
        setShowLogoutConfirmation(true);
    };

    const confirmLogout = () => {
        auth
            .signOut()
            .then(() => {
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <AdminHeader></AdminHeader>
            <div className="profile-container">
                {showLogoutConfirmation && <div className="overlay" />}
                <div className="side">
                    <div className="sidebar">
                        {/* Links/buttons specific to admin home page */}
                        <button>Manage Jobs</button>
                        <button>Manage Teachers</button>
                        <button>Manage Schools</button>
                    </div>
                    <div>
                        {/* Logout button */}
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="content">
                    <div className="welcome-message">
                        <h2>Welcome, Admin!</h2>
                    </div>
                    <div className="profile-content">
                        {/* Placeholder content for admin home */}
                        <p>This is your admin home page. Here you can manage jobs, teachers, and schools.</p>
                    </div>
                </div>
            </div>
            {showLogoutConfirmation && (
                <LogoutConfirmation
                    onCancel={() => setShowLogoutConfirmation(false)}
                    onConfirm={confirmLogout}
                />
            )}
        </div>
    );
};

export default AdminHome;
