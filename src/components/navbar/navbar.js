import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logoutContext } = useContext(UserContext);
  const [listView, setListView] = useState(false);
  let navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    toast.success("Logout succeeds...");
    navigate("/login");
  };

  useEffect(() => {
    if (user && !user.isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <nav class="navbar bg-transparent border-body " data-bs-theme="dark">
        <div className="logo mt-2">
          <img src="/img/logo_Helix.png" width={50}></img>
        </div>
        <div className="nav-content">
          <ul className="gap-1">
            <li className="icon">
              <Link to="/">
                <i class="fa-solid fa-house fa-2x"></i>
              </Link>
            </li>
            <li className="icon">
              <Link to="/search">
                <i class="fa-solid fa-magnifying-glass fa-2x"></i>
              </Link>
            </li>
            <li className="icon">
              <Link to="/">
                <i class="fa-solid fa-pen-to-square fa-2x"></i>
              </Link>
            </li>
            <li className="icon">
              <Link to="/">
                <i class="fa-solid fa-heart fa-2x"></i>
              </Link>
            </li>
            <li className="icon">
              <Link to="/profile">
                <i class="fa-solid fa-user fa-2x"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="setting mb-3">
          <i
            class="fa-solid fa-bars icon fa-2x"
            onClick={() => setListView(!listView)}
          ></i>
          <div className={listView ? "list-view" : "hide-list-view"}>
            <ul>
              <li>For you</li>
              <li onClick={() => logout()}>
                <p>Log out</p>
                <i class="fa-solid fa-right-from-bracket"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
