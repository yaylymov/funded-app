import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

function Landing() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isValidEmail, setIsValidEmail] = useState(false);
    const buttonRef = useRef(null);
    const [showWarning, setShowWarning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidEmail) {
            navigate("/questionnaire");
        } else {
            setShowWarning(true);
        }
    };

    // Email validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    };

    // Handle email update and validation
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
        if (validateEmail(newEmail)) {
            setShowWarning(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-white">
            <h2 className="display-4 mb-6 font-bold text-center">
                Discover Your Potential for Non-Dilutive Fundraising
            </h2>
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center w-100 mt-5"
                style={{maxWidth: "400px"}}
            >
                <input
                    type="email"
                    placeholder="Type your email here"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-control mb-4"
                />
                <div className="relative w-full h-12">
                    <button
                        ref={buttonRef}
                        type="submit"
                        className="button px-5 py-2"
                    >
                        Go
                    </button>
                </div>
            </form>
            <p className="mt-4 h5">
                We use your email to extract your domain for tailored recommendations.
            </p>
            {showWarning && (
                <p className="mt-4 h6">
                    Please enter a valid email address to continue!
                </p>
            )}
        </div>
    );
}

export default Landing;
