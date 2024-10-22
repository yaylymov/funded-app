import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Questionnaire() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        state: '',
        company_size: '',
        areas: '',
        grants_amount: 0,
        revenue: 0
    });

    const handleInputChange = (e) => {
        setAnswers({...answers, [e.target.name]: e.target.value});
    };

    const handleNext = async (e) => {
        e.preventDefault()
        if (step < 5) {
            setStep(step + 1);
        } else {
            try {
                const dataToSend = {
                    ...answers,
                    grants_amount: parseInt(answers.grants_amount),
                    revenue: parseInt(answers.revenue)
                };
                console.log("Sending data:", dataToSend);
                const response = await axios.post('http://localhost:8000/questions', dataToSend);
                console.log("Received data:", response.data);
                navigate('/loading', {state: {data: response.data}});
            } catch (error) {
                console.error("Error processing answers:", error);
                navigate('/loading', {state: {data: []}});
            }
        }
    };

    const questions = [
        {label: "In which state is your business based?", name: "state"},
        {
            label: "What is your company size? (e.g., Kleines Unternehmen, Mittleres Unternehmen, Großes Unternehmen)",
            name: "company_size"
        },
        {label: "In which areas are you active? (e.g., Forschung & Innovation, Digitalisierung)", name: "areas"},
        {label: "What is the maximum grant amount you're looking for?", name: "grants_amount"},
        {label: "What is your monthly revenue?", name: "revenue"}
    ];

    return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center text-white">
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
                    className="button px-5 py-2"
                >
                    {step < 5 ? "Next" : "Submit"}
                </button>
            </form>
            <p className="mt-4">Step {step} of 5</p>
        </div>
    );
}

export default Questionnaire;