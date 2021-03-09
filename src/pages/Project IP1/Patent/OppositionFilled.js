import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function OppositionFilled(){
    return(
        <div>
            <Grid container direction={"column"}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="text" placeholder={"Name of Opponent"}/>
                 <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
                 <Labelbox type="text" placeholder={"Types of Grant"}/>
                 <Labelbox type="text" placeholder={"Patent Application Number"}/>
                 <Labelbox type="text" placeholder={"Patent Title"}/>
                 <Labelbox type="datepicker" placeholder={"Publication Date"}/>
                 <Labelbox type="text" placeholder={"Patent Applicant"}/>
                 <Labelbox type="text" placeholder={"Application Agent"}/>
               </Grid>
              
            </Grid>
        </div>
    )
}