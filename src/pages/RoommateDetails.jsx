import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoommateDetails.css";

function RoommateDetails() {
  const { id } = useParams(); // React Router – useParams
  const navigate = useNavigate();
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect – fetch single roommate from Express
  useEffect(() => {
    fetch(`http://localhost:5000/api/roommates/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Roommate not found");
        return res.json();
      })
      .then((data) => {
        setRoommate(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-spinner"><p>Loading profile...</p></div>;
  if (error) return <div className="error-box"><p>❌ {error}</p><button onClick={() => navigate("/roommates")} className="btn btn-primary">Back</button></div>;
  if (!roommate) return null;

  return (
    <div className="roommate-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-header">
            <img
              src={roommate.image}
              alt={roommate.name}
              className="profile-avatar"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150x150?text=👤";
              }}
            />
            <div className="profile-header-info">
              <h1>{roommate.name}</h1>
              <p className="profile-age">Age: {roommate.age}</p>
              <p className="profile-college">🎓 {roommate.college}</p>
              <p className="profile-location">📍 Prefers: {roommate.preferredLocation}</p>
            </div>
          </div>

          {/* Preferences Grid */}
          <div className="profile-section">
            <h2>Preferences</h2>
            <div className="prefs-grid">
              <div className="pref-item">
                <span className="pref-label">💰 Budget</span>
                <span className="pref-value">{roommate.budget}</span>
              </div>
              <div className="pref-item">
                <span className="pref-label">🛏 Sharing</span>
                <span className="pref-value">{roommate.sharingPreference}</span>
              </div>
              <div className="pref-item">
                <span className="pref-label">🍽 Food</span>
                <span className="pref-value">{roommate.foodPreference}</span>
              </div>
              <div className="pref-item">
                <span className="pref-label">🚬 Smoking</span>
                <span className="pref-value">{roommate.smokingPreference}</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="profile-section">
            <h2>About Me</h2>
            <p className="profile-intro">{roommate.introduction}</p>
          </div>

          {/* Connect Button */}
          <div className="profile-actions">
            <button
              className="btn btn-primary"
              onClick={() => alert(`Contact request sent to ${roommate.name}!`)}
            >
              📩 Send Message
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/roommates")}
            >
              Find More Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoommateDetails;
