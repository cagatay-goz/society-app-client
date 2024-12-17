import React from "react";
import "./Society.css";

function EventCard({ event, onApprove, onReject }) {
    return (
        <div className={`event-card ${event.status}`}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p>{event.description}</p>
            <p><strong>Status:</strong> {event.status}</p>

            {event.status === "pending" && (
                <div className="event-actions">
                    <button className="approve-btn" onClick={onApprove}>Approve</button>
                    <button className="reject-btn" onClick={onReject}>Reject</button>
                </div>
            )}
        </div>
    );
}

export default EventCard;
