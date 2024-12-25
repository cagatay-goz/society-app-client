import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // To decode the JWT token
import { fetchAnnouncementsBySocietyId, fetchSocieties } from "../services/api";
import axiosInstance from "../services/axiosInstance"; // Axios instance for fetching society ID
import AnnouncementCard from "./AnnouncementCard";
import "./Society.css";

function SocietyPage() {
    const { id } = useParams(); // Get the society ID from the URL
    const { state } = useLocation(); // State passed from the Dashboard
    const navigate = useNavigate();
    const [society, setSociety] = useState(state?.society || null); // Use the state if available, or set to null
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPresident, setIsPresident] = useState(false); // Track if the user is a president
    const [presidentSocietyId, setPresidentSocietyId] = useState(null); // Store president's society ID

    // Check user's role and fetch their society ID if they are a president
    useEffect(() => {
        const fetchPresidentSocietyId = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const roles = decodedToken.roles || [];
                    setIsPresident(roles.includes("ROLE_PRESIDENT"));

                    // Fetch the president's society ID
                    if (roles.includes("ROLE_PRESIDENT")) {
                        const email = decodedToken.sub; // Extract email from token
                        const response = await axiosInstance.get("/api/my-society", {
                            params: { email },
                        });
                        setPresidentSocietyId(response.data);
                    }
                } catch (err) {
                    console.error("Invalid token or error fetching society ID:", err);
                    localStorage.removeItem("authToken"); // Clear invalid token
                    navigate("/login"); // Redirect to login if the token is invalid
                }
            }
        };

        fetchPresidentSocietyId();
    }, [navigate]);

    // Fetch society information from the API if state is not available
    useEffect(() => {
        const fetchSocietyIfNeeded = async () => {
            if (!society) {
                try {
                    const societies = await fetchSocieties(); // Fetch all societies
                    const matchedSociety = societies.find((s) => s.id === parseInt(id));
                    if (matchedSociety) {
                        setSociety(matchedSociety);
                    } else {
                        setError("Society not found.");
                    }
                } catch (err) {
                    setError("Could not fetch society information.");
                }
            }
        };

        fetchSocietyIfNeeded();
    }, [id, society]);

    // Fetch announcements for the society
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await fetchAnnouncementsBySocietyId(id);
                setAnnouncements(data);
            } catch (err) {
                setError("Could not fetch announcements.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [id]);

    const handleAddAnnouncement = () => {
        navigate(`/announcementForm`);
    };

    const handleReserveRoom = () => {
        navigate("/bookingForm"); // Navigate to a hypothetical reserve room page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!society) {
        return <div>Error: Society information is not available. Please go back to the dashboard.</div>;
    }

    return (
        <div className="society-page">
            <header className="society-header">
                <h1>{society.name}</h1>
                <p style={{ color: "white" }}>{society.description || "No description available."}</p>
                {isPresident && presidentSocietyId === parseInt(id) && (
                    <div>
                        <button className="add-announcement-button" onClick={handleAddAnnouncement}>
                            Add Announcement
                        </button>
                        <button className="reserve-room-button" onClick={handleReserveRoom}>
                            Reserve Room
                        </button>
                    </div>
                )}
            </header>
            <div className="announcements-section">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            title={announcement.title}
                            content={announcement.content}
                            date={announcement.date}
                            location={announcement.location}
                            poster_url={announcement.posterUrl}
                        />
                    ))
                ) : (
                    <p>No announcements available.</p>
                )}
            </div>
        </div>
    );
}

export default SocietyPage;
