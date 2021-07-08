import React, { useState,useEffect } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getTaskTimeSheet,insertTimeSheetbyTime } from "../../../actions/projectTaskAction";
import dateFormat from 'dateformat';
import moment from 'moment';
function TimeSheetView(props) {
    const [timesheetStart, setTimesheetStart] = useState(true)
    const [isLoaded, setisLoaded] = useState(true)
    const [startDateDisplay, setstartDateDisplay] = useState("")
    const [startTimeDisplay, setstartTimeDisplay] = useState("")
    const [timeSheetID, settimeSheetID] = useState("")
    const dispatch = useDispatch();
    console.log(timesheetStart, "timesheetStart")
    const [timeSheetForm, settimeSheetForm] = useState({
        startTime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        fromDate: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        toDate: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        endTime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        }

    })
    //dispatch(getTaskTimeSheet(props.rowData.task_id));
   console.log('1')
        //var paramVal =props.rowData;
        console.log('2')
        useEffect(() => {
            dispatch(getTaskTimeSheet(props.rowData.task_id));
        
          }, []);
    
        useEffect(() => {
            //if(dispatch(getTaskTimeSheet(props.rowData.task_id));)
            handleCancel();
            if(props.getTaskTimeSheet && props.getTaskTimeSheet[0] && props.getTaskTimeSheet[0].task_id==props.rowData.task_id ){
            if(props.getTaskTimeSheet.length >0 ){
                
                if(props.getTaskTimeSheet[0].timesheet.length >0 ){
                    var tsSize =props.getTaskTimeSheet[0].timesheet.length -1;
                if(props.getTaskTimeSheet[0].timesheet[tsSize].start_date == null && props.getTaskTimeSheet[0].timesheet[tsSize].start_time == null){
                    setTimesheetStart(true) 
                    settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);
                }else if(props.getTaskTimeSheet[0].timesheet[tsSize].end_date != null && props.getTaskTimeSheet[0].timesheet[tsSize].end_time != null){
                    var timeObj ={
                
                        "activity_id": null,
                        "end_date": null,
                        "end_time": null,
                        "project_id": null,
                        "start_date": null,
                        "start_time": null,
                        "sub_activity": null,
                        "sub_activity_id": null,
                        "task_id":props.rowData.task_id ,
                        "timesheet_id": null,
                        "total_hours": null
                    };
                    props.getTaskTimeSheet[0].timesheet.push(timeObj);
                    setTimesheetStart(true) 
                    settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize+1].timesheet_id);
                }
                    else{
                setTimesheetStart(false);
                
                setstartDateDisplay(moment(props.getTaskTimeSheet[0].timesheet[tsSize].start_date).format("DD MMM YYYY"));
                var startttime = moment(props.getTaskTimeSheet[0].timesheet[tsSize].start_time, ["HH.mm"]).format("hh:mm A");
                setstartTimeDisplay(startttime);
                settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);
                }
            }
            }else{
                setTimesheetStart(true)
            }
        }else{
            dispatch(getTaskTimeSheet(props.rowData.task_id));
        }
            //var a =props.rowData
        }, [props.getTaskTimeSheet,props.rowData])

    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            timeSheetForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: timeSheetForm[key].validation,
        };

        

        settimeSheetForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    function closeModel(){
        
        props.handleChangeCloseModel(false);  
      }
    function changestart () {
        setTimesheetStart(true);
        var a = props;
        var timesheetData =  {
            "end_date":timeSheetForm.toDate.value,
            "end_time":(timeSheetForm.endTime.value!==null && timeSheetForm.endTime.value!=='')?moment(timeSheetForm.endTime.value).format('HH:mm:ss') : moment(new Date()).format("HH:mm:ss"),//dateFormat(timeSheetForm.endTime.value != undefined ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss"),
            "comment":timeSheetForm.description.value,
            "updated_by":localStorage.getItem("empId"),
            "timesheet_id":timeSheetID
        }
        dispatch(insertTimeSheetbyTime(timesheetData,false,props.rowData)).then((response) => {
           // handleCancel();
          // dispatch(getTaskTimeSheet(props.rowData.task_id)).then((response) => {
            // handleCancel();
           // dispatch(getTaskTimeSheet(props.rowData.task_id));
           dispatch(getTaskTimeSheet(props.rowData.task_id)).then((response) => {
            props.handleChangeCloseModel(false);  
         })
           //})
          // props.handleChangeCloseModel(false);  
          })
    }

    function changeStop() {
        setTimesheetStart(false);
        
        var timesheetData = {
            "emp_id": localStorage.getItem("empId"),
            "task_id": props.rowData.task_id,
            "start_date": timeSheetForm.fromDate.value,
            "start_time": (timeSheetForm.startTime.value!==null && timeSheetForm.startTime.value!=='')?moment(timeSheetForm.startTime.value).format('HH:mm:ss') : moment(new Date()).format("HH:mm:ss"),//dateFormat(timeSheetForm.startTime.value != undefined ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss"),
            "comment": timeSheetForm.description.value,
            "created_by": localStorage.getItem("empId"),
        }
       dispatch(insertTimeSheetbyTime(timesheetData,true,props.rowData,startDateDisplay)).then((response) => {
           // handleCancel();
           dispatch(getTaskTimeSheet(props.rowData.task_id)).then((response) => {
           props.handleChangeCloseModel(false);  
        })
         })
    }
  
    
    const handleCancel = () => {
        let From_key = [
            "startTime",
            "fromDate",
            "toDate",
            "endTime", "description"
        ];

        From_key.map((data) => {
            try {
                timeSheetForm[data].value = "";
                console.log("mapping", timeSheetForm[data].value);
            } catch (error) {
                throw error;
            }
        });
        settimeSheetForm((prevState) => ({
            ...prevState,
        }));
    };
    
    return (
        <div className="timeSheetStartContainer">
            {timesheetStart ?
                <>
                      <Grid item xs={12} container direction="row" >
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.project_type : 'Adhoc Task'}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.activity != null ? props.rowData.activity  : props.rowData.tag}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.Priority}</div></Grid>
       
                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_name != null ? props.rowData.project_name : props.rowData.description}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.sub_activity}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ?  props.rowData.tag : ''}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.client  != null ? props.rowData.client : props.rowData.assignee_name}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.assignee_name : ""}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.description : ''}</div></Grid>

                        </Grid>
               

                    </Grid>
                    <div className="timeSheetDatesFormat">
                        <Grid item xs={12} container direction="row" spacing={5}>

                           
                            <Grid item xs={7} container direction="row" spacing={5}>

                                <Grid item xs={6}>
                                    <Labelbox type="datepicker"
                                       changeData={(data) => checkValidation(data, "fromDate")}
                                       value={timeSheetForm.fromDate.value}
                                       error={timeSheetForm.fromDate.error}
                                       errmsg={timeSheetForm.fromDate.errmsg}
                                       placeholder={" Start Date "}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Labelbox type="timepicker"
                                       placeholder={"Start Time"}
                                       changeData={(data) =>
                                           checkValidation(data, "startTime")
                                       }
                                       value={timeSheetForm.startTime.value}
                                       error={timeSheetForm.startTime.error}
                                       errmsg={timeSheetForm.startTime.errmsg}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={5} container direction="row" justify="center" spacing={4}>
                                <Grid item xs={6}>End Date</Grid>
                                <Grid item xs={6}>End Time</Grid>

                            </Grid>
                        </Grid>
                    </div>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} 
                         changeData={(data) => checkValidation(data, "description")}
                         value={timeSheetForm.description.value}
                         error={timeSheetForm.description.error}
                         errmsg={timeSheetForm.description.errmsg}/>
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={closeModel}/>
                        <CustomButton btnName={"START"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={changeStop}/>


                    </div>

                </>
                :
                <>
                        <Grid item xs={12} container direction="row" >
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.project_type : 'Adhoc Task'}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.activity != null ? props.rowData.activity  : props.rowData.tag}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.Priority}</div></Grid>
       
                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_name != null ? props.rowData.project_name : props.rowData.description}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.sub_activity}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ?  props.rowData.tag : ''}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.client  != null ? props.rowData.client : props.rowData.assignee_name}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.assignee_name : ""}</div></Grid>
                            <Grid item xs={4}><div style={{width: 250}}>{props.rowData.project_type != null ? props.rowData.description : ''}</div></Grid>

                        </Grid>
               

                    </Grid>
                    <div className="timeSheetDatesFormat">
                        <Grid item xs={12} container direction="row" spacing={5}>

                            <Grid item xs={5} container direction="row" justify="center" spacing={4}>
                                <Grid item xs={6}>{startDateDisplay}</Grid>
                                <Grid item xs={6}>{startTimeDisplay}</Grid>

                            </Grid>
                            <Grid item xs={7} container direction="row" spacing={5}>

                                <Grid item xs={6}>
                                    <Labelbox type="datepicker"
                                        changeData={(data) => checkValidation(data, "toDate")}
                                        value={timeSheetForm.toDate.value}
                                        error={timeSheetForm.toDate.error}
                                        errmsg={timeSheetForm.toDate.errmsg}
                                        placeholder={" End date "}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Labelbox type="timepicker"
                                       placeholder={"End Time"}
                                       changeData={(data) =>
                                           checkValidation(data, "endTime")
                                       }
                                       value={timeSheetForm.endTime.value}
                                       error={timeSheetForm.endTime.error}
                                       errmsg={timeSheetForm.endTime.errmsg}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} 
                         changeData={(data) => checkValidation(data, "description")}
                         value={timeSheetForm.description.value}
                         error={timeSheetForm.description.error}
                         errmsg={timeSheetForm.description.errmsg}/>
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={closeModel}/>
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={changestart}/>





                    </div>

                </>
            }

        </div>

    )
}
const mapStateToProps = (state) =>
({
    getTaskTimeSheet: state.projectTasksReducer.getTaskTimeSheet,
});
export default connect(mapStateToProps)(TimeSheetView);