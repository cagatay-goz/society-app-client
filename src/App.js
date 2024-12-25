import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/signup";
import Dashboard from "./Dashboard/Dashboard";
import SocietyPage from "./Society/SocietyPage";
import Header from './Common/Header';
import Footer from './Common/Footer';
import BookingForm from "./Society/BookingForm";
import AdminPage from "./Society/AdminPage";
import AnnouncementForm from "./Society/AnnouncementForm";
import EditEvent from "./Society/EditEvent";
import SocietyAddForm from "./Society/SocietyAddForm";
import JoinRequestsPage from "./Society/JoinRequestsPage";
import MySocietiesPage from "./Society/MySocietiesPage";

function App() {
    return (
        <Router>
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/my-societies" element={<MySocietiesPage/>} />
                    <Route path="/society/:id" element={<SocietyPage/>}/>
                    <Route path="/add-society" element={<SocietyAddForm/>}/>
                    <Route path="/bookingForm" element={<BookingForm/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/announcementForm" element={<AnnouncementForm/>}/>
                    <Route path="/society/:id/edit-event/:eventId" element={<EditEvent />} />
                    <Route path="/join-requests" element={<JoinRequestsPage/>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
