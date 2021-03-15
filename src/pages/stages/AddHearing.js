import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import EditTimeSheet from './Timesheet/Timesheet'
import TimeSheetApproval from './Timesheet/TimesheetTable'
export default function AddHearing(){
   const [AddHearing, setAddHearing] = useState({
      project_name: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      project_type: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      client: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      court_case_no: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      internal_case_no: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      hearing_date: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      next_hearing_date: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      hearing_outcome: {
         value: "",
         validation: [{ "name": "required" }],
         error: null,
         errmsg: null,
     },
  })
  const  onSubmit=()=>{
   var mainvalue = {};
   var targetkeys = Object.keys(AddHearing);
   for (var i in targetkeys) {
       var errorcheck = ValidationLibrary.checkValidation(
         AddHearing[targetkeys[i]].value,
         AddHearing[targetkeys[i]].validation
       );
       AddHearing[targetkeys[i]].error = !errorcheck.state;
       AddHearing[targetkeys[i]].errmsg = errorcheck.msg;
       mainvalue[targetkeys[i]] = AddHearing[targetkeys[i]].value;
   }
   var filtererr = targetkeys.filter(
       (obj) => AddHearing[obj].error == true
   );
   console.log(filtererr.length);
   if (filtererr.length > 0) {
       // setResumeFrom({ error: true });
      
   } else {
       // setResumeFrom({ error: false });
      
   } 
   setAddHearing(prevState => ({
       ...prevState
   }));


};
function checkValidation(data, key, multipleId) {
   var errorcheck = ValidationLibrary.checkValidation(
       data,
       AddHearing[key].validation
   );
   let dynObj = {
       value: data,
       error: !errorcheck.state,
       errmsg: errorcheck.msg,
       validation: AddHearing[key].validation
   }
   let multipleIdList = []

 
   setAddHearing(prevState => ({
       ...prevState,
       [key]: dynObj,

   }));
}
const handleCancel = () =>{
   let From_key = [
   ]

   From_key.map((data)=>{
      AddHearing[data].value = ""
   })
   setAddHearing(prevState => ({
       ...prevState,
   }));
}
// timesheet modal
const [OpenSheet,setOpenSheet]=useState(false)
const [Ts_approval,setTs_approval]=useState(false)
const handleChangeModel=()=>{
    setOpenSheet(true)
}
  return(
      <div>
           <div className="var_rate_master">Hearing</div>
          <Grid container spacing={3} className="hearingmaster_firstgrid">
          <Grid item xs={3} spacing={1} direction={"column"}>
             <Labelbox type="text" placeholder={"Project Name"}
              changeData={(data) => checkValidation(data, "project_name")}
              value={AddHearing.project_name.value}
              error={AddHearing.project_name.error}
              errmsg={AddHearing.project_name.errmsg}
             />
             <Labelbox type="select" placeholder={"Internal case No"}
             changeData={(data) => checkValidation(data, "internal_case_no")}
             value={AddHearing.internal_case_no.value}
             error={AddHearing.internal_case_no.error}
             errmsg={AddHearing.internal_case_no.errmsg}
             />
          </Grid>
          <Grid  item xs={3} spacing={1}>
             {/* <Labelbox type="type" placeholder={"Project Type"}
             changeData={(data) => checkValidation(data, "project_type")}
             value={AddHearing.project_type.value}
             error={AddHearing.project_type.error}
             errmsg={AddHearing.project_type.errmsg}
             /> */}
                <Labelbox type="type" placeholder={"Project Type"}
               changeData={(data) => checkValidation(data, "project_type")}
               value={AddHearing.project_type.value}
               error={AddHearing.project_type.error}
               errmsg={AddHearing.project_type.errmsg}
             />
              
             <Labelbox type="datepicker" placeholder={"Hearing Date"}
               changeData={(data) => checkValidation(data, "hearing_date")}
               value={AddHearing.hearing_date.value}
               error={AddHearing.hearing_date.error}
               errmsg={AddHearing.hearing_date.errmsg}
             />
              

          </Grid>
          <Grid  item xs={3} spacing={1}>
            <Labelbox type="text" placeholder={"Client"}
               changeData={(data) => checkValidation(data, "client")}
               value={AddHearing.client.value}
               error={AddHearing.client.error}
               errmsg={AddHearing.client.errmsg}
            />
             <Labelbox type="datepicker" placeholder={"Next Hearing Date"}
              changeData={(data) => checkValidation(data, "next_hearing_date")}
              value={AddHearing.next_hearing_date.value}
              error={AddHearing.next_hearing_date.error}
              errmsg={AddHearing.next_hearing_date.errmsg}
             />
          </Grid>
          <Grid  item xs={3} spacing={1}>
          <Labelbox type="select" placeholder={"Court case No"}
                 changeData={(data) => checkValidation(data, "court_case_no")}
                 value={AddHearing.court_case_no.value}
                 error={AddHearing.court_case_no.error}
                 errmsg={AddHearing.court_case_no.errmsg}
          />

          </Grid>  
          <Grid  item xs={6} spacing={1} className="hearing_outcome">
             <Labelbox type="textarea" placeholder={"Hearing Outcome"}
               changeData={(data) => checkValidation(data, "hearing_outcome")}
               value={AddHearing.hearing_outcome.value}
               error={AddHearing.hearing_outcome.error}
               errmsg={AddHearing.hearing_outcome.errmsg}
        />
            
          </Grid>   
          <Grid  item xs={6}></Grid>
          <Grid  item xs={6}>
             <CustomButton btnName={"Create Task"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task"/>
             <CustomButton btnName={"Adjournment"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task"/>
          </Grid>
          <Grid  item xs={10} spacing={4} alignItems={"flex-end"}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          <Grid  item xs={12} className="hearing_div">
               <div className="var_rate_master">Adjournment</div>
               
                <div className="ad_journment"><Labelbox type="select" placeholder={"Adjournment token by"}/></div>
              
                <div className="reson_hearing"><Labelbox type="textarea" placeholder={"Hearing Outcome"}/></div>
                <div className="add_hearing_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
                </div>
          </Grid>
       
          </Grid>

        <button onClick={() => setOpenSheet(true)}>
            TimeSheet
        </button>
        <button onClick={() => setTs_approval(true)}>
            TimeSheet1
        </button>
        <DynModel modelTitle={"Edit TimeSheet"} handleChangeModel={OpenSheet} handleChangeCloseModel={(bln) => setOpenSheet(bln)}  content={<EditTimeSheet />} />
        <DynModel modelTitle={"TimeSheet"} handleChangeModel={Ts_approval} handleChangeCloseModel={(bln) => setTs_approval(bln)} width={1100} content={<TimeSheetApproval />} />
         
      </div>
  )
}