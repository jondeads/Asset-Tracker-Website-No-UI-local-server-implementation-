const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON bodies
app.use(express.json());

// Temporary storage for equipment data
let equipment = [];

// GET data for frontend
app.get("/data", (req, res) => {
  console.log("Sending data to frontend:", equipment); // log to console
  res.json(equipment);
});

// POST data from ESP32
app.post("/data", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ status: "error", message: "No data received" });
  }

  console.log("Received from ESP32:", req.body);
  equipment.push(req.body); // store incoming data
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});