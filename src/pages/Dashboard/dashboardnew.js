import react, { useCallback, useEffect, useState } from 'react';
import './dashboard.scss';
import Library from '../../images/dashboard/library.svg';
import appraisal from '../../images/dashboard/appraisal.svg';
import KRA from '../../images/dashboard/kra.svg';
import KPI from '../../images/dashboard/kpi.svg';
import Timesheet from '../../images/dashboard/timesheet.svg';
import AdhocTask from '../../images/dashboard/adhoc.svg';
import OPExp from '../../images/dashboard/opexp.svg';
import ApplyLeave from '../../images/dashboard/applyleave.svg';
import TicketCreation from '../../images/dashboard/ticketcreation.svg';
import Employee from '../../images/dashboard/employeelist.svg';
import OPAdv from '../../images/dashboard/opadv.svg';
import { Redirect, Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




const Projectbox = [{ projects: "project 1", projecttype: "project Type 1 ", client: "client 1", },
{ projects: "project 2", projecttype: "project Type 2 ", client: "client 2", },
{ projects: "project 3", projecttype: "project Type 3 ", client: "client 3", },
{ projects: "project 4", projecttype: "project Type 4 ", client: "client 4", }]

const Tasks = [{ task: "project", count: 12 },
{ task: "HR", count: " 2 " },
{ task: "Other", count: "1 " },
]

const Taskdays = [{ activity: " Activity 1", subactivity: "Sub Activity 1 ", dueby: "12-Mar-2021", priority: "Normal", completed: "50", assignedby: "Jhon" },
{ activity: " Activity 2", subactivity: "Sub Activity 2 ", dueby: "14-Mar-2021", priority: "High", completed: "67", assignedby: "Mahesh" },
{ activity: " Activity 3", subactivity: "Sub Activity 3 ", dueby: "15-Mar-2021", priority: "High", completed: "50", assignedby: "Ravi" },
]

function DashboardNew() {
    const [pathname, setpathname] = useState(window.location.pathname)
    const [menuListItem, setMenuListItem] = useState([])

    const [menulist, setMenulist] = useState(
        [
            { img: <img src={Library} className="imageicons" />, title: "Library", path: "#" },
            { img: <img src={appraisal} className="imageicons" />, title: "Appraisal", path: "/appraisal" },
            { img: <img src={KRA} className="imageicons" />, title: "KRA", path: "/KRA" },
            { img: <img src={KPI} className="imageicons" />, title: "KPI", path: "/KPI" },
            { img: <img src={Timesheet} className="imageicons" />, title: "Time Sheet", path: "#" },
            { img: <img src={AdhocTask} className="imageicons" />, title: "Adhoc Task", path: "#" },
            { img: <img src={OPExp} className="imageicons" />, title: "OP Expenses", path: "#" },
            { img: <img src={ApplyLeave} className="imageicons" />, title: "Apply Leave", path: "/leaveform" },
            { img: <img src={TicketCreation} className="imageicons" />, title: "Ticket Creation", path: "#" },
            { img: <img src={Employee} className="imageicons" />, title: "List of Employees", path: "#" },
            { img: <img src={OPAdv} className="imageicons" />, title: "OP Advance", path: "#" }
        ])

    const handleClick = (data) => {
        setpathname(data.path)
    };

    useEffect(() => {
        orderChange()
    }, [])

    const orderChange = useCallback((showListStart = 0, showListEnd = 9) => {
        const menuLists = menulist.map((data, index) => {
            if (index >= showListStart - 1 && index <= showListEnd - 1) {
                return (
                    <Link to={data.path} onClick={() => handleClick(data)}>
                        <div>
                            <div className="dashboardmenu">{data.img}</div>
                            <div className="dashboardtitle">{data.title}</div>
                        </div>
                    </Link>
                )
            }
        })
        setMenuListItem(menuLists)
    }, [])

    return (
        <div>
            <div className="dashboardMenuContainer">
                <div className="menuLeftArrow" onClick={() => orderChange(0, 9)} ><ArrowBackIosIcon /></div>
                <div className="dashboardMenu">
                    {menuListItem}
                </div>
                <div className="menuRightArrow" onClick={() => orderChange(10, 15)} ><ArrowForwardIosIcon /></div>
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
                                    <div >{data.projects}</div>
                                    <div>{data.projecttype}</div>
                                    <div>{data.client}</div>

                                </div>

                            )
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
                                    <div  >{data.task}</div>
                                    <div>{data.count}</div>

                                </div>

                            )
                        })}
                    </div>

                </div>
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

                                    <div>{data.activity}</div>
                                    <div>{data.subactivity}</div>
                                    <div>{data.dueby}</div>
                                    <div>{data.priority}</div>
                                    <div>{data.completed}</div>
                                    <div>{data.assignedby}</div>

                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default DashboardNew;