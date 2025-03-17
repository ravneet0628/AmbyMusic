const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let musicLinks = [{
    "title": "AWS Lambda and DynamoDB Tutorial",
    "url": "https://www.youtube.com/watch?v=-2RAq5o5pwc"
  }];  // Store links temporarily

// Fetch all music links
app.get('/api/links', (req, res) => {
    res.json(musicLinks);
});

// Add a new music link
app.post('/api/links', (req, res) => {
    const { title, url } = req.body;
    const newLink = { id: Date.now(), title, url };
    musicLinks.push(newLink);
    res.json(newLink);
});

// Delete a music link
app.delete('/api/links/:id', (req, res) => {
    const { id } = req.params;
    musicLinks = musicLinks.filter(link => link.id !== parseInt(id));
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
