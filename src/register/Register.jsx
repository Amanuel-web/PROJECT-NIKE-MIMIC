import { useState } from "react";
import toast from "react-hot-toast";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { Request } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export const Register = ({ setView, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await Request.postUser({ username, password });
      setIsAuthenticated(true);
      setView("dashboard");
      toast.success("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Alert severity="warning">
        Warning this page is not secure please <strong>DO NOT</strong> use real
        info
      </Alert>
      ;
      <div className="overLay-container">
        <div className="back-to-login">
          <h1>Welcome Back!</h1>
          <p>To Keep connected with us please login with your personal info</p>
          <button onClick={() => setView("login")}>Back To Login</button>
        </div>
        <div className="register-overlay">
          <h2>Create Account</h2>
          <div className="social-container">
            <a href="#" className="social">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <p>or use your accounts</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </>
  );
};
Register.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};
