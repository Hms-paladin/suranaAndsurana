import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './StagesMaster.scss'
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
export default function StagesMaster(){
    const header = [
        { id: 'table_name', label: 'Table Name' },
        { id: 'project_type', label: 'Project Type' },
        { id: 'sub_project_type', label: 'Sub Project Type' },
        { id: 'process_type', label: 'Process Type' },
        { id: 'stage', label: 'Stage' },
        { id: 'sub_stage', label: 'Sub Stage' },
        { id: 'no_days', label: 'Number of Days' },
      ];
        
  const rows = [
     {table_name:"Table 1",project_type:"project 1",sub_project_type:"sub Project1",process_type:"Type1",stage:"Stage 1",sub_stage:"Substage1",no_days:"Number"}
     
  ];
   const [RateMaster, setRateMaster] = useState({
      table_name: {
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
      sub_project_type: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      process_type: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      stages: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      sub_stages: {
          value: "",
          validation: [{ "name": "required" }],
          error: null,
          errmsg: null,
      },
      compliance: {
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
          <Grid container spacing={3} className="stage_firstgrid">
          <Grid item xs={5} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Table Name"}
               changeData={(data) => checkValidation(data, "table_name")}
               value={RateMaster.table_name.value}
               error={RateMaster.table_name.error}
               errmsg={RateMaster.table_name.errmsg}
             />
          </Grid>
          <Grid  item xs={5} spacing={2}>
          </Grid>
          <Grid item xs={4} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Project Type"}
               changeData={(data) => checkValidation(data, "project_type")}
               value={RateMaster.project_type.value}
               error={RateMaster.project_type.error}
               errmsg={RateMaster.project_type.errmsg}
             />
             <Labelbox type="select" placeholder={"Stage"}
               changeData={(data) => checkValidation(data, "stages")}
               value={RateMaster.stages.value}
               error={RateMaster.stages.error}
               errmsg={RateMaster.stages.errmsg}
             />
               <Labelbox type="text" placeholder={"Remainder Days"}
               changeData={(data) => checkValidation(data, "compliance")}
               value={RateMaster.compliance.value}
               error={RateMaster.compliance.error}
               errmsg={RateMaster.compliance.errmsg}
             />
          </Grid>
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Sub Project Type"}
               changeData={(data) => checkValidation(data, "sub_project_type")}
               value={RateMaster.sub_project_type.value}
               error={RateMaster.sub_project_type.error}
               errmsg={RateMaster.sub_project_type.errmsg}
             />
             <Labelbox type="select" placeholder={"Sub Stage"}
               changeData={(data) => checkValidation(data, "sub_stages")}
               value={RateMaster.sub_stages.value}
               error={RateMaster.sub_stages.error}
               errmsg={RateMaster.sub_stages.errmsg}
             />
          </Grid>
           
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Process Type"}
               changeData={(data) => checkValidation(data, "process_type")}
               value={RateMaster.process_type.value}
               error={RateMaster.process_type.error}
               errmsg={RateMaster.process_type.errmsg}
             />
             <Labelbox type="text" placeholder={"Number of Days"}
               changeData={(data) => checkValidation(data, "compliance")}
               value={RateMaster.compliance.value}
               error={RateMaster.compliance.error}
               errmsg={RateMaster.compliance.errmsg}
             />
          </Grid> 
          {/* <Grid  item xs={4} spacing={2}>
        
          </Grid>   */}
          <Grid  item xs={10} spacing={4} alignItems={"flex-end"}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel}/>
          </Grid>
          </Grid>
          <EnhancedTable headCells={header} rows={rows}/>
      </div>
  )
}