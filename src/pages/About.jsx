import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

// Class Component – CS3301 requirement
// About page is implemented as a React Class Component
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "project",
    };
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="about-page">
        {/* Hero */}
        <div className="about-hero">
          <h1>About RentEase</h1>
          <p>A CS3301 Full Stack Development Project</p>
        </div>

        <div className="container">
          {/* Tab Navigation */}
          <div className="about-tabs">
            <button
              className={`tab-btn ${activeTab === "project" ? "active" : ""}`}
              onClick={() => this.handleTabChange("project")}
            >
              Project Info
            </button>
            <button
              className={`tab-btn ${activeTab === "tech" ? "active" : ""}`}
              onClick={() => this.handleTabChange("tech")}
            >
              Tech Stack
            </button>
            <button
              className={`tab-btn ${activeTab === "features" ? "active" : ""}`}
              onClick={() => this.handleTabChange("features")}
            >
              Features
            </button>
          </div>

          {/* Tab: Project Info */}
          {activeTab === "project" && (
            <div className="tab-content">
              <div className="about-card">
                <h2>🏠 RentEase – Student Rental & Roommate Finder</h2>
                <p>
                  RentEase is a student-focused property rental platform built
                  for the CS3301 Full Stack Development CIE-2 mini project. It
                  helps college students in Bengaluru find affordable rental
                  accommodations, connect with compatible roommates, and
                  discover properties near their colleges.
                </p>

                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Subject</span>
                    <span className="info-value">CS3301 – Full Stack Development</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Assessment</span>
                    <span className="info-value">CIE-2 Mini Project</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Project Type</span>
                    <span className="info-value">React + Express Full Stack App</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Modifications</span>
                    <span className="info-value">3 Custom Features</span>
                  </div>
                </div>
              </div>

              <div className="modifications-section">
                <h2>Custom Modifications</h2>
                <div className="mod-cards">
                  <div className="mod-card">
                    <div className="mod-icon">❤️</div>
                    <h3>Modification 1 – Favorites</h3>
                    <p>
                      Users can save properties to a personal Favorites list
                      using the ❤️ heart button on every property card.
                      Managed with React useState.
                    </p>
                  </div>
                  <div className="mod-card">
                    <div className="mod-icon">👥</div>
                    <h3>Modification 2 – Find Roommate</h3>
                    <p>
                      Students enter their preferences and a simple JavaScript
                      matching algorithm finds compatible roommates, scoring
                      them out of 5 criteria.
                    </p>
                  </div>
                  <div className="mod-card">
                    <div className="mod-icon">🎓</div>
                    <h3>Modification 3 – College Finder</h3>
                    <p>
                      Every property shows its nearby college and distance.
                      Students can filter properties by selecting their college
                      from a dropdown.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Tech Stack */}
          {activeTab === "tech" && (
            <div className="tab-content">
              <h2>Technologies Used</h2>
              <div className="tech-grid">
                <div className="tech-card frontend">
                  <h3>⚛️ Frontend</h3>
                  <ul>
                    <li>React.js (Vite)</li>
                    <li>React Router DOM</li>
                    <li>useState & useEffect</li>
                    <li>JSX & CSS</li>
                    <li>Fetch API</li>
                    <li>Responsive CSS</li>
                  </ul>
                </div>
                <div className="tech-card backend">
                  <h3>🟩 Backend</h3>
                  <ul>
                    <li>Express.js</li>
                    <li>Node.js</li>
                    <li>CORS Middleware</li>
                    <li>REST API (GET, POST, PUT, DELETE)</li>
                    <li>JavaScript Arrays (No DB)</li>
                  </ul>
                </div>
              </div>

              <div className="react-concepts">
                <h2>React Concepts Demonstrated</h2>
                <div className="concept-list">
                  {[
                    { icon: "🧩", name: "Components", desc: "Navbar, Footer, PropertyCard, PropertyList, RoommateCard, RoommateList" },
                    { icon: "🏛️", name: "Class Component", desc: "About.jsx uses class About extends React.Component" },
                    { icon: "⚡", name: "Functional Components", desc: "All other pages and components are functional" },
                    { icon: "👨‍👦", name: "Parent-Child Components", desc: "Properties → PropertyList → PropertyCard (props drilling)" },
                    { icon: "📦", name: "Props", desc: "property, toggleFavorite, isFavorite, matchScore passed via props" },
                    { icon: "🔄", name: "useState", desc: "Favorites, search, filters, form inputs, match results" },
                    { icon: "🔁", name: "useEffect", desc: "fetch() from Express API on component mount" },
                    { icon: "🖱️", name: "Event Handling", desc: "onClick, onChange, onSubmit across all pages" },
                    { icon: "📝", name: "Form Handling", desc: "AddProperty and FindRoommate with controlled inputs" },
                    { icon: "🛣️", name: "Client-side Routing", desc: "BrowserRouter, Routes, Route, NavLink, useParams, useNavigate" },
                  ].map((concept) => (
                    <div key={concept.name} className="concept-item">
                      <span className="concept-icon">{concept.icon}</span>
                      <div>
                        <strong>{concept.name}</strong>
                        <p>{concept.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Features */}
          {activeTab === "features" && (
            <div className="tab-content">
              <h2>All Features</h2>
              <div className="features-list">
                {[
                  "10 rental properties in Bengaluru with real-world data",
                  "Search properties by name or location",
                  "Filter by college, property type, and max rent",
                  "❤️ Favorites / Wishlist feature",
                  "👥 Find a Roommate with preference matching",
                  "🎓 Nearby College Finder for every property",
                  "Property Details page with owner contact",
                  "Add new property via form (POST to Express)",
                  "10 student roommate profiles",
                  "Roommate match score (out of 5)",
                  "Mobile-responsive design",
                  "Full Express.js REST API backend",
                  "Client-side routing with React Router",
                ].map((feature, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-check">✅</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Link to="/properties" className="btn btn-primary">
                  Explore Properties
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default About;
