import { Link } from "react-router-dom";
import "./RoommateCard.css";

// RoommateCard – Functional Component (Child of RoommateList)
// Receives roommate data and match score via props
function RoommateCard({ roommate, matchScore }) {
  const totalCriteria = 5;
  const percentage = Math.round((matchScore / totalCriteria) * 100);

  return (
    <div className="roommate-card">
      {/* Match Score Badge */}
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

      {/* Profile Image */}
      <img
        src={roommate.image}
        alt={roommate.name}
        className="roommate-avatar"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/100x100?text=👤";
        }}
      />

      {/* Roommate Info */}
      <div className="roommate-info">
        <h3 className="roommate-name">{roommate.name}</h3>
        <p className="roommate-college">🎓 {roommate.college}</p>
        <p className="roommate-location">📍 {roommate.preferredLocation}</p>

        <div className="roommate-tags">
          <span className="tag budget-tag">💰 {roommate.budget}</span>
          <span className="tag sharing-tag">🛏 {roommate.sharingPreference}</span>
          <span className="tag food-tag">🍽 {roommate.foodPreference}</span>
          <span className="tag smoking-tag">
            🚬 Smoking: {roommate.smokingPreference}
          </span>
        </div>

        <p className="roommate-intro">
          {roommate.introduction.substring(0, 100)}...
        </p>

        <Link to={`/roommate/${roommate.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default RoommateCard;
