import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './AddHearing.scss'
export default function AddHearing(){
  return(
      <div>
           <div className="var_rate_master">Hearing</div>
          <Grid container spacing={3} className="hearingmaster_firstgrid">
          <Grid item xs={3} spacing={1} direction={"column"}>
             <Labelbox type="text" placeholder={"Project Name"}/>
             <Labelbox type="select" placeholder={"Internal case No"}/>
          </Grid>
          <Grid  item xs={3} spacing={1}>
             <Labelbox type="datepicker" placeholder={"Hearing Date"}/>
              
             <Labelbox type="text" placeholder={"Project Type"}/>

          </Grid>
          <Grid  item xs={3} spacing={1}>
            <Labelbox type="text" placeholder={"Client"}/>
             <Labelbox type="datepicker" placeholder={"Next Hearing Date"}/>
          </Grid>
          <Grid  item xs={3} spacing={1}>
          <Labelbox type="select" placeholder={"Court case No"}/>

          </Grid>  
          <Grid  item xs={6} spacing={1} className="hearing_outcome">
             <Labelbox type="textarea" placeholder={"Hearing Outcome"}/>
          </Grid>   
          <Grid  item xs={6}></Grid>
          <Grid  item xs={6}>
             <CustomButton btnName={"Create Task"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task"/>
             <CustomButton btnName={"Adjournment"} btnCustomColor="customPrimary" custombtnCSS="cus_create_task"/>
          </Grid>
          <Grid  item xs={10} spacing={4} alignItems={"flex-end"}>
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
          </Grid>
          <Grid  item xs={12} className="hearing_div">
               <div className="var_rate_master">Hearing</div>
               
                <div className="ad_journment"><Labelbox type="select" placeholder={"Adjournment token by"}/></div>
              
                <div className="reson_hearing"><Labelbox type="textarea" placeholder={"Hearing Outcome"}/></div>
                <div className="add_hearing_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"/>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"/>
                </div>
          </Grid>
       
          </Grid>


         
      </div>
  )
}