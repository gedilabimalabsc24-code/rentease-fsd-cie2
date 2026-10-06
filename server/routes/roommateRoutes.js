const express = require("express");
const router = express.Router();
const roommates = require("../data/roommates");

// GET all roommates
router.get("/", (req, res) => {
  res.json(roommates);
});

// GET single roommate by ID
router.get("/:id", (req, res) => {
  const roommate = roommates.find((r) => r.id === parseInt(req.params.id));
  if (!roommate) {
    return res.status(404).json({ message: "Roommate not found" });
  }
  res.json(roommate);
});

module.exports = router;
