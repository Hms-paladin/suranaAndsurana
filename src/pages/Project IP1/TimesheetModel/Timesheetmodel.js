import React, { useState, useEffect } from 'react';
import './Timesheetmodel.scss';
import Grid from '@material-ui/core/Grid';
import PlusIcon from "../../../images/plusIcon.svg";
import EditIcon from "../../../images/editable.svg";
import Delete from '../../../images/dashboard/delete.svg';
import CustomButton from '../../../component/Butttons/button';
import TimeSheetView from '../../Search/TimeSheets/timesheetview';
import DynModel from "../../../component/Model/model";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectTimeSheetList,getProjectTimeSheetListByTaskId } from "../../../actions/TimeSheetAction";

import moment from 'moment';

function Timesheetmodel(props) {
    const[timesheetview,setTimeSheetView]=useState(false)
    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {
       
    }, [props.rowData])
    let task_id ;
if(rowId == undefined){
    if(props.rowData && props.rowData != undefined){
        task_id = props.rowData.task_id;
    }
}

useEffect(() => {
    if(rowId && rowId != undefined){
    dispatch(getProjectTimeSheetList(rowId)); 
    }else if(props.rowData && props.rowData != undefined){
    dispatch(getProjectTimeSheetListByTaskId(props.rowData.task_id)); 
    }
  }, [props.rowData]);

  
// console.log("propsTImeSheet", props);

    return (
        <div className="tabIconsViewtooltip">
        <div className="tooltiptitle">Time Sheet</div>
        <div style={{ backgroundColor: '#F0F0F0', padding: 10 }}>
            <Grid container >
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ padding: 5,marginLeft: 100,textAlign: 'center'}}
                >
                    {/* <Grid item xs={2}>
                        <label className="maintitle"></label>
                    </Grid> */}
                    <Grid item xs={3}>
                        <label className="maintitle">Start Date & Time</label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">End Date & Time</label>
                    </Grid>
                    <Grid item xs={3}container direction="row">
                        {/* <div style={{display:"flex",justifyContent:"flex-start",whiteSpace:'nowrap'}}> */}
                            <label className="maintitle">No. of Hours</label>
                            {/* <label className="maintitle">Action</label> */}
                        {/* </div> */}
                    </Grid>
                    {!props.rowData&&
                    <Grid item xs={3}container direction="row">
                        {/* <div style={{display:"flex",justifyContent:"flex-start"}}> */}
                            <label className="maintitle">Employee</label>
                            {/* <label className="maintitle">Action</label> */}
                        {/* </div> */}
                    </Grid>
                    }
                   {/* <Grid item xs={3}>
                        <label className="maintitle">Action</label>
                    </Grid>  */}
                </Grid>


                {props.timeSheetProject.map(data => (
                    <>
                    <div style={{ border: '1px solid lightgray',display: 'flex',width: '100%'}}>
                        <div style={{display:'grid', width: '20%'}}>
                            <label style={{ fontWeight: 'bold' }}>{data.activity} </label>
                             <label className="subtitle"> {data.sub_activity}</label>
                        </div>
                   
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                   style={{textAlign: 'center'}}
                >
                    {/* <Grid item xs={3}>
                    <Grid item xs={12}>
                        <div style={{display:'grid'}}>
                            <label style={{ fontWeight: 'bold' }}>{data.activity} </label>
                            <label className="subtitle"> {data.sub_activity}</label>
                        </div>
                    </Grid>

                    </Grid> */}
                    <Grid item xs={3}>
                        {/* <div className="time_doc_values"> */}
                            <div  style={{textAlign:'center'}}>{moment(data.start_date).format("DD-MMM-YYYY")} {data.start_time != null ? '&' : ""} {data.start_time}</div>
                            {/* <div>{moment(data.end_date).format("DD-MMM-YYYY")} {data.end_time != null ? '&' : ""} {data.end_time}</div> */}
                        {/* </div> */}
                    </Grid>

                    <Grid item xs={3}>
                        {/* <div className="time_doc_values"> */}
                            {/* <div>{moment(data.start_date).format("DD-MMM-YYYY")} {data.start_time != null ? '&' : ""} {data.start_time}</div> */}
                            <div  style={{textAlign:'center'}}>{moment(data.end_date).format("DD-MMM-YYYY")} {data.end_time != null ? '&' : ""} {data.end_time}</div>
                        {/* </div> */}
                    </Grid>
                    
                    <Grid item xs={3}>
                    <div  style={{textAlign:'center'}}>
                                    {/* {data.start_time == null || data.end_time == null ? '' : moment.utc(moment(data.start_time,"HH:mm:ss").diff(moment(data.end_time,"HH:mm:ss"))).format("HH:mm:ss")} */}
                                    {data.no_hrs||data.total_hours}
                                </div>
                       

                    </Grid>
                    {!props.rowData&&
                    <Grid item xs={3}>
                    <div  style={{textAlign:'center'}}>
                                    {/* {data.start_time == null || data.end_time == null ? '' : moment.utc(moment(data.start_time,"HH:mm:ss").diff(moment(data.end_time,"HH:mm:ss"))).format("HH:mm:ss")} */}
                         {data.assign_to}
                     </div>
                    </Grid>}
                    
                </Grid>
                </div> </> ))}
                {/* <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ border: '1px solid lightgray', borderTop: 0 }}
                >
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                        <div style={{display:'grid',textAlign:'center'}}>
                            <label style={{ fontWeight: 'bold' }}>Hearing </label>
                            <label className="subtitle"> Non effective</label>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                    <div className="time_doc_values">
                            <div>07-Mar-2020  08:00 am</div>
                            <div>07-Mar-2020  08:00 am</div>
                            <div>1</div>
                            <div>
                            <img src={PlusIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}
                            onClick={()=>setTimeSheetView(true)}></img>
                            <img src={EditIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            <img src={Delete} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            </div>
                        </div>
                        <div className="time_doc_values">
                            <div>07-Mar-2020  08:00 am</div>
                            <div>07-Mar-2020  08:00 am</div>
                            <div>1</div>
                            <div>
                            <img src={PlusIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}
                            onClick={()=>setTimeSheetView(true)}></img>
                            <img src={EditIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            <img src={Delete} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            </div>
                        </div>
                        {/* <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid> 


                    </Grid>

                </Grid> */}
                <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetview} handleChangeCloseModel={(bln) => setTimeSheetView(bln)} content={<TimeSheetView />} width={1000} />
                {/* <div style={{display:"flex",justifyContent:"center",width: "100%",paddingTop: "5px"}}>
                    <CustomButton btnName={"Start"} btnCustomColor="customPrimary"
                    custombtnCSS={"ok_btn_css"} onBtnClick={()=>setTimeSheetView(true)}/>
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetview} handleChangeCloseModel={(bln) => setTimeSheetView(bln)} content={<TimeSheetView />} width={1000} />
                </div> */}
            </Grid>
        </div>
    </div>
    )
}


const mapStateToProps = (state) =>
({    
    timeSheetProject: state.getTaskList.getTimeSheetProject || []
});

export default connect(mapStateToProps)(Timesheetmodel);





