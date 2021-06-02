  
import React, { useState,useEffect } from 'react';
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
import Edit from "../../images/edit.svg";
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
import { getTaskList } from "../../actions/projectTaskAction";
import ValidationLibrary from "../../helpers/validationfunction";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles} from '@material-ui/core/styles';
import Timesheetmodel from '../../pages/Project IP1/TimesheetModel/Timesheetmodel';

import AddHearing from '../task/AddHearing';
import { useDispatch, connect } from "react-redux";
import {getSubordinate} from "../../actions/UserMasterAction";

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
    
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [startModelOpen, setStartModelOpen] = useState(false)
    const [stopModelOpen, setStopModelOpen] = useState(false)
    const[timesheetmodal,setTimesheetmodal]=useState(false)
    const[task_pri_modal,setTaskPrioriyModal]=useState(false)
    const[task_tag,setTaskTag]=useState(false)
    const[task_status,setTaskStatus]=useState(false)
    const[subordinates,setSubordinates]=useState(false)
    const[taskData,setTaskData]=useState({})
    const[subId,setSubId]=useState(false)
    const [fieldVal, setfieldVal] = useState({
        subOrdinateVal: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        }
       
      });
      function fnPeriority(data){
        setTaskData(data);
        setTaskPrioriyModal(true);
      }
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
            dispatch(getTaskList(data));
          }
        
        setfieldVal((prevState) => ({
          ...prevState,
          [key]: dynObj,
        }));
      }
    let empid= localStorage.getItem("empId");
    useEffect(() => {
        dispatch(getTaskList(empid));
        dispatch(getSubordinate(empid)); 
    
      }, []);
      useEffect(() => {
        
    //var tasks =props.getTaskLists;
/*
    if(props.getTaskLists && props.getTaskLists.length>0){
        var obj =props.getTaskLists;
        var list=[];
    for(var i =0;i<obj.length; i++){
       var timesheet =  getTaskTimeSheetbyTaskIdsss(obj[i].task_id);
       if(timesheet && timesheet.length >0){
       obj[i].actual_end_date = timesheet.end_date
       obj[i].actual_end_time = timesheet.end_time
       list.push(obj)
       }
    }
} */
let subOrinateList = []
    props.subordinateslis.map((data) =>
    subOrinateList.push({ value: data.name,
    id: data.emp_id  })
)
setSubordinates({ subOrinateList })
      }, [props.getTaskLists,props.subordinateslis
      ]);

      function getTaskTimeSheetbyTaskIdsss(taskId) {
        try {
            axios({
                method: 'POST',
                url: apiurl + 'get_time_sheet',
                data: {
                    "task_id": taskId,
                }
            })
                .then((response) => {
                    return response.data.data;
                })
    
        } catch (err) {
    
        }
    }
    // Change start,stop Model

    const [changeModel, setChangeModel] = useState(true)

    const [hearing, setHearing] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // TimeSheet Start Model ==>
    function startModel() {
        setStartModelOpen(true)
    }
    function stopModel() {
        alert("test")
        setChangeModel(false)
    }

    function openTimeSheet(flg,obj){
var a= obj;
//props['objs'] =a;
setStartModelOpen(flg);
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
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
                    </div>

                    <div style={{ display: 'flex' }}>
                        <img src={Delete} style={{ width: '40px' }} />
                        <img src={Edit} style={{ width: '33px' }} />
                        <img src={Plus} style={{ width: '40px', height: '38px' }} />
                    </div>

                </div>

                

                {/* first card */}
                <div className="card_div">
                {props.getTaskLists.length > 0 && props.getTaskLists.map((data) => {
                    
                    if(data.project_name != null && data.project_type != null)
                return (
                    <Card >
                        <div style={{ display: 'flex', justifyContent: 'space-betwen' }}>
                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                <p className="num_align_side" onClick={stopModel}>1</p>
                                <Divider />
                                {/* <HtmlTooltip open={open}  onOpen={handleOpen} arrow
                                    title={<Timesheetmodel />}
                                    onMouseEnter={()=>setOpen(true)}
                                    onMouseLeave={()=>setOpen(true)}
                                > */}
                                     <img src={Clock} style={{cursor:"pointer"}} className="img_side_align" onClick={()=>openTimeSheet(true,data)} />
                                {/* </HtmlTooltip> */}
                                <DynModel modelTitle={"Time Sheettt"} handleChangeModel={startModelOpen} handleChangeCloseModel={(bln) => setStartModelOpen(bln)} content={<TimeSheetView rowData={data}/>} width={1000} />
                               {/*  <DynModel modelTitle={"Time Sheettt"} handleChangeModel={startModelOpen} handleChangeCloseModel={(bln) => setStartModelOpen(bln)} content={<TimeSheetView />} width={1000} /> 
                                {/* <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetmodal} handleChangeCloseModel={(bln) => setTimesheetmodal(bln)} content={<Timesheetmodel />} width={1000} /> */}
                            </div>

                            <div style={{ width: '36%', padding: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }}>
                                    <p>{data.project_name}</p>
                                    <p>{data.project_type}</p>
                                    <p>{data.client}</p>
                                </div>
                                <div style={{ display: 'flex', marginLeft: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                                    <p style={{ paddingRight: '30px' }}>{data.activity}</p>
                                    <p>{data.sub_activity}</p>
                                </div>
                                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                    <p style={{ marginRight: '10px' }}>Start Date : {data.start_date}</p>
                                    <p>End Date : {data.end_date}</p>
                                </div>
                                <div className="task_bar_align">
                                    <Progress percent={data.perecent_completion} status="active" />
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div style={{ width: '37%' }}>
                                <div className="start_date_yellow">
                                    <p>Started Date : {data.started_date}</p>
                                    <p>Time : {data.total_hours}</p>
                                </div>
                                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Actual Start Date :<span>{data.started_date}</span></span>
                                    <span>End Date :<span>{data.actual_end_date}</span></span>
                                </div>
                                <div>
                                    <p>Assigned By <a>{data.name}</a>On <a>{data.start_date}</a></p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div style={{ marginTop: '20px' }}>
                                <div className="total_12_div">
                                    <p style={{ display: "flex", justifyContent: 'center', marginBottom: '0px' }}>Total Hours</p>
                                    <p style={{ display: "flex", justifyContent: 'center' }}>{data.total_hours}{data.Priority}</p>
                                </div>
                                <div className="images_div">
                                    <img src={data.Priority == 'High'?H_icon:data.Priority == 'Low'?L_icon:M_icon} style={{ marginRight: '5px', width: '18px',cursor:"pointer"}} onClick={()=>fnPeriority({data})}/>
                                    <DynModel modelTitle={"Task Priority"} handleChangeModel={task_pri_modal} handleChangeCloseModel={(bln) => setTaskPrioriyModal(bln)}  content={<TaskPriority rowData={taskData}/>} width={300}/>
                                    <img src={File} style={{ marginRight: '5px', width: '18px',cursor:"pointer"}} onClick={()=>setTaskTag(true)}/>
                                    <DynModel modelTitle={"Task Tag"} handleChangeModel={task_tag} handleChangeCloseModel={(bln) => setTaskTag(bln)}  content={<TaskTag rowData={data}/>} width={300}/>
                                    <img src={Percentage} style={{ marginRight: '5px', width: '18px' }} onClick={()=>setTaskStatus(true)}/>
                                    <DynModel modelTitle={"Task Completed"} handleChangeModel={task_status} handleChangeCloseModel={(bln) => setTaskStatus(bln)}  content={<TaskStatus rowData={data}/>} width={300}/>
                                    <img src={Order} style={{ marginRight: '5px', width: '18px',cursor: 'pointer' }} onClick={()=>setHearing(true)}/>
                                    <DynModel modelTitle={"Hearing"} handleChangeModel={hearing} handleChangeCloseModel={(bln) => setHearing(bln)}  content={<AddHearing  rowData={data} onhearingclose={()=>setHearing(false)} />} width={1000}/>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                <img src={Star} style={{ margin: '12px' }} />
                                <Divider />
                                <img src={Tick} style={{ margin: '12px' }} />
                            </div>
                        </div>
                    </Card>
                            )

                        })} 
                </div>
                {/* first card end */}

        

                {/* second card */}
                <div className="card_div" style={{ marginTop: '10px' }}>
                {props.getTaskLists.length > 0 && props.getTaskLists.map((data) => {
                    if(data.project_name == null && data.project_type == null)
                return (
                    <Card >
                        <div style={{ display: 'flex', justifyContent: 'space-betwen' }}>
                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                <p className="num_align_side">1</p>
                                <Divider />
                                <img src={Clock} className="img_side_align" onClick={()=>openTimeSheet(true,data)}/>
                                <DynModel modelTitle={"Time Sheettt"} handleChangeModel={startModelOpen} handleChangeCloseModel={(bln) => setStartModelOpen(bln)} content={<TimeSheetView rowData={data}/>} width={1000} />
                            </div>

                            <div style={{ width: '36%', padding: '15px' }}>
                                <p className="adhoc_align">Adhoc</p>
                                <p className="adhoc_align">Task Description</p>
                                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                    <p style={{ marginRight: '10px' }}>Start Date : {data.start_date}</p>
                                    <p>End Date : {data.end_date}</p>
                                </div>
                                <div className="task_bar_align">
                                    <Progress percent={data.perecent_completion} status="active" />
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div style={{ width: '37%' }}>
                                <div className="start_date_yellow">
                                    <p>Started Date : {data.started_date}</p>
                                    <p>Time : {data.total_hours}</p>
                                </div>
                                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Actual Start Date :<span>{data.started_date}</span></span>
                                    <span>End Date :<span>{data.actual_end_date}</span></span>
                                </div>
                                <div>
                                    <p>Assigned By <a>{data.name}</a>On <a>{data.start_date}</a></p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div style={{ marginTop: '20px' }}>
                                <div className="total_12_div">
                                    <p style={{ display: "flex", justifyContent: 'center', marginBottom: '0px' }}>Total Hours</p>
                                    <p style={{ display: "flex", justifyContent: 'center' }}>{data.total_hours}</p>
                                </div>
                                <div className="images_div">
                                    <img src={H_icon} style={{ marginRight: '10px',cursor:"pointer" }} onClick={()=>fnPeriority({data})}/>
                                    <DynModel modelTitle={"Task Priority"} handleChangeModel={task_pri_modal} handleChangeCloseModel={(bln) => setTaskPrioriyModal(bln)}  content={<TaskPriority rowData={taskData}/>} width={300}/>
                                    <img src={File} style={{ marginRight: '10px' }} onClick={()=>setTaskTag(true)}/>
                                    <DynModel modelTitle={"Task Tag"} handleChangeModel={task_tag} handleChangeCloseModel={(bln) => setTaskTag(bln)}  content={<TaskTag rowData={data}/>} width={300}/>
                                    <img src={Percentage} style={{ marginRight: '10px' }} onClick={()=>setTaskStatus(true)}/>
                                    <DynModel modelTitle={"Task Completed"} handleChangeModel={task_status} handleChangeCloseModel={(bln) => setTaskStatus(bln)}  content={<TaskStatus rowData={data}/>} width={300}/>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#707070', width: '55px' }}>
                                <img src={Star} style={{ margin: '12px' }} />
                                <Divider />
                                <img src={Tick} style={{ margin: '12px' }} />
                            </div>
                        </div>
                    </Card>
                    )

                })} 
                </div>
                {/* second card end */}

                <div className="bottom_align">
                    <div className="bottom_div" >
                        <div style={{ width: '50%' }}>
                            <p>Time Utilized</p>
                        </div>
                        <div className="divider_bottom"></div>
                        <div style={{ width: '45%' }}>
                            <p style={{ marginBottom: '0px' }}>This Month</p>
                            <p>247 Hrs</p>
                        </div>
                        <div className="divider_bottom"></div>
                        <div style={{ width: '40%' }}>
                            <p style={{ marginBottom: '0px' }}>This Week</p>
                            <p>47 Hrs</p>
                        </div>
                    </div>
                    <div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={100}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={rowsPerPage}
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
            
            
            
            
        </div>
    )
}

const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    getTaskLists: state.projectTasksReducer.getTaskLists,
    subordinateslis: state.UserMasterReducer.getSubordinates,
});
export default connect(mapStateToProps)(Task);