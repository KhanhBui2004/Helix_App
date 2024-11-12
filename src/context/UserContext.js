import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };

  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    try {
      let response = await getUserAccount();
      if (response && +response.status === 200) {
        console.log("response: ", response);

        let data = {
          isLoading: false,
          isAuthenticated: true,
          account: {
            role: response.is_admin,
            username: response.username,
            email: response.email,
            full_name: response.full_name,
            is_admin: response.is_admin,
            about_me: response.about_me,
            avatar_url: response.avatar_url,
            address: response.address,
            created_at: response.created_at,
          },
        };
        setUser(data);
      } else {
        console.log("vào đây rồi");
        setUser({ ...userDefault, isLoading: false });
      }
    } catch (error) {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]); // useEffect sẽ chạy khi `user` thay đổi

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
