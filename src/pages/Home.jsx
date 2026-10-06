/**
 * Home.jsx – Home Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – the landing page of RentEase.
 *
 * Sections:
 *   1. Hero section with main heading, CTA buttons, stats
 *   2. Nearby College Finder (MODIFICATION 3)
 *   3. Featured Properties (fetched from Express API using useEffect)
 *   4. "Why RentEase?" cards
 *   5. CTA (Call To Action) section at bottom
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - useState (featuredProperties, loading, selectedCollege)
 *   - useEffect (fetch from Express backend on mount)
 *   - Props (toggleFavorite, isFavorite received from App.jsx)
 *   - Event Handling (onChange on college select, onClick on chips)
 *   - Conditional rendering (loading spinner vs content)
 *   - Parent–Child (Home → PropertyList → PropertyCard)
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Home.css";

// List of colleges for Modification 3 filter
const COLLEGES = [
  "All Colleges",
  "RV University",
  "Christ University",
  "PES University",
  "Jain University",
  "BMS College of Engineering",
];

function Home({ toggleFavorite, isFavorite }) {
  // State: holds the featured properties fetched from the backend
  const [featuredProperties, setFeaturedProperties] = useState([]);

  // State: tracks API loading status to show spinner
  const [loading, setLoading] = useState(true);

  // State: MODIFICATION 3 – currently selected college filter
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");

  /**
   * useEffect – runs once when the component first mounts ([] dependency array).
   * Fetches all properties from the Express backend, then takes first 4
   * to display as "featured" properties on the home page.
   *
   * Flow: React → fetch() → Express GET /api/properties → response → setState
   */
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProperties(data.slice(0, 4)); // Only show 4 featured cards
        setLoading(false);                        // Stop loading spinner
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []); // Empty [] means run ONCE on mount

  /**
   * handleCollegeChange – onChange event handler for the college dropdown.
   * Updates selectedCollege state which triggers re-filter of properties.
   */
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value); // e.target.value = selected option
  };

  /**
   * MODIFICATION 3 – College Filter Logic
   * Filter featured properties based on selected college.
   * If "All Colleges" is selected, show all; otherwise show matching ones.
   */
  const filteredFeatured =
    selectedCollege === "All Colleges"
      ? featuredProperties
      : featuredProperties.filter(
          (p) => p.nearbyCollege === selectedCollege
        );

  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            {/* Main heading */}
            <h1 className="hero-title">Find Your Perfect Student Home</h1>
            <p className="hero-subtitle">
              Discover affordable PGs, hostels, shared apartments and roommates
              near your college in Bengaluru.
            </p>

            {/* CTA Buttons – React Router Links */}
            <div className="hero-buttons">
              <Link to="/properties" className="btn btn-primary">
                🏠 Explore Properties
              </Link>
              <Link to="/roommates" className="btn btn-secondary">
                👥 Find a Roommate
              </Link>
            </div>

            {/* Quick stats bar */}
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Colleges</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: MODIFICATION 3 – NEARBY COLLEGE FINDER
          Students can select their college to filter properties.
          Uses a dropdown (onChange) and clickable chip buttons (onClick).
          ══════════════════════════════════════════ */}
      <section className="college-section">
        <div className="container">
          <h2 className="section-title">🎓 Find Properties by College</h2>
          <p className="section-subtitle">
            Select your college to see nearby rental properties
          </p>

          {/* Dropdown select – onChange event updates selectedCollege state */}
          <div className="college-filter-home">
            <select
              value={selectedCollege}
              onChange={handleCollegeChange} // onChange event handler
              className="college-select"
            >
              {COLLEGES.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          {/* College chip buttons – onClick event updates selectedCollege */}
          <div className="college-cards">
            {["RV University", "Christ University", "PES University",
              "Jain University", "BMS College of Engineering"].map((college) => (
              <button
                key={college}
                // Conditional class: "active" when this chip is selected
                className={`college-chip ${selectedCollege === college ? "active" : ""}`}
                onClick={() => setSelectedCollege(college)} // onClick event
              >
                🎓 {college}
              </button>
            ))}
            {/* "All" chip to reset the filter */}
            <button
              className={`college-chip ${selectedCollege === "All Colleges" ? "active" : ""}`}
              onClick={() => setSelectedCollege("All Colleges")}
            >
              All Colleges
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: FEATURED PROPERTIES
          Shows filteredFeatured (up to 4 cards).
          Uses PropertyList → PropertyCard (parent-child chain).
          ══════════════════════════════════════════ */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">
            {selectedCollege === "All Colleges"
              ? "🏠 Featured Properties"
              : `🏠 Properties near ${selectedCollege}`}
          </h2>
          <p className="section-subtitle">
            Handpicked student-friendly rentals in Bengaluru
          </p>

          {/* Conditional rendering: show spinner while loading, then list */}
          {loading ? (
            <div className="loading-spinner">
              <p>Loading properties...</p>
            </div>
          ) : (
            // Pass filtered properties and favorite handlers as props to PropertyList
            <PropertyList
              properties={filteredFeatured}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}

          <div className="view-all-btn-wrapper">
            <Link to="/properties" className="btn btn-outline">
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4: WHY RENTEASE?
          Static informational cards – no state needed.
          ══════════════════════════════════════════ */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose RentEase?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🎓</div>
              <h3>Student Focused</h3>
              <p>All properties are verified and student-friendly with affordable rents near top Bengaluru colleges.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">❤️</div>
              <h3>Save Favorites</h3>
              <p>Shortlist properties you love with one click and compare them easily from your Favorites page.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">👥</div>
              <h3>Find Roommates</h3>
              <p>Our smart matching finds compatible roommates based on location, budget, and lifestyle preferences.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">📍</div>
              <h3>College Proximity</h3>
              <p>Every property shows the nearby college and exact distance so you can plan your commute easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5: CALL TO ACTION
          ══════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Home?</h2>
          <p>Join hundreds of students who found their perfect place on RentEase.</p>
          <div className="hero-buttons">
            <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
            <Link to="/add-property" className="btn btn-secondary">List Your Property</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
