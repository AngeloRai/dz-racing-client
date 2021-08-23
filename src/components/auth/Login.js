import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserFormIput from "./UserFormIput";

import api from "../../apis/index";
import { AuthContext } from "../../contexts/authContext";

function Login() {
  // Consumindo nosso state global do Context. Temos acesso pois Login é um componente filho do AuthContextProvider no App.js
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const history = useHistory();

  //Se o usuário já estiver logado, redireciona pra página inicial
  useEffect(() => {
    if (loggedInUser.user.email) {
      history.push("/");
    }
  }, [loggedInUser, history]);

  
  async function handleSubmit(values) {
    try {

      const user = await api.post("/login", values);

      // Storing logged user data into Context (global state)
      setLoggedInUser({ ...user.data });
      console.log(user.data);
      // Persists logged user data into localStorage to make available even when closing browser
      localStorage.setItem("loggedInUser", JSON.stringify(user.data));
    } catch (err) {
      console.error(err);
      alert("Invalid email or password")
      
    }
  }
  console.log(loggedInUser.user.role);
  return (
    <div>
      <h1>Sign-In to your account</h1>

      <UserFormIput handleSubmit={handleSubmit} />

      <div className="mt-4">
        <Link to="/signup">Don't have an account? Sign-up here!</Link>
      </div>
    </div>
  );
}

export default Login;
