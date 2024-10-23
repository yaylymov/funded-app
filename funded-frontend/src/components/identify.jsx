import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {FaSortAmountUp, FaUndo} from "react-icons/fa";


function Identify() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/grants");
                setData(response.data);
                setFilteredData(response.data);
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

    const handleSortChange = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
    };

    const handleResetSorting = () => {
        setSortCriteria(null);
        setSortOrder("asc");
        setFilteredData(data);
    };

    useEffect(() => {
        let sortedData = [...filteredData];
        if (sortCriteria) {
            sortedData.sort((a, b) => {
                let valueA, valueB;

                if (sortCriteria === "Grant Volume") {
                    valueA = parseInt(a.grant_volume);
                    valueB = parseInt(b.grant_volume);
                } else if (sortCriteria === "Funding Quota") {
                    valueA = parseInt(a.funding_quota);
                    valueB = parseInt(b.funding_quota);
                } else if (sortCriteria === "Time Required") {
                    valueA = parseInt(a.time_required);
                    valueB = parseInt(b.time_required);
                } else if (sortCriteria === "Benefit-Cost Score") {
                    const order = {"Low": 1, "Medium": 2, "High": 3};
                    valueA = order[formatBenefitCostScore(a.benefit_cost_score)];
                    valueB = order[formatBenefitCostScore(b.benefit_cost_score)];
                }

                if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
                if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        setFilteredData(sortedData);
    }, [sortCriteria, sortOrder, data]);

    return (
        <div className="main-content container vh-100 py-5 text-white">
            <h2 className="display-5 mb-4 font-bold text-center">All Available Non-Dilutive Fundraising Options</h2>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btn btn-secondary mb-2" onClick={() => navigate(-1)}>Go Back</button>
                <DropdownButton id="dropdown-basic-button" title={<span><FaSortAmountUp/> Sort</span>}
                                className="mb-2 cool-dropdown" variant="primary">
                    <Dropdown.Item onClick={() => handleSortChange("Grant Volume")}>Grant Volume</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("Funding Quota")}>Funding Quota</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("Time Required")}>Time Required</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange("Benefit-Cost Score")}>Benefit-Cost
                        Score</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={handleResetSorting}><FaUndo/> Reset Sorting</Dropdown.Item>
                </DropdownButton>
            </div>

            {filteredData.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-dark table-striped shadow-lg rounded">
                        <thead className="thead-light custom-table-header">
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
                        {filteredData.map((grant, index) => (
                            <tr key={index} className="shadow-sm">
                                <td>{grant.funding_option}</td>
                                <td>{formatGrantVolume(grant.grant_volume)}</td>
                                <td>{grant.funding_quota} %</td>
                                <td>{grant.approval_rate} %</td>
                                <td>{grant.time_required} months</td>
                                <td>{formatBenefitCostScore(grant.benefit_cost_score)}</td>
                                <td>
                                    <button className="button-list">Add to My List</button>
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
