/**
 * PropertyCard.jsx – Property Card Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – CHILD of PropertyList.
 *
 * Receives data from its parent via PROPS:
 *   @prop {Object}   property        – single property data object
 *   @prop {Function} toggleFavorite  – adds/removes property from favorites
 *   @prop {Function} isFavorite      – returns true/false if property is saved
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - Props (property, toggleFavorite, isFavorite)
 *   - Event Handling (onClick for favorite button)
 *   - Conditional rendering (❤️ vs 🤍 based on favorite state)
 *   - React Router Link (View Details button)
 *
 * Modifications covered:
 *   - MODIFICATION 1: ❤️ Favorite heart button
 *   - MODIFICATION 3: Nearby college & distance display
 */

import { Link } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property, toggleFavorite, isFavorite }) {
  // Check if this property is currently in the favorites list
  const favorited = isFavorite(property.id);

  return (
    <div className="property-card">

      {/* ── IMAGE SECTION ── */}
      <div className="card-image-wrapper">
        <img
          src={property.image}
          alt={property.name}
          className="card-image"
          // Fallback image if URL fails to load
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop";
          }}
        />

        {/* Property type badge (PG, 1BHK, Hostel etc.) */}
        <span className="card-type-badge">{property.type}</span>

        {/* ── MODIFICATION 1: FAVORITE HEART BUTTON ──
            onClick calls toggleFavorite passed as prop from parent.
            Changes icon and style based on whether it's favorited. */}
        <button
          className={`favorite-btn ${favorited ? "favorited" : ""}`}
          onClick={() => toggleFavorite(property)} // Event: onClick
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          title={favorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          {/* Conditional rendering: filled heart if favorited, empty if not */}
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>

      {/* ── CARD BODY ── */}
      <div className="card-body">
        {/* Property name */}
        <h3 className="card-title">{property.name}</h3>

        {/* Location – received via props from property object */}
        <p className="card-location">📍 {property.location}</p>

        {/* ── MODIFICATION 3: NEARBY COLLEGE & DISTANCE ──
            Every property object has nearbyCollege and distanceFromCollege fields */}
        <p className="card-college">
          🎓 {property.nearbyCollege} &nbsp;|&nbsp; 🚶 {property.distanceFromCollege}
        </p>

        {/* Rooms and rent displayed side by side */}
        <div className="card-meta">
          <span>🛏 {property.rooms} Room{property.rooms > 1 ? "s" : ""}</span>
          {/* Monthly rent formatted with Indian number system */}
          <span className="card-rent">₹{property.rent.toLocaleString()}/mo</span>
        </div>

        {/* ── AMENITIES ── Show first 3 only to keep card compact */}
        <div className="card-amenities">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
          {/* Show "+N more" if there are more than 3 amenities */}
          {property.amenities.length > 3 && (
            <span className="amenity-tag more">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* ── VIEW DETAILS BUTTON ──
            React Router Link navigates to /property/:id without page reload */}
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
