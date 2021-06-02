import React, { useEffect, useState } from "react";
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
import Dashboard from '../../images/dashboard.svg';

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

import { useHistory } from "react-router-dom";


import './navbar.scss';
import { ImportantDevices } from "@material-ui/icons";

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

  const [open, setOpen] = React.useState(false)

  const [menuItems, setMenuItems] = useState(
    [
      { path: "/dashboardnew", title: "Dashboard", img: Dashboard },
      // { path: "/resume", title: "Resume", img: ResumeIcon },
      { path: "/todoList", title: "To Do List", img: TodoIcon },
      // {path:"/interview",title:"Interview"},
      // { path: "/employeeform", title: "Employee Form" },
      { path: "/search", title: "Search", img: SearchbarIcon },
      { path: "/generateinvoice", title: "Generate Invoice", img: Generateinvoice },
      { path: "/checklistAssigning", title: "Check List Assigning", img: Generateinvoice },

      // variable rate master
      // { path: "/ratemaster", title: "Variable Rate Master", img: Variableratemaster },
      // { path: "/stagesmaster", title: "Stage Master", img: Stagemaster },
      // user groups
      // { path: "/usergroups", title: "User Groups", img: Usergroups },

      // { path: "/groupcontrol", title: "Group Control", img: MasterIcon },
      // { path: "/leaveupdate", title: "Leave Update", img: MasterIcon },

      // { path: "/severance", title: "Severance", img: Stagemaster },
      // { path: "/employeeFeedback", title: "Employee Feedback", img: Stagemaster },
      // { path: "/usermaster", title: "User Master", img: Stagemaster },
      // //User Management
      // { path: "/usergroup", title: "User Management Group", img: Usergroups },
      // { path: "/newusermaster", title: "User Management Master", img: MasterIcon },
      // // group control
      // { path: "/groupaccess", title: "Group Access Rights", img: MasterIcon },

      // //user rights
      // { path: "/userrights", title: "User Access Rights", img: MasterIcon },

      //severance
      {
        active: "severance", path: "", title: "Severance", img: Stagemaster, submenu: true,
        subtree: [
          { path: "/severance", title: "Exit Interview Form", img: Usergroups },
          { path: "/employeeFeedback", title: "Employee Feedback Form", img: MasterIcon },
          { path: "/serverance_userview_Modal", title: "View Severance", img: MasterIcon }
        ]
      },

      //master
      {
        active: "master", path: "", title: "Master", img: MasterIcon, submenu: true,
        subtree: [
          { path: "/ratemaster", title: "Variable Rate Master", img: Variableratemaster },
          { path: "/stagesmaster", title: "Stage Template", img: Stagemaster },
          { path: "/leaveupdate", title: "Leave Master", img: MasterIcon },
          { path: "/usermaster", title: "User Master", img: MasterIcon },
          { path: "/checklistCreation", title: "CheckList Creation", img: MasterIcon },

        ]
      },

      //user management
      {
        active: "usermanagement", path: "", title: "User Management", img: Usergroups, submenu: true,
        subtree: [
          // { path: "/usergroup", title: "User Group", img: Usergroups },
          { path: "/usergroups", title: "User Groups", img: Usergroups },
          { path: "/newusermaster", title: "User Master", img: MasterIcon },
          { path: "/groupcontrol", title: "Group Control", img: MasterIcon },
          // { path: "/groupaccess", title: "Group Access Rights", img: MasterIcon },
          // { path: "/userrights", title: "User Access Rights", img: MasterIcon }
        ]
      },

      //Online Test
      {
        active: "onlinetest", path: "", title: "Online Test", img: MasterIcon, submenu: true,
        subtree: [
          { path: "/addquestion", title: "Add Questions", img: MasterIcon },
          { path: "/testtemplate", title: "Test Template", img: MasterIcon },
          { path: "/onlinetest", title: "Online Test", img: MasterIcon }
        ]
      },

      // //Online Test
      // { path: "/addquestion", title: "Add Questions", img: MasterIcon },
      // { path: "/testtemplate", title: "Test Template", img: MasterIcon }

    ]
  );

  // function handleClicknav() {
  //   setOpen(!open)
  // }

  function handleLogout() {
    localStorage.clear();
    history.push("/login")
    // window.location.reload()
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
          {menuItems.map((data, index) => {
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
                      )}
                    </List>
                  </Collapse>
                </List>)
            }
          })}

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
        {props.children}
      </main>
    </div>
  )
}

export default Navbar;