// /routes/caregiver.js
const express = require("express");
const queryLlama = require("../config/openai");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/add-task", async (req, res) => {
  const { taskDetails } = req.body;

  try {
    // Get a summary for the caregiver task
    const summary = await queryLlama(`Summarize this caregiver task: ${taskDetails}`);

    // Generate vector embeddings for the caregiver task (simulated)
    const taskEmbedding = [Math.random(), Math.random(), Math.random()]; // Replace with actual embedding generation

    // Store task details in Pinecone
    await pineconeClient.upsert({
      namespace: "caregiver-tasks",
      vectors: [
        {
          id: Date.now().toString(),
          values: taskEmbedding,
        },
      ],
    });

    res.json({ message: "Caregiver task added successfully", summary });
  } catch (error) {
    res.status(500).json({ message: "Error adding caregiver task", error });
  }
});

module.exports = router;
