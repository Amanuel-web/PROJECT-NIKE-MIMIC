import PropTypes from "prop-types";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import InputBase from "@mui/material/InputBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Menu, MenuList, MenuItem as DropdownMenuItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useUser } from "../providers/UserProvider";
import "../css/navBar.css";
import download1 from "../assets/download1.png";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 10, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  fetchFavorites,
  fetchCarts,
  favorites,
  carts,
  setViewLandingPage,
  setView,
  setIsAuthenticated,
}) {
  const { user } = useUser();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [CartsCount, setCartsCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("login");
  };

  useEffect(() => {
    if (user) {
      fetchFavorites(user);
      fetchCarts(user);
    }
  }, [user, fetchFavorites, fetchCarts]);

  useEffect(() => {
    setFavoriteCount(favorites.length);
    setCartsCount(carts.length);
  }, [favorites, carts]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={download1} alt="" id="nike-logo" />
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              sx={{
                color: "white",
                mx: 2,
                "& .MuiTab-root": { fontSize: "1.5rem", color: "white" },
              }}
              onChange={handleChange}
            >
              <Tab label="New Releases" />
              <Tab label="Men" />
              <Tab label="Women" />
              <Tab label="Sale" />
            </Tabs>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show items in cart"
              color="inherit"
              onClick={() => setViewLandingPage("cart")}
            >
              <Badge badgeContent={CartsCount} color="error">
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show favorite items"
              color="inherit"
              onClick={handleClick}
            >
              <Badge badgeContent={favoriteCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuList>
                {favorites.length === 0 ? (
                  <DropdownMenuItem>No favorites yet</DropdownMenuItem>
                ) : (
                  favorites.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={handleClose}>
                      {item.name}
                    </DropdownMenuItem>
                  ))
                )}
              </MenuList>
            </Menu>
          </MenuItem>
          <MenuItem>
            <Tooltip title="Logout" arrow>
              <IconButton
                size="large"
                aria-label="logout"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

SearchAppBar.propTypes = {
  setViewLandingPage: PropTypes.func.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  fetchCarts: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  carts: PropTypes.array.isRequired,
  setView: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};
