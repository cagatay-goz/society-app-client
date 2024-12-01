import React from "react";
import Announcement from "./Announcement";
import "./Society.css";

function SocietyPage() {
    const society = {
        name: "Coding Club",
        description: "A community for coding enthusiasts to share and grow.",
        announcements: [
            {
                id: 1,
                title: "Hackathon 2024",
                content: "Join us for the annual hackathon on Jan 15th!",
                poster: "https://via.placeholder.com/300x200?text=Hackathon+Poster"

            },
            {
                id: 2,
                title: "Weekly Meetup",
                content: "Next meetup is on Friday, Dec 8th.",
                poster: "https://via.placeholder.com/300x200?text=Meetup+Poster"
            },
            {
                id: 3,
                title: "Project Presentation",
                content: "Join us for the next project presentation on Dec 20th.",
                poster: "https://via.placeholder.com/300x200?text=Presentation+Poster"
            },
        ],
    };

    return (
        <div className="society-page">
            <header className="society-header">
                <h1>{society.name}</h1>
                <p>{society.description}</p>
            </header>
            <div className="announcements-section">
                <h2>Announcements</h2>
                <div className="announcements-container">
                    {society.announcements.map((announcement) => (
                        <Announcement
                            key={announcement.id}
                            title={announcement.title}
                            content={announcement.content}
                            poster={announcement.poster}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SocietyPage;
