import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './StagesMaster.scss'
export default function StagesMaster(){
  return(
      <div>
          <Grid container spacing={3} className="stage_firstgrid">
          <Grid item xs={5} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Table Name"}/>
          </Grid>
          <Grid  item xs={5} spacing={2}>
          </Grid>
          <Grid item xs={4} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Project Type"}/>
             <Labelbox type="select" placeholder={"Stage"}/>
          </Grid>
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Sub Project Type"}/>
             <Labelbox type="select" placeholder={"Sub Stage"}/>
          </Grid>
           
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Process Type"}/>
             <Labelbox type="text" placeholder={"Number of compliance"}/>
          </Grid>   
          <Grid  item xs={10} spacing={4} alignItems={"flex-end"}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          </Grid>
      </div>
  )
}