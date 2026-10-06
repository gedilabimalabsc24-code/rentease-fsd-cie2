/**
 * RoommateCard.jsx – Roommate Card Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – CHILD of RoommateList.
 *
 * Receives data from its parent via PROPS:
 *   @prop {Object} roommate    – single roommate profile object
 *   @prop {number} matchScore  – score out of 5 from the matching algorithm
 *
 * Features:
 *   - Displays profile image, name, college, location
 *   - Shows preferences as colour-coded tags
 *   - Shows match score badge (MODIFICATION 2)
 *   - Link to full profile page via React Router
 *
 * React Concepts:
 *   - Functional Component
 *   - Props (roommate, matchScore)
 *   - Conditional rendering (badge colour based on score)
 */

import { Link } from "react-router-dom";
import "./RoommateCard.css";

function RoommateCard({ roommate, matchScore }) {
  // Total criteria used in matching (location, budget, sharing, food, smoking)
  const totalCriteria = 5;

  // Convert score to percentage for display  e.g. 4/5 → 80%
  const percentage = Math.round((matchScore / totalCriteria) * 100);

  return (
    <div className="roommate-card">

      {/* ── MODIFICATION 2: MATCH SCORE BADGE ──
          Only shown when matchScore is provided (i.e., after form submission).
          CSS class changes colour based on match quality:
            ≥80% → green (high-match)
            ≥60% → yellow (medium-match)
            <60% → red (low-match) */}
      {matchScore !== undefined && (
        <div
          className={`match-badge ${
            percentage >= 80
              ? "high-match"
              : percentage >= 60
              ? "medium-match"
              : "low-match"
          }`}
        >
          {matchScore}/{totalCriteria} Matched ({percentage}%)
        </div>
      )}

      {/* ── PROFILE AVATAR ── */}
      <img
        src={roommate.image}
        alt={roommate.name}
        className="roommate-avatar"
        // Fallback if image URL fails
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/100x100?text=👤";
        }}
      />

      {/* ── ROOMMATE INFO ── all data comes via props from parent */}
      <div className="roommate-info">
        <h3 className="roommate-name">{roommate.name}</h3>
        <p className="roommate-college">🎓 {roommate.college}</p>
        <p className="roommate-location">📍 {roommate.preferredLocation}</p>

        {/* ── PREFERENCE TAGS ── styled differently per category */}
        <div className="roommate-tags">
          <span className="tag budget-tag">💰 {roommate.budget}</span>
          <span className="tag sharing-tag">🛏 {roommate.sharingPreference}</span>
          <span className="tag food-tag">🍽 {roommate.foodPreference}</span>
          <span className="tag smoking-tag">
            🚬 Smoking: {roommate.smokingPreference}
          </span>
        </div>

        {/* Show first 100 characters of introduction */}
        <p className="roommate-intro">
          {roommate.introduction.substring(0, 100)}...
        </p>

        {/* Link navigates to full roommate profile at /roommate/:id */}
        <Link to={`/roommate/${roommate.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default RoommateCard;
