import React, { useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Button } from "@material-ui/core";



const headCells = [
      { id: 'name', label: 'Head1' },
      { id: 'age', label: 'Head2' },
    ];
      
const rows = [
    {name:'Ranjith', age:23},
    {name:'Ranjith', age:1},
    {name:'Ranjith', age:2},
    {name:'Ranjith', age:3},
    {name:'Ranjith', age:23},
];

function Dashboard(){

    const [ modelOpen, setModelOpen ] = useState(false)

    const [ approveModalOpen, setApproveOpen] = useState(false)

    console.log(modelOpen,"modelopen")
    
    return(
        <>
        <EnhancedTable headCells={headCells} rows={rows} tabletitle={"tests"}  />
        <Button onClick={()=>setModelOpen(true)}>Model</Button>
        <DynModel modelTitle={"test"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />

        <Button onClick={()=> setApproveOpen(true)}>Employee Approval Modal</Button>
        <DynModel modelTitle={"Employee Approve"} handleChangeModel={approveModalOpen} handleChangeCloseModel={(bln)=>setApproveOpen(bln)}
>
        <div>
             <Labelbox type="text" placeholder="Employee Id"/>
             <Labelbox type="text" placeholder="Employee Name"/>
             <Labelbox type="text" placeholder="Designation"/>
             <div className="employeeform_save">
                 <Button>Reject</Button>
                 <Button>Accept</Button>

                 </div>

         </div>
</DynModel>


        </>
    )
}

export default Dashboard;