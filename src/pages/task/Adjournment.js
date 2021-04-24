import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import EditTimeSheet from './Timesheet/Timesheet'
import TimeSheetApproval from './Timesheet/TimesheetTable'
export default function Adjournment(){
 
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const [Ts_approval,setTs_approval]=useState(false)
const handleChangeModel=()=>{
    setOpenSheet(true)
}
const [adjourn,setadjourn]=useState(false)
const Adjourn_Model=()=>{
    setadjourn(true)
}
  return(
      <div>
           <div className="var_rate_master">Adjournment</div>
        
            <div style={{width:"50%"}}><Labelbox type="select" placeholder={"Adjournment taken by"}/></div>
              
              <div className="adjorn_hearing"><Labelbox type="textarea" placeholder={"Reason"}/></div>
             <div style={{textAlign:"end"}}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
            </div>  
        
       
        
      </div>
  )
}