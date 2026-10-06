/**
 * RoommateList.jsx – Roommate List Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component.
 * PARENT of RoommateCard → CHILD of FindRoommate page.
 *
 * Demonstrates PARENT–CHILD component hierarchy:
 *   FindRoommate (page)
 *       ↓ passes props
 *   RoommateList  ← THIS COMPONENT
 *       ↓ passes props
 *   RoommateCard (child)
 *
 * Receives data from its parent via PROPS:
 *   @prop {Array}  roommates    – array of roommate objects (sorted by score)
 *   @prop {Object} matchScores  – map of { roommateId: score } from algorithm
 */

import RoommateCard from "./RoommateCard";
import "./RoommateList.css";

function RoommateList({ roommates, matchScores }) {

  // If no roommates to show, display a friendly message
  if (!roommates || roommates.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No roommates found. Try different preferences.</p>
      </div>
    );
  }

  return (
    <div className="roommate-grid">
      {/*
        Map through each roommate and render a RoommateCard.
        matchScores[roommate.id] looks up the match score for this specific roommate.
        Both roommate object and score are passed as props to RoommateCard.
      */}
      {roommates.map((roommate) => (
        <RoommateCard
          key={roommate.id}                          // unique key for React
          roommate={roommate}                        // prop: roommate data
          matchScore={matchScores ? matchScores[roommate.id] : undefined} // prop: score
        />
      ))}
    </div>
  );
}

export default RoommateList;
