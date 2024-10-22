import React, {useEffect, useState} from "react";
import axios from "axios";

function Identify() {
    const [data, setData] = useState([]);

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

    return (
        <div className="container vh-100 py-5 text-white">
            <h2 className="display-5 mb-4 font-bold text-center">Available Non-Dilutive Fundraising Options</h2>
            {data.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {data.map((grant, index) => (
                        <div key={index} className="col">
                            <div className="card bg-dark text-white border-warning">
                                <div className="card-body">
                                    <h5 className="card-title text-warning">{grant.funding_option}</h5>
                                    <p className="card-text">State: {grant.state}</p>
                                    <p className="card-text">Grant Volume: {grant.grant_volume} €</p>
                                    <p className="card-text">Funding Quota: {grant.funding_quota} %</p>
                                    <p className="card-text">Approval Rate: {grant.approval_rate} %</p>
                                    <p className="card-text">Company Size: {grant.company_size}</p>
                                    <p className="card-text">Areas: {grant.areas}</p>
                                    <button className="btn btn-warning mt-2">Add to My List</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center h5">No grants available at the moment.</p>
            )}
        </div>
    );
}

export default Identify;