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
import {update_approve_timesheet } from "../../../actions/TimeSheetAction";
import { useDispatch, connect } from "react-redux";
import TimeSheetStart from '../../Search/TimeSheets/timesheetStart';
import { notification } from "antd";
import {getOtherTask } from "../../../actions/TodoListAction";

 function TimeSheetApproval(props){

    const dispatch = useDispatch()
    const [OpenSheet,setOpenSheet]=useState(false)
    const [TimeSheetTable, setTimeSheetTable] = useState([])

    const [edit_timesheet_data, setEdit_Timesheet_Data] = useState([])
    const [edit_timesheet_index, setEdit_Timesheet_Index] = useState('')
    
    const [editicon, setEditicon] = useState(false)

    const [timesheetOpens, setTimesheetOpens] = useState(false)

    const [TimeSheetArr, setTimeSheetArr] = useState([])

    const handleChangeModel=()=>{
        setOpenSheet(true)
    }

    const header = [
        { id: 'activity', label: 'Activity' },
        { id: 'sub_act', label: 'Sub Activity' },
        { id: 'assign', label: 'Assigned To' },
        { id: 'start', label: 'Start Date & Time' },
        { id: 'end', label: 'End Date & Time' },
        { id: 'hours', label: 'No of Hours' },
        { id: 'comments', label: 'Comments' },
        { id: 'select_all', label: 'Select All' },
        { id: '', label: <Checkbox onClick={(e)=>selectAll(e)} /> },
        
      ];

    useEffect(() => {
        dispatch(getTaskTimeSheetbyTaskId(props.timesheet_data)); 
    }, [props.timesheet_data]);

    function checkboxClick(e,index){
        console.log(e.target.checked,index,"checkbox")
        if(e.target.checked===true){
        TimeSheetArr[index].editicon=true
        }
        else{
        TimeSheetArr[index].editicon=false
        }
        setEditicon(!editicon)
      
    }
function selectAll(e){
    if(e.target.checked===true){
        TimeSheetArr.map((data,index)=>{
            TimeSheetArr[index].editicon=true
        })
    }else{
        TimeSheetArr.map((data,index)=>{
            TimeSheetArr[index].editicon=false
        })
    }
    setEditicon(!editicon)
    // console.log(e.target.checked,'checksss')
}
function edittimesheetResult(data){
    TimeSheetArr[edit_timesheet_index]=data
    setEditicon(!editicon)
}
    const EditTimeSheetModel=(data,index)=>{
        setEdit_Timesheet_Data(data)
        setEdit_Timesheet_Index(index)
        setOpenSheet(true)
    }  
    
    const Editcomment=(data,index)=>{
        TimeSheetArr[index].comment=data
        setEditicon(!editicon)
    }
    function ApproveTimesheet(){
        if(TimeSheetArr&&TimeSheetArr.length>0){
            let data_res_id = TimeSheetArr.find((val) => {
                return (
                    val.editicon&&val.editicon===true 
                )
            })
            // console.log(data_res_id,"data_res_id")

            if(!data_res_id){
                notification.success({
                    message: 'Please select atleast one timesheet',
                });
            }else{
                dispatch(update_approve_timesheet(TimeSheetArr)).then(() => {
                    dispatch(getOtherTask())
                    props.closemodal(false)
                })
            }
        }
        
    } 

    useEffect(() => {

        var updatelist = [];
         if( TimeSheetArr&&TimeSheetArr.length>0){
          TimeSheetArr.map((data,index)=>{
            var listarray = {
                activity:data.activity===null?'-':data.activity,
                sub_activity: data.sub_activity===null?'-':data.sub_activity,
                assigend_to: data.assign_to===null?'-':data.assign_to,
                startdate_time: (data.start_date===null?'-':data.start_date)+' '+(data.start_time===null?'-':data.start_time),
                enddate_time: (data.end_date===null?'-':data.end_date)+' '+(data.end_time===null?'-':data.end_time),
                noofhours: data.no_of_hrs===null?'-':data.no_of_hrs,
                comments: <Labelbox type="text" value={data.comment} changeData={(comment)=>Editcomment(comment,index)}/>,
                checkbox: <Checkbox onClick={(e)=>checkboxClick(e,index)} checked={data.editicon?true:false}/>,
                editicon: data.editicon&&data.editicon===true?<img src={edit} style={{width:"15px",cursor:"pointer"}} onClick={() => EditTimeSheetModel(data,index) }/>:<></>,

              };
              updatelist.push(listarray);
          })
          setTimeSheetTable({ updatelist });
        }

      }, [TimeSheetArr,editicon]);

    useEffect(() => {
        setTimeSheetArr(props.gettimeSheet)
    }, [props.gettimeSheet]);

 
        
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
            <div><div>Project Name</div><div>{TimeSheetArr.length>0&&TimeSheetArr[0].project_name||'-'}</div></div>
            <div><div>Client Name</div><div> {TimeSheetArr.length>0&&TimeSheetArr[0].client||'-'}</div></div>
            <div><div>Project Type</div><div>{TimeSheetArr.length>0&&TimeSheetArr[0].project_type||'-'}</div></div>
            <div><div>Project Sub Type</div><div>{TimeSheetArr.length>0&&TimeSheetArr[0].sub_project_type||'-'}</div></div>
            <div><div>Process Type</div><div>{TimeSheetArr.length>0&&TimeSheetArr[0].process||'-'}</div></div>
        </div>
        <EnhancedTable headCells={header}  rows={TimeSheetTable.length == 0 ? TimeSheetTable : TimeSheetTable.updatelist} />
        <div className="time_s_btnsdiv">
        {/* <CustomButton btnName={"Create Timesheet"} btnCustomColor="customPrimary"  /> */}
        <CustomButton btnName={"Create TimeSheet"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>setTimesheetOpens(true)}/>
        <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>ApproveTimesheet()}/>
        </div>
        <DynModel modelTitle={"Edit TimeSheet"} handleChangeModel={OpenSheet} handleChangeCloseModel={(bln) => setOpenSheet(bln)}  content={<EditTimeSheet edit_timesheet={edit_timesheet_data} update_data={(data)=>edittimesheetResult(data)} closemodal={(bln) => setOpenSheet(bln)} />} />

        <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetOpens} handleChangeCloseModel={(bln) => setTimesheetOpens(bln)} width={1000} content={<TimeSheetStart approve_timesheet={TimeSheetArr[0]} close_model={() => setTimesheetOpens(false)} />} />
        </div>
    )
}

const mapStateToProps = (state) =>
({    
    gettimeSheet: state.projectTasksReducer.getTaskTimeSheetbyTaskId || []
});

export default connect(mapStateToProps)(TimeSheetApproval);
