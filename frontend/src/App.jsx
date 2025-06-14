import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import DashboardAnnonceur from './pages/DashboardAnnonceur';
import Profil from './pages/Profil';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute role="USER"><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard-annonceur" element={<PrivateRoute role="ADVERTISER"><DashboardAnnonceur /></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute role="USER"><Profil /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
} 