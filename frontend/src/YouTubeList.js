import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function YouTubeList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/links`)
      .then(response => setLinks(response.data))
      .catch(error => console.error("Error fetching links:", error));
  }, []);

  return (
    <div>
      <h2>My Music Portfolio</h2>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YouTubeList;
