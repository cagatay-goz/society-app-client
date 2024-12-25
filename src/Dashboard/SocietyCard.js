import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance"; // Axios instance for API calls
import "./Dashboard.css";

function SocietyCard({ id, name, description }) {
    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(false); // Track if the user is a member of this society
    const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
    const [isPresident, setIsPresident] = useState(false); // Track if the user is the president of this society

    useEffect(() => {
        const checkMembershipAndRole = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                return; // User is not logged in
            }

            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const email = decodedToken.sub; // Extract email from token
                const roles = decodedToken.roles || [];

                // Check if the user has the ROLE_ADMIN
                setIsAdmin(roles.includes("ROLE_ADMIN"));

                // Fetch societies the user has joined
                const response = await axiosInstance.get(`/societies/user/${email}`);
                const joinedSocieties = response.data;

                // Check if the user is a member of this society
                const isUserMember = joinedSocieties.some((society) => society.id === id);
                setIsMember(isUserMember);

                // Check if the user is the president of this society
                const presidentResponse = await axiosInstance.get("/api/my-society", {
                    params: { email },
                });
                const presidentSocietyId = presidentResponse.data;
                setIsPresident(presidentSocietyId === id);
            } catch (err) {
                console.error("Error checking membership or role:", err);
            }
        };

        checkMembershipAndRole();
    }, [id]);

    const handleJoin = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const email = decodedToken.sub; // Extract email from token

            // Send request as query parameters
            await axiosInstance.post("/join-requests", null, {
                params: { email, societyId: id },
            });

            alert("Join request sent successfully!");
        } catch (err) {
            console.error("Error sending join request:", err);
            alert("Failed to send join request.");
        }
    };

    const handleVisit = () => {
        navigate(`/society/${id}`, { state: { society: { id, name, description } } });
    };

    return (
        <div className="society-card">
            <h2>{name}</h2>
            <p>{description}</p>
            {isMember || isAdmin || isPresident ? (
                <button className="view-button" onClick={handleVisit}>
                    View
                </button>
            ) : (
                <button className="join-button" onClick={handleJoin}>
                    Join
                </button>
            )}
        </div>
    );
}

export default SocietyCard;
