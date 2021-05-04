import React, { useState } from 'react';
import './Timesheetmodel.scss';
import Grid from '@material-ui/core/Grid';
import PlusIcon from "../../../images/plusIcon.svg";
import EditIcon from "../../../images/editable.svg";
import Delete from '../../../images/dashboard/delete.svg';
import CustomButton from '../../../component/Butttons/button';
import TimeSheetView from '../../Search/TimeSheets/timesheetview';
import DynModel from "../../../component/Model/model";
function Timesheetmodel(props) {
    const[timesheetview,setTimeSheetView]=useState(false)
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
                            <label className="maintitle">Action</label>
                        </div>
                    </Grid>
                   {/* <Grid item xs={3}>
                        <label className="maintitle">Action</label>
                    </Grid>  */}
                </Grid>


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
                                <label style={{ fontWeight: 'bold' }}>Documentation </label>
                                <label className="subtitle"> Sub Activity</label>
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
                            justify="center"
                            spacing={2}
                        >
                            <Grid item xs={3} justify="center" alignItems="center">
                            <div style={{textAlign:"center"}}>07-Mar-2020  07:00 am</div>
                            </Grid>
                            <Grid item xs={3}>
                            <div style={{textAlign:"center"}}>07-Mar-2020  08:00 am</div>
                            </Grid>
                            <Grid item xs={3}>
                            <div style={{textAlign:"center"}}>1</div>
                            </Grid>
                            <Grid item xs={3} container direction="row">
                                <div style={{textAlign:"center"}}>
                                <img src={PlusIcon} style={{width:"15px",padding:"2px"}}></img>
                                <img src={EditIcon} style={{width:"15px",padding:"2px"}}></img>
                                <img src={Delete} style={{width:"15px",padding:"2px"}}></img>
                                </div>
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
                        </Grid> */}

                    </Grid>

                </Grid>
                <Grid
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
                        </Grid> */}


                    </Grid>

                </Grid>
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
export default Timesheetmodel;





