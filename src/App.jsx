/**
 * App.jsx – Root Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * This is the top-level component of RentEase.
 * Responsibilities:
 *   1. Sets up React Router (BrowserRouter) for client-side routing
 *   2. Manages the shared FAVORITES state using useState
 *   3. Passes favorites-related props down to all pages that need them
 *   4. Renders the persistent Navbar and Footer around all pages
 *
 * React Concepts demonstrated here:
 *   - useState (favorites state)
 *   - Props (passing toggleFavorite, isFavorite to child pages)
 *   - React Router (BrowserRouter, Routes, Route)
 *   - Parent-Child component relationship
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Layout components (shown on every page)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page components (each maps to a URL route)
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import FindRoommate from "./pages/FindRoommate";
import RoommateDetails from "./pages/RoommateDetails";
import Favorites from "./pages/Favorites";
import AddProperty from "./pages/AddProperty";

import "./App.css";

function App() {
  /**
   * MODIFICATION 1 – Favorites / Wishlist
   * useState hook: favorites is an array of property objects the user has saved.
   * Stored here in App.jsx (top level) so ALL pages can access the same list.
   */
  const [favorites, setFavorites] = useState([]);

  /**
   * toggleFavorite – adds or removes a property from the favorites list.
   * If the property is already in favorites → remove it (unfavorite).
   * If it is NOT in favorites → add it.
   * This function is passed as a prop to child pages.
   */
  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) {
        // Remove the property from favorites
        return prev.filter((p) => p.id !== property.id);
      } else {
        // Add the property to favorites
        return [...prev, property];
      }
    });
  };

  /**
   * isFavorite – checks if a property (by id) is in the favorites list.
   * Returns true/false. Used to toggle the ❤️ button visual state.
   */
  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    // BrowserRouter enables client-side routing (no page reloads)
    <Router>
      {/* Navbar is always visible at the top of every page */}
      <Navbar />

      {/* main wraps all page content */}
      <main>
        <Routes>
          {/* HOME – Hero section + Featured properties + College filter */}
          <Route
            path="/"
            element={
              <Home toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />

          {/* PROPERTIES – Browse all properties with search + filters */}
          <Route
            path="/properties"
            element={
              <Properties
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />

          {/* PROPERTY DETAILS – Single property page using useParams */}
          <Route
            path="/property/:id"
            element={
              <PropertyDetails
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />

          {/* FIND ROOMMATE – Modification 2: preference form + matching */}
          <Route path="/roommates" element={<FindRoommate />} />

          {/* ROOMMATE DETAILS – Single roommate profile using useParams */}
          <Route path="/roommate/:id" element={<RoommateDetails />} />

          {/* FAVORITES – Modification 1: saved properties list */}
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />

          {/* ADD PROPERTY – Form to submit a new property via POST API */}
          <Route path="/add-property" element={<AddProperty />} />
        </Routes>
      </main>

      {/* Footer is always visible at the bottom of every page */}
      <Footer />
    </Router>
  );
}

export default App;
