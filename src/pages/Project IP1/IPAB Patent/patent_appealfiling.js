import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABpatent.scss'
function PatentAppealFiling() {
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
                        <div>Application No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Patent Title</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Appeal Filing Date</div>
                        <Labelbox type="datepicker"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Serial No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div>Org Appeal No</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Date of Hearing</div>
                        <Labelbox type="datepicker"></Labelbox>
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
            <div className="patentbtn">
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
            </div>
        </div>
    )
}
export default PatentAppealFiling;