import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Society.css";

function EditEvent() {
    const { id, eventId } = useParams(); // Get society id and event id
    const navigate = useNavigate();
    const [event, setEvent] = useState(null); // state for event data
    const [formData, setFormData] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        location: "",
    });

    // Sample event data fetching
    useEffect(() => {
        const societies = [
            {
                id: 1,
                name: "Coding Club",
                announcements: [
                    {
                        id: 1,
                        eventName: "Hackathon 2024",
                        description: "Join us for the annual hackathon on Jan 15th!",
                        eventDate: "2024-01-15",
                        location: "Main Auditorium",
                    },
                    {
                        id: 2,
                        eventName: "Weekly Meetup",
                        description: "Next meetup is on Friday, Dec 8th.",
                        eventDate: "2023-12-08",
                        location: "Room 202",
                    },
                ],
            },
        ];

        // find the society and event by their id
        const society = societies.find((s) => s.id === parseInt(id));
        const event = society?.announcements.find((e) => e.id === parseInt(eventId));

        if (event) {
            setEvent(event);
            setFormData({
                eventName: event.eventName,
                description: event.description,
                eventDate: event.eventDate,
                location: event.location,
            });
        }
    }, [id, eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // edit: Update event in database
        console.log("Updated event data:", formData);

        // go back to society page
        navigate(`/society/${id}`);
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-event-page">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
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

                <button type="submit" className="submit-btn">Update Event</button>
            </form>
        </div>
    );
}

export default EditEvent;
