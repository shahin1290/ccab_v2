
import React from "react";
import { Redirect } from "react-router-dom";

const RedirectToAuthRoutes = ({match ,authPath }) => {
    //console.log(`AuthPath : ${authPath}`);

    //console.log(match);
  return <Redirect  to={`/auth${authPath}`} />;
};

export default RedirectToAuthRoutes;