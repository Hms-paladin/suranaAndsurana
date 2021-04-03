import React, { useEffect, useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import { getHrTaskList } from "../../actions/TodoListAction";
import { useDispatch, connect } from "react-redux";
import moment from "moment";

// Model
import InterviewApprover from "../InterviewApprover/InterviewApprover";
import InerviewScreen from "../Interview/interview";
import EmployeeApprove from '../Employeeform/EmployeeApprove';
import UnblockUserActive from './UnblockUser/unblockuserActive';
import Employeeform from '../Employeeform/employeeform'
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
    { id: 'id', label: 'Task ID' },
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
    const [approveModalOpen, setApproveOpen] = useState(false)
    const [inerviewScreen, setInerviewScreen] = useState(false)
    const [unblockuserActive, setUnblockuserActive] = useState(false)
    const [hrTodoList, setHrTodoList] = useState([])
    const [projectTodoList, setProjectTodoList] = useState([])
    const [can_int_id, setcan_int_id] = useState([])
    const [EmployeeFormOpen, setEmployeeFormOpen] = useState(false)
    const [Employee_Data, setEmployee_Data] = useState([])
    const [res_id, setres_id] = useState([])
    const [viewer_id, setviewer_id] = useState([])
    useEffect(() => {
        dispatch(getHrTaskList())
    }, [])

    useEffect(() => {

        let hrList = []
        let todoListdata = []

        props.getHrTodoList.map((data) => {
            console.log(data, "showid")
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
            }else if (data.int_status_id) {
                showId = data.int_status_id
                showName = "int_status_id"
            }
            hrList.push({ id: <div onClick={(id, name) => openModelFunc(showName, showId)} className="tempClass" >{data.task}</div>,
             interviewDate: data.Interview_Date ? moment(data.Interview_Date).format('DD-MMM-YYYY') : null, 
             designation: data.designation, candidates: data.no_of_candidates })
        })
        setHrTodoList(hrList)




    }, [props.getHrTodoList,])

    useEffect(() => {
        let projectTask = []

        projectTask.push({ id: <div className="ProjectTaskId" onClick={unblockUser} >01</div>, activity: "Activity1", subactivity: "Sub activity1", case: "Case1", startdate: "11-Jan-2021", enddate: "12-Jan-2021" })

        setProjectTodoList(projectTask)
    }, [])




    function openModelFunc(name, id) {
        console.log(name,id,"result")

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
                return (
                    id == val.int_status_id
                )
            })
            setEmployee_Data(checkData)
        }
    }

    // unblockUsers ==>
    function unblockUser() {
        setUnblockuserActive(true)
    }


    return (
        <div>
            {/* <div className="blinkingtext">Welcome</div>   -> blinking content */}
            <div>
                {/* ___________________________________________________________________________ */}
            <EnhancedTable headCells={headCells} rows={hrTodoList} tabletitle={"Hr task"} />
       {/*InrerviewScreen after  Schedule     */}
            <DynModel modelTitle={"Interview"} handleChangeModel={inerviewScreen}  handleChangeCloseModel={(bln) => setInerviewScreen(bln)} width={1000}
             content={<InerviewScreen interviewer_id={can_int_id}
              handleAproverModelClose={(bln) => setInerviewScreen(bln)}  />} />

    {/*EmployeeForm after  selected in interview approve     */}
            <DynModel modelTitle={"Employee Form"} handleChangeModel={EmployeeFormOpen} handleChangeCloseModel={(bln) => setEmployeeFormOpen(bln)} width={1100}
             content={<Employeeform closemodal={(bln) => setEmployeeFormOpen(bln)} emp_form_id={Employee_Data}/>} />

    {/*EmployeeApprove after  value entered in employee form     */}
    
            <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} 
            content={<EmployeeApprove closemodal={(bln) => setApproveOpen(bln)} emp_viewer_id={viewer_id}/>} />

           </div>
            {/* __________________________________________________________________________ */}
            <div>
                <EnhancedTable headCells={projectheadCells} rows={projectTodoList} tabletitle={"Project task"} />
                <DynModel modelTitle={"Unblock User"} handleChangeModel={unblockuserActive} handleChangeCloseModel={(bln) => setUnblockuserActive(bln)} content={<UnblockUserActive closemodal={(bln) => setUnblockuserActive(bln)} />} />
            </div>
            <div>
                <EnhancedTable headCells={workflowheadCells} rows={[]} tabletitle={"Project task"} />
            </div>
        </div>
    )
}

const mapStateToProps = state => (
    {
    getHrTodoList: state.getHrTodoList.getHrToDoListTableData ||[]
}
)

export default connect(mapStateToProps)(TodoList);



