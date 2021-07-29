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


function ProjectwiseTS(props) {
    const [multiplePanel, setMultiplePanel] = useState([]);
    const [searchRights, setSearchRights] = useState([])
    const { Panel } = Collapse;
    const { Option } = Select;
    let dispatch = useDispatch()
    const [projectList, setprojectList] = useState([])
    const [openPanel, setopenPanel] = useState(0)
    const [projectSearch, setprojectSearch] = useState({
        proj_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        emp_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        project_type: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        project_subtype: {
            value: "",
            validation: [{ name: "required" }],
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
        setprojectSearch(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    const empname = "Employee Name";
    const headCells = [
        { id: "empName", label: "Employee Name" },
        { id: "actitvity", label: "Activity" },
        { id: "subactivity", label: "Sub Activity" },
        { id: "startdate", label: "Start date" },
        { id: "planned_sd", label: "Planned start date" },
        { id: "planned_ed", label: "Planned end date" },
        { id: "actualstart", label: "Actual start (date/time)" },
        { id: "actualend", label: "Actual end (date/time)" },
        { id: "tothours", label: "Total hours" }
    ];
    const getRows = [
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "23hr" },
        { activity: <Link to=""><div className="ProjectTaskId">Hearing</div></Link>, subactivity: "Non-Effective", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "22hr" },
    ];
    const getDesignRows = [
        { activity: <Link to=""><div className="ProjectTaskId">Application Filing</div></Link>, subactivity: "Sub-activity 1", startdate: "11-05-2021", planned_sd: "10-05-2021", planned_ed: "15-05-2021", actualstart: "12-05-2021/9:00", actualend: "13-05-2021/9:00", tothours: "23hr" },
    ];
    useEffect(() => {
        dispatch(getEmployeeList())
        dispatch(getProjectType())
        dispatch(getProjectSubType())
        dispatch(getProjectName())
    }, [])
    useEffect(() => {
        let ProjectDetails = []
        props.Project_TimeSheet.map((data) => {

        })
    }, [props.Project_TimeSheet])
    useEffect(() => {
        let employeeName = []
        let Project_type = []
        let Project_Sub_type = []
        let project_name = []
        props.EmployeeList.map((data) => {
            employeeName.push({ id: data.emp_id, value: data.name })
        })
        props.ProjectType.map((data) => {
            Project_type.push({ id: data.project_type_id, value: data.project_type })
        })
        props.SubProjectType.map((data) => {
            Project_Sub_type.push({ id: data.sub_project_type_id, value: data.sub_project_type })
        })
        props.Project_name.map((data) => {
            project_name.push({ id: data.project_id, value: data.project_name })
        })
        setprojectList({ employeeName, Project_type, Project_Sub_type, project_name })
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
        console.log(projectSearch.to_date.value, "ps")
        // check the dates
        if (new Date(projectSearch.from_date.value) < new Date(projectSearch.to_date.value)) {
            dispatch(getProjectWise_TimeSheet(projectSearch))
        } else if (new Date(projectSearch.from_date.value) > new Date(projectSearch.to_date.value)) {
            notification.error({
                message: "Invalid From date and To date",
            });
        } else {
            dispatch(getProjectWise_TimeSheet(projectSearch))
        }
    }



    function callback(key) {
        console.log(key);
    }

    useEffect(() => {
        console.log(props.Project_TimeSheet, "pD")

        let multipleTab = [];
        let subCollapse = [];
        let ipProjectDataList = [];

        console.log(ipProjectDataList, "ip")
        props?.Project_TimeSheet?.map((data, index) => {
            data?.project_details?.map((data, index) => {
                subCollapse.push(
                    <Panel
                        header={`${data?.sub_project_type}-${data?.project_name}`}
                        key={index + 1}
                    >
                        <EnhancedTable
                            headCells={
                                headCells
                            }
                            rows={[
                                {
                                    "empName": data.name,
                                    "actitvity": data.activity,
                                    "subactivity": data.sub_activity,
                                    "startdate": data.start_date,
                                    "planned_sd": data.process,
                                    "planned_ed": data.filing_type,
                                    "actualstart": data.actual_start_date,
                                    "actualend": data.actual_end_date,
                                    "tothours": data.no_of_hrs,
                                }
                            ]}

                        />
                    </Panel>
                )

            })
        })

        props.Project_TimeSheet.map((data, index) => {
            console.log(props.Project_TimeSheet, "project_detailsproject_details")
            multipleTab.push(
                <Panel
                    header={`${data.project_type} (${data?.project_details?.length})`}
                    key={index + 1}
                >
                    {data?.project_type_id === 1 ? <Collapse>{subCollapse}</Collapse> : ""}

                    {data?.project_details && data?.project_details?.map((data, index) => {
                        var rowdataListobj = {};
                        if (data.project_type_id !== 1) {
                            rowdataListobj["empName"] = data.name;
                            rowdataListobj["actitvity"] = data.activity;
                            rowdataListobj["subactivity"] = data.sub_activity;
                            rowdataListobj["startdate"] = data.start_date;
                            rowdataListobj["planned_sd"] = data.process;
                            rowdataListobj["planned_ed"] = data.filing_type;
                            rowdataListobj["actualstart"] = data.actual_start_date;
                            rowdataListobj["actualend"] = data.actual_end_date;
                            rowdataListobj["tothours"] = data.no_of_hrs;
                        }
                        ipProjectDataList.push(rowdataListobj);
                    })}

                    {data?.project_details?.length && data?.project_type_id !== 1 ? <EnhancedTable
                        headCells={
                            headCells
                        }
                        rows={[
                            {
                                "empName": data.name,
                                "actitvity": data.activity,
                                "subactivity": data.sub_activity,
                                "startdate": data.start_date,
                                "planned_sd": data.process,
                                "planned_ed": data.filing_type,
                                "actualstart": data.actual_start_date,
                                "actualend": data.actual_end_date,
                                "tothours": data.no_of_hrs,
                            }
                        ]}
                        tabletitle={""}
                    /> : ""}
                </Panel>
            );
        })
        setMultiplePanel(multipleTab);
    }, [props.Project_TimeSheet]);

    console.log(props.Project_TimeSheet, "PD")
    return (
        <div>

            <div className="DRtitle">Project Wise Time Sheet - {empname}</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project Name</div>
                        <Labelbox type="select"
                            dropdown={projectList.project_name}
                            changeData={(data) => checkValidation(data, "proj_name")}
                            value={projectSearch.proj_name.value}
                            error={projectSearch.proj_name.error}
                            errmsg={projectSearch.proj_name.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee Name</div>
                        <Labelbox type="select"
                            dropdown={projectList.employeeName}
                            changeData={(data) => checkValidation(data, "emp_name")}
                            value={projectSearch.emp_name.value}
                            error={projectSearch.emp_name.error}
                            errmsg={projectSearch.emp_name.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project Type</div>
                        <Labelbox type="select"
                            dropdown={projectList.Project_type}
                            changeData={(data) => checkValidation(data, "project_type")}
                            value={projectSearch.project_type.value}
                            error={projectSearch.project_type.error}
                            errmsg={projectSearch.project_type.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Project Sub Type</div>
                        <Labelbox type="select"
                            dropdown={projectList.Project_Sub_type}
                            changeData={(data) => checkValidation(data, "project_subtype")}
                            value={projectSearch.project_subtype.value}
                            error={projectSearch.project_subtype.error}
                            errmsg={projectSearch.project_subtype.errmsg}
                        />
                    </Grid>
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
                            value={projectSearch.to_date.value}
                            error={projectSearch.to_date.error}
                            errmsg={projectSearch.to_date.errmsg}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"} btnDisable={!searchRights || searchRights.display_control && searchRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
                    </Grid>
                </Grid>
            </div>
            <div className="DRcollapsecss">

                <Collapse>
                    {multiplePanel}
                </Collapse>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
        GetSeverance: state.ExitSeverance.GetSeverance,
        EmployeeList: state.getOptions.getEmployeeList,
        ProjectType: state.getOptions.getProjectType,
        SubProjectType: state.getOptions.getProjectSubType,
        Project_name: state.getOptions.getProjectName,
        Project_TimeSheet: state.getTaskList.ProjectWise_TimeSheet

    });
export default connect(mapStateToProps)(ProjectwiseTS);