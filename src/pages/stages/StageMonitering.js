import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';

import './StageMonitering.scss'
import CustomButton from '../../component/Butttons/button';
import Calender from "../../images/calender.svg";
import Like from "../../images/like.svg";
import Unlike from "../../images/unlike.svg";
import More from "../../images/more.svg";

const StageMonitor = (props) => {

  return (
    <div>
      <Grid container spacing={2} className="ratemaster_firstgrid">
        <Grid
          item
          xs={12}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={3}>
            <label className="rowtitle">Stages</label>
          </Grid>
          <Grid item xs={3}>
            <label className="rowtitle">Sub Stages</label>
          </Grid>
          <Grid item xs={3}>
            <label className="rowtitle">Compliance Date</label>
          </Grid>
          <Grid item xs={2}>
            <label className="rowtitle">Actual Date</label>
          </Grid>
          <Grid item xs={1}>
            <label ></label>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={3}>
            <label>Filling Of TM Application</label>
          </Grid>
          <Grid item xs={3}>
            <label>Filling Of TM Application</label>
          </Grid>
          <Grid item xs={3}>
            <label></label>
          </Grid>
          <Grid item xs={2}>
            <label>12-Mar-2021</label>
          </Grid>
          <Grid item xs={1}>
            <label></label>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={3}>
            <label>Reply To Formality Check</label>
          </Grid>
          <Grid item xs={3}>
            <label></label>
          </Grid>
          <Grid item xs={3}>
            <label>12-Mar-2021</label>
          </Grid>
          <Grid item xs={2}>
            <label>Actual Date</label>
          </Grid>
          <Grid item xs={1}>
          <div className="unlikeIcon">
              <img src={Unlike} style={{ cursor: 'pointer', width: 19 }} />
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={3}>
            <label>Reply To Examination Report</label>
          </Grid>
          <Grid item xs={3}>
            <label></label>
          </Grid>
          <Grid item xs={3}>
            <label>30-Mar-2021</label>
          </Grid>
          <Grid item xs={2}>
            <label>30-Mar-2021</label>
          </Grid>
          <Grid item xs={1}>
          <div className="likeIcon">
              <img src={Like} style={{ cursor: 'pointer', width: 19 }} />
              </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          className="spaceBtGrid"
          alignItems="center"
        >
          <Grid item xs={3}>
            <label>Publication of TM In The TM Journal</label>
          </Grid>
          <Grid item xs={3}>
            <label></label>
          </Grid>
          <Grid item xs={3}>
            <label>30-Mar-2021</label>
          </Grid>
          <Grid item xs={2}>
          <img src={Calender} style={{ cursor: 'pointer', width: 19 }} />
          </Grid>
          <Grid item xs={1}>
          <div className="moreIcon">
              <img src={More} style={{ cursor: 'pointer', width: 19 }} />
              </div>
          </Grid>
        </Grid>
      </Grid>
      <div className="customstagemonitorbtn">
        <CustomButton
          btnName={"Save"}
          btnCustomColor="customPrimary"
          custombtnCSS={"btnstagemonitor"}

        />
        <CustomButton
          btnName={"Cancel"}
          custombtnCSS={"btnstagemonitor"}

        />
      </div>
    </div>
  )
}


export default (StageMonitor);