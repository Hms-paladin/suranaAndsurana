import React, { useState } from 'react';
import './Timesheetmodel.scss';
import Grid from '@material-ui/core/Grid';

function Timesheetmodel(props) {

    return (
        <div className="tabIconsViewtooltip">
        <div className="tooltiptitle">Time Sheet</div>
        <div style={{ backgroundColor: '#F0F0F0', padding: 10 }}>
            <Grid container >
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ padding: 5 }}
                >
                    <Grid item xs={3}>
                        <label className="maintitle"></label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">Start Date & Time</label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">End Date & Time</label>
                    </Grid>
                    <Grid item xs={3}>
                        <label className="maintitle">No. of Hours</label>
                    </Grid>

                </Grid>


                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ border: '1px solid lightgray',paddingLeft: -5 }}
                >
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                            <div style={{display:'grid',textAlign:'center'}}>
                                <label style={{ fontWeight: 'bold' }}>Documentation </label>
                                <label className="subtitle"> Sub Activity</label>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid item xs={9}>

                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    className="spaceBtGrid"
                    alignItems="center"
                    style={{ border: '1px solid lightgray', borderTop: 0 }}
                >
                    <Grid item xs={3}>
                        <Grid item xs={12}>
                        <div style={{display:'grid',textAlign:'center'}}>
                            <label style={{ fontWeight: 'bold' }}>Hearing </label>
                            <label className="subtitle"> Non effective</label>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>

                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className="spaceBtGrid"
                            alignItems="center"
                            style={{ padding: 5 }}
                        >
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  07:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="time">07-Mar-2020  08:00 am</label>
                            </Grid>
                            <Grid item xs={3}>
                                <label className="hours">1</label>
                            </Grid>
                        </Grid>


                    </Grid>

                </Grid>

            </Grid>
        </div>
    </div>
    )
}
export default Timesheetmodel;





