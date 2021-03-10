import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './StagesMaster.scss'
export default function AddHearing(){
  return(
      <div>
           <div className="var_rate_master">Variable Rate Master</div>
          <Grid container spacing={6} className="ratemaster_firstgrid">
          <Grid item xs={5} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Table Name"}/>
             <Labelbox type="text" placeholder={"Activity"}/>
             <Labelbox type="select" placeholder={"Court"}/>
          </Grid>
          <Grid  item xs={5} spacing={2}>
             <Labelbox type="select" placeholder={"Designation"}/>
             <Labelbox type="text" placeholder={"Sub Activity"}/>
             <Labelbox type="select" placeholder={"Range of project cost"}/>
          </Grid>
          <Grid  item xs={5} spacing={2}>
          </Grid>  
          <Grid  item xs={5} spacing={2}>
             <Labelbox type="text" placeholder={"Amount"}/>
          </Grid>   
          <Grid  item xs={10} spacing={4} alignItems={"flex-end"}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          </Grid>


         
      </div>
  )
}