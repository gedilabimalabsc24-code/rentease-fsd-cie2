import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Properties.css";

const COLLEGES = [
  "All Colleges",
  "RV University",
  "Christ University",
  "PES University",
  "Jain University",
  "BMS College of Engineering",
];

const PROPERTY_TYPES = ["All Types", "Studio", "1BHK", "2BHK", "3BHK", "PG", "Hostel", "Shared Apartment"];

function Properties({ toggleFavorite, isFavorite }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [selectedType, setSelectedType] = useState("All Types");
  const [maxRent, setMaxRent] = useState("");

  const location = useLocation();

  // useEffect – fetches all properties from Express backend
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  // Read search param from URL (coming from Navbar search)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearchTerm(q);
  }, [location.search]);

  // Filter logic
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCollege =
      selectedCollege === "All Colleges" || p.nearbyCollege === selectedCollege;

    const matchesType =
      selectedType === "All Types" || p.type === selectedType;

    const matchesRent = maxRent === "" || p.rent <= parseInt(maxRent);

    return matchesSearch && matchesCollege && matchesType && matchesRent;
  });

  return (
    <div className="properties-page">
      <div className="properties-hero">
        <h1>Find Your Student Home in Bengaluru</h1>
        <p>Browse PGs, Hostels, Shared Apartments & More</p>
      </div>

      <div className="container">
        {/* ── FILTERS BAR ── */}
        <div className="filters-bar">
          {/* Search Input */}
          <input
            type="text"
            className="filter-input"
            placeholder="🔍 Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* College Filter – Modification 3 */}
          <select
            className="filter-select"
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
          >
            {COLLEGES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Property Type Filter */}
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Max Rent Filter */}
          <input
            type="number"
            className="filter-input"
            placeholder="Max rent (₹)"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          />

          {/* Reset Button */}
          <button
            className="btn btn-outline reset-btn"
            onClick={() => {
              setSearchTerm("");
              setSelectedCollege("All Colleges");
              setSelectedType("All Types");
              setMaxRent("");
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Results Count */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> properties
          {selectedCollege !== "All Colleges" && ` near ${selectedCollege}`}
        </p>

        {/* Property Grid */}
        {loading ? (
          <div className="loading-spinner">
            <p>Loading properties...</p>
          </div>
        ) : (
          <PropertyList
            properties={filtered}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default Properties;
