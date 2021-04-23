import react from 'react';
import './dashboard.scss';
import Library from '../../images/dashboard/library.svg';
import appraisal from '../../images/dashboard/appraisal.svg';
import KRA from '../../images/dashboard/kra.svg';
import KPI from '../../images/dashboard/KPI.svg';
import Timesheet from '../../images/dashboard/timesheet.svg';
import AdhocTask from '../../images/dashboard/adhoc.svg';
import OPExp from '../../images/dashboard/opicon.svg';
import ApplyLeave from '../../images/dashboard/applyleave.svg';
import TicketCreation from '../../images/dashboard/ticketcreation.svg';
import Employee from '../../images/dashboard/employee.svg';
import OPAdv from '../../images/dashboard/opadv.svg';


const menulist = [{ img: <img src={Library} className="imageicons" />, title: "Library" }, { img: <img src={appraisal} className="imageicons" />, title: "Appraisal" }, { img: <img src={KRA} className="imageicons" />, title: "KRI" }, { img: <img src={KPI} className="imageicons" />, title: "KPI" }, { img: <img src={Timesheet} className="imageicons" />, title: "Time Sheet" }, { img: <img src={AdhocTask} className="imageicons" />, title: "Adhoc Task" }, { img: <img src={OPExp} className="imageicons" />, title: "OP Expenses" }
    , { img: <img src={ApplyLeave} className="imageicons" />, title: "Apply Leave" }, { img: <img src={TicketCreation} className="imageicons" />, title: "Ticket Creation" }, { img: <img src={Employee} className="imageicons" />, title: "List of Employees" }, { img: <img src={OPAdv} className="imageicons" />, title: "OP Advance" }]

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
    return (
        <div>
            <div className="dashboardMenu">{menulist.map((data) => {
                return (
                    <div>
                        <div className="dashboardmenu">{data.img}</div>
                        <div>{data.title}</div>
                    </div>
                )
            })}
            </div>
            <div className="topcontainer">
                <div className="projectscroll">
                    <div >Projects</div>
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
                    <div >Tasks</div>
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
                <div >Tasks due by 5 days</div>
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