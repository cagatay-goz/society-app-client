import React, { useState } from 'react';
import './auth.css';
import axiosInstance from '../services/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const userLoginDTO = { email, password };
    
            const response = await axiosInstance.post("/api/auth/login", userLoginDTO);
            const { token, email: userEmail } = response.data;
    
            localStorage.setItem("authToken", token);
    
            alert(`Welcome, ${userEmail}!`);
        } catch (error) {
            console.error("Error during login:", error.message);
            if (error.response) {
                alert(`Login failed: ${error.response.data.message}`);
            } else {
                alert("Login failed. Please try again later.");
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2 className="auth-title">Login</h2>
                <div className="auth-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
