import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SearchAppBar from "./NavBar";
import LandingPage from "./LandingPage";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import "../css/transitions.css";
import { getACart, getFavorite } from "../api";

export const Dashboard = ({ setView, setIsAuthenticated }) => {
  const [viewLandingPage, setViewLandingPage] = useState("landingPage");
  const [currentShoe, setCurrentShoe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [carts, setAddToCart] = useState([]);

  const fetchFavorites = useCallback(async (userId) => {
    if (userId) {
      try {
        const dataOfFavorite = await getFavorite({ userId });

        setFavorites(dataOfFavorite);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }, []);

  const fetchCarts = useCallback(async (userId) => {
    if (userId) {
      try {
        const dataOfCarts = await getACart({ userId });

        await setAddToCart(dataOfCarts);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition key={viewLandingPage} timeout={300} classNames="fade">
        <div>
          {viewLandingPage !== "cart" && (
            <SearchAppBar
              fetchFavorites={fetchFavorites}
              fetchCarts={fetchCarts}
              favorites={favorites}
              carts={carts || []}
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
