import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm() {
    const [formData, setFormData] = useState({
        societyName: "",
        eventName: "",
        eventDate: "",
        eventTime: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking request submitted:", formData);
        // continue:  send the request to the admin
    };

    return (
        <div className="booking-form">
            <h2>Request Room Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>Society Name</label>
                <input
                    type="text"
                    name="societyName"
                    value={formData.societyName}
                    onChange={handleChange}
                />
                <label>Event Name</label>
                <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                />
                <label>Event Date</label>
                <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                />
                <label>Event Time</label>
                <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                />
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
}

export default BookingForm;
