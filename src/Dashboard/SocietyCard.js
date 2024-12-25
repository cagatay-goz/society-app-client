import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function SocietyCard({ id, name, description }) {
    const navigate = useNavigate();

    const handleVisit = () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login"); 
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const isTokenExpired = payload.exp * 1000 < Date.now();
            if (isTokenExpired) {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("authToken");
                navigate("/login");
                return;
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("authToken");
            navigate("/login");
            return;
        }

        // Navigate to society page with state
        navigate(`/society/${id}`, { state: { society: { id, name, description } } });
    };

    return (
        <div className="society-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <button className="visit-button" onClick={handleVisit}>
                Visit
            </button>
        </div>
    );
}

export default SocietyCard;
