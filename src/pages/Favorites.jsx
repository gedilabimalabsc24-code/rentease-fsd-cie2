/**
 * Favorites.jsx – Favorites / Wishlist Page
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * ★ MODIFICATION 1 – Favorites / Wishlist Feature ★
 *
 * Functional Component – displays all properties saved by the user.
 *
 * How it works:
 *   - The favorites array is managed in App.jsx (parent) using useState
 *   - This page receives the array and handler functions as PROPS
 *   - Reuses the same PropertyList → PropertyCard hierarchy to display cards
 *   - User can remove a property by clicking ❤️ again on any card
 *   - Shows a friendly empty state when no favorites are saved
 *
 * React Concepts demonstrated:
 *   - Functional Component
 *   - Props (favorites array, toggleFavorite, isFavorite from App.jsx)
 *   - Conditional rendering (empty state vs. property list)
 *   - Parent–Child (Favorites → PropertyList → PropertyCard)
 *   - React Router Link (Browse Properties button)
 */

import { Link } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Favorites.css";

/**
 * Favorites component receives all props from App.jsx:
 * @prop {Array}    favorites       – array of saved property objects
 * @prop {Function} toggleFavorite  – removes a property when heart clicked
 * @prop {Function} isFavorite      – checks if a property is in favorites
 */
function Favorites({ favorites, toggleFavorite, isFavorite }) {
  return (
    <div className="favorites-page">

      {/* ── PAGE HERO ── */}
      <div className="favorites-hero">
        <h1>❤️ My Favorites</h1>
        <p>Properties you've saved for later</p>
      </div>

      <div className="container">
        {/* ── CONDITIONAL RENDERING ──
            If favorites array is empty → show empty state.
            If it has items → show the property grid. */}
        {favorites.length === 0 ? (

          /* Empty state: shown when no properties have been favorited yet */
          <div className="empty-favorites">
            <div className="empty-icon">🤍</div>
            <h2>No favorites yet!</h2>
            <p>
              Browse properties and click the ❤️ heart button to save them here.
            </p>
            {/* Link to Properties page using React Router */}
            <Link to="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>

        ) : (

          /* Property list: reuses the same PropertyList and PropertyCard components.
             Clicking ❤️ on a card calls toggleFavorite → removes it from favorites. */
          <>
            {/* Show count of saved properties */}
            <p className="fav-count">
              You have <strong>{favorites.length}</strong> saved
              {favorites.length === 1 ? " property" : " properties"}
            </p>

            {/* PropertyList is the child component.
                favorites array is passed as the properties prop.
                toggleFavorite and isFavorite are passed through for ❤️ button. */}
            <PropertyList
              properties={favorites}         // prop: the saved properties list
              toggleFavorite={toggleFavorite} // prop: click ❤️ again to remove
              isFavorite={isFavorite}         // prop: all cards show filled ❤️
            />

            <div className="clear-all-wrapper">
              <p className="clear-note">
                Click ❤️ on any card to remove it from favorites.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
