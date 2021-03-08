import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function ApplicationDomestic(){
    return(
        <div>
            <Grid  container>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="text" placeholder={"File Cover"}/>
                 <Labelbox type="text" placeholder={"Our Reference"}/>
                 <Labelbox type="text" placeholder={"Client Reference"}/>
                 <Labelbox type="number" placeholder={"Application number"}/>
                 <Labelbox type="datepicker" placeholder={"Application Date"}/>
                 <Labelbox type="number" placeholder={"Priority No"}/>
                 <Labelbox type="datepicker" placeholder={"Priority Date"}/>
                 <Labelbox type="text" placeholder={"Title"}/>
                 <Labelbox type="select" placeholder={"Country"}/>
                 <Labelbox type="text" placeholder={"Associate"}/>
               </Grid>
               <Grid item xs={12} md={12} className="comments_line">
                 <div><Labelbox type="select" placeholder={"Status"}/></div>
                 <div className="coments_div"><Labelbox type="text" placeholder={"Comments"}/></div>
                 
                
               </Grid>
            </Grid>
        </div>
    )
}