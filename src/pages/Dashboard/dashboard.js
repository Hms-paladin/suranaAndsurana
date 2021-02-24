import React from "react";
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
    
    return(
        <>
        <EnhancedTable headCells={headCells} rows={rows} tabletitle={"tests"}  />
        <DynModel modelTitle={"test"} />
        </>
    )
}

export default Dashboard;