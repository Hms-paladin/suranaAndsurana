
import React, { useState, useEffect } from 'react';
// import './search.s/css';
import '../task/Task.scss';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Progress } from 'antd';
import File from "../../images/file.png";
import Percentage from "../../images/percentage.png";
import Grid from '@material-ui/core/Grid';
import Order from "../../images/order.png";
import Clock from "../../images/clock.png";
import Arrow from "../../images/arrow.svg";
import Star from "../../images/star.png";
import Tick from "../../images/tick.png";
import H_icon from "../../images/H_icon.svg";
import M_icon from "../../images/Medium_priority.svg";
import L_icon from "../../images/Low_priority.svg";
import Delete from "../../images/delete.png";
import Plus from "../../images/plus.png";
import Reassign from "../../images/Reassign.svg";
import Labelbox from "../../helpers/labelbox/labelbox";
import TablePagination from '@material-ui/core/TablePagination';
import Blue from "../../images/blue_round.png";
import Light from "../../images/light_round.png";
import Orange from "../../images/orange_round.png";
import Red from "../../images/red_round.png";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
//TimeSheet Start && Stop  ==>
import DynModel from '../../component/Model/model';
import TimesheetStart from '../Search/TimeSheets/timesheetStart';
import TimeSheetView from '../Search/TimeSheets/timesheetview';
import TaskPriority from '../Search/task_priority'
import TaskTag from '../Search/tasktag'
import TaskStatus from '../Search/taskstatus'
import { getTaskList, getTaskWeekMonth, insert_reassign_task_assignee } from "../../actions/projectTaskAction";
import ValidationLibrary from "../../helpers/validationfunction";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Timesheetmodel from '../../pages/Project IP1/TimesheetModel/Timesheetmodel';

import AddHearing from '../task/AddHearing';
import { useDispatch, connect } from "react-redux";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom"
import { getEmpListDepartment, getEmployeeList } from "../../actions/MasterDropdowns";
import CustomButton from '../../component/Butttons/button';

