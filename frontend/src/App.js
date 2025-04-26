import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YouTubeList from "./YouTubeList";
import AdminPage from "./AdminPage";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const shopRef = useRef(null);
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
                <h1><i className="fas fa-headphones"></i> Amby Music</h1>
                <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                  ☰
                </div>
                <ul className={isOpen ? "active" : ""}>
                  <li onClick={() => scrollToSection(homeRef)}>Home</li>
                  <li onClick={() => scrollToSection(galleryRef)}>Gallery</li>
                  <li onClick={() => scrollToSection(shopRef)}>Shop</li>
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

              <section ref={shopRef} className="shop">
                <div>
                  <h2>Loved it and want to buy <i className="fas fa-shopping-cart"></i></h2>
                  <div className="embed-container">
                    <iframe
                      src="https://illpeoplemusic.com/@ambymusic"
                      title="Amby Music - IllPeopleMusic"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>

              <section ref={contactRef} className="contact">
                <ContactForm />
              </section>

              <footer ref={socialsRef} className="footer">
                <h3><i className="fas fa-globe"></i> Follow Me</h3>
                <div className="footer-links">
                  <a href="https://www.instagram.com/gursimran.2424/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                  <a href="https://youtube.com/@ambymusic?si=O6qCRhJbrlUFxy_-" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i> YouTube
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
