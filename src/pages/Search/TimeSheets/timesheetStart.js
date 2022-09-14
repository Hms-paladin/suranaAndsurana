/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import "./timesheets.scss";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Buttons/button";
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getActivity, getLocation } from "../../../actions/projectTaskAction";
import moment from "moment";
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Box from '@material-ui/core/Box';

import { useParams } from "react-router-dom";
import {
  getProjectTimeSheetList,
  getProjectWise_TimeSheet,
  EditProjectwiseTimesheet,
  getLastTimeSheet,
} from "../../../actions/TimeSheetAction";
import axios from "axios";
import { apiurl } from "../../../utils/baseUrl";
import { notification } from "antd";
import {
  get_projectName_by_Desig,
  getSubactivity,
} from "../../../actions/MasterDropdowns";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import {
  getTaskTimeSheet,
  InsertHearingDetails,
} from "../../../actions/projectTaskAction";
import Order from "../../../images/order.png";
import AddHearing from "../../task/AddHearing";
import DynModel from "../../../component/Model/model";
import EnhancedTable from "../../../component/DynTable/table";
import EditImg from "../../../images/editable.svg";
import DeleteImg from "../../../images/dashboard/delete.svg";

function TimeSheetStartModel(props) {
  const dispatch = useDispatch();
  const [projectSubActivity, setprojectSubActivity] = useState({});
  const [activityList, setactivityList] = useState({});
  const [projectName, setProjectName] = useState({});
  const [AddHearing_Data, setAddHearing_Data] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [editCheck, setEditCheck] = useState({ edit: false, index: 0 });
  const [hearing, setHearing] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [NewData, setNewData] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true)
  const [timeSheetForm, setTimeSheetForm] = useState({
    start_date: {
      value: new Date(),
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    start_time: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    end_time: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    activity_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    sub_activity_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    comment: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    project_id: {
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
    },
  });

  const headCells = [
    { id: "start_date", label: "Date" },
    { id: "start_time", label: "Start Time" },
    { id: "end_time", label: "End Time" },
    // { id: "hours", label: "Hours" },
    { id: "actitvity", label: "Activity" },
    { id: "subactivity", label: "Sub Activity" },
    { id: "comment", label: "comment" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
    dispatch(getActivity());
    dispatch(getLocation());
    dispatch(get_projectName_by_Desig());
  }, []);

  useEffect(() => {
    if (timeSheetForm.activity_id.value) {
      dispatch(getSubactivity(timeSheetForm.activity_id.value));
    }
  }, [timeSheetForm.activity_id.value]);

  useEffect(() => {
    let activityTypeData = [];
    props.activitysList.map((data) => {
      if (timeSheetForm.project_id.value === "" && data.activity_id === 6) {
        return true;
      }
      activityTypeData.push({
        value: data.activity,
        id: data.activity_id,
      });
    });
    setactivityList({ activityTypeData });

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
  }, [
    timeSheetForm.project_id.value,
    props.activitysList,
    props.getSubactivity,
    props.prioritysList,
    props.tagsList,
    props.locationList,
    props.ProjectName,
  ]);

  function checkValidation(data, key) {
    let dynObj;
    if (key === "task_status") {
      if (data.target.checked) data = 1;
      else data = 0;
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

  useEffect(() => {
    tableDataFormation()
  }, [NewData])

  useEffect(() => {
    if (props.project_wise_edit) {
      axios({
        method: "POST",
        url: apiurl + "get_project_wise_timesheet_ByDate",
        data: {
          emp_id: localStorage.getItem("empId"),
          dates: props.project_wise_edit[0].start_date
        },
      }).then(async (response) => {
        setNewData(response.data.data)
      })
      setEdit(true)
    } else {
      setEdit(false)
      setNewData([])
    }
  }, [props.project_wise_edit])

  const dataFormation = () => {
    let fieldData = {
      project_id: timeSheetForm.project_id.value,
      start_date: timeSheetForm.start_date.value,
      start_time: moment(timeSheetForm.start_time.value).format("HH:mm"),
      end_time: moment(timeSheetForm.end_time.value).format("HH:mm"),
      activity: activityList.activityTypeData.find((data) => data.id === timeSheetForm.activity_id.value).value,
      sub_activity: projectSubActivity.projectSubActivitydata.find((data) => data.id === timeSheetForm.sub_activity_id.value).value,
      activity_id: timeSheetForm.activity_id.value,
      sub_activity_id: timeSheetForm.sub_activity_id.value,
      comment: timeSheetForm.comment.value,
    }
    if (NewData[editCheck.index]?.timesheet_id) {
      fieldData = { ...fieldData, timesheet_id: NewData[editCheck.index].timesheet_id, edited: true }
    }
    if (editCheck.edit) {
      let newArr = [...NewData]; // copying the old datas array
      newArr[editCheck.index] = fieldData; // replace data with whatever you want to change it to
      setNewData(newArr);
    } else {
      setNewData(prev => ([...prev, fieldData]))
    }
  }

  const tableDataFormation = () => {
    setTableRows(NewData.map((data, index) => {
      return {
        start_date: moment(data.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        start_time: data.start_time,
        end_time: data.end_time,
        activity: data.activity,
        sub_activity: data.sub_activity,
        comment: data.description || data.comment,
        action: (
          <div className="DataName">
            <img
              src={EditImg}
              className="editImage"
              onClick={() => onEdit(index)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={DeleteImg}
              className="editImage"
              onClick={() => onDelete(index)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )
      }
    })
    )
  }

  const addTimeSheet = () => {
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
      dataFormation();
      handleCancel()
    }
    setTimeSheetForm((prevState) => ({
      ...prevState,
    }));
  };

  const onEdit = (index) => {
    const selectedObj = NewData[index]
    if (selectedObj) {
      setEditCheck({
        edit: true, index
      })
      let From_key = [
        "activity_id",
        "sub_activity_id",
        "start_date",
        "start_time",
        "end_time",
        "comment",
      ];

      From_key.forEach((data) => {
        try {
          if (data === "start_time" || data === "end_time") {
            timeSheetForm[data].value = !selectedObj[data] ? new Date() : new Date(
              "12-30-2017 " + selectedObj[data]
            );
          } else {
            timeSheetForm[data].value = selectedObj[data] || selectedObj.description;
          }
        } catch (error) {
          throw error;
        }
      });
      setTimeSheetForm((prevState) => ({
        ...prevState,
      }));
    }
  };

  const onDelete = (index) => {
    tableRows.splice(index, 1);
    setTimeSheetForm((prevState) => ({
      ...prevState,
    }));
  };

  const handleCancel = () => {
    if (editCheck.edit) {
      setEditCheck({ edit: false, index: 0 });
    }
    Object.keys(timeSheetForm).map((data) => {
      try {
        timeSheetForm[data].value = "";
      } catch (error) {
        throw error;
      }
    });
    setTimeSheetForm((prevState) => ({
      ...prevState,
    }));

  };

  const submitStartTimeSheet = () => {
    var obj = {}
    const insertData = NewData.map((data) => {
      obj = {
        project_id: data.project_id,
        activity_id: data.activity_id,
        sub_activity_id: data.sub_activity_id,
        assignee_id: localStorage.getItem("empId"),
        assigned_by: localStorage.getItem("empId"),
        start_date: moment(data.start_date || data.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        start_time: data.start_time ? data.start_time : moment(data.start_time).format("HH:mm"),
        end_date: moment(data.start_date || data.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        end_time: data.end_time ? data.end_time : moment(data.end_time).format("HH:mm"),
        comment: data.comment || data.description,
        task_status: 1,
        created_on: moment().format("YYYY-MM-DD HH:m:s"),
        created_by: localStorage.getItem("empId"),
      };
      if (data.timesheet_id) {
        obj = { ...obj, timesheet_id: data.timesheet_id }
      }
      return obj
    })
    axios({
      method: "POST",
      url: apiurl + `${!Edit ? 'insert_task_timesheet' : 'update_project_timesheet'}`,
      data: insertData,
    }).then(async (response) => {
      if (response.data.status === 1) {
        // if (timeSheetForm.activity_id.value === 6) {
        //   AddHearing_Data[0].task_id = response.data.data[0].task_id;
        //   setAddHearing_Data((prevState) => [...prevState]);
        //   dispatch(InsertHearingDetails(AddHearing_Data[0]));
        // }
        if (!props.project_wise) {
          await dispatch(getProjectTimeSheetList(rowId || ''));
        } else if (
          props.project_wise ||
          props.project_wise_reject ||
          props.project_wise_edit
        ) {
          dispatch(
            getProjectWise_TimeSheet(
              props.project_wise ||
              props.project_wise_edit[1] ||
              props.project_wise_reject[1]
            )
          );
        }

        notification.success({
          message: `Timesheet ${Edit ? 'updated' : 'added'} successfully`,
        });
        props.close_model && props.close_model();
      } else if (response.data.status === 0) {
        notification.success({
          message: response.data.msg,
        });
      }
    });
  }


  // useEffect(() => {
  //   if (props.model_clear) handleCancel();
  // }, [props.model_clear]);
  console.log(timeSheetForm, NewData, tableRows, "timeSheetStartContainer");
  return (
    <div className="timeSheetStartContainer">
      <Grid item xs={4} container direction="column">
        <div className="TThead">Project Name</div>
        <Labelbox
          type="select"
          placeholder={"Project "}
          dropdown={projectName.ProjectName}
          changeData={(data) => checkValidation(data, "project_id")}
          value={timeSheetForm.project_id.value}
          error={timeSheetForm.project_id.error}
          errmsg={timeSheetForm.project_id.errmsg}
          disabled={timeSheetForm.project_id.disabled}
        ></Labelbox>
      </Grid>
      {props.ProjectDetails.length > 0 &&
        timeSheetForm.project_id.value !== "" && (
          <Grid item xs={4}>
            <div className="TThead">Client Name</div>
            <Labelbox
              type="text"
              value={
                props.ProjectDetails.length > 0 &&
                props.ProjectDetails[0].client
              }
              disabled
            ></Labelbox>
          </Grid>
        )}

      <Grid item xs={12} container direction="row" spacing={3}>
        <Grid item xs={3}>
          <Labelbox
            type="select"
            placeholder={"Activity"}
            dropdown={activityList.activityTypeData}
            changeData={(data) => checkValidation(data, "activity_id")}
            value={timeSheetForm.activity_id.value}
            error={timeSheetForm.activity_id.error}
            errmsg={timeSheetForm.activity_id.errmsg}
          />
        </Grid>
        <Grid item xs={3}>
          <Labelbox
            type="select"
            placeholder={"Sub Activity"}
            dropdown={projectSubActivity.projectSubActivitydata}
            changeData={(data) => checkValidation(data, "sub_activity_id")}
            value={timeSheetForm.sub_activity_id.value}
            error={timeSheetForm.sub_activity_id.error}
            errmsg={timeSheetForm.sub_activity_id.errmsg}
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <Grid item xs={12} container direction="row" spacing={3}>
        <Grid item xs={3}>
          <Labelbox
            type="datepicker"
            disableFuture={true}
            changeData={(data) => checkValidation(data, "start_date")}
            value={timeSheetForm.start_date.value}
            error={timeSheetForm.start_date.error}
            errmsg={timeSheetForm.start_date.errmsg}
            placeholder={"Date"}
          />
        </Grid>
        <Grid item xs={3}>
          <Labelbox
            type="timepickernew"
            placeholder={"Start Time"}
            changeData={(data) => checkValidation(data, "start_time")}
            value={timeSheetForm.start_time.value}
            error={timeSheetForm.start_time.error}
            errmsg={timeSheetForm.start_time.errmsg}
            disablePast={true}
          />
        </Grid>

        <Grid item xs={3}>
          <Labelbox
            type="timepickernew"
            placeholder={"End Time"}
            // disabledHours={Array.from(
            //   Array(
            //     Number(
            //       moment(timeSheetForm.start_time.value, "HH:mm")
            //         .add(5, "minute")
            //         .format("HH")
            //     )
            //   ),
            //   (_, i) => i
            // )}
            // disabledMinutes={Array.from(
            //   Array(
            //     Number(
            //       moment(timeSheetForm.start_time.value, "HH:mm")
            //         .add(5, "minute")
            //         .format("mm")
            //     )
            //   ),
            //   (_, i) => i
            // )}
            changeData={(data) => checkValidation(data, "end_time")}
            value={timeSheetForm.end_time.value}
            error={timeSheetForm.end_time.error}
            errmsg={timeSheetForm.end_time.errmsg}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Labelbox
          type="textarea"
          placeholder={"comment"}
          changeData={(data) => checkValidation(data, "comment")}
          value={timeSheetForm.comment.value}
          error={timeSheetForm.comment.error}
          errmsg={timeSheetForm.comment.errmsg}
        />
      </Grid>
      <CustomButton
        btnName={`${editCheck.edit ? 'Update' : 'Add'}`}
        custombtnCSS="timeSheetButtons"
        btnCustomColor="customPrimary"
        onBtnClick={addTimeSheet}
      />
      <div className="leavetableformat">
        <EnhancedTable
          headCells={headCells}
          projectwise
          tabletitle={""}
          rows={tableRows}
        />
      </div>
      <CustomButton
        btnName={`${Edit ? 'UPDATE' : 'SAVE'}`}
        custombtnCSS="timeSheetButtons"
        btnCustomColor="customPrimary"
        onBtnClick={submitStartTimeSheet}
      />
      <CustomButton
        btnName={"CANCEL"}
        custombtnCSS="timeSheetButtons"
      // onBtnClick={() => (
      //   handleCancel(), props.close_model && props.close_model(false)
      // )}
      />

      <DynModel
        modelTitle={"Hearing"}
        handleChangeModel={hearing}
        handleChangeCloseModel={(bln) => setHearing(bln)}
        content={
          <AddHearing
            project_wise={taskData}
            AddHearing_output={(data) => setAddHearing_Data([data])}
            onhearingclose={() => setHearing(false)}
          />
        }
        width={1000}
      />
      {/* <Box sx={{ display: 'flex' }}>
        <CircularProgress /></Box> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
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
