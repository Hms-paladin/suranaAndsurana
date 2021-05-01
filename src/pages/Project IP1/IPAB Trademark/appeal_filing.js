import React,{useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
function AppealFiling(){
    return(
        <div>
            <Grid item xs={12} container direction="row" spacing={2}>
            <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Client - Applicant"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Mark"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Trade Mark No"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="select" placeholder="Class"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="datepicker" placeholder="Appeal Filing Date"></Labelbox>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Serial No"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Appeal No"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="datepicker" placeholder="Date of Hearing"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="select" placeholder="Status"></Labelbox>
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text" placeholder="Comments"></Labelbox>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <div className="trademarkbtn">
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
            </div>
        </div>
    )
}
export default AppealFiling;