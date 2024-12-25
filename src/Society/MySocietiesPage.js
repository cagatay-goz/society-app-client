import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // To decode the JWT token
import axiosInstance from "../services/axiosInstance"; // Axios instance for fetching societies
import "./MySocietiesPage.css"; // Add your CSS styles here

function MySocietiesPage() {
    const navigate = useNavigate();
    const [societies, setSocieties] = useState([]); // Store societies user is enrolled in
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any errors

    useEffect(() => {
        const fetchUserSocieties = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/login"); // Redirect to login if no token
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub; // Extract user email from token

                // Fetch societies for the user
                const response = await axiosInstance.get(`/societies/user/${email}`);
                setSocieties(response.data);
            } catch (err) {
                console.error("Error fetching societies:", err);
                setError("Could not fetch societies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserSocieties();
    }, [navigate]);

    const handleViewSociety = (society) => {
        navigate(`/society/${society.id}`, { state: { society } });
    };

    if (loading) return <div>Loading your societies...</div>;
    if (error) return <div>{error}</div>;
    if (!loading && societies.length === 0) {
        return <div>You are not enrolled in any societies.</div>;
    }

    return (
        <div className="my-societies-page">
            <header className="my-societies-header">
                <h1>My Societies</h1>
            </header>
            <div className="societies-list">
                {societies.map((society) => (
                    <div key={society.id} className="society-card">
                        <h2>{society.name}</h2>
                        <p>{society.description || "No description available."}</p>
                        <button
                            className="view-society-button"
                            onClick={() => handleViewSociety(society)}
                        >
                            View Society
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MySocietiesPage;
