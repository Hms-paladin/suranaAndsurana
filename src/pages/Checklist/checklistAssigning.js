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
import {getCheckListsNames,insert_check_list_assign,getDaysOfWeek
} from "../../actions/CheckListAction";
import {
    getEmployeeList,getProjectType
  } from "../../actions/MasterDropdowns";
  import ValidationLibrary from "../../helpers/validationfunction";
function CheckListAssign(props) {
    const [saveRights, setSaveRights] = useState([])
    const dispatch = useDispatch();                  
    
    const handleCancel = () => {
        let From_key = [
          "checkListNameId",
          "employeeId",
          "projectId",
          "subProjectId",
          "startDate",
          "endDate","noOfDaysWeeks"
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
          // setInsertTaskForm({ error: false });
          var data = {
            "check_list_id":checkListForm.checkListNameId.value,
            "emp_id":checkListForm.employeeId.value == '' ? 0 : checkListForm.employeeId.value,
            "project_type_id":checkListForm.projectId.value == '' ? 0 : checkListForm.projectId.value,
            "project_sub_type_id":checkListForm.subProjectId.value == '' ? 0 : checkListForm.subProjectId.value ,
            "start_date":checkListForm.startDate.value,
            "end_date":checkListForm.endDate.value,
            "days_of_week_id" :checkListForm.noOfDaysWeeks.valueById,
            "created_on":moment().format('YYYY-MM-DD HH:m:s'),
            "created_by":localStorage.getItem("empId")
             
          }
    
          dispatch(insert_check_list_assign(data)).then((response) => {
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
        if (data && key == "employeeId") {
          checkListForm['projectId'].disabled = true;
          checkListForm['subProjectId'].disabled = true;
          checkListForm['projectId'].validation =[];
          checkListForm['subProjectId'].validation =[];
        }
       
        if (data && key == "projectId") {
          checkListForm['employeeId'].disabled = true;
          checkListForm['employeeId'].validation =[];
          Axios({
            method: "POST",
            url: apiurl + "get_project_sub_type",
            data: {
                project_type_id: data,
            },
          }).then((response) => {
            let projectSuTypeData= [];
            response.data.data.map((data) =>
            projectSuTypeData.push({
                value: data.sub_project_type,
                id: data.sub_project_type_id,
              })
            );
            setprojectSubTypeList({ projectSuTypeData });  
          });
        }
        setcheckListForm((prevState) => ({
          ...prevState,
          [key]: dynObj,
        }));
      }
     
    const [checkListForm, setcheckListForm] = useState({
        checkListNameId: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        employeeId: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
          disabled: false
        },
        projectId: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
          disabled: false
        },
        subProjectId: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
          disabled: false
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
        noOfDaysWeeks: {
          value: "",
          valueById: "",
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
      }, []);


const [projectTypeList, setprojectTypeList] = useState({})
const [projectSubTypeList, setprojectSubTypeList] = useState({})
const [employeeList, setemployeeList] = useState({}) 
const [daysOfWeeksLists, setdaysOfWeeksLists] = useState({})
const [checkListNames, setcheckListNames] = useState({})
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

  //daysOfWeeksLists.daysofWeeksData

}, [props.getProjectType,props.getEmployeeList,props.getCheckListsNames,props.getDaysofWeeks
]);

    ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "Check List Assigning" == val.control 
       ) 
      })
      setSaveRights(data_res_id)
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
                        <div className="TThead">Project Type</div>
                        <Labelbox type="select"
                        dropdown={projectTypeList.projectTypeData}
                        changeData={(data) => checkValidation(data, "projectId")}
                        placeholder={"Project "}
                        value={checkListForm.projectId.value}
                        error={checkListForm.projectId.error}
                        errmsg={checkListForm.projectId.errmsg}
                        disabled={checkListForm.projectId.disabled}></Labelbox>

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
                        disabled={checkListForm.subProjectId.disabled}
                        ></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Start Date</div>
                        <Labelbox type="datepicker"
                         changeData={(data) => checkValidation(data, "startDate")}
                         placeholder={"Start date "}
                         value={checkListForm.startDate.value}
                         error={checkListForm.startDate.error}
                         errmsg={checkListForm.startDate.errmsg}></Labelbox>

                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">End Date</div>
                        <Labelbox type="datepicker"
                        changeData={(data) => checkValidation(data, "endDate")}
                        placeholder={"End date "}
                        value={checkListForm.endDate.value}
                        error={checkListForm.endDate.error}
                        errmsg={checkListForm.endDate.errmsg}
                        
                        ></Labelbox>
                    </Grid>

                    <Grid item xs={3} container direction="column">
                    <div className="TThead">Days of Week</div>
                <Labelbox
                  type="select"
                  mode={"multiple"}
                  placeholder={"Days of Week"}
                  dropdown={daysOfWeeksLists.daysofWeeksData}
                  changeData={(data) =>
                    checkValidation(data, "noOfDaysWeeks", daysOfWeeksLists.daysofWeeksData)
                  }
                  value={checkListForm.noOfDaysWeeks.value}
                  error={checkListForm.noOfDaysWeeks.error}
                  errmsg={checkListForm.noOfDaysWeeks.errmsg}
                />
              </Grid>

                </Grid>

                <div className="checklistAssignBtn">
                    <CustomButton btnName={"Save"} custombtnCSS="custombtn" btnCustomColor="customPrimary" btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} onBtnClick={onSubmit}/>
                    <CustomButton btnName={"Cancel"} onBtnClick={handleCancel} custombtnCSS="custombtn" />
                </div>

            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
        getProjectType : state.getOptions.getProjectType || [],
        getEmployeeList : state.getOptions.getEmployeeList || [],
        getCheckListsNames : state.CheckListReducer.getCheckListsNames || [],
        getDaysofWeeks: state.CheckListReducer.getDaysofWeeks || [],
    });
export default connect(mapStateToProps) (CheckListAssign);
