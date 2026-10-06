/**
 * FindRoommate.jsx – Find a Roommate Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * ★ MODIFICATION 2 – Find a Roommate Feature ★
 *
 * Functional Component – students enter preferences and get matched roommates.
 *
 * Matching Rules (plain JavaScript – NO AI):
 *   Location match   = +1
 *   Budget match     = +1
 *   Sharing match    = +1
 *   Food match       = +1
 *   Smoking match    = +1
 *   Total possible   = 5  (100%)
 *
 * Only roommates with score >= 3 (60%+) are shown.
 * Roommates sorted highest score first.
 */

import { useState, useEffect } from "react";
import RoommateList from "../components/RoommateList";
import "./FindRoommate.css";

// Minimum match threshold – only show roommates at or above this score
const MATCH_THRESHOLD = 3; // 3/5 = 60%

/**
 * calculateMatchScore
 * Compares 5 preferences between the user's form input and a roommate profile.
 * Returns a score from 0 to 5.
 */
function calculateMatchScore(userPrefs, roommate) {
  let score = 0;
  if (userPrefs.preferredLocation === roommate.preferredLocation) score += 1;
  if (userPrefs.budget === roommate.budget) score += 1;
  if (userPrefs.sharingPreference === roommate.sharingPreference) score += 1;
  if (userPrefs.foodPreference === roommate.foodPreference) score += 1;
  if (userPrefs.smokingPreference === roommate.smokingPreference) score += 1;
  return score;
}

function FindRoommate() {
  // Controlled form state for all 7 preference fields
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    preferredLocation: "",
    budget: "",
    sharingPreference: "",
    foodPreference: "",
    smokingPreference: "",
  });

  const [allRoommates, setAllRoommates]       = useState([]);
  const [matchedRoommates, setMatchedRoommates] = useState([]);
  const [matchScores, setMatchScores]         = useState({});
  const [submitted, setSubmitted]             = useState(false);
  const [noResults, setNoResults]             = useState(false);

  // Fetch all roommates from Express backend once on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/roommates")
      .then((res) => res.json())
      .then((data) => setAllRoommates(data))
      .catch((err) => console.error("Error fetching roommates:", err));
  }, []);

  // Generic onChange for all form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmit – run matching algorithm and filter results
  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Calculate score for every roommate
    const scores = {};
    allRoommates.forEach((r) => {
      scores[r.id] = calculateMatchScore(formData, r);
    });

    // Step 2: Filter to only include roommates at or above 60% threshold
    const qualified = allRoommates.filter(
      (r) => scores[r.id] >= MATCH_THRESHOLD
    );

    // Step 3: Sort qualified roommates highest score first
    const sorted = qualified.sort((a, b) => scores[b.id] - scores[a.id]);

    setMatchScores(scores);
    setMatchedRoommates(sorted);
    setNoResults(sorted.length === 0); // flag for "no matches" message
    setSubmitted(true);
  };

  // Reset form and go back to preference entry
  const handleReset = () => {
    setFormData({
      name: "", college: "", preferredLocation: "",
      budget: "", sharingPreference: "", foodPreference: "", smokingPreference: "",
    });
    setSubmitted(false);
    setMatchedRoommates([]);
    setMatchScores({});
    setNoResults(false);
  };

  return (
    <div className="find-roommate-page">
      <div className="roommate-hero">
        <h1>👥 Find a Roommate</h1>
        <p>Enter your preferences and we'll find compatible student roommates in Bengaluru</p>
      </div>

      <div className="container">
        {!submitted ? (
          /* ── PREFERENCES FORM ── */
          <div className="form-wrapper">
            <h2>Enter Your Preferences</h2>
            <form onSubmit={handleSubmit} className="roommate-form">

              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Enter your name" required />
              </div>

              <div className="form-group">
                <label>Your College *</label>
                <select name="college" value={formData.college} onChange={handleChange} required>
                  <option value="">Select your college</option>
                  <option value="RV University">RV University</option>
                  <option value="Christ University">Christ University</option>
                  <option value="PES University">PES University</option>
                  <option value="Jain University">Jain University</option>
                  <option value="BMS College of Engineering">BMS College of Engineering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Location *</label>
                <select name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} required>
                  <option value="">Select preferred location</option>
                  <option value="Whitefield">Whitefield</option>
                  <option value="Marathahalli">Marathahalli</option>
                  <option value="Electronic City">Electronic City</option>
                  <option value="Yelahanka">Yelahanka</option>
                  <option value="HSR Layout">HSR Layout</option>
                  <option value="BTM Layout">BTM Layout</option>
                  <option value="Rajajinagar">Rajajinagar</option>
                  <option value="RR Nagar">RR Nagar</option>
                </select>
              </div>

              <div className="form-group">
                <label>Monthly Budget *</label>
                <select name="budget" value={formData.budget} onChange={handleChange} required>
                  <option value="">Select budget range</option>
                  <option value="Below ₹5,000">Below ₹5,000</option>
                  <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                  <option value="₹10,000–₹15,000">₹10,000–₹15,000</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sharing Preference *</label>
                <select name="sharingPreference" value={formData.sharingPreference} onChange={handleChange} required>
                  <option value="">Select sharing preference</option>
                  <option value="Single">Single</option>
                  <option value="2 Sharing">2 Sharing</option>
                  <option value="3 Sharing">3 Sharing</option>
                </select>
              </div>

              <div className="form-group">
                <label>Food Preference *</label>
                <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} required>
                  <option value="">Select food preference</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="form-group">
                <label>Smoking Preference *</label>
                <select name="smokingPreference" value={formData.smokingPreference} onChange={handleChange} required>
                  <option value="">Select smoking preference</option>
                  <option value="Yes">Yes – I smoke</option>
                  <option value="No">No – Non-smoker</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary find-btn">
                🔍 Find My Roommates
              </button>
            </form>
          </div>

        ) : (
          /* ── RESULTS SECTION ── */
          <div className="results-section">
            <div className="results-header">
              <h2>
                🎉 Roommate Matches for <span>{formData.name}</span>
              </h2>

              {noResults ? (
                /* No matches above threshold */
                <div className="no-matches-box">
                  <p className="no-match-icon">😕</p>
                  <h3>No close matches found.</h3>
                  <p>
                    None of the roommates matched 60% or more of your preferences.
                    Try changing your location or budget to find better matches.
                  </p>
                </div>
              ) : (
                <p>
                  Found <strong>{matchedRoommates.length}</strong> compatible
                  roommate{matchedRoommates.length > 1 ? "s" : ""} (60%+ match)
                  sorted by best match
                </p>
              )}

              <button className="btn btn-outline" onClick={handleReset}>
                ← Change Preferences
              </button>
            </div>

            {/* Render matched roommates via RoommateList → RoommateCard */}
            {!noResults && (
              <RoommateList
                roommates={matchedRoommates}
                matchScores={matchScores}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindRoommate;
