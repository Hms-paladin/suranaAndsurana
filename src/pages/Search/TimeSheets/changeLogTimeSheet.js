import react, { useEffect, useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getActivity, getPriorityList, getTagList, inserTask, getAssignedTo, getLocation, insertChangeLog } from "../../../actions/projectTaskAction";

import Axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import dateFormat from 'dateformat';
import { useParams } from "react-router-dom";
import { notification } from "antd";

function ChangeLogTimeSheet(props) {
    const dispatch = useDispatch();
    const [projectSubActivity, setprojectSubActivity] = useState({});
    const [activityList, setactivityList] = useState({})
    const [priorityList, setpriorityList] = useState({})
    const [taggList, settaggList] = useState({})
    const [assignedToLists, setassignedToLists] = useState("")
    const [projectDetails, setProjectDetails] = useState([{}])
    const [timeSheetForm, settimeSheetForm] = useState({
        startTime: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        endTime: {
            value: "",
            validation: [{ name: "required" }],
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
        assignTo: {
            value: "",
            validation: [],
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
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
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
            "assignTo",
            "tag",
            "priority",
            "startTime", "description", "endTime"
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

        props.close_model && props.close_model(false)
    };

    useEffect(() => {
        dispatch(getActivity());
        dispatch(getTagList());
        dispatch(getPriorityList());
        dispatch(getAssignedTo());
        dispatch(getLocation());

    }, []);

    useEffect(() => {
        if (props.approve_timesheet && props.approve_timesheet !== '') {

            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
            // timeSheetForm.startTime.value
        }
        console.log(props.approve_timesheet, props.projectrow, 'approve_timesheetd')
    }, [props.approve_timesheet]);

    useEffect(() => {
        let activityTypeData = []
        props.activitysList.map((data) =>
            activityTypeData.push({
                value: data.activity,
                id: data.activity_id
            })
        )
        setactivityList({ activityTypeData })


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


        let assignedToData = ""
        let id = JSON.parse(localStorage.getItem("empId"))
        props.assignToList.map((data) => {
            if (data?.emp_id === id) {
                assignedToData = data?.name
            }
        }

        )
        setassignedToLists(assignedToData)
        console.log(assignedToData, "assignedToData");


    }, [props.activitysList, props.prioritysList, props.tagsList, props.locationList, props.assignToList])


    const submitSave = () => {

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
        let startTime = dateFormat(timeSheetForm.startTime.value != undefined && timeSheetForm.startTime.value != '' ? timeSheetForm.startTime.value : new Date(), "hh:MM:ss");
        let endTime = dateFormat(timeSheetForm.endTime.value != undefined && timeSheetForm.endTime.value != '' ? timeSheetForm.endTime.value : new Date(), "hh:MM:ss");

        var data = {
            "project_id": props.approve_timesheet && props.approve_timesheet != '' && props.approve_timesheet.project_id || rowId,
            "activiity_id": timeSheetForm.activity.value,
            "sub_activity_id": timeSheetForm.subActivity.value,
            "assignee_id": localStorage.getItem("empId"),
            "start_date": timeSheetForm.fromDate.value,
            "end_date": timeSheetForm.toDate.value && timeSheetForm.toDate.value != '' ? timeSheetForm.toDate.value : timeSheetForm.fromDate.value,
            "assigned_by": localStorage.getItem("empId"),
            "priority": timeSheetForm.priority.value,
            "description": timeSheetForm.description.value,
            "tag": timeSheetForm.tag.value,
            "end_time": endTime,
            "start_time": startTime
        }



        dispatch(insertChangeLog(data))
        console.log(props.insertChangeLog.status);
        if (props.insertChangeLog.status === 1) {
            notification.success({
                message: "Change Log Time Sheet Added",
            })
        } else if (props.insertChangeLog.status === 0) {
            notification.error({
                message: "Change Log Time Sheet Failed",
            })
        }


    }

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

        //Process type

        if (key == "activity") {
            // Sub Activity
            Axios({
                method: "POST",
                url: apiurl + "get_sub_activity",
                data: {
                    activity_id: data,
                },
            }).then((response) => {
                let projectSubActivitydata = [];
                response.data.data.map((data) =>
                    projectSubActivitydata.push({
                        value: data.sub_activity,
                        id: data.sub_activity_id,
                    })
                );
                setprojectSubActivity({ projectSubActivitydata });
            });

        }

        settimeSheetForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    return (
        <div className="timeSheetStartContainer">

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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <Labelbox type="select"
                            placeholder={assignedToLists}
                            value={""}
                            error={timeSheetForm.assignTo.error}
                            errmsg={timeSheetForm.assignTo.errmsg}
                            changeData={(data) => checkValidation(data, "assignTo")}
                            disabled={true}


                        />
                    </Grid>

                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <Labelbox type="select"
                            placeholder={"Tag"}
                            value={timeSheetForm.tag.value}
                            changeData={(data) => checkValidation(data, "tag")}
                            dropdown={taggList.tagTypeData}
                            error={timeSheetForm.tag.error}
                            errmsg={timeSheetForm.tag.errmsg}
                        /></Grid>
                    <Grid item xs={4}></Grid>
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
                    <Grid item xs={3}>
                        <Labelbox type="datepicker"
                            disablePast={true}
                            changeData={(data) => checkValidation(data, "toDate")}
                            placeholder={" End Date"}
                            value={timeSheetForm.toDate.value}
                            error={timeSheetForm.toDate.error}
                            errmsg={timeSheetForm.toDate.errmsg}

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
                            disablePast={true}

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
                    <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" onBtnClick={handleCancel} />
                    <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={submitSave} />
                    {/* <CustomButton btnName={"START"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={props.changeStop}/> */}

                </div>
            </div>

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
        insertChangeLog: state.projectTasksReducer.insertTask

    });

export default connect(mapStateToProps)(ChangeLogTimeSheet);