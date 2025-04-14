import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";
const VIDEOS_PER_PAGE = 6;

function YouTubeList() {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/links`)
      .then((response) => setLinks(response.data))
      .catch((error) => console.error("Error fetching links:", error));
  }, []);

  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  // Pagination logic
  const indexOfLast = currentPage * VIDEOS_PER_PAGE;
  const indexOfFirst = indexOfLast - VIDEOS_PER_PAGE;
  const currentLinks = links.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(links.length / VIDEOS_PER_PAGE);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#ffd700", marginBottom: "20px" }}>
        My Music Portfolio
      </h2>

      <div className="youtube-list">
        {currentLinks.length > 0 ? (
          currentLinks.map((link) => {
            const videoId = getVideoId(link.url);
            return (
              videoId && (
                <div key={link.id} className="youtube-card">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={link.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p
                    style={{
                      marginTop: "10px",
                      color: "#ffd700",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {link.title}
                  </p>
                </div>
              )
            );
          })
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>No videos available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{ 
            color: "#ffd700",
            background: "transparent",
            border: "1px solid #ffd700",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Previous
        </button>
        <span style={{ 
          color: "#fff" 
          }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((p) => (p < totalPages ? p + 1 : p))
          }
          disabled={currentPage === totalPages}
          style={{ 
            color: "#ffd700",
            background: "transparent",
            border: "1px solid #ffd700",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "10px"
           }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default YouTubeList;
