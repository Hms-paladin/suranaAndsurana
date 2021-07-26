import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import EditTimeSheet from './Timesheet/Timesheet'
import Adjournment from './Adjournment'
import ProjectTaskModel from '../Project IP1/ProjectTaskModel/projecttaskModel';
import { getHearingDetails,InsertHearingDets,inserTask } from "../../actions/projectTaskAction";
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";
import { useDispatch, connect } from "react-redux";
import moment from 'moment'
export function Hearing(props){
  const dispatch = useDispatch();
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const handleChangeModel=()=>{
    setOpenSheet(true)
}
const [projectDetails, setProjectDetails] = useState({})
const [taskDetails, settaskDetails] = useState({})
const [adjourn,setadjourn]=useState(false)
const [modelOpen,setModelOpen]=useState(false)
const [idDetails, setidDetails] = useState({})
const modelContent = () => {
  return (
      <ProjectTaskModel />
  )
}
const Adjourn_Model=()=>{
    setadjourn(true)
}
const openTaskModel=()=>{
  setModelOpen(true)
}

useEffect(() => {
  if(props.rowData){
    dispatch(getProjectDetails(props.rowData.data.project_id))
  dispatch(getHearingDetails(props.rowData.data));
  }

}, []);

useEffect(() => {
  setProjectDetails(props.ProjectDetails);
  props.ProjectDetails.length > 0 && setidDetails({
    project_id: props.ProjectDetails[0].project_id,
    client_id: props.ProjectDetails[0].client_id,
  })
  settaskDetails(props.rowData.data)
if(props.getHearingDets && props.getHearingDets.length >0){
  HearingData.nexthearing.value =props.getHearingDets[0].next_hearing_date;
  HearingData.hearingoutcome.value =props.getHearingDets[0].hearing_outcome;
  HearingData.hearing_id.value =props.getHearingDets[0].hearing_id;
}

}, [props.rowData,props.getHearingDets,props.ProjectDetails
]);
const [HearingData, setHearingData] = useState({
  hearing_id: {
    value: 0,
    error: null,
    errmsg: null,
    disabled: false,

},
    nexthearing: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    hearingoutcome: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
})
function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(HearingData);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        HearingData[targetkeys[i]].value,
        HearingData[targetkeys[i]].validation
      );
      HearingData[targetkeys[i]].error = !errorcheck.state;
      HearingData[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = HearingData[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => HearingData[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else {
      
    }
    var data ={
      "project_id":props.rowData.data.project_id,
      "task_id":props.rowData.data.task_id,
      "hearing_outcome":HearingData.hearingoutcome.value,
      "hearing_date":HearingData.nexthearing.value,
      "next_hearing_date":HearingData.nexthearing.value,
      "adjournment_taken_by":"1",
      "created_on":moment().format('YYYY-MM-DD HH:m:s'),
      "created_by":localStorage.getItem("empId"),
      "reason":"",
      "active_status":"1"
      }
      if (HearingData.hearing_id.value != 0) {
        data["hearing_id"] = HearingData.hearing_id.value;

    }else{
      data["hearing_id"] = 0;
    }
    dispatch(InsertHearingDets(data)).then((response) => {
      handleCancel();
    }) 
/*
    var data = {
      "project_id": idDetails.project_id,
      "activiity_id": taskDetails.activiity_id,
      "sub_activity_id": taskDetails.sub_activity_id,
      "assignee_id": localStorage.getItem("empId"),
      "start_date": HearingData.nexthearing.value ,
      "end_date": HearingData.nexthearing.value,
      "assigned_by": localStorage.getItem("empId"),
      "priority": '',
      "description": HearingData.hearingoutcome.value,
      "tag": ''
    }

    dispatch(inserTask(data)).then((response) => {
      handleCancel();
    })
*/
    setHearingData((prevState) => ({
      ...prevState,
    }));
  }

  const handleCancel = () => {
    let HearingData = [];
    HearingData.map((data) => {
        HearingData[data].value = "";
    });
    setHearingData((prevState) => ({
      ...prevState,
    }));
  };
 
  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      HearingData[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: HearingData[key].validation,
    };   
    setHearingData((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

  return(
      <div>
           <div className="var_rate_master">Hearing</div>
           <div className="hearing_sh_table">
            <div><div>Project Name</div><div>{props.rowData.data.project_name}</div></div>
            <div><div>Client Name</div><div> {props.rowData.data.client}</div></div>
            <div><div>Project Type</div><div></div>{props.rowData.data.project_type}</div>
            <div><div>Project Sub Type</div><div>{props.rowData.data.project_type}</div></div>
            <div><div>Process Type</div><div>{props.rowData.data.project_type}</div></div>
        </div>
            <div className="ad_journment"><Labelbox type="datepicker" placeholder={"Next Hearing Date"}
             changeData={(data) => checkValidation(data, "nexthearing")}
             value={HearingData.nexthearing.value}
             error={HearingData.nexthearing.error}
             errmsg={HearingData.nexthearing.errmsg}
            /></div>
              
              <div className="reson_hearing"><Labelbox type="textarea" placeholder={"Hearing Outcome"}
              changeData={(data) => checkValidation(data, "hearingoutcome")}
              value={HearingData.hearingoutcome.value}
              error={HearingData.hearingoutcome.error}
              errmsg={HearingData.hearingoutcome.errmsg}
              />
              </div>
              <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
             <div className="cre_buttons_div">
             <CustomButton btnName={"Adjournment"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task" onBtnClick={Adjourn_Model}/>
             </div>
             <div>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"  onBtnClick={handleCancel} />
            </div>  
        
       
        
    <DynModel modelTitle={"Adjournment"} handleChangeModel={adjourn} handleChangeCloseModel={(bln) => setadjourn(bln)}  content={<Adjournment />} />

      </div>
  )
}
const mapStateToProps = (state) =>
({
    getHearingDets: state.projectTasksReducer.getHearingDets,
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});
export default connect(mapStateToProps)(Hearing);