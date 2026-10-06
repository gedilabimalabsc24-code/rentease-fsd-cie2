import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails({ toggleFavorite, isFavorite }) {
  const { id } = useParams(); // React Router – useParams
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect – fetch single property from Express
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-spinner"><p>Loading property details...</p></div>;
  if (error) return <div className="error-box"><p>❌ {error}</p><button onClick={() => navigate("/properties")} className="btn btn-primary">Back to Properties</button></div>;
  if (!property) return null;

  const favorited = isFavorite(property.id);

  return (
    <div className="property-details-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Hero Image */}
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

        <div className="details-content">
          {/* Left: Main Info */}
          <div className="details-main">
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

            {/* Quick Info */}
            <div className="details-meta-grid">
              <div className="meta-item">
                <span className="meta-label">🛏 Rooms</span>
                <span className="meta-value">{property.rooms}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🏠 Type</span>
                <span className="meta-value">{property.type}</span>
              </div>
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

            {/* Amenities */}
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

          {/* Right: Sidebar */}
          <div className="details-sidebar">
            {/* Favorite Button – Modification 1 */}
            <button
              className={`fav-sidebar-btn ${favorited ? "favorited" : ""}`}
              onClick={() => toggleFavorite(property)}
            >
              {favorited ? "❤️ Saved to Favorites" : "🤍 Add to Favorites"}
            </button>

            {/* Owner Info */}
            <div className="owner-card">
              <h3>👤 Owner Details</h3>
              <p className="owner-name">{property.ownerName}</p>
              <a href={`tel:${property.contact}`} className="contact-btn">
                📞 {property.contact}
              </a>
            </div>

            {/* College Info – Modification 3 */}
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
