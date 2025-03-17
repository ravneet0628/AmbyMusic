import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function AdminPage() {
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const addLink = async () => {
    try {
      await axios.post(`${API_URL}/api/links`, newLink);
      alert("Video added successfully!");
    } catch (error) {
      alert("Error adding video");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Video Title"
        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="YouTube URL"
        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
      />
      <button onClick={addLink}>Add Video</button>
    </div>
  );
}

export default AdminPage;
