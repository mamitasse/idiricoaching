//src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importez useSelector pour accéder au state
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import NadiaPage from '../src/pages/NadiaPage';
import SabrinaPage from '../src/pages/SabrinaPage';
import Signup from '../src/pages/signup';
import Footer from '../src/components/footer'
import Services from '../src/pages/services'
import Contact from '../src/pages/contact.js'
import Login from '../src/pages/login.js'
import CoachDashboard from '../src/pages/CoachDashboard';
import AdherentDashboard from '../src/pages/AdherentDashboard.js';
import PrivateRoute from './PrivateRoute';
import CoachSignup from '../src/pages/coachSignup.js';
import AdherentProfile from './pages/AdherentProfile.js'
import ResetPassword from './pages/resetPassword.js'

function App() {
  const token = useSelector((state) => state.auth.token); // Récupérez le token de l'état Redux

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
        <Route path="/coach-signup" element={<CoachSignup />} />
        <Route path="/adherent/:adherentId" element={<AdherentProfile />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        
        {/* Routes protégées */}
        <Route path="/coach-dashboard" 
          element={<PrivateRoute allowedRole="coach"><CoachDashboard /></PrivateRoute>} 
        />
        <Route path="/adherent-dashboard" 
          element={<PrivateRoute allowedRole="adherent"><AdherentDashboard /></PrivateRoute>} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;