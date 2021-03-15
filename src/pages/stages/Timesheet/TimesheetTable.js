import React,{useState} from 'react'
import './TimeSheetTable.scss'
import {Checkbox} from 'antd'
import EnhancedTable from '../../../component/DynTable/table';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import edit from '../../../images/edit.svg'
export default function TimeSheetApproval(){
    const [check,setcheck]=useState("")
    const name=[
        "name1","name2"
    ]
    function checkbox(e){
        setcheck(e.target.value)
    }
    const header = [
        { id: 'activity', label: 'Activity' },
        { id: 'sub_act', label: 'Sub Activity' },
        { id: 'assign', label: 'Assigned To' },
        { id: 'start', label: 'Start Date & Time' },
        { id: 'end', label: 'End Date & Time' },
        { id: 'hours', label: 'No of Hours' },
        { id: 'comments', label: 'Comments' },
      ];
        
  const rows = [
      {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox checked={check} onChange={(e)=>checkbox(e)}/>,edit:<img src={edit}/>},
      {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox checked={check}/>},
      {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox checked={check}/>},
      {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox checked={check}/>},
      {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox checked={check}/>},
     
  ];
    return(
        <div className="time_s_t_root">
        <div className="time_sh_table">
            <div><div>Project Name</div><div>Client Name</div></div>
            <div><div>Client Name</div><div> Name1</div></div>
            <div><div>Project Type</div><div>IP Project</div></div>
            <div><div>Project Sub Type</div><div>Trade Mark</div></div>
            <div><div>Process Type</div><div>Opposition</div></div>
        </div>
        <EnhancedTable headCells={header} rows={rows}/>
        <div className="time_s_btnsdiv">
        {/* <CustomButton btnName={"Create Timesheet"} btnCustomColor="customPrimary"  /> */}
        <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
        </div>
        </div>
    )
}