import './App.css';
import Home from "./pages/Home";
import TeacherLogin from './pages/TeacherLogin';
import SchoolLogin from './pages/SchoolLogin';
import Profile from './pages/Profile';
import TeacherCreateAcc from './pages/TeacherCreateAcc';
import SchoolCreateAcc from './pages/SchoolCreateAcc';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Route contributed to by everyone
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/SchoolLogin" element={<SchoolLogin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SchoolCreateAcc" element={<SchoolCreateAcc />} />
        <Route path="/TeacherCreateAcc" element={<TeacherCreateAcc />} />
      </Routes>
    </Router>
  );
}
//^Basically, Router is needed for <routes> to work, <routes> let you set multiple <route>s
    //the <route> lets you set a path (path='') and element lets you put a function from one of the pages in it so that it will display what the function displays (usually the function you export from that page) (element={})

export default App;
