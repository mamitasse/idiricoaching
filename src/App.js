import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/components/Home';
import NadiaPage from '../src/components/NadiaPage';
import SabrinaPage from '../src/components/SabrinaPage';
import Signup from '../src/components/signup';
import Footer from '../src/components/footer'
import Services from '../src/components/services'
import Contact from './components/contact.js'
import Login from '../src/components/login.js'
import CoachDashboard from '../src/components/CoachDashboard';
import AdherentDashboard from '../src/components/AdherentDashboard.js';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/nadia" element={<NadiaPage />} />
        <Route path="/sabrina" element={<SabrinaPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coach-dashboard" element={<PrivateRoute allowedRole="coach"><CoachDashboard /></PrivateRoute>} />
        <Route path="/adherent-dashboard" element={<PrivateRoute allowedRole="adherent"><AdherentDashboard /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
