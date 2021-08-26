import React, { useRef,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Layout, Input, DatePicker, Space } from 'antd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { Select, Row, Col } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../images/surana.gif'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import Personicon from '../../images/personIcon.svg';
import ResumeIcon from '../../images/resume.svg';
import TodoIcon from '../../images/todoicon.svg';
import SearchbarIcon from '../../images/searchicon.svg';
import MasterIcon from '../../images/mastericon.svg';
import Generateinvoice from '../../images/generateinvoice.svg';
import Variableratemaster from '../../images/variableratemaster.svg';
import Stagemaster from '../../images/stagemaster.svg';
import Usergroups from '../../images/usergroups.svg';
import DashboardIcon from '../../images/dashboard.svg';

import { createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import { useHistory,Route} from "react-router-dom";

import './navbar.scss';
// import DashboardNew from '../../pages/Dashboard/dashboardnew';

// pages
import Dashboard from "../../pages/Dashboard/dashboard.js";
import Resume from "../../pages/Resume/resume.js";
import Interview from "../../pages/Interview/interview";
import TodoList from "../../pages/TodoList/todoList";
import ProjectTask from "../../pages/ProjectTask/projectTask";
import ProjectIp1 from "../../pages/Project IP1/projectIp";
import Employeeform from "../../pages/Employeeform/employeeform.js";
import SearchProject from "../../pages/Search/search";
import Stages from "../../pages/stages/stageicon";
import ProjectForm from "../../pages/Search/ProjectForm_IP/projectFormCreate";
import Task from "../../pages/task/Task";
import AddClient from "../../pages/AddClient/addclient";
// import GenerateInvoice from "../pages/Generateinvoi/ce/generateinvoice";
import GenerateInvoice from "../../pages/Generateinvoice/generateinvoice";
import StagesMaster from "../../pages/stages/StagesMaster";
import AddHearing from "../../pages/task/AddHearing";
import RateMaster from "../../pages/stages/RateMaster";
import ProjectFormCreate from "../../pages/Search/ProjectForm_IP/projectFormCreate";

//Litigation :
import Litigation from "../../pages/Litigation/litigation";

//User Groups :
import UserGroups from "../../pages/UserGroups/usergroups";

//Group Control:
import GroupControl from "../../pages/GroupControl/groupcontrol";

import GroupAccess from "../../pages/GroupAcess/GroupAccessRights";
//Stage Monitering:
import StageMonitering from "../../pages/stages/StageMonitering";

// Leave Update:
import LeaveUpdate from "../../pages/Leaves/leaveupdate";

//employeeFeedback

import EmployeeFeedback from "../../pages/Feedback/employeeFeedback";

//DashBoard

import DashboardNew from '../../pages/Dashboard/dashboardnew';
import KPI from '../../pages/KPI/KPI';
import LeaveForm from '../../pages/Leaves/leaveform';
import Appraisal from '../../pages/Appraisal/appraisal';
import Severance from '../../pages/Severance/severance';
import KRA from '../../pages/KRA/KRA';
import EmployeeList from '../../pages/EmployeeList/EmployeeList'
import LibraryBook from '../../pages/LibraryBook/LibraryBook'
import TicketCreation from '../../pages/RequestTicket/ticketcreation';
import AdhocTask from '../../pages/Search/adhoctask'

import RatingModel from '../../pages/Appraisal/ratingModel'

import UserMaster from '../../pages/UserMaster/Usermaster'
import OPE from '../../pages/OPE/OpeAdvance'
//UserManagement
import UserGroup from '../../pages/UserManagement/usergroup'
import NewUserMaster from '../../pages/UserManagement/newusermaster'
//Library
import AddResource from '../../pages/LibraryBook/addresource'

//userRights
import UserRights from '../../pages/UserRights/UserAccess/userAccessRights'

import userAccessRights from "../../pages/UserRights/UserAccess/userAccessRights";
//To do list
import AppraisalView from '../../pages/Appraisal/appraisalView';
import ServeranceModal from '../../pages/Severance/serverance_userview_Modal';
import MPAppraisal from '../../pages/Appraisal/MP_Appraisal'

//DayReport
import DayReport from '../../pages/DayReport/dayreport'

//OnlineTest
import AddQuestion from '../../pages/OnlineTest/addquestion'
import TestTemplate from '../../pages/OnlineTest/testtemplate'
import OnlineTest from '../../pages/OnlineTest/onlinetest'
import InstructionModal from '../../pages/OnlineTest/instructionModal'
import OnlineQA from '../../pages/OnlineTest/onlineQA'
import OutofPacket from '../../pages/OutofPacket/OutofPacket'

//TimeSheet
import ProjectwiseTS from '../../pages/Search/TimeSheets/projectwise_timesheet'

// CheckList Creation
import checkListCreation from '../../pages/Checklist/checklistCreation';
import checkListAssign from '../../pages/Checklist/checklistAssigning';
import CheckListView from '../../pages/Checklist/ChecklistView'
//OPEAdvance
// import OPE from '../pages/OPE/OpeAdvance'
import OPE_Expense from '../../pages/OPE/OpeExpense'

import axios from "axios";
import { useDispatch, connect } from "react-redux";
import { notification } from "antd";
import { apiurl } from "../../utils/baseUrl.js";
import {get_user_rights} from "../../actions/UserAccessRightsAction";
import TaskSearch from "../../pages/Search/TaskSearch";

const { Option } = Select
const { Search } = Input;


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0354A4',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#023E7D',

  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#E4E4E4',
    height: '700',
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [pathname, setpathname] = useState(window.location.pathname)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false)
  const [Rights, setRights] = useState([])

  // function handleClicknav() {
  //   setOpen(!open)
  // }

  function handleLogout() {
    // menuItems1.current=[];
    localStorage.clear();
    history.push("/")
    window.location.reload()
  }
  // console.log(pathname,"pathname")
  const [severanceopen, setSeveranceopen] = React.useState(false);
  const [masteropen, setMasteropen] = React.useState(false);
  const [userManageopen, setUserManageopen] = React.useState(false);
  const [onlineTestopen, setOnlineTestopen] = React.useState(false);
  

  const handleClick = (data) => {
    setpathname(data.path)
    setOpen(!open);
  };
  const handleClicksub = (active) => {
    if (active === "severance")
      setSeveranceopen(!severanceopen)
    if (active === "master")
      setMasteropen(!masteropen)
    if (active === "usermanagement")
      setUserManageopen(!userManageopen)
    if (active === "onlinetest")
      setOnlineTestopen(!onlineTestopen)

  };

  const handlesubopen = (active) => {
    if (active === "severance")
      return severanceopen
    if (active === "master")
      return masteropen
    if (active === "usermanagement")
      return userManageopen
    if (active === "onlinetest")
      return onlineTestopen

  };

  const useStyles1 = makeStyles(theme =>
    createStyles({
      appMenu: {
        width: '100%',
      },
      navList: {
        width: drawerWidth,
      },
      menuItem: {
        width: drawerWidth,
        color: 'white',
        fontFamily: 'Poppins-Regular'
      },
      menuItemActive: {
        width: drawerWidth,
        color: 'white',
        backgroundColor: '#0353a4',
      },
      menuItemIcon: {
        color: 'white',
      },
    }),
  )
  const classes1 = useStyles1();


