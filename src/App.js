import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from './Router/PrivateRoute';
import Login from "./pages/Login/login.js";
import Routes from "./Router/route";
import { useDispatch } from "react-redux";
import Navbar from "./component/Navbar/navbar.js";
import { get_user_rights } from "./actions/UserAccessRightsAction";
function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const dispatch = useDispatch();
  const setTokens = (data) => {
    localStorage.setItem("token", JSON.stringify(data.data[0]));
    localStorage.setItem("empId", JSON.stringify(data.data[0].emp_id));
    localStorage.setItem("user_id", JSON.stringify(data.data[0].user_id));
    localStorage.setItem("user_name", JSON.stringify(data.data[0].user_name));
    localStorage.setItem("designation", JSON.stringify(data.data[0].designation));
    localStorage.setItem("designation_id", JSON.stringify(data.data[0].designation_id));
    localStorage.setItem("department_id", data.data[0].department_id);
    localStorage.setItem("department", data.data[0].department);
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router basename="suranaAndsurana/?/">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Home" component={Navbar} />
        </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;