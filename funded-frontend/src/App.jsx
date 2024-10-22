import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/navBar";
import Landing from "./components/landing";
import Questionnaire from "./components/questionnaire";
import Loading from "./components/loading";
import Results from "./components/results";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Apply from "./components/apply.jsx";
import Manage from "./components/manage.jsx";
import Identify from "./components/identify.jsx";

function App() {

    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/questionnaire" element={<Questionnaire/>}/>
                <Route path="/loading" element={<Loading/>}/>
                <Route path="/results" element={<Results/>}/>
                <Route path="/identify" element={<Identify/>}/>
                <Route path="/apply" element={<Apply/>}/>
                <Route path="/manage" element={<Manage/>}/>
            </Routes>
        </Router>
    );
}

export default App;