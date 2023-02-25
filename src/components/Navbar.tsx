import { Link } from "react-router-dom";
import AuthService from "services/AuthService";
import { useContext } from "react";
import { UserContext } from "context/UserContext";

function Navbar() {
  const userContext = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Rental Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="movies" className="nav-link" aria-current="page">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="genres" className="nav-link" aria-current="page">
                Genres
              </Link>
            </li>
            <li className="nav-item">
              <Link to="users" className="nav-link" aria-current="page">
                Users
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {userContext.user ? (
              <>
                <li className="nav-item">
                  <Link
                    to={"users/edit/" + userContext.user.id}
                    className="nav-link btn btn-link"
                  >
                    <span>Hello </span>
                    <strong>{userContext.user.name}</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => {
                      AuthService.logout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
