import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from './Router/PrivateRoute';
import Login from "./pages/Login/login.js";
import Routes from "./Router/route";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("token", JSON.stringify(data.data[0]));
    localStorage.setItem("empId", JSON.stringify(data.data[0].emp_id));
    localStorage.setItem("user_id", JSON.stringify(data.data[0].user_id));
    localStorage.setItem("user_name", JSON.stringify(data.data[0].user_name));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router basename="suranaAndsurana/?/">
        <Switch>
          <Route path="/login" component={Login} exact />
          <PrivateRoute path="/" component={Routes} />
        </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;