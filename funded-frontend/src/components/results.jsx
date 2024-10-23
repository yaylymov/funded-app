import React from "react";
import {useLocation} from "react-router-dom";// Assuming you add this new CSS file

function Results() {
    const location = useLocation();
    const data = location.state?.data || [];

    const formatGrantVolume = (volume) => {
        return parseInt(volume).toLocaleString("de-DE") + ' €';
    };

    const formatBenefitCostScore = (score) => {
        const numScore = parseFloat(score);
        return numScore < 0 ? "Low" : numScore <= 5 ? "Medium" : "High";
    };

    return (
        <div className="main-content container py-5 text-white">
            <h2 className="display-5 mb-4 font-bold text-center">Your Non-Dilutive Fundraising Options</h2>
            {data.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {data.map((grant, index) => (
                        <div key={index} className="col d-flex align-items-stretch">
                            <div className="card grant-card h-100 text-center">
                                <div className="card-body">
                                    <h5 className="card-title">{grant.funding_option}</h5>
                                    <p className="card-text"><strong>Grant
                                        Volume:</strong> {formatGrantVolume(grant.grant_volume)}</p>
                                    <p className="card-text"><strong>Funding Quota:</strong> {grant.funding_quota} %</p>
                                    <p className="card-text"><strong>Time
                                        Required:</strong> {grant.time_required} months</p>
                                    <p className="card-text"><strong>Benefit-Cost
                                        Score:</strong> {formatBenefitCostScore(grant.benefit_cost_score)}</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-primary2">Add to My List</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center h5">No grants available based on your criteria.</p>
            )}
        </div>
    );
}

export default Results;
