import React, { useRef, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from '../../component/DynTable/table';
import { Collapse } from 'antd';
import './dayreport.scss'
import ValidationLibrary from "../../helpers/validationfunction";
import moment from 'moment';
import { getDayReport_TimeSheet, insert_day_report_reassign } from '../../actions/TimeSheetAction'
import { getEmployeeByDepartment } from '../../actions/ProjectformAction'
import {
    getEmpListDepartment
} from "../../actions/MasterDropdowns";
import DynModel from '../../component/Model/model';
import Reassign from "../../images/Reassign.svg";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
import "./ComponentToprint.css";

function DayReport(props) {
    const { Panel } = Collapse;
    let dispatch = useDispatch()
    const componentRef = useRef();
    const [saveRights, setSaveRights] = useState([])
    const [TableData, setTableData] = useState([]);
    const [projectList, setprojectList] = useState([])
    const [confirmmodel, setConfirmModel] = useState(false);
    const [dayReportSearch, setdayReportSearch] = useState({
        dates: {
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
        select_task_id: {
            value: 0,
        },
        emp_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        day_report_type: {
            value: "1",
            error: null,
            errmsg: null,
        }
    })


    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Day Report - Save" == val.control
                )
            })
            setSaveRights(data_res_id)


        }

    }, [props.UserPermission]);
    ////////

    useEffect(() => {
        // dispatch(getDepartment());
        dispatch(getEmpListDepartment())
    }, [])

    //Check validation
    function checkValidation(data, key) {
        if (key === "dept_name") {
            dispatch(getEmployeeByDepartment(data))
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            dayReportSearch[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: dayReportSearch[key].validation
        }

        setdayReportSearch(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    //API DISPATCH
    const SearchData = () => {
        Object.size = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        // Get the size of an object
        var size = Object.size(dayReportSearch);
        if (dayReportSearch) {
            dispatch(getDayReport_TimeSheet(dayReportSearch))
        }

    }

    //For page render dropdowns
    useEffect(() => {
        let empList = []

        props.EmployeeList.map((data) => {
            empList.push({ id: data.emp_id, value: data.name })
        })
        setprojectList({ empList })
    }, [props.EmployeeList])


    const headCellsDayEnd = [
        { id: "surana_case_no", label: "Internal Case No." },
        { id: "last_day_outcome", label: "Last Hearing Date Outcome" },
        { id: "last_attended_counsel", label: "Last Attended Counsel Name" },
        { id: "court_no", label: "Case Number" },
        { id: "court", label: "Court" },
        { id: "filing_type", label: "Filing Type" },
        { id: "our_client_vs_other_party", label: "Client Vs. Other Party" },
        { id: "last_heard", label: "Last Heard Date" },
        { id: "counsel", label: "Counsel to be assigned for the day" },
        { id: "days_outcome", label: "Days Outcome" },
        { id: "next_hearing", label: "Next Hearing Date" },
        { id: "adjournment", label: "Adjournment By COURT       By SELF           By OTHER PARTY" },
        { id: "reason_comments", label: "Reason / Comments" },
        { id: "action_to_be_taken", label: "Action to be Taken" },
        { id: "due_date", label: "Due Date" },
        { id: "given_by", label: "Given by" },
    ];

    const headCellsDayBegin = [
        { id: "surana_case_no", label: "Internal Case No." },
        { id: "last_day_outcome", label: "Last Hearing Date Outcome" },
        { id: "counsel", label: "Last Attended Counsel Name" },
        { id: "court_no", label: "Case Number" },
        { id: "court", label: "Court" },
        { id: "filling_type", label: "Filing Type" },
        { id: "our_client_vs_other_party", label: "Client Vs. Other Party" },
        { id: "last_heard", label: "Last Heard" },
        { id: "reassign", label: "Counsel  to be assigned for the day" },
    ];
    ////Define collapse types based on project types (ID)
    useEffect(() => {
        let rowDataList = []
        props?.dayReport?.map((data) => {
            if (dayReportSearch?.day_report_type?.value === '1') {
                rowDataList.push({
                    surana_case_no: data.internal_case_no,
                    last_day_outcome: data.hearing_outcome,
                    last_counsel: data.last_attend_councel_name,
                    court_no: data.court_case_no,
                    court: data.court,
                    filing_type: data.filing_type,
                    our_client_vs_other_party: data.client + ' vs ' + data.other_party,
                    last_heard: data.last_hearing_date && moment(data.last_hearing_date).format("DD-MMM-YYYY"),
                    reassign: <><img src={Reassign} alt="Reassign" onClick={() => reassign_model_open(data)} className="Reassign_Img" /> {data.assignee}</>,
                })
            }
            else if (dayReportSearch?.day_report_type?.value === '2') {
                rowDataList.push({
                    surana_case_no: data.internal_case_no,
                    last_day_outcome: '',
                    last_counsel: data.last_attend_councel_name,
                    court_no: data.court_case_no,
                    court: data.court,
                    filing_type: data.filing_type,
                    our_client_vs_other_party: data.client + ' vs ' + data.other_party,
                    last_heard: data.last_hearing_date && moment(data.last_hearing_date).format("DD-MMM-YYYY"),
                    counsel: data.assignee,
                    days_outcome: data.hearing_outcome,
                    next_hearing: data.next_hearing_date && moment(data.next_hearing_date).format("DD-MMM-YYYY"),
                    adjournment: data.adjournment_taken_by,
                    reason: data.reason,
                    action_to_be_taken: data.action_to_be_taken,
                    due_date: data.due_date,
                    given_by: '',
                })
            }
            return true;
        })

        setTableData({ rowDataList })
    }, [props.dayReport, dayReportSearch?.day_report_type?.value]);

    const reassign_model_open = (data) => {
        dayReportSearch.select_task_id.value = data.task_id
        setConfirmModel(true)
    }
    const reassign_task_assignee = async () => {
        await dispatch(insert_day_report_reassign(dayReportSearch))
        setConfirmModel(false)
    }
    
    return (
        <div>
            <div className="DRtitle">Day Report</div>
            <Labelbox type="radio"
                changeData={(data) => checkValidation(data, "day_report_type")}
                options={[
                    { name: "Day Begin", value: 1 },
                    { name: "Day End", value: 2 },
                ]}
                value={dayReportSearch?.day_report_type?.value}
                error={dayReportSearch?.day_report_type?.error}
                errmsg={dayReportSearch?.day_report_type?.errmsg}
            />
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "dates")}
                            value={dayReportSearch?.dates?.value}
                            error={dayReportSearch?.dates?.error}
                            errmsg={dayReportSearch?.dates?.errmsg}
                            disableFuture={dayReportSearch?.day_report_type?.value === '2' ? true : false}
                            disablePast={dayReportSearch?.day_report_type?.value === '1' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
                    </Grid>
                </Grid>
            </div>
            <div className="DRcollapsecss">
                <EnhancedTable headCells={dayReportSearch?.day_report_type?.value === '1' ? headCellsDayBegin : headCellsDayEnd}
                    rows={TableData.length === 0 ? TableData : TableData.rowDataList} />
            </div>


            <ReactToPrint
                trigger={() => <div className="printBtn">  <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                    <CustomButton btnName={"Print"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
                </Grid></div>}
                content={() => componentRef.current}
            // onAfterPrint={()=>setProductDetails([])}
            />
            <div style={{ display: 'none' }} ><ComponentToPrint ref={componentRef} productDetails={TableData.length === 0 ? TableData : TableData.rowDataList} /></div>
            <DynModel
                modelTitle={"Reassign"}
                handleChangeModel={confirmmodel}
                handleChangeCloseModel={(bln) => setConfirmModel(bln)}
                content={
                    <div style={{ textAlign: '-webkit-center' }}>
                        <div>
                            <Grid item xs={10} container direction="column">
                                <div className="TThead">Employee</div>
                                <Labelbox type="select"
                                    dropdown={projectList?.empList}
                                    changeData={(data) => checkValidation(data, "emp_name")}
                                    placeholder={"Employee"}
                                    value={dayReportSearch.emp_name.value}
                                    error={dayReportSearch.emp_name.error}
                                    errmsg={dayReportSearch.emp_name.errmsg}
                                    disabled={dayReportSearch.emp_name.disabled}
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
    UserPermission: state.UserPermissionReducer.getUserPermission || [],
    dayReport: state.getTaskList.dayReportSearch || [],
    EmployeeList: state.getOptions.getEmpListDepartment || [],
    getDepartment: state.getOptions.getDepartment || [],
});
export default connect(mapStateToProps)(DayReport);