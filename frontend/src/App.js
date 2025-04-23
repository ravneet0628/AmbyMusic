import React, { useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <video autoPlay muted loop className="background-video">
                <source src="/videos/about-video 2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <nav className="navbar">
                <h1>🎵 Amby Music</h1>
                <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                  ☰
                </div>
                <ul className={isOpen ? "active" : ""}>
                  <li onClick={() => scrollToSection(homeRef)}>Home</li>
                  <li onClick={() => scrollToSection(galleryRef)}>Gallery</li>
                  <li onClick={() => scrollToSection(contactRef)}>Contact</li>
                  <li onClick={() => scrollToSection(socialsRef)}>Socials</li>
                </ul>
              </nav>

              <section ref={homeRef} className="home">
                <h2>Welcome to Amby Music</h2>
                <p>Doctor by profession | Composer by passion</p>
              </section>

              <section ref={galleryRef} className="gallery">
                <YouTubeList />
              </section>

              <section ref={contactRef} className="contact">
                <ContactForm />
              </section>

              <footer ref={socialsRef} className="footer">
                <h3>🌍 Follow Me</h3>
                <div className="footer-links">
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </div>
                <p>© {new Date().getFullYear()} Amby Music. All rights reserved.</p>
              </footer>
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
