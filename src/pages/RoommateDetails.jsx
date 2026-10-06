/**
 * RoommateDetails.jsx – Roommate Profile Details Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – shows full profile of a single roommate.
 *
 * How it works:
 *   1. useParams() reads :id from the URL (e.g., /roommate/3 → id = "3")
 *   2. useEffect fetches that specific roommate from Express GET /api/roommates/:id
 *   3. Displays full profile: avatar, preferences grid, introduction
 *   4. "Send Message" button simulates contact action
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - useParams (extract :id from URL)
 *   - useEffect (fetch single roommate from API)
 *   - useState (roommate, loading, error)
 *   - useNavigate (back navigation)
 *   - Event Handling (onClick for back, message, find more)
 *   - Conditional rendering (loading/error/content)
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoommateDetails.css";

function RoommateDetails() {
  // useParams – extracts :id from URL path (/roommate/:id)
  const { id } = useParams();

  // useNavigate – for programmatic navigation
  const navigate = useNavigate();

  // State: holds the fetched roommate profile object
  const [roommate, setRoommate] = useState(null);

  // State: loading flag while API call is pending
  const [loading, setLoading] = useState(true);

  // State: error message if the API call fails
  const [error, setError] = useState(null);

  /**
   * useEffect – fetches a single roommate by ID from Express backend.
   * Re-runs if the :id URL parameter changes.
   *
   * Data flow: useParams id → fetch /api/roommates/:id → Express → setRoommate()
   */
  useEffect(() => {
    fetch(`http://localhost:5000/api/roommates/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Roommate not found");
        return res.json();
      })
      .then((data) => {
        setRoommate(data); // store fetched profile in state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // dependency: re-fetch if id changes

  // Conditional rendering: show spinner while loading
  if (loading) return (
    <div className="loading-spinner"><p>Loading profile...</p></div>
  );

  // Conditional rendering: show error if fetch failed
  if (error) return (
    <div className="error-box">
      <p>❌ {error}</p>
      <button onClick={() => navigate("/roommates")} className="btn btn-primary">
        Back
      </button>
    </div>
  );

  if (!roommate) return null;

  return (
    <div className="roommate-details-page">
      <div className="container">

        {/* Back button – navigate(-1) goes to the previous page in history */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="profile-card">

          {/* ── PROFILE HEADER: Avatar + Basic Info ── */}
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
              <p className="profile-location">
                📍 Prefers: {roommate.preferredLocation}
              </p>
            </div>
          </div>

          {/* ── PREFERENCES GRID ──
              Displays all 4 key preferences in a 2-column grid.
              Data comes from the roommate object fetched from API. */}
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

          {/* ── INTRODUCTION TEXT ── */}
          <div className="profile-section">
            <h2>About Me</h2>
            <p className="profile-intro">{roommate.introduction}</p>
          </div>

          {/* ── ACTION BUTTONS ──
              onClick events: one simulates contact, one navigates back to search */}
          <div className="profile-actions">
            <button
              className="btn btn-primary"
              onClick={() => alert(`Contact request sent to ${roommate.name}!`)}
            >
              📩 Send Message
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/roommates")} // navigate to FindRoommate
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
