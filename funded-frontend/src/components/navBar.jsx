import React from "react";
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-4">
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/">FUNDED</Link>
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
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/identify">Identify</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/apply">Apply</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/manage">Manage</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;