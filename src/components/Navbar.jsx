/**
 * Navbar.jsx – Navigation Bar Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – displayed on every page.
 *
 * Features:
 *   - RentEase logo/brand linked to home
 *   - Navigation links using NavLink (highlights active route)
 *   - Search bar that navigates to /properties with query param
 *   - Hamburger menu for mobile responsive layout
 *
 * React Concepts used:
 *   - Functional Component
 *   - useState (menuOpen, searchTerm)
 *   - Event Handling (onClick, onChange, onSubmit)
 *   - useNavigate (programmatic navigation after search)
 *   - NavLink with active class detection
 */

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Controls whether the mobile hamburger menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Controlled input for the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // useNavigate hook – programmatically redirects to /properties with search query
  const navigate = useNavigate();

  /**
   * handleSearch – triggered on search form submit (onSubmit event).
   * Prevents default form reload, then navigates to /properties
   * with the search term as a URL query parameter.
   */
  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    if (searchTerm.trim()) {
      // Navigate to Properties page with ?search=... query
      navigate(`/properties?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // clear the input
      setMenuOpen(false); // close mobile menu
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* ── LOGO ── Link takes user back to Home */}
        <Link to="/" className="navbar-logo">
          🏠 RentEase
        </Link>

        {/* ── NAVIGATION LINKS ──
            NavLink automatically adds "active" class when route matches.
            onClick closes mobile menu when a link is tapped. */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/properties"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/roommates"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Find Roommate
            </NavLink>
          </li>
          <li>
            {/* Favorites link – Modification 1 */}
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              ❤️ Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-property"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Add Property
            </NavLink>
          </li>
        </ul>

        {/* ── SEARCH BAR ──
            Controlled form: value tied to searchTerm state via onChange.
            onSubmit calls handleSearch which navigates to /properties. */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // onChange event
          />
          <button type="submit">🔍</button>
        </form>

        {/* ── HAMBURGER BUTTON ──
            Visible only on mobile (CSS hides it on desktop).
            onClick toggles the menuOpen state to show/hide nav links. */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)} // onClick event
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
