import React from "react";
import {HardHat, Construction} from 'lucide-react';

function Apply() {
    return (
        <div
            className="vh-100 d-flex flex-column align-items-center justify-content-center text-white under-construction-container">
            <div className="crane-container">
                <div className="crane">
                    <div className="hook"></div>
                    <div className="moving-line"></div>
                </div>
            </div>
            <h2 className="display-4 mb-1 mt-4 font-bold text-center">
                <HardHat className="m-3"/>
                This page is under construction
                <Construction className="m-3"/>
            </h2>
            <p className="h5 text-center">Please check back later for updates.</p>
        </div>
    );
}

export default Apply;
