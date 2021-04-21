import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// components path
import Navbar from "../component/Navbar/navbar.js";
// pages
import Dashboard from "../pages/Dashboard/dashboard.js";
import Resume from "../pages/Resume/resume.js";
import Interview from "../pages/Interview/interview";
import TodoList from "../pages/TodoList/todoList";
import ProjectTask from "../pages/ProjectTask/projectTask";
import ProjectIp1 from "../pages/Project IP1/projectIp";
import Employeeform from "../pages/Employeeform/employeeform.js";
import Search from "../pages/Search/search";
import Stages from "../pages/stages/stageicon";
import ProjectForm from "../pages/Search/ProjectForm_IP/projectFormCreate";
import Task from "../pages/task/Task";
import AddClient from "../pages/AddClient/addclient";
// import GenerateInvoice from "../pages/Generateinvoi/ce/generateinvoice";
import GenerateInvoice from "../pages/Generateinvoice/generateinvoice";
import StagesMaster from "../pages/stages/StagesMaster";
import AddHearing from "../pages/task/AddHearing";
import RateMaster from "../pages/stages/RateMaster";
import ProjectFormCreate from "../pages/Search/ProjectForm_IP/projectFormCreate";

//Litigation :
import Litigation from "../pages/Litigation/litigation";

//User Groups :
import UserGroups from "../pages/UserGroups/usergroups";

//Group Control:
import GroupControl from "../pages/GroupControl/groupcontrol";

//Stage Monitering:
import StageMonitering from "../pages/stages/StageMonitering";

// Leave Update:
import LeaveUpdate from "../pages/Leaves/leaveupdate";

//employeeFeedback

import EmployeeFeedback from "../pages/Feedback/employeeFeedback";

//DashBoard

import DashboardNew from "../pages/Dashboard/dashboardnew";
import KPI from "../pages/KPI/KPI";
import LeaveForm from "../pages/Leaves/leaveform";
import Appraisal from "../pages/Appraisal/appraisal";
import Severance from "../pages/Severance/severance";
import KRA from "../pages/KRA/KRA";

import RatingModel from "../pages/Appraisal/ratingModel";

import UserMaster from "../pages/UserMaster/Usermaster";

import RatingModel from "../pages/Appraisal/ratingModel";

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
        <PrivateRoute path="/task" component={Task} exact />
        <PrivateRoute path="/addclient" component={AddClient} exact />
        <PrivateRoute
          path="/generateinvoice"
          component={GenerateInvoice}
          exact
        />

        {/* Create Project Form */}
        <PrivateRoute
          path="/projectFormCreate"
          component={ProjectFormCreate}
          exact
        />
        {/* Ip TradeMark */}
        <PrivateRoute path="/projectTask" component={ProjectTask} exact />
        <PrivateRoute path="/projectIp/:rowId" component={ProjectIp1} exact />
        <PrivateRoute path="/stageicon" component={Stages} exact />
        <PrivateRoute path="/stagesmaster" component={StagesMaster} exact />
        <PrivateRoute path="/addhearing" component={AddHearing} exact />
        <PrivateRoute path="/ratemaster" component={RateMaster} exact />

        {/* Litigation */}
        <PrivateRoute path="/litigation" component={Litigation} exact />
        {/* User Groups */}
        <PrivateRoute path="/usergroups" component={UserGroups} exact />
        {/*  Group Control */}
        <PrivateRoute path="/groupcontrol" component={GroupControl} exact />
        {/*  Stage Monitering */}
        <PrivateRoute
          path="/stagemonitering"
          component={StageMonitering}
          exact
        />

        {/* Dashboarde */}
        <PrivateRoute path="/kpi" component={KPI} exact />
        <PrivateRoute path="/dashboardnew" component={DashboardNew} exact />
        <PrivateRoute path="/leaveform" component={LeaveForm} exact />
        <PrivateRoute path="/appraisal/:rowId" component={Appraisal} exact />
        <PrivateRoute path="/appraisal" component={Appraisal} exact />
        <PrivateRoute path="/ratingModel" component={RatingModel} exact />

        <PrivateRoute path="/KRA" component={KRA} exact />

        {/* Leaves Update */}
        <PrivateRoute path="/leaveupdate" component={LeaveUpdate} exact />
        <PrivateRoute path="/severance" component={Severance} exact />

        {/* EmployeeFeedback */}
        <PrivateRoute
          path="/employeeFeedback"
          component={EmployeeFeedback}
          exact
        />

        {/* Usermaster */}
        <PrivateRoute path="/usermaster" component={UserMaster} />
      </Switch>
    </Navbar>
  );
}

export default Routes;
