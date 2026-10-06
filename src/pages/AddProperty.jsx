import { useState } from "react";
import "./AddProperty.css";

function AddProperty() {
  // useState – controlled form inputs
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rent: "",
    type: "",
    rooms: "",
    description: "",
    amenities: "",
    image: "",
    nearbyCollege: "",
    distanceFromCollege: "",
    ownerName: "",
    contact: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // onChange handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmit – POST to Express backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add property");

      setSuccess(true);
      setLoading(false);
      // Reset form
      setFormData({
        name: "",
        location: "",
        rent: "",
        type: "",
        rooms: "",
        description: "",
        amenities: "",
        image: "",
        nearbyCollege: "",
        distanceFromCollege: "",
        ownerName: "",
        contact: "",
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="add-property-hero">
        <h1>🏠 List Your Property</h1>
        <p>Add your rental property and connect with student tenants</p>
      </div>

      <div className="container">
        <div className="form-wrapper">
          {/* Success Message */}
          {success && (
            <div className="success-banner">
              ✅ Property listed successfully! Students can now find your
              property.
              <button
                className="btn btn-outline"
                onClick={() => setSuccess(false)}
              >
                Add Another Property
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-banner">
              ❌ {error}. Make sure the backend server is running.
            </div>
          )}

          <form onSubmit={handleSubmit} className="add-property-form">
            <h2>Property Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Property Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Cozy Studio near RV University"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select location</option>
                  <option value="Whitefield, Bengaluru">Whitefield</option>
                  <option value="Marathahalli, Bengaluru">Marathahalli</option>
                  <option value="Electronic City, Bengaluru">Electronic City</option>
                  <option value="Yelahanka, Bengaluru">Yelahanka</option>
                  <option value="HSR Layout, Bengaluru">HSR Layout</option>
                  <option value="BTM Layout, Bengaluru">BTM Layout</option>
                  <option value="Rajajinagar, Bengaluru">Rajajinagar</option>
                  <option value="RR Nagar, Bengaluru">RR Nagar</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Monthly Rent (₹) *</label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="e.g. 8000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Property Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Studio">Studio</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Shared Apartment">Shared Apartment</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of Rooms *</label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property, surroundings, rules..."
                rows="4"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Amenities (comma separated)</label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="WiFi, AC, Parking, Washing Machine"
              />
            </div>

            <h2>College Proximity</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Nearby College *</label>
                <select
                  name="nearbyCollege"
                  value={formData.nearbyCollege}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select nearby college</option>
                  <option value="RV University">RV University</option>
                  <option value="Christ University">Christ University</option>
                  <option value="PES University">PES University</option>
                  <option value="Jain University">Jain University</option>
                  <option value="BMS College of Engineering">BMS College of Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Distance from College *</label>
                <input
                  type="text"
                  name="distanceFromCollege"
                  value={formData.distanceFromCollege}
                  onChange={handleChange}
                  placeholder="e.g. 1.5 km"
                  required
                />
              </div>
            </div>

            <h2>Owner Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "🚀 List My Property"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
