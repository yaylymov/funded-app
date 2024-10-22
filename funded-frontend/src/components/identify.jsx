import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Identify() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/grants");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching grants:", error);
            }
        };

        fetchData().then(_ => {
        });
    }, []);

    const formatGrantVolume = (volume) => {
        return parseInt(volume).toLocaleString("de-DE") + ' €';
    };

    const formatBenefitCostScore = (score) => {
        const numScore = parseFloat(score);
        return numScore < 0 ? "Low" : numScore <= 5 ? "Medium" : "High";
    };

    return (
        <div className="main-content container vh-100 py-5 text-white">
            <h2 className="display-5 mb-4 font-bold text-center">Available Non-Dilutive Fundraising Options</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Go Back</button>
            {data.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-dark table-striped table-bordered shadow-lg rounded">
                        <thead className="thead-light">
                        <tr>
                            <th>Funding Option</th>
                            <th>Grant Volume</th>
                            <th>Funding Quota</th>
                            <th>Approval Rate</th>
                            <th>Time Required</th>
                            <th>Benefit-Cost Score</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((grant, index) => (
                            <tr key={index} className="shadow-sm">
                                <td>{grant.funding_option}</td>
                                <td>{formatGrantVolume(grant.grant_volume)} €</td>
                                <td>{grant.funding_quota} %</td>
                                <td>{grant.approval_rate} %</td>
                                <td>{grant.time_required} months</td>
                                <td>{formatBenefitCostScore(grant.benefit_cost_score)}</td>
                                <td>
                                    <button className="button button-hover">Add to My List</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center h5">No grants available at the moment.</p>
            )}
        </div>
    );
}

export default Identify;
