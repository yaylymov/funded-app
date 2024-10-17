import React from "react";
import {useLocation} from "react-router-dom";

function Results() {
    const location = useLocation();
    const data = location.state?.data || [];

    return (
        <div className="container vh-100 py-5 text-white">
            <h2 className="display-5 mb-4 font-bold text-center">Your Non-Dilutive Fundraising Options</h2>
            {data.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {data.map((grant, index) => (
                        <div key={index} className="col">
                            <div className="card bg-dark text-white border-warning">
                                <div className="card-body">
                                    <h5 className="card-title text-warning">{grant.funding_option}</h5>
                                    <p className="card-text">Grant Volume: {grant.grant_volume} €</p>
                                    <p className="card-text">Funding Quota: {grant.funding_quota} %</p>
                                    <p className="card-text">Approval Rate: {grant.approval_rate} %</p>
                                    <button className="btn btn-warning mt-2">Add to My List</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted text-center">No grants available based on your criteria.</p>
            )}
        </div>
    );
}

export default Results;
