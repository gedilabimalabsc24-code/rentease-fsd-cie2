/**
 * Footer.jsx – Footer Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component – displayed at the bottom of every page.
 *
 * Contains:
 *   - Brand name and description
 *   - Quick navigation links
 *   - Nearby colleges list (Modification 3 reference)
 *   - Contact information
 *   - Copyright notice
 */

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ── BRAND SECTION ── */}
        <div className="footer-brand">
          <h2>🏠 RentEase</h2>
          <p>
            Your trusted platform for finding student-friendly rentals and
            roommates in Bengaluru.
          </p>
        </div>

        {/* ── QUICK LINKS ── Uses React Router Link for SPA navigation */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/roommates">Find Roommate</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/add-property">Add Property</Link></li>
          </ul>
        </div>

        {/* ── NEARBY COLLEGES ── (Modification 3 – College Finder) */}
        <div className="footer-colleges">
          <h4>Near Colleges</h4>
          <ul>
            <li>RV University</li>
            <li>Christ University</li>
            <li>PES University</li>
            <li>Jain University</li>
            <li>BMS College of Engineering</li>
          </ul>
        </div>

        {/* ── CONTACT INFO ── */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📧 rentease@student.com</p>
          <p>📞 +91-9876543210</p>
          <p>📍 Bengaluru, Karnataka</p>
        </div>
      </div>

      {/* ── COPYRIGHT BAR ── */}
      <div className="footer-bottom">
        <p>
          © 2024 RentEase – CS3301 Full Stack Development Project | Built with
          React + Express
        </p>
      </div>
    </footer>
  );
}

export default Footer;
