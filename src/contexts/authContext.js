import React, { useState, createContext, useEffect } from "react";

// Creates Context which is global state available to all components
const AuthContext = createContext({ user: {}, token: "" });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ user: {}, token: "" });

  // As soon as the Provider Component loads, fetch the logged in user's data in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    // If there is a logged in user stored in localStorage, update global state
    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser });
    }
  }, []);

  // O componente Provider serve para disponibilizar o Context (state global) para todos seus componentes filhos
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };
