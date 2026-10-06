import { Link } from "react-router-dom";
import "./PropertyCard.css";

// PropertyCard – Functional Component (Child of PropertyList)
// Receives property data and favorite handlers via props
function PropertyCard({ property, toggleFavorite, isFavorite }) {
  const favorited = isFavorite(property.id);

  return (
    <div className="property-card">
      {/* Property Image */}
      <div className="card-image-wrapper">
        <img
          src={property.image}
          alt={property.name}
          className="card-image"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop";
          }}
        />
        <span className="card-type-badge">{property.type}</span>

        {/* Favorite Heart Button – Modification 1 */}
        <button
          className={`favorite-btn ${favorited ? "favorited" : ""}`}
          onClick={() => toggleFavorite(property)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          title={favorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h3 className="card-title">{property.name}</h3>

        <p className="card-location">
          📍 {property.location}
        </p>

        {/* Nearby College – Modification 3 */}
        <p className="card-college">
          🎓 {property.nearbyCollege} &nbsp;|&nbsp; 🚶 {property.distanceFromCollege}
        </p>

        <div className="card-meta">
          <span>🛏 {property.rooms} Room{property.rooms > 1 ? "s" : ""}</span>
          <span className="card-rent">₹{property.rent.toLocaleString()}/mo</span>
        </div>

        {/* Amenities */}
        <div className="card-amenities">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="amenity-tag more">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
