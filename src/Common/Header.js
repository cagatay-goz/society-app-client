import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use React Router for navigation
import {jwtDecode} from 'jwt-decode'; // To decode the token
import axiosInstance from '../services/axiosInstance'; // Axios instance
import './Common.css';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const [societyId, setSocietyId] = useState(null); // State to store the society ID
    let userRole = null;
    let userEmail = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userEmail = decodedToken.sub;
            const roles = decodedToken.roles || []; // Extract roles array
            // Define role hierarchy
            const roleHierarchy = ['ROLE_ADMIN', 'ROLE_PRESIDENT', 'ROLE_USER'];
            // Find the highest-priority role
            userRole = roles.sort((a, b) => roleHierarchy.indexOf(a) - roleHierarchy.indexOf(b))[0];
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('authToken'); // Clear invalid token
            navigate('/login'); // Redirect to login if the token is invalid
        }
    }

    useEffect(() => {
        const fetchSocietyId = async () => {
            if (userRole === 'ROLE_PRESIDENT') {
                try {
                    const response = await axiosInstance.get(`/api/my-society`, {
                        params: { email: userEmail },
                    });
                    setSocietyId(response.data); // Store the society ID
                } catch (error) {
                    console.error("Error fetching society ID:", error);
                }
            }
        };

        fetchSocietyId();
    }, [userRole, userEmail]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token
        navigate('/login'); // Redirect to login
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>METU NCC</h1>
            </div>
            <nav className="nav-links">
                <ul>
                    {/* Links for authenticated users based on their roles */}
                    {token ? (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {userRole === 'ROLE_USER' && (
                                <>
                                    <li>
                                        <Link to="/my-societies">My Societies</Link>
                                    </li>
                                </>
                            )}
                            {userRole === 'ROLE_ADMIN' && (
                                <>
                                    <li>
                                        <Link to="/admin">Reservation Requests</Link>
                                    </li>
                                    <li>
                                        <Link to="/add-society">Add Society</Link>
                                    </li>
                                </>
                            )}
                            {userRole === 'ROLE_PRESIDENT' && (
                                <>
                                    <li>
                                        <Link to={`/society/${societyId || ''}`}>
                                            Society
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/join-requests`}>
                                            Requests
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <div onClick={handleLogout}>Logout</div>
                            </li>
                        </>
                    ) : (
                        // Links for unauthenticated users
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
