import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
function RevocationFiled() {
    return (
        <div>
            <div className="ipab">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div>Client - Applicant</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Mark</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Trade Mark No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Class</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Revocation Filing Date</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div>Serial No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Org Appeal No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Date of Hearing</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div></div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Respondent - Rep</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div>Filing Type</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Status</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Comments</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                </Grid>
            </div>
            <div className="trademarkbtn">
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
            </div>
        </div>
    )
}
export default RevocationFiled;