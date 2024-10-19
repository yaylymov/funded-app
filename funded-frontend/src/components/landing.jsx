import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Landing() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            navigate("/questionnaire");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white">
            <h2 className="display-4 mb-6 font-bold text-center hoverable-text">Discover Your Potential for Non-Dilutive
                Fundraising</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100"
                  style={{maxWidth: "400px"}}>
                <input
                    type="email"
                    placeholder="Type your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mb-3"
                />
                <button
                    type="submit"
                    className="btn btn-warning text-white px-5 py-2 hoverable-text"
                >
                    Go
                </button>
            </form>
            <p className="text-muted mt-4 hoverable-text">We use your email to extract your domain for tailored
                recommendations.</p>
        </div>
    );
}

export default Landing;