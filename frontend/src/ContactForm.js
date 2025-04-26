import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/contact`, form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Contact Us <i className="fas fa-envelope"></i></h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
    
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Send</button>
      {success && <p style={{ color: 'green' }}>✅ Message sent!</p>}
    </form>
  );
}

export default ContactForm;