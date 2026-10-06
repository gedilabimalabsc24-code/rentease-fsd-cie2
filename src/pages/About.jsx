/**
 * About.jsx – About Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * ★ CLASS COMPONENT – CS3301 Requirement ★
 *
 * This is the ONLY class component in the project.
 * All other pages and components are functional components.
 *
 * Why a class component here?
 *   - CS3301 requires at least one class component
 *   - Demonstrates: class syntax, constructor, this.state, setState, render()
 *
 * Features:
 *   - Three tabs: Project Info, Tech Stack, Features
 *   - Tab switching managed via this.state (class component state)
 *   - Lists all three modifications and all React concepts used
 *
 * Class Component Concepts demonstrated:
 *   - class ClassName extends React.Component
 *   - constructor(props) with super(props)
 *   - this.state  (instead of useState hook)
 *   - this.setState() (instead of setState from useState)
 *   - Arrow function as class method (handleTabChange)
 *   - render() method returning JSX
 *   - Event Handling via onClick calling this.handleTabChange
 */

import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

// ── CLASS COMPONENT DECLARATION ──
// Uses 'class' keyword and extends React.Component
class About extends React.Component {

  /**
   * constructor – initialises the component.
   * Must call super(props) first to pass props to React.Component base class.
   * this.state replaces useState() used in functional components.
   */
  constructor(props) {
    super(props); // Required: call parent class constructor

    // this.state holds the component's local state
    // activeTab controls which tab content is currently visible
    this.state = {
      activeTab: "project", // default tab on first render
    };
  }

  /**
   * handleTabChange – class method to switch the active tab.
   * Uses arrow function syntax so `this` is correctly bound.
   * Calls this.setState() to update this.state.activeTab.
   * (Equivalent to setState() from useState in functional components)
   *
   * @param {string} tab – the tab identifier ("project", "tech", "features")
   */
  handleTabChange = (tab) => {
    this.setState({ activeTab: tab }); // triggers re-render with new tab
  };

