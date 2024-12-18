import React from "react";
import "./Society.css";

function AnnouncementCard({ eventName, description, eventDate, location, poster }) {
    return (
        <div className="announcement-card">
            <div className="announcement-poster">
                <img src={poster} alt={eventName} />
            </div>
            <h3>{eventName}</h3>
            <p>{description}</p>
            <p><strong>Date:</strong> {eventDate}</p>
            <p><strong>Location:</strong> {location}</p>
        </div>
    );
}

export default AnnouncementCard;
