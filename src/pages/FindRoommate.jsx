/**
 * FindRoommate.jsx – Find a Roommate Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * ★ MODIFICATION 2 – Find a Roommate Feature ★
 *
 * Functional Component – allows students to enter preferences
 * and find compatible roommates using a simple matching algorithm.
 *
 * How it works:
 *   1. Student fills a form with 7 preference fields
 *   2. On submit, calculateMatchScore() compares preferences with each roommate
 *   3. Each matched criterion adds +1 (max score = 5)
 *   4. Roommates are sorted by score (highest first) and displayed
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - useState (formData, allRoommates, matchedRoommates, matchScores, submitted)
 *   - useEffect (fetch roommates from Express API on mount)
 *   - Controlled Form Inputs (value + onChange for every field)
 *   - Form Handling (onSubmit)
 *   - Event Handling (onChange, onSubmit, onClick)
 *   - Parent–Child (FindRoommate → RoommateList → RoommateCard)
 *   - Props (passing matchScores and roommates to RoommateList)
 */

import { useState, useEffect } from "react";
import RoommateList from "../components/RoommateList";
import "./FindRoommate.css";

/**
 * calculateMatchScore – MODIFICATION 2 Matching Algorithm
 *
 * Compares user preferences against a single roommate profile.
 * Awards +1 point for each matching criterion (max 5 points).
 *
 * Criteria checked:
 *   1. Preferred location matches (+1)
 *   2. Budget range matches (+1)
 *   3. Sharing preference matches (+1)
 *   4. Food preference matches (+1)
 *   5. Smoking preference matches (+1)
 *
 * NOTE: This is plain JavaScript – NO AI, NO machine learning.
 * Simple string comparison only. Easy to explain in viva.
 *
 * @param {Object} userPrefs  – form data submitted by the student
 * @param {Object} roommate   – a roommate profile from the backend
 * @returns {number}          – match score between 0 and 5
 */
function calculateMatchScore(userPrefs, roommate) {
  let score = 0;

  // Criterion 1: Same preferred location?
  if (userPrefs.preferredLocation === roommate.preferredLocation) score += 1;

  // Criterion 2: Same budget range?
  if (userPrefs.budget === roommate.budget) score += 1;

  // Criterion 3: Same sharing preference (Single / 2 Sharing / 3 Sharing)?
  if (userPrefs.sharingPreference === roommate.sharingPreference) score += 1;

  // Criterion 4: Same food preference (Veg / Non-Veg / Both)?
  if (userPrefs.foodPreference === roommate.foodPreference) score += 1;

  // Criterion 5: Same smoking preference (Yes / No)?
  if (userPrefs.smokingPreference === roommate.smokingPreference) score += 1;

  return score; // value between 0 and 5
}

