import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <i class="fa-solid fa-bars icon fa-2x"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
