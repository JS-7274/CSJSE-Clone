/* The purpose of this file is to render the App and use Route from react-router-dom to
   allow navigation between the different files. It sets the default page "/" to the Home.*/

import "./App.css";
import Home from "./pages/Home";
import TeacherLogin from "./pages/TeacherLogin";
import SchoolLogin from "./pages/SchoolLogin";
import TeacherStaffProfile from "./pages/TeacherStaffProfile";
import SchoolProfile from "./pages/SchoolProfile";
import TeacherCreateAcc from "./pages/TeacherCreateAcc";
import SchoolCreateAcc from "./pages/SchoolCreateAcc";
import Schools from "./pages/Schools";
import Jobs from "./pages/Jobs";
import Teachers from "./pages/Teachers";
import AdminLogin from "./pages/AdminLogin";
import AdminBuffer from "./pages/AdminBuffer";
import AdminHome from "./pages/AdminHome";
import AdminTeachers from "./pages/AdminTeachers";
import AdminSchools from "./pages/AdminSchools";
import AdminJobs from "./pages/AdminJobs";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/TeacherLogin" element={<TeacherLogin />} />
			<Route path="/SchoolLogin" element={<SchoolLogin />} />
			<Route
				path="/TeacherStaffProfile/:id"
				element={<TeacherStaffProfile />}
			/>
			<Route path="/SchoolProfile/:school_id" element={<SchoolProfile />} />
			<Route path="/SchoolCreateAcc" element={<SchoolCreateAcc />} />
			<Route path="/TeacherCreateAcc" element={<TeacherCreateAcc />} />
			<Route path="/Schools" element={<Schools />} />
			<Route path="/Jobs" element={<Jobs />} />
			<Route path="/Teachers" element={<Teachers />} />
			<Route path="/AdminLogin" element={<AdminLogin />} />
			<Route path="/AdminBuffer/:id" element={<AdminBuffer />} />
			<Route path="/AdminHome" element={<AdminHome />} />
			<Route path="/AdminTeachers" element={<AdminTeachers />} />
			<Route path="/AdminSchools" element={<AdminSchools />} />
			<Route path="/AdminJobs" element={<AdminJobs />} />
		</Routes>
	);
}
//^Basically, Router is needed for <routes> to work, <routes> let you set multiple <route>s
//the <route> lets you set a path (path='') and element lets you put a function from one of the pages in it so that it will display what the function displays (usually the function you export from that page) (element={})

export default App;
