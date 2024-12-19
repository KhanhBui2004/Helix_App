import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";
import Users from "./components/ManageUsers/User";
import NewThread from "./components/NewThread/NewThread";
import Notification from "./components/Notification/Notification";
import ProfileUser from "./components/Profile/ProfileUser";
import DashBoard from "./components/DashBoard/DashBoard";
import Posts from "./components/ManagePosts/Posts";
import Comments from "./components/ManageComments/Comments";

// function LayoutUser() {
//   const currentLocation = useLocation();
//   const isAuthPage =
//     currentLocation.pathname === "/login" ||
//     currentLocation.pathname === "/register";

//   const [selectedView, setSelectedView] = useState(null);

//   const views = [
//     {
//       id: 1,
//       name: "Giao diện 1",
//       content: (
//         <div className="box" draggable="true" id="view1">
//           <Home />
//         </div>
//       ),
//     },
//     {
//       id: 2,
//       name: "Giao diện 2",
//       content: (
//         <div className="box" draggable="true" id="view2">
//           <Notification />
//         </div>
//       ),
//     },
//     {
//       id: 3,
//       name: "Giao diện 3",
//       content: (
//         <div className="box" draggable="true" id="view3">
//           <Profile />
//         </div>
//       ),
//     },
//   ];

//   const handleDragStart = (e, viewId) => {
//     e.dataTransfer.setData("viewId", viewId);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const viewId = e.dataTransfer.getData("viewId");
//     const view = views.find((v) => v.id === parseInt(viewId));
//     setSelectedView(view);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       {/* Nếu không phải trang login hoặc register thì chia cột */}
//       {!isAuthPage ? (
//         <div className="content">
//           <div className="col-1">
//             <Navbar />
//           </div>
//           {/* Drop Zone */}
//           <div
//             className="dropzone"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             {selectedView ? (
//               <div className="selected-view">{selectedView.content}</div>
//             ) : (
//               <p>Kéo và thả giao diện vào đây</p>
//             )}
//           </div>
//           <div className="col-11">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/search" element={<Search />} />
//               <Route path="/new-thread" element={<NewThread />} />
//               <Route path="/notification" element={<Notification />} />
//               <Route path="/profile/:username" element={<ProfileUser />} />
//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <>
//           <Routes>
//             <Route path="/login" element={<LogIn />} />
//             <Route path="/register" element={<SignUp />} />
//           </Routes>
//         </>
//       )}
//     </div>
//   );
// }

function LayoutUser() {
  const currentLocation = useLocation();
  const isAuthPage =
    currentLocation.pathname === "/login" ||
    currentLocation.pathname === "/register";

  const [pinnedViews, setPinnedViews] = useState([]);
  const [draggedViewId, setDraggedViewId] = useState(null);

  const views = [
    { id: 1, name: "Giao diện 1", path: "/", component: <Home /> },
    {
      id: 2,
      name: "Giao diện 2",
      path: "/notification",
      component: <Notification />,
    },
    { id: 3, name: "Giao diện 3", path: "/profile", component: <Profile /> },
  ];

  useEffect(() => {
    const currentView = views.find(
      (view) => view.path === currentLocation.pathname
    );

    if (currentView) {
      if (!pinnedViews.includes(currentView.id)) {
        setPinnedViews([currentView.id]);
      }
    } else {
      setPinnedViews([]);
    }
  }, [currentLocation, pinnedViews, views]);

  const handlePinToggle = (viewId) => {
    setPinnedViews((prev) =>
      prev.includes(viewId)
        ? prev.filter((id) => id !== viewId)
        : [...prev, viewId]
    );
  };

  const handleDragStart = (e, viewId) => {
    setDraggedViewId(viewId);
    e.dataTransfer.setData("viewId", viewId); // Lưu ID của phần tử đang kéo
  };

  const handleDrop = (e, targetViewId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("viewId");

    if (draggedId !== targetViewId) {
      const newPinnedViews = [...pinnedViews];
      const draggedIndex = newPinnedViews.indexOf(parseInt(draggedId));
      const targetIndex = newPinnedViews.indexOf(targetViewId);

      // Hoán đổi vị trí
      newPinnedViews.splice(draggedIndex, 1);
      newPinnedViews.splice(targetIndex, 0, parseInt(draggedId));

      setPinnedViews(newPinnedViews);
      setDraggedViewId(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Cho phép thả
  };

  return (
    <div>
      {!isAuthPage ? (
        <div className="content">
          <div className="col-1">
            <Navbar
              views={views}
              handlePinToggle={handlePinToggle}
              pinnedViews={pinnedViews}
            />
          </div>

          <div
            className={`col-11 pinned-views pinned-views-${pinnedViews.length}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, null)} // Thả vào vùng chung
          >
            {pinnedViews.length > 0 ? (
              pinnedViews.map((viewId, index) => {
                const view = views.find((v) => v.id === viewId);
                return (
                  <div
                    key={viewId}
                    className="pinned-view route-container"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, viewId)}
                    onDrop={(e) => handleDrop(e, viewId)} // Thả vào từng phần tử
                    onDragOver={handleDragOver}
                  >
                    {view?.component}
                  </div>
                );
              })
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new-thread" element={<NewThread />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/profile/:username" element={<ProfileUser />} />
              </Routes>
            )}
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
}

function LayoutAdmin() {
  const currentLocation = useLocation();
  const isAuthPage =
    currentLocation.pathname === "/login" ||
    currentLocation.pathname === "/register";

  return (
    <div>
      {/* Nếu không phải trang login hoặc register thì chia cột */}
      {!isAuthPage ? (
        <div className="content">
          <div className="col-1">
            <Navbar />
          </div>
          <div className="col-11">
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<Users />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/dash-board" element={<DashBoard />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </>
      )}
    </div>
  );
}

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            {user && user.account.is_admin === true ? (
              <>
                <LayoutAdmin />
              </>
            ) : (
              <LayoutUser />
            )}{" "}
          </>
        )}
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
