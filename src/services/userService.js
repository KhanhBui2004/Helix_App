import axios from "../setup/axios";
import qs from "qs";

const registerNewUser = (fullname, email, username, password) => {
  return axios.post(
    "/api/auth/register",
    qs.stringify({
      fullname,
      email,
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const loginUser = (valueLogin, password) => {
  return axios.post(
    "/api/auth/login",
    qs.stringify({
      fullname,
      email,
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id },
  });
};

const fetchGroup = () => {
  return axios.get("/api/v1/group/read");
};

const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update", {
    ...userData,
  });
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};

const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const getUserByEmail = (email) => {
  return axios.get(`/api/v1/user/read-info-user?email=${email}`);
};

const updateUser = (userData) => {
  return axios.put("/api/v1/user/update-info-user", {
    ...userData,
  });
};

const ChangePassword = (data) => {
  return axios.put("/api/v1/change-pass", {
    ...data,
  });
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  getUserAccount,
  logoutUser,
  getUserByEmail,
  updateUser,
  ChangePassword,
};
