/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Buttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getActivity, getLocation } from "../../../actions/projectTaskAction";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { getProjectTimeSheetList, getProjectWise_TimeSheet, EditProjectwiseTimesheet, getLastTimeSheet } from "../../../actions/TimeSheetAction";
import axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import { notification } from "antd";
import { get_projectName_by_Desig, getSubactivity } from "../../../actions/MasterDropdowns";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { getTaskTimeSheet, InsertHearingDetails } from "../../../actions/projectTaskAction";
import Order from "../../../images/order.png";
import AddHearing from '../../task/AddHearing';
import DynModel from '../../../component/Model/model';

function TimeSheetStartModel(props) {
    const dispatch = useDispatch();
    let { rowId } = useParams()
    const [TimeSheetStartProcess, setTimeSheetStartProcess] = useState(true)
    const [projectSubActivity, setprojectSubActivity] = useState({});
    const [activityList, setactivityList] = useState({})
    const [projectDetails, setProjectDetails] = useState([{}])
    const [projectName, setProjectName] = useState({});
    const [EndDateTimeShow, setEndDateTimeShow] = useState(false);
    const [AddHearing_Data, setAddHearing_Data] = useState([]);
    const [TimeOverlap, setTimeOverlap] = useState(false);
    const [taskData, setTaskData] = useState([])
    const [hearing, setHearing] = useState(false)
    const [FinalCheckTimeOverlap, setFinalCheckTimeOverlap] = useState(false);
    const [EndTimeExceed, setEndTimeExceed] = useState(false);
    const [timeSheetForm, setTimeSheetForm] = useState({
        startTime: {
            value: '',
            validation: [],
            error: null,
            errmsg: null,
        },
        endTime: {
            value: '',
            validation: [],
            error: null,
            errmsg: null,
        },
        activity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        subActivity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        tag: {
            value: "0",
            valueById: "",
            error: null,
            errmsg: null,
        },
        priority: {
            value: "0",
            valueById: "",
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
            validation: [],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        timesheet_id: {
            value: 0,
            validation: [],
            error: null,
            errmsg: null,
        },
        projectname: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        task_status: {
            value: 0,
            validation: [],
            error: null,
            errmsg: null,
        },
        task_id: {
            value: 0,
        }

    })

    const dateFormat = (data) => {
        return moment(data, "HH:mm").format("HH:mm")
    }

    function fntaskHearingDetails() {
        setTaskData([timeSheetForm, props.ProjectDetails]);
        setHearing(true)
    }
    const submitStartTimeSheet = async () => {

        var mainvalue = {};
        var targetkeys = Object.keys(timeSheetForm);

        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                timeSheetForm[targetkeys[i]].value,
                timeSheetForm[targetkeys[i]].validation
            );
            timeSheetForm[targetkeys[i]].error = !errorcheck.state;
            timeSheetForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = timeSheetForm[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => timeSheetForm[obj].error == true
        );

        if (filtererr.length > 0) {
        } else if (timeSheetForm.activity.value === 6 && AddHearing_Data.length === 0) {
            notification.success({
                message: "Please Add Hearing Details",
            });
        } else {
            var result1 = true
            if (!FinalCheckTimeOverlap) {
                result1 = await Todateopen(timeSheetForm.fromDate.value, timeSheetForm.startTime.value, timeSheetForm.endTime.value)
                setFinalCheckTimeOverlap(true)
            }
            if (result1) {
                let startTime = dateFormat(timeSheetForm.startTime.value && timeSheetForm.startTime.value != '' ? timeSheetForm.startTime.value : new Date());
                let end_time = dateFormat(timeSheetForm.endTime.value && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date());

                var insert_data = {
                    "project_id": props.approve_timesheet && props.approve_timesheet !== '' && props.approve_timesheet.project_id || rowId || timeSheetForm.projectname.value !== '' && timeSheetForm.projectname.value || 0,
                    "activity_id": timeSheetForm.activity.value,
                    "sub_activity_id": timeSheetForm.subActivity.value,
                    "assignee_id": localStorage.getItem("empId"),
                    "assigned_by": localStorage.getItem("empId"),
                    "start_date": moment(timeSheetForm.fromDate.value, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                    "start_time": startTime,
                    "end_date": EndDateTimeShow ? moment(timeSheetForm.fromDate.value, 'YYYY-MM-DD').format('YYYY-MM-DD') : '0000-00-00',
                    "end_time": EndDateTimeShow ? end_time : '00:00',
                    "comment": timeSheetForm.description.value,
                    "task_status": EndDateTimeShow ? 1 : 0,
                    "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                    "created_by": localStorage.getItem("empId")
                }
                axios({
                    method: 'POST',
                    url: apiurl + 'insert_task_timesheet',
                    data: insert_data
                }).then(async (response) => {
                    if (response.data.status === 1) {
                        if (timeSheetForm.activity.value === 6) {
                            AddHearing_Data[0].task_id = response.data.data[0].task_id
                            setAddHearing_Data((prevState) => [
                                ...prevState,
                            ])
                            dispatch(InsertHearingDetails(AddHearing_Data[0]))
                        }
                        if (!props.project_wise) {
                            await dispatch(getProjectTimeSheetList(rowId));
                        } else if (props.project_wise || props.project_wise_reject || props.project_wise_edit) {
                            dispatch(getProjectWise_TimeSheet(props.project_wise || props.project_wise_edit[1] || props.project_wise_reject[1]))
                        }

                        notification.success({
                            message: `Timesheet ${EndDateTimeShow ? 'saved' : 'started'} successfully`,
                        });
                        props.close_model && props.close_model()
                    } else if (response.data.status === 0) {
                        notification.success({
                            message: response.data.msg,
                        });
                    }
                })

            }
        }
        setTimeSheetForm(prevState => ({
            ...prevState
        }));

    }

    const submitStopTimesheet = async () => {
        var result = true;
        if (!FinalCheckTimeOverlap) {
            result = await Todateopen(timeSheetForm.fromDate.value, timeSheetForm.startTime.value, timeSheetForm.endTime.value)
            setFinalCheckTimeOverlap(true)
        }
        if (result) {
            let end_time = dateFormat(timeSheetForm.endTime.value && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date());
            var timesheetData = {
                "emp_id": localStorage.getItem("empId"),
                "timesheet_id": timeSheetForm.timesheet_id.value,
                "end_date": moment(timeSheetForm.fromDate.value, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                "end_time": end_time,
                "comment": timeSheetForm.description.value,
                "created_by": localStorage.getItem("empId")
            }

            try {
                await axios({
                    method: 'POST',
                    url: apiurl + 'insert_stop_time',
                    data: timesheetData
                }).then((response) => {
                    if (response.data.status === 1) {
                        notification.success({
                            message: "Time Sheet Stopped Successfully",
                        });

                        if (!props.project_wise && !props.project_wise_edit && !props.project_wise_reject) {
                            dispatch(getProjectTimeSheetList(rowId));
                        } else if (props.project_wise || props.project_wise_reject || props.project_wise_edit) {
                            dispatch(getProjectWise_TimeSheet(props.project_wise || props.project_wise_edit[1] || props.project_wise_reject[1]))
                        }
                        setTimeSheetStartProcess(true)
                        props.close_model && props.close_model()
                        return Promise.resolve();
                    } else if (response.data.status === 0) {
                        notification.success({
                            message: "Stop Time " + response.data.msg,
                        });
                    }
                });

            } catch (err) {

            }
        }
    }

    const onEditTimesheet = async () => {
        let startTime = dateFormat(timeSheetForm.startTime.value && timeSheetForm.startTime.value != '' ? timeSheetForm.startTime.value : new Date());
        let end_time = dateFormat(timeSheetForm.endTime.value && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date());

        var timesheetData = {
            "timesheet_id": props.project_wise_edit && props.project_wise_edit[0].timesheet_id,
            "project_id": timeSheetForm.projectname.value === '' ? 0 : timeSheetForm.projectname.value,
            "activity_id": timeSheetForm.activity.value,
            "sub_activity_id": timeSheetForm.subActivity.value,
            "assignee_id": localStorage.getItem("empId"),
            "start_date": moment(timeSheetForm.fromDate.value, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            "start_time": startTime,
            "end_date": moment(timeSheetForm.fromDate.value, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            "end_time": end_time,
            "assigned_by": localStorage.getItem("empId"),
            "priority": 0,
            "comment": timeSheetForm.description.value,
            "tag": 0,
            "task_status": 0,
        }
        await dispatch(EditProjectwiseTimesheet(timesheetData, props.project_wise_edit[1]))
        if (timeSheetForm.activity.value === 6 && AddHearing_Data.length > 0) {
            AddHearing_Data[0].task_id = timeSheetForm.task_id.value
            setAddHearing_Data((prevState) => [
                ...prevState,
            ])
            dispatch(InsertHearingDetails(AddHearing_Data[0]))
        }
        props.close_model && props.close_model()

    }
    function checkValidation(data, key) {
        let dynObj;
        if (key === 'task_status') {
            if (data.target.checked)
                data = 1
            else
                data = 0
        }

        if (key === "fromDate" || key === "startTime" || key === "endTime") {
            if (!FinalCheckTimeOverlap) {
                setFinalCheckTimeOverlap(true)
            }
            if (key === "fromDate") {
                Todateopen(data, timeSheetForm.startTime.value)
            } else if (key === "startTime") {
                timeSheetForm.startTime.value = moment(data, 'HH:mm').add(5, "minute")
                Todateopen(timeSheetForm.fromDate.value, data)
            } else {
                TimeSheetValidation(timeSheetForm.fromDate.value, timeSheetForm.startTime.value, data)
            }

        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            timeSheetForm[key].validation
        );
        dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: timeSheetForm[key].validation,
        };

        setTimeSheetForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const handleCancel = () => {
        let From_key = [
            "activity",
            "subActivity",
            "fromDate",
            "toDate",
            "tag",
            "priority",
            "startTime",
            "endTime",
            "description",
            "task_status",
            "projectname"
        ];

        From_key.map((data) => {
            try {
                timeSheetForm[data].value = "";
            } catch (error) {
                throw error;
            }
        });
        setTimeSheetForm((prevState) => ({
            ...prevState,
        }));
        setTimeSheetStartProcess(true);
        setTimeOverlap(false);
        setEndDateTimeShow(false)
        setFinalCheckTimeOverlap(false);
        setEndTimeExceed(false)
        dispatch(getLastTimeSheet())
    };

    const TimeSheetValidation = async (from_date, start_time, end_time) => {
        var rtn_statement;
        var timesheet_check_data = {
            "emp_id": localStorage.getItem("empId"),
            "start_date": moment(from_date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            "start_time": moment(start_time).format('HH:mm'),
            "end_date": moment(from_date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            "end_time": moment(end_time).format('HH:mm'),
        }
        !FinalCheckTimeOverlap && (await axios({
            method: 'POST',
            url: apiurl + 'check_startTime_endTime_timesheet',
            data: timesheet_check_data
        }).then(async (response) => {
            if (response.data.status === 1) {
                setTimeOverlap(true)
                rtn_statement = false
            } else if (response.data.status === 0) {
                setTimeOverlap(false)
                rtn_statement = true
            }
        }))

        FinalCheckTimeOverlap && (await axios({
            method: 'POST',
            url: apiurl + 'check_startTime_endTime_timesheet',
            data: timesheet_check_data
        }).then(async (response) => {
            if (response.data.status === 1) {
                setTimeOverlap(true)
                rtn_statement = false
            } else if (response.data.status === 0) {
                setTimeOverlap(false)
                rtn_statement = true
            }
        }))

        if ((TimeSheetStartProcess === true && EndDateTimeShow === true) || (!TimeSheetStartProcess)) {
            let startTime = moment(start_time, "HH:mm:ss").format("hh:mm A")
            let endTime = moment(end_time, "HH:mm:ss").format("hh:mm A")

            if (Date.parse('01/01/2011 ' + endTime) < Date.parse('01/01/2011 ' + startTime)) {
                setEndTimeExceed(true)
                rtn_statement = false
            } else {
                setEndTimeExceed(false)
            }
        }
        return rtn_statement;
    }
    const Todateopen = async (from_date, start_time) => {
        var return_statement = true;
        var timesheet_statement;
        if (TimeSheetStartProcess) {
            if ((from_date !== "" && moment(from_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) || ((from_date !== "" && moment(from_date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) && (moment(start_time).format('HH:mm:ss') < moment().subtract(5, "minutes").format('HH:mm:ss')))) {
                setEndDateTimeShow(true);
                return_statement = false
                timeSheetForm.toDate.value = from_date
            } else {
                setEndDateTimeShow(false)
                return_statement = true
            }
        }
        timesheet_statement = await TimeSheetValidation(from_date, start_time, timeSheetForm.endTime.value)
        return (!timesheet_statement || !return_statement) ? false : true;
    }
    useEffect(() => {
        dispatch(getActivity());
        dispatch(getLocation());
        dispatch(get_projectName_by_Desig());
        !props.project_wise_reject && !props.project_wise_edit && !props.project_wise && dispatch(getProjectTimeSheetList(rowId));

    }, []);

    useEffect(() => {
        setProjectDetails(props.projectrow)
    }, [props.projectrow])

    useEffect(() => {
        if (props.model_clear)
            handleCancel()
    }, [props.model_clear]);

    useEffect(() => {
        if (timeSheetForm.activity.value) {
            dispatch(getSubactivity(timeSheetForm.activity.value));
        }
    }, [timeSheetForm.activity.value]);

    useEffect(() => {
        let activityTypeData = []
        props.activitysList.map((data) => {
            if (timeSheetForm.projectname.value === "" && data.activity_id === 6) {
                return true
            }
            activityTypeData.push({
                value: data.activity,
                id: data.activity_id
            })

        }

        )
        setactivityList({ activityTypeData })

        let projectSubActivitydata = [];
        props.getSubactivity.map((data) =>
            projectSubActivitydata.push({
                value: data.sub_activity,
                id: data.sub_activity_id,
            })
        );
        setprojectSubActivity({ projectSubActivitydata });

        let ProjectName = [];
        props.ProjectName.map((data) =>
            ProjectName.push({ id: data.project_id, value: data.project_name })
        );
        setProjectName({ ProjectName });

    }, [timeSheetForm.projectname.value, props.activitysList, props.getSubactivity, props.prioritysList, props.tagsList, props.locationList, props.ProjectName])

    useEffect(() => {
        if (props.insertTask && props.insertTask.length > 0 && !EndDateTimeShow && !props.project_wise && !props.project_wise_reject) {
            dispatch(getTaskTimeSheet(props.insertTask[0].task_id));
        }
    }, [props.insertTask])

    useEffect(() => {
        if (timeSheetForm.projectname.value) {
            dispatch(getProjectDetails(timeSheetForm.projectname.value))
        }
    }, [timeSheetForm.projectname.value])

    useEffect(() => {
        if (props.timeSheetProject.length > 0 || props.getTaskTimeSheet.length > 0 || props.project_wise_reject || props.project_wise_edit || props.project_wise) {

            handleCancel();
            setAddHearing_Data([])
            let response;
            let data;
            if (props.project_wise && !props.project_wise_edit && !props.project_wise_reject) {
                setTimeSheetStartProcess(true)
                return
            }
            if (props.project_wise && props.getTaskTimeSheet.length > 0) {
                response = props.getTaskTimeSheet
                data = response[response.length - 1].timesheet[0]
            } else if (props.timeSheetProject.length > 0) {
                response = props.timeSheetProject
                data = response[response.length - 1]
            } else if (props.project_wise_reject) {
                data = props.project_wise_reject[0]
            } else if (props.project_wise_edit) {
                data = props.project_wise_edit[0]
            } else if (props.timeSheetProject) {
                response = props.timeSheetProject
                data = response[response.length - 1]
            }


            if (data) {

                if (data.end_date && data.end_date !== "0000-00-00" && data.end_time !== "00:00:00" && data.end_time && props.projectrow) {
                    setTimeSheetStartProcess(true)
                    return

                }
                if (data.project_id && data.project_id != 0) {
                    timeSheetForm.projectname.value = data.project_id
                }
                timeSheetForm.timesheet_id.value = data.timesheet_id
                timeSheetForm.activity.value = data.activity_id || data.activiity_id
                timeSheetForm.subActivity.value = data.sub_activity_id
                timeSheetForm.priority.value = data.priority_id
                timeSheetForm.tag.value = data.tag_id
                timeSheetForm.startTime.value = new Date("12-30-2017 " + data.start_time)
                timeSheetForm.fromDate.value = data.start_date
                timeSheetForm.description.value = data?.description || data?.comment
                timeSheetForm.task_id.value = data.task_id
                data.task_status && data.task_status === "Completed" ? (timeSheetForm.task_status.value = 1) : (timeSheetForm.task_status.value = 0)
                if (props.project_wise_edit && data.end_date !== "0000-00-00" && data.end_time !== "00:00:00") {
                    data.end_time && (timeSheetForm.endTime.value = new Date("12-30-2017 " + data.end_time))
                    data.end_date && (timeSheetForm.fromDate.value = data.end_date)
                }
                setTimeSheetForm((prevState) => ({
                    ...prevState,
                }));
                if (data.end_date !== "0000-00-00" && data.end_time !== "00:00:00") {
                    setEndDateTimeShow(true);
                }
                if ((data.end_date === "0000-00-00" && data.end_time === "00:00:00") || (!data.end_date && !data.end_time && !props.project_wise_edit)) {
                    setTimeSheetStartProcess(false)
                }
                else {
                    setTimeSheetStartProcess(true)
                }

            }

        }
    }, [props.timeSheetProject, props.getTaskTimeSheet, props.project_wise, props.project_wise_reject, props.project_wise_edit])

    useEffect(() => {
        if (!props.project_wise_edit) {
            var coeff = 1000 * 60 * 5;
            var date = new Date();  //or use any other date
            var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
            if (props.getLastTimeSheet.length > 0) {
                let startTime = props.getLastTimeSheet[0]?.end_time !== '00:00:00' ? new Date("12-30-2017 " + props.getLastTimeSheet[0]?.end_time) : moment(props.getLastTimeSheet[0]?.start_time, 'HH:mm').add(5, "minute");

                let fromDate = props.getLastTimeSheet[0]?.start_date;

                let curDateVal = moment(new Date()).format("DD-MM-YYYY")
                let fromDateVal = moment(fromDate).format("DD-MM-YYYY")

                if (fromDateVal < curDateVal) {
                    fromDate = new Date()
                    startTime = rounded
                }
                setTimeSheetForm((prevState) => ({
                    ...prevState,
                    'startTime': { ...timeSheetForm.startTime, value: startTime },
                    'fromDate': { ...timeSheetForm.fromDate, value: fromDate, },
                    'endTime': { ...timeSheetForm.endTime, value: moment(startTime, 'HH:mm').add(5, "minute") },
                }));
                Todateopen(props.getLastTimeSheet[0]?.start_date, startTime)
            } else {
                setTimeSheetForm((prevState) => ({
                    ...prevState,
                    'startTime': { ...timeSheetForm.startTime, value: rounded },
                    'fromDate': { ...timeSheetForm.fromDate, value: new Date(), },
                    'endTime': { ...timeSheetForm.endTime, value: moment(new Date(), 'HH:mm').add(5, "minute") },
                }));
            }
        }
    }, [props.getLastTimeSheet])

    return (
        <div className="timeSheetStartContainer">
            {TimeSheetStartProcess ?
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        {projectDetails && projectDetails.length > 0 && projectDetails.map((data) => {
                            return (
                                <>
                                    <Grid item xs={4}>{data.project_type}</Grid>
                                    <Grid item xs={4}>{data.project_name}</Grid>
                                    <Grid item xs={4}>{data.client} </Grid>

                                </>

                            )
                        })}
                        {props.approve_timesheet && props.approve_timesheet !== '' && <>
                            <Grid item xs={4}>{props.approve_timesheet.project_type}</Grid>
                            <Grid item xs={4}>{props.approve_timesheet.project_name}</Grid>
                            <Grid item xs={4}>{props.approve_timesheet.client} </Grid>

                        </>}

                        {(props.project_wise || props.project_wise_edit) && <> <Grid item xs={4} container direction="column">
                            <div className="TThead">Project Name</div>
                            <Labelbox type="select"
                                placeholder={"Project "}
                                dropdown={projectName.ProjectName}
                                changeData={(data) => checkValidation(data, "projectname")}
                                value={timeSheetForm.projectname.value}
                                error={timeSheetForm.projectname.error}
                                errmsg={timeSheetForm.projectname.errmsg}
                                disabled={timeSheetForm.projectname.disabled}></Labelbox>

                        </Grid>
                            {props.ProjectDetails.length > 0 && timeSheetForm.projectname.value !== "" && <Grid item xs={4}>
                                <div className="TThead">Client Name</div>
                                <Labelbox type="text"
                                    value={props.ProjectDetails.length > 0 && props.ProjectDetails[0].client}
                                    disabled>
                                </Labelbox>
                            </Grid>}</>}
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activityList.activityTypeData}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={timeSheetForm.activity.value}
                                error={timeSheetForm.activity.error}
                                errmsg={timeSheetForm.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Sub Activity"}
                                dropdown={projectSubActivity.projectSubActivitydata}
                                changeData={(data) =>
                                    checkValidation(data, "subActivity")
                                }
                                value={timeSheetForm.subActivity.value}
                                error={timeSheetForm.subActivity.error}
                                errmsg={timeSheetForm.subActivity.errmsg}
                            />
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                disableFuture={true}
                                changeData={(data) => checkValidation(data, "fromDate")}
                                value={timeSheetForm.fromDate.value}
                                error={timeSheetForm.fromDate.error}
                                errmsg={timeSheetForm.fromDate.errmsg}
                                placeholder={"Start Date"}
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
                                disablePast={true}

                            />
                        </Grid>
                        {!EndDateTimeShow && <><Grid item xs={3}>
                            End Date
                        </Grid>
                            <Grid item xs={3}>
                                End Time
                            </Grid></>}

                        {EndDateTimeShow && <><Grid item xs={3}>
                            <Labelbox type="datepicker"
                                changeData={(data) => checkValidation(data, "toDate")}
                                value={timeSheetForm.fromDate.value}
                                error={timeSheetForm.toDate.error}
                                errmsg={timeSheetForm.toDate.errmsg}
                                placeholder={" End date "}
                                disabled
                            />
                        </Grid>
                            <Grid item xs={3}>
                                <Labelbox type="timepickernew"
                                    placeholder={"End Time"}
                                    disabledHours={Array.from(Array(Number(moment(timeSheetForm.startTime.value, 'HH:mm').add(5, "minute").format('HH'))), (_, i) => i)}
                                    disabledMinutes={Array.from(Array(Number(moment(timeSheetForm.startTime.value, 'HH:mm').add(5, "minute").format('mm'))), (_, i) => i)}
                                    changeData={(data) =>
                                        checkValidation(data, "endTime")
                                    }
                                    value={timeSheetForm.endTime.value}
                                    error={timeSheetForm.endTime.error}
                                    errmsg={timeSheetForm.endTime.errmsg}
                                />
                            </Grid></>}

                    </Grid>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"}
                            changeData={(data) => checkValidation(data, "description")}
                            value={timeSheetForm.description.value}
                            error={timeSheetForm.description.error}
                            errmsg={timeSheetForm.description.errmsg} />
                    </div>
                    <div className="project_wise_div">
                        {/* <div className="project_wise_checkbox"> {EndDateTimeShow && <><Checkbox onClick={(data) => checkValidation(data, "task_status")} checked={timeSheetForm.task_status.value === 1 ? true : false} />&nbsp;<label>Task Completed</label></>}</div> */}
                        <div className="project_wise_checkbox">
                            {timeSheetForm.activity.value === 6 && <><img src={Order} alt="hearing_project" className="hearing_project" onClick={() => fntaskHearingDetails()} />&nbsp;
                                <label>{props.project_wise_edit ? 'Edit' : 'Add'} Hearing</label></>}</div>
                        <div className="project_wise_save">
                            <CustomButton btnName={"CANCEL"} onBtnClick={() => (handleCancel(), props.close_model && props.close_model(false))} />
                            {!props.project_wise_edit && <CustomButton btnName={`${!EndDateTimeShow ? 'START' : 'SAVE'}`} btnDisable={TimeOverlap} btnCustomColor="customPrimary" onBtnClick={submitStartTimeSheet} />}
                            {props.project_wise_edit && <CustomButton btnName={'UPDATE'} btnDisable={TimeOverlap} btnCustomColor="customPrimary" onBtnClick={onEditTimesheet} />}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        {!props.project_wise && !props.project_wise_edit && <> <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].project_type}</Grid>
                            <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].project_name}</Grid>
                            <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].client} </Grid></>}

                        {(props.project_wise || props.project_wise_edit) && <> <Grid item xs={4} container direction="column">
                            <div className="TThead">Project Name</div>
                            <Labelbox type="select"
                                placeholder={"Project "}
                                dropdown={projectName.ProjectName}
                                changeData={(data) => checkValidation(data, "projectname")}
                                value={timeSheetForm.projectname.value}
                                error={timeSheetForm.projectname.error}
                                errmsg={timeSheetForm.projectname.errmsg}
                                disabled={timeSheetForm.projectname.disabled}></Labelbox>

                        </Grid>
                            {props.ProjectDetails.length > 0 && timeSheetForm.projectname.value != "" && <Grid item xs={4}>
                                <div className="TThead">Client Name</div>
                                <Labelbox type="text"
                                    value={props.ProjectDetails.length > 0 && props.ProjectDetails[0].client}
                                    disabled>
                                </Labelbox>
                            </Grid>}</>}
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activityList.activityTypeData}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={timeSheetForm.activity.value}
                                error={timeSheetForm.activity.error}
                                errmsg={timeSheetForm.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                dropdown={projectSubActivity.projectSubActivitydata}
                                placeholder={"Sub Activity"}
                                changeData={(data) =>
                                    checkValidation(data, "subActivity")
                                }
                                value={timeSheetForm.subActivity.value}
                                error={timeSheetForm.subActivity.error}
                                errmsg={timeSheetForm.subActivity.errmsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            {moment(timeSheetForm.fromDate.value).format('DD-MMM-YYYY')}
                        </Grid>

                        <Grid item xs={3}>
                            {moment(timeSheetForm.startTime.value).format('HH:mm:ss')}
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                changeData={(data) => checkValidation(data, "toDate")}
                                value={timeSheetForm.fromDate.value}
                                error={timeSheetForm.toDate.error}
                                errmsg={timeSheetForm.toDate.errmsg}
                                placeholder={" End date "}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepickernew"
                                placeholder={"End Time"}
                                disabledHours={Array.from(Array(Number(moment(timeSheetForm.startTime.value, 'HH:mm').add(5, "minute").format('HH'))), (_, i) => i)}
                                disabledMinutes={Array.from(Array(Number(moment(timeSheetForm.startTime.value, 'HH:mm').add(5, "minute").format('mm'))), (_, i) => i)}
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
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={() => (handleCancel(), props.close_model && props.close_model(false))} />
                        <CustomButton btnName={"STOP"} btnDisable={TimeOverlap} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={submitStopTimesheet} />
                    </div>

                </div>
            }
            <div className="timsheet_overlap">{TimeOverlap && 'Time Overlapping'}</div>
            <div className="timsheet_overlap">{EndTimeExceed && 'End Time Should not less than from time'}</div>
            <DynModel modelTitle={"Hearing"} handleChangeModel={hearing} handleChangeCloseModel={(bln) => setHearing(bln)} content={<AddHearing project_wise={taskData} AddHearing_output={(data) => setAddHearing_Data([data])} onhearingclose={() => setHearing(false)} />} width={1000} />
        </div>

    )
}

const mapStateToProps = (state) =>
({

    activitysList: state.projectTasksReducer.getActivityList || [],
    prioritysList: state.projectTasksReducer.prioritysList || [],
    tagsList: state.projectTasksReducer.tagsList || [],
    locationList: state.projectTasksReducer.locationLists || [],
    timeSheetProject: state.getTaskList.getTimeSheetProject || [],
    getLastTimeSheet: state.getTaskList.getLastTimeSheet || [],
    ProjectName: state.getOptions.get_projectName_by_Desig || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    insertTask: state.projectTasksReducer.insertTask || [],
    getTaskTimeSheet: state.projectTasksReducer.getTaskTimeSheet,
    getSubactivity: state.getOptions.getSubactivity || [],
});

export default connect(mapStateToProps)(React.memo(TimeSheetStartModel));