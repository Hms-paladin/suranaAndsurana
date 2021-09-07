import react, { useState, useEffect } from 'react';
import CustomButton from "../../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import EnhancedTable from '../../../component/DynTable/table';

import './timesheets.scss'
import { useDispatch, connect } from "react-redux";
import { notification } from "antd";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getProjectSubType } from '../../../actions/MasterDropdowns'
import { getProjectWise_TimeSheet } from '../../../actions/TimeSheetAction'
import moment from 'moment';
import TimeSheets from './timesheetStart';
import DynModel from '../../../component/Model/model';
import { Checkbox } from 'antd'
import { update_approve_timesheet, update_submit_timesheet } from "../../../actions/TimeSheetAction";
import { getEmpListDepartment } from '../../../actions/MasterDropdowns';
import Edit from "../../../images/editable.svg";

function ProjectwiseTS(props) {

    let dispatch = useDispatch()
    const [searchRights, setSearchRights] = useState([])
    const [projectList, setprojectList] = useState([])
    const [TimeSheetTable, setTimeSheetTable] = useState([])
    const [timesheetModelOpen, setTimesheetModelOpen] = useState(false)
    const [TimeSheetArr, setTimeSheetArr] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [OnRejectData, setOnRejectData] = useState([])
    const [OnEditData, setOnEditData] = useState([])
    const [ModelClear, setModelClear] = useState(0)

    const [projectSearch, setprojectSearch] = useState({
        emp_name: {
            value: Number(localStorage.getItem("empId")),
            validation: [],
            error: null,
            errmsg: null,
        },
        from_date: {
            value: moment().format('YYYY-MM-DD'),
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        to_date: {
            value: moment().format('YYYY-MM-DD'),
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    })

    function checkValidation(data, key) {
        if (key === "project_type") {
            dispatch(getProjectSubType(data))
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            projectSearch[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: projectSearch[key].validation
        }

        setprojectSearch(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    useEffect(() => {
        if (projectSearch.emp_name.value != "" && projectSearch.from_date.value != "" && projectSearch.to_date.value != "") {
            dispatch(getProjectWise_TimeSheet(projectSearch))
        }
    }, [projectSearch.emp_name.value])

    function selectAll(e) {
        if (e.target.checked === true) {
            TimeSheetArr.map((data, index) => {
                TimeSheetArr[index].editicon = true
            })
        } else {
            TimeSheetArr.map((data, index) => {
                TimeSheetArr[index].editicon = false
            })
        }
        setTrigger(!trigger)

    }

    const headCells = [
        { id: "start_date", label: "Start Date" },
        { id: "start_time", label: "Start Time" },
        { id: "End_date", label: "End Date" },
        { id: "end_time", label: "End Time" },
        { id: "hours", label: "Hours" },
        { id: "actitvity", label: "Activity" },
        { id: "subactivity", label: "Sub Activity" },
        { id: "project_name", label: "project Name" },
        { id: "project_type", label: "Project Type" },
        { id: "client", label: "Client" },
        { id: "status", label: <div style={{ whiteSpace: 'nowrap' }}>Status <Checkbox onClick={(e) => selectAll(e)} /></div> }]

    useEffect(() => {
        dispatch(getEmpListDepartment())
    }, [])

    useEffect(() => {
        let employeeName = []
        props.EmployeeList.map((data) => {
            employeeName.push({ id: data.emp_id, value: data.name })
        })

        setprojectList({ employeeName })
    }, [props.EmployeeList])
    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Timesheet - Search" == val.control
                )
            })
            setSearchRights(data_res_id)

        }

    }, [props.UserPermission]);
    ////////

    const SearchData = () => {

        var mainvalue = {};
        var targetkeys = Object.keys(projectSearch);

        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                projectSearch[targetkeys[i]].value,
                projectSearch[targetkeys[i]].validation
            );
            projectSearch[targetkeys[i]].error = !errorcheck.state;
            projectSearch[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = projectSearch[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter(
            (obj) => projectSearch[obj].error == true
        );
        if (filtererr.length > 0) {
        } else {
            dispatch(getProjectWise_TimeSheet(projectSearch))
        }

    }

    const checkboxClick = (e, index) => {

        if (e.target.checked === true) {
            TimeSheetArr[index].editicon = true
        }
        else {
            TimeSheetArr[index].editicon = false
        }
        setTrigger(!trigger)
    }

    const onReject = (data) => {
        setTimesheetModelOpen(true)
        setOnRejectData([data, projectSearch])
    }

    const onEdit = (data) => {

        setTimesheetModelOpen(true)
        setOnEditData([data, projectSearch])
    }

    useEffect(() => {
        var updatelist = [];
        TimeSheetArr && TimeSheetArr.length > 0 && TimeSheetArr.map((data, index) => {
            let hrs_arr = data.no_of_hrs.split(':')
            var listarray = {
                start_date: (data.start_date === "0000-00-00" || data.start_date === null) ? 0 : moment(data.start_date).format("DD-MM-YYYY"),
                start_time: (data.start_time === "00:00:00" || data.start_time === null) ? 0 : moment(data.start_time, "HH:mm:ss").format("hh:mm A"),
                to_date: (data.end_date === "0000-00-00" || data.end_date === null) ? 0 : moment(data.end_date).format("DD-MM-YYYY"),
                end_time: (data.end_time === "00:00:00" || data.end_time === null) ? 0 : moment(data.end_time, "HH:mm:ss").format("hh:mm A"),
                no_of_hrs: (hrs_arr[0] + ' Hours ' + (hrs_arr[1] ? (',' + hrs_arr[1] + ' minutes') : '')),
                activity: data.activity,
                sub_activity: data.sub_activity,
                project_name: data.project_name,
                project_type: data.project_type,
                client: data.client,
                status: (data.status_submit ? (data.status_submit === "Not Approved" ? (
                    <>    <img src={Edit} className="editImage" onClick={() => onEdit(data)} style={{ cursor: 'pointer' }} />
                        <Checkbox checked={data.editicon ? true : false} onClick={(e) => checkboxClick(e, index)} />
                    </>
                ) : data.status_submit === "Rejected" ? (<label className="RejectLabel" onClick={() => onReject(data)}>Rejected</label>) : data.status_submit) :
                    data.status_appprove && data.status_appprove === "Not Approved" && (
                        <>
                            <Checkbox checked={data.editicon ? true : false} onClick={(e) => checkboxClick(e, index)} />
                        </>
                    )),
            }

            updatelist.push(listarray);
        })
        setTimeSheetTable({ updatelist });

    }, [TimeSheetArr, trigger])

    useEffect(() => {
        setTimeSheetArr(props.Project_TimeSheet)
    }, [props.Project_TimeSheet]);

    const Approve = async (data) => {

        if (TimeSheetArr && TimeSheetArr.length > 0) {

            let data_res_id = TimeSheetArr.find((val) => {
                return (
                    val.editicon && val.editicon === true
                )
            })

            if (!data_res_id) {
                notification.success({
                    message: 'Please select atleast one timesheet',
                });
            } else {
                await dispatch(update_approve_timesheet(TimeSheetArr, data))
                await dispatch(getProjectWise_TimeSheet(projectSearch))

            }
        }
    }
    console.log(ModelClear, "ModelClear")
    const SubmitApprove = async () => {
        if (TimeSheetArr && TimeSheetArr.length > 0) {

            let data_res_id = TimeSheetArr.find((val) => {
                return (
                    val.editicon && val.editicon === true
                )
            })
            // console.log(data_res_id,"data_res_id")

            if (!data_res_id) {
                notification.success({
                    message: 'Please select atleast one timesheet',
                });
            } else {
                await dispatch(update_submit_timesheet(TimeSheetArr))
                await dispatch(getProjectWise_TimeSheet(projectSearch))

            }
        }
    }
    const closeModel = () => {
        setTimesheetModelOpen(false)
        setModelClear(ModelClear + 1)
        setOnRejectData([])
        setOnEditData([])
    }
    return (
        <div>
            <div className="DRtitle">Project Wise Task / Time Sheet</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>

                    {Number(localStorage.getItem("designation_id") )=== 6 && <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee Name</div>
                        <Labelbox type="select"
                            dropdown={projectList.employeeName}
                            changeData={(data) => checkValidation(data, "emp_name")}
                            value={projectSearch.emp_name.value}
                            error={projectSearch.emp_name.error}
                            errmsg={projectSearch.emp_name.errmsg}
                        />
                    </Grid>}

                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">From Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "from_date")}
                            value={projectSearch.from_date.value}
                            error={projectSearch.from_date.error}
                            errmsg={projectSearch.from_date.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">To Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "to_date")}
                            minDate={moment(`${projectSearch.from_date.value && projectSearch.from_date.value} 11: 00: 00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                            value={projectSearch.to_date.value}
                            error={projectSearch.to_date.error}
                            errmsg={projectSearch.to_date.errmsg}
                        />
                    </Grid>
                    <Grid item xs={6} container direction="column" spacing={1}>
                        <div className="projectwise_search_div">
                            <CustomButton btnName={"Search"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_search" onBtnClick={SearchData} />
                        </div>
                    </Grid>
                </Grid>



            </div>

            {/* <div className="DRcollapsecss"> */}
            <div className="leavetableformat">
                <EnhancedTable headCells={headCells} projectwise tabletitle={""} rows={TimeSheetTable.length == 0 ? TimeSheetTable : TimeSheetTable.updatelist} />
            </div>
            {/* </div> */}
            <div className="projectwise_Btn_div">
                {Number(localStorage.getItem("designation_id") )=== 6 && (projectSearch.emp_name.value && projectSearch.emp_name.value !== "") && (Number(localStorage.getItem("empId")) !== projectSearch.emp_name.value && projectSearch.emp_name.value) && <CustomButton btnName={"Reject"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={() => Approve(2)} />}
                {Number(localStorage.getItem("designation_id") )=== 6 && (projectSearch.emp_name.value && projectSearch.emp_name.value !== "") && (Number(localStorage.getItem("empId")) !== projectSearch.emp_name.value && projectSearch.emp_name.value) && <CustomButton btnName={"Approve"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={() => Approve(1)} />}
                {((Number(localStorage.getItem("empId")) === projectSearch.emp_name.value && projectSearch.emp_name.value) || !projectSearch.emp_name.value || projectSearch.emp_name.value === "") && <CustomButton btnName={"Submit For Approval"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={SubmitApprove} />}
                <CustomButton btnName={"Create Timesheet"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={() => setTimesheetModelOpen(true)} />
            </div>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetModelOpen} handleChangeCloseModel={() => closeModel()} content={<TimeSheets project_wise_edit={OnEditData.length > 0 ? OnEditData : undefined} project_wise_reject={OnRejectData.length > 0 ? OnRejectData : undefined} project_wise={(OnRejectData.length === 0 && OnEditData.length === 0) ? projectSearch : undefined} model_clear={ModelClear} close_model={closeModel} />} width={1000} />
         
        </div>

    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    GetSeverance: state.ExitSeverance.GetSeverance,
    EmployeeList: state.getOptions.getEmpListDepartment,
    Project_TimeSheet: state.getTaskList.ProjectWise_TimeSheet

});
export default connect(mapStateToProps)(ProjectwiseTS);