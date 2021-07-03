import React, { useState, useEffect } from "react";
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

import GroupAccess from "../pages/GroupAcess/GroupAccessRights";
//Stage Monitering:
import StageMonitering from "../pages/stages/StageMonitering";

// Leave Update:
import LeaveUpdate from "../pages/Leaves/leaveupdate";

//employeeFeedback

import EmployeeFeedback from "../pages/Feedback/employeeFeedback";

//DashBoard

import DashboardNew from '../pages/Dashboard/dashboardnew';
import KPI from '../pages/KPI/KPI';
import LeaveForm from '../pages/Leaves/leaveform';
import Appraisal from '../pages/Appraisal/appraisal';
import Severance from '../pages/Severance/severance';
import KRA from '../pages/KRA/KRA';
import EmployeeList from '../pages/EmployeeList/EmployeeList'
import LibraryBook from '../pages/LibraryBook/LibraryBook'
import TicketCreation from '../pages/RequestTicket/ticketcreation';
import AdhocTask from '../pages/Search/adhoctask'

import RatingModel from '../pages/Appraisal/ratingModel'

import UserMaster from '../pages/UserMaster/Usermaster'
import OPE from '../pages/OPE/OpeAdvance'
//UserManagement
import UserGroup from '../pages/UserManagement/usergroup'
import NewUserMaster from '../pages/UserManagement/newusermaster'
//Library
import AddResource from '../pages/LibraryBook/addresource'

//userRights
import UserRights from '../pages/UserRights/UserAccess/userAccessRights'

import userAccessRights from "../pages/UserRights/UserAccess/userAccessRights";
//To do list
import AppraisalView from '../pages/Appraisal/appraisalView';
import ServeranceModal from '../pages/Severance/serverance_userview_Modal';
import MPAppraisal from '../pages/Appraisal/MP_Appraisal'

//DayReport
import DayReport from '../pages/DayReport/dayreport'

//OnlineTest
import AddQuestion from '../pages/OnlineTest/addquestion'
import TestTemplate from '../pages/OnlineTest/testtemplate'
import OnlineTest from '../pages/OnlineTest/onlinetest'
import InstructionModal from '../pages/OnlineTest/instructionModal'
import OnlineQA from '../pages/OnlineTest/onlineQA'
import OutofPacket from '../pages/OutofPacket/OutofPacket'

//TimeSheet
import ProjectwiseTS from '../pages/Search/TimeSheets/projectwise_timesheet'

// CheckList Creation
import checkListCreation from '../pages/Checklist/checklistCreation';
import checkListAssign from '../pages/Checklist/checklistAssigning';

//OPEAdvance
// import OPE from '../pages/OPE/OpeAdvance'
import OPE_Expense from '../pages/OPE/OpeExpense'

// import { UserBlockUnblock } from '../actions/UserAccessRightsAction';
// import { useDispatch, connect } from "react-redux";

import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";
import { useHistory } from "react-router-dom";

function Routes(props) {

  const history = useHistory();


  useEffect(() => {
   
      var DocumentData = new FormData();
      DocumentData.set("user_id",localStorage.getItem("user_id"))
      try {
        axios({
          method: 'POST',
          url: apiurl + 'login_referesh_page',
          data: DocumentData
        })
          .then((response) => {
              console.log("resuser",response)
              if (response.data.status === 0) {
                localStorage.clear();
                history.push("/login")
                notification.success({
                  message: response.data.msg,
                });
              }
      
          })

    } catch (err) {

    }
  }, []);

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
        <PrivateRoute path="/generateinvoice" component={GenerateInvoice} exact />

        {/* Create Project Form */}
        <PrivateRoute path="/projectFormCreate" component={ProjectFormCreate} exact />
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
        <PrivateRoute path="/groupaccess" component={GroupAccess} exact />


        {/*  Stage Monitering */}
        <PrivateRoute path="/stagemonitering" component={StageMonitering} exact />

        {/* Dashboarde */}
        <PrivateRoute path="/kpi" component={KPI} exact />
        <PrivateRoute path="/dashboardnew" component={DashboardNew} exact />
        <PrivateRoute path="/leaveform" component={LeaveForm} exact />
        <PrivateRoute path="/appraisal/:rowId" component={Appraisal} exact />
        <PrivateRoute path="/appraisal" component={Appraisal} exact />
        <PrivateRoute path="/ratingModel" component={RatingModel} exact />
        <PrivateRoute path="/ticketcreation" component={TicketCreation} exact />
        <PrivateRoute path="/KRA" component={KRA} exact />
        <PrivateRoute path="/adhoctask" component={AdhocTask} exact />


        {/* Leaves Update */}
        <PrivateRoute path="/leaveupdate" component={LeaveUpdate} exact />
        <PrivateRoute path="/severance" component={Severance} exact />


        {/* EmployeeFeedback */}
        <PrivateRoute path="/employeeFeedback" component={EmployeeFeedback} exact />

        {/* Usermaster */}
        <PrivateRoute path="/usermaster" component={UserMaster} />

        <PrivateRoute path="/employeelist" component={EmployeeList} />
        <PrivateRoute path="/librarybook" component={LibraryBook} />
        <PrivateRoute path="/ope_advance" component={OPE} />
        {/* UserManagement */}
        <PrivateRoute path="/usergroup" component={UserGroup} />
        <PrivateRoute path="/newusermaster" component={NewUserMaster} />
        <PrivateRoute path="/useraccessrights" component={userAccessRights} />
        {/* Library */}
        <PrivateRoute path="/addresource" component={AddResource} />

        {/* UserRights */}
        <PrivateRoute path="/userrights" component={UserRights} />
        {/* To do list */}
        <PrivateRoute path="/appraisalView" component={AppraisalView} exact />
        <PrivateRoute path="/serverance_userview_Modal" component={ServeranceModal} exact />
        <PrivateRoute path="/MP_Appraisal" component={MPAppraisal} exact />

        {/* DayReport */}
        <PrivateRoute path="/dayreport" component={DayReport} exact />

        {/* Online Test */}
        <PrivateRoute path="/addquestion" component={AddQuestion} exact />
        <PrivateRoute path="/testtemplate" component={TestTemplate} exact />
        <PrivateRoute path="/onlinetest" component={OnlineTest} exact />
        <PrivateRoute path="/instructionModal" component={InstructionModal} exact />
        <PrivateRoute path="/onlineQA/:designation/:candidate/:testTemplateId" component={OnlineQA} exact />

        {/* out of packet */}
        <PrivateRoute path="/outofpacket" component={OutofPacket} exact />
        {/* TimeSheet */}
        <PrivateRoute path="/projectwise_timesheet" component={ProjectwiseTS} exact />

        {/* checkListCreation */}
        <PrivateRoute path="/checklistCreation" component={checkListCreation} exact />
        <PrivateRoute path="/checklistAssigning" component={checkListAssign} exact />

        {/* OPEAdvance */}
        {/* <PrivateRoute path="/OpeAdvance" component={OPE} exact /> */}
        <PrivateRoute path="/OpeExpense" component={OPE_Expense} exact />
      </Switch>
    </Navbar>
  );

}

export default Routes;
