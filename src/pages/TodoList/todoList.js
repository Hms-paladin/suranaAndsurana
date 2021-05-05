import React, { useEffect, useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import { getHrTaskList } from "../../actions/TodoListAction";
import { useDispatch, connect } from "react-redux";
import moment from "moment";
import { useParams, Link } from 'react-router-dom';


// Model
import InterviewApprover from "../InterviewApprover/InterviewApprover";
import InerviewScreen from "../Interview/interview";
import EmployeeApprove from '../Employeeform/EmployeeApprove';
import UnblockUserActive from './UnblockUser/unblockuserActive';
import ResignationApproveval from '../Severance/resignationModel';
import Employeeform from '../Employeeform/employeeform';
import LeaveApproval from '../Leaves/leaveapprovalModel';
import KPI from '../KPI/kpiModel';
import KRI from '../KRA/kraModel';
import Appraisal from '../Appraisal/appraisal';
import AppraisalView from '../Appraisal/appraisalView';
import MPAppraisal from '../Appraisal/MP_Appraisal'
import TimeSheetApproval from '../task/Timesheet/TimesheetTable'
import RecruitmentModal from './RecruitmentModal'
import ServeranceModal from '../Severance/serverance_userview_Modal'
import "./todoList.scss"

// Hr Task:

const headCells = [
    { id: 'id', label: 'Task' },
    { id: 'interviewDate', label: 'Interview date' },
    { id: 'designation', label: 'Designation' },
    { id: 'candidates', label: 'No. of Candidates' }
];

//Project Task:

const projectheadCells = [
    { id: 'id', label: 'Task' },
    { id: 'activity', label: 'Activity' },
    { id: 'subactivity', label: 'Sub Activity' },
    { id: 'case', label: 'Case' },
    { id: 'startdate', label: 'Start Date' },
    { id: 'enddate', label: 'End Date' },
];


//workflowheadCells :


const workflowheadCells = [
    { id: 'id', label: 'Work Flow ID' },
    { id: 'requestedby', label: 'Requested By' },
    { id: 'requestedon', label: 'Requested On' },
    { id: 'approvedby', label: 'Approved By' },
    { id: 'startdateon', label: 'Approved On' },


];

// const workFlow = [{ id: 1, requestedby: "Francis", requestedon: "11-jan-2020", approvedby: "Winston", startdateon: "12-jan-2020" }]



function TodoList(props) {

    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)
    const [stateClear, setStateClear] = useState(false)
    const [approveModalOpen, setApproveOpen] = useState(false)
    const [inerviewScreen, setInerviewScreen] = useState(false)
    const [unblockuserActive, setUnblockuserActive] = useState(false)
    const [hrTodoList, setHrTodoList] = useState([])
    const [projectTodoList, setProjectTodoList] = useState([])
    const [otherTodoList, setOtherTodoList] = useState([])
    const [resignationApprove, setResignationApprove] = useState(false)
    const [leaveApproval, setLeaveApproval] = useState(false)
    const [can_int_id, setcan_int_id] = useState([])
    const [EmployeeFormOpen, setEmployeeFormOpen] = useState(false)
    const [Employee_Data, setEmployee_Data] = useState([])
    const [res_id, setres_id] = useState([])
    const [viewer_id, setviewer_id] = useState([])
    const [modelTitle, setModeltitle] = useState()
    const [leaveModelTitle, setleaveModelTitle] = useState()
    const [kpiapprovemodel, setKpiapprovemodel] = useState(false);
    const [kraapprovemodel, setKraapprovemodel] = useState(false);
    // timesheet
    const [TimeSheet_Approval, setTimeSheet_Approval] = useState(false)
    // recruitment
    const [recruitmodal, setrecruitmodal] = useState(false)
    const [recruitmentData, setRecruitmentData] = useState([])
    const [editTickettemplate, setEditTickettemplate] = useState(false);
    const [ticket_id, setTicket_id] = useState();



    //serverance
    const [serverancemodal, setserverancemodal] = useState(false)

    useEffect(() => {
        dispatch(getHrTaskList())
    }, [])

    // let { rowId } = useParams(false)
    // useEffect(() => {
    //     setTest(rowId)
    // }, [])

    useEffect(() => {


        let hrList = []
        let todoListdata = []
        let hrlist2 = []


        props.getHrTodoList.map((data) => {
            console.log(data, "showidshowid")
            let showId = null
            let showName = null


            if (data.interviewer_id) {
                showId = data.interviewer_id
                showName = "interviewer_id"
            } else if (data.resume_id) {
                showId = data.resume_id
                showName = "resume_id"
            } else if (data.int_details_id) {
                showId = data.int_details_id
                showName = "int_details_id"
            } else if (data.int_status_id) {
                showId = data.int_status_id
                showName = "int_status_id"
            }
            else if (data.ticket_id) {
                showId = data.ticket_id
                showName = "Recruitment Request"
            }
            else {
                showName = ""
            }
            hrList.push({
                id: <div onClick={(id, name) => openModelFunc(showName, showId)} className="tempClass" >{data.task}</div>,
                interviewDate: data.Interview_Date ? moment(data.Interview_Date).format('DD-MMM-YYYY') : null,
                designation: data.designation, candidates: data.no_of_candidates
            },
            )



        })

        setHrTodoList(hrList)

        if (props.getHrTodoList.assigned_by !== props.getHrTodoList.assignee_id) {
            alert("test")
        }
    }, [props.getHrTodoList,])

    useEffect(() => {
        let projectTask = []

        projectTask.push({
            id: <div className="ProjectTaskId" onClick={unblockUser}>Unblock User</div>, activity: "Activity1", subactivity: "Sub activity1", case: "Case1", startdate: "11-Jan-2021", enddate: "12-Jan-2021"
        },
            {
                id: <div className="ProjectTaskId" onClick={() => setTimeSheet_Approval(true)}
                >Time Sheet Approval</div>, activity: "Activity1", subactivity: "Sub activity1", case: "Case1", startdate: "11-Jan-2021", enddate: "12-Jan-2021"
            },
        )

        setProjectTodoList(projectTask)

        //Other Task
        let otherTask = []

        otherTask.push({
            id: <div className="ProjectTaskId" onClick={() => resignationApproveval("Resignation Approval")}
            >Resignation Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => resignationApproveval("HR Noc")}
            >HR Noc</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => resignationApproveval("IT Noc")}
            >IT Noc</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => resignationApproveval("Admin Noc")}
            >Admin Noc</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => resignationApproveval("Final Relieving")}
            >Final Relieving</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => leaveApprovalModel("CEP Approval")}
            >CEP Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => leaveApprovalModel("Casual Leave")}
            >Casual Leave Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => leaveApprovalModel("On Duty")}
            >On Duty Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => leaveApprovalModel("Permission")}
            >Permission Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => setKraapprovemodel(true)}
            >KRA Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <div className="ProjectTaskId" onClick={() => setKpiapprovemodel(true)}
            >KPI Approval</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        }, {
            id: <Link to={`/appraisal/${1}`}><div className="ProjectTaskId">Appraiser Supervisor </div></Link>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
        },
            {
                id: <Link to={'appraisalView'}><div className="ProjectTaskId">Appraisal</div></Link>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
            },
            {
                id: <div className="ProjectTaskId" onClick={() => setserverancemodal(true)}>ServeranceUserView</div>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
            },
            {
                id: <Link to={'MP_Appraisal'}><div className="ProjectTaskId">MP Appraisal</div></Link>, requestedby: "Activity1", requestedon: "Sub activity1", approvedby: "Case1", startdateon: "11-Jan-2021"
            },
        )

        setOtherTodoList(otherTask)

    }, [])


    function openModelFunc(name, id) {
        if (name === "interviewer_id") {
            setApproveOpen(true)
            let int_viewer_id = props.getHrTodoList.find((val) => {
                return (
                    id == val.interviewer_id
                )
            })
            setviewer_id(int_viewer_id)
        }
        else if (name === "resume_id") {
            setModelOpen(true)
            let data_res_id = props.getHrTodoList.find((val) => {
                return (
                    id == val.resume_id
                )
            })
            setres_id(data_res_id)
        }
        else if (name === "int_details_id") {
            setInerviewScreen(true)
            let checkData = props.getHrTodoList.find((val) => {
                return (
                    id == val.int_details_id
                )
            })
            setcan_int_id(checkData)
        }
        else if (name === "int_status_id") {
            setEmployeeFormOpen(true)
            let checkData = props.getHrTodoList.find((val) => {
                // console.log(val,"valval")
                return (
                    id == val.int_status_id
                )
            })
            setEmployee_Data(checkData)
        }
        else if (name === "Recruitment Request") {
            setrecruitmodal(true)
            setEditTickettemplate(true)
            let checkData = props.getHrTodoList.find((val) => {

                return (
                    id == val.ticket_id
                )
            })
            setRecruitmentData(checkData)
            setTicket_id(id)
            console.log(checkData, "props.getHrTodoList")



        }

    }


    // unblockUsers ==>
    function unblockUser() {
        setUnblockuserActive(true)
    }

    // resignationApproveval

    const resignationApproveval = (val) => {
        setResignationApprove(true)
        setModeltitle(val)
    }

    const leaveApprovalModel = (val) => {
        setLeaveApproval(true)
        setleaveModelTitle(val)
    }



    const onNewPageClear = (bln) => {
        setStateClear(!stateClear);
        setInerviewScreen(bln);
        setEmployeeFormOpen(bln);
        setApproveOpen(bln);

    }
    //appraisalSupervisor

    return (
        <div>
            {/* <div className="blinkingtext">Welcome</div>   -> blinking content */}
            <div>
                {/* ___________________________________________________________________________ */}
                <EnhancedTable headCells={headCells} rows={hrTodoList} tabletitle={"HR Task"} />
                {/*InrerviewScreen after  Schedule     */}
                <DynModel modelTitle={"Interview"} handleChangeModel={inerviewScreen} handleChangeCloseModel={(bln) => onNewPageClear(bln)} width={1000} content={<InerviewScreen interviewer_id={can_int_id}
                    handleAproverModelClose={(bln) => onNewPageClear(bln)} stateClear={stateClear}  />} />

                {/*EmployeeForm after  selected in interview approve     */}
                <DynModel modelTitle={"Employee Form"} handleChangeModel={EmployeeFormOpen} handleChangeCloseModel={(bln) => onNewPageClear(bln)} width={1100}
                    content={<Employeeform closemodal={(bln) => onNewPageClear(bln)} emp_form_id={Employee_Data} stateClear={stateClear} />} />

                {/*EmployeeApprove after  value entered in employee form     */}

                <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => onNewPageClear(bln)}
                    content={<EmployeeApprove closemodal={(bln) => onNewPageClear(bln)} emp_viewer_id={viewer_id} stateClear={stateClear} />} />

                {/* recruitment Request modal */}

                <DynModel modelTitle={"Recruitment Request"} handleChangeModel={recruitmodal} modalchanges="recruit_modal_css" handleChangeCloseModel={(bln) => setrecruitmodal(bln)} width={900} content={<RecruitmentModal closemodal={(bln) => setrecruitmodal(bln)} ticket_id={ticket_id} editTickettemplate={editTickettemplate} recruitmentDa={recruitmentData} />} />

                {/* serverance_Userview_Modal */}
                {/* <DynModel modelTitle={"Severance"} handleChangeModel={serverancemodal} handleChangeCloseModel={(bln) => setserverancemodal(bln)} width={950} content={<ServeranceModal closemodal={(bln) => setserverancemodal(bln)} />} /> */}


            </div>
            {/* __________________________________________________________________________ */}
            <div>
                <EnhancedTable headCells={projectheadCells} rows={projectTodoList} tabletitle={"Project Task"} />
                <DynModel modelTitle={"Unblock User"} handleChangeModel={unblockuserActive} handleChangeCloseModel={(bln) => setUnblockuserActive(bln)} content={<UnblockUserActive closemodal={(bln) => setUnblockuserActive(bln)} />} />

                <DynModel modelTitle={"TimeSheet"} handleChangeModel={TimeSheet_Approval} handleChangeCloseModel={(bln) => setTimeSheet_Approval(bln)} width={1100} content={<TimeSheetApproval closemodal={(bln) => setTimeSheet_Approval(bln)} />} />
            </div>
            <div>
                <EnhancedTable headCells={workflowheadCells} rows={otherTodoList} tabletitle={"Other Task"} />

                <DynModel modelTitle={modelTitle} handleChangeModel={resignationApprove} handleChangeCloseModel={(bln) => setResignationApprove(bln)} width={700} content={<ResignationApproveval modelTitles={modelTitle} closemodal={(bln) => setResignationApprove(bln)} />} />

                <DynModel modelTitle={leaveModelTitle} handleChangeModel={leaveApproval} handleChangeCloseModel={(bln) => setLeaveApproval(bln)} width={800} content={<LeaveApproval modelTitles={leaveModelTitle} closemodal={(bln) => setLeaveApproval(bln)} />} />

                <DynModel modelTitle={"KRA Approval"} handleChangeModel={kraapprovemodel} handleChangeCloseModel={(bln) => setKraapprovemodel(bln)} width={800} content={<KRI closemodal={(bln) => setKraapprovemodel(bln)} />} />

                <DynModel modelTitle={"KPI Approval"} handleChangeModel={kpiapprovemodel} handleChangeCloseModel={(bln) => setKpiapprovemodel(bln)} width={800} content={<KPI closemodal={(bln) => setKpiapprovemodel(bln)} />} />





            </div>



        </div>
    )
}

const mapStateToProps = state => (
    {
        getHrTodoList: state.getHrTodoList.getHrToDoListTableData || [],
    }
)

export default connect(mapStateToProps)(TodoList);



