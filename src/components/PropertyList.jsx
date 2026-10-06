/**
 * PropertyList.jsx – Property List Component
 * CS3301 Full Stack Development – CIE-2 Project
 *
 * Functional Component.
 * PARENT of PropertyCard → CHILD of Properties / Home / Favorites.
 *
 * Demonstrates PARENT–CHILD component hierarchy:
 *   Properties (page)
 *       ↓ passes props
 *   PropertyList  ← THIS COMPONENT
 *       ↓ passes props
 *   PropertyCard (child)
 *
 * Receives data from its parent via PROPS:
 *   @prop {Array}    properties      – array of property objects to display
 *   @prop {Function} toggleFavorite  – favorite toggle handler (passed through)
 *   @prop {Function} isFavorite      – favorite checker (passed through)
 *
 * This component is reused across multiple pages:
 *   - Properties page (all listings)
 *   - Home page (featured listings)
 *   - Favorites page (saved listings)
 */

import PropertyCard from "./PropertyCard";
import "./PropertyList.css";

function PropertyList({ properties, toggleFavorite, isFavorite }) {

  // If no properties match the current filter/search, show a message
  if (!properties || properties.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No properties found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {/*
        Map through each property and render a PropertyCard.
        key={property.id} is required by React for efficient list rendering.
        All three props are passed down to the child PropertyCard component.
      */}
      {properties.map((property) => (
        <PropertyCard
          key={property.id}           // unique key for React's reconciliation
          property={property}          // prop: the property data object
          toggleFavorite={toggleFavorite} // prop: function to toggle favorite
          isFavorite={isFavorite}      // prop: function to check if favorited
        />
      ))}
    </div>
  );
}

export default PropertyList;
