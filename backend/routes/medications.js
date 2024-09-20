// /routes/medications.js
const express = require("express");
const queryLlama = require("../config/openai");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/reminder", async (req, res) => {
  const { medication } = req.body;

  try {
    const reminderSummary = await queryLlama(
      `Create a medication reminder for: ${medication}`
    );

    res.json({ reminderSummary });
  } catch (error) {
    res.status(500).json({ message: "Error creating reminder", error });
  }
});

module.exports = router;
