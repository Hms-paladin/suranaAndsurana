import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// components path
import Navbar from "../component/Navbar/navbar.js";

// pages
import Dashboard from "../pages/Dashboard/dashboard.js";
import Resume from "../pages/Resume/resume.js";
import Interview from '../pages/Interview/interview';
import TodoList from '../pages/TodoList/todoList';
import ProjectTask from '../pages/ProjectTask/projectTask';
import ProjectIp1 from '../pages/Project IP1/projectIp';
import ProjectIp2 from '../pages/Project Ip2/projectIp2';
import Employeeform from "../pages/Employeeform/employeeform.js";
import Search from '../pages/Search/search';



function Routes(props) {

    return (
        <Navbar>
            <PrivateRoute path="/resume" component={Resume} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/interview" component={Interview} exact />
            <PrivateRoute path="/employeeform" component={Employeeform} exact />
            <PrivateRoute path="/todolist" component={TodoList} exact />
            <PrivateRoute path="/search" component={Search} exact />
            <PrivateRoute path="/projectTask" component={ProjectTask} exact />
            <PrivateRoute path="/projectIp" component={ProjectIp1} exact />
            <PrivateRoute path="/projectIp2" component={ProjectIp2} exact />
        </Navbar>
    );
}


export default Routes;
