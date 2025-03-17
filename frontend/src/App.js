import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YouTubeList from "./YouTubeList";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YouTubeList />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
