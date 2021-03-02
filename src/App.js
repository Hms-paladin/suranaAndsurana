import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components path
import Navbar from "./component/Navbar/navbar.js";

// pages
import Dashboard from "./pages/Dashboard/dashboard.js";
import Resume from "./pages/Resume/resume.js";
import Interview from './pages/Interview/interview'
import TodoList from './pages/TodoList/todoList'


import './App.css';
import Employeeform from "./pages/Employeeform/employeeform.js";
import Search from "./pages/Search/search.js";
import projectsearch from "./pages/Search/projectsearch.js";

function App() {

  return (
    <Router basename="suranaAndsurana/?/">
      <Navbar>
        <Switch>
          <Route path="/resume" component={Resume} exact/>
          <Route path="/dashboard" component={Dashboard} exact/>
          <Route path="/interview" component={Interview} exact/>
          <Route path="/employeeform" component={Employeeform} exact/>
          <Route path="/search" component={Search} exact/>
          <Route path="/todolist" component={TodoList} exact/>
          <Route path="/projectsearch" component={projectsearch} exact/>

          

        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
