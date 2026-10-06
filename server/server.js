const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const propertyRoutes = require("./routes/propertyRoutes");
const roommateRoutes = require("./routes/roommateRoutes");

app.use("/api/properties", propertyRoutes);
app.use("/api/roommates", roommateRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "RentEase API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ RentEase backend server running on http://localhost:${PORT}`);
});
