import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance"; // Axios instance for API calls
import {jwtDecode} from "jwt-decode"; // Decode token to get user email
import "./JoinRequestsPage.css";

function JoinRequestsPage() {
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch join requests for the logged-in president's society
        const fetchJoinRequests = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("User is not authenticated.");
                }

                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub; // Extract user email from token

                const response = await axiosInstance.get(`/join-requests/${email}`);
                setJoinRequests(response.data);
            } catch (err) {
                setError("Could not fetch join requests.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinRequests();
    }, []);

    const handleApproval = async (requestId) => {
        try {
            await axiosInstance.put(`/join-requests/${requestId}`, null, {
                params: { action: "accept" },
            });
            setJoinRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === requestId ? { ...request, status: "accepted" } : request
                )
            );
        } catch (err) {
            console.error("Error approving request:", err);
            alert("Failed to approve the request.");
        }
    };

    const handleRejection = async (requestId) => {
        try {
            await axiosInstance.put(`/join-requests/${requestId}`, null, {
                params: { action: "reject" },
            });
            setJoinRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === requestId ? { ...request, status: "rejected" } : request
                )
            );
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("Failed to reject the request.");
        }
    };

    if (loading) return <div>Loading join requests...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="join-requests-page">
            <h1 className="page-header">Join Requests</h1>
            <div className="request-list">
                {joinRequests.length > 0 ? (
                    joinRequests.map((request) => (
                        <div key={request.id} className="request-card">
                            <h2 className="request-name">
                                {request.userName
                                    ? `${request.userName} ${request.userSurname}`
                                    : request.userEmail}
                            </h2>
                            <p><strong>Email:</strong> {request.userEmail}</p>
                            <p><strong>Request Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {request.status}</p>

                            <div className="action-buttons">
                                <button
                                    className="approve-btn"
                                    onClick={() => handleApproval(request.id)}
                                    disabled={request.status !== "pending"}
                                >
                                    Approve
                                </button>
                                <button
                                    className="reject-btn"
                                    onClick={() => handleRejection(request.id)}
                                    disabled={request.status !== "pending"}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No join requests available.</p>
                )}
            </div>
        </div>
    );
}

export default JoinRequestsPage;
