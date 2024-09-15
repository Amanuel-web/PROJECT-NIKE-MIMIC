import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../css/landing-page.css";
import { useUser } from "../providers/UserProvider";
import {
  createFavorite,
  getFavorite,
  removeFavorite,
  addToCart,
  getACart,
  removeFromCart,
} from "../api";
import { fetchShoes, nextShoe, prevShoe } from "../redux/shoeSlice";
import { shoePictures } from "../shoePictures";

export default function LandingPage({
  setViewLandingPage,
  setCurrentShoe,
  fetchFavorites,
  fetchCarts,
  favorites,
  carts,
}) {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoes.list);
  const currentIndex = useSelector((state) => state.shoes.currentIndex);
  const status = useSelector((state) => state.shoes.status);
  const error = useSelector((state) => state.shoes.error);
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const currentShoe = shoes[currentIndex];
  const userId = user ? user : null;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchShoes());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (currentShoe) {
      setIsFavorite(
        Array.isArray(favorites) &&
          favorites.some(
            (favorite) =>
              favorite.userId === userId && favorite.shoeId === currentShoe.id
          )
      );
      setIsAddedToCart(
        Array.isArray(carts) &&
          carts.some(
            (cart) => cart.userId === userId && cart.shoeId === currentShoe.id
          )
      );
    }
  }, [favorites, carts, currentShoe, userId]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  if (!shoes || shoes.length === 0) {
    return <Typography>No shoes available</Typography>;
  }

  const handleDetailsClick = () => {
    setCurrentShoe(currentShoe);
    setViewLandingPage("productDetail");
  };

  const handleFavoriteToggle = async () => {
    try {
      const allFavorite = await getFavorite({ userId: userId });

      const matchingFavorite = allFavorite.find(
        (fav) => fav.userId === userId && fav.shoeId === currentShoe.id
      );

      if (!matchingFavorite) {
        await createFavorite(userId, currentShoe.id, currentShoe.name);
      } else {
        await removeFavorite({ favoriteId: matchingFavorite.id });
      }

      await fetchFavorites(userId);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleCartToggle = async () => {
    try {
      const allAddedCart = await getACart({ userId });
      const matchingCart = allAddedCart.find(
        (cart) => cart.userId === userId && cart.shoeId === currentShoe.id
      );

      if (!matchingCart) {
        await addToCart(
          userId,
          currentShoe.id,
          currentShoe.name,
          currentShoe.price
        );
      } else {
        await removeFromCart({ cartId: matchingCart.id });
      }

      await fetchCarts(userId);
    } catch (error) {
      console.error("Error toggling cart:", error);
    }
  };

  return (
    <>
      <div className="landing-page-container">
        <div className="main-landing-page">
          <Button
            id="back-arrow"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                ".MuiSvgIcon-root": {
                  fontSize: "5rem",
                  fontWeight: "1rem",
                  color: "rgba(10, 10, 10, 0.5)",
                },
              },
              ".MuiSvgIcon-root": {
                fontSize: "2rem",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              dispatch(prevShoe());
              fetchFavorites(user);
              fetchCarts(user);
            }}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            id="frw-arrow"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                ".MuiSvgIcon-root": {
                  fontSize: "5rem",
                  fontWeight: "1rem",
                  color: "rgba(10, 10, 10, 0.5)",
                },
              },
              ".MuiSvgIcon-root": {
                fontSize: "2rem",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              dispatch(nextShoe());
              fetchFavorites(user);
              fetchCarts(user);
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
          <div id="shoe-detail">
            <Typography
              variant="h4"
              sx={{
                mx: 2,
                padding: "0",
                margin: "10px 0 0 0",
                background: `linear-gradient(90deg, ${currentShoe.color}, #30cfd0)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ${currentShoe.price}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mx: 2,
                fontWeight: "bold",
                fontSize: 60,
                padding: "0",
                margin: "0",
                background: `linear-gradient(90deg, ${currentShoe.color}, #30cfd0)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0px 0px 0p rgba(255, 255, 255, 0.2)",
              }}
            >
              {currentShoe.name}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mx: 2,
                padding: "0",
                margin: "10px 0 0 0",
                fontWeight: "bold",
                background: `linear-gradient(90deg, ${currentShoe.color}, #30cfd0)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentShoe.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mx: 2,
                padding: "0",
                margin: "10px 0 0 0",
              }}
            >
              Shipping
            </Typography>
            <Typography
              sx={{ padding: "0", margin: "0 0 10px 0", color: "#677788" }}
            >
              To get accurate shipping price edit location
            </Typography>
            <div className="action-buttons">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartSharpIcon />}
                  sx={{
                    padding: "17px 40px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    border: "1 solid white",
                    backgroundColor: "30cfd0",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.05)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontSize: "15px",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      letterSpacing: "3px",
                      backgroundColor: "hsl(261deg 80% 48%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0px 7px 29px 0px rgb(93, 24, 220)",
                    },
                    "&:active": {
                      letterSpacing: "3px",
                      backgroundColor: "hsl(261deg 80% 48%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0px 0px 0px 0px rgb(93, 24, 220)",
                      transform: "translateY(10px)",
                      transition: "100ms",
                    },
                  }}
                  onClick={handleCartToggle}
                >
                  {isAddedToCart ? "Remove From Cart" : "Add To Cart"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  sx={{
                    padding: "17px 40px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    border: "0",
                    backgroundColor: "white",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.05)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontSize: "15px",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      letterSpacing: "3px",
                      backgroundColor: "hsl(261deg 80% 48%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0px 7px 29px 0px rgb(93, 24, 220)",
                    },
                    "&:active": {
                      letterSpacing: "3px",
                      backgroundColor: "hsl(261deg 80% 48%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0px 0px 0px 0px rgb(93, 24, 220)",
                      transform: "translateY(10px)",
                      transition: "100ms",
                    },
                  }}
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? "Remove Favorite" : "Favorite"}
                </Button>
              </Stack>
            </div>
          </div>
          <div className="shoe-container">
            <img
              id="shoe1"
              src={shoePictures[currentShoe.image]}
              alt={currentShoe.name}
            />
          </div>
        </div>
        <div
          className="detail-button"
          style={{
            backgroundColor: "#000",
            padding: "20px",
            marginTop: "150px",
            maxWidth: "100%",
          }}
        >
          <Button
            id="down-arrow"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "rgb(20, 20, 20)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 0px 4px rgba(180, 160, 255, 0.253)",
              cursor: "pointer",
              transitionDuration: "0.3s",
              overflow: "hidden",
              position: "relative",
              "&:hover": {
                width: "140px",
                borderRadius: "50px",
                backgroundColor: "rgb(181, 160, 255)",
              },
              "& .MuiSvgIcon-root": {
                width: "30px",
                transitionDuration: "0.3s",
                "& path": {
                  fill: "white",
                },
              },
              "&:hover .MuiSvgIcon-root": {
                transform: "translateY(-200%)",
              },
              "&::before": {
                position: "absolute",
                content: '"Product Details"',
                color: "white",
                fontSize: "0px",
                transitionDuration: "0.3s",
              },
              "&:hover::before": {
                fontSize: "15px",
                opacity: 1,
                bottom: "unset",
              },
            }}
            onClick={handleDetailsClick}
          >
            <ArrowDownwardIcon />
          </Button>
        </div>
      </div>
      <img id="glow" src={shoePictures[currentShoe.bgColor]} alt="" />
    </>
  );
}

LandingPage.propTypes = {
  setViewLandingPage: PropTypes.func.isRequired,
  setCurrentShoe: PropTypes.func.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  fetchCarts: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  carts: PropTypes.array,
};
