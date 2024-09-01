import PropTypes from "prop-types";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Typography from "@mui/material/Typography";
import { shoePictures } from "../shoePictures";
import "../css/productDetail.css";

export default function ProductDetail({ setViewLandingPage, currentShoe }) {
  if (!currentShoe) {
    return <Typography>No shoe details available</Typography>;
  }

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const [size, setSize] = useState("");

  return (
    <>
      <div className="product-detail-container">
        <div className="shoe-detail-container">
          <div className="shoe-detail">
            <Typography
              variant="h2"
              sx={{
                px: 2,
                color: "#ffffff",
              }}
            >
              Select Size:
            </Typography>
            <Box sx={{ minWidth: 120, mb: 8 }}>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                    backgroundColor: "ffffff",
                    zIndex: 10,
                    borderRadius: "4px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "yellow",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0f0",
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size}
                  label="Size"
                  onChange={handleChange}
                >
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              variant="h2"
              sx={{
                px: 2,
                color: "#ffffff",
                marginTop: 2,
              }}
            >
              Select Color:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
                marginTop: "30px",
                backgroundColor: "transparent",
              }}
            >
              <Fab
                sx={{
                  color: "red",
                  backgroundColor: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircleIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {}}
                />
              </Fab>
              <Fab
                sx={{
                  color: "green",
                  backgroundColor: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircleIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Fab>
              <Fab
                sx={{
                  color: "white",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircleIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Fab>
            </Box>
          </div>
          <div className="shoe-image">
            <img
              id="shoe-image2"
              src={shoePictures[currentShoe.detailsImage]}
              alt="Shoes imag goes here"
            />
          </div>
        </div>
        <div className="up-arrow-container">
          <Button
            id="up-arrow"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },

              ".MuiSvgIcon-root": {
                fontSize: "4rem",
                color: "#ffffff",
                fontWeight: 100,
              },
            }}
            onClick={() => setViewLandingPage("landingPage")}
          >
            <ArrowUpwardRoundedIcon />
          </Button>
        </div>
      </div>
      <img id="greenGlow2" src={shoePictures[currentShoe.bgColor]} alt="" />
    </>
  );
}

ProductDetail.propTypes = {
  currentShoe: PropTypes.object.isRequired,
  setViewLandingPage: PropTypes.func.isRequired,
};
