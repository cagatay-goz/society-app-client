import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";
import "./Society.css";
import { Link, useParams } from "react-router-dom";

function SocietyPage() {
    const { id } = useParams(); // get the society id from the URL
    const [society, setSociety] = useState(null);

    // edit: fetch data from database
    useEffect(() => {
        const societies = [
            {
                id: 1,
                name: "Coding Club",
                description: "A community for coding enthusiasts to share and grow.",
                announcements: [
                    {
                        id: 1,
                        eventName: "Hackathon 2024",
                        description: "Join us for the annual hackathon on Jan 15th!",
                        eventDate: "2024-01-15",
                        location: "Main Auditorium",
                        poster: "https://via.placeholder.com/300x200?text=Hackathon+Poster"
                    },
                    {
                        id: 2,
                        eventName: "Weekly Meetup",
                        description: "Next meetup is on Friday, Dec 8th.",
                        eventDate: "2023-12-08",
                        location: "Room 202",
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
                        eventName: "Art Exhibit",
                        description: "Join us for the annual art exhibit on Dec 12th!",
                        eventDate: "2023-12-12",
                        location: "Gallery 5",
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

        // Find society data by id
        const foundSociety = societies.find(society => society.id === parseInt(id));
        setSociety(foundSociety);
    }, [id]);

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
                    {society.announcements.length > 0 ? (
                        society.announcements.map((announcement) => (
                            <div key={announcement.id} className="announcement-item">
                                <Announcement
                                    eventName={announcement.eventName}
                                    description={announcement.description}
                                    eventDate={announcement.eventDate}
                                    location={announcement.location}
                                    poster={announcement.poster}
                                />
                                {/* Link for society president to edit event */}
                                <Link to={`/society/${id}/edit-event/${announcement.id}`} className="edit-event-link">
                                    Edit Event
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No announcements available. Please add some events.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SocietyPage;
