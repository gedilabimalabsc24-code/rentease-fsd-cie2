import { useState, useEffect } from "react";
import RoommateList from "../components/RoommateList";
import "./FindRoommate.css";

// Simple matching function – CS3301 requirement (plain JavaScript, no AI)
// Compares user preferences against each roommate profile
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
  // Form state – useState for controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    preferredLocation: "",
    budget: "",
    sharingPreference: "",
    foodPreference: "",
    smokingPreference: "",
  });

  const [allRoommates, setAllRoommates] = useState([]);
  const [matchedRoommates, setMatchedRoommates] = useState([]);
  const [matchScores, setMatchScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect – fetch roommates from Express backend
  useEffect(() => {
    fetch("http://localhost:5000/api/roommates")
      .then((res) => res.json())
      .then((data) => setAllRoommates(data))
      .catch((err) => console.error("Error fetching roommates:", err));
  }, []);

  // onChange handler for all form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmit handler – runs matching algorithm
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Calculate match scores for all roommates
    const scores = {};
    allRoommates.forEach((r) => {
      scores[r.id] = calculateMatchScore(formData, r);
    });

    // Sort roommates by match score (highest first)
    const sorted = [...allRoommates].sort(
      (a, b) => scores[b.id] - scores[a.id]
    );

    setMatchScores(scores);
    setMatchedRoommates(sorted);
    setSubmitted(true);
    setLoading(false);
  };

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
      <div className="roommate-hero">
        <h1>👥 Find a Roommate</h1>
        <p>
          Enter your preferences and we'll match you with compatible
          student roommates in Bengaluru
        </p>
      </div>

      <div className="container">
        {!submitted ? (
          /* ── PREFERENCES FORM ── */
          <div className="form-wrapper">
            <h2>Enter Your Preferences</h2>
            <form onSubmit={handleSubmit} className="roommate-form">
              {/* Name */}
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* College */}
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

              {/* Preferred Location */}
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

              {/* Budget */}
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

              {/* Sharing Preference */}
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

              {/* Food Preference */}
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

              {/* Smoking Preference */}
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
              <p>
                Showing {matchedRoommates.length} roommates sorted by best
                match
              </p>
              <button className="btn btn-outline" onClick={handleReset}>
                ← Change Preferences
              </button>
            </div>

            {/* Pass to RoommateList → RoommateCard (Parent → Child hierarchy) */}
            <RoommateList
              roommates={matchedRoommates}
              matchScores={matchScores}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FindRoommate;
