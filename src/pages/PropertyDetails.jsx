/**
 * PropertyDetails.jsx – Property Details Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – shows full details of a single property.
 *
 * How it works:
 *   1. useParams() reads the :id from the URL (e.g., /property/3 → id = "3")
 *   2. useEffect fetches that specific property from Express GET /api/properties/:id
 *   3. Displays full property info: image, description, amenities, owner, college
 *   4. Favorite button (Modification 1) to save/unsave this property
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - useParams (get :id from URL)
 *   - useEffect (fetch single property from API)
 *   - useState (property, loading, error)
 *   - useNavigate (go back button)
 *   - Props (toggleFavorite, isFavorite from App.jsx)
 *   - Event Handling (onClick for favorite button and back button)
 *   - Conditional rendering (loading/error/content states)
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails({ toggleFavorite, isFavorite }) {
  // useParams – extracts :id from the URL path (/property/:id)
  const { id } = useParams();

  // useNavigate – allows programmatic navigation (e.g., go back)
  const navigate = useNavigate();

  // State: holds the fetched property object
  const [property, setProperty] = useState(null);

  // State: loading flag while API call is in progress
  const [loading, setLoading] = useState(true);

  // State: holds error message if fetch fails
  const [error, setError] = useState(null);

  /**
   * useEffect – fetches a single property by its ID from Express backend.
   * Runs whenever the `id` in the URL changes.
   *
   * Data flow: useParams id → fetch /api/properties/:id → Express → setProperty()
   */
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => {
        // If status is not 2xx, throw an error
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then((data) => {
        setProperty(data); // store the property in state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // store error message
        setLoading(false);
      });
  }, [id]); // re-run if :id in URL changes

  // Show loading state
  if (loading) return (
    <div className="loading-spinner"><p>Loading property details...</p></div>
  );

  // Show error state with back button
  if (error) return (
    <div className="error-box">
      <p>❌ {error}</p>
      <button onClick={() => navigate("/properties")} className="btn btn-primary">
        Back to Properties
      </button>
    </div>
  );

  if (!property) return null;

  // Check if this property is currently in favorites (for button state)
  const favorited = isFavorite(property.id);

  return (
    <div className="property-details-page">
      <div className="container">

        {/* Back button – useNavigate(-1) goes to previous page */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* ── HERO IMAGE ── */}
        <div className="details-image-wrapper">
          <img
            src={property.image}
            alt={property.name}
            className="details-image"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop";
            }}
          />
          <span className="details-type-badge">{property.type}</span>
        </div>

        {/* ── TWO-COLUMN LAYOUT: Main Info + Sidebar ── */}
        <div className="details-content">

          {/* ── LEFT: MAIN INFO ── */}
          <div className="details-main">

            {/* Header with name, location, and rent */}
            <div className="details-header">
              <div>
                <h1 className="details-title">{property.name}</h1>
                <p className="details-location">📍 {property.location}</p>
              </div>
              <div className="details-rent-box">
                <span className="details-rent">
                  ₹{property.rent.toLocaleString()}
                </span>
                <span className="per-month">/month</span>
              </div>
            </div>

            {/* Quick info grid: rooms, type, college, distance */}
            <div className="details-meta-grid">
              <div className="meta-item">
                <span className="meta-label">🛏 Rooms</span>
                <span className="meta-value">{property.rooms}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🏠 Type</span>
                <span className="meta-value">{property.type}</span>
              </div>
              {/* MODIFICATION 3 – Nearby college info */}
              <div className="meta-item">
                <span className="meta-label">🎓 Nearby College</span>
                <span className="meta-value">{property.nearbyCollege}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🚶 Distance</span>
                <span className="meta-value">{property.distanceFromCollege}</span>
              </div>
            </div>

            {/* Description */}
            <div className="details-section">
              <h3>About This Property</h3>
              <p className="details-description">{property.description}</p>
            </div>

            {/* Amenities list */}
            <div className="details-section">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-pill">
                    ✅ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <div className="details-sidebar">

            {/* MODIFICATION 1: Favorite Button
                onClick calls toggleFavorite passed from App.jsx via props.
                Text and style change based on whether it's favorited. */}
            <button
              className={`fav-sidebar-btn ${favorited ? "favorited" : ""}`}
              onClick={() => toggleFavorite(property)} // onClick event
            >
              {favorited ? "❤️ Saved to Favorites" : "🤍 Add to Favorites"}
            </button>

            {/* Owner Contact Card */}
            <div className="owner-card">
              <h3>👤 Owner Details</h3>
              <p className="owner-name">{property.ownerName}</p>
              {/* tel: link opens phone dialer */}
              <a href={`tel:${property.contact}`} className="contact-btn">
                📞 {property.contact}
              </a>
            </div>

            {/* MODIFICATION 3: College Info Card */}
            <div className="college-info-card">
              <h3>🎓 Nearby College</h3>
              <p className="college-name">{property.nearbyCollege}</p>
              <p className="college-distance">
                📍 Distance: <strong>{property.distanceFromCollege}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
