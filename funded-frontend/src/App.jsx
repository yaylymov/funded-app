import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/navBar.jsx";
import Landing from "./components/landing.jsx";
import Questionnaire from "./components/questionnaire.jsx";
import Loading from "./components/loading.jsx";
import Results from "./components/results.jsx";
import './index.css';

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/questionnaire" element={<Questionnaire/>}/>
                <Route path="/loading" element={<Loading/>}/>
                <Route path="/results" element={<Results/>}/>
            </Routes>
        </Router>
    );
}

export default App;
