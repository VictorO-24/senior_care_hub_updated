// /routes/search.js
const express = require("express");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/search", async (req, res) => {
  const { query } = req.body;

  try {
    // Simulate vector generation for query
    const queryEmbedding = [Math.random(), Math.random(), Math.random()]; // Replace with actual embedding generation

    const results = await pineconeClient.query({
      namespace: "tasks",
      topK: 5,
      includeMetadata: true,
      vector: queryEmbedding,
    });

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: "Error searching tasks", error });
  }
});

module.exports = router;
