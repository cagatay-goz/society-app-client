import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAnnouncementById, updateAnnouncement } from "../services/api";
import "./Society.css";

function EditEvent() {
    const { id, eventId } = useParams(); // Society and event IDs
    const navigate = useNavigate(); // Navigate to another page
    const [event, setEvent] = useState(null); // Event data
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: "",
        location: "",
        posterFile: null, // Holds the new poster file
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch announcement details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const data = await fetchAnnouncementById(eventId);
                setEvent(data);
                setFormData({
                    title: data.title,
                    content: data.content,
                    date: data.date,
                    location: data.location,
                    posterFile: null, // Default to null
                });
            } catch (err) {
                setError("Could not fetch the announcement details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            posterFile: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadData = new FormData();

        // Add form data to FormData
        uploadData.append("title", formData.title);
        uploadData.append("content", formData.content);
        uploadData.append("date", formData.date);
        uploadData.append("location", formData.location);

        if (formData.posterFile) {
            uploadData.append("file", formData.posterFile);
        }

        try {
            await updateAnnouncement(eventId, uploadData); // Call API to update announcement
            alert("Changes submitted successfully!");

            // Navigate back to the society's page
            navigate(`/society/${id}`);
        } catch (err) {
            console.error("Error updating announcement:", err);
            alert("An error occurred while updating the announcement.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-event-container">
            <div className="event-preview">
                <h2>Preview Event</h2>
                <p><strong>Title:</strong> {event.title}</p>
                <p><strong>Content:</strong> {event.content}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <img
                    src={event.posterUrl}
                    alt="Event Poster"
                    style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
                />
            </div>

            <div className="event-edit-form">
                <h2>Edit Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="posterFile">Select New Poster</label>
                        <input
                            type="file"
                            id="posterFile"
                            name="posterFile"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditEvent;
