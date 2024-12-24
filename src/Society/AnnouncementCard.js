import React from "react";

function AnnouncementCard({ title, content, date, location, poster_url }) {
    return (
        <div className="announcement-card">
            <h3>{title}</h3>
            <p>{content}</p>
            <p>
                <strong>Date:</strong>{" "}
                {date ? new Date(date).toLocaleDateString() : "No date provided"}
            </p>
            <p>
                <strong>Location:</strong> {location || "No location provided"}
            </p>
            {poster_url && (
                <img
                    src={poster_url}
                    alt={title}
                    style={{ width: "200px", height: "auto", marginTop: "10px" }}
                />
            )}
        </div>
    );
}

export default AnnouncementCard;
