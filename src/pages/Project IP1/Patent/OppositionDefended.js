import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
export default function OppositionDefended(){
    return(
        <div>
            <Grid container direction={"column"}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
                 <Labelbox type="text" placeholder={"Types of Grant"}/>
                 <Labelbox type="text" placeholder={"Patient Apllication Number"}/>
                 <Labelbox type="text" placeholder={"Patient Title"}/>
                 <Labelbox type="datepicker" placeholder={"Publication Date"}/>
                 <Labelbox type="text" placeholder={"Opponent"}/>
                 <Labelbox type="text" placeholder={"Opponent Agent"}/>
                 <div className="foreign_div"><Labelbox type="text" placeholder={"Comments"}/></div>
               </Grid>
              
            </Grid>
        </div>
    )
}