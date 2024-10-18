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
        // Select the circle element
        const circle = document.getElementById("mouse-circle");
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;

        // Function to move the circle with the mouse
        const moveCircle = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            circle.style.opacity = "1"; // Ensure the circle is visible when mouse is moving
        };

        // Smooth animation loop to move the circle
        const animateCircle = () => {
            circleX += (mouseX - circleX) * 0.1;
            circleY += (mouseY - circleY) * 0.1;

            circle.style.left = `${circleX}px`;
            circle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCircle);
        };

        // Function to change the circle interaction on hover
        const mouseEnter = (e) => {
            if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
                circle.classList.add("mouse-hover-dark");
            }
        };

        const mouseLeave = (e) => {
            if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
                circle.classList.remove("mouse-hover-dark");
            }
        };

        // Function to handle when the mouse leaves the window
        const handleMouseLeavePage = () => {
            circle.style.opacity = "0"; // Smoothly hide the circle
        };

        // Add event listeners
        window.addEventListener("mousemove", moveCircle);
        window.addEventListener("mouseover", mouseEnter);
        window.addEventListener("mouseout", mouseLeave);
        window.addEventListener("mouseleave", handleMouseLeavePage);

        // Start the animation loop
        animateCircle();

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", moveCircle);
            window.removeEventListener("mouseover", mouseEnter);
            window.removeEventListener("mouseout", mouseLeave);
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
