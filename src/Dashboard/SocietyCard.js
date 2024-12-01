import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function SocietyCard({ id, name, description }) {
    return (
        <div className="society-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <Link to={`/society/${id}`}>
                <button className="visit-button">Visit</button>
            </Link>
        </div>
    );
}

export default SocietyCard;
