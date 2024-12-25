import React, { useState } from 'react';
import './auth.css';
import axiosInstance from '../services/axiosInstance';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        try {
            const userRegistrationDTO = { email, password };
    
            const response = await axiosInstance.post("/api/auth/signup", userRegistrationDTO);
    
            alert("Signup successful!");
            console.log("Response:", response.data);
    
        } catch (error) {
            console.error("Error during signup:", error.message);
            if (error.response) {
                alert(`Signup failed: ${error.response.data.message}`);
            } else {
                alert("Signup failed. Please try again later.");
            }
        }
        
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSignup}>
                <h2 className="auth-title">Signup</h2>
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
                <div className="auth-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
