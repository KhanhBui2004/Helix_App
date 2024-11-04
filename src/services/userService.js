import axios from "../setup/axios";

const registerNewUser = (full_name, email, username, password) => {
  return axios.post("/api/auth/register", {
    full_name,
    email,
    username,
    password,
  });
};

const loginUser = (username, password) => {
  return axios.post("/api/auth/login", {
    username,
    password,
  });
};

// const fetchAllUsers = (page, limit) => {
//   return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
// };

// const deleteUser = (user) => {
//   return axios.delete("/api/v1/user/delete", {
//     data: { id: user.id },
//   });
// };

// const fetchGroup = () => {
//   return axios.get("/api/v1/group/read");
// };

// const createNewUser = (userData) => {
//   return axios.post("/api/v1/user/create", {
//     ...userData,
//   });
// };

// const updateCurrentUser = (userData) => {
//   return axios.put("/api/v1/user/update", {
//     ...userData,
//   });
// };

const getUserAccount = () => {
  return axios.get("/api/user/profile");
};

const logoutUser = () => {
  return axios.post("/api/user/logout");
};

// const getUserByEmail = (email) => {
//   return axios.get(`/api/v1/user/read-info-user?email=${email}`);
// };

// const updateUser = (userData) => {
//   return axios.put("/api/v1/user/update-info-user", {
//     ...userData,
//   });
// };

// const ChangePassword = (data) => {
//   return axios.put("/api/v1/change-pass", {
//     ...data,
//   });
// };

export {
  registerNewUser,
  loginUser,
  getUserAccount,
  logoutUser,
  // fetchAllUsers,
  // deleteUser,
  // fetchGroup,
  // createNewUser,
  // updateCurrentUser,
  // getUserByEmail,
  // updateUser,
  // ChangePassword,
};
