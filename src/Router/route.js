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
import Employeeform from "../pages/Employeeform/employeeform.js";
import Search from '../pages/Search/search';
import Stages from '../pages/stages/stageicon';
import ProjectForm from '../pages/Search/ProjectForm_IP/projectFormCreate';

//Litigation :

import Litigation from '../pages/Litigation/litigation';


function Routes(props) {

    return (
        <Navbar>
            <PrivateRoute path="/resume" component={Resume} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/interview" component={Interview} exact />
            <PrivateRoute path="/employeeform" component={Employeeform} exact />
            <PrivateRoute path="/todolist" component={TodoList} exact />
            <PrivateRoute path="/search" component={Search} exact />

            {/* Create Project Form */}
            <PrivateRoute path="/projectFormCreate" component={ProjectForm} exact />

            {/* Ip TradeMark */}
            <PrivateRoute path="/projectTask" component={ProjectTask} exact />
            <PrivateRoute path="/projectIp" component={ProjectIp1} exact />
            <PrivateRoute path="/stageicon" component={Stages} exact />

            {/* Litigation */}

            <PrivateRoute path="/litigation" component={Litigation} exact />

        </Navbar>
    );
}


export default Routes;
