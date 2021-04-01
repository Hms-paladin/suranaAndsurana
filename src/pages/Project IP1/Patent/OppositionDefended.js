import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";

export default function OppositionDefended(){
    return(
        <div>
            <Grid container direction={"column"}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
                 <Labelbox type="text" placeholder={"Types of Grant"}/>
                 <Labelbox type="text" placeholder={"Patent Apllication Number"}/>
                 <Labelbox type="text" placeholder={"Patent Title"}/>
                 <Labelbox type="datepicker" placeholder={"Publication Date"}/>
                 <Labelbox type="text" placeholder={"Opponent"}/>
                 <Labelbox type="text" placeholder={"Opponent Agent"}/>
                 <div className="foreign_div"><Labelbox type="text" placeholder={"Comments"}/></div>
               </Grid>
              
            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary"  custombtnCSS={"TMopositionbuttons"} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}