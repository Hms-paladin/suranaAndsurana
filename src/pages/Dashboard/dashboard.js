import { Button } from "antd";
import React, { useState } from "react";
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";

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

    console.log(modelOpen,"modelopen")
    
    return(
        <>
        <EnhancedTable headCells={headCells} rows={rows} tabletitle={"tests"}  />
        <Button onClick={()=>setModelOpen(true)}>Model</Button>
        <DynModel modelTitle={"test"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />
        </>
    )
}

export default Dashboard;