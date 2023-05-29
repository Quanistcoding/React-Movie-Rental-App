import "./App.scss";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "services/AuthService";
import { UserContext } from "context/UserContext";
import firebase from "firebase/auth";

function App() {
  const [user, setUser] = useState<firebase.User | null | undefined>();

  const resetUser = () => {
    setUser(null);
  };

  useEffect(() => {
    AuthService.getUser("app", (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, resetUser }}>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
