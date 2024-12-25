import React, { useState } from "react";
import { createAnnouncement } from "../services/api";
import "./AnnouncementForm.css";

function AnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        societyId: "", // Fixed naming for consistency
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
        const { name, value } = e.target;
        setAnnouncement((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Handling single file upload
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("societyId", announcement.societyId); // Ensure backend matches 'societyId'
        formData.append("title", announcement.title);
        formData.append("content", announcement.content);
        formData.append("date", announcement.date);
        formData.append("location", announcement.location);
        if (file) {
            formData.append("file", file); // Append file if provided
        }

        try {
            const data = await createAnnouncement(formData);
            console.log("Announcement created successfully:", data);
            alert("Announcement posted successfully!");

            // Update the image URL if the backend provides it
            if (data.posterUrl) {
                setImageUrl(data.posterUrl);
            }
        } catch (error) {
            console.error("Error posting announcement:", error);
            alert("Failed to post the announcement.");
        }
    };

    return (
        <div className="announcement-form">
            <h2>Post New Announcement</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="societyId">Society ID</label>
                <input
                    type="text"
                    id="societyId"
                    name="societyId"
                    value={announcement.societyId}
                    onChange={handleChange}
                    placeholder="Enter society ID"
                    required
                />
                <label htmlFor="title">Event Name</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                    placeholder="Enter event name"
                    required
                />
                <label htmlFor="file">Poster Image</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <label htmlFor="content">Description</label>
                <textarea
                    id="content"
                    name="content"
                    value={announcement.content}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    rows="5"
                    required
                ></textarea>
                <label htmlFor="date">Event Date</label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={announcement.date}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={announcement.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    required
                />
                <button type="submit">Save</button>
            </form>

            {/* Display uploaded image */}
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