  /**
   * render() – REQUIRED method in every class component.
   * Returns the JSX to be displayed.
   * Called automatically by React whenever state or props change.
   */
  render() {
    // Destructure activeTab from this.state for cleaner JSX
    const { activeTab } = this.state;

    return (
      <div className="about-page">

        {/* ── PAGE HERO ── */}
        <div className="about-hero">
          <h1>About RentEase</h1>
          <p>A CS3301 Full Stack Development Project</p>
        </div>

        <div className="container">

          {/* ── TAB NAVIGATION ──
              onClick calls this.handleTabChange() which updates this.state.activeTab
              Active tab gets "active" CSS class for visual highlight */}
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

          {/* ── TAB 1: PROJECT INFO ──
              Conditional rendering: only shown when activeTab === "project" */}
          {activeTab === "project" && (
            <div className="tab-content">
              <div className="about-card">
                <h2>🏠 RentEase – Student Rental & Roommate Finder</h2>
                <p>
                  RentEase is a student-focused property rental platform built
                  for the CS3301 Full Stack Development CIE-2 mini project.
                  It helps college students in Bengaluru find affordable rental
                  accommodations, connect with compatible roommates, and
                  discover properties near their colleges.
                </p>

                {/* Project metadata grid */}
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

              {/* Three Modifications Summary */}
              <div className="modifications-section">
                <h2>Custom Modifications</h2>
                <div className="mod-cards">
                  {/* Modification 1 */}
                  <div className="mod-card">
                    <div className="mod-icon">❤️</div>
                    <h3>Modification 1 – Favorites</h3>
                    <p>
                      Users can save properties to a personal Favorites list
                      using the ❤️ heart button on every property card.
                      Managed with React useState in App.jsx.
                    </p>
                  </div>
                  {/* Modification 2 */}
                  <div className="mod-card">
                    <div className="mod-icon">👥</div>
                    <h3>Modification 2 – Find Roommate</h3>
                    <p>
                      Students enter their preferences and a simple JavaScript
                      matching algorithm finds compatible roommates, scoring
                      them out of 5 criteria. No AI used.
                    </p>
                  </div>
                  {/* Modification 3 */}
                  <div className="mod-card">
                    <div className="mod-icon">🎓</div>
                    <h3>Modification 3 – College Finder</h3>
                    <p>
                      Every property shows its nearby college and distance.
                      Students can filter properties by selecting their college
                      from a dropdown or chip buttons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: TECH STACK ──
              Conditional rendering: only shown when activeTab === "tech" */}
          {activeTab === "tech" && (
            <div className="tab-content">
              <h2>Technologies Used</h2>
              <div className="tech-grid">
                {/* Frontend tech */}
                <div className="tech-card frontend">
                  <h3>⚛️ Frontend</h3>
                  <ul>
                    <li>React.js (Vite)</li>
                    <li>React Router DOM</li>
                    <li>useState & useEffect Hooks</li>
                    <li>JSX & CSS</li>
                    <li>Fetch API</li>
                    <li>Responsive CSS Media Queries</li>
                  </ul>
                </div>
                {/* Backend tech */}
                <div className="tech-card backend">
                  <h3>🟩 Backend</h3>
                  <ul>
                    <li>Express.js</li>
                    <li>Node.js</li>
                    <li>CORS Middleware</li>
                    <li>REST API (GET, POST, PUT, DELETE)</li>
                    <li>JavaScript Arrays (No Database)</li>
                  </ul>
                </div>
              </div>

              {/* React Concepts List */}
              <div className="react-concepts">
                <h2>React Concepts Demonstrated</h2>
                <div className="concept-list">
                  {[
                    { icon: "🧩", name: "Components", desc: "Navbar, Footer, PropertyCard, PropertyList, RoommateCard, RoommateList" },
                    { icon: "🏛️", name: "Class Component", desc: "About.jsx – class About extends React.Component with constructor and render()" },
                    { icon: "⚡", name: "Functional Components", desc: "Home, Properties, PropertyDetails, FindRoommate, Favorites, AddProperty" },
                    { icon: "👨‍👦", name: "Parent–Child Components", desc: "Properties → PropertyList → PropertyCard | FindRoommate → RoommateList → RoommateCard" },
                    { icon: "📦", name: "Props", desc: "property, toggleFavorite, isFavorite, matchScore passed between components" },
                    { icon: "🔄", name: "useState", desc: "Favorites, search, filters, form inputs, match results, loading flags" },
                    { icon: "🔁", name: "useEffect", desc: "fetch() from Express backend on component mount in all data pages" },
                    { icon: "🖱️", name: "Event Handling", desc: "onClick (buttons), onChange (inputs/dropdowns), onSubmit (forms)" },
                    { icon: "📝", name: "Form Handling", desc: "AddProperty and FindRoommate use controlled components with value + onChange" },
                    { icon: "🛣️", name: "Client-side Routing", desc: "BrowserRouter, Routes, Route, NavLink, Link, useParams, useNavigate" },
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

          {/* ── TAB 3: FEATURES ──
              Conditional rendering: only shown when activeTab === "features" */}
          {activeTab === "features" && (
            <div className="tab-content">
              <h2>All Features</h2>
              <div className="features-list">
                {[
                  "10 rental properties in Bengaluru with real-world data",
                  "Search properties by name or location",
                  "Filter by college, property type, and max rent",
                  "❤️ Favorites / Wishlist feature (Modification 1)",
                  "👥 Find a Roommate with preference matching (Modification 2)",
                  "🎓 Nearby College Finder for every property (Modification 3)",
                  "Property Details page with owner contact info",
                  "Add new property via form (POST to Express backend)",
                  "10 student roommate profiles with preferences",
                  "Roommate match score displayed as X/5 and percentage",
                  "Mobile-responsive design with CSS media queries",
                  "Full Express.js REST API: GET, POST, PUT, DELETE",
                  "Client-side routing with React Router (no page reloads)",
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
  } // end render()

} // end class About

export default About;
