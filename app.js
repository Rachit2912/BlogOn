const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticate = require("./authMiddleware"); // middleware for authenticationi
const generateSummary = require("./geminiService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// in-memory storage
let posts = [];
let idCounter = 1;

// api endpoints
app.get("/api/posts", (req, res) => res.json(posts));

app.post("/api/posts", authenticate, (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: idCounter++, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  post ? res.json(post) : res.status(404).send("Post not found");
});

app.post("/generate-summary", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const summary = await generateSummary(prompt);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
