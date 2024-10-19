import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/navBar";
import Landing from "./components/landing";
import Questionnaire from "./components/questionnaire";
import Loading from "./components/loading";
import Results from "./components/results";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
    useEffect(() => {
        const circle = document.getElementById("mouse-circle");
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;

        const moveCircle = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            circle.style.opacity = "1";
        };

        const animateCircle = () => {
            circleX += (mouseX - circleX) * 0.1;
            circleY += (mouseY - circleY) * 0.1;

            circle.style.left = `${circleX}px`;
            circle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCircle);
        };

        const handleMouseLeavePage = () => {
            circle.style.opacity = "0";
        };

        window.addEventListener("mousemove", moveCircle);
        window.addEventListener("mouseleave", handleMouseLeavePage);

        animateCircle();

        return () => {
            window.removeEventListener("mousemove", moveCircle);
            window.removeEventListener("mouseleave", handleMouseLeavePage);
        };
    }, []);

    return (
        <Router>
            <NavBar/>
            <div id="mouse-circle"></div>
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