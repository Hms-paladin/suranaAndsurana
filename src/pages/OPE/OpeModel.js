import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { GetOpeByProjectId } from "../../actions/OutofPacketActions";

import moment from 'moment';

function OpeModel(props) {
    const dispatch = useDispatch()
    let { rowId } = useParams()

    useEffect(() => {
        if (rowId) {
            dispatch(GetOpeByProjectId(rowId));
        }
    }, [rowId]);

    return (
        <div className="tabIconsViewtooltip">
            <div className="tooltiptitle">OPE</div>
            <div style={{ backgroundColor: '#F0F0F0', padding: 10 }}>
                <Grid container >
                    <Grid
                        item
                        xs={12}
                        container
                        direction="row"
                        className="spaceBtGrid"
                        alignItems="center"
                        style={{ padding: 5, textAlign: 'center' }}
                    >

                        <Grid item xs={3}>
                            <label className="maintitle">Expence type</label>
                        </Grid>
                        <Grid item xs={3}>
                            <label className="maintitle">OPE date</label>
                        </Grid>
                        <Grid item xs={3} container direction="row">
                            <label className="maintitle">Amount</label>
                        </Grid>
                        <Grid item xs={3} container direction="row">
                            <label className="maintitle">Mode of payment</label>
                        </Grid>

                    </Grid>


                    {props.GetOpeByProjectId.map(data => (
                        <>
                            <div style={{ border: '1px solid lightgray', display: 'flex', width: '100%' }}>

                                <Grid
                                    item
                                    xs={12}
                                    container
                                    direction="row"
                                    className="spaceBtGrid"
                                    alignItems="center"
                                    style={{ textAlign: 'center' }}
                                >

                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>{data.expence_type}</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>{(data.ope_date && data.ope_date !== "0000-00-00") ? (moment(data.ope_date).format("DD-MMM-YYYY")) : ''} </div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>
                                            {data.amount}
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>
                                            {data.mode_of_payment}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div> </>))}

                </Grid>
            </div>
        </div>
    )
}


const mapStateToProps = (state) =>
({
    GetOpeByProjectId: state.OutofPacket.GetOpeByProjectId || []
});

export default connect(mapStateToProps)(OpeModel);





