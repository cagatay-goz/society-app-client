import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";
import "./Society.css";
import { useParams } from "react-router-dom";

function SocietyPage() {
    const { id } = useParams(); // Get the society id from the URL
    const [society, setSociety] = useState(null); // State to store society data

    // Simulate fetching data from a database or API based on the society ID
    useEffect(() => {
        const societies = [
            {
                id: 1,
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
                    }
                ]
            },
            {
                id: 2,
                name: "Art Society",
                description: "Where creativity meets expression.",
                announcements: [
                    {
                        id: 1,
                        title: "Art Exhibit",
                        content: "Join us for the annual art exhibit on Dec 12th!",
                        poster: "https://via.placeholder.com/300x200?text=Art+Exhibit"
                    }
                ]
            },
            {
                id: 3,
                name: "Sports Club",
                description: "For those who love sports and fitness activities.",
                announcements: []
            },
            {
                id: 4,
                name: "Cycling Club",
                description: "For those who love cycling and nature.",
                announcements: []
            }
        ];

        // Find the society data by id
        const foundSociety = societies.find(society => society.id === parseInt(id));
        setSociety(foundSociety); // Set the state with the fetched society data
    }, [id]); // Run this effect when the id changes

    // If the society data hasn't been fetched yet, show loading
    if (!society) {
        return <div>Loading...</div>;
    }

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
