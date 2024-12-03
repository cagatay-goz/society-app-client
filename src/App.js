import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/signup";
import Dashboard from "./Dashboard/Dashboard";
import SocietyPage from "./Society/SocietyPage";
import Header from './Common/Header';
import Footer from './Common/Footer';

function App() {
    return (
        <Router>
            {}
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/society/:id" element={<SocietyPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
