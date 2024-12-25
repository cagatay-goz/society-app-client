import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocietyCard from "./SocietyCard";
import { fetchSocieties } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch societies if token is valid
        const getSocieties = async () => {
            try {
                const data = await fetchSocieties();
                setSocieties(data.reverse()); // Reverse the list
            } catch (err) {
                setError("Societies could not be fetched.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getSocieties();
    }, [navigate]);

    if (loading) return <div>Loading societies...</div>;
    if (error) return <div>{error}</div>;
    if (!loading && societies.length === 0) {
        return <div>No societies found.</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h1 className="dashboard-header">METU NCC Societies</h1>
            </div>
            <div className="society-grid">
                {societies.map((society) => (
                    <div>
                        <SocietyCard
                            id={society.id}
                            name={society.name}
                            description={society.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
