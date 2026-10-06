import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import FindRoommate from "./pages/FindRoommate";
import RoommateDetails from "./pages/RoommateDetails";
import Favorites from "./pages/Favorites";
import AddProperty from "./pages/AddProperty";
import About from "./pages/About";
import "./App.css";

function App() {
  // useState for Favorites – lifted to App so all pages can access it
  const [favorites, setFavorites] = useState([]);

  // Add or remove property from favorites
  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/properties"
            element={
              <Properties
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/property/:id"
            element={
              <PropertyDetails
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route path="/roommates" element={<FindRoommate />} />
          <Route path="/roommate/:id" element={<RoommateDetails />} />
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
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
