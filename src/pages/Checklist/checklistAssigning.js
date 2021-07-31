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
import {getCheckListsNames,insert_check_list_assign,getDaysOfWeek,get_projType_subProjType_by_projId
} from "../../actions/CheckListAction";
import { getEmployeeList,getProjectType,getFrequency,getProjectName  } from "../../actions/MasterDropdowns";
  import ValidationLibrary from "../../helpers/validationfunction";
function CheckListAssign(props) {
    const [saveRights, setSaveRights] = useState([])
    const dispatch = useDispatch();                  
    
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
        disabled: false
      },
      subProjectId: {
        value: "",
        validation: [],
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
        disabled: false
      },
      frequency: {
        value: "",
        valueById: "",
        validation: [],
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
      dispatch(getFrequency());
      dispatch(getProjectName());
    }, []);

    const handleCancel = () => {
        let From_key = [
          "checkListNameId",
          "employeeId",
          "project_type_id",
          "subProjectId",
          "startDate",
          "endDate","noOfDaysWeeks"
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
          var data = {
            "check_list_id":checkListForm.checkListNameId.value,
            "emp_id":checkListForm.employeeId.value == '' ? 0 : checkListForm.employeeId.value,
            "project_id":checkListForm.projectname.value == '' ? 0 : checkListForm.projectname.value,
            "project_type_id":checkListForm.project_type_id.value == '' ? 0 : checkListForm.project_type_id.value,
            "project_sub_type_id":(!checkListForm.subProjectId.value||checkListForm.subProjectId.value === "") ? 0 : checkListForm.subProjectId.value ,
            "start_date":checkListForm.startDate.value===""?'0000-00-00':checkListForm.startDate.value,
            "end_date":checkListForm.endDate.value,
            "days_of_week_id" :checkListForm.noOfDaysWeeks.valueById===""?"0":checkListForm.noOfDaysWeeks.valueById,
            "created_on":moment().format('YYYY-MM-DD HH:m:s'),
            "created_by":localStorage.getItem("empId")

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
          //checkListForm['employeeId'].disabled = false;
          for(var i=0; i< props.getCheckListsNames.length; i++){
           
            if(data  == props.getCheckListsNames[i].check_list_id){
             checkListForm.frequency.value=props.getCheckListsNames[i].frequency_id
             checkListForm.frequency.disabled = true;
           
             if(props.getCheckListsNames[i].frequency==='On Demand'||props.getCheckListsNames[i].frequency==='Daily'){
             divShow.start_month=false
             divShow.end_date=false
             divShow.days_of_week=false
             checkListForm.startDate.validation =[]
             checkListForm.endDate.validation =[]
             checkListForm.noOfDaysWeeks.validation =[]

             checkListForm.startDate.errmsg=null
             checkListForm.endDate.errmsg=null
             checkListForm.noOfDaysWeeks.errmsg=null
             checkListForm.startDate.error=false
             checkListForm.endDate.error=false
             checkListForm.noOfDaysWeeks.error=false
            }else if(props.getCheckListsNames[i].frequency==='Alternate Days'||props.getCheckListsNames[i].frequency==='Weekly'){
              divShow.days_of_week=true
              divShow.start_month=false
              divShow.end_date=false
              checkListForm.startDate.validation =[]
              checkListForm.endDate.validation =[]
              checkListForm.noOfDaysWeeks.validation = [{ name: "required" }]

              checkListForm.startDate.errmsg=null
              checkListForm.endDate.errmsg=null
              checkListForm.startDate.error=false
              checkListForm.endDate.error=false
            }else if(props.getCheckListsNames[i].frequency==='Fortnightly'||props.getCheckListsNames[i].frequency==='Monthly'){
              divShow.start_month=false
              divShow.days_of_week=false
              divShow.end_date=true
              checkListForm.startDate.validation =[]
              checkListForm.noOfDaysWeeks.validation =[]
              checkListForm.endDate.validation = [{ name: "required" }]

              checkListForm.startDate.errmsg=null
              checkListForm.noOfDaysWeeks.errmsg=null
              checkListForm.startDate.error=false
              checkListForm.noOfDaysWeeks.error=false
            }else if(props.getCheckListsNames[i].frequency==='Alternate Month'||props.getCheckListsNames[i].frequency==='Quarterly'
            ||props.getCheckListsNames[i].frequency==='Half Yearly'||props.getCheckListsNames[i].frequency==='Annual'){
              divShow.start_month=true
              divShow.end_date=true
              divShow.days_of_week=false
              checkListForm.noOfDaysWeeks.validation =[]
              checkListForm.endDate.validation =[{ name: "required" }]
              checkListForm.startDate.validation = [{ name: "required" }]
              checkListForm.noOfDaysWeeks.errmsg=null
              checkListForm.noOfDaysWeeks.error=false
              
            }
     
            setdivShow((prevState) => ({
              ...prevState,
          }));
          }
        }
          
        }
        if (data && key == "employeeId") {
          checkListForm['project_type_id'].disabled = true;
          checkListForm['subProjectId'].disabled = true;
          checkListForm['project_type_id'].validation =[];
          checkListForm['subProjectId'].validation =[];
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
     
useEffect(()=>{

  if (checkListForm.project_type_id.value!='') {
       var data=checkListForm.project_type_id.value   
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
      if(response && response.data && response.data.data.length ==0){
        checkListForm['subProjectId'].validation =[]; 
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
},[checkListForm.project_type_id.value])  


const [projectTypeList, setprojectTypeList] = useState({})
const [projectSubTypeList, setprojectSubTypeList] = useState({})
const [employeeList, setemployeeList] = useState({}) 
const [daysOfWeeksLists, setdaysOfWeeksLists] = useState({})
const [projectName, setProjectName] = useState({});
const [frequencyList, setfrequencyList] = useState({})
const [divShow, setdivShow] = useState({
  start_month:false,
  end_date:false,
  days_of_week:false
})
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


  let frequencyTypeData = []
  props.getFrequency.map((data) =>
  frequencyTypeData.push({
      value: data.status,
      id: data.status_id
    })
  )
  setfrequencyList({ frequencyTypeData })

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

}, [props.getProjectType,props.getEmployeeList,props.getCheckListsNames,props.getDaysofWeeks,props.getFrequency,props.ProjectName]);

useEffect(() => {
  if(props.get_projType_subProjType_by_projId.length>0&&props.get_projType_subProjType_by_projId){
    checkListForm.project_type_id.value=props.get_projType_subProjType_by_projId[0].project_type_id
    checkListForm.subProjectId.value=props.get_projType_subProjType_by_projId[0].sub_project_type_id
    setcheckListForm(prevState => ({
      ...prevState
    }));
 }

 }, [props.get_projType_subProjType_by_projId]);

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
  
  console.log(divShow,"divShow")
  

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
                        disabled={checkListForm.project_type_id.disabled}></Labelbox>

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
                    {checkListForm.checkListNameId.value!=''&&<>
                    <Grid item xs={3} container direction="column">
                    <div className="TThead">Frequency</div>
                        <Labelbox type="select" 
                          dropdown={frequencyList.frequencyTypeData}
                          changeData={(data) => checkValidation(data, "frequency")}
                          placeholder={"Frequency"}
                          value={checkListForm.frequency.value}
                          error={checkListForm.frequency.error}
                          errmsg={checkListForm.frequency.errmsg} 
                          disabled={checkListForm.frequency.disabled}
                          ></Labelbox>
                    </Grid>

                    <Grid item xs={2} container direction="column">
                        <div className="TThead">Start Month</div>
                        <Labelbox type="datepicker"
                          view={["month"]}
                         changeData={(data) => checkValidation(data, "startDate")}
                         placeholder={"Start date "}
                         value={checkListForm.startDate.value}
                         error={checkListForm.startDate.error}
                         errmsg={checkListForm.startDate.errmsg}
                         disabled={!divShow.start_month}
                         >
                         </Labelbox>

                    </Grid> 

                    <Grid item xs={2} container direction="column">
                        <div className="TThead"> Date</div>
                        <Labelbox type="datepicker"
                          view={["date"]}
                        changeData={(data) => checkValidation(data, "endDate")}
                        placeholder={"Date "}
                        value={checkListForm.endDate.value}
                        error={checkListForm.endDate.error}
                        errmsg={checkListForm.endDate.errmsg}
                        disabled={!divShow.end_date}
                        ></Labelbox>
                    </Grid>

                    <Grid item xs={2} container direction="column">
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
                  </Grid>
                  </>}

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
        getFrequency: state.getOptions.getFrequency || [],
        ProjectName: state.getOptions.getProjectName||[],
        get_projType_subProjType_by_projId : state.CheckListReducer.get_projType_subProjType_by_projId || [], 
    });
export default connect(mapStateToProps) (CheckListAssign);
