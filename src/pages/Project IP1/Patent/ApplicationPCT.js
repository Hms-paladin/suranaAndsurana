import React,{useState,useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";


export default function ApplicationPCT(){
    return(
        <div>
            <Grid container direction={"column"}>
               <Grid item xs={12} md={12} className="app_cont_domestic">
                 <Labelbox type="text" placeholder={"File Cover"}/>
                 <Labelbox type="text" placeholder={"Associate"}/>
                 <Labelbox type="text" placeholder={"Our Reference"}/>
                 <Labelbox type="text" placeholder={"Client Reference"}/>
                 <Labelbox type="number" placeholder={"Application Number"}/>
                 <Labelbox type="datepicker" placeholder={"Application Date"}/>
                 <Labelbox type="select" placeholder={"Priority Country"}/>
                 <Labelbox type="text" placeholder={"Priority Application No."}/>
                 <Labelbox type="datepicker" placeholder={"Priority Application Date"}/>
                 <Labelbox type="select" placeholder={"Status"}/>
               </Grid>
               <Grid item xs={12} md={12} className="comments_line">
                 <div className="coments_div"><Labelbox type="text" placeholder={"Comments"}/></div>
                 <div><Labelbox type="datepicker" placeholder={"DeadLine"}/></div>
                 
                
               </Grid>
               <Labelbox type="datepicker" placeholder={"Deadline"}/>

            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary"  custombtnCSS={"TMopositionbuttons"} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}