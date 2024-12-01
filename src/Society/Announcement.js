import React from "react";
import "./Society.css";

function Announcement({ title, content, poster }) {
    return (
        <div className="announcement-card">
            <div className="announcement-poster">
                <img src={poster} alt={title} />
            </div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Announcement;
