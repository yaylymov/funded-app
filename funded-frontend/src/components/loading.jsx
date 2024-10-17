import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/results");
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
            <div className="text-center">
                <h2 className="display-4 mb-4">Processing...</h2>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loading;
