import "./App.css";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "services/AuthService";
import { UserContext } from "context/UserContext";

function App() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    AuthService.getUser((user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Navbar />
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
