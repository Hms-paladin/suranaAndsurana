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

function ProjectwiseTS(props) {
    const [multiplePanel, setMultiplePanel] = useState([]);
    const [searchRights, setSearchRights] = useState([])
    const { Panel } = Collapse;
    const { Option } = Select;
    let dispatch = useDispatch()
    const [projectList, setprojectList] = useState([])
    const [openPanel, setopenPanel] = useState(0)
    const [minDate, setMinDate] = useState(new Date())
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

        if (key === "fromdate") {
            setMinDate(data)
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
        { id: "planned_sd", label: "Planned StartDate" },
        { id: "planned_ed", label: "Planned EndDate" },
        { id: "actualstart", label: "Actual Start (Date/Time)" },
        { id: "actualend", label: "Actual End (Date/Time)" },
        { id: "tothours", label: "Total Hours" }
    ];


    useEffect(() => {
        dispatch(getEmployeeList())
        dispatch(getProjectType())
        dispatch(getProjectSubType())
        dispatch(getProjectName())
    }, [])
    // useEffect(() => {
    //     let ProjectDetails = []
    //     props.Project_TimeSheet.map((data) => {

    //     })
    // }, [props.Project_TimeSheet])
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
        console.log(projectSearch.length, "len")
        Object.size = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        // Get the size of an object
        var size = Object.size(projectSearch);
        console.log(size, "len")
        if (projectSearch) {
            dispatch(getProjectWise_TimeSheet(projectSearch))
        }

        setprojectSearch({
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
    }

    useEffect(() => {
        console.log(props.Project_TimeSheet, "pD")
        let multipleTab = [];
        let subCollapse = [];
        let otherDataList = []
        props?.Project_TimeSheet?.map((data, i) => {
            let rowDataList = {}
            let sample = {};
            let tableRow1 = [];
            let tableRow = [];
            let tableRow2 = [];
            let tableRow3 = [];
            let tableRow4 = [];
            let tableRow5 = [];
            if (data.project_type_id === 1) {

                sample["Design"] = data.project_details.filter((val) => val?.sub_project_id === 2)
                sample["Patent"] = data.project_details.filter((val) => val?.sub_project_id === 3)
                sample["Trademark"] = data.project_details.filter((val) => val?.sub_project_id === 1)
                sample["Copyright"] = data.project_details.filter((val) => val?.sub_project_id === 4)
                sample["IPABTrademark"] = data.project_details.filter((val) => val?.sub_project_id === 5)
                sample["IPABDesign"] = data.project_details.filter((val) => val?.sub_project_id === 6)

                if (sample?.Design.length > 0) {
                    sample?.Design.map((dat, k) => {
                        let currentData = {}
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.actitvity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`;
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`;
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow1.push(currentData);
                    })

                }
                console.log("filtersfilters", tableRow1)
                sample["Design"] = tableRow1;

                if (sample?.Patent.length > 0) {
                    let currentData = {}
                    sample?.Patent.map((dat, k) => {
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.actitvity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow2.push(currentData);
                    })
                }
                console.log("filtersfilters", tableRow2)
                sample["Patent"] = tableRow2;

                if (sample?.Trademark.length > 0) {
                    let currentData = {}
                    sample?.Trademark.map((dat, k) => {
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.activity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow.push(currentData);
                    })
                }
                console.log("filtersfilters", tableRow)
                sample["Trademark"] = tableRow;

                if (sample?.Copyright.length > 0) {
                    let currentData = {}
                    sample?.Copyright.map((dat, k) => {
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.actitvity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow3.push(currentData);
                    })
                }
                console.log("filtersfilters", tableRow3)
                sample["Copyright"] = tableRow3;

                if (sample?.IPABTrademark.length > 0) {
                    let currentData = {}
                    sample?.IPABTrademark.map((dat, k) => {
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.actitvity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow4.push(currentData);
                    })
                }
                console.log("filtersfilters", tableRow4)
                sample["IPABTrademark"] = tableRow4;

                if (sample?.IPABDesign.length > 0) {
                    let currentData = {}
                    sample?.IPABDesign.map((dat, k) => {
                        currentData["empName"] = dat.name;
                        currentData["actitvity"] = dat.actitvity;
                        currentData["subactivity"] = dat.sub_activity;
                        currentData["planned_sd"] = `${moment(dat?.start_date).format('DD-MMM-YYYY')}`
                        currentData["planned_ed"] = `${moment(dat?.end_date).format('DD-MMM-YYYY')}`
                        currentData["actualstart"] = `${moment(dat?.actual_start_date).format('DD-MMM-YYYY')}(${dat?.start_time})`
                        currentData["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                        currentData["tothours"] = dat.no_of_hrs;
                        tableRow5.push(currentData);
                    })
                }
                console.log("filtersfilters", tableRow5)
                sample["IPABDesign"] = tableRow5;

                console.log("filtersfilterssample", sample)
                for (let [index, [key, value]] of Object.entries(Object.entries(sample))) {
                    console.log("tttttttttttttttttt", key);
                    subCollapse.push(
                        <Panel
                            header={`${key} (${value.length})`}
                            key={index + 1}
                        >

                            <EnhancedTable
                                headCells={
                                    headCells
                                }
                                rows={value}
                                tabletitle={""}
                            />
                        </Panel>
                    )

                }
                multipleTab.push(
                    <Panel
                        header={`${data.project_type} (${data?.project_details?.length})`}
                        key={i + 1}
                    >
                        <Collapse>{subCollapse}</Collapse>

                    </Panel>
                );
            } else if (data.project_type_id !== 1) {
                data.project_details.map((dat, k) => {
                    console.log(dat, "level2-else")
                    rowDataList["empName"] = dat.name;
                    rowDataList["actitvity"] = dat.actitvity;
                    rowDataList["subactivity"] = dat.sub_activity;
                    rowDataList["planned_sd"] = `${moment(dat.start_date).format('DD-MMM-YYYY')}`
                    rowDataList["planned_ed"] = `${moment(dat.end_date).format('DD-MMM-YYYY')}`
                    rowDataList["actualstart"] = `${moment(dat.actual_start_date).format('DD-MMM-YYYY')}(${dat.start_time})`
                    rowDataList["actualend"] = `${moment(dat.actual_end_date).format('DD-MMM-YYYY')}(${dat.end_time})`;
                    rowDataList["tothours"] = dat.no_of_hrs;
                    otherDataList.push(rowDataList)
                    multipleTab.push(
                        <Panel
                            header={`${data.project_type} (${data?.project_details?.length})`}
                            key={i + 1}
                        >
                            <EnhancedTable
                                headCells={
                                    headCells
                                }
                                rows={otherDataList}

                            />
                        </Panel>
                    );
                })
            }
        })
        setMultiplePanel(multipleTab);
    }, [props.Project_TimeSheet]);

    console.log(props.Project_TimeSheet, "PD")
    return (
        <div>

            <div className="DRtitle">Project Wise Task or Time Sheet</div>
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
                    {/* <Grid item xs={2} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee Name</div>
                        <Labelbox type="select"
                            dropdown={projectList.employeeName}
                            changeData={(data) => checkValidation(data, "emp_name")}
                            value={projectSearch.emp_name.value}
                            error={projectSearch.emp_name.error}
                            errmsg={projectSearch.emp_name.errmsg}
                        />
                    </Grid> */}
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
                            minDate={moment(`${projectSearch.from_date.value && projectSearch.from_date.value} 11: 00: 00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
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