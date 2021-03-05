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
import "./todoList.scss"



const headCells = [
    { id: 'id', label: 'Interview ID' },
    { id: 'interviewDate', label: 'Interview date' },
    { id: 'designation', label: 'Designation' },
    { id: 'candidates', label: 'No. of Candidates' }

];


function TodoList(props) {

    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)
    const [approveModalOpen, setApproveOpen] = useState(false)
    const [inerviewScreen, setInerviewScreen] = useState(false)
    const [hrTodoList, setHrTodoList] = useState([])

    useEffect(() => {
        dispatch(getHrTaskList())
    }, [])

    useEffect(() => {

        let hrList = []

        console.log()

        props.getHrTodoList.map((data) => {
            let showId = null
            let showName = null

            if(data.interviewer_id){
                showId = data.interviewer_id
                showName = "interviewer_id"
            }else if(data.resume_id){
                showId = data.resume_id
                showName = "resume_id"
            }else if(data.int_details_id){
                showId = data.int_details_id
                showName = "int_details_id"
            }

            hrList.push({ id: <div onClick={(name) => openModelFunc(showName)} className="tempClass" >{showId}</div>, interviewDate: data.Interview_Date ? moment(data.Interview_Date).format('DD-MMM-YYYY') : null, designation: data.designation, candidates: data.no_of_candidates })
        })

        setHrTodoList(hrList)

    }, [props.getHrTodoList])


    function openModelFunc(name) {
        if(name === "interviewer_id"){
            setInerviewScreen(true)
        }
        else if(name === "resume_id"){
            setModelOpen(true)
        }
        else if(name === "int_details_id"){
            setApproveOpen(true)
        }
    }

    return (
        <>
            <EnhancedTable headCells={headCells} rows={hrTodoList} tabletitle={"Hr task"} />
            <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<InterviewApprover />} />

            <DynModel modelTitle={"Interview"} handleChangeModel={inerviewScreen} handleChangeCloseModel={(bln) => setInerviewScreen(bln)} width={1000} content={<InerviewScreen />} />

            <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} content={<EmployeeApprove closemodal={(bln) => setApproveOpen(bln)} />} />

        </>
    )
}

const mapStateToProps = state => ({
    getHrTodoList: state.getHrTodoList
})

export default connect(mapStateToProps)(TodoList);