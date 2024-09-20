// /routes/tasks.js
const express = require("express");
const queryLlama = require("../config/openai");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { taskDescription } = req.body;

  try {
    // Get task summary from LLaMA
    const summary = await queryLlama(`Summarize this task: ${taskDescription}`);

    // Generate vector embeddings (for simplicity, we simulate embeddings)
    const taskEmbedding = [Math.random(), Math.random(), Math.random()]; // Replace with actual embedding generation

    // Store in Pinecone
    await pineconeClient.upsert({
      namespace: "tasks",
      vectors: [
        {
          id: Date.now().toString(),
          values: taskEmbedding,
        },
      ],
    });

    res.json({ message: "Task added successfully", summary });
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
});

module.exports = router;
