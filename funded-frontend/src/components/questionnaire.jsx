import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Questionnaire() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        state: '',
        companySize: '',
        areas: '',
        grantsAmount: '',
        revenue: ''
    });

    const handleInputChange = (e) => {
        setAnswers({...answers, [e.target.name]: e.target.value});
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 5) {
            setStep(step + 1);
        } else {
            axios.post('http://localhost:8000/questions', answers)
                .then(response => {
                    navigate('/results', {state: {data: response.data}});
                })
                .catch(() => {
                    console.error("Error processing answers.");
                });
        }
    };

    const questions = [
        {label: "In which state is your business based?", name: "state"},
        {label: "What is your company size?", name: "companySize"},
        {label: "In which areas are you active?", name: "areas"},
        {label: "How much grants would you like to receive?", name: "grantsAmount"},
        {label: "What is your monthly revenue?", name: "revenue"}
    ];

    return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white">
            <h2 className="text-3xl mb-4 font-semibold">{questions[step - 1].label}</h2>
            <form onSubmit={handleNext} className="w-100" style={{maxWidth: "400px"}}>
                <input
                    type="text"
                    name={questions[step - 1].name}
                    value={answers[questions[step - 1].name]}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                />
                <button
                    type="submit"
                    className="btn btn-warning text-white px-5 py-2"
                >
                    {step < 5 ? "Next" : "Submit"}
                </button>
            </form>
            <p className="text-muted mt-4">Step {step} of 5</p>
        </div>
    );
}

export default Questionnaire;
