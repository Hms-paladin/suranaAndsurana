import React, { useCallback,useRef,useEffect, useState } from "react";
import "./dashboard.scss";
import Library from "../../images/dashboard/library.svg";
import appraisal from "../../images/dashboard/appraisal.svg";
import KRA from "../../images/dashboard/kra.svg";
import KPI from "../../images/dashboard/KPI.svg";
import Timesheet from "../../images/dashboard/timesheet.svg";
import AdhocTask from "../../images/dashboard/adhoc.svg";
import OPExp from "../../images/dashboard/opexp.svg";
import ApplyLeave from "../../images/dashboard/applyleave.svg";
import TicketCreation from "../../images/dashboard/ticketcreation.svg";
import Employee from "../../images/dashboard/employeelist.svg";
import OPAdv from "../../images/dashboard/opadv.svg";
import { Redirect, Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CustomButton from "../../component/Butttons/button";
import DynModel from "../../component/Model/model";
import AdhocTaskModal from "../Search/adhoctask"
import { Calendar } from 'antd';
import Grid from "@material-ui/core/Grid";
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import { useDispatch, connect } from "react-redux";
import moment from 'moment';

const Projectbox = [
  { projects: "Project 1", projecttype: "Project Type 1 ", client: "Client 1" },
  { projects: "Project 2", projecttype: "Project Type 2 ", client: "Client 2" },
  { projects: "Project 3", projecttype: "Project Type 3 ", client: "Client 3" },
  { projects: "Project 4", projecttype: "Project Type 4 ", client: "Client 4" },
];


const projectwise = [
  { projects: "IP Project", task: "24% ", stage: "10%" },
  { projects: "Trade Mark", task: " 24%", stage: "10%" },
  { projects: "IP Projects", task: "24%", stage: "10%" },
  { projects: "Design", task: "24% ", stage: "10%" },
  { projects: "Copyright", task: "24% ", stage: "10%" },
];

const Taskdays = [
  {
    activity: " Activity 1",
    subactivity: "Sub Activity 1 ",
    dueby: "12-Mar-2021",
    priority: "Normal",
    completed: "50",
    assignedby: "Jhon",
  },
  {
    activity: " Activity 2",
    subactivity: "Sub Activity 2 ",
    dueby: "14-Mar-2021",
    priority: "High",
    completed: "67",
    assignedby: "Mahesh",
  },
  {
    activity: " Activity 3",
    subactivity: "Sub Activity 3 ",
    dueby: "15-Mar-2021",
    priority: "High",
    completed: "50",
    assignedby: "Ravi",
  },
];

function DashboardNew(props) {
  const [pathname, setpathname] = useState(window.location.pathname);
  const [menuListItem, setMenuListItem] = useState([]);
  const [arrowHide, setArrowHide] = useState(false);
  const [changedashBoard, setChangedashBoard] = useState(true);
  const [color, setcolor] = useState("")
  const [userclr, setuserclr] = useState("customPrimary")
  // const[adhoc,setAdhoc]=useState(false)
  const [dashboardValues, setDashboardValues] = useState([])
  const [calenderValues, setCalenderValues] = useState([])

  const menulist =  useRef( [
    {
      img: <img src={Library} className="imageicons" />,
      title: "Library",
      path: "/Home/librarybook",
    },
    {
      img: <img src={appraisal} className="imageicons" />,
      title: "Appraisal",
      path: "/Home/appraisal",
    },
    {
      img: <img src={KRA} className="imageicons" />,
      title: "KRA",
      path: "/Home/KRA",
    },
    {
      img: <img src={KPI} className="imageicons" />,
      title: "KPI",
      path: "/Home/KPI",
    },
    {
      img: <img src={Timesheet} className="imageicons" />,
      title: "Time Sheet",
      path: "/Home/projectwise_timesheet",
    },
    {
      img: <img src={AdhocTask} className="imageicons" />,
      title: "Adhoc Task",
      path: "/Home/adhoctask",
    },

    {
      img: <img src={ApplyLeave} className="imageicons" />,
      title: "Apply Leave",
      path: "/Home/leaveform",
    },
    {
      img: <img src={TicketCreation} className="imageicons" />,
      title: "Ticket Creation",
      path: "/Home/ticketcreation",
    },
    {
      img: <img src={Employee} className="imageicons" />,
      title: "List of Employees",
      path: "/Home/employeelist",
    },
    {
      img: <img src={OPAdv} className="imageicons" />,
      title: "OPA/Expenses",
      path: "/Home/outofpacket",
    },
    {
      img: <img src={OPAdv} className="imageicons" />,
      title: "Day Report",
      path: "/Home/dayreport",
    },
    {
      img: <img src={Employee} className="imageicons" />,
      title: "CheckList Assigning View",
      path: "/Home/checklistview",
    },
  ]);

  const Tasks = [
    { task: "Project", count: dashboardValues[0]?.Tasks[1]?.[0]?.Project_task || 0 },
    { task: "HR", count: dashboardValues[0]?.Tasks[0]?.[0]?.HR_task || 0 },
    { task: "Other", count: dashboardValues[0]?.Tasks[2]?.[0]?.Other_task || 0 },
  ];


  const handleClick = (data) => {
    setpathname(data.path);
  };

  // useEffect(() => {
  //   orderChange();
  // }, []);


  useEffect(() => {
    Axios({
      method: 'POST',
      url: apiurl + 'get_dashboard_user',
      data: {
        "emp_id": localStorage.getItem("empId"),
      }
    }).then((response) => {
      let dashboardData = []
      dashboardData.push({
        Projects: response.data.data[0].Projects,
        Due_task: response.data.data[0].Due_task,
        Expense: response.data.data[0].Expense[0],
        Tasks: response.data.data[0].Task
      })
      setDashboardValues(dashboardData)
    })


  }, [])
  useEffect(() => {
    let now = moment();
    now = now.format('YYYY-MM-DD');
    Axios({
      method: 'POST',
      url: apiurl + 'get_dashboard_calendar',
      data: {
        "cur_date": `${now}`,
      }
    }).then((response) => {
      // setCalenderValues(response.data.data)
      let calenderData = []
      calenderData.push({
        Task: response.data.data[0].task,
        stage: response.data.data[0].stage[0]
      })
      setCalenderValues(calenderData)
      console.log(calenderData, "cv")
    })


  }, [])

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  console.log(projectwise, "projectwise")
  

  const userdashboard = (color) => {
    setChangedashBoard(true)
    setcolor("")
    setuserclr(color)

  }

  const compliancedashboard = (color) => {
    setChangedashBoard(false)
    setcolor(color)
    setuserclr("")
  }

  console.log(arrowHide, "arrowHide");

  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      props.UserPermission.map((data)=>{

      if(data.control==='Library - Add Resource'&&data.display_control==='Y'||data.control==='Library - Receive'&&data.display_control==='Y'
      ||data.control==='Library - Issue'&&data.display_control==='Y'||data.control==='Library - Search'&&data.display_control==='Y'){

        menulist.current[0].menu_rights=true;
      }

      if(data.control==='Appraisal - Save'&&data.display_control==='Y'){  
        menulist.current[1].menu_rights=true;
      }
      
      if(data.control==='KRA - Save'&&data.display_control==='Y'||data.control==='KRA - View KRA'&&data.display_control==='Y'){  
        menulist.current[2].menu_rights=true;
      }

      if(data.control==='KPI - Save'&&data.display_control==='Y'||data.control==='KPI - View KPI'&&data.display_control==='Y'){  
        menulist.current[3].menu_rights=true;
      }

      menulist.current[4].menu_rights=true;

      if(data.control==='Adhoc Task - Save'&&data.display_control==='Y'){  
        menulist.current[5].menu_rights=true;
      }

      if(data.control==='Apply Leave - Save'&&data.display_control==='Y'){  
        menulist.current[6].menu_rights=true;
      }


      if(data.control==='Ticket Creation - Save as Template'&&data.display_control==='Y'||data.control==='Ticket Creation - Generate Ticket'&&data.display_control==='Y'){  
        menulist.current[7].menu_rights=true;
      }

      if(data.control==='List of Employees - Go'&&data.display_control==='Y'){  
        menulist.current[8].menu_rights=true;
      }

      if(data.control==='OPA/ Expenses - Search'&&data.display_control==='Y'||data.control==='OPA/ Expenses- OPE - Save'&&data.display_control==='Y'
      ||data.control==='OPA/ Expenses- OPA - Save'&&data.display_control==='Y'){  
        menulist.current[9].menu_rights=true;
      }

      if(data.control==='Day Report - Save'&&data.display_control==='Y'){  
        menulist.current[10].menu_rights=true;
      }

      menulist.current[11].menu_rights=true;

      orderChange()
    })

    }
   
  }, [props.UserPermission]); 

  const orderChange = useCallback(
    (showListStart = 0, showListEnd = 7, arrowshow) => {
      const menuLists = menulist.current.map((data, index) => {
        if (index >= showListStart - 1 && index <= showListEnd - 1) {
          if(data.menu_rights){
          return (
            <Link to={data.path} onClick={() => handleClick(data)}>
              <div>
                <div className="dashboardmenu">{data.img}</div>
                <div className="dashboardtitle">{data.title}</div>
              </div>
            </Link>
          )}
        }
      });
      setMenuListItem(menuLists);
      setArrowHide(arrowshow);
    },
    []
  );
  return (


    < div >
      {console.log(calenderValues, "cv")}
      <div className="dashboardMenuContainer">
        {arrowHide && (
          <div
            className="menuLeftArrow"
            onClick={() => orderChange(0, 6, false)}
          >
            <ArrowBackIosIcon />
          </div>
        )}
        <div className="dashboardMenu">{menuListItem}</div>
        {!arrowHide && (
          <div
            className="menuRightArrow"
            onClick={() => orderChange(7, 15, true)}
          >
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>

      <div className="dashboardbtn">
        <CustomButton
          btnCustomColor={userclr}
          btnName={"User Overview"}
          custombtnCSS="btncustom_css"
          onBtnClick={() => userdashboard("customPrimary")}
        />
        <CustomButton btnName={"Compliance"}
          btnCustomColor={color}
          onBtnClick={userdashboard}
          custombtnCSS="btncustom_css"
          onBtnClick={() => compliancedashboard("customPrimary")}
        />
      </div>



      {
        changedashBoard ?
          <>
            <div className="expAdvContainer">
              <div className="expensePalce"><b>Expenses</b> {dashboardValues[0]?.Expense?.expences}</div>
              <div className="advancePlace"><b>Advance</b>  {dashboardValues[0]?.Expense?.advance}</div>

            </div>

            <div className="topcontainer">
              <div className="projectscroll">
                <div className="tableHeader">
                  <div className="linkHeader"></div>
                  <div>Projects</div>
                </div>
                <div className="projectdatas">
                  {dashboardValues[0]?.Projects.length ? dashboardValues[0]?.Projects?.map((data) => {
                    return (
                      <div className="projecttable">
                        <div>
                          <Link to={`/Home/projectIp/${data.project_id}`}>{data.project_name}</Link>
                        </div>
                        <div>{data.project_type}</div>
                        <div>{data.client}</div>
                      </div>
                    );
                  }) : "No Projects Found"}
                </div>
              </div>
              <div className="taskscroll">
                <div className="tableHeader">
                  <div className="linkHeader"></div>
                  <div>Tasks</div>
                </div>
                <div className="taskdatas">
                  {Tasks.map((data) => {
                    return (
                      <div className="tasktable">
                        <div>
                          <Link to={`/Home/todoList`}>{data.task}</Link>
                        </div>
                        <div>{data.count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Grid item xs={3}>
                <div className="custom_calender">
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
                <div className="calender_view">
                  <div className="taskdaysdatas">
                    <div className="caltableHeader">
                      <div>Project Name</div>
                      <div>Activity</div>
                      <div>Status</div>

                    </div>
                    <div className="projectdatas">
                      {calenderValues[0]?.Task.length ? calenderValues[0]?.Task?.map((data) => {
                        return (
                          <>
                            <div className="caltable">
                              <div>
                                {data.project_name}

                              </div>
                              <div>{data.activity}</div>
                              <div>{data.status}</div>

                            </div>
                          </>
                        );
                      }) : "No Tasks Found"}
                    </div>
                    {}
                  </div>
                </div>

              </Grid>


            </div>
            <div className="taskdaysscroll">
              <div className="tableHeader">
                <div className="linkHeader"></div>
                <div>Tasks due by 5 days</div>
              </div>
              <div className="taskdaysdatas">
                <div className="taskdaystableHeader">
                  <div>Activity</div>
                  <div>Sub Activity</div>
                  <div>Due by</div>
                  <div>Priority</div>
                  <div>%Completed</div>
                  <div>Assigned By</div>
                </div>
                {dashboardValues[0]?.Due_task.length ? dashboardValues[0]?.Due_task?.map((data) => {
                  return (
                    <>
                      <div className="taskdaystable">
                        <div>
                          <Link to={{ pathname: `/Home/search`, state: { value: 4 } }}>{data.activity}</Link>

                        </div>
                        <div>{data.sub_activity}</div>
                        <div>{moment(data.due_by).format('DD-MMM-YYYY')}</div>
                        <div>{data.priority}</div>
                        <div>{data.perecent_completion ? data.perecent_completion : "--"}</div>
                        <div>{data.assigned_by}</div>
                      </div>
                    </>
                  );
                }) : "No Tasks Found"}
                {}
              </div>
            </div>
          </>
          :
          <>
            <div className="overallContainer">
              <div className="overallScroll">
                <div className="tableHeader">
                  <div className="linkHeader"></div>
                  <div>Over All</div>
                </div>
                <div className="overallData">
                  <div className="overallMajorheading">
                    <div className="firstheading">Completed on or before</div>
                    <div className="secondheading">Completed on or before</div>
                  </div>
                  <div className="overallMajorheading">
                    <div className="taskStage">
                      <div>Task</div>
                      <div>Stage</div>
                    </div>
                    <div className="taskStages">
                      <div>
                        <div>Delayed less than 5 days</div>
                        <div className="taskStage">
                          <div>Task</div>
                          <div>Stage</div>
                        </div>
                      </div>
                      <div>
                        <div>Delayed less than 5 days</div>
                        <div className="taskStage">
                          <div>Task</div>
                          <div>Stage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overallMajordatas">
                    <div className="taskStage">
                      <div>24%</div>
                      <div>10%</div>
                    </div>
                    <div className="taskStages">
                      <div className="taskStage">
                        <div>24%</div>
                        <div>10%</div>
                      </div>
                      <div className="taskStage">
                        <div>24%</div>
                        <div>10%</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="overallContainer">
              <div className="overallScroll">
                <div className="tableHeader">
                  <div className="linkHeader"></div>
                  <div>Project wise</div>
                </div>
                <div className="overallData">
                  <div className="projectwiseheading">
                    <div >Project</div>
                    <div className="firstheading">Completed on or before</div>
                    <div className="secondheading">Completed on or before</div>
                  </div>
                  <div className="projectwiseheading">
                    <div ></div>
                    <div className="taskStage">
                      <div>Task</div>
                      <div>Stage</div>
                    </div>
                    <div className="taskStages">
                      <div>
                        <div>Delayed less than 5 days</div>
                        <div className="taskStagefields">
                          <div>Task</div>
                          <div>Stage</div>
                        </div>
                      </div>
                      <div>
                        <div>Delayed less than 5 days</div>
                        <div className="taskStagefields">
                          <div>Task</div>
                          <div>Stage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div >
                    {projectwise && projectwise.map((data) => {
                      return (
                        <div className="projectwisedata">
                          <div >{data.projects}</div>
                          <div className="taskStage">
                            <div>{data.task}</div>
                            <div>{data.stage}</div>
                          </div>
                          <div className="taskStages">
                            <div>
                              <div className="taskStagefields">
                                <div>{data.task}</div>
                                <div>{data.stage}</div>
                              </div>
                            </div>
                            <div>
                              <div className="taskStagefields">
                                <div>{data.task}</div>
                                <div>{data.stage}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )


                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
      }
      {/* <div>
            <DynModel modelTitle="Adhoc Task" handleChangeModel={adhoc} handleChangeCloseModel={(bln) => setAdhoc(bln)} width={1000} 
            content={<AdhocTaskModal />} closeModel={()=>setAdhoc(false)}/>
        </div> */}
    </div >

  );
}

const mapStateToProps = (state) => (

  {
    UserPermission: state.UserPermissionReducer.getUserPermission,
  }
);
export default connect(mapStateToProps)(DashboardNew); 