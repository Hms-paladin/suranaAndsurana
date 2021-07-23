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
import { getProjectTimeSheetList } from "../../../actions/TimeSheetAction";

import moment from 'moment';

function Timesheetmodel(props) {
    const[timesheetview,setTimeSheetView]=useState(false)
    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {
       
    }, [props.rowData])
if(rowId == undefined){
    if(props.rowData && props.rowData != undefined){
    rowId = props.rowData.project_id;
    }
}

useEffect(() => {
    dispatch(getProjectTimeSheetList(rowId)); 
    
  }, [props.rowData]);

  
console.log("propsTImeSheet", props);

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
                    style={{ padding: 5 }}
                >
                    <Grid item xs={3}>
                        <label className="maintitle"></label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">Start Date & Time</label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">End Date & Time</label>
                    </Grid>
                    <Grid item xs={3}container direction="row">
                        <div style={{display:"flex",justifyContent:"flex-start"}}>
                            <label className="maintitle">No. of Hours</label>
                            {/* <label className="maintitle">Action</label> */}
                        </div>
                    </Grid>
                   {/* <Grid item xs={3}>
                        <label className="maintitle">Action</label>
                    </Grid>  */}
                </Grid>


                {props.timeSheetProject.map(data => (
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ border: '1px solid lightgray',paddingLeft: -5 }}
                >
                    <Grid item xs={3}>
                    <Grid item xs={12}>
                        <div style={{display:'grid',textAlign:'center'}}>
                            <label style={{ fontWeight: 'bold' }}>{data.activity} </label>
                            <label className="subtitle"> {data.sub_activity}</label>
                        </div>
                    </Grid>

                    </Grid>
                    <Grid item xs={9}>
                        <div className="time_doc_values">
                            <div>{data.start_date} & {data.start_time}</div>
                            <div>{data.end_date} & {data.end_time}</div>
                            <div style={{textAlign: "center"}}>{moment.utc(moment(data.start_time,"HH:mm:ss").diff(moment(data.end_time,"HH:mm:ss"))).format("HH:mm:ss")}</div>
                            {/* <div>
                            <img src={PlusIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}
                            onClick={()=>setTimeSheetView(true)}></img>
                            <img src={EditIcon} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            <img src={Delete} style={{width:"18px",padding:"2px",cursor:"pointer"}}></img>
                            </div> */}
                        </div>
                        {/* <div className="time_doc_values">
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
                        </div>*/}
                       
                    </Grid>

                </Grid>
                ))}
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





