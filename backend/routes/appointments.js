// /routes/appointments.js
const express = require("express");
const queryLlama = require("../config/openai");
const pineconeClient = require("../config/pinecone");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { appointmentDetails } = req.body;

  try {
    // Generate a summary for the appointment
    const summary = await queryLlama(`Summarize this appointment: ${appointmentDetails}`);

    // Generate a vector embedding for the appointment (simulated here)
    const appointmentEmbedding = [Math.random(), Math.random(), Math.random()]; // Replace with actual embedding generation

    // Store the appointment details in Pinecone
    await pineconeClient.upsert({
      namespace: "appointments",
      vectors: [
        {
          id: Date.now().toString(),
          values: appointmentEmbedding,
        },
      ],
    });

    res.json({ message: "Appointment created successfully", summary });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
});

module.exports = router;
