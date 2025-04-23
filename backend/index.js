const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const serverless = require("serverless-http");

// Load .env in local but skip on AWS Lambda
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  dotenv.config();
}

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const LINKS_TABLE = process.env.LINKS_TABLE;
const MESSAGES_TABLE = process.env.MESSAGES_TABLE;

// DynamoDB config
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_DB
});

// Admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ access_token: token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});


// JWT middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Unauthorized" });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Get all video links
app.get("/api/links", async (req, res) => {
  try {
    const result = await dynamoDb.scan({ TableName: LINKS_TABLE }).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new video link
app.post("/api/links", authenticate, async (req, res) => {
  const { title, url } = req.body;
  const newItem = { id: uuidv4(), title, url };
  try {
    await dynamoDb.put({ TableName: LINKS_TABLE, Item: newItem }).promise();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a video link
app.delete("/api/links/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    await dynamoDb.delete({ TableName: LINKS_TABLE, Key: { id } }).promise();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit a contact message
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const item = { id: uuidv4(), name, email, message, created_at: new Date().toISOString() };
  try {
    await dynamoDb.put({ TableName: MESSAGES_TABLE, Item: item }).promise();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all contact messages
app.get("/api/contact-responses", authenticate, async (req, res) => {
  try {
    const result = await dynamoDb.scan({ TableName: MESSAGES_TABLE }).promise();
    res.json(result.Items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a contact message
app.delete("/api/contact-responses/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    await dynamoDb.delete({ TableName: MESSAGES_TABLE, Key: { id } }).promise();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Local Development Mode
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(5000, () => console.log("🚀 Server running locally on http://localhost:5000"));
}

// Export for AWS Lambda
module.exports.handler = serverless(app);