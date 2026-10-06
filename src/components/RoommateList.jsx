import RoommateCard from "./RoommateCard";
import "./RoommateList.css";

// RoommateList – Functional Component (Child of FindRoommate, Parent of RoommateCard)
// Receives roommate data with match scores via props
function RoommateList({ roommates, matchScores }) {
  if (!roommates || roommates.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No roommates found. Try different preferences.</p>
      </div>
    );
  }

  return (
    <div className="roommate-grid">
      {roommates.map((roommate) => (
        <RoommateCard
          key={roommate.id}
          roommate={roommate}
          matchScore={matchScores ? matchScores[roommate.id] : undefined}
        />
      ))}
    </div>
  );
}

export default RoommateList;
