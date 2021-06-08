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
    
   console.log('1')
        var paramVal =props.rowData;
        console.log('2')
        useEffect(() => {
            dispatch(getTaskTimeSheet(paramVal.task_id));
        
          }, []);
    
        useEffect(() => {
            if(props.getTaskTimeSheet.length >0 ){
                
                if(props.getTaskTimeSheet[0].timesheet.length >0 ){
                    var tsSize =props.getTaskTimeSheet.length -1;
                if(props.getTaskTimeSheet[0].timesheet[tsSize].start_date == null && props.getTaskTimeSheet[0].timesheet[tsSize].start_time == null){
                    setTimesheetStart(true) 
                    settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);
                }else{
                setTimesheetStart(false)
                setstartDateDisplay(props.getTaskTimeSheet[0].timesheet[tsSize].start_date);
                setstartTimeDisplay(props.getTaskTimeSheet[0].timesheet[tsSize].start_time);
                settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);
                }
            }
            }else{
                setTimesheetStart(true)
            }
            //var a =props.rowData
        }, [props.getTaskTimeSheet])

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

    function changestart () {
        setTimesheetStart(false)
        var a = props;
        var timesheetData =  {
            "end_date":timeSheetForm.toDate.value,
            "end_time":(timeSheetForm.endTime.value!==null && timeSheetForm.endTime.value!=='')?moment(timeSheetForm.endTime.value).format('HH:mm:ss') : '00:00:00',//dateFormat(timeSheetForm.endTime.value != undefined ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss"),
            "comment":timeSheetForm.description.value,
            "updated_by":localStorage.getItem("empId"),
            "timesheet_id":timeSheetID
        }
        dispatch(insertTimeSheetbyTime(timesheetData,false,props.rowData)).then((response) => {
           // handleCancel();
          })
    }

    function changeStop() {
        setTimesheetStart(true)
        
        var timesheetData = {
            "emp_id": localStorage.getItem("empId"),
            "task_id": props.rowData.task_id,
            "start_date": timeSheetForm.fromDate.value,
            "start_time": (timeSheetForm.startTime.value!==null && timeSheetForm.startTime.value!=='')?moment(timeSheetForm.startTime.value).format('HH:mm:ss') : '00:00:00',//dateFormat(timeSheetForm.startTime.value != undefined ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss"),
            "comment": timeSheetForm.description.value,
            "created_by": localStorage.getItem("empId"),
        }
        dispatch(insertTimeSheetbyTime(timesheetData,true,props.rowData,startDateDisplay)).then((response) => {
           // handleCancel();
          })
    }
    const handleCancel = () => {
        let From_key = [
            "activity",
            "subActivity",
            "fromDate",
            "toDate",
            "assignTo",
            "tag",
            "priority",
            "startTime", "description"
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
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>IP Project</Grid>
                            <Grid item xs={12}>Operational</Grid>
                            <Grid item xs={12}>Priority</Grid>
                            {/* <Grid item xs={9}>
                        <Labelbox type="datepicker"
                            placeholder={" Deadline "}
                             />
                    </Grid> */}

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Project Name </Grid>
                            <Grid item xs={12}>First Cut Draft</Grid>
                            <Grid item xs={12}>Tag</Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Johnson & Johnson</Grid>
                            <Grid item xs={12}>Assign To</Grid>
                            <Grid item xs={12}>Description</Grid>

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
                                       placeholder={" Deadline "}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Labelbox type="timepicker"
                                       placeholder={"Deadline"}
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
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                        <CustomButton btnName={"START"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={changeStop}/>


                    </div>

                </>
                :
                <>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>IP Project</Grid>
                            <Grid item xs={12}>Operational</Grid>
                            <Grid item xs={12}>Priority</Grid>
                            {/* <Grid item xs={9}>
                        <Labelbox type="datepicker"
                            placeholder={" Deadline "}
                             />
                    </Grid> */}

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Project Name </Grid>
                            <Grid item xs={12}>First Cut Draft</Grid>
                            <Grid item xs={12}>Tag</Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Johnson & Johnson</Grid>
                            <Grid item xs={12}>Assign To</Grid>
                            <Grid item xs={12}>Description</Grid>

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
                                        placeholder={" Deadline "}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Labelbox type="timepicker"
                                       placeholder={"Deadline"}
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
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
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