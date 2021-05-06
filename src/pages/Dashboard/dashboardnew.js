import react, { useCallback, useEffect, useState } from "react";
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


const Projectbox = [
  { projects: "Project 1", projecttype: "Project Type 1 ", client: "Client 1" },
  { projects: "Project 2", projecttype: "Project Type 2 ", client: "Client 2" },
  { projects: "Project 3", projecttype: "Project Type 3 ", client: "Client 3" },
  { projects: "Project 4", projecttype: "Project Type 4 ", client: "Client 4" },
];

const Tasks = [
  { task: "Project", count: 12 },
  { task: "HR", count: " 2 " },
  { task: "Other", count: "1 " },
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

function DashboardNew() {
  const [pathname, setpathname] = useState(window.location.pathname);
  const [menuListItem, setMenuListItem] = useState([]);
  const [arrowHide, setArrowHide] = useState(false);
  const [changedashBoard, setChangedashBoard] = useState(true);
  // const[adhoc,setAdhoc]=useState(false)

  const [menulist, setMenulist] = useState([
    {
      img: <img src={Library} className="imageicons" />,
      title: "Library",
      path: "/librarybook",
    },
    {
      img: <img src={appraisal} className="imageicons" />,
      title: "Appraisal",
      path: "/appraisal",
    },
    {
      img: <img src={KRA} className="imageicons" />,
      title: "KRA",
      path: "/KRA",
    },
    {
      img: <img src={KPI} className="imageicons" />,
      title: "KPI",
      path: "/KPI",
    },
    {
      img: <img src={Timesheet} className="imageicons" />,
      title: "Time Sheet",
      path: "/projectwise_timesheet",
    },
    {
      img: <img src={AdhocTask} className="imageicons" />,
      title: "Adhoc Task",
      path: "/adhoctask",
    },

    {
      img: <img src={ApplyLeave} className="imageicons" />,
      title: "Apply Leave",
      path: "/leaveform",
    },
    {
      img: <img src={TicketCreation} className="imageicons" />,
      title: "Ticket Creation",
      path: "/ticketcreation",
    },
    {
      img: <img src={Employee} className="imageicons" />,
      title: "List of Employees",
      path: "/employeelist",
    },
    {
      img: <img src={OPAdv} className="imageicons" />,
      title: "OPE",
      path: "/outofpacket",
    },
    {
      img: <img src={OPAdv} className="imageicons" />,
      title: "Day Report",
      path: "/dayreport",
    },
  ]);

  const handleClick = (data) => {
    setpathname(data.path);
  };

  useEffect(() => {
    orderChange();
  }, []);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  console.log(projectwise, "projectwise")
  const orderChange = useCallback(
    (showListStart = 0, showListEnd = 7, arrowshow) => {
      const menuLists = menulist.map((data, index) => {
        if (index >= showListStart - 1 && index <= showListEnd - 1) {
          return (
            <Link to={data.path} onClick={() => handleClick(data)}>
              <div>
                <div className="dashboardmenu">{data.img}</div>
                <div className="dashboardtitle">{data.title}</div>
              </div>
            </Link>
          );
        }
      });
      setMenuListItem(menuLists);
      setArrowHide(arrowshow);
    },
    []
  );

  const userdashboard = () => {
    setChangedashBoard(true)
  }

  const compliancedashboard = () => {
    setChangedashBoard(false)
  }

  console.log(arrowHide, "arrowHide");
  return (
    <div>
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
          btnName={"User Overview"}
          onBtnClick={userdashboard}
        />
        <CustomButton btnName={"Compliance"}
          btnCustomColor="customPrimary"
          onBtnClick={userdashboard}
          onBtnClick={compliancedashboard}
        />
      </div>



      {changedashBoard ?
        <>
          <div className="expAdvContainer">
            <div className="expensePalce">Expenses  4000</div>
            <div className="advancePlace">Advance  20000</div>

          </div>

          <div className="topcontainer">
            <div className="projectscroll">
              <div className="tableHeader">
                <div className="linkHeader"></div>
                <div>Projects</div>
              </div>
              <div className="projectdatas">
                {Projectbox.map((data) => {
                  return (
                    <div className="projecttable">
                      <div>
                        <a href={"#"} className="linktable">
                          {data.projects}
                        </a>
                      </div>
                      <div>{data.projecttype}</div>
                      <div>{data.client}</div>
                    </div>
                  );
                })}
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
                        <a href={"#"} className="linktable">
                          {data.task}
                        </a>
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
                <div>
                  <div className="calDay">16 May</div>
                  <div className="cal_time">09:00 aM</div>
                  <div className="cal_time">10:00 aM</div>
                  <div className="cal_time">11:00 aM</div>

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
              {Taskdays.map((data) => {
                return (
                  <>
                    <div className="taskdaystable">
                      <div>
                        <a href={"#"} className="linktable">
                          {data.activity}
                        </a>
                      </div>
                      <div>{data.subactivity}</div>
                      <div>{data.dueby}</div>
                      <div>{data.priority}</div>
                      <div>{data.completed}</div>
                      <div>{data.assignedby}</div>
                    </div>
                  </>
                );
              })}
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
        </>}
      {/* <div>
            <DynModel modelTitle="Adhoc Task" handleChangeModel={adhoc} handleChangeCloseModel={(bln) => setAdhoc(bln)} width={1000} 
            content={<AdhocTaskModal />} closeModel={()=>setAdhoc(false)}/>
        </div> */}
    </div>

  );
}

export default DashboardNew;