import React, {useRef} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YouTubeList from "./YouTubeList";
import AdminPage from "./AdminPage";
import ContactForm from "./ContactForm";
import "./App.css";


function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);
  const socialsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
          {/* Background Video */}
          <video autoPlay muted loop className="background-video">
          <source src="/videos/about-video 2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>
            <div>
              {/* Navigation Bar */}
              <nav className="navbar">
                <h1>🎵 Amby Music</h1>
                <ul>
                  <li onClick={() => scrollToSection(homeRef)}>Home</li>
                  <li onClick={() => scrollToSection(galleryRef)}>Gallery</li>
                  <li onClick={() => scrollToSection(contactRef)}>Contact</li>
                  <li onClick={() => scrollToSection(socialsRef)}>Socials</li>
                </ul>
              </nav>

              {/* Home Section */}
              <section ref={homeRef} className="home">
                <h2>Welcome to Amby Music</h2>
                <p>Doctor by profession | Composer by passion</p>
              </section>

              {/* Gallery Section */}
              <section ref={galleryRef} className="gallery">
              <YouTubeList/>
              </section>

              {/* Contact Section */}
              <section ref={contactRef} className="contact">
                <ContactForm />
              </section>

              {/* Socials Section */}
              <footer className="footer">
              <h3>🌍 Follow Me</h3>
              <div className="footer-links">
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
              <p>© {new Date().getFullYear()} Amby Music. All rights reserved.</p>
            </footer>
            </div>

          </>
        } />
        <Route path="/admin" element={
          <><AdminPage/></>
        } />
      </Routes>
    </Router>
          
  );
}

export default App;
 