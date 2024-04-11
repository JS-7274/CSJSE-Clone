/* This page will handle a login check for admin users before sending them to their home page. */

import React, { useEffect } from "react";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useParams } from "react-router-dom";

const AdminBuffer = () => {
	// Gets id from URL using react router dom
	const { id } = useParams();

	useEffect(() => {
		const checkAdminAccount = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/checkAdminAccount/${id}`
				);
				const data = await response.json();

				if (data.exists) {
					// If the user exists in the Admin table, redirect to AdminHome
					window.location.href = "/AdminJobs";
				} else {
					// If the user does not exist, show an error message and redirect to the home page
					const confirmMsg = "Account Type Is Wrong";
					if (window.confirm(confirmMsg)) {
						window.location.href = "/";
					}
				}
			} catch (error) {
				console.error("Error checking admin account:", error);
				// Handle error as needed, for example, show an error message and redirect to the home page
				const confirmMsg = "An error occurred. Please try again later.";
				if (window.confirm(confirmMsg)) {
					window.location.href = "/";
				}
			}
		};

		// Call the function to check admin account when the component mounts
		checkAdminAccount();
	}, [id]);
};

export default AdminBuffer;
