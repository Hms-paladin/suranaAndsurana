import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import ValidationLibrary from "../../helpers/validationfunction";
import './RateMaster.scss'
export default function RateMaster(){
   const [RateMaster, setRateMaster] = useState({
      table_name: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      activity: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      lower_limit: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      designation: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      range_project_cost: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      sub_activity: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      upper_limit: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      amount: {
         value: "",
         validation: [{ "name": "required" }],
         error: null,
         errmsg: null,
     },
     court: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
  },
  unit_measurement: {
   value: "",
   validation: [{ "name": "required" }],
   error: null,
   errmsg: null,
},
  })
  const  onSubmit=()=>{
   var mainvalue = {};
   var targetkeys = Object.keys(RateMaster);
   for (var i in targetkeys) {
       var errorcheck = ValidationLibrary.checkValidation(
         RateMaster[targetkeys[i]].value,
         RateMaster[targetkeys[i]].validation
       );
       RateMaster[targetkeys[i]].error = !errorcheck.state;
       RateMaster[targetkeys[i]].errmsg = errorcheck.msg;
       mainvalue[targetkeys[i]] = RateMaster[targetkeys[i]].value;
   }
   var filtererr = targetkeys.filter(
       (obj) => RateMaster[obj].error == true
   );
   console.log(filtererr.length);
   if (filtererr.length > 0) {
       // setResumeFrom({ error: true });
      
   } else {
       // setResumeFrom({ error: false });
      
   } 
   setRateMaster(prevState => ({
       ...prevState
   }));


};
function checkValidation(data, key, multipleId) {
   var errorcheck = ValidationLibrary.checkValidation(
       data,
       RateMaster[key].validation
   );
   let dynObj = {
       value: data,
       error: !errorcheck.state,
       errmsg: errorcheck.msg,
       validation: RateMaster[key].validation
   }
   let multipleIdList = []

 
   setRateMaster(prevState => ({
       ...prevState,
       [key]: dynObj,

   }));
}
const handleCancel = () =>{
   let From_key = [
   ]

   From_key.map((data)=>{
      RateMaster[data].value = ""
   })
   setRateMaster(prevState => ({
       ...prevState,
   }));
}
  return(
      <div>
           <div className="var_rate_master">Variable Rate Master</div>
          <Grid container spacing={6} className="ratemaster_firstgrid">
          <Grid item xs={4} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Table Name"}
              changeData={(data) => checkValidation(data, "table_name")}
              value={RateMaster.table_name.value}
              error={RateMaster.table_name.error}
              errmsg={RateMaster.table_name.errmsg}
             />
             <Labelbox type="select" placeholder={"Activity"}
              changeData={(data) => checkValidation(data, "activity")}
              value={RateMaster.activity.value}
              error={RateMaster.activity.error}
              errmsg={RateMaster.activity.errmsg}
             />
             <Labelbox type="text" placeholder={"Lower Limit"}
             changeData={(data) => checkValidation(data, "lower_limit")}
             value={RateMaster.lower_limit.value}
             error={RateMaster.lower_limit.error}
             errmsg={RateMaster.lower_limit.errmsg}
             />
             <Labelbox type="text" placeholder={"Designation"}
              changeData={(data) => checkValidation(data, "designation")}
              value={RateMaster.designation.value}
              error={RateMaster.designation.error}
              errmsg={RateMaster.designation.errmsg}
             />
          </Grid>
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Range of project cost "}
                 changeData={(data) => checkValidation(data, "range_project_cost")}
                 value={RateMaster.range_project_cost.value}
                 error={RateMaster.range_project_cost.error}
                 errmsg={RateMaster.range_project_cost.errmsg}
             />
             <Labelbox type="select" placeholder={"Sub Activity"}
                changeData={(data) => checkValidation(data, "sub_activity")}
                value={RateMaster.sub_activity.value}
                error={RateMaster.sub_activity.error}
                errmsg={RateMaster.sub_activity.errmsg}
             />
             <Labelbox type="text" placeholder={"Upper Limit"}
              changeData={(data) => checkValidation(data, "upper_limit")}
              value={RateMaster.upper_limit.value}
              error={RateMaster.upper_limit.error}
              errmsg={RateMaster.upper_limit.errmsg}
             />
          </Grid>
            
          <Grid  item xs={4}  spacing={2}>
             <Labelbox type="text" placeholder={"Amount"}
               changeData={(data) => checkValidation(data, "amount")}
               value={RateMaster.amount.value}
               error={RateMaster.amount.error}
               errmsg={RateMaster.amount.errmsg}
             />
             <Labelbox type="select" placeholder={"Court"}
               changeData={(data) => checkValidation(data, "court")}
               value={RateMaster.court.value}
               error={RateMaster.court.error}
               errmsg={RateMaster.court.errmsg}
             />
             <Labelbox type="select" placeholder={"Unit of Measurement"}
                  changeData={(data) => checkValidation(data, "unit_measurement")}
                  value={RateMaster.unit_measurement.value}
                  error={RateMaster.unit_measurement.error}
                  errmsg={RateMaster.unit_measurement.errmsg}
             />


          </Grid>   
          <Grid  item xs={12} className="rate_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          </Grid>


         
      </div>
  )
}