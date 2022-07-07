import React, { useState } from "react";
const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  React.useEffect(() => {
    setToken(localStorage.getItem("auth_token"));
  }, []);
  return token;
};

export default useToken;
