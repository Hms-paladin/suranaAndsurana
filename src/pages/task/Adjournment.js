import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import EditTimeSheet from './Timesheet/Timesheet'
import TimeSheetApproval from './Timesheet/TimesheetTable'
import { getAdjournTakenBy } from "../../actions/projectTaskAction";
import { useDispatch, connect } from "react-redux";
import {InsertHearingAdjourn } from "../../actions/projectTaskAction";

function Adjournment(props){
    const dispatch = useDispatch();
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const [AdjournTakenBy,setAdjournTakenBy]=useState({})
const handleChangeModel=()=>{
    setOpenSheet(true)
}
const [adjourn,setadjourn]=useState(false)
const Adjourn_Model=()=>{
    setadjourn(true)
}

const [AdjournData, setAdjournData] = useState({

    reason: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      adjournment_taken_by: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },

  })
const onSubmit=()=>{

    var mainvalue = {};
    var targetkeys = Object.keys(AdjournData);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        AdjournData[targetkeys[i]].value,
        AdjournData[targetkeys[i]].validation
      );
      AdjournData[targetkeys[i]].error = !errorcheck.state;
      AdjournData[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = AdjournData[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => AdjournData[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else {
        // AdjournData.hearing_id.value=2
        // dispatch(getAdjournTakenBy(AdjournData))
    props.setadjournDetails(AdjournData)
    }
    setAdjournData((prevState) => ({
        ...prevState,
      }));
}



  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      AdjournData[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: AdjournData[key].validation,
    };   
    setAdjournData((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }
useEffect(() => {
    dispatch(getAdjournTakenBy())
  }, []);

useEffect(() => {
    let projectTypedata = []
    props.getAdjournTakenBy.map((data) =>
      projectTypedata.push({ value: data.status, id: data.status_id })
    )
    setAdjournTakenBy({ projectTypedata })
  }, [props.getAdjournTakenBy ]);
  return(
      <div>
           <div className="var_rate_master">Adjournment</div>
        
            <div style={{width:"50%"}}>
                <Labelbox type="select" 
                    dropdown={AdjournTakenBy.projectTypedata}
                    placeholder={"Adjournment taken by"}
                    changeData={(data) => checkValidation(data, "adjournment_taken_by")}
                    value={AdjournData.adjournment_taken_by.value}
                    error={AdjournData.adjournment_taken_by.error}
                    errmsg={AdjournData.adjournment_taken_by.errmsg}
                /></div>
              
              <div className="adjorn_hearing">
                  <Labelbox type="textarea" 
                  placeholder={"Reason"}
                  changeData={(data) => checkValidation(data, "reason")}
                  value={AdjournData.reason.value}
                  error={AdjournData.reason.error}
                  errmsg={AdjournData.reason.errmsg}
                  />
                  </div>
             <div style={{textAlign:"end"}}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={props.closeModel}/>
            </div>  
        
       
        
      </div>
  )
}
const mapStateToProps = (state) =>
({
    getAdjournTakenBy: state.projectTasksReducer.getAdjournTakenBy,
});
export default connect(mapStateToProps)(Adjournment);