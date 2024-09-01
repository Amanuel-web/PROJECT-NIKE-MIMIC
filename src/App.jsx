import { useState } from "react";
import "./App.css";
import { Login } from "./login/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { Register } from "./register/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("login");

  return (
    <div>
      <Toaster />
      {view === "login" && !isAuthenticated && (
        <Login setIsAuthenticated={setIsAuthenticated} setView={setView} />
      )}
      {view === "register" && (
        <Register setIsAuthenticated={setIsAuthenticated} setView={setView} />
      )}
      {isAuthenticated && view === "dashboard" && (
        <Dashboard setView={setView} setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
