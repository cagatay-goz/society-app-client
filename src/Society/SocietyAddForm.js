import React, { useState } from "react";
import axiosInstance from "../services/axiosInstance"; // Import your configured axios instance

function SocietyAddForm() {
    const [formData, setFormData] = useState({
        societyName: "",
        description: "",
        presidentEmail: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccessMessage(""); // Reset success message

        const societyData = {
            name: formData.societyName,
            description: formData.description,
            presidentEmail: formData.presidentEmail,
        };

        try {
            const response = await axiosInstance.post("/societies/add", societyData);
            const createdSociety = response.data;
            setSuccessMessage(`Society "${createdSociety.name}" added successfully!`);
            setFormData({ societyName: "", description: "", presidentEmail: "" }); // Reset form
        } catch (error) {
            setError(error.response?.data || "An error occurred while creating the society.");
        }
    };

    return (
        <div className="society-add-form">
            <h2>Add a New Society</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label>Society Name</label>
                <input
                    type="text"
                    name="societyName"
                    value={formData.societyName}
                    onChange={handleChange}
                    placeholder="Enter society name"
                    required
                />
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter society description"
                    required
                ></textarea>
                <label>President Email</label>
                <input
                    type="email"
                    name="presidentEmail"
                    value={formData.presidentEmail}
                    onChange={handleChange}
                    placeholder="Enter president email"
                    required
                />
                <button type="submit">Add Society</button>
            </form>
        </div>
    );
}

export default SocietyAddForm;
