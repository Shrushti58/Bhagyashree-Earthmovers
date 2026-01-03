import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ThemeProvider } from "./context/ThemeContext";
import ServicesSection from "./components/Services";
import MachinerySection from "./components/MachinerySection";
import TrustedBy from "./components/TrustedBy";
import Footer from "./components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <ThemeProvider>
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
      </ThemeProvider>
    </>
  );
}

export default App;
