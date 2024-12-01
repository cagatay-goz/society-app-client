import React from "react";
import SocietyCard from "./SocietyCard";
import "./Dashboard.css";

function Dashboard() {
    /*Example Societies -To be changed- */
    const societies = [
        {
            id: 1,
            name: "Coding Club",
            description: "A community for coding enthusiasts to share and grow.",
        },
        {
            id: 2,
            name: "Art Society",
            description: "Where creativity meets expression.",
        },
        {
            id: 3,
            name: "Sports Club",
            description: "For those who love sports and fitness activities.",
        },
        {
            id: 4,
            name: "Cycling Club",
            description: "For those who love cycling and nature.",
        },
    ];

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h1 className="dashboard-header">METU NCC Societies</h1>
            </div>
            <div className="society-grid">
                {societies.map((society) => (
                    <SocietyCard
                        key={society.id}
                        name={society.name}
                        description={society.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
