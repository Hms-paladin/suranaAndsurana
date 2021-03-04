import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './ApplicationDomestic.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function ApplicationDomestic(){
    return(
        <div>
            <Grid container direction={"column"} spacing={2}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <div><Labelbox type="text" placeholder={"File Cover"}/></div>
                 <div><Labelbox type="select" placeholder={"Our Reference"}/></div>
                 <div><Labelbox type="select" placeholder={"Applicant"}/></div>
                 <div><Labelbox type="select" placeholder={"Country"}/></div>
                 <div><Labelbox type="select" placeholder={"Associate"}/></div>
               </Grid>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <div><Labelbox type="datepicker" placeholder={"Dead Line"}/></div>
                 <div><Labelbox type="select" placeholder={"Client Reference"}/></div>
                 <div><Labelbox type="number" placeholder={"Application Number"}/></div>
                 <div><Labelbox type="datepicker" placeholder={"Application Date"}/></div>
                 <div><Labelbox type="select" placeholder={"Status"}/></div>
               </Grid>
               <Grid item xs={12} md={12} className="comments_line">
                 <div><Labelbox type="text" placeholder={"Comments"}/></div>
                
               </Grid>
            </Grid>
        </div>
    )
}