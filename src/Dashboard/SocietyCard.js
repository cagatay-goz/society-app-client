import React from "react";
import "./Dashboard.css";

function SocietyCard({ name, description }) {
    return (
        <div className="society-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <button className="visit-button">Visit Society</button>
        </div>
    );
}

export default SocietyCard;
