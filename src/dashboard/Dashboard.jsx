import PropTypes from "prop-types";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SearchAppBar from "./NavBar";
import LandingPage from "./LandingPage";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import "../css/transitions.css";

export const Dashboard = ({ setView, setIsAuthenticated }) => {
  const [viewLandingPage, setViewLandingPage] = useState("landingPage");
  const [currentShoe, setCurrentShoe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [carts, setAddToCart] = useState([]);

  const fetchFavorites = async (userId) => {
    if (userId) {
      try {
        const responseFavorite = await fetch(
          `http://localhost:3000/favorites?userId=${userId}`
        );
        const dataOfFavorite = await responseFavorite.json();

        setFavorites(dataOfFavorite);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  const fetchCarts = async (userId) => {
    if (userId) {
      try {
        const responseCarts = await fetch(
          `http://localhost:3000/carts?userId=${userId}`
        );
        const dataOfCarts = await responseCarts.json();

        setAddToCart(dataOfCarts);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  return (
    <TransitionGroup>
      <CSSTransition key={viewLandingPage} timeout={300} classNames="fade">
        <div>
          {viewLandingPage !== "cart" && (
            <SearchAppBar
              fetchFavorites={fetchFavorites}
              fetchCarts={fetchCarts}
              favorites={favorites}
              carts={carts}
              setViewLandingPage={setViewLandingPage}
              setView={setView}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
          {viewLandingPage === "landingPage" && (
            <LandingPage
              setViewLandingPage={setViewLandingPage}
              setCurrentShoe={setCurrentShoe}
              fetchFavorites={fetchFavorites}
              fetchCarts={fetchCarts}
              favorites={favorites}
              carts={carts}
            />
          )}
          {viewLandingPage === "productDetail" && (
            <ProductDetail
              setViewLandingPage={setViewLandingPage}
              currentShoe={currentShoe}
            />
          )}
          {viewLandingPage === "cart" && (
            <Checkout setViewLandingPage={setViewLandingPage} />
          )}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

Dashboard.propTypes = {
  setView: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
