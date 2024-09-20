// /server.js
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
const medicationRoutes = require("./routes/medications");
const appointmentRoutes = require("./routes/appointments");
const caregiverRoutes = require("./routes/caregiver");
const contactRoutes = require("./routes/contacts");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/tasks", taskRoutes);
app.use("/medications", medicationRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/caregiver", caregiverRoutes);
app.use("/contacts", contactRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
