import React, { useState } from "react";
import "./AdminPage.css";

function AdminPage() {
    // Sample event data
    const [eventRequests, setEventRequests] = useState([
        {
            id: 1,
            societyName: "Coding Club",
            eventName: "Tech Talk",
            eventDate: "2024-12-25",
            eventTime: "14:00",
            location: "Amphitheater, CCC",
            status: "Pending",
        },
        {
            id: 2,
            societyName: "Art Society",
            eventName: "Art Exhibition",
            eventDate: "2024-12-30",
            eventTime: "16:00",
            location: "Seminar Hall, CCC",
            status: "Pending",
        },
    ]);

    const handleApproval = (eventId) => {
        setEventRequests((prevRequests) =>
            prevRequests.map((event) =>
                event.id === eventId ? { ...event, status: "Approved" } : event
            )
        );
    };

    const handleRejection = (eventId) => {
        setEventRequests((prevRequests) =>
            prevRequests.map((event) =>
                event.id === eventId ? { ...event, status: "Rejected" } : event
            )
        );
    };

    return (
        <div className="admin-page">
            <h1 className="admin-header">Event Booking Requests</h1>
            <div className="event-list">
                {eventRequests.map((event) => (
                    <div key={event.id} className="event-card">
                        <h2 className="event-name">{event.eventName}</h2>
                        <p><strong>Society:</strong> {event.societyName}</p>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Time:</strong> {event.eventTime}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Status:</strong> {event.status}</p>

                        <div className="action-buttons">
                            <button
                                className="approve-btn"
                                onClick={() => handleApproval(event.id)}
                                disabled={event.status === "Approved"}
                            >
                                Approve
                            </button>
                            <button
                                className="reject-btn"
                                onClick={() => handleRejection(event.id)}
                                disabled={event.status === "Rejected"}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
