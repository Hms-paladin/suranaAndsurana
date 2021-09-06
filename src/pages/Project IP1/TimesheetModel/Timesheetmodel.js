import React, { useState, useEffect } from 'react';
import './Timesheetmodel.scss';
import Grid from '@material-ui/core/Grid';
import PlusIcon from "../../../images/plusIcon.svg";
import EditIcon from "../../../images/editable.svg";
import Delete from '../../../images/dashboard/delete.svg';
import CustomButton from '../../../component/Butttons/button';
import TimeSheetView from '../../Search/TimeSheets/timesheetview';
import DynModel from "../../../component/Model/model";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectTimeSheetList, getProjectTimeSheetListByTaskId } from "../../../actions/TimeSheetAction";

import moment from 'moment';

function Timesheetmodel(props) {
    const [timesheetview, setTimeSheetView] = useState(false)
    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {

    }, [props.rowData])
    let task_id;
    if (rowId == undefined) {
        if (props.rowData && props.rowData != undefined) {
            task_id = props.rowData.task_id;
        }
    }

    useEffect(() => {
        if (rowId && rowId != undefined) {
            dispatch(getProjectTimeSheetList(rowId));
        } else if (props.rowData && props.rowData != undefined) {
            dispatch(getProjectTimeSheetListByTaskId(props.rowData.task_id));
        }
    }, [props.rowData]);


    // console.log("propsTImeSheet", props);

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
                        style={{ padding: 5, marginLeft: 100, textAlign: 'center' }}
                    >

                        <Grid item xs={3}>
                            <label className="maintitle">Start Date & Time</label>
                        </Grid>
                        <Grid item xs={3}>
                            <label className="maintitle">End Date & Time</label>
                        </Grid>
                        <Grid item xs={3} container direction="row">
                            <label className="maintitle">No. of Hours</label>
                        </Grid>
                        {!props.rowData &&
                            <Grid item xs={3} container direction="row">
                                <label className="maintitle">Employee</label>
                            </Grid>
                        }

                    </Grid>


                    {props.timeSheetProject.map(data => (
                        <>
                            <div style={{ border: '1px solid lightgray', display: 'flex', width: '100%' }}>
                                <div style={{ display: 'grid', width: '20%' }}>
                                    <label style={{ fontWeight: 'bold' }}>{data.activity} </label>
                                    <label className="subtitle"> {data.sub_activity}</label>
                                </div>

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
                                        <div style={{ textAlign: 'center' }}>{moment(data.start_date).format("DD-MMM-YYYY")} {data.start_time != null ? '&' : ""} {data.start_time}</div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>{(data.end_date && data.end_date !== "0000-00-00") ? (moment(data.end_date).format("DD-MMM-YYYY")) : ''} {(data.end_time && data.end_time != "00:00:00") ? '&' + data.end_time : ""} </div>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div style={{ textAlign: 'center' }}>
                                            {data.no_hrs || data.total_hours}
                                        </div>
                                    </Grid>
                                    {!props.rowData &&
                                        <Grid item xs={3}>
                                            <div style={{ textAlign: 'center' }}>
                                                {data.assign_to}
                                            </div>
                                        </Grid>}
                                </Grid>
                            </div> </>))}

                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetview} handleChangeCloseModel={(bln) => setTimeSheetView(bln)} content={<TimeSheetView />} width={1000} />

                </Grid>
            </div>
        </div>
    )
}


const mapStateToProps = (state) =>
({
    timeSheetProject: state.getTaskList.getTimeSheetProject || []
});

export default connect(mapStateToProps)(Timesheetmodel);





