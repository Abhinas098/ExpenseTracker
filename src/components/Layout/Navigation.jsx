import { Link } from "react-router-dom";
import "./Navigation.css";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLogin;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/Home">Home</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/expense">Add Expense</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
