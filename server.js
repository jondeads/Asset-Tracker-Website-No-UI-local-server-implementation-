const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON bodies
app.use(express.json());

// Temporary storage
let equipment = [];

// GET data for frontend
app.get("/data", (req, res) => {
  console.log("Sending data:", equipment);
  res.json(equipment);
});

// POST = create OR update
app.post("/data", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ status: "error", message: "No data received" });
  }

  const incoming = req.body;

  console.log("Received:", incoming);

  // 🔍 Find existing item by ID
  const index = equipment.findIndex(item => item.id === incoming.id);

  if (index !== -1) {
    // 🔄 UPDATE existing
    equipment[index] = {
      ...equipment[index],
      ...incoming,
      lastUpdated: new Date()
    };
  } else {
    // ➕ CREATE new
    equipment.push({
      ...incoming,
      lastUpdated: new Date()
    });
  }

  res.json({ status: "ok" });
});

// Allow ESP32 access (IMPORTANT)
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:3000");
});