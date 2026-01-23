// src/App.js
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from './context/ToastContext';

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

// Protected Route Component (Optional - add authentication logic here)
function ProtectedRoute({ children }) {
  // TODO: Add your authentication check here
  // const isAuthenticated = localStorage.getItem('token');
  // if (!isAuthenticated) {
  //   return <Navigate to="/admin/login" replace />;
  // }
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Website Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Admin Authentication Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            {/* Admin Dashboard Routes - All admin management in one place */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy admin routes - redirect to dashboard */}
            <Route path="/admin/services" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/equipment" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/projects" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/office-info" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/contact-methods" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Admin root redirect */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* 404 Not Found - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;