import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function AdminRoute({ component: Component, ...rest }) {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        // Se o usuário estiver logado, renderize o componente original present na prop component na chamada da AdminRoute

        if (loggedInUser.user.role === "ADMIN") {
          return <Component {...routeProps} />;
        } else {
          // Redirecione o usuário para o Login
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: routeProps.location } }}
            />
          );
        }
      }}
    />
  );
}

export default AdminRoute;
