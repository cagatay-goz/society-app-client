import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SocietyCard from "./SocietyCard";
import { fetchSocieties } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

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
                    <Link
                        to={{
                            pathname: `/society/${society.id}`,
                            state: { society }, // Send society information with state
                        }}
                        key={society.id}
                    >
                        <SocietyCard
                            id={society.id}
                            name={society.name}
                            description={society.description}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
