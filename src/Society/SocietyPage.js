import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchAnnouncementsBySocietyId, fetchSocieties } from "../services/api";
import AnnouncementCard from "./AnnouncementCard";
import "./Society.css";

function SocietyPage() {
    const { id } = useParams(); // Get the society ID from the URL
    const { state } = useLocation(); // State passed from the Dashboard
    const [society, setSociety] = useState(state?.society || null); // Use the state if available, or set to null
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!society) {
        return <div>Error: Society information is not available. Please go back to the dashboard.</div>;
    }

    return (
        <div className="society-page">
            <header className="society-header">
                <h1>{society.name}</h1>
                <p>{society.description || "No description available."}</p>
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
