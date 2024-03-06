/* App.js */
/*  */

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
import { Routes, Route } from "react-router-dom";
import { auth } from './firebase';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/TeacherLogin" element={<TeacherLogin />} />
			<Route path="/SchoolLogin" element={<SchoolLogin />} />
			<Route path="/TeacherStaffProfile/:id" element={<TeacherStaffProfile />} />
			<Route path="/SchoolProfile/:id" element={<SchoolProfile />} />
			<Route path="/SchoolCreateAcc" element={<SchoolCreateAcc />} />
			<Route path="/TeacherCreateAcc" element={<TeacherCreateAcc />} />
			<Route path="/Schools" element={<Schools />} />
			<Route path="/Jobs" element={<Jobs />} />
			<Route path="/Teachers" element={<Teachers />} />
		</Routes>
	);
}
//^Basically, Router is needed for <routes> to work, <routes> let you set multiple <route>s
//the <route> lets you set a path (path='') and element lets you put a function from one of the pages in it so that it will display what the function displays (usually the function you export from that page) (element={})

export default App;
