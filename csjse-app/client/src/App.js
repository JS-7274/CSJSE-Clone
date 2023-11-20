import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import Profile from './pages/Profile';
import TeacherCreateAcc from './pages/TeacherCreateAcc';
import SchoolCreateAcc from './pages/SchoolCreateAcc';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
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
