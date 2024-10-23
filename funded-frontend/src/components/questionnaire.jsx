import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAnswer, nextStep, previousStep} from "../redux/questionnaireSlice.js";
import axios from 'axios';

function Questionnaire() {
    const navigate = useNavigate();
    const step = useSelector((state) => state.questionnaire.step);
    const answers = useSelector((state) => state.questionnaire.answers);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        dispatch(setAnswer({name: e.target.name, value: e.target.value}));
    };

    const handleNext = async (e) => {
        e.preventDefault();

        // Validate the input
        const currentQuestion = questions[step - 1];
        const inputValue = answers[currentQuestion.name];

        if (!inputValue) {
            setErrorMessage("This field cannot be empty!");
            return;
        }

        if (step === 4 || step === 5) {
            if (isNaN(inputValue)) {
                setErrorMessage("Please enter a valid number!");
                return;
            }
        } else {
            if (!isNaN(inputValue)) {
                setErrorMessage("Please enter a valid text!");
                return;
            }
        }

        setErrorMessage("");

        if (step < 5) {
            dispatch(nextStep());
        } else {
            try {
                const dataToSend = {
                    ...answers,
                    grants_amount: parseInt(answers.grants_amount),
                    revenue: parseInt(answers.revenue),
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

    const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(previousStep());
    };

    const questions = [
        {label: "In which state is your business based?", name: "state", placeholder: "e.g. Berlin"},
        {label: "What is your company size?", name: "company_size", placeholder: "e.g. Small, Medium, Large"},
        {label: "In which areas are you active?", name: "areas", placeholder: "e.g. Innovation, Beratung"},
        {
            label: "What is the maximum grant amount you're looking for?",
            name: "grants_amount",
            placeholder: "Enter a number, e.g. 5000"
        },
        {label: "What is your monthly revenue?", name: "revenue", placeholder: "Enter a number, e.g. 100000"},
    ];

    return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center text-white">
            <h2 className="text-3xl mb-4 font-semibold">{questions[step - 1].label}</h2>
            <form className="w-100" style={{maxWidth: "400px"}}>
                <input
                    type={step === 4 || step === 5 ? "number" : "text"}
                    name={questions[step - 1].name}
                    value={answers[questions[step - 1].name]}
                    onChange={handleInputChange}
                    placeholder={questions[step - 1].placeholder}
                    className="form-control mb-3"
                />
                {errorMessage && (
                    <p className="mb-3 text-danger">{errorMessage}</p>
                )}
                <div className="d-flex justify-content-between">
                    {step > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="button px-5 py-2"
                            type="button"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="button px-5 py-2"
                        type="submit"
                    >
                        {step < 5 ? "Next" : "Submit"}
                    </button>
                </div>
            </form>
            <p className="mt-4">Step {step} of 5</p>
        </div>
    );
}

export default Questionnaire;