useEffect(() => {
  if (props.UserPermission.length > 0 && props.UserPermission) {
    props.UserPermission.map((data)=>{

      // if(data.control==='Library - Add Resource'&&data.display_control==='Y'||data.control==='Library - Receive'&&data.display_control==='Y'
      // ||data.control==='Library - Issue'&&data.display_control==='Y'||data.control==='Library - Search'&&data.display_control==='Y'
      // ||data.control==='Appraisal - Save'&&data.display_control==='Y'||data.control==='KRA - Save'&&data.display_control==='Y'
      // ||data.control==='KPI - Save'&&data.display_control==='Y'||data.control==='KRA - View KRA'&&data.display_control==='Y'
      // ||data.control==='KPI - View KPI'&&data.display_control==='Y'||data.control==='Timesheet - Search'&&data.display_control==='Y'
      // ||data.control==='Adhoc Task - Save'&&data.display_control==='Y'||data.control==='Apply Leave - Save'&&data.display_control==='Y'
      // ||data.control==='List of Employees - Go'&&data.display_control==='Y'||data.control==='Ticket Creation - Save as Template'&&data.display_control==='Y'
      // ||data.control==='Ticket Creation - Generate Ticket'&&data.display_control==='Y'||data.control==='OPA/ Expenses - Search'&&data.display_control==='Y'
      // ||data.control==='OPA/ Expenses- OPE - Save'&&data.display_control==='Y'||data.control==='OPA/ Expenses- OPA - Save'&&data.display_control==='Y'
      // ||data.control==='Day Report - Save'&&data.display_control==='Y'){

      //   menuItems1.current[0].menu_rights=true;
      // }
      menuItems1.current[0].menu_rights=true;

      menuItems1.current[1].menu_rights=true;


      if(data.control==='Resume - Go'&&data.display_control==='Y'||data.control==='Resume - Create Resume'&&data.display_control==='Y'
      ||data.control==='Resume - Interview Details'&&data.display_control==='Y'||data.control==='HR - Go'&&data.display_control==='Y'
      ||data.control==='Project - Go'&&data.display_control==='Y'||data.control==='Project - Create Project'&&data.display_control==='Y'
      ||data.control==='Project - Create Adhoc Task'&&data.display_control==='Y'||data.control==='Adhoc Task - Save'&&data.display_control==='Y'){

        menuItems1.current[2].menu_rights=true;
      }

      if(data.control==='Generate Invoice - Search'&&data.display_control==='Y'||data.control==='Generate Invoice - Generate'&&data.display_control==='Y'){  
        menuItems1.current[3].menu_rights=true;
      }
      
      if(data.control==='Check List Assigning'&&data.display_control==='Y'){  
        menuItems1.current[4].menu_rights=true;
      }

      if(data.control==='Exit Interview Form - Save'&&data.display_control==='Y'||
      data.control==='Employee Feedback - Save'&&data.display_control==='Y'){

          if(data.control==='Exit Interview Form - Save'&&data.display_control==='Y'){
            menuItems1.current[5].subtree[0].sub_menu_rights=true;
          }

          if(data.control==='Employee Feedback - Save'&&data.display_control==='Y'){
            menuItems1.current[5].subtree[1].sub_menu_rights=true;
          }
          menuItems1.current[5].subtree[2].sub_menu_rights=true;    
        menuItems1.current[5].menu_rights=true;

      }

      if(data.control==='Leave Master - Save'&&data.display_control==='Y'||data.control==='User Masters - Save'&&data.display_control==='Y'
      ||data.control==='CheckList Creation - Save'&&data.display_control==='Y'||data.control==='CheckList Creation - Add'&&data.display_control==='Y'
      ||data.control==='Variable Rate Master - Save'&&data.display_control==='Y'||data.control==='Stage Template - Save'&&data.display_control==='Y'){

          if(data.control==='Variable Rate Master - Save'&&data.display_control==='Y'){
            menuItems1.current[6].subtree[0].sub_menu_rights=true;
          }

          if(data.control==='Stage Template - Save'&&data.display_control==='Y'){
            menuItems1.current[6].subtree[1].sub_menu_rights=true;
          }

          if(data.control==='Leave Master - Save'&&data.display_control==='Y'){
            menuItems1.current[6].subtree[2].sub_menu_rights=true;
          }

          
          if(data.control==='User Masters - Save'&&data.display_control==='Y'){
            menuItems1.current[6].subtree[3].sub_menu_rights=true;
          }

          if(data.control==='CheckList Creation - Save'&&data.display_control==='Y'||data.control==='CheckList Creation - Add'&&data.display_control==='Y'){
            menuItems1.current[6].subtree[4].sub_menu_rights=true;
          }

        menuItems1.current[6].menu_rights=true;

      }


      if(data.control==='User Group - Add'&&data.display_control==='Y'||data.control==='UserMaster - Create User'&&data.display_control==='Y'
      ||data.control==='Group Control - Add'&&data.display_control==='Y'){

          if(data.control==='User Group - Add'&&data.display_control==='Y'){
            menuItems1.current[7].subtree[0].sub_menu_rights=true;
          }

          if(data.control==='UserMaster - Create User'&&data.display_control==='Y'){
            menuItems1.current[7].subtree[1].sub_menu_rights=true;
          }

          if(data.control==='Group Control - Add'&&data.display_control==='Y'){
            menuItems1.current[7].subtree[2].sub_menu_rights=true;
          }

        menuItems1.current[7].menu_rights=true;

      }


      if(data.control==='Add Questions - Add'&&data.display_control==='Y'||data.control==='Test - Submit'&&data.display_control==='Y'
      ||data.control==='Online Test - Submit'&&data.display_control==='Y'){

          if(data.control==='Add Questions - Add'&&data.display_control==='Y'){
            menuItems1.current[8].subtree[0].sub_menu_rights=true;
          }

          if(data.control==='Test - Submit'&&data.display_control==='Y'){
            menuItems1.current[8].subtree[1].sub_menu_rights=true;
          }

          if(data.control==='Online Test - Submit'&&data.display_control==='Y'){
            menuItems1.current[8].subtree[2].sub_menu_rights=true;
          }

        menuItems1.current[8].menu_rights=true;

      }
 
    
    })

    setRights(props.UserPermission)
  }else{
    menuItems1.current[0].menu_rights=true;

    menuItems1.current[1].menu_rights=true;

  }
 
}, [props.UserPermission]); 



