import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import '../Project IP1/Patent/Patent.scss'
import Labelbox from "../../helpers/labelbox/labelbox";
export default function CopyRight(){
    return(
        <div>
            <Grid container direction={"column"}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="text" placeholder={"Name of Opponent"}/>
                 <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
              
               </Grid>
              
            </Grid>
        </div>
    )
}