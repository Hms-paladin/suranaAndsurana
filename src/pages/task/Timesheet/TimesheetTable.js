import React, { useState, useEffect } from 'react';
import './TimeSheetTable.scss'
import {Checkbox} from 'antd'
import EnhancedTable from '../../../component/DynTable/table';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import edit from '../../../images/edit.svg'
import DynModel from "../../../component/Model/model";
import EditTimeSheet from '../Timesheet/Timesheet'
import {getTaskTimeSheetbyTaskId } from "../../../actions/projectTaskAction";
import { useDispatch, connect } from "react-redux";
import TimeSheetStart from '../../Search/TimeSheets/timesheetStart';

 function TimeSheetApproval(props){

    const dispatch = useDispatch()
    const [OpenSheet,setOpenSheet]=useState(false)
    const [TimeSheetData, setTimeSheetData] = useState([])

    const [edit_timesheet_data, setEdit_Timesheet_Data] = useState([])

    const [editicon, setEditicon] = useState(false)

    const [timesheetOpens, setTimesheetOpens] = useState(false)

    const handleChangeModel=()=>{
        setOpenSheet(true)
    }

    function checkboxClick(e,index){
        console.log(e.target.checked,index,"checkbox")
        if(e.target.checked===true){
        props.gettimeSheet[index].editicon=true
        }
        else{
        props.gettimeSheet[index].editicon=false
        }
        setEditicon(!editicon)
        // console.log(props.gettimeSheet,"timesheet_data") 
    }

    const EditTimeSheetModel=(data,index)=>{
        setEdit_Timesheet_Data(data,index)
        setOpenSheet(true)
    }   
    useEffect(() => {
        dispatch(getTaskTimeSheetbyTaskId(props.timesheet_data)); 
    }, [props.timesheet_data]);

      useEffect(() => {
        console.log(props.gettimeSheet,"timesheet_data") 
        var updatelist = [];
          props.gettimeSheet&&props.gettimeSheet.length>0&&props.gettimeSheet.map((data,index)=>{
            var listarray = {
                activity:data.activity===null?'-':data.activity,
                sub_activity: data.sub_activity===null?'-':data.sub_activity,
                assigend_to: data.assign_to===null?'-':data.assign_to,
                startdate_time: (data.start_date===null?'-':data.start_date)+' '+(data.start_time===null?'-':data.start_time),
                enddate_time: (data.end_date===null?'-':data.end_date)+' '+(data.end_time===null?'-':data.end_time),
                noofhours: data.end_date===null?'-':data.end_date,
                comments: <Labelbox type="text"/>,
                checkbox: <Checkbox onClick={(e)=>checkboxClick(e,index)} />,
                editicon: data.editicon&&data.editicon===true?<img src={edit} style={{width:"15px",cursor:"pointer"}} onClick={() => EditTimeSheetModel(data,index) }/>:<></>,
                // action: (
                //     <>
                //         <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>onEditLeaveForm(leaveUpdateList[index])}    />{" "}
                //       {/* <img src={Edit} className="editImage" style={{cursor:'pointer'}} onClick={()=>( permission.allow_edit&&permission.allow_edit==='N'?(onEditLeaveForm(leaveUpdateList[index])):rights())}    />{" "} */}
                //       {/* <img src={Delete} className="editImage" style={{cursor:'pointer'}} id={leaveUpdateList[m].emp_leave_mas_id} /> */}
                //     </>
                //   ),
              };
              updatelist.push(listarray);
          })
          
          setTimeSheetData({ updatelist });
          
        
      }, [props.gettimeSheet,editicon]);

      console.log(props.gettimeSheet,"timesheet_data") 
    const header = [
        { id: 'activity', label: 'Activity' },
        { id: 'sub_act', label: 'Sub Activity' },
        { id: 'assign', label: 'Assigned To' },
        { id: 'start', label: 'Start Date & Time' },
        { id: 'end', label: 'End Date & Time' },
        { id: 'hours', label: 'No of Hours' },
        { id: 'comments', label: 'Comments' },
        { id: 'select_all', label: 'Select All' },
      ];
        
//   const rows = [
//       {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox  onChange={Changecheckbox}/>,edit:<img src={edit} style={{width:"15px",cursor:"pointer"}} onClick={() => setOpenSheet(true)}/>},
//       {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox />},
//       {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox />},
//       {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox />},
//       {activity:'Operational', sub_act:"First Cut Draft",assign:"Kaveri",start:"10-Mar-2021 09:30 AM",end:"10-Mar-2021 10:30 AM",hours:"3",comments:<Labelbox type="text"/>,c_box:<Checkbox />},
     
//   ];
    return(
        <div className="time_s_t_root">
        <div className="time_sh_table">
            <div><div>Project Name</div><div>{props.gettimeSheet.length>0&&props.gettimeSheet[0].project_name||'-'}</div></div>
            <div><div>Client Name</div><div> {props.gettimeSheet.length>0&&props.gettimeSheet[0].client||'-'}</div></div>
            <div><div>Project Type</div><div>{props.gettimeSheet.length>0&&props.gettimeSheet[0].project_type||'-'}</div></div>
            <div><div>Project Sub Type</div><div>{props.gettimeSheet.length>0&&props.gettimeSheet[0].client||'-'}</div></div>
            <div><div>Process Type</div><div>{props.gettimeSheet.length>0&&props.gettimeSheet[0].project_type||'-'}</div></div>
        </div>
        <EnhancedTable headCells={header}  rows={TimeSheetData.length == 0 ? TimeSheetData : TimeSheetData.updatelist} />
        <div className="time_s_btnsdiv">
        {/* <CustomButton btnName={"Create Timesheet"} btnCustomColor="customPrimary"  /> */}
        <CustomButton btnName={"Create TimeSheet"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>setTimesheetOpens(true)}/>
        <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>props.closemodal(false)}/>
        </div>
        <DynModel modelTitle={"Edit TimeSheet"} handleChangeModel={OpenSheet} handleChangeCloseModel={(bln) => setOpenSheet(bln)}  content={<EditTimeSheet edit_timesheet={edit_timesheet_data} closemodal={(bln) => setOpenSheet(bln)} />} />

        <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetOpens} handleChangeCloseModel={(bln) => setTimesheetOpens(bln)} width={1000} content={<TimeSheetStart close_model={() => setTimesheetOpens(false)} />} />
        </div>
    )
}

const mapStateToProps = (state) =>
({    
    gettimeSheet: state.projectTasksReducer.getTaskTimeSheetbyTaskId || []
});

export default connect(mapStateToProps)(TimeSheetApproval);
