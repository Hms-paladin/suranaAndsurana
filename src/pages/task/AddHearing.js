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
import { getHearingDetails,InsertHearingDets } from "../../actions/projectTaskAction";

import { useDispatch, connect } from "react-redux";
export function Hearing(props){
  const dispatch = useDispatch();
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const handleChangeModel=()=>{
    setOpenSheet(true)
}
const [adjourn,setadjourn]=useState(false)
const [modelOpen,setModelOpen]=useState(false)
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
  dispatch(getHearingDetails(props.rowData));
  }

}, []);

useEffect(() => {
       
  
}, [props.rowData,props.getHearingDets
]);
const [HearingData, setHearingData] = useState({
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
      // setResumeFrom({ error: false });

    //   dispatch(InsertLitigationDetails(HearingData, LitiID)).then(() => {
    //     handleCancel();
    //     props.handleChangeCloseModel();
    //     dispatch(GetLitigation(projtId));
    //   });
    }
    var data ={
      "project_id":props.rowData.project_id,
      "task_id":props.rowData.task_id,
      "hearing_outcome":"test",
      "hearing_date":"2020-03-17",
      "next_hearing_date":"0",
      "adjournment_taken_by":"1",
      "created_on":"2021-03-21",
      "created_by":"4", 
      "reason":"hello",
      "hearing_id":"8",
      "active_status":"1"
      }
    dispatch(InsertHearingDets(data)).then((response) => {
      handleCancel();
    })
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
            <div><div>Project Name</div><div>{props.rowData.project_name}</div></div>
            <div><div>Client Name</div><div> {props.rowData.client}</div></div>
            <div><div>Project Type</div><div></div>{props.rowData.project_type}</div>
            <div><div>Project Sub Type</div><div>{props.rowData.project_type}</div></div>
            <div><div>Process Type</div><div>{props.rowData.project_type}</div></div>
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
             <div className="cre_buttons_div"><CustomButton btnName={"Create Task"} btnCustomColor="customPrimary" onBtnClick={openTaskModel} custombtnCSS="cus_create_task"/>
             <CustomButton btnName={"Adjournment"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task" onBtnClick={Adjourn_Model}/>
             </div>
             <div>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
            </div>  
        
       
        
    <DynModel modelTitle={"Adjournment"} handleChangeModel={adjourn} handleChangeCloseModel={(bln) => setadjourn(bln)}  content={<Adjournment />} />

      </div>
  )
}
const mapStateToProps = (state) =>
({
    getHearingDets: state.projectTasksReducer.getHearingDets,
});
export default connect(mapStateToProps)(Hearing);