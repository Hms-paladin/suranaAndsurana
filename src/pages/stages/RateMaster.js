import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './RateMaster.scss'
export default function RateMaster(){
  return(
      <div>
           <div className="var_rate_master">Variable Rate Master</div>
          <Grid container spacing={6} className="ratemaster_firstgrid">
          <Grid item xs={4} spacing={4} direction={"column"}>
             <Labelbox type="select" placeholder={"Table Name"}/>
             <Labelbox type="select" placeholder={"Activity"}/>
             <Labelbox type="text" placeholder={"Lower Limit"}/>
             <Labelbox type="text" placeholder={"Designation"}/>
          </Grid>
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="select" placeholder={"Range of project cost "}/>
             <Labelbox type="select" placeholder={"Sub Activity"}/>
             <Labelbox type="text" placeholder={"Upper Limit"}/>
          </Grid>
            
          <Grid  item xs={4} spacing={2}>
             <Labelbox type="text" placeholder={"Amount"}/>
             <Labelbox type="select" placeholder={"Court"}/>
             <Labelbox type="select" placeholder={"Unit of Measurement"}/>


          </Grid>   
          <Grid  item xs={12} className="rate_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          </Grid>


         
      </div>
  )
}