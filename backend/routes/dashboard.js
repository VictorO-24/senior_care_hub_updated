// /routes/dashboard.js
const express = require("express");
const pineconeClient = require("../config/pinecone");
const queryLlama = require("../config/openai");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Retrieve tasks, appointments, medications, etc. from Pinecone
    const taskResults = await pineconeClient.query({
      namespace: "tasks",
      topK: 5,
      includeMetadata: true,
    });

    const appointmentResults = await pineconeClient.query({
      namespace: "appointments",
      topK: 5,
      includeMetadata: true,
    });

    const medicationResults = await pineconeClient.query({
      namespace: "medications",
      topK: 5,
      includeMetadata: true,
    });

    // Generate a LLaMA summary for dashboard
    const dashboardSummary = await queryLlama(
      `Summarize the recent tasks, appointments, and medication updates: 
      Tasks: ${JSON.stringify(taskResults)}, 
      Appointments: ${JSON.stringify(appointmentResults)}, 
      Medications: ${JSON.stringify(medicationResults)}`
    );

    res.json({
      message: "Dashboard data retrieved successfully",
      taskResults,
      appointmentResults,
      medicationResults,
      summary: dashboardSummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard data", error });
  }
});

module.exports = router;
