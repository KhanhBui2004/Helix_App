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

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]); // useEffect sẽ chạy khi `user` thay đổi

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    try {
      let response = await getUserAccount(user);
      if (response && +response.status === 200) {
        let role = response.role;
        let token = response.access_token;

        let data = {
          isLoading: false,
          isAuthenticated: true,
          token,
          account: {
            role,
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

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
