import React, { useState } from "react";
import "./AnnouncementForm.css";

function AnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        location: "",
        poster: "",
    });

    const handleChange = (e) => {
        setAnnouncement({
            ...announcement,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("AnnouncementCard posted:", announcement);
        // continue: send data to backend to store it in database
    };

    return (
        <div className="announcement-form">
            <h2>Post New Announcement</h2>
            <form onSubmit={handleSubmit}>
                <label>Event Name</label>
                <input
                    type="text"
                    name="eventName"
                    value={announcement.eventName}
                    onChange={handleChange}
                    placeholder="Enter event name"
                />
                <label>Description</label>
                <textarea
                    name="description"
                    value={announcement.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                ></textarea>
                <label>Event Date</label>
                <input
                    type="date"
                    name="eventDate"
                    value={announcement.eventDate}
                    onChange={handleChange}
                />
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={announcement.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                />
                <label>Poster Image URL</label>
                <input
                    type="text"
                    name="poster"
                    value={announcement.poster}
                    onChange={handleChange}
                    placeholder="Enter image URL for the poster"
                />
                <button type="submit">Post Announcement</button>
            </form>
        </div>
    );
}

export default AnnouncementForm;
