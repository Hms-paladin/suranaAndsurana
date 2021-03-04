import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components path
import Navbar from "./component/Navbar/navbar.js";

// pages
import Dashboard from "./pages/Dashboard/dashboard.js";
import Resume from "./pages/Resume/resume.js";
import Interview from './pages/Interview/interview';
import TodoList from './pages/TodoList/todoList';
import ProjectTask from './pages/ProjectTask/projectTask';
import ProjectIp1 from './pages/Project IP1/projectIp';
import ProjectIp2 from './pages/Project Ip2/projectIp2';





import './App.css';
import Employeeform from "./pages/Employeeform/employeeform.js";
import Search from './pages/Search/search'


function App() {

  return (
    <Router basename="suranaAndsurana/?/">
      <Navbar>
        <Switch>
          <Route path="/resume" component={Resume} exact/>
          <Route path="/dashboard" component={Dashboard} exact/>
          <Route path="/interview" component={Interview} exact/>
          <Route path="/employeeform" component={Employeeform} exact/>
          <Route path="/todolist" component={TodoList} exact/>

          <Route path="/search" component={Search} exact/>

          <Route path="/projectTask" component={ProjectTask} exact/>
          <Route path="/projectIp" component={ProjectIp1} exact/>
          <Route path="/projectIp2" component={ProjectIp2} exact/>



        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
