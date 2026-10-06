const express = require("express");
const router = express.Router();
let properties = require("../data/properties");

// GET all properties
router.get("/", (req, res) => {
  res.json(properties);
});

// GET single property by ID
router.get("/:id", (req, res) => {
  const property = properties.find((p) => p.id === parseInt(req.params.id));
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }
  res.json(property);
});

// POST - Add new property
router.post("/", (req, res) => {
  const newProperty = {
    id: properties.length + 1,
    name: req.body.name,
    location: req.body.location,
    rent: parseInt(req.body.rent),
    type: req.body.type,
    rooms: parseInt(req.body.rooms),
    description: req.body.description,
    amenities: req.body.amenities
      ? req.body.amenities.split(",").map((a) => a.trim())
      : [],
    nearbyCollege: req.body.nearbyCollege,
    distanceFromCollege: req.body.distanceFromCollege,
    ownerName: req.body.ownerName,
    contact: req.body.contact,
    image:
      req.body.image ||
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// PUT - Update property by ID
router.put("/:id", (req, res) => {
  const index = properties.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Property not found" });
  }
  properties[index] = { ...properties[index], ...req.body };
  res.json(properties[index]);
});

// DELETE - Remove property by ID
router.delete("/:id", (req, res) => {
  const index = properties.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Property not found" });
  }
  const deleted = properties.splice(index, 1);
  res.json({ message: "Property deleted", property: deleted[0] });
});

module.exports = router;
