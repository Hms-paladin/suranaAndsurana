import react, { useEffect, useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getActivity, getPriorityList, getTagList, inserTask, getAssignedTo, getLocation } from "../../../actions/projectTaskAction";
import moment from 'moment';
import Axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import dateFormat from 'dateformat';
import { useParams } from "react-router-dom";
import { getProjectTimeSheetList, getProjectWise_TimeSheet } from "../../../actions/TimeSheetAction";
import axios from "axios";
import { notification } from "antd";
import { getProjectName, getSubactivity } from "../../../actions/MasterDropdowns";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { getTaskTimeSheet } from "../../../actions/projectTaskAction";
import { Checkbox } from 'antd'

function TimeSheetStartModel(props) {
    const [changeStop, setChangeStop] = useState(true)
    const dispatch = useDispatch();
    const [projectSubActivity, setprojectSubActivity] = useState({});
    const [activityList, setactivityList] = useState({})
    const [priorityList, setpriorityList] = useState({})
    const [taggList, settaggList] = useState({})
    const [projectDetails, setProjectDetails] = useState([{}])
    const [projectName, setProjectName] = useState({});
    const [SaveBtnProcess, setSaveBtnProcess] = useState(false);
    const [timeSheetForm, settimeSheetForm] = useState({
        startTime: {
            value: new Date("12-30-2017 " + moment().format('HH:mm:ss')),
            validation: [],
            error: null,
            errmsg: null,
        },
        endTime: {
            value: new Date("12-30-2017 " + moment().format('HH:mm:ss')),
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
            value: "",
            valueById: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        priority: {
            value: "",
            valueById: "",
            validation: [{ name: "required" }],
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
        }

    })
    let { rowId } = useParams()
    useEffect(() => {
        setProjectDetails(props.projectrow)
    }, [props.projectrow])

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
            "task_status"
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

    useEffect(() => {
        dispatch(getActivity());
        dispatch(getTagList());
        dispatch(getPriorityList());
        dispatch(getAssignedTo());
        dispatch(getLocation());
        dispatch(getProjectName());

        !props.project_wise_edit && dispatch(getProjectTimeSheetList(rowId));

    }, []);

    useEffect(() => {
        if (props.approve_timesheet && props.approve_timesheet !== '') {

            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
        }
        // console.log(props.approve_timesheet,props.projectrow,'approve_timesheetd')
    }, [props.approve_timesheet]);

    useEffect(() => {
        if (timeSheetForm.activity.value) {
            dispatch(getSubactivity(timeSheetForm.activity.value));
        }
    }, [timeSheetForm.activity.value]);

    useEffect(() => {
        let activityTypeData = []
        props.activitysList.map((data) =>
            activityTypeData.push({
                value: data.activity,
                id: data.activity_id
            })
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

        let priorityTypeData = []
        props.prioritysList.map((data) =>
            priorityTypeData.push({
                value: data.status,
                id: data.status_id
            })
        )
        setpriorityList({ priorityTypeData })

        let tagTypeData = []
        props.tagsList.map((data) =>
            tagTypeData.push({
                value: data.status,
                id: data.status_id
            })
        )
        settaggList({ tagTypeData })

        let ProjectName = [];
        props.ProjectName.map((data) =>
            ProjectName.push({ id: data.project_id, value: data.project_name })
        );
        setProjectName({ ProjectName });

    }, [props.activitysList, props.getSubactivity, props.prioritysList, props.tagsList, props.locationList, props.ProjectName])


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
        } else {
            let startTime = dateFormat(timeSheetForm.startTime.value != undefined && timeSheetForm.startTime.value != '' ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss");

            var data = {
                "project_id": props.approve_timesheet && props.approve_timesheet != '' && props.approve_timesheet.project_id || rowId || timeSheetForm.projectname.value != '' && timeSheetForm.projectname.value || 0,
                "activiity_id": timeSheetForm.activity.value,
                "sub_activity_id": timeSheetForm.subActivity.value,
                "assignee_id": localStorage.getItem("empId"),
                "start_date": timeSheetForm.fromDate.value,
                "end_date": timeSheetForm.toDate.value && timeSheetForm.toDate.value != '' ? timeSheetForm.toDate.value : timeSheetForm.fromDate.value,
                "assigned_by": localStorage.getItem("empId"),
                "priority": timeSheetForm.priority.value,
                "description": timeSheetForm.description.value,
                "tag": timeSheetForm.tag.value
            }
            var timesheetData = {
                "emp_id": localStorage.getItem("empId"),
                "task_id": "0",
                "start_date": timeSheetForm.fromDate.value,
                "start_time": startTime,
                "comment": timeSheetForm.description.value,
                "created_by": localStorage.getItem("empId"),
            }
            var stopData;
            if (SaveBtnProcess) {
                let end_time = dateFormat(timeSheetForm.endTime.value != undefined && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss");
                stopData = {
                    "emp_id": localStorage.getItem("empId"),
                    "timesheet_id": 0,
                    "end_date": timeSheetForm.fromDate.value,
                    "end_time": end_time,
                    "comment": timeSheetForm.description.value,
                    "created_by": localStorage.getItem("empId"),
                    "task_status": timeSheetForm.task_status.value ? timeSheetForm.task_status.value : 0,
                }
            } else {
                stopData = undefined;
            }

            await dispatch(inserTask(data, timesheetData, stopData, props.project_wise))

            //  !SaveBtnProcess && setChangeStop(false)
            if (!props.project_wise) {
                await dispatch(getProjectTimeSheetList(rowId));
            }
             handleCancel();
             props.close_model && props.close_model()


        }
        settimeSheetForm(prevState => ({
            ...prevState
        }));
    }

    const submitStopTimesheet = async () => {

        let end_time = dateFormat(timeSheetForm.endTime.value != undefined && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss");
        var timesheetData = {
            "emp_id": localStorage.getItem("empId"),
            "timesheet_id": timeSheetForm.timesheet_id.value,
            "end_date": timeSheetForm.fromDate.value,
            "end_time": end_time,
            "comment": timeSheetForm.description.value,
            "created_by": localStorage.getItem("empId"),
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

                    handleCancel();
                    if (!props.project_wise) {
                        dispatch(getProjectTimeSheetList(rowId));
                    } else if (props.project_wise) {
                        dispatch(getProjectWise_TimeSheet(props.project_wise))
                    }
                    setChangeStop(true)
                    props.close_model && props.close_model()
                    return Promise.resolve();
                }
            });

        } catch (err) {

        }


    }

    function checkValidation(data, key) {

        if (key === 'task_status') {
            if (data.target.checked)
                data = 1
            else
                data = 0
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

        //Process type
        if (key == "projectname") {
            dispatch(getProjectDetails(data))
        }

        settimeSheetForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    useEffect(() => {
        if (props.project_wise && props.insertTask && props.insertTask.length > 0 && !SaveBtnProcess && !props.project_wise_edit) {
            dispatch(getTaskTimeSheet(props.insertTask[0].task_id));
        }
    }, [props.insertTask])

    useEffect(() => {
        if ((timeSheetForm.fromDate.value !== "" && timeSheetForm.fromDate.value < moment().format("YYYY-MM-DD")) || ((timeSheetForm.fromDate.value !== "" && timeSheetForm.fromDate.value === moment().format("YYYY-MM-DD")) && (moment(timeSheetForm.startTime.value).format('HH:mm:ss') < moment().subtract(5, "minutes").format('HH:mm:ss')))) {
            setSaveBtnProcess(true)
        } else {
            setSaveBtnProcess(false)
        }
    }, [timeSheetForm.fromDate.value, timeSheetForm.startTime.value])

    useEffect(() => {
        if (props.timeSheetProject.length > 0 || props.getTaskTimeSheet.length > 0 || props.project_wise_edit) {
            handleCancel();
            let response;
            let data;
            if (props.project_wise && props.getTaskTimeSheet.length > 0) {
                response = props.getTaskTimeSheet
                data = response[response.length - 1].timesheet[0]
            } else if (!props.project_wise && props.timeSheetProject.length > 0) {
                response = props.timeSheetProject
                data = response[response.length - 1]
            } else if (props.project_wise_edit) {
                data = props.project_wise_edit[0]
            }
            
            if (props.project_wise_edit || (!data.end_date && !data.end_time)) {

                if (data.project_id && data.project_id != 0) {
                    timeSheetForm.projectname.value = data.project_id
                }
                timeSheetForm.timesheet_id.value = data.timesheet_id
                timeSheetForm.activity.value = data.activity_id || data.activiity_id
                timeSheetForm.subActivity.value = data.sub_activity_id
                timeSheetForm.priority.value = data.priority_id
                timeSheetForm.tag.value = data.tag_id
                timeSheetForm.startTime.value = data.start_time
                timeSheetForm.fromDate.value = data.start_date

                settimeSheetForm((prevState) => ({
                    ...prevState,
                }));

                setChangeStop(false)
            }


        }

    }, [props.timeSheetProject, props.getTaskTimeSheet, props.project_wise_edit])

    return (
        <div className="timeSheetStartContainer">
            {changeStop ?
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

                        {props.project_wise && <> <Grid item xs={4} container direction="column">
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
                            {props.ProjectDetails.length > 0 && <Grid item xs={4}>
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

                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Priority"}
                                error={timeSheetForm.priority.error}
                                errmsg={timeSheetForm.priority.errmsg}
                                dropdown={priorityList.priorityTypeData}
                                changeData={(data) => checkValidation(data, "priority")}
                                placeholder={"Priority"}
                                value={timeSheetForm.priority.value}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                                error={timeSheetForm.tag.error}
                                errmsg={timeSheetForm.tag.errmsg}
                                value={timeSheetForm.tag.value}
                                changeData={(data) => checkValidation(data, "tag")}
                                dropdown={taggList.tagTypeData}
                            /></Grid>
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
                            <Labelbox type="timepicker"
                                placeholder={"Start Date"}
                                changeData={(data) =>
                                    checkValidation(data, "startTime")
                                }
                                value={timeSheetForm.startTime.value}
                                error={timeSheetForm.startTime.error}
                                errmsg={timeSheetForm.startTime.errmsg}
                                disablePast={true}

                            />
                        </Grid>
                        {!SaveBtnProcess && <><Grid item xs={3}>
                            End Date
                        </Grid>
                            <Grid item xs={3}>
                                End Time
                            </Grid></>}

                        {SaveBtnProcess && <><Grid item xs={3}>
                            <Labelbox type="datepicker"
                                changeData={(data) => checkValidation(data, "toDate")}
                                value={timeSheetForm.toDate.value}
                                error={timeSheetForm.toDate.error}
                                errmsg={timeSheetForm.toDate.errmsg}
                                placeholder={" End date "}
                                minDate={timeSheetForm.fromDate.value}
                            />
                        </Grid>
                            <Grid item xs={3}>
                                <Labelbox type="timepicker"
                                    placeholder={"End Time"}
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
                        <div className="project_wise_checkbox"> {SaveBtnProcess && <><Checkbox onClick={(data) => checkValidation(data, "task_status")} />&nbsp;<label>Task Completed</label></>}</div>
                        <div className="project_wise_save"> <CustomButton btnName={"CANCEL"} onBtnClick={() => (handleCancel(), props.close_model && props.close_model(false))} />
                            <CustomButton btnName={`${!SaveBtnProcess ? 'START' : 'SAVE'}`} btnCustomColor="customPrimary" onBtnClick={submitStartTimeSheet} />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        {!props.project_wise && <> <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].project_type}</Grid>
                            <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].project_name}</Grid>
                            <Grid item xs={4}>{projectDetails && projectDetails.length > 0 && projectDetails[0].client} </Grid></>}

                        {props.project_wise && props.getTaskTimeSheet.length > 0 && props.getTaskTimeSheet[0].timesheet[0].project_id !== 0 && <> <Grid item xs={4} container direction="column">
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
                            {props.ProjectDetails.length > 0 && <Grid item xs={4}>
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
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Priority"}

                                dropdown={priorityList.priorityTypeData}
                                changeData={(data) => checkValidation(data, "priority")}
                                placeholder={"Priority"}
                                value={timeSheetForm.priority.value}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                                value={timeSheetForm.tag.value}
                                changeData={(data) => checkValidation(data, "tag")}
                                dropdown={taggList.tagTypeData}
                            /></Grid>
                    </Grid>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={3}>
                            {/* Start Date */}
                            {moment(timeSheetForm.fromDate.value).format('DD-MMM-YYYY')}
                        </Grid>

                        <Grid item xs={3}>
                            {/* Start Time */}
                            {timeSheetForm.startTime.value}
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                changeData={(data) => checkValidation(data, "toDate")}
                                value={timeSheetForm.toDate.value}
                                error={timeSheetForm.toDate.error}
                                errmsg={timeSheetForm.toDate.errmsg}
                                placeholder={" End date "}
                                maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"}
                            changeData={(data) => checkValidation(data, "description")}
                            value={timeSheetForm.description.value}
                            error={timeSheetForm.description.error}
                            errmsg={timeSheetForm.description.errmsg} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={() => (handleCancel(), props.close_model && props.close_model(false))} />
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={submitStopTimesheet} />
                    </div>

                </div>
            }

        </div>

    )
}

const mapStateToProps = (state) =>
({

    activitysList: state.projectTasksReducer.getActivityList || [],
    prioritysList: state.projectTasksReducer.prioritysList || [],
    tagsList: state.projectTasksReducer.tagsList || [],
    assignToList: state.projectTasksReducer.assignToLists || [],
    locationList: state.projectTasksReducer.locationLists || [],
    timeSheetProject: state.getTaskList.getTimeSheetProject || [],
    ProjectName: state.getOptions.getProjectName || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    insertTask: state.projectTasksReducer.insertTask || [],
    getTaskTimeSheet: state.projectTasksReducer.getTaskTimeSheet,
    getSubactivity: state.getOptions.getSubactivity || [],
});

export default connect(mapStateToProps)(TimeSheetStartModel);