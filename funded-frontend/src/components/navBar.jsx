import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
            <div className="container-fluid">
                <Link className="navbar-brand text-orange-500" to="/">FUNDED</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link hover:text-orange-500" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link hover:text-orange-500" to="/identify">Identify</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link hover:text-orange-500" to="/apply">Apply</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link hover:text-orange-500" to="/manage">Manage</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
