import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ views, handlePinToggle, pinnedViews }) => {
  const { user, logoutContext } = useContext(UserContext);
  const [listView, setListView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPinMenu, setShowPinMenu] = useState(false); // State để điều khiển hiển thị menu
  let navigate = useNavigate();

  const changeMode = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  };

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

  useEffect(() => {
    changeMode();
  }, [darkMode]);

  return (
    <>
      <nav class="navbar bg-transparent border-body " data-bs-theme="dark">
        <a href="/">
          <div className="logo mt-2">
            <img src="/img/logo_Helix.png" width={50}></img>
          </div>
        </a>

        {user && user.account.is_admin === true ? (
          <>
            <div className="nav-content">
              <ul className="gap-1">
                <li className="icon">
                  <Link to="/admin">
                    <i class="fa-solid fa-house fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/user">
                    <i class="fa-solid fa-user fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/posts">
                    <i class="fa-solid fa-pen-to-square fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/comments">
                    <i class="fa-regular fa-comment fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/dash-board">
                    <i class="fa-solid fa-chart-line fa-2x"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
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
                  <Link to="/new-thread">
                    <i class="fa-solid fa-pen-to-square fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/notification">
                    <i class="fa-solid fa-heart fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link to="/profile">
                    <i class="fa-solid fa-user fa-2x"></i>
                  </Link>
                </li>
                <li className="icon">
                  <Link
                    onClick={() => setShowPinMenu(!showPinMenu)}
                  >
                    <i class="fa-solid fa-thumbtack fa-2x"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Menu pin */}
        {showPinMenu && (
          <div className="pin-menu">
            {views.map((view) => (
              <div
                key={view.id}
                className={`view-item ${
                  pinnedViews.includes(view.id) ? "pinned" : ""
                }`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={pinnedViews.includes(view.id)}
                    onChange={() => handlePinToggle(view.id)}
                    style={{ display: "none" }} // Ẩn checkbox
                  />
                  {view.id === 1 ? (
                    <i class="fa-solid fa-house"></i>
                  ) : view.id === 2 ? (
                    <i class="fa-solid fa-heart"></i>
                  ) : (
                    <i class="fa-solid fa-user"></i>
                  )}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* <h4>Danh sách giao diện</h4>
        {views.map((view) => (
          <div
            key={view.id}
            className={`view-item ${
              pinnedViews.includes(view.id) ? "pinned" : ""
            }`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("viewId", view.id)}
          >
            <label>
              <input
                type="checkbox"
                checked={pinnedViews.includes(view.id)}
                onChange={() => handlePinToggle(view.id)}
              />
              {view.name}
            </label>
          </div>
        ))} */}

        <div className="setting mb-3">
          <i
            class="fa-solid fa-bars icon fa-2x"
            onClick={() => setListView(!listView)}
          ></i>
          <div className={listView ? "list-view" : "hide-list-view"}>
            <ul>
              <li>
                <p>Mode</p>
                <div className="icon-mode">
                  <i
                    class={
                      !darkMode
                        ? "fa-regular fa-sun fa-lg selected-mode"
                        : "fa-regular fa-sun fa-lg"
                    }
                    onClick={() => setDarkMode(false)}
                  ></i>
                  <i
                    class={
                      darkMode
                        ? "fa-regular fa-moon fa-lg selected-mode"
                        : "fa-regular fa-moon fa-lg"
                    }
                    onClick={() => setDarkMode(true)}
                  ></i>
                </div>
              </li>
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
