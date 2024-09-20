// /routes/contacts.js
const express = require("express");
const queryLlama = require("../config/openai");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/add-contact", async (req, res) => {
  const { contactName, contactRelation, contactNumber } = req.body;

  try {
    // Summarize the contact details for emergency purposes
    const summary = await queryLlama(`Provide a summary for this emergency contact: Name: ${contactName}, Relation: ${contactRelation}, Phone: ${contactNumber}`);

    // Generate a vector embedding for the contact (simulated)
    const contactEmbedding = [Math.random(), Math.random(), Math.random()]; // Replace with actual embedding generation

    // Store the emergency contact in Pinecone
    await pineconeClient.upsert({
      namespace: "contacts",
      vectors: [
        {
          id: Date.now().toString(),
          values: contactEmbedding,
        },
      ],
    });

    res.json({ message: "Emergency contact added successfully", summary });
  } catch (error) {
    res.status(500).json({ message: "Error adding emergency contact", error });
  }
});

module.exports = router;
