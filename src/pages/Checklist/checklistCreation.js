import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from "../../component/DynTable/table";
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import moment from "moment"
import {
  getDepartment, getCheckListType, getActivity, getFrequency,
} from "../../actions/MasterDropdowns";
import {
  getCheckLists, insertCheckList, getCheckListsNames
} from "../../actions/CheckListAction";
import './checklists.scss'
import ValidationLibrary from "../../helpers/validationfunction";
import { Collapse } from "antd";
import { Select, Divider, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";


function CheckListCreation(props) {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const [saveRights, setSaveRights] = useState([])
  const [addRights, setAddRights] = useState([])
  const [multiplePanel, setMultiplePanel] = useState([]);
  const [tempname, setTempName] = useState()

  const [checkListForm, setcheckListForm] = useState({
    activity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    subActivity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
      disabled: false
    },
    department: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    checkListName: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    checkListType: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    frequency: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    task: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }, { name: "alphaspecialwithwhitespace" }],
      error: null,
      errmsg: null,
    }
  });

  const handleCancel = () => {
    let From_key = [
      "activity",
      "subActivity",
      "department",
      "checkListName",
      "checkListType",
      "task",
      "frequency"
    ];

    From_key.map((data) => {
      try {
        checkListForm[data].value = "";
        console.log("mapping", checkListForm[data].value);
      } catch (error) {
        throw error;
      }
    });
    setcheckListForm((prevState) => ({
      ...prevState,
    }));
  };


  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getCheckListType());
    dispatch(getActivity());
    dispatch(getFrequency());
    dispatch(getCheckLists());
    dispatch(getCheckListsNames());
  }, []);
  const [activityList, setactivityList] = useState({})
  const [departmentList, setdepartmentList] = useState({})
  const [checkListType, setcheckListType] = useState({})
  const [checkListCtegory, setcheckListCtegory] = useState({})
  const [subActivity, setsubActivity] = useState({})
  const [frequencyList, setfrequencyList] = useState({})
  const [checkListNames, setcheckListNames] = useState({})

  const [checkMasterListsData, setcheckMasterListsData] = useState([])
  useEffect(() => {

    //     let checkListsData = []
    // props.getCheckListscreation.map((data) =>
    // checkListsData.push(data)
    // )
    // var lists = [];

    // for (var m = 0; m < checkListsData.length; m++) {
    //   var listarray = {
    //     department: checkListsData[m].department, 
    //     category: checkListsData[m].category, 
    //     listName: checkListsData[m].check_list,
    //      listType:checkListsData[m].check_list_type, 
    //     taskItem: checkListsData[m].task,
    //      activity: checkListsData[m].activity,
    //       subactivity: checkListsData[m].sub_activity,
    //        frequency: checkListsData[m].frequency
    //   }
    //   lists.push(listarray);
    // }
    // setcheckMasterListsData({ lists })

    let frequencyTypeData = []
    props.getFrequency.map((data) =>
      frequencyTypeData.push({
        value: data.status,
        id: data.status_id
      })
    )
    setfrequencyList({ frequencyTypeData })

    let activityTypeData = []
    props.getActivity.map((data) =>
      activityTypeData.push({
        value: data.activity,
        id: data.activity_id
      })
    )
    setactivityList({ activityTypeData })


    let departmentTypeData = []
    props.getDepartment.map((data) =>
      departmentTypeData.push({
        value: data.department,
        id: data.department_id
      })
    )
    setdepartmentList({ departmentTypeData })

    let checkListTypeData = []
    props.getCchecklisttype.map((data) =>
      checkListTypeData.push({
        value: data.status,
        id: data.status_id
      })
    )
    setcheckListType({ checkListTypeData })

    let checkListNameData = []
    props.getCheckListsNames.map((data) =>
      checkListNameData.push({
        value: data.check_list,
        id: data.check_list
      })
    )
    setcheckListNames({ checkListNameData })
  }, [props.getCchecklisttype, props.getFrequency,
  props.getActivity, props.getDepartment, props.getCheckListsNames
  ]);

  function checkValidation(data, key, multipleId) {
    if (key == "checkListName") {
      console.log(data, "dataaaa")
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
    if (data && key == "checkListType") {

      if (data == '198' || data == '200') {
        checkListForm['activity'].disabled = true;
        checkListForm['activity'].validation = [];
        checkListForm['subActivity'].validation = [];
        checkListForm['subActivity'].disabled = true;
      } else {
        checkListForm['activity'].disabled = false;
        checkListForm['subActivity'].disabled = false;
        checkListForm['activity'].validation = [{ name: "required" }];
        checkListForm['subActivity'].validation = [{ name: "required" }];
      }

    }

    if (data && key == "activity") {
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
        setsubActivity({ projectSubActivitydata });
      });
    }
    setcheckListForm((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

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
      var checkListName = encodeURI(checkListForm.checkListName.value)
      checkListName = checkListName.replace(/%20/g, ' ');
      checkListName = checkListName.replace(/%25/g, ' ');

      var taskDesc = encodeURI(checkListForm.task.value)
      taskDesc = taskDesc.replace(/%20/g, ' ');
      taskDesc = taskDesc.replace(/%25/g, ' ');

      var data = {

        "department": checkListForm.department.value,
        "check_list": checkListName,
        "check_list_type": checkListForm.checkListType.value,
        "project_type_id": checkListForm.department.value,
        "project_sub_type_id": checkListForm.department.value,
        "activity_id": checkListForm.activity.value != '' ? checkListForm.activity.value : 0,
        "sub_activity_id": checkListForm.subActivity.value != '' ? checkListForm.subActivity.value : 0,
        "frequency_id": checkListForm.frequency.value ? checkListForm.frequency.value : 0,
        "task": taskDesc,
        "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        "created_by": localStorage.getItem("empId")

      }

      dispatch(insertCheckList(data)).then((response) => {
        handleCancel();
      })

      // dispatch(InesertResume(InsertTaskForm)).then(() => {
      //   handleCancel()
      // })
    }

    setcheckListForm(prevState => ({
      ...prevState
    }));
  };
  const headCells = [
    { id: "department", label: "Department" },
    // { id: "category", label: "Category" },
    // { id: "listName", label: "Check List Name" },
    { id: "listType", label: "Check List Type" },
    { id: "taskItem", label: "TaskItem" },
    { id: "activity", label: "Activity" },
    { id: "subactivity", label: "Sub Activity" },
    { id: "frequency", label: "Frequency" },
  ]

  // const rows = [
  //     { department: "Research", category: "category1", listName: "listName1", listType: "simple", taskItem: "Book Hall", activity: "", subactivity: "", frequency: "" },
  //     { department: "", category: "", listName: "", listType: "simple", taskItem: "But Stationaries", activity: "", subactivity: "", frequency: "" },
  //     { department: "", category: "", listName: "", listType: "Task Linked", taskItem: "Documentaion", activity: "Activity", subactivity: "Sub Activity", frequency: "On Demand" },
  //     { department: "", category: "", listName: "", listType: "simple", taskItem: "Bio metric", activity: "", subactivity: "", frequency: "" },
  //     { department: "", category: "", listName: "", listType: "No Task Linked", taskItem: "Pay Electricaly bill", activity: "", subactivity: "", frequency: "Fortnightly" },
  //     { department: "", category: "", listName: "", listType: "Task linked", taskItem: "Monthly Report", activity: "Documentation", subactivity: "", frequency: "Monthly" },
  // ]


  useEffect(() => {
    // console.log(props.getCheckListscreation, "projectLength")

    let multipleTab = [];
    props.getCheckListscreation.map((data, index) => {
      let ipProjectDataList = [];

      data.details.map((data1, index) => {


      var rowdataListobj = {};
      // if (data.project_type_id === 1) {
      rowdataListobj["department"] = data1.department;
      rowdataListobj["listType"] = data1.check_list_type;
      rowdataListobj["taskItem"] = data1.task;
      rowdataListobj["activity"] = data1.activity;
      rowdataListobj["subactivity"] = data1.sub_activity;
      rowdataListobj["frequency"] = data1.frequency;
      // } 
      ipProjectDataList.push(rowdataListobj);
      });


      multipleTab.push(
        <Panel
          header={`${data.check_list}`}
          key={index + 1}
        >
          <EnhancedTable
            headCells={
              headCells
            }
            rows={ipProjectDataList}
            tabletitle={""}
          />
        </Panel>
      );


    });

    setMultiplePanel(multipleTab);
  }, [props.getCheckListscreation]);

  ///***********user permission**********/
  useEffect(() => {
    if (props.UserPermission && props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "CheckList Creation - Save" == val.control
        )
      })
      setSaveRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => {
        return (
          "CheckList Creation - Add" == val.control
        )
      })
      setAddRights(data_res_id)
    }

  }, [props.UserPermission]);

  const onSearch = (val) => {
    val.trim() != '' && setTempName(val)
  }

  const onblurEvent = () => {

    let data_res_id = checkListNames.checkListNameData.find((val) => {
      return (
        tempname == val.id
      )
    })
    // console.log(data_res_id, "jjjj")
    if (!data_res_id) {
      checkListNames.checkListNameData.push({ value: tempname, id: tempname })
      setcheckListNames((prevState) => ({
        ...prevState,
        // checkListNames.checkListNameData:[checkListNames.checkListNameData.length+1]:{value: tempname,id: tempname}
      }))
      checkListForm.checkListName.value = tempname
      setcheckListNames((prevState) => ({
        ...prevState,
      }))
    }
    // {   checkListNameData.push({
    //     value: data.check_list,
    //     id: data.check_list
    //   }) }) 
  }


  /////////////

  console.log(checkListNames, "tempname")
  return (
    <div>
      <div className="mainHeading">Check List Creation</div>
      <div className="chechlistFields">
        <div className="firstrowFields">
          <div>  <div className="TThead">Department</div>
            <Labelbox type="select"
              dropdown={departmentList.departmentTypeData}
              changeData={(data) => checkValidation(data, "department")}
              placeholder={"Department"}
              value={checkListForm.department.value}
              error={checkListForm.department.error}
              errmsg={checkListForm.department.errmsg} /></div>

          <div>  <div className="TThead">Check List Name</div>
            <Labelbox type="select"
              dropdown={checkListNames.checkListNameData}
              changeData={(data) => checkValidation(data, "checkListName")}
              searchData={val => onSearch(val)}
              blurData={() => onblurEvent()}
              value={checkListForm.checkListName.value}
              error={checkListForm.checkListName.error}
              errmsg={checkListForm.checkListName.errmsg}

            />

          </div>
          <div>  <div className="TThead">Check List Type</div>
            <Labelbox type="select"
              dropdown={checkListType.checkListTypeData}
              changeData={(data) => checkValidation(data, "checkListType")}
              placeholder={"Check List type"}
              value={checkListForm.checkListType.value}
              error={checkListForm.checkListType.error}
              errmsg={checkListForm.checkListType.errmsg}
            /></div>
          <div>  <div className="TThead">Activity</div>
            <Labelbox type="select" dropdown={activityList.activityTypeData}
              changeData={(data) => checkValidation(data, "activity")}
              placeholder={"Activity"}
              value={checkListForm.activity.value}
              error={checkListForm.activity.error}
              errmsg={checkListForm.activity.errmsg}
              disabled={checkListForm.activity.disabled}
            /></div>
        </div>
        <div className="firstrowFields">
          <div>  <div className="TThead">Sub Activity</div>
            <Labelbox type="select"
              dropdown={subActivity.projectSubActivitydata}
              changeData={(data) => checkValidation(data, "subActivity")}
              placeholder={"Sub Activity"}
              value={checkListForm.subActivity.value}
              error={checkListForm.subActivity.error}
              errmsg={checkListForm.subActivity.errmsg}
              disabled={checkListForm.subActivity.disabled}
            /></div>
          <div>  <div className="TThead">Frequency</div>
            <Labelbox type="select"
              dropdown={frequencyList.frequencyTypeData}
              changeData={(data) => checkValidation(data, "frequency")}
              placeholder={"Frequency"}
              value={checkListForm.frequency.value}
              error={checkListForm.frequency.error}
              errmsg={checkListForm.frequency.errmsg}
            /></div>
          <div className="taskfield">  <div className="TThead">Task Item</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "task")}
              value={checkListForm.task.value}
              error={checkListForm.task.error}
              errmsg={checkListForm.task.errmsg}

            /></div>
          <div className="checklistBtn">

            <div >

              {/* <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary"  onBtnClick={onSubmit}/> */}
              <CustomButton btnName={"Save"} custombtnCSS="custombtn Btn_change" btnCustomColor="customPrimary" btnDisable={!addRights || addRights.display_control && addRights.display_control === 'N' ? true : false} onBtnClick={onSubmit} />
              <CustomButton btnName={"Cancel"} onBtnClick={handleCancel} custombtnCSS="custombtn Btn_change" />
            </div>
          </div>

        </div>

      </div>
      {/* <EnhancedTable
                headCells={headCells}
                rows={checkMasterListsData.length == 0 ? checkMasterListsData : checkMasterListsData.lists}
                aligncss="aligncss"
            /> */}
      <div className="checklist_collapse">
        <Collapse >{multiplePanel}</Collapse>
      </div>
    </div>
  )
}

const mapStateToProps = (state) =>
({
  getCchecklisttype: state.getOptions.getCchecklisttype || [],
  getFrequency: state.getOptions.getFrequency || [],
  getActivity: state.getOptions.getActivity || [],
  getDepartment: state.getOptions.getDepartment || [],
  getCheckListsNames: state.CheckListReducer.getCheckListsNames || [],
  getCheckListscreation: state.CheckListReducer.getCheckListscreation || [],
});
export default connect(mapStateToProps)(CheckListCreation);

