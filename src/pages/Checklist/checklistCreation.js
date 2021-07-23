import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from "../../component/DynTable/table";
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";
import Axios from "axios";
import { apiurl } from "../../utils/baseUrl";
import moment from "moment"
import {
    getDepartment,getCheckListCategory,getCheckListType,getActivity,getFrequency,
  } from "../../actions/MasterDropdowns";
  import {getCheckLists,insertCheckList
  } from "../../actions/CheckListAction";
import './checklists.scss'
import ValidationLibrary from "../../helpers/validationfunction";
function CheckListCreation(props) {
    const dispatch = useDispatch();
    const [saveRights, setSaveRights] = useState([])
    const [addRights, setAddRights] = useState([])
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
            
                "department":checkListForm.department.value,
                "category_id":checkListForm.checkListCategory.value,
                "check_list":checkListName,
                "check_list_type":checkListForm.checkListType.value,
                "project_type_id":checkListForm.department.value,
                "project_sub_type_id":checkListForm.department.value,
                "activity_id":checkListForm.activity.value != '' ? checkListForm.activity.value : 0 ,
                "sub_activity_id":checkListForm.subActivity.value  != '' ? checkListForm.subActivity.value : 0 ,
                "frequency_id":checkListForm.frequency.value,
                "task":taskDesc,
                "created_on":moment().format('YYYY-MM-DD HH:m:s'),
                "created_by":localStorage.getItem("empId")
             
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
      const handleCancel = () => {
        let From_key = [
          "activity",
          "subActivity",
          "department",
          "checkListCategory",
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
        checkListCategory: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        checkListName: {
          value: "",
          validation: [{ name: "required" },{name:"AllowNumeric"}],
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
          validation: [{ name: "required" },{name:"AllowNumeric"}],
          error: null,
          errmsg: null,
        }
      });
      
    useEffect(() => {
        dispatch(getDepartment());
        dispatch(getCheckListType());
        dispatch(getCheckListCategory());
        dispatch(getActivity());
        dispatch(getFrequency());
        dispatch(getCheckLists());
      }, []);
      const [activityList, setactivityList] = useState({})
  const [departmentList, setdepartmentList] = useState({})
  const [checkListType, setcheckListType] = useState({})
  const [checkListCtegory, setcheckListCtegory] = useState({})
  const [subActivity, setsubActivity] = useState({})
  const [frequencyList, setfrequencyList] = useState({})
  const [idDetails, setidDetails] = useState({})

  const [checkMasterListsData, setcheckMasterListsData] = useState([])
      useEffect(() => {
    
        let checkListsData = []
    props.getCheckListscreation.map((data) =>
    checkListsData.push(data)
    )
    var lists = [];

    for (var m = 0; m < checkListsData.length; m++) {
      var listarray = {
        department: checkListsData[m].department, 
        category: checkListsData[m].category, 
        listName: checkListsData[m].check_list,
         listType:checkListsData[m].check_list_type, 
        taskItem: checkListsData[m].task,
         activity: checkListsData[m].activity,
          subactivity: checkListsData[m].sub_activity,
           frequency: checkListsData[m].frequency
      }
      lists.push(listarray);
    }
    setcheckMasterListsData({ lists })

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
    
        let checkListcategorydata = []
        props.getCchecklistcategory.map((data) =>
        checkListcategorydata.push({
            value: data.status,
            id: data.status_id
          })
        ) 
        setcheckListCtegory({ checkListcategorydata })
    
    
    
    
    
      }, [props.getCchecklistcategory,props.getCchecklisttype,props.getFrequency,
        props.getActivity,props.getDepartment,props.getCheckListscreation
      ]);

      function checkValidation(data, key, multipleId) {
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

          if(data =='198' || data == '200'){
          checkListForm['activity'].disabled = true;
          checkListForm['activity'].validation =[];
          checkListForm['subActivity'].validation =[];
          checkListForm['subActivity'].disabled = true;
          }else{
            checkListForm['activity'].disabled = false;
            checkListForm['subActivity'].disabled = false;
            checkListForm['activity'].validation =[{ name: "required" }];
            checkListForm['subActivity'].validation =[{ name: "required" }];
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

    const headCells = [
        { id: "department", label: "Department" },
        { id: "category", label: "Category" },
        { id: "listName", label: "Check List Name" },
        { id: "listType", label: "Check List Type" },
        { id: "taskItem", label: "TaskItem" },
        { id: "activity", label: "Activity" },
        { id: "subactivity", label: "Sub Activity" },
        { id: "frequency", label: "Frequency" },
    ]

    const rows = [
        { department: "Research", category: "category1", listName: "listName1", listType: "simple", taskItem: "Book Hall", activity: "", subactivity: "", frequency: "" },
        { department: "", category: "", listName: "", listType: "simple", taskItem: "But Stationaries", activity: "", subactivity: "", frequency: "" },
        { department: "", category: "", listName: "", listType: "Task Linked", taskItem: "Documentaion", activity: "Activity", subactivity: "Sub Activity", frequency: "On Demand" },
        { department: "", category: "", listName: "", listType: "simple", taskItem: "Bio metric", activity: "", subactivity: "", frequency: "" },
        { department: "", category: "", listName: "", listType: "No Task Linked", taskItem: "Pay Electricaly bill", activity: "", subactivity: "", frequency: "Fortnightly" },
        { department: "", category: "", listName: "", listType: "Task linked", taskItem: "Monthly Report", activity: "Documentation", subactivity: "", frequency: "Monthly" },
    ]

    ///***********user permission**********/
    useEffect(() => {
        if(props.UserPermission && props.UserPermission.length>0&&props.UserPermission){
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
    
    
        // console.log(saveRights,"rights")
        
         
        
    function rightsNotification(){
        notification.success({
            message: "You are not Authorized. Please Contact Administrator",
        });
    }
    /////////////

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
                    <div>  <div className="TThead">Category</div>
                        <Labelbox type="select" 
                          dropdown={checkListCtegory.checkListcategorydata}
                          changeData={(data) => checkValidation(data, "checkListCategory")}
                          placeholder={"Check List category"}
                          value={checkListForm.checkListCategory.value}
                          error={checkListForm.checkListCategory.error}
                          errmsg={checkListForm.checkListCategory.errmsg} /></div>
                    <div>  <div className="TThead">Check List Name</div>
                        <Labelbox type="text" 
                        changeData={(data) => checkValidation(data, "checkListName")}
                        value={checkListForm.checkListName.value}
                error={checkListForm.checkListName.error}
                errmsg={checkListForm.checkListName.errmsg}
                        
                          /></div>
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
                        <Labelbox type="select"   dropdown={activityList.activityTypeData}
                         changeData={(data) => checkValidation(data, "activity")}
                         placeholder={"Activity"}
                         value={checkListForm.activity.value}
                         error={checkListForm.activity.error}
                         errmsg={checkListForm.activity.errmsg} 
                         disabled={checkListForm.activity.disabled}
                         /></div>
                </div>
                <div className="secondrowFields">
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
                    <div className="taskfield">  <div className="TThead">Task</div>
                        <Labelbox type="text" 
                        changeData={(data) => checkValidation(data, "task")}
                        value={checkListForm.task.value}
                error={checkListForm.task.error}
                errmsg={checkListForm.task.errmsg}
                        
                        /></div>
                    <div> 

<div className="checklistBtn">
           
           {/* <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary"  onBtnClick={onSubmit}/> */}
               <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary"  btnDisable={!addRights||addRights.display_control&&addRights.display_control==='N'?true:false} onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} onBtnClick={handleCancel} custombtnCSS="custombtn" />
            </div>
            </div>
            
                </div>

            </div>
            <EnhancedTable
                headCells={headCells}
                rows={checkMasterListsData.length == 0 ? checkMasterListsData : checkMasterListsData.lists}
                aligncss="aligncss"
            />
           
        </div>
    )
}

const mapStateToProps = (state) =>
    ({
        getCchecklistcategory: state.getOptions.getCchecklistcategory || [],
getCchecklisttype: state.getOptions.getCchecklisttype || [],
getFrequency: state.getOptions.getFrequency || [],
getActivity: state.getOptions.getActivity || [],
getDepartment: state.getOptions.getDepartment || [],
getCheckListscreation : state.CheckListReducer.getCheckListscreation || [],
    });
export default connect(mapStateToProps) (CheckListCreation);

