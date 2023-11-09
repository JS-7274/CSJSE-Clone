//import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}
//Basically, (don't understand it too well myself) Router is needed for routes to work, routes let you set multiple route(s)
    //the route lets you set a path (path='') and element lets you put whatever you wish in it (usually the function you export from that page) (element={})

export default App;
