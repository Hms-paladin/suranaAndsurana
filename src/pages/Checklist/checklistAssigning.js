import react, { useEffect, useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import Grid from "@material-ui/core/Grid";
import './checklists.scss'
import { notification } from "antd";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import moment from "moment"
import { useDispatch, connect } from "react-redux";
import {
  getCheckListsNames, insert_check_list_assign, getDaysOfWeek, get_projType_subProjType_by_projId, getFrequencyByCheckListId
} from "../../actions/CheckListAction";
import { getEmployeeList, getProjectType, getFrequency, getProjectName } from "../../actions/MasterDropdowns";
import ValidationLibrary from "../../helpers/validationfunction";
import EnhancedTable from "../../component/DynTable/table";

function CheckListAssign(props) {
  const [saveRights, setSaveRights] = useState([])
  const dispatch = useDispatch();
  const [projectTypeList, setprojectTypeList] = useState({})
  const [projectSubTypeList, setprojectSubTypeList] = useState({})
  const [employeeList, setemployeeList] = useState({})
  const [daysOfWeeksLists, setdaysOfWeeksLists] = useState({})
  const [projectName, setProjectName] = useState({});

  // task details
  const [start_date, setStart_date] = useState({});
  const [end_date, setEnd_date] = useState({});
  const [days_of_week, setDays_of_week] = useState({});
  const [days_of_week_id, setDays_of_week_id] = useState({});

  const [disableCondition, setDisableCondition] = useState(true);

  const [checkListNames, setcheckListNames] = useState({})

  const [showVariableTable, setShowVariableTable] = useState([]);
  const [sendVariableData, setSendVariableData] = useState([]);
  let valueByIdDays = []
  const [checkListForm, setcheckListForm] = useState({
    checkListNameId: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
      //disabled: true,
      // hidden :true
    },
    employeeId: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    project_type_id: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: true
    },
    subProjectId: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
      disabled: true
    },
    startDate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    endDate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    projectname: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }
  });
  useEffect(() => {
    dispatch(getCheckListsNames());
    dispatch(getEmployeeList());
    dispatch(getProjectType());
    dispatch(getDaysOfWeek());
    dispatch(getProjectName());
  }, []);

  const handleCancel = () => {
    let From_key = [
      "checkListNameId",
      "employeeId",
      "project_type_id",
      "subProjectId",
      "startDate",
      "endDate",
    ];

    From_key.map((data) => {
      try {
        checkListForm[data].value = "";
        checkListForm[data].disabled = false;
        console.log("mapping", checkListForm[data].value);
      } catch (error) {
        throw error;
      }
    });
    setcheckListForm((prevState) => ({
      ...prevState,
    }));

    setStart_date({});
    setEnd_date({});
    setDays_of_week({});

    setShowVariableTable([]);
    setSendVariableData([]);

  };

  function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(checkListForm);

    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        checkListForm[targetkeys[i]].value,
        checkListForm[targetkeys[i]].validation
      );
      checkListForm[targetkeys[i]].error = !errorcheck.state;
      checkListForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = checkListForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => checkListForm[obj].error == true
    );

    if (filtererr.length > 0) {
      // setInsertTaskForm({ error: true });
    } else {
      console.log(sendVariableData, "sendVariableData")
      var data = {
        "check_list_id": checkListForm.checkListNameId.value,
        "emp_id": checkListForm.employeeId.value == '' ? 0 : checkListForm.employeeId.value,
        "project_id": checkListForm.projectname.value == '' ? 0 : checkListForm.projectname.value,
        "project_type_id": checkListForm.project_type_id.value == '' ? 0 : checkListForm.project_type_id.value,
        "project_sub_type_id": (!checkListForm.subProjectId.value || checkListForm.subProjectId.value === "") ? 0 : checkListForm.subProjectId.value,
        "start_date": checkListForm.startDate.value === "" ? '0000-00-00' : checkListForm.startDate.value,
        "end_date": checkListForm.endDate.value === "" ? '0000-00-00' : checkListForm.startDate.value,
        "details": sendVariableData,
        "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        "created_by": localStorage.getItem("empId")

      }

      dispatch(insert_check_list_assign(data)).then((response) => {
        handleCancel();
      })

    }

    setcheckListForm(prevState => ({
      ...prevState
    }));
  };

  function checkValidation(data, key, multipleId) {


    // only for multi select (start)

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    // (end)

    if (data && key == "projectname") {
      dispatch(get_projType_subProjType_by_projId(data));
    }

    if (data && key == "checkListNameId") {
      dispatch(getFrequencyByCheckListId(data));
    }

    if (data && key == "employeeId") {
      checkListForm['projectname'].disabled = true;
      checkListForm['project_type_id'].disabled = true;
      checkListForm['subProjectId'].disabled = true;
      checkListForm['projectname'].validation = [];
      checkListForm['project_type_id'].validation = [];
      checkListForm['subProjectId'].validation = [];
    }



    var errorcheck = ValidationLibrary.checkValidation(
      data,
      checkListForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: checkListForm[key].validation,
    };

    setcheckListForm((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));


  }

  useEffect(() => {

    if (checkListForm.project_type_id.value != '') {
      var data = checkListForm.project_type_id.value
      checkListForm['employeeId'].disabled = true;
      checkListForm['employeeId'].validation = [];
      Axios({
        method: "POST",
        url: apiurl + "get_project_sub_type",
        data: {
          project_type_id: data,
        },
      }).then((response) => {
        let projectSuTypeData = [];
        if (response && response.data && response.data.data.length == 0) {
          checkListForm['subProjectId'].validation = [];
        }
        response.data.data.map((data) =>
          projectSuTypeData.push({
            value: data.sub_project_type,
            id: data.sub_project_type_id,
          })
        );
        setprojectSubTypeList({ projectSuTypeData });
      });
    }
  }, [checkListForm.project_type_id.value])


  useEffect(() => {

  }, [])

  useEffect(() => {

    let projectTypeData = []
    props.getProjectType.map((data) =>
      projectTypeData.push({
        value: data.project_type,
        id: data.project_type_id
      })
    )
    setprojectTypeList({ projectTypeData })

    let employeeData = []
    props.getEmployeeList.map((data) =>
      employeeData.push({
        value: data.name,
        id: data.emp_id
      })
    )
    setemployeeList({ employeeData })

    let checkListnamesdata = []
    props.getCheckListsNames.map((data) =>
      checkListnamesdata.push({
        value: data.check_list,
        id: data.check_list_id
      })
    )
    setcheckListNames({ checkListnamesdata })

    let daysofWeeksData = []
    props.getDaysofWeeks.map((data) =>
      daysofWeeksData.push({
        value: data.days_of_week,
        id: data.days_of_week_id
      })
    )
    setdaysOfWeeksLists({ daysofWeeksData })

    // Project Name

    let ProjectName = [];
    props.ProjectName.map((data) =>
      ProjectName.push({ id: data.project_id, value: data.project_name })
    );
    setProjectName({ ProjectName });
    //daysOfWeeksLists.daysofWeeksData

  }, [props.getProjectType, props.getEmployeeList, props.getCheckListsNames, props.getDaysofWeeks, props.ProjectName]);

  useEffect(() => {
    if (props.get_projType_subProjType_by_projId.length > 0 && props.get_projType_subProjType_by_projId) {
      checkListForm.project_type_id.value = props.get_projType_subProjType_by_projId[0].project_type_id
      checkListForm.subProjectId.value = props.get_projType_subProjType_by_projId[0].sub_project_id
      setcheckListForm(prevState => ({
        ...prevState
      }));
    }

  }, [props.get_projType_subProjType_by_projId]);

  ///***********user permission**********/
  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "Check List Assigning" == val.control
        )
      })
      setSaveRights(data_res_id)
    }

  }, [props.UserPermission]);

  /////////////

  const headers = [
    { id: "task", label: "Task" },
    { id: "frequency", label: "Frequency" },
    { id: "start_date", label: "Start Date" },
    { id: "end_date", label: "End Date" },
    { id: "days_of_week", label: "Days of week" },
  ];

  const onchangeTaskDetails = (data, key, name) => {
    setDisableCondition(false)
    if (name === "start_date") {
      setStart_date((prevState) => ({
        ...prevState,
        [key]: data,
      }));
    } else if (name === "end_date") {
      setEnd_date((prevState) => ({
        ...prevState,
        [key]: data,
      }));
    } else {
      // if (data != "") {
      let multipleIdList = [];

      // if (multipleId) {
      daysOfWeeksLists.daysofWeeksData.length > 0 && daysOfWeeksLists.daysofWeeksData.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      valueByIdDays = multipleIdList.toString();
      // }
      // console.log(valueByIdDays,"valueByIdDays")
      setDays_of_week((prevState) => ({
        ...prevState,
        [key]: data,
      }));
      setDays_of_week_id((prevState) => ({
        ...prevState,
        [key]: valueByIdDays,
      }));
      // }
    }


  };

  useEffect(() => {
    if (checkListForm.checkListNameId.value != '' && checkListForm.startDate.value != '' && checkListForm.endDate.value != '') {
      let searchVariableTableData = [];
      let sendChecklistTableData = [];
      let tableData = [];

      let start_date_disable = true;
      let end_date_disable = true;
      let days_of_week_disable = true;
      props.getFrequencyByCheckListId.length > 0 && props.getFrequencyByCheckListId.map((data, index) => {

        tableData.push(data)

        if (disableCondition) {
          start_date["start_date" + index] = checkListForm.startDate.value;
          end_date["end_date" + index] = checkListForm.endDate.value;
          days_of_week["days_of_week" + index] = '';
          days_of_week_id["days_of_week" + index] = '';
        }

        if (data.frequency === 'On Demand') {
          start_date_disable = true;
          end_date_disable = true;
          days_of_week_disable = true;
        } else if (data.frequency === 'Alternate Days' || data.frequency === 'Weekly') {
          start_date_disable = false;
          end_date_disable = false;
          days_of_week_disable = false;
        } else {
          start_date_disable = false;
          end_date_disable = false;
          days_of_week_disable = true;
        }

        searchVariableTableData.push({
          task: data.task,
          frequency: data.frequency,
          start_date: <div style={{ width: '60%' }}> <Labelbox
            type="datepicker"
            placeholder={"Start Date"}
            changeData={(data) => onchangeTaskDetails(data, "start_date" + index, "start_date")}
            value={start_date["start_date" + index]}
            disabled={start_date_disable}
            minDate={checkListForm.startDate.value}
            maxDate={checkListForm.endDate.value}

          /></div>,
          end_date: <div style={{ width: '60%' }}>  <Labelbox
            type="datepicker"
            placeholder={"End Date"}
            changeData={(data) => onchangeTaskDetails(data, "end_date" + index, "end_date")}
            value={end_date["end_date" + index]}
            disabled={end_date_disable}
            minDate={checkListForm.startDate.value}
            maxDate={checkListForm.endDate.value}

          /></div>,
          days_of_week: <div style={{ width: '70%' }}>  <Labelbox
            type="select"
            mode={"multiple"}
            placeholder={"Days of Week"}
            dropdown={daysOfWeeksLists.daysofWeeksData}
            changeData={(data) => onchangeTaskDetails(data, "days_of_week" + index, "days_of_week")}
            value={days_of_week["days_of_week" + index]}
            disabled={days_of_week_disable}

          /></div>,
        });
        setShowVariableTable([...showVariableTable]);
        sendChecklistTableData.push({
          task: data.task,
          frequency_id: data.frequency_id,
          task_start_date: start_date["start_date" + index],
          task_end_date: end_date["end_date" + index],
          days_of_week_id: days_of_week_id["days_of_week" + index] === "" ? 0 : days_of_week_id["days_of_week" + index]
        });

      })
      setShowVariableTable([...searchVariableTableData]);
      setSendVariableData([...sendChecklistTableData]);
    }
  }, [props.getFrequencyByCheckListId, start_date, end_date, days_of_week, checkListForm.startDate.value, checkListForm.endDate.value])

  console.log(sendVariableData, "sendVariableData")
  return (
    <div>
      <div className="mainHeading">Check List Assigning</div>
      <div className="clAssignFields">
        <Grid item xs={12} container direction="row" spacing={2}>
          <Grid item xs={3} container direction="column">
            <div className="TThead">Check List Name</div>
            <Labelbox type="select"

              dropdown={checkListNames.checkListnamesdata}
              changeData={(data) => checkValidation(data, "checkListNameId")}
              placeholder={"Check List name"}
              value={checkListForm.checkListNameId.value}
              error={checkListForm.checkListNameId.error}
              errmsg={checkListForm.checkListNameId.errmsg}></Labelbox>

          </Grid>
          <Grid item xs={3} container direction="column">
            <div className="TThead">Employee</div>
            <Labelbox type="select"
              dropdown={employeeList.employeeData}
              changeData={(data) => checkValidation(data, "employeeId")}
              placeholder={"Employee"}
              value={checkListForm.employeeId.value}
              error={checkListForm.employeeId.error}
              errmsg={checkListForm.employeeId.errmsg}
              disabled={checkListForm.employeeId.disabled}
            ></Labelbox>
          </Grid>
          <Grid item xs={3} container direction="column">
            <div className="TThead">Project Name</div>
            <Labelbox type="select"
              placeholder={"Project "}
              dropdown={projectName.ProjectName}
              changeData={(data) => checkValidation(data, "projectname")}
              value={checkListForm.projectname.value}
              error={checkListForm.projectname.error}
              errmsg={checkListForm.projectname.errmsg}
              disabled={checkListForm.projectname.disabled}></Labelbox>

          </Grid>
          <Grid item xs={3} container direction="column">
            <div className="TThead">Project Type</div>
            <Labelbox type="select"
              dropdown={projectTypeList.projectTypeData}
              changeData={(data) => checkValidation(data, "project_type_id")}
              placeholder={"Project "}
              value={checkListForm.project_type_id.value}
              error={checkListForm.project_type_id.error}
              errmsg={checkListForm.project_type_id.errmsg}
              disabled
            >
            </Labelbox>

          </Grid>
          <Grid item xs={3} container direction="column">
            <div className="TThead">Project Sub Type</div>
            <Labelbox type="select"
              dropdown={projectSubTypeList.projectSuTypeData}
              changeData={(data) => checkValidation(data, "subProjectId")}
              placeholder={"Sub Project "}
              value={checkListForm.subProjectId.value}
              error={checkListForm.subProjectId.error}
              errmsg={checkListForm.subProjectId.errmsg}
              disabled
            ></Labelbox>
          </Grid>
          {/* {checkListForm.checkListNameId.value != '' && <> */}
          {/* <Grid item xs={3} container direction="column">
              <div className="TThead">Frequency</div>
              <Labelbox type="select"
                dropdown={frequencyList.frequencyTypeData}
                changeData={(data) => checkValidation(data, "frequency")}
                placeholder={"Frequency"}
                value={checkListForm.frequency.value}
                error={checkListForm.frequency.error}
                errmsg={checkListForm.frequency.errmsg}
              // disabled={checkListForm.frequency.disabled}
              ></Labelbox>
            </Grid> */}

          <Grid item xs={2} container direction="column">
            <div className="TThead">Start Date</div>
            <Labelbox type="datepicker"
              // view={["month"]}
              changeData={(data) => checkValidation(data, "startDate")}
              placeholder={"Start date "}
              value={checkListForm.startDate.value}
              error={checkListForm.startDate.error}
              errmsg={checkListForm.startDate.errmsg}
            // disabled={!divShow.start_date}
            >
            </Labelbox>

          </Grid>

          <Grid item xs={2} container direction="column">
            <div className="TThead">End Date</div>
            <Labelbox type="datepicker"
              // view={["date"]}
              changeData={(data) => checkValidation(data, "endDate")}
              placeholder={"End Date "}
              value={checkListForm.endDate.value}
              error={checkListForm.endDate.error}
              errmsg={checkListForm.endDate.errmsg}
            // disabled={!divShow.end_date}
            ></Labelbox>
          </Grid>

          {/* <Grid item xs={2} container direction="column">
              <div className="TThead">Days of Week</div>
              <Labelbox
                type="select"
                mode={"multiple"}
                placeholder={"Days of Week"}
                dropdown={daysOfWeeksLists.daysofWeeksData}
                changeData={(data) =>
                  checkValidation(data, "noOfDaysWeeks", daysOfWeeksLists.daysofWeeksData)
                }
                disabled={checkListForm.noOfDaysWeeks.disabled}
                value={checkListForm.noOfDaysWeeks.value}
                error={checkListForm.noOfDaysWeeks.error}
                errmsg={checkListForm.noOfDaysWeeks.errmsg}
                disabled={!divShow.days_of_week}
              />
            </Grid> */}
          {/* </>} */}

        </Grid>
        {/* {showVariableTable.length !== 0 && */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}> Checklist Details</div>
          <EnhancedTable headCells={headers}
            rows={showVariableTable || []} />
        </div>
        {/* } */}
        <div className="checklistAssignBtn">
          <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={onSubmit} />
          <CustomButton btnName={"Cancel"} onBtnClick={handleCancel} custombtnCSS="custombtn" />
        </div>

      </div>
    </div>
  )
}
const mapStateToProps = (state) =>
({
  UserPermission: state.UserPermissionReducer.getUserPermission,
  getProjectType: state.getOptions.getProjectType || [],
  getEmployeeList: state.getOptions.getEmployeeList || [],
  getCheckListsNames: state.CheckListReducer.getCheckListsNames || [],
  getDaysofWeeks: state.CheckListReducer.getDaysofWeeks || [],
  ProjectName: state.getOptions.getProjectName || [],
  get_projType_subProjType_by_projId: state.CheckListReducer.get_projType_subProjType_by_projId || [],
  getFrequencyByCheckListId: state.CheckListReducer.getFrequencyByCheckListId || [],
});
export default connect(mapStateToProps)(CheckListAssign);