function FindRoommate() {

  /**
   * formData – controlled state for all 7 form fields.
   * Every input's value is tied to this state object.
   * onChange updates the corresponding field via spread operator.
   */
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    preferredLocation: "",
    budget: "",
    sharingPreference: "",
    foodPreference: "",
    smokingPreference: "",
  });

  // State: holds all roommates fetched from Express backend
  const [allRoommates, setAllRoommates] = useState([]);

  // State: holds sorted matched roommates (after form submit)
  const [matchedRoommates, setMatchedRoommates] = useState([]);

  // State: map of { roommateId: score } used to display badges on cards
  const [matchScores, setMatchScores] = useState({});

  // State: controls whether to show the form or the results
  const [submitted, setSubmitted] = useState(false);

  // State: loading flag during matching calculation
  const [loading, setLoading] = useState(false);

  /**
   * useEffect – fetches all roommate profiles from Express backend on mount.
   * Data is stored in allRoommates state (used during matching).
   *
   * Data flow: fetch() → Express GET /api/roommates → setAllRoommates()
   */
  useEffect(() => {
    fetch("http://localhost:5000/api/roommates")
      .then((res) => res.json())
      .then((data) => setAllRoommates(data))
      .catch((err) => console.error("Error fetching roommates:", err));
  }, []); // [] = run once on mount

  /**
   * handleChange – onChange event handler for ALL form inputs.
   * Uses the input's name attribute to update the correct field in formData.
   * e.target.name  → which field (e.g., "budget")
   * e.target.value → the new value
   */
  const handleChange = (e) => {
    // Spread existing formData, then override just the changed field
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * handleSubmit – onSubmit event handler for the form.
   * 1. Prevents default browser form submission (page reload)
   * 2. Runs calculateMatchScore() for every roommate
   * 3. Sorts roommates from highest to lowest score
   * 4. Updates state to show results instead of the form
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    // Step 1: Calculate match score for each roommate
    const scores = {};
    allRoommates.forEach((r) => {
      scores[r.id] = calculateMatchScore(formData, r);
    });

    // Step 2: Sort roommates by score – highest first (best match at top)
    const sorted = [...allRoommates].sort(
      (a, b) => scores[b.id] - scores[a.id]
    );

    // Step 3: Update state to show results
    setMatchScores(scores);       // score map for badges in RoommateCard
    setMatchedRoommates(sorted);  // sorted list for RoommateList
    setSubmitted(true);           // switch from form view to results view
    setLoading(false);
  };

  /**
   * handleReset – onClick handler for "Change Preferences" button.
   * Clears all state and goes back to the form.
   */
  const handleReset = () => {
    setFormData({
      name: "",
      college: "",
      preferredLocation: "",
      budget: "",
      sharingPreference: "",
      foodPreference: "",
      smokingPreference: "",
    });
    setSubmitted(false);
    setMatchedRoommates([]);
    setMatchScores({});
  };

  return (
    <div className="find-roommate-page">

      {/* ── PAGE HERO ── */}
      <div className="roommate-hero">
        <h1>👥 Find a Roommate</h1>
        <p>
          Enter your preferences and we'll match you with compatible
          student roommates in Bengaluru
        </p>
      </div>

      <div className="container">
        {/* Conditional rendering: show form OR results based on submitted state */}
        {!submitted ? (

          /* ══════════════════════════════════════════
             PREFERENCES FORM – shown before submission
             All inputs are CONTROLLED COMPONENTS:
             value tied to formData state, onChange updates it.
             ══════════════════════════════════════════ */
          <div className="form-wrapper">
            <h2>Enter Your Preferences</h2>

            {/* onSubmit event calls handleSubmit */}
            <form onSubmit={handleSubmit} className="roommate-form">

              {/* Name – text input */}
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"             // name attr used in handleChange
                  value={formData.name}   // controlled: tied to state
                  onChange={handleChange} // onChange event
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* College – dropdown */}
              <div className="form-group">
                <label>Your College *</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your college</option>
                  <option value="RV University">RV University</option>
                  <option value="Christ University">Christ University</option>
                  <option value="PES University">PES University</option>
                  <option value="Jain University">Jain University</option>
                  <option value="BMS College of Engineering">BMS College of Engineering</option>
                </select>
              </div>

              {/* Preferred Location – used in Criterion 1 of matching */}
              <div className="form-group">
                <label>Preferred Location *</label>
                <select
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                >
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

              {/* Budget – used in Criterion 2 of matching */}
              <div className="form-group">
                <label>Monthly Budget *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="Below ₹5,000">Below ₹5,000</option>
                  <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                  <option value="₹10,000–₹15,000">₹10,000–₹15,000</option>
                </select>
              </div>

              {/* Sharing Preference – used in Criterion 3 of matching */}
              <div className="form-group">
                <label>Sharing Preference *</label>
                <select
                  name="sharingPreference"
                  value={formData.sharingPreference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select sharing preference</option>
                  <option value="Single">Single</option>
                  <option value="2 Sharing">2 Sharing</option>
                  <option value="3 Sharing">3 Sharing</option>
                </select>
              </div>

              {/* Food Preference – used in Criterion 4 of matching */}
              <div className="form-group">
                <label>Food Preference *</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select food preference</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              {/* Smoking Preference – used in Criterion 5 of matching */}
              <div className="form-group">
                <label>Smoking Preference *</label>
                <select
                  name="smokingPreference"
                  value={formData.smokingPreference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select smoking preference</option>
                  <option value="Yes">Yes – I smoke</option>
                  <option value="No">No – Non-smoker</option>
                </select>
              </div>

              {/* Submit button triggers handleSubmit via onSubmit on form */}
              <button type="submit" className="btn btn-primary find-btn">
                🔍 Find My Roommates
              </button>
            </form>
          </div>

        ) : (

          /* ══════════════════════════════════════════
             RESULTS SECTION – shown after submission
             Passes sorted roommates and scores to RoommateList (child component)
             ══════════════════════════════════════════ */
          <div className="results-section">
            <div className="results-header">
              <h2>
                🎉 Roommate Matches for <span>{formData.name}</span>
              </h2>
              <p>
                Showing {matchedRoommates.length} roommates sorted by best match
              </p>
              {/* onClick resets and shows the form again */}
              <button className="btn btn-outline" onClick={handleReset}>
                ← Change Preferences
              </button>
            </div>

            {/* Parent → Child: RoommateList receives matched data via props */}
            <RoommateList
              roommates={matchedRoommates} // sorted roommate array
              matchScores={matchScores}    // score map for badge display
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FindRoommate;