const menuItems1 = useRef( [

  { path: "/Home/dashboardnew", title: "Dashboard", img: DashboardIcon },
  // { path: "/resume", title: "Resume", img: ResumeIcon },
  { path: "/Home/todoList", title: "To Do List", img: TodoIcon },
  // {path:"/interview",title:"Interview"},
  // { path: "/employeeform", title: "Employee Form" },
  { path: "/Home/search", title: "Search", img: SearchbarIcon },
  { path: "/Home/generateinvoice", title: "Generate Invoice", img: Generateinvoice },
  { path: "/Home/checklistAssigning", title: "Check List Assigning", img: Generateinvoice },


  //severance
  {
    active: "severance", path: "", title: "Severance", img: Stagemaster, submenu: true,
    subtree: [
      { path: "/Home/severance", title: "Exit Form", img: Usergroups },
      { path: "/Home/employeeFeedback", title: "Employee Feedback Form", img: MasterIcon },
      { path: "/Home/serverance_userview_Modal", title: "View Severance", img: MasterIcon }
    ]
  },

  //master
  {
    active: "master", path: "", title: "Master", img: MasterIcon, submenu: true,
    subtree: [
      { path: "/Home/ratemaster", title: "Variable Rate Master", img: Variableratemaster },
      { path: "/Home/stagesmaster", title: "Stage Template", img: Stagemaster },
      { path: "/Home/leaveupdate", title: "Leave Master", img: MasterIcon },
      { path: "/Home/usermaster", title: "User Master", img: MasterIcon },
      { path: "/Home/checklistCreation", title: "CheckList Creation", img: MasterIcon },

    ]
  },

  //user management
  {
    active: "usermanagement", path: "", title: "User Management", img: Usergroups, submenu: true,
    subtree: [
      // { path: "/usergroup", title: "User Group", img: Usergroups },
      { path: "/Home/usergroups", title: "User Groups", img: Usergroups },
      { path: "/Home/newusermaster", title: "User Master", img: MasterIcon },
      { path: "/Home/groupcontrol", title: "Group Control", img: MasterIcon },
      // { path: "/groupaccess", title: "Group Access Rights", img: MasterIcon },
      // { path: "/userrights", title: "User Access Rights", img: MasterIcon }
    ]
  },

  //Online Test
  {
    active: "onlinetest", path: "", title: "Online Test", img: MasterIcon, submenu: true,
    subtree: [
      { path: "/Home/addquestion", title: "Add Questions", img: MasterIcon },
      { path: "/Home/testtemplate", title: "Test Template", img: MasterIcon },
      { path: "/Home/onlinetest", title: "Online Test", img: MasterIcon }
    ]
  },

  // //Online Test
  // { path: "/addquestion", title: "Add Questions", img: MasterIcon },
  // { path: "/testtemplate", title: "Test Template", img: MasterIcon }

]);

