import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchAnnouncementsBySocietyId, fetchSocieties, deleteAnnouncementById } from "../services/api";
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

                // Reverse the announcements array to show the latest at the top
                setAnnouncements([...data].reverse());
            } catch (err) {
                setError("Could not fetch announcements.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [id]);

    const handleEditEvent = (eventId) => {
        navigate(`/society/${id}/edit-event/${eventId}`); // Redirect to the EditEvent page
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
        if (!confirmDelete) return;

        try {
            await deleteAnnouncementById(announcementId); // API çağrısı
            setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== announcementId)); // State'i güncelle
            alert("Announcement deleted successfully!");
        } catch (err) {
            alert("Failed to delete the announcement.");
        }
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
                <p>{society.description || "No description available."}</p>
            </header>
            <div className="announcements-section">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div key={announcement.id} className="announcement-container">
                            <AnnouncementCard
                                title={announcement.title}
                                content={announcement.content}
                                date={announcement.date}
                                location={announcement.location}
                                poster_url={announcement.posterUrl}
                            />
                            <div className="announcement-buttons">
                                <button
                                    className="edit-event-btn"
                                    onClick={() => handleEditEvent(announcement.id)}
                                >
                                    Edit Event
                                </button>
                                <button
                                    className="delete-event-btn"
                                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                                >
                                    Delete Announcement
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No announcements available.</p>
                )}
            </div>
        </div>
    );
}

export default SocietyPage;
