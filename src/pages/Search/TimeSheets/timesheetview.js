import React, { useState, useEffect } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Buttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getTaskTimeSheet, insertTimeSheetbyTime } from "../../../actions/projectTaskAction";
import moment from 'moment';
import axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import {getProjectTimeSheetListByTaskId } from "../../../actions/TimeSheetAction";
function TimeSheetView(props) {
    const dispatch = useDispatch();
    const [TimeSheetStartProcess, setTimeSheetStartProcess] = useState(true)
    const [startDateDisplay, setstartDateDisplay] = useState("")
    const [startTimeDisplay, setstartTimeDisplay] = useState("")
    const [timeSheetID, settimeSheetID] = useState("")
    const [TimeOverlap, setTimeOverlap] = useState(false);
    const [FinalCheckTimeOverlap, setFinalCheckTimeOverlap] = useState(false);
    const [EndDateTimeShow, setEndDateTimeShow] = useState(false);
    const [EndTimeExceed, setEndTimeExceed] = useState(false);
    const [timeSheetForm, settimeSheetForm] = useState({
        startTime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        fromDate: {
            value: new Date(),
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

    function checkValidation(data, key) {
        if(key==="fromDate"||key==="startTime"||key==="endTime"){
            if(!FinalCheckTimeOverlap){
                setFinalCheckTimeOverlap(true)
            }
            if(key==="fromDate"){
                Todateopen(data,timeSheetForm.startTime.value)
            }else if(key==="startTime"){
                Todateopen(timeSheetForm.fromDate.value,data)
            }else{
                TimeSheetValidation(timeSheetForm.fromDate.value,timeSheetForm.startTime.value,data)
            }
      
        }
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

    async function submitStartTimeSheet() {
        var result1=true
        if(!FinalCheckTimeOverlap){
             result1= await Todateopen(timeSheetForm.fromDate.value,timeSheetForm.startTime.value,timeSheetForm.endTime.value)
            setFinalCheckTimeOverlap(true)
       }
       if(result1){
        
        var timesheetStopData;
        var timesheetData = {
            "emp_id": localStorage.getItem("empId"),
            "task_id": props.rowData.task_id,
            "start_date": moment(timeSheetForm.fromDate.value,'YYYY-MM-DD').format('YYYY-MM-DD'),
            "start_time": (timeSheetForm.startTime.value !== null && timeSheetForm.startTime.value !== '') ? moment(timeSheetForm.startTime.value).format('HH:mm') : moment(new Date()).format("HH:mm"),//dateFormat(timeSheetForm.startTime.value != undefined ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss"),
            "comment": timeSheetForm.description.value,
            "created_by": localStorage.getItem("empId"),
        }
        if (EndDateTimeShow) {
            timesheetStopData = {
                "end_date": moment(timeSheetForm.fromDate.value,'YYYY-MM-DD').format('YYYY-MM-DD'),
                "end_time": (timeSheetForm.endTime.value !== null && timeSheetForm.endTime.value !== '') ? moment(timeSheetForm.endTime.value).format('HH:mm') : moment(new Date()).format("HH:mm"),//dateFormat(timeSheetForm.endTime.value != undefined ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss"),
                "comment": timeSheetForm.description.value,
                "updated_by": localStorage.getItem("empId"),
                "timesheet_id": timeSheetID
            }
        } else {
            timesheetStopData = undefined
        }
        dispatch(insertTimeSheetbyTime(timesheetData, true, props.rowData, timesheetStopData)).then((response) => {
    
            dispatch(getTaskTimeSheet(props.rowData.task_id)).then((response) => {
                dispatch(getProjectTimeSheetListByTaskId(props.rowData.task_id));
                setTimeSheetStartProcess(false);
                props.handleChangeCloseModel(false);
            })
        })
    }
    }

   async function submitStopTimesheet() {
    var result=true;
        if(!FinalCheckTimeOverlap){
           result= await Todateopen(timeSheetForm.fromDate.value,timeSheetForm.startTime.value,timeSheetForm.endTime.value)
           setFinalCheckTimeOverlap(true)
        }
        if(result){
        var timesheetData = {
            "end_date": timeSheetForm.fromDate.value,
            "end_time": (timeSheetForm.endTime.value !== null && timeSheetForm.endTime.value !== '') ? moment(timeSheetForm.endTime.value).format('HH:mm') : moment(new Date()).format("HH:mm"),//dateFormat(timeSheetForm.endTime.value != undefined ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss"),
            "comment": timeSheetForm.description.value,
            "updated_by": localStorage.getItem("empId"),
            "timesheet_id": timeSheetID
        }
        dispatch(insertTimeSheetbyTime(timesheetData, false, props.rowData)).then((response) => {
            
            dispatch(getTaskTimeSheet(props.rowData.task_id)).then((response) => {
                setEndDateTimeShow(false);
                dispatch(getProjectTimeSheetListByTaskId(props.rowData.task_id));
                setTimeSheetStartProcess(true);
                props.handleChangeCloseModel(false);
            })
        })
    }
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
                if (data !== "startTime" && data !== "endTime" && data !== "fromDate" && data !== "toDate") {
                    timeSheetForm[data].value = "";
                } else {
                    timeSheetForm[data].value = new Date();
                }
            } catch (error) {
                throw error;
            }
        });
        settimeSheetForm((prevState) => ({
            ...prevState,
        }));
        setTimeSheetStartProcess(true);
        setTimeOverlap(false);
        setEndDateTimeShow(false)
        setFinalCheckTimeOverlap(false);
        setEndTimeExceed(false)
    };

    const TimeSheetValidation=async(from_date,start_time,end_time)=>{
        var rtn_statement;
        var timesheet_check_data = {
            "emp_id": localStorage.getItem("empId"),
            "start_date": moment(from_date,'YYYY-MM-DD').format('YYYY-MM-DD'),
            "start_time": moment(start_time).format('HH:mm'),
            "end_date": moment(from_date,'YYYY-MM-DD').format('YYYY-MM-DD'),
            "end_time": moment(end_time).format('HH:mm'),
        }
       !FinalCheckTimeOverlap&&(await axios({
            method: 'POST',
            url: apiurl + 'check_startTime_endTime_timesheet',
            data: timesheet_check_data
        }).then(async (response) => {
            if (response.data.status === 1) {
                    setTimeOverlap(true)
                    rtn_statement=false
            } else if (response.data.status === 0) {
                setTimeOverlap(false)
                rtn_statement=true
            }
        }))

        FinalCheckTimeOverlap&&(await axios({
            method: 'POST',
            url: apiurl + 'check_startTime_endTime_timesheet',
            data: timesheet_check_data
        }).then(async (response) => {
            if (response.data.status === 1) {
                    setTimeOverlap(true)
                    rtn_statement=false
            } else if (response.data.status === 0) {
                setTimeOverlap(false)
                rtn_statement=true
            }
        }))

        if((TimeSheetStartProcess===true&&EndDateTimeShow===true)||(!TimeSheetStartProcess)){
            let startTime = moment(start_time, "HH:mm:ss").format("hh:mm A")
            let endTime = moment(end_time, "HH:mm:ss").format("hh:mm A")
         
            if (Date.parse('01/01/2011 ' + endTime) < Date.parse('01/01/2011 ' + startTime)) {
                setEndTimeExceed(true)
                rtn_statement=false
               
            }else{
                setEndTimeExceed(false)
            }
        }
        return rtn_statement;
    }
    const Todateopen=async(from_date,start_time)=>{
        var return_statement=true;
        var timesheet_statement;
        if(TimeSheetStartProcess){
            if ((from_date !== "" && moment(from_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) || ((from_date !== "" && moment(from_date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) && (moment(start_time).format('HH:mm:ss') < moment().subtract(5, "minutes").format('HH:mm:ss')))) {
                setEndDateTimeShow(true);
                return_statement=false
                timeSheetForm.toDate.value = from_date
            } else {
                setEndDateTimeShow(false)
                return_statement=true
            }
         }
        timesheet_statement= await TimeSheetValidation(from_date,start_time,timeSheetForm.endTime.value)
        return (!timesheet_statement||!return_statement)?false:true;
    }
    function closeModel() {
        handleCancel()
        props.handleChangeCloseModel && props.handleChangeCloseModel(false)
    }
   /********************** Use Effects ****************************/

    useEffect(() => {
        dispatch(getTaskTimeSheet(props.rowData.task_id));
    }, []);

    useEffect(() => {
        if (props.model_clear)
            handleCancel()
    }, [props.model_clear]);

    useEffect(() => {

        handleCancel();
        if (props.getTaskTimeSheet && props.getTaskTimeSheet[0] && props.getTaskTimeSheet[0].task_id == props.rowData.task_id) {
            if (props.getTaskTimeSheet.length > 0) {

                if (props.getTaskTimeSheet[0].timesheet.length > 0) {
                    var tsSize = props.getTaskTimeSheet[0].timesheet.length - 1;
                    if (props.getTaskTimeSheet[0].timesheet[tsSize].start_date == null && props.getTaskTimeSheet[0].timesheet[tsSize].start_time == null) {
                        setTimeSheetStartProcess(true)
                        settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);
                       
                    } else if (props.getTaskTimeSheet[0].timesheet[tsSize].end_date != null &&props.getTaskTimeSheet[0].timesheet[tsSize].end_date !=="0000-00-00" && props.getTaskTimeSheet[0].timesheet[tsSize].end_time != null&&props.getTaskTimeSheet[0].timesheet[tsSize].end_time !=="00:00:00") {
                        var timeObj = {
                            "activity_id": null,
                            "end_date": null,
                            "end_time": null,
                            "project_id": null,
                            "start_date": null,
                            "start_time": null,
                            "sub_activity": null,
                            "sub_activity_id": null,
                            "task_id": props.rowData.task_id,
                            "timesheet_id": null,
                            "total_hours": null
                        };
                        props.getTaskTimeSheet[0].timesheet.push(timeObj);
                        setTimeSheetStartProcess(true)
                        settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize + 1].timesheet_id);
                   
                    }
                    else {
                        setTimeSheetStartProcess(false);

                        setstartDateDisplay(moment(props.getTaskTimeSheet[0].timesheet[tsSize].start_date).format("DD MMM YYYY"));
                        timeSheetForm.fromDate.value = props.getTaskTimeSheet[0].timesheet[tsSize].start_date;
                        timeSheetForm.startTime.value=moment(props.getTaskTimeSheet[0].timesheet[tsSize].start_time, ["HH.mm"])
                        timeSheetForm.description.value = props.getTaskTimeSheet[0].timesheet[tsSize].description;
                        var startttime = moment(props.getTaskTimeSheet[0].timesheet[tsSize].start_time, ["HH.mm"]).format("HH:mm:ss");
                        setstartTimeDisplay(startttime);
                        settimeSheetID(props.getTaskTimeSheet[0].timesheet[tsSize].timesheet_id);

                        settimeSheetForm((prevState) => ({
                            ...prevState,
                        }));
                       
                    }
                  
                }
            } else {
                setTimeSheetStartProcess(true)
             
            }
        } else {
            dispatch(getTaskTimeSheet(props.rowData.task_id));
        }

    }, [props.getTaskTimeSheet, props.rowData])
    return (
        <div className="timeSheetStartContainer">
            {TimeSheetStartProcess ?
                <>
                    <Grid item xs={12} container direction="row" >
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.project_type : 'Adhoc Task'}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.activity != null ? props.rowData.activity : props.rowData.tag}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.Priority}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_name != null ? props.rowData.project_name : props.rowData.description}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.sub_activity}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.tag : ''}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.client != null ? props.rowData.client : props.rowData.assignee_name}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.assignee_name : ""}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.description : ''}</div></Grid>

                        </Grid>


                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                disableFuture={true}
                                changeData={(data) => checkValidation(data, "fromDate")}
                                value={timeSheetForm.fromDate.value}
                                error={timeSheetForm.fromDate.error}
                                errmsg={timeSheetForm.fromDate.errmsg}
                                placeholder={" Start Date "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepickernew"
                                placeholder={"Start Time"}
                                changeData={(data) =>
                                    checkValidation(data, "startTime")
                                }
                                value={timeSheetForm.startTime.value}
                                error={timeSheetForm.startTime.error}
                                errmsg={timeSheetForm.startTime.errmsg}
                            />
                        </Grid>
                        {!EndDateTimeShow && <>
                            <Grid item xs={3}>End Date</Grid>
                            <Grid item xs={3}>End Time</Grid></>}

                        {EndDateTimeShow && <>
                            <Grid item xs={3}>
                                <Labelbox type="datepicker"
                                    disableFuture={true}
                                    changeData={(data) => checkValidation(data, "toDate")}
                                    value={timeSheetForm.fromDate.value}
                                    error={timeSheetForm.toDate.error}
                                    errmsg={timeSheetForm.toDate.errmsg}
                                    placeholder={" End date "}
                                    maxDate={new Date()}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Labelbox type="timepickernew"
                                    placeholder={"End Time"}
                                    changeData={(data) =>
                                        checkValidation(data, "endTime")
                                    }
                                    value={timeSheetForm.endTime.value}
                                    error={timeSheetForm.endTime.error}
                                    errmsg={timeSheetForm.endTime.errmsg}
                                />
                            </Grid> </>}
                    </Grid>

                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"}
                            changeData={(data) => checkValidation(data, "description")}
                            value={timeSheetForm.description.value}
                            error={timeSheetForm.description.error}
                            errmsg={timeSheetForm.description.errmsg} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={closeModel} />
                        <CustomButton btnName={`${!EndDateTimeShow ? 'START' : 'SAVE'}`} btnCustomColor="customPrimary" btnDisable={TimeOverlap||EndTimeExceed} custombtnCSS="timeSheetButtons" onBtnClick={submitStartTimeSheet} />
                    </div>

                </>
                :
                <>
                    <Grid item xs={12} container direction="row" >
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.project_type : 'Adhoc Task'}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.activity != null ? props.rowData.activity : props.rowData.tag}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.Priority}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_name != null ? props.rowData.project_name : props.rowData.description}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.sub_activity}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.tag : ''}</div></Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.client != null ? props.rowData.client : props.rowData.assignee_name}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.assignee_name : ""}</div></Grid>
                            <Grid item xs={4}><div style={{ width: 250 }}>{props.rowData.project_type != null ? props.rowData.description : ''}</div></Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} container direction="row" spacing={3}>

                        <Grid item xs={3}>{startDateDisplay}</Grid>
                        <Grid item xs={3}>{startTimeDisplay}</Grid>


                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                disableFuture={true}
                                changeData={(data) => checkValidation(data, "toDate")}
                                value={timeSheetForm.fromDate.value}
                                error={timeSheetForm.toDate.error}
                                errmsg={timeSheetForm.toDate.errmsg}
                                placeholder={" End date "}
                                maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepickernew"
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
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"}
                            changeData={(data) => checkValidation(data, "description")}
                            value={timeSheetForm.description.value}
                            error={timeSheetForm.description.error}
                            errmsg={timeSheetForm.description.errmsg} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={closeModel} />
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" btnDisable={TimeOverlap||EndTimeExceed} onBtnClick={submitStopTimesheet} />
                    </div>

                </>
              
            }
         <div className="timsheet_overlap">{TimeOverlap&&'Time Overlapping'}</div>
         <div className="timsheet_overlap">{EndTimeExceed&&'End Time Should not less than from time'}</div>
         
        </div >

    )
}
const mapStateToProps = (state) =>
({
    getTaskTimeSheet: state.projectTasksReducer.getTaskTimeSheet,
});
export default connect(mapStateToProps)(TimeSheetView);