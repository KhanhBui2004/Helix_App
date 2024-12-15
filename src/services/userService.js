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

const postContent = (dataPost) => {
  return axios.post("/api/post/", dataPost);
};

const likePost = (post_id) => {
  return axios.post(`/api/like/${post_id}`);
};

const unLikePost = (post_id) => {
  return axios.delete(`/api/like/${post_id}`);
};

const getLiked = (post_id) => {
  return axios.get(`/api/like/${post_id}`);
};

const getUserLiked = () => {
  return axios.get("/api/like/user-likes");
};

const postComment = (data) => {
  return axios.post("/api/comment/", data);
};

const getPostComments = (post_id) => {
  return axios.get(`/api/comment/post/${post_id}`);
};

// const fetchAllUsers = (page, limit) => {
//   return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
// };

const deleteUser = (user) => {
  return axios.delete(`/api/user/delete/${user.id}`);
};

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

const getUser = (username) => {
  return axios.get(`/api/user/${username}`);
};

const logoutUser = () => {
  return axios.post("/api/user/logout");
};

const getPosts = () => {
  return axios.get("/api/post/");
};

const getUserPosts = (id) => {
  return axios.get(`/api/post/user/${id}`);
};

const deletePostAdmin = (postID) => {
  return axios.delete(`/api/post/delete/${postID}`);
};

const updateUser = (form) => {
  return axios.put("/api/user/profile", form);
};

const getUserByUsername = (username) => {
  return axios.get(`/api/user/search?username=${username}`);
};

// const getUserByEmail = (email) => {
// return axios.get(`/api/v1/user/read-info-user?email=${email}`);
// };

// const ChangePassword = (data) => {
//   return axios.put("/api/v1/change-pass", {
//     ...data,
//   });
// };

const getUserFollowers = (id) => {
  return axios.get(`/api/follow/followers/${id}`);
};

const postFollow = (id) => {
  return axios.post(`/api/follow/${id}`);
};

const acceptFollow = (id) => {
  return axios.post(`/api/follow/accept_follow/${id}`);
};

const unFollow = (id) => {
  return axios.delete(`/api/follow/delete_follow/${id}`);
};

const getPostFollow = () => {
  return axios.get(`/api/follow/`);
};

const getCommentsToxic = () => {
  return axios.get("/api/comment/toxic");
};

const deleteCommentAdmin = (commentID) => {
  return axios.delete(`/api/comment/delete/${commentID}`);
};

export {
  registerNewUser,
  loginUser,
  getUserAccount,
  logoutUser,
  getPosts,
  getUserPosts,
  updateUser,
  getUserByUsername,
  deleteUser,
  postContent,
  likePost,
  getLiked,
  unLikePost,
  getUserLiked,
  getUser,
  postComment,
  getPostComments,
  deletePostAdmin,
  getCommentsToxic,
  deleteCommentAdmin,
  // fetchAllUsers,
  // fetchGroup,
  // createNewUser,
  // updateCurrentUser,
  // getUserByEmail,
  // ChangePassword,
  getUserFollowers,
  postFollow,
  acceptFollow,
  unFollow,
  getPostFollow,
};
