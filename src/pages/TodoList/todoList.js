import React, { useEffect, useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import { getHrTaskList } from "../../actions/TodoListAction";
import { useDispatch, connect } from "react-redux";
import moment from "moment";

// Model
import InterviewApprover from "../InterviewApprover/InterviewApprover";
import InerviewScreen from "../Interview/interview"
import EmployeeApprove from '../Employeeform/EmployeeApprove'
import Employeeform from '../Employeeform/employeeform'
import "./todoList.scss"
// import {InsertInterviewquestions} from '../../actions/interviewActions'

// Hr Task:

const headCells = [
    { id: 'id', label: 'Interview ID' },
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



function TodoList(props) {

    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)
    const [approveModalOpen, setApproveOpen] = useState(false)
    const [EmployeeFormOpen, setEmployeeFormOpen] = useState(false)
    const [inerviewScreen, setInerviewScreen] = useState(false)
    const [hrTodoList, setHrTodoList] = useState([])
    const [can_int_id, setcan_int_id] = useState([])
    const [res_id, setres_id] = useState([])
    const [Employee_Data,setEmployee_Data]=useState([])
    const [viewer_id, setviewer_id] = useState([])
    useEffect(() => {
        dispatch(getHrTaskList())
    }, [])

    useEffect(() => {

        let hrList = []
        let todoListdata=[]
      
        props.getHrTodoList.map((data) => {
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
            }
            hrList.push({ id: <div onClick={(id,name) => openModelFunc(showName,showId)} className="tempClass" >{showId}</div>, interviewDate: data.Interview_Date ? moment(data.Interview_Date).format('DD-MMM-YYYY') : null, designation: data.designation, candidates: data.no_of_candidates})
        })
        setHrTodoList(hrList)
        
      console.log(props.getHrTodoList,"ddd")

    }, [props.getHrTodoList])
//  const pageReload=(id)=>{
//      if(id){
//      window.location.reload()
//  }}

    function openModelFunc(name,id) {
      

        if(name==="interviewer_id"){
            setApproveOpen(true) 
            let int_viewer_id= props.getHrTodoList.find((val)=>{
                return(
                    id == val.interviewer_id
                )
            })
            setviewer_id(int_viewer_id)
        }
        else if(name==="resume_id"){
            setModelOpen(true)
            let data_res_id= props.getHrTodoList.find((val)=>{
                return(
                    id == val.resume_id
                )
            })
            setres_id(data_res_id)
        }
        else if(name==="int_details_id"){
            // setModelOpen(true)
            setInerviewScreen(true)
            let checkData= props.getHrTodoList.find((val)=>{
                return(
                    id == val.int_details_id
                )
            })
            setcan_int_id(checkData)
        }
        else if(name==="int_status_id"){
            setEmployeeFormOpen(true)
            let employeedata= props.getHrTodoList.find((val)=>{
                return(
                    id == val.int_status_id
                )
            })
            setEmployee_Data(employeedata)
        }
    }

    return (
        <div>
            {/* <div className="blinkingtext">Welcome</div>   -> blinking content */}
            <div>
            <EnhancedTable headCells={headCells} rows={hrTodoList} tabletitle={"Hr task"} />
            <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<InterviewApprover int_resume_id={res_id}/>} />

            <DynModel modelTitle={"Interview"} handleChangeModel={inerviewScreen}  handleChangeCloseModel={(bln) => setInerviewScreen(bln)} width={1000} content={<InerviewScreen interviewer_id={can_int_id}
             onUpdateRefresh={()=>dispatch}
               handleAproverModelClose={(bln) => setInerviewScreen(bln)}  />} />

            <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} content={<EmployeeApprove closemodal={(bln) => setApproveOpen(bln)} emp_viewer_id={viewer_id}/>} />

            <DynModel modelTitle={"Employee Form"} handleChangeModel={EmployeeFormOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} width={1100} content={<Employeeform closemodal={(bln) => setApproveOpen(bln)} emp_form_id={Employee_Data}/>} />


            </div>
            <div>
                <EnhancedTable headCells={projectheadCells} rows={[]} tabletitle={"Project task"} />
            </div>
            <div>
                <EnhancedTable headCells={workflowheadCells} rows={[]} tabletitle={"Project task"} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    getHrTodoList: state.getHrTodoList
})

export default connect(mapStateToProps)(TodoList);