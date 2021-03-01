import React, { useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import Labelbox from "../../helpers/labelbox/labelbox";

import { Button } from "@material-ui/core";

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

    const rows = [
        { id: <div onClick={openModel} className="tempClass" >1</div>, name: 'Interview' },
        { id: <div onClick={openModel3} className="tempClass" >2</div>, name: 'interview approval_Task' },
        { id: <div onClick={openModel2} className="tempClass" >3</div>, name: 'employee approval' },
    ];

    const [modelOpen, setModelOpen] = useState(false)
    const [approveModalOpen, setApproveOpen] = useState(false)
    const [inerviewScreen, setInerviewScreen] = useState(false)

    return (
        <>
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={"Hr task"} />
            <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} width={1000} content={<InterviewApprover />} />

            <DynModel modelTitle={"Schedule & Task"} handleChangeModel={inerviewScreen} handleChangeCloseModel={(bln) => setInerviewScreen(bln)} width={1000}  content={<InerviewScreen />} />

            <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln) => setApproveOpen(bln)} content={<EmployeeApprove closemodal={(bln) => setApproveOpen(bln)}/>}  />

        </>
    )
}

export default TodoList;