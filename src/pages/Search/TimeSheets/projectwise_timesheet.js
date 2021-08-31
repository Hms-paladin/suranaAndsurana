import react, { useState, useEffect } from 'react';
import CustomButton from "../../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import EnhancedTable from '../../../component/DynTable/table';
import { useParams, Link } from 'react-router-dom';
import { Collapse } from 'antd';
import { Select } from 'antd';
import './timesheets.scss'
import { useDispatch, connect } from "react-redux";
import { notification } from "antd";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getEmployeeList, getProjectType, getProjectSubType, getProjectName } from '../../../actions/MasterDropdowns'
import { getProjectWise_TimeSheet } from '../../../actions/TimeSheetAction'
import moment from 'moment';
import TimeSheets from './timesheetStart';
import DynModel from '../../../component/Model/model';
import { Checkbox } from 'antd'
import { update_approve_timesheet } from "../../../actions/TimeSheetAction";

function ProjectwiseTS(props) {
    const [multiplePanel, setMultiplePanel] = useState([]);
    const [searchRights, setSearchRights] = useState([])
    const { Panel } = Collapse;
    const { Option } = Select;
    let dispatch = useDispatch()
    const [projectList, setprojectList] = useState([])
    const [TimesheetTable, setTimesheetTable] = useState({});
    const [SendTimesheet, setSendTimesheet] = useState({});
    const [minDate, setMinDate] = useState(new Date())
    const [timesheetModelOpen, setTimesheetModelOpen] = useState(false)
    const [checked, setchecked] = useState({})
    const [projectSearch, setprojectSearch] = useState({
        emp_name: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        from_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        to_date: {
            value: "",
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

        if (key === "emp_name"&&projectSearch.from_date.value!=""&&projectSearch.to_date.value!="") {
            dispatch(getProjectWise_TimeSheet(projectSearch,data))
        }

        if (key === "start_date") {
            setMinDate(data)
        }
        setprojectSearch(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };



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
        { id: "status", label: "Status" }]

    useEffect(() => {
        dispatch(getEmployeeList())
    }, [])

    useEffect(() => {
        let employeeName = []
        let Project_type = []
        let Project_Sub_type = []
        let project_name = []
        props.EmployeeList.map((data) => {
            employeeName.push({ id: data.emp_id, value: data.name })
        })

        setprojectList({ employeeName })
    }, [props.EmployeeList, props.ProjectType, props.SubProjectType, props.Project_name])
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
        setMultiplePanel()
        // Object.size = function (obj) {
        //     var size = 0,
        //         key;
        //     for (key in obj) {
        //         if (obj.hasOwnProperty(key)) size++;
        //     }
        //     return size;
        // };

        // // Get the size of an object
        // var size = Object.size(projectSearch);
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

    const handlecheck = (e) => {

        setchecked({ ...checked, [e.target.name]: e.target.checked })

        setchecked(prevState => ({
            ...prevState,
        }))

    }

    useEffect(() => {
        var updatelist = [];
        var updatelist1 = [];
        props.Project_TimeSheet && props.Project_TimeSheet.length > 0 && props.Project_TimeSheet.map((data, index) => {
            // checked['time_' + data.timesheet_id];
            // setchecked({ ...checked, ['time_' + data.timesheet_id]: data.timesheet_id })
            var listarray = {};
            // if (localStorage.getItem("designation") === '"HoD"')
            //     listarray.emp_name = data.name

            listarray.start_date = (data.start_date === "0000-00-00" || data.start_date === null) ? 0 : moment(data.start_date).format("DD-MM-YYYY");
            listarray.start_time = (data.start_time === "00:00:00" || data.start_time === null) ? 0 : moment(data.start_time, "HH:mm:ss").format("hh:mm A");
            listarray.to_date = (data.end_date === "0000-00-00" || data.end_date === null) ? 0 : moment(data.end_date).format("DD-MM-YYYY");
            listarray.end_time = (data.end_time === "00:00:00" || data.end_time === null) ? 0 : moment(data.end_time, "HH:mm:ss").format("hh:mm A");
            listarray.no_of_hrs = data.no_of_hrs;
            listarray.activity = data.activity;
            listarray.sub_activity = data.sub_activity;
            listarray.project_name = data.project_name;
            listarray.project_type = data.project_type;
            listarray.client = data.client;
            listarray.status = data.status === "Not Approved" ? (
                <>
                    <Checkbox checked={checked['time_' + data.timesheet_id]} onChange={handlecheck} name={'time_' + data.timesheet_id} value={data.timesheet_id} />
                </>
            ) : data.status;

            updatelist.push(listarray);
            if (checked['time_' + data.timesheet_id]) {
                var listarray1 = {};
                listarray1.timesheet_id = data.timesheet_id
                listarray1.start_date = data.start_date;
                listarray1.start_time = data.start_time;
                listarray1.end_date = data.end_date;
                listarray1.end_time = data.end_time;
                listarray1.editicon = true
                updatelist1.push(listarray1);
            }
        })
        setTimesheetTable(updatelist);
        setSendTimesheet(updatelist1);

    }, [props.Project_TimeSheet, checked])

    console.log(TimesheetTable,SendTimesheet, "SendTimesheet")

    const Approve = () => {
        if (TimesheetTable && TimesheetTable.length > 0) {
            // let data_res_id = [checked].find((val) => {
            //     return (
            //         val
            //     )
            // })
            // console.log(data_res_id, "data_res_id")

            if (SendTimesheet && SendTimesheet.length === 0) {
                notification.success({
                    message: 'Please select atleast one timesheet',
                });
            } else {
                dispatch(update_approve_timesheet(SendTimesheet)).then(() => {
                    dispatch(getProjectWise_TimeSheet(projectSearch))
                })
            }
        }
    }
    return (
        <div>
            <div className="DRtitle">Project Wise Task / Time Sheet</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>

                    {localStorage.getItem("designation") === '"HoD"' && <Grid item xs={2} container direction="column" spacing={1}>
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
                <EnhancedTable headCells={headCells} projectwise tabletitle={""} rows={TimesheetTable.length == 0 ? TimesheetTable : TimesheetTable} />
            </div>
            {/* </div> */}
            <div className="projectwise_Btn_div">

                {localStorage.getItem("designation") === '"HoD"' && (projectSearch.emp_name.value && projectSearch.emp_name.value !== "" )&& <CustomButton btnName={"Approve"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={Approve} />}
                {(!projectSearch.emp_name.value || projectSearch.emp_name.value === "") && <CustomButton btnName={"Submit For Approval"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={SearchData} />}
                <CustomButton btnName={"Create Timesheet"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="projectwise_btn" onBtnClick={() => setTimesheetModelOpen(true)} />
            </div>
            <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetModelOpen} handleChangeCloseModel={(bln) => setTimesheetModelOpen(bln)} content={<TimeSheets project_wise close_model={() => setTimesheetModelOpen(false)} />} width={1000} />
        </div>

    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    GetSeverance: state.ExitSeverance.GetSeverance,
    EmployeeList: state.getOptions.getEmployeeList,
    Project_TimeSheet: state.getTaskList.ProjectWise_TimeSheet

});
export default connect(mapStateToProps)(ProjectwiseTS);