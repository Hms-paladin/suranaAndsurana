import React, { useState } from 'react'
import ApplicationDomestic from './ApplicationDomestic'
import ApplicationForeign from './ApplicationForeign'
import ApplicationPCT from './ApplicationPCT'
import OppositionDefended from './OppositionDefended'
import OppositionFilled from './OppositionFilled'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../../helpers/labelbox/labelbox";
import DynModel from '../../../component/Model/model';
import ProjectTaskModel from '../ProjectTaskModel/projecttaskModel';

export default function Patent(props) {

   const [modelOpen, setModelOpen] = useState(false)



   function projectTaskModel(boxName) {
      boxName === "TASKS" && setModelOpen(true)
   }
   const modelContent = () => {
      return (
         <ProjectTaskModel />
      )
   }

   console.log(props, "props")
   return (
      <div>
         <Tabs  onChangeTabBox={(data) => projectTaskModel(data)} />
         <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
         {/* <ApplicationForeign/>
           
           <OppositionDefended/>
           <OppositionFilled/> */}
         {
            props.Type.process_type.value === '' && props.Type.filling_type.value == '' &&
            <ApplicationDomestic />

         }
         {
            props.Type.process_type.value === '1' && props.Type.filling_type.value == '3' &&
            <ApplicationDomestic />

         }
         {
            props.Type.process_type.value === '1' && props.Type.filling_type.value == '4' &&
            <ApplicationForeign />
         }
         {
            props.Type.process_type.value === '1' && props.Type.filling_type.value == '5' &&
            //    <OppositionDefended/>
            <ApplicationPCT />
         }
         {
            props.Type.process_type.value === '4' && props.Type.filling_type.value == '1' &&
            <OppositionDefended />
         }
         {
            props.Type.process_type.value === '4' && props.Type.filling_type.value == '2' &&
            <OppositionFilled />
         }


         <Grid item xs={12} container justify="flex-end" className="patent_btns">
            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
         </Grid>
      </div>
   )
}