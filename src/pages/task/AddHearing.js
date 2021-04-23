import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import EditTimeSheet from './Timesheet/Timesheet'
import Adjournment from './Adjournment'
export default function Hearing(){
 
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const handleChangeModel=()=>{
    setOpenSheet(true)
}
const [adjourn,setadjourn]=useState(false)
const Adjourn_Model=()=>{
    setadjourn(true)
}
  return(
      <div>
           <div className="var_rate_master">Hearing</div>
           <div className="hearing_sh_table">
            <div><div>Project Name</div><div>Client Name</div></div>
            <div><div>Client Name</div><div> Name1</div></div>
            <div><div>Project Type</div><div>IP Project</div></div>
            <div><div>Project Sub Type</div><div>Trade Mark</div></div>
            <div><div>Process Type</div><div>Opposition</div></div>
        </div>
            <div className="ad_journment"><Labelbox type="datepicker" placeholder={"Next Hearing Date"}/></div>
              
              <div className="reson_hearing"><Labelbox type="textarea" placeholder={"Hearing Outcome"}/></div>
          
             <div className="cre_buttons_div"><CustomButton btnName={"Create Task"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task"/>
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