const HtmlTooltip = withStyles((theme) => ({
    arrow: {
        color: theme.palette.common.white,
    },
    tooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 700,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

function Task(props) {
    let { task_id } = useParams()
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [startModelOpen, setStartModelOpen] = useState(false)
    const [task_pri_modal, setTaskPrioriyModal] = useState(false)
    const [task_tag, setTaskTag] = useState(false)
    const [task_status, setTaskStatus] = useState(false)
    const [subordinates, setSubordinates] = useState(false)
    const [taskstatusLists, settaskstatusLists] = useState({})
    const [taskData, setTaskData] = useState({})
    const [confirmmodel, setConfirmModel] = useState(false);
    const [employeeList, setemployeeList] = useState({})
    const [ModelClear, setModelClear] = useState(0)
    const [fieldVal, setfieldVal] = useState({
        subOrdinateVal: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        taskstatus: {
            value: "Active",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        employeeId: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
            disabled: false
        },
        select_task_id: {
            value: 0,

        },

    });

    function fnPeriority(data) {
        setTaskData(data);
        setTaskPrioriyModal(true);
    }

    function taskTagclick(data) {
        setTaskData(data);
        setTaskTag(true)
    }

    function fntaskcompletionstatus(data) {
        setTaskData(data);
        setTaskStatus(true)
    }

    function fntaskHearingDetails(data) {
        setTaskData(data);
        setHearing(true)
    }
    let empid = localStorage.getItem("empId");
    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            fieldVal[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: fieldVal[key].validation,
        };

        // only for multi select (start)

        let multipleIdList = [];

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id);
                    }
                }
            });
            dynObj.valueById = multipleIdList.toString();
        }
        if (key == "subOrdinateVal") {
            dispatch(getTaskList(data, fieldVal.taskstatus.value));
        }
        if (key == "taskstatus") {
            if (fieldVal.subOrdinateVal.value) {

                dispatch(getTaskList(fieldVal.subOrdinateVal.value, data));
            } else {
                dispatch(getTaskList(empid, data));
            }

        }

        setfieldVal((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    useEffect(() => {
        dispatch(getTaskList(empid, "Active", task_id));
        dispatch(getEmployeeList());
        dispatch(getEmpListDepartment());
    }, []);

    useEffect(() => {

        let employeeData = []
        props.getEmpListDepartment.map((data) =>
            employeeData.push({
                value: data.name,
                id: data.emp_id
            })
        )
        setemployeeList({ employeeData })
    }, [props.getEmpListDepartment]);

    useEffect(() => {

        let taskbyStatus = []
        taskbyStatus.push({
            value: 'Active',
            id: 'Active'
        })
        taskbyStatus.push({
            value: 'Completed',
            id: 'Completed'
        })

        settaskstatusLists({ taskbyStatus })


        let subOrinateList = []
        props.subordinateslis.map((data) =>
            subOrinateList.push({
                value: data.name,
                id: data.emp_id
            })
        )
        setSubordinates({ subOrinateList })
    }, [props.getTaskLists, props.subordinateslis]);

    // Change start,stop Model

    const [changeModel, setChangeModel] = useState(true)

    const [hearing, setHearing] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(event.target.value);
        setPage(0);

    };

    // TimeSheet Start Model ==>
    function startModel() {
        setStartModelOpen(true)
    }
    function stopModel() {
        setChangeModel(false)
    }
    function openTimeSheet(flg, obj) {
      
        if (!fieldVal.subOrdinateVal.value || fieldVal.subOrdinateVal.value === "" || (fieldVal.subOrdinateVal.value === Number(localStorage.getItem("empId")))) {
            if (obj.perecent_completion === 100) { return }
            setTaskData(obj);
            setStartModelOpen(flg);
        }
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    var i = 0;
    const handleOpen = (data) => {
        setTaskData(data);
        setOpen(true);
    };
    //************************* */

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });

        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    const reassign_model_open = (data) => {
        fieldVal.select_task_id.value = data.task_id
        setConfirmModel(true)
    }

    const reassign_task_assignee = async () => {
        await dispatch(insert_reassign_task_assignee(fieldVal.employeeId.value, fieldVal.select_task_id.value))
        setConfirmModel(false)
    }

    return (
        <div>
            <div className="searchfilterflex">
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <div style={{ display: 'flex', }}>
                        <p className="task_head">Tasks</p>
                        <div style={{ width: '200px', }}>
                            <Grid item xs={8}>
                                <Labelbox type="select"
                                    placeholder={" Subordinate"}
                                    dropdown={subordinates.subOrinateList}
                                    changeData={(data) => checkValidation(data, "subOrdinateVal")}
                                    value={fieldVal.subOrdinateVal.value}
                                    error={fieldVal.subOrdinateVal.error}
                                    errmsg={fieldVal.subOrdinateVal.errmsg}
                                />
                            </Grid>
                        </div>
                        <p className="task_head">Tasks Status</p>
                        <div style={{ width: '200px', }}>
                            <Grid item xs={8}>
                                <Labelbox type="select"
                                    placeholder={" taskstatus"}
                                    dropdown={taskstatusLists.taskbyStatus}
                                    changeData={(data) => checkValidation(data, "taskstatus")}
                                    value={fieldVal.taskstatus.value}
                                    error={fieldVal.taskstatus.error}
                                    errmsg={fieldVal.taskstatus.errmsg}
                                />
                            </Grid>
                        </div>
                    </div>

                </div>

                {/* first card */}

                <div className="card_div">
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={startModelOpen} handleChangeCloseModel={(bln) => (setStartModelOpen(bln), setModelClear(ModelClear + 1))}
                        content={<TimeSheetView model_clear={ModelClear} rowData={taskData} handleChangeCloseModel={(bln) => (setStartModelOpen(bln), setModelClear(ModelClear + 1))} />} width={1000} zIndex={1000} />

                    <DynModel modelTitle={"Task Completed"} handleChangeModel={task_status} handleChangeCloseModel={(bln) => setTaskStatus(bln)}
                        content={<TaskStatus rowData={taskData} handleChangeCloseModel={(bln) => setTaskStatus(bln)} />} width={300} />
                    <DynModel modelTitle={"Task Tag"} handleChangeModel={task_tag} handleChangeCloseModel={(bln) => setTaskTag(bln)} content={<TaskTag close={() => setTaskTag(false)} rowData={taskData} />} width={300} />

                    <DynModel modelTitle={"Task Priority"} handleChangeModel={task_pri_modal} handleChangeCloseModel={(bln) => setTaskPrioriyModal(bln)} content={<TaskPriority rowData={taskData} />} width={300} />
                    <DynModel modelTitle={"Hearing"} handleChangeModel={hearing} handleChangeCloseModel={(bln) => setHearing(bln)} content={<AddHearing rowData={taskData} onhearingclose={() => setHearing(false)} />} width={1000} />


                    {props.getTaskLists.length > 0 && stableSort(props.getTaskLists, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                            const num = index + 1;
                            let total_hours = 0;
                            if (data.totalHours && data.totalHours.length > 0) {
                                total_hours = data.totalHours[0].total_hours ? data.totalHours[0].total_hours.split(":") : "0";
                            }
                            if (data.perecent_completion === 100 && fieldVal.taskstatus.value === 'Completed') {


                                return (
                                    <Card >
                                        <div style={{ display: 'flex', justifyContent: 'space-betwen' }}>
                                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                                <p className="num_align_side" onClick={stopModel}>{num}</p>
                                                <Divider />


                                                <HtmlTooltip onClose={handleClose} onOpen={() => handleOpen(data)} arrow
                                                    onMouseEnter={() => setOpen(true)}
                                                    onMouseLeave={() => setOpen(false)}
                                                    title={<Timesheetmodel rowData={taskData} />}
                                                >
                                                    <img src={Clock} style={{ cursor: "pointer" }} className="img_side_align" onClick={() => openTimeSheet(true, data)} />
                                                </HtmlTooltip>


                                            </div>

                                            <div style={{ width: '36%', padding: '15px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }}>
                                                    <p>{data.project_id != null ? data.project_name : 'Adhoc Task'}</p>
                                                    {/* <p>{data.project_id != null ? data.project_type : data.description}</p> */}
                                                    <p>{data.client}</p>
                                                </div>
                                                <div style={{ display: 'flex', marginLeft: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                                                    <p style={{ paddingRight: '30px' }}>{data.description}</p>
                                                    {/* <p>{data.sub_activity}</p> */}
                                                </div>
                                                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                                    <p style={{ marginRight: '10px' }}>Start Date :  {data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</p>
                                                    <p>End Date : {data.end_date && data.end_date != "" ? moment(data.end_date).format("DD MMM YYYY") : ""}</p>
                                                </div>
                                                <div className="task_bar_align">
                                                    <Progress trailColor={{
                                                        '0%': 'green',
                                                        '40%': 'blue',
                                                    }}
                                                        percent={data.perecent_completion} />
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div style={{ width: '37%' }}>
                                                {/* <div className="start_date_yellow"> */}
                                                <p>&nbsp;</p>
                                                {/* <p>Started Date : {data.started_date && data.started_date != "" ? moment(data.started_date).format("DD MMM YYYY") : ""}</p>
                                                    <p>Time : {data.started_time && data.started_time != "" ? moment(data.started_time, ["HH.mm"]).format("hh:mm A") : ""}</p> */}
                                                {/* </div> */}
                                                <div style={{ marginBottom: '20px', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Actual Start Date :<span>{data.actual_start_date && data.actual_start_date != "" ? moment(data.actual_start_date).format("DD MMM YYYY") : ""}</span></span>
                                                    <span>End Date :<span>{data.actual_end_date && data.actual_end_date != "" ? moment(data.actual_end_date).format("DD MMM YYYY") : ""}</span></span>
                                                </div>
                                                {/* <div>
                                                    <p>Assigned By <a>{data.name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div> */}
                                                <div>
                                                    <p>Assigned By <a>{data.name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div>
                                                {/* <div>
                                                    <p>Reassigned By <a>{data.assignee_name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div> */}
                                                {data.tag && <div>
                                                    <span>Tag : <span>{data.tag}</span></span>
                                                </div>}
                                            </div>
                                            <div className="divider"></div>
                                            <div style={{ marginTop: '20px' }}>
                                                <div className="total_12_div">
                                                    <p style={{ display: "flex", justifyContent: 'center', marginBottom: '0px' }}>Total Hours</p>
                                                    <p style={{ display: "flex", justifyContent: 'center' }}>{data.totalHours[0].total_hours ? (total_hours[0] + ':' + total_hours[1]) : '0'}</p>
                                                </div>
                                                <div className="images_div">
                                                    {data.project_name !== 'Adhoc Task' && data.project_name !== null && <img src={data.Priority == 'High' ? H_icon : data.Priority == 'Low' ? L_icon : M_icon} style={{ marginRight: '5px', width: '18px', cursor: "pointer" }} onClick={() => fnPeriority({ data })} />}
                                                    <img src={File} style={{ marginRight: '5px', width: '18px', cursor: "pointer" }} onClick={() => taskTagclick({ data })} />

                                                    <img src={Percentage} style={{ marginRight: '5px', width: '18px' }} onClick={() => fntaskcompletionstatus({ data })} />


                                                    {<img src={data.activity == 'Hearing' ? Order : ""} style={{ marginRight: '5px', width: '18px', cursor: 'pointer' }} onClick={data.activity == 'Hearing' ? () => fntaskHearingDetails({ data }) : ""} />}


                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                                <img src={Tick} style={{ margin: '12px' }} />
                                                <Divider />

                                            </div>
                                        </div>
                                    </Card>
                                )

                            } else if (fieldVal.taskstatus.value == 'Active') {

                                i++;
                                return (
                                    <Card >
                                        <div style={{ display: 'flex', justifyContent: 'space-betwen' }}>
                                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                                <p className="num_align_side" onClick={stopModel}>{num}</p>
                                                <Divider />

                                                <HtmlTooltip onClose={handleClose} onOpen={() => handleOpen(data)} arrow
                                                    onMouseEnter={() => setOpen(true)}
                                                    onMouseLeave={() => setOpen(false)}
                                                    title={<Timesheetmodel rowData={data} />}
                                                >
                                                    <img src={Clock} style={{ cursor: "pointer" }} className="img_side_align" onClick={() => openTimeSheet(true, data)} />
                                                </HtmlTooltip>

                                            </div>

                                            <div style={{ width: '36%', padding: '15px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }}>
                                                    <p>{data.project_id != null ? data.project_name : 'Adhoc Task'}</p>
                                                    {/* <p>{data.project_id != null ? data.project_type : data.description}</p> */}
                                                    <p>{data.client}</p>
                                                </div>
                                                <div style={{ display: 'flex', marginLeft: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                                                    <p style={{ paddingRight: '30px' }}>{data.description}</p>
                                                    {/* <p>{data.sub_activity}</p> */}
                                                </div>
                                                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                                    <p style={{ marginRight: '10px' }}>Start Date :  {data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</p>
                                                    <p>End Date : {data.end_date && data.end_date != "" ? moment(data.end_date).format("DD MMM YYYY") : ""}</p>
                                                </div>
                                                <div className="task_bar_align">
                                                    <Progress percent={data.perecent_completion} status="active" />
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div style={{ width: '37%' }}>
                                                {/* <div className="start_date_yellow"> */}
                                                {/* <p>&nbsp;</p> */}
                                                {/* <p>Started Date : {data.started_date && data.started_date != "" ? moment(data.started_date).format("DD MMM YYYY") : ""}</p>
                                                    <p>Time : {data.started_time && data.started_time != "" ? moment(data.started_time, ["HH.mm"]).format("hh:mm A") : ""}</p> */}
                                                {/* </div> */}
                                                <div style={{ marginBottom: '20px', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Actual Start Date :<span>{data.actual_start_date && data.actual_start_date != "" ? moment(data.actual_start_date).format("DD MMM YYYY") : ""}</span></span>
                                                    <span>End Date :<span>{data.actual_end_date && data.actual_end_date != "" ? moment(data.actual_end_date).format("DD MMM YYYY") : ""}</span></span>
                                                </div>
                                                {/* <div>
                                                    <p>Assigned By <a>{data.name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div> */}
                                                <div>
                                                    <p>Assigned By <a>{data.name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div>
                                                {/* <div>
                                                    <p>Reassigned By <a>{data.assignee_name}</a> On <a>{data.start_date && data.start_date != "" ? moment(data.start_date).format("DD MMM YYYY") : ""}</a></p>
                                                </div> */}
                                                {data.tag && <div>
                                                    <span>Tag : <span>{data.tag}</span></span>
                                                </div>}
                                            </div>
                                            <div className="divider"></div>
                                            <div style={{ marginTop: '20px' }}>
                                                <div className="total_12_div">
                                                    <p style={{ display: "flex", justifyContent: 'center', marginBottom: '0px' }}>Total Hours</p>
                                                    <p style={{ display: "flex", justifyContent: 'center' }}>{data.totalHours[0].total_hours ? (total_hours[0] + ':' + total_hours[1]) : '0'}</p>
                                                </div>
                                                <div className="images_div">
                                                    {data.project_name !== 'Adhoc Task' && data.project_name !== null && <img src={data.Priority == 'High' ? H_icon : data.Priority == 'Low' ? L_icon : M_icon} style={{ marginRight: '5px', width: '18px', cursor: "pointer" }} onClick={() => fnPeriority({ data })} />}
                                                    <img src={File} style={{ marginRight: '5px', width: '18px', cursor: "pointer" }} onClick={() => taskTagclick({ data })} />

                                                    <img src={Percentage} style={{ marginRight: '5px', width: '18px' }} onClick={() => fntaskcompletionstatus({ data })} />


                                                    {<img src={data.activity == 'Hearing' ? Order : ""} style={{ marginRight: '5px', width: '18px', cursor: 'pointer' }} onClick={data.activity == 'Hearing' ? () => fntaskHearingDetails({ data }) : ""} />}


                                                </div>
                                            </div>
                                            <div className="Reassign_Div">
                                                <img src={Tick} style={{ margin: '12px' }} />
                                                <Divider />
                                                <img src={Reassign} onClick={() => reassign_model_open(data)} className="Reassign_Img" />
                                            </div>
                                        </div>
                                    </Card>
                                )

                            }
                        })}
                </div>
                {/* first card end */}

                <div className="bottom_align">
                    <div className="bottom_div" >
                        <div style={{ width: '50%' }}>
                            <p>Time Utilized</p>
                        </div>
                        <div className="divider_bottom"></div>
                        <div style={{ width: '45%' }}>
                            <p style={{ marginBottom: '0px' }}>This Month</p>
                            <p>{props.getTaskWeekMonth && props.getTaskWeekMonth.length > 0 && props.getTaskWeekMonth[1][0].totalHours_for_month} Hrs</p>
                        </div>
                        <div className="divider_bottom"></div>
                        <div style={{ width: '40%' }}>
                            <p style={{ marginBottom: '0px' }}>This Week</p>
                            <p>{props.getTaskWeekMonth && props.getTaskWeekMonth.length > 0 && props.getTaskWeekMonth[0][0].totalHours_for_week} Hrs</p>
                        </div>
                    </div>
                    <div>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={props.getTaskLists && props.getTaskLists.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex' }}>
                            <img src={Blue} style={{ height: '18px' }} />
                            <p>Completed</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img src={Light} style={{ height: '18px' }} />
                            <p>In Progress</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img src={Orange} style={{ height: '18px' }} />
                            <p>Not Started</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img src={Red} style={{ height: '18px' }} />
                            <p>Delayed</p>
                        </div>
                    </div>
                </div>
            </div>



            <DynModel
                modelTitle={"Assigned To (Reassign)"}
                handleChangeModel={confirmmodel}
                handleChangeCloseModel={(bln) => setConfirmModel(bln)}
                content={
                    <div style={{ textAlign: '-webkit-center' }}>
                        <div>
                            <Grid item xs={10} container direction="column">
                                <div className="TThead">Employee</div>
                                <Labelbox type="select"
                                    dropdown={employeeList.employeeData}
                                    changeData={(data) => checkValidation(data, "employeeId")}
                                    placeholder={"Employee"}
                                    value={fieldVal.employeeId.value}
                                    error={fieldVal.employeeId.error}
                                    errmsg={fieldVal.employeeId.errmsg}
                                    disabled={fieldVal.employeeId.disabled}
                                ></Labelbox>
                            </Grid>
                        </div>
                        <div className="customNotFoundbtn">
                            <CustomButton btnName={"YES"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={reassign_task_assignee} />
                            <CustomButton btnName={"NO "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setConfirmModel(false)} />
                        </div>
                    </div>
                }
                width={500}
            />
        </div>
    )
}

const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    getTaskLists: state.projectTasksReducer.getTaskLists,
    getTaskWeekMonth: state.projectTasksReducer.getTaskWeekMonth,
    subordinateslis: state.getOptions.getEmployeeList,
    getEmpListDepartment: state.getOptions.getEmpListDepartment || [],
});
export default connect(mapStateToProps)(Task);