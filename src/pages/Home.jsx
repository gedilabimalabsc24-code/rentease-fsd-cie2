import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Home.css";

const COLLEGES = [
  "All Colleges",
  "RV University",
  "Christ University",
  "PES University",
  "Jain University",
  "BMS College of Engineering",
];

function Home({ toggleFavorite, isFavorite }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const location = useLocation();

  // useEffect – fetches featured properties from Express backend
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProperties(data.slice(0, 4)); // show 4 featured cards
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  // College filter handler – Modification 3
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  const filteredFeatured =
    selectedCollege === "All Colleges"
      ? featuredProperties
      : featuredProperties.filter(
          (p) => p.nearbyCollege === selectedCollege
        );

  return (
    <div className="home-page">
      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Student Home</h1>
            <p className="hero-subtitle">
              Discover affordable PGs, hostels, shared apartments and roommates
              near your college in Bengaluru.
            </p>
            <div className="hero-buttons">
              <Link to="/properties" className="btn btn-primary">
                🏠 Explore Properties
              </Link>
              <Link to="/roommates" className="btn btn-secondary">
                👥 Find a Roommate
              </Link>
            </div>

            {/* Quick Stats */}
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

      {/* ── NEARBY COLLEGE SECTION – Modification 3 ── */}
      <section className="college-section">
        <div className="container">
          <h2 className="section-title">🎓 Find Properties by College</h2>
          <p className="section-subtitle">
            Select your college to see nearby rental properties
          </p>

          <div className="college-filter-home">
            <select
              value={selectedCollege}
              onChange={handleCollegeChange}
              className="college-select"
            >
              {COLLEGES.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          <div className="college-cards">
            {["RV University", "Christ University", "PES University", "Jain University", "BMS College of Engineering"].map(
              (college) => (
                <button
                  key={college}
                  className={`college-chip ${
                    selectedCollege === college ? "active" : ""
                  }`}
                  onClick={() => setSelectedCollege(college)}
                >
                  🎓 {college}
                </button>
              )
            )}
            <button
              className={`college-chip ${
                selectedCollege === "All Colleges" ? "active" : ""
              }`}
              onClick={() => setSelectedCollege("All Colleges")}
            >
              All Colleges
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
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

          {loading ? (
            <div className="loading-spinner">
              <p>Loading properties...</p>
            </div>
          ) : (
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

      {/* ── WHY RENTEASE SECTION ── */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose RentEase?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🎓</div>
              <h3>Student Focused</h3>
              <p>
                All properties are verified and student-friendly with
                affordable rents near top Bengaluru colleges.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">❤️</div>
              <h3>Save Favorites</h3>
              <p>
                Shortlist properties you love with one click and compare them
                easily from your Favorites page.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">👥</div>
              <h3>Find Roommates</h3>
              <p>
                Our smart matching finds compatible roommates based on
                location, budget, and lifestyle preferences.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">📍</div>
              <h3>College Proximity</h3>
              <p>
                Every property shows the nearby college and exact distance so
                you can plan your commute easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Home?</h2>
          <p>Join hundreds of students who found their perfect place on RentEase.</p>
          <div className="hero-buttons">
            <Link to="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
            <Link to="/add-property" className="btn btn-secondary">
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
