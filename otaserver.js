const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FIRMWARE_JSON_PATH = path.join(__dirname, "firmware.json");
const FIRMWARE_BIN_PATH = path.join(__dirname, "firmware.bin");

app.use(cors());
app.use(express.json());

// Route to get firmware metadata
app.get("/firmware.json", (req, res) => {
  fs.readFile(FIRMWARE_JSON_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read firmware metadata" });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

// Route to download firmware binary
app.get("/firmware.bin", (req, res) => {
  if (fs.existsSync(FIRMWARE_BIN_PATH)) {
    res.download(FIRMWARE_BIN_PATH);
  } else {
    res.status(404).json({ error: "Firmware file not found" });
  }
});

// Route to update firmware metadata
app.post("/update-firmware", (req, res) => {
  const { version, published, file } = req.body;
  if (!version || typeof published !== "boolean" || !file) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const firmwareData = JSON.stringify({ version, published, file }, null, 2);
  fs.writeFile(FIRMWARE_JSON_PATH, firmwareData, "utf8", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update firmware metadata" });
    }
    res.json({ message: "Firmware metadata updated successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Firmware OTA server running on http://localhost:${PORT}`);
});
