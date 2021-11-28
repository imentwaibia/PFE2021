import { useState, useCallback, useEffect } from "react";

export const UserAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [user, setUser] = useState(false);

  const login = useCallback((user, uid, token) => {
    setToken(token);
    setUserId(uid);
    setUser(user);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        user: user,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("userData");
    window.location.href = "http://localhost:3000";
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.user, storedData.userId, storedData.token);
    }
  }, [login]);

  return { token, login, logout, userId, user };
};
