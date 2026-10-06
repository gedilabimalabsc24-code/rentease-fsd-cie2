/**
 * Properties.jsx – Properties Listing Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – shows all rental properties with filters.
 *
 * Features:
 *   - Fetches all properties from Express API using useEffect
 *   - Search by name or location (useState + filter)
 *   - Filter by nearby college (MODIFICATION 3)
 *   - Filter by property type
 *   - Filter by max rent
 *   - Reads ?search= query param from Navbar search
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - useState (properties, loading, searchTerm, selectedCollege, etc.)
 *   - useEffect (fetch API on mount + read URL search param)
 *   - Event Handling (onChange on all filter inputs)
 *   - Props (toggleFavorite, isFavorite from App.jsx)
 *   - Parent–Child (Properties → PropertyList → PropertyCard)
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Properties.css";

// Available college options for the filter dropdown (Modification 3)
const COLLEGES = [
  "All Colleges",
  "RV University",
  "Christ University",
  "PES University",
  "Jain University",
  "BMS College of Engineering",
];

// Available property type options for the type filter
const PROPERTY_TYPES = [
  "All Types", "Studio", "1BHK", "2BHK", "3BHK",
  "PG", "Hostel", "Shared Apartment"
];

function Properties({ toggleFavorite, isFavorite }) {
  // State: full list of properties fetched from Express backend
  const [properties, setProperties] = useState([]);

  // State: loading flag to show spinner while fetching
  const [loading, setLoading] = useState(true);

  // State: search input text (filters by name or location)
  const [searchTerm, setSearchTerm] = useState("");

  // State: MODIFICATION 3 – selected college for filtering
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");

  // State: selected property type for filtering
  const [selectedType, setSelectedType] = useState("All Types");

  // State: maximum rent filter
  const [maxRent, setMaxRent] = useState("");

  // useLocation hook – reads current URL (to get ?search= query param from Navbar)
  const location = useLocation();

  /**
   * useEffect 1 – Fetches all properties from Express backend on component mount.
   * [] means this runs only ONCE when the component is first loaded.
   *
   * Data flow: React → fetch() → Express GET /api/properties → setProperties()
   */
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);  // store all 10 properties in state
        setLoading(false);    // hide loading spinner
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []); // empty [] = run once on mount

  /**
   * useEffect 2 – Reads the ?search= query parameter from the URL.
   * This runs when the URL location changes (e.g., user searches from Navbar).
   * If ?search=Whitefield is in the URL, it sets the searchTerm state.
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search"); // get value of ?search=...
    if (q) setSearchTerm(q);
  }, [location.search]); // re-run whenever URL changes

  /**
   * Filter Logic – applies all active filters to the properties array.
   * All four filters work together (AND logic).
   * This runs on every render when any filter state changes.
   */
  const filtered = properties.filter((p) => {
    // Search: property name or location contains the search term (case-insensitive)
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    // College filter: match nearby college or show all (Modification 3)
    const matchesCollege =
      selectedCollege === "All Colleges" || p.nearbyCollege === selectedCollege;

    // Type filter: match property type or show all
    const matchesType =
      selectedType === "All Types" || p.type === selectedType;

    // Rent filter: property rent must be ≤ user's max (if set)
    const matchesRent = maxRent === "" || p.rent <= parseInt(maxRent);

    // Property must pass ALL four filters
    return matchesSearch && matchesCollege && matchesType && matchesRent;
  });

  return (
    <div className="properties-page">

      {/* ── PAGE HERO ── */}
      <div className="properties-hero">
        <h1>Find Your Student Home in Bengaluru</h1>
        <p>Browse PGs, Hostels, Shared Apartments & More</p>
      </div>

      <div className="container">

        {/* ── FILTERS BAR ──
            All inputs are controlled components:
            value is tied to state, onChange updates state. */}
        <div className="filters-bar">

          {/* Search Input – onChange updates searchTerm state */}
          <input
            type="text"
            className="filter-input"
            placeholder="🔍 Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // onChange event
          />

          {/* MODIFICATION 3 – College Filter Dropdown */}
          <select
            className="filter-select"
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)} // onChange event
          >
            {COLLEGES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Property Type Filter Dropdown */}
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)} // onChange event
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Max Rent Filter – number input */}
          <input
            type="number"
            className="filter-input"
            placeholder="Max rent (₹)"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)} // onChange event
          />

          {/* Reset Button – onClick clears all filters back to defaults */}
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

        {/* Results count feedback */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> properties
          {selectedCollege !== "All Colleges" && ` near ${selectedCollege}`}
        </p>

        {/* ── PROPERTY GRID ──
            Shows spinner during loading, then renders filtered properties.
            PropertyList is the child component → it renders PropertyCard children. */}
        {loading ? (
          <div className="loading-spinner">
            <p>Loading properties...</p>
          </div>
        ) : (
          <PropertyList
            properties={filtered}          // pass filtered array as prop
            toggleFavorite={toggleFavorite} // pass favorite toggle as prop
            isFavorite={isFavorite}         // pass favorite checker as prop
          />
        )}
      </div>
    </div>
  );
}

export default Properties;
