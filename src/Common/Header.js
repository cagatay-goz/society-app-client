import React from 'react';
import { Link } from 'react-router-dom';  // If using React Router for navigation
import './Common.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1>METU NCC</h1>
            </div>
            <nav className="nav-links">
                <ul>
                    <li>
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
