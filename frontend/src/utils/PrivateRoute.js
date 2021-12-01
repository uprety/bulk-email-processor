import React from 'react';
import { Route } from "react-router-dom";

// Request server to verify the cookies and allow to get to dashboard

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // // check send-mail-is-authorized
        // localStorage.getItem(ACCESS_TOKEN_NAME) ? (
          children
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: location }
        //     }}
        //   />
        // )
      }
    />
  );
}

export default PrivateRoute;