useEffect(() => {
dispatch(get_user_rights());
},[])

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
    <div className={`navbarContainer ${classes.root}`}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Grid spacing={2} item xs={12} container direction="row" justify="center" alignItems="center" display="flex" >
          <Grid item xs={6} container justify="left" alignItems="baseline" className="Header_Title" >
            <span className="highlightedtitle">L</span>egal <span className="highlightedtitle">P</span>ractice <span className="highlightedtitle">M</span>anagement <span className="highlightedtitle">S</span>ystem
          </Grid>

          <Grid item xs={3} container alignItems="center">
            <div className="headerName"></div>
          </Grid>

          <Grid item xs={3} alignItems="center" className="userInfo" >
            <SearchIcon className="customIcon_header" />
            <InfoIcon className="customIcon_header" />
            <NotificationsIcon className="customIcon_header" />
            <SettingsIcon className="customIcon_header" />
            <SupervisedUserCircleIcon className="customIcon_header" />
            <div >
              <div className="userName">
                {JSON.parse(localStorage.getItem("token")).user_name}
              </div>
              <div className="userPosition">{JSON.parse(localStorage.getItem("token")).designation}</div>
            </div>
            {/* <ArrowDropDownCircleIcon className="customIconArrow_header" /> */}
            <div className="logoutModel">
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(event) => (setAnchorEl(event.currentTarget))}>
                <ArrowDropDownCircleIcon className="customIconArrow_header" />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                style={{ top: "49px" }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>

          </Grid>

        </Grid>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }} >
        <Toolbar />
        <div className={classes.drawerContainer}>

          <div className="suranaLogo"><img src={logo} /></div>
          { menuItems1.current.map((data, index) => {
          if(data.menu_rights){
          if (!data.submenu) {
            return (

              <Link to={data.path} onClick={() => handleClick(data)}>

                <div className={`siderOptions ${data.path === pathname && "siderOptionsBg"}`}>

                  <div className={`menuItemHighLightDark ${data.path === pathname && "menuItemHighLightDarkBg"}`}></div>
                  <img src={data.img} className="menuListIcon" />
                  <div className="SiderResume_Button">{data.title}</div>
                  {/* {open ? <ExpandMore /> : <ArrowForwardIosIcon style={{ fontSize: 15 }} />} */}
                </div>

              </Link>
            )
          } 
          else {

            return (
              <List component="nav" className={classes1.appMenu} disablePadding>
                <ListItem button onClick={() => handleClicksub(data.active)} className={classes1.menuItem}>
                  <ListItemIcon className={classes1.menuItemIcon}>
                    {/* <IconLibraryBooks /> */}
                    <img src={data.img} className="menuListIcon" />
                  </ListItemIcon>
                  <ListItemText className={classes1.menuItem} primary={data.title} />
                  {handlesubopen(data.active) ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={handlesubopen(data.active)} timeout="auto" unmountOnExit>
                  <Divider />
                  <List component="div" disablePadding>
                    {data.subtree.map((subdata, index) => {
                      if(subdata.sub_menu_rights){
                      return (
                        <Link to={subdata.path} onClick={() => handleClick(subdata)}>
                          <div id="submenu_div" className={subdata.path === pathname ? classes1.menuItemActive : classes1.menuItem}> <img src={subdata.img} className="submenuListIcon" />
                            <ListItem button className={classes1.menuItem} >
                              <ListItemText className={classes1.menuItem} inset primary={subdata.title} />
                            </ListItem>
                          </div>
                        </Link>
                      )
                      }
                    }
                    )}
                  </List>
                </Collapse>
              </List>)
          }
        }}
          )}

        </div>
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse> */}

      </Drawer>
      <main className={` MasterContainer ${classes.content}`}>
        <Toolbar />
        <Route path={`${props.match.path}/DashboardNew`} component={DashboardNew} />
        <Route path={`${props.match.path}/resume`} component={Resume} exact />
        <Route path={`${props.match.path}/dashboard`} component={Dashboard} exact />
        <Route path={`${props.match.path}/interview`} component={Interview} exact />
        <Route path={`${props.match.path}/employeeform`} component={Employeeform}/>
        <Route path={`${props.match.path}/todolist`} component={TodoList}/>
        <Route path={`${props.match.path}/search`} component={SearchProject} exact />
        <Route path={`${props.match.path}/search/task/:task_id`} component={TaskSearch} exact />
        <Route path={`${props.match.path}/task`} component={Task} exact />
        <Route path={`${props.match.path}/addclient`} component={AddClient} exact />
        <Route path={`${props.match.path}/generateinvoice`} component={GenerateInvoice} exact />

        {/* Create Project Form */}
        <Route path={`${props.match.path}/projectFormCreate`} component={ProjectFormCreate} exact />
        {/* Ip TradeMark */}
        <Route path={`${props.match.path}/projectTask`} component={ProjectTask} exact />
        <Route path={`${props.match.path}/projectIp/:rowId`} component={ProjectIp1} exact />
        <Route path={`${props.match.path}/stageicon`} component={Stages} exact />
        <Route path={`${props.match.path}/stagesmaster`} component={StagesMaster} exact />
        <Route path={`${props.match.path}/addhearing`} component={AddHearing} exact />
        <Route path={`${props.match.path}/ratemaster`} component={RateMaster} exact />

        {/* Litigation */}
        <Route path={`${props.match.path}/litigation`} component={Litigation} exact />
        {/* User Groups */}
        <Route path={`${props.match.path}/usergroups`} component={UserGroups} exact />
        {/*  Group Control */}
        <Route path={`${props.match.path}/groupcontrol`} component={GroupControl} exact />
        <Route path={`${props.match.path}/groupaccess`} component={GroupAccess} exact />


        {/*  Stage Monitering */}
        <Route path={`${props.match.path}/stagemonitering`} component={StageMonitering} exact />

        {/* Dashboarde */}
        <Route path={`${props.match.path}/kpi`} component={KPI} exact />
        {/* <PrivateRoute path={`${props.match.patch}/dashboardnew`} component={DashboardNew} exact /> */}
        <Route path={`${props.match.path}/leaveform`} component={LeaveForm} exact />
        <Route path={`${props.match.path}/appraisal/:rowId`} component={Appraisal} exact />
        <Route path={`${props.match.path}/appraisal`} component={Appraisal} exact />
        <Route path={`${props.match.path}/ratingModel`} component={RatingModel} exact />
        <Route path={`${props.match.path}/ticketcreation`} component={TicketCreation} exact />
        <Route path={`${props.match.path}/KRA`} component={KRA} exact />
        <Route path={`${props.match.path}/adhoctask`} component={AdhocTask} exact />


        {/* Leaves Update */}
        <Route path={`${props.match.path}/leaveupdate`} component={LeaveUpdate} exact />
        <Route path={`${props.match.path}/severance`} component={Severance} exact />


        {/* EmployeeFeedback */}
        <Route path={`${props.match.path}/employeeFeedback`} component={EmployeeFeedback} exact />

        {/* Usermaster */}
        <Route path={`${props.match.path}/usermaster`} component={UserMaster} />

        <Route path={`${props.match.path}/employeelist`} component={EmployeeList} />
        <Route path={`${props.match.path}/librarybook`} component={LibraryBook} />
        <Route path={`${props.match.path}/ope_advance`} component={OPE} />
        {/* UserManagement */}
        <Route path={`${props.match.path}/usergroup`} component={UserGroup} />
        <Route path={`${props.match.path}/newusermaster`} component={NewUserMaster} />
        <Route path={`${props.match.path}/useraccessrights`} component={userAccessRights} />
        {/* Library */}
        <Route path={`${props.match.path}/addresource`} component={AddResource} />

        {/* UserRights */}
        <Route path={`${props.match.path}/userrights`} component={UserRights} />
        {/* To do list */}
        <Route path={`${props.match.path}/appraisalView`} component={AppraisalView} exact />
        <Route path={`${props.match.path}/serverance_userview_Modal`} component={ServeranceModal} exact />
        <Route path={`${props.match.path}/MP_Appraisal`} component={MPAppraisal} exact />

        {/* DayReport */}
        <Route path={`${props.match.path}/dayreport`} component={DayReport} exact />

        {/* Online Test */}
        <Route path={`${props.match.path}/addquestion`} component={AddQuestion} exact />
        <Route path={`${props.match.path}/testtemplate`} component={TestTemplate} exact />
        <Route path={`${props.match.path}/onlinetest`} component={OnlineTest} exact />
        <Route path={`${props.match.path}/instructionModal`} component={InstructionModal} exact />
        <Route path={`${props.match.path}/onlineQA/:designation/:candidate/:testTemplateId`} component={OnlineQA} exact />

        {/* out of packet */}
        <Route path={`${props.match.path}/outofpacket`} component={OutofPacket} exact />
        {/* TimeSheet */}
        <Route path={`${props.match.path}/projectwise_timesheet`} component={ProjectwiseTS} exact />

        {/* checkListCreation */}
        <Route path={`${props.match.path}/checklistCreation`} component={checkListCreation} exact />
        <Route path={`${props.match.path}/checklistAssigning`} component={checkListAssign} exact />
        <Route path={`${props.match.path}/checklistview`} component={CheckListView} exact />
        {/* OPEAdvance */}
        {/* <PrivateRoute path="/OpeAdvance" component={OPE} exact /> */}
        <Route path={`${props.match.path}/OpeExpense`} component={OPE_Expense} exact />
        <div>
        {props.children}
        </div>
      </main>
    </div>
  )
}


const mapStateToProps = (state) => (

  {
    UserPermission: state.UserPermissionReducer.getUserPermission,
  }
);

export default connect(mapStateToProps)(Navbar);