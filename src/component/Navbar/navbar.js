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
import LabelIcon from '@material-ui/icons/Label';
import logo from '../../images/surana.gif'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import './navbar.scss';

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
  const [pathname, setpathname] = useState(window.location.pathname)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItems, setMenuItems] = useState(
    [
      { path: "/resume", title: "Resume" },
      { path: "/todoList", title: "To Do List" },
      // {path:"/interview",title:"Interview"},
      { path: "/employeeform", title: "Employee Form" },
      { path: "/search", title: "Search" },
      {path:"/projectIp",title:"ProjectIp1"},
      {path:"/projectTask",title:"projectTask"},
      {path:"/stageicon",title:"Stages"},

    ]
  );

  function handleLogout(){
    localStorage.clear();
    window.location.reload()
  }

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
              <div className="userName">John Wick</div>
              <div className="userPosition">HOD</div>
            </div>
            {/* <ArrowDropDownCircleIcon className="customIconArrow_header" /> */}
            <div className="logoutModel">
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(event)=>(setAnchorEl(event.currentTarget))}>
              <ArrowDropDownCircleIcon className="customIconArrow_header" />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>setAnchorEl(null)}
                style={{top:"49px"}}
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
            return (
              <Link to={data.path} onClick={() => setpathname(data.path)}>
                <div className={`siderOptions ${data.path === pathname && "siderOptionsBg"}`}>
                  <div className={`menuItemHighLightDark ${data.path === pathname && "menuItemHighLightDarkBg"}`}></div>
                  <LabelIcon className="menuIcon" />
                  <div className="SiderResume_Button">{data.title}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </Drawer>
      <main className={` MasterContainer ${classes.content}`}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  )
}

export default Navbar;