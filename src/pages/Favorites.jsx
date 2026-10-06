import { Link } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import "./Favorites.css";

// Favorites page – Modification 1 (Favorites / Wishlist)
function Favorites({ favorites, toggleFavorite, isFavorite }) {
  return (
    <div className="favorites-page">
      <div className="favorites-hero">
        <h1>❤️ My Favorites</h1>
        <p>Properties you've saved for later</p>
      </div>

      <div className="container">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">🤍</div>
            <h2>No favorites yet!</h2>
            <p>
              Browse properties and click the ❤️ heart button to save them
              here.
            </p>
            <Link to="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <p className="fav-count">
              You have <strong>{favorites.length}</strong> saved
              {favorites.length === 1 ? " property" : " properties"}
            </p>

            {/* PropertyList receives favorites as props (parent-child) */}
            <PropertyList
              properties={favorites}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
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
