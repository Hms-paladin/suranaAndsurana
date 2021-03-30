import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";

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
import Task from "../pages/task/Task";
import AddClient from "../pages/AddClient/addclient";
// import GenerateInvoice from "../pages/Generateinvoi/ce/generateinvoice";
import GenerateInvoice from "../pages/Generateinvoice/generateinvoice";
import StagesMaster from '../pages/stages/StagesMaster'
import AddHearing from '../pages/task/AddHearing'
import RateMaster from '../pages/stages/RateMaster'
import ProjectFormCreate from '../pages/Search/ProjectForm_IP/projectFormCreate';
import UserGroups from '../pages/UserGroups/usergroups'
//Litigation :

import Litigation from '../pages/Litigation/litigation';


function Routes(props) {

    return (
        <Navbar>
            <Switch>
            <PrivateRoute path="/resume" component={Resume} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/interview" component={Interview} exact />
            <PrivateRoute path="/employeeform" component={Employeeform} exact />
            <PrivateRoute path="/todolist" component={TodoList} exact />
            <PrivateRoute path="/search" component={Search} exact />
            <PrivateRoute path="/task" component = {Task} exact />
            <PrivateRoute path ="/addclient" component = {AddClient} exact/>
            <PrivateRoute path ="/generateinvoice" component={ GenerateInvoice } exact/>

            {/* Create Project Form */}
            <PrivateRoute path="/projectFormCreate" component={ProjectFormCreate} exact />
            {/* Ip TradeMark */}
            <PrivateRoute path="/projectTask" component={ProjectTask} exact />
            <PrivateRoute path="/projectIp" component={ProjectIp1} exact />
            <PrivateRoute path="/stageicon" component={Stages} exact />
            <PrivateRoute path="/stagesmaster" component={StagesMaster} exact />
            <PrivateRoute path="/addhearing" component={AddHearing} exact />
            <PrivateRoute path="/ratemaster" component={RateMaster} exact />

            {/* Litigation */}

            <PrivateRoute path="/litigation" component={Litigation} exact />

            <PrivateRoute path="/usergroups" component={UserGroups} exact />
            </Switch>
        </Navbar>
    );
}


export default Routes;
