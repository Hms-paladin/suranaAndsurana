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

    useEffect(()=>{
        dispatch(getHrTaskList)
    },[])

    useEffect(()=>{

        let hrList = []

        props.getHrTodoList.map((data)=>{
            hrList.push({id:data.interviewer_id,interviewDate:data.Interview_Date,designation:"----",candidates:data.no_of_candidates})
        })

        setHrTodoList(hrList)

    },[props.getHrTodoList])


    const rows = [
        { id: <div onClick={openModel} className="tempClass" >1</div>, name: 'Interview' },
        { id: <div onClick={openModel3} className="tempClass" >2</div>, name: 'interview approval_Task' },
        { id: <div onClick={openModel2} className="tempClass" >3</div>, name: 'employee approval' },
    ];

    function openModel3() {
        setModelOpen(true)
    }

    function openModel2() {
        setApproveOpen(true)
    }

    function openModel() {
        setInerviewScreen(true)
    }

    // function SchduleTask() {
    //     return (
    //         <div>
    //             <Labelbox type="text" placeholder="Employee Id" />
    //             <Labelbox type="text" placeholder="Employee Name" />
    //             <Labelbox type="text" placeholder="Designation" />
    //             <div className="employeeform_save">
    //                 <Button>Reject</Button>
    //                 <Button>Accept</Button>
    //             </div>
    //         </div>
    //     )
    // }

    // Interview Arrover


    return (
        <>
            <EnhancedTable headCells={headCells} rows={hrTodoList} tabletitle={"Hr task"} />
            <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<InterviewApprover />} />

            <DynModel modelTitle={"Interview"} handleChangeModel={inerviewScreen} handleChangeCloseModel={(bln) => setInerviewScreen(bln)} width={1000}  content={<InerviewScreen />} />

            <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} content={<EmployeeApprove closemodal={(bln) => setApproveOpen(bln)}/>}  />

        </>
    )
}

const mapStateToProps = state => ({
    getHrTodoList: state.getHrTodoList
})

export default connect(mapStateToProps)(TodoList);