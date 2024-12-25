import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use React Router for navigation
import {jwtDecode} from 'jwt-decode'; // To decode the token
import './Common.css';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    let userRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.roles && decodedToken.roles[0]; // Get the first role
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('authToken'); // Clear invalid token
            navigate('/login'); // Redirect to login if the token is invalid
        }
    }

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
                                        <Link to="/event-requests">Event Requests</Link>
                                    </li>
                                </>
                            )}
                            {userRole === 'ROLE_PRESIDENT' && (
                                <>
                                    <li>
                                        <Link to="/society">Society</Link>
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
