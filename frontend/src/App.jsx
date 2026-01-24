// src/App.js
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider } from "./context/AdminAuthContext";

// Main Website Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/Services";
import MachinerySection from "./components/MachinerySection";
import TrustedBy from "./components/TrustedBy";
import Footer from "./components/Footer";

// Auth Components
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";

// Admin Dashboard & Components
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Main Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="equipment">
        <MachinerySection />
      </div>
      <div id="projects">
        <TrustedBy />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Website */}
            <Route path="/" element={<HomePage />} />

            {/* Admin Auth (NO provider needed) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* 🔐 ADMIN ROUTES ONLY */}
            <Route
              path="/admin/*"
              element={
                <AdminAuthProvider>
                  <Routes>
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </AdminAuthProvider>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;