import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login/login.js";
import Navbar from "./component/Navbar/navbar.js";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
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
      <Router basename="/SuranaAndSurana">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Home" component={Navbar} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;