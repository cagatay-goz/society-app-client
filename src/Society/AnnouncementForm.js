import React, { useState } from "react";
import { createAnnouncement } from "../services/api";
import "./AnnouncementForm.css";

function AnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        SocietyId: "",
        title: "",
        content: "",
        date: "",
        location: "",
    });
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(
        "https://cng495awsbucket.s3.eu-central-1.amazonaws.com/erayFoto.jpeg"
    ); // Default URL is set

    const handleChange = (e) => {
        setAnnouncement({
            ...announcement,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("SocietyId", announcement.SocietyId);
        formData.append("title", announcement.title);
        formData.append("content", announcement.content);
        formData.append("date", announcement.date);
        formData.append("location", announcement.location);
        if (file) {
            formData.append("file", file);
        }

        try {
            const data = await createAnnouncement(formData);
            console.log("Announcement created successfully:", data);
            alert("Announcement posted successfully!");

            // Set the AWS S3 URL
            if (data.posterUrl) {
                setImageUrl(data.posterUrl);
            }
        } catch (error) {
            alert("Failed to post the announcement.");
        }
    };

    return (
        <div className="announcement-form">
            <h2>Post New Announcement</h2>
            <form onSubmit={handleSubmit}>
                <label>Society ID</label>
                <input
                    type="text"
                    name="SocietyId"
                    value={announcement.SocietyId}
                    onChange={handleChange}
                    placeholder="Enter society ID"
                />
                <label>Event Name</label>
                <input
                    type="text"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                    placeholder="Enter event name"
                />
                <label>Poster Image</label>
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
                <label>Description</label>
                <textarea
                    name="content"
                    value={announcement.content}
                    onChange={handleChange}
                    placeholder="Enter event description"
                ></textarea>
                <label>Event Date</label>
                <input
                    type="date"
                    name="date"
                    value={announcement.date}
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
                <button type="submit">Save</button>
            </form>

            {/* Image tag to display the uploaded image */}
            {imageUrl && (
                <div className="uploaded-image">
                    <h3>Uploaded Poster:</h3>
                    <img
                        src={imageUrl}
                        alt="Uploaded Poster"
                        style={{ maxWidth: "100%", marginTop: "20px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default AnnouncementForm;
