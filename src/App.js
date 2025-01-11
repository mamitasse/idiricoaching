import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NadiaPage from './pages/NadiaPage';
import SabrinaPage from './pages/SabrinaPage';
import Signup from './pages/signup';
import Footer from './components/footer';
import Services from './pages/services';
import Contact from './pages/contact.js';
import Login from './pages/login.js';
import CoachDashboard from './pages/CoachDashboard';
import AdherentDashboard from './pages/AdherentDashboard.js';
import CoachSignup from './pages/coachSignup.js';
import AdherentProfile from './pages/AdherentProfile.js';
import ResetPassword from './pages/resetPassword.js';
import Preloader from './components/Preloader';

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => useContext(AuthContext);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState({ token: null, role: null });

  // Simulation de chargement du Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Récupération du token et du rôle dans le localStorage
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken) {
      setAuth({ token: storedToken, role: storedRole });
    }

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  // Composant interne pour gérer les routes protégées
  const ProtectedRoute = ({ allowedRole, children }) => {
    if (!auth.token) {
      return <Navigate to="/login" />;
    }

    if (auth.role !== allowedRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes publiques */}
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
          <Route
            path="/coach-dashboard"
            element={
              <ProtectedRoute allowedRole="coach">
                <CoachDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adherent-dashboard"
            element={
              <ProtectedRoute allowedRole="adherent">
                <AdherentDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
