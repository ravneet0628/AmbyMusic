import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL || "http://localhost:5000";


function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videoPage, setVideoPage] = useState(1);

  const [contactResponses, setContactResponses] = useState([]);
  const [responsePage, setResponsePage] = useState(1);

  const VIDEOS_PER_PAGE = 10;
  const RESPONSES_PER_PAGE = 5;

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
      fetchContactResponses();
    }
  }, [isAuthenticated]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/links`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchContactResponses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contact-responses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setContactResponses(response.data);
    } catch (error) {
      console.error("Error fetching contact responses:", error);
    }
  };

  const deleteSelectedVideos = async () => {
    for (const id of selectedVideos) {
      await axios.delete(`${API_URL}/api/links/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    }
    setVideos(videos.filter((video) => !selectedVideos.includes(video.id)));
    setSelectedVideos([]);
  };

  const toggleVideoSelection = (id) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/contact-responses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setContactResponses(contactResponses.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting contact message:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      setIsAuthenticated(true);
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const addLink = async () => {
    if (!newLink.title || !newLink.url) {
      alert("Please enter a title and URL!");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/links`, newLink, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      setVideos([...videos, response.data]);
      setNewLink({ title: "", url: "" });
      alert("Video added successfully!");
    } catch (error) {
      alert("Error adding video");
    }
  };

  const paginatedVideos = videos.slice(
    (videoPage - 1) * VIDEOS_PER_PAGE,
    videoPage * VIDEOS_PER_PAGE
  );

  const paginatedResponses = contactResponses.slice(
    (responsePage - 1) * RESPONSES_PER_PAGE,
    responsePage * RESPONSES_PER_PAGE
  );

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div className="add-video-form">
        <h3>Add New Video</h3>
        <input type="text" placeholder="Video Title" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} />
        <input type="text" placeholder="YouTube URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
        <button onClick={addLink}>Add Video</button>
      </div>

      <div className="video-list">
        <h3>Uploaded Videos</h3>
        {paginatedVideos.length === 0 ? (
          <p>No videos available.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Title</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVideos.map((video) => (
                  <tr key={video.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => toggleVideoSelection(video.id)}
                      />
                    </td>
                    <td>{video.title}</td>
                    <td><a href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={deleteSelectedVideos} disabled={selectedVideos.length === 0}>Delete Selected</button>
            <div className="pagination">
              <button onClick={() => setVideoPage((p) => Math.max(p - 1, 1))} disabled={videoPage === 1}>Previous</button>
              <span>Page {videoPage}</span>
              <button onClick={() => setVideoPage((p) => (p * VIDEOS_PER_PAGE < videos.length ? p + 1 : p))} disabled={videoPage * VIDEOS_PER_PAGE >= videos.length}>Next</button>
            </div>
          </>
        )}
      </div>

      <div className="contact-responses">
        <h3>Contact Form Responses</h3>
        {paginatedResponses.length === 0 ? (
          <p>No responses received yet.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Received At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResponses.map((response) => (
                  <tr key={response.id}>
                    <td>{response.name}</td>
                    <td>{response.email}</td>
                    <td>{response.message}</td>
                    <td>{new Date(response.created_at).toLocaleString()}</td>
                    <td><button onClick={() => deleteContact(response.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => setResponsePage((p) => Math.max(p - 1, 1))} disabled={responsePage === 1}>Previous</button>
              <span>Page {responsePage}</span>
              <button onClick={() => setResponsePage((p) => (p * RESPONSES_PER_PAGE < contactResponses.length ? p + 1 : p))} disabled={responsePage * RESPONSES_PER_PAGE >= contactResponses.length}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPage;