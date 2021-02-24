import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components path
import Navbar from "./component/Navbar/navbar.js";

// pages
import Dashboard from "./pages/Dashboard/dashboard.js";
import Resume from "./pages/Resume/resume.js";
import Interview from './pages/Interview/interview'


import './App.css';
import Employeeform from "./pages/Employeeform/employeeform.js";

function App() {

  return (
    <Router>
      <Navbar>
        <Switch>
          <Route path="/resume" component={Resume} exact/>
          <Route path="/dashboard" component={Dashboard} exact/>
          <Route path="/interview" component={Interview} exact/>
          <Route path="/employeeform" component={Employeeform} exact/>
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
