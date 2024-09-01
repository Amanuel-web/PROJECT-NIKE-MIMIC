import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useUser } from "../providers/UserProvider";
import "../css/welcomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export const Login = ({ setIsAuthenticated, setView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find((user) => user.username === username);

      if (user && user.password === password) {
        setIsAuthenticated(true);
        setView("dashboard");
        setUser(user.id);
        toast.success("Successfully logged in");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log("Error fetching the database:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="overLay-container">
      <div className="login-overlay">
        <h2>Sign in</h2>
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

        <p>Forgot Your Password?</p>

        <button onClick={handleLogin}>Login</button>
      </div>

      <div className="back-to-register">
        <h1>Hello!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button onClick={() => setView("register")}>Sign Up</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};
