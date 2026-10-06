import PropertyCard from "./PropertyCard";
import "./PropertyList.css";

// PropertyList – Functional Component (Child of Properties/Home, Parent of PropertyCard)
// Receives properties array and handlers as props
function PropertyList({ properties, toggleFavorite, isFavorite }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No properties found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
}

export default PropertyList;
