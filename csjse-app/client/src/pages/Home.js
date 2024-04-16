/* Home.js */
/* This file handles what the home page displays and handles navigation to creating an account
   as well as logging in. 
   
   People who have worked on this file: Autumn, Josh
   Last worked on: 3/15/2024*/

import React from "react";
import "../styles/Home.css";
import DiscoverImage from "../assets/teacher04(resize).jpg";
import CommunityImage from "../assets/teacher02(resize).jpg";
import ResourcesImage from "../assets/teacher03(resize).jpg";
import PowerImage from "../assets/teacher01(resize).jpg";
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
							<Link to="/TeacherCreateAcc">Teachers/Staff</Link>
							<Link to="/SchoolCreateAcc">Schools</Link>
						</div>
					</div>
					<div className="dropdown">
						<button className="dropbtn">Login</button>
						<div className="dropdown-content">
							<Link to="/TeacherLogin">Teachers/Staff</Link>
							<Link to="/SchoolLogin">Schools</Link>
							<Link to="/AdminLogin">Admin</Link>
						</div>
					</div>
				</div>
			</header>
			<div className="hero">
				<div className="hero-content">
					<h1>Where Educators Embrace Faith and Calling</h1>
					<p>
						Explore a specialized platform tailored for educators seeking
						fulfilling careers within Christian schools. We're dedicated to
						connecting passionate educators with opportunities that integrate
						teaching excellence with Christian values.
					</p>
				</div>
			</div>
			<div className="info-section">
				<div className="info-text">
					<h2>Discover Purposeful Roles</h2>
					<p>
						Unlock a treasure trove of job listings from Christian schools
						committed to academic excellence infused with faith-based
						principles. Whether you're an educator, administrator, or support
						staff, find roles that let you nurture minds while fostering
						spiritual growth.
					</p>
				</div>
				<img src={DiscoverImage} alt="teacher facing a room of students" />
			</div>
			<div className="info-section">
				<img src={CommunityImage} alt="teacher facing a room of students" />
				<div className="info-text">
					<h2>Connect with a Community of Educators</h2>
					<p>
						Join a supportive community of like-hearted educators who understand
						the unique blend of faith and teaching. Network, share insights, and
						collaborate with professionals dedicated to shaping young minds
						through a Christ-centered education.
					</p>
				</div>
			</div>
			<div className="info-section">
				<div className="info-text">
					<h2>Empowering Resources for Educators</h2>
					<p>
						Access invaluable resources, articles, and tools tailored to elevate
						your teaching experience within a Christian context. From innovative
						teaching methods to navigating spiritual guidance in the classroom,
						equip yourself to excel in your vocation.
					</p>
				</div>
				<img src={ResourcesImage} alt="teacher facing a room of students" />
			</div>
			<div className="info-section">
				<img src={PowerImage} alt="teacher facing a room of students" />
				<div className="info-text">
					<h2>We believe...</h2>
					<p>
						in the transformative power of education rooted in faith. Start your
						journey towards a rewarding career where you inspire and guide the
						next generation.
					</p>
				</div>
			</div>
		</div>
	);
}

//'exports' the function 'Home' to allow use in other files that will import this file
export default Home;
