import React, { useRef,useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from '../../component/DynTable/table';
import { Link } from 'react-router-dom';
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
        select_task_id: {
            value: 0,

        },
        emp_name: {
            value: "",
            validation: [{ name: "required" }],
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

        // setdayReportSearch({
        //     curr_date: {
        //         value: "",
        //         validation: [{ name: "required" }],
        //         error: null,
        //         errmsg: null,
        //     },
        //     dept_name: {
        //         value: "",
        //         validation: [{ name: "required" }],
        //         error: null,
        //         errmsg: null,
        //     },
        //     emp_name: {
        //         value: "",
        //         validation: [{ name: "required" }],
        //         error: null,
        //         errmsg: null,
        //     }
        // })
    }

    //For page render dropdowns
    useEffect(() => {
        // let department = []
        let empList = []

        // props.getDepartment.map((data) => {
        //     department.push({ id: data.department_id, value: data.department })
        // })
        props.EmployeeList.map((data) => {
            empList.push({ id: data.emp_id, value: data.name })
        })
        setprojectList({ empList })
    }, [props.EmployeeList])


    const headCells = [
        { id: "surana_case_no", label: "Surana Case No." },
        { id: "court_no", label: "Case No." },
        { id: "court", label: "Court" },
        { id: "our_client_vs_other_party", label: "Our Client vs Other Party" },
        { id: "last_heard", label: "Last Heard" },
        { id: "counsel", label: "Counsel" },
        { id: "days_outcome", label: "Day's Outcome" },
        { id: "next_hearing", label: "Next Hearing" },
        { id: "action_to_be_taken", label: "Action to be Taken" },
        { id: "person_responsible", label: "Person Responsible" },
        { id: "due_date", label: "Due Date" },
        { id: "reassign", label: "Reassign" },
    ];
    ////Define collapse types based on project types (ID)
    useEffect(() => {
        // let multipleTab = [];
        // props?.dayReport?.map((data, i) => {
        let rowDataList = []
        props?.dayReport?.map((data, index) => {
            rowDataList.push({

                surana_case_no: data.internal_case_no,
                court_no: data.court_case_no,
                court: data.court,
                our_client_vs_other_party: data.client + ' vs ' + data.other_party,
                last_heard: data.hearing_date&&moment(data.hearing_date).format("DD-MMM-YYYY"),
                counsel: data.assignee,
                days_outcome: data.hearing_outcome,
                next_hearing: data.due_date&&moment(data.due_date).format("DD-MMM-YYYY"),
                action_to_be_taken: data.action_to_be_taken,
                person_responsible: data.person_responsible,
                due_date: data.due_date,
                reassign: <img src={Reassign} onClick={() => reassign_model_open(data)} className="Reassign_Img" />
            })
        })

        setTableData({ rowDataList })
        // })
        // setTableData()
    }, [props.dayReport]);
    const reassign_model_open = (data) => {
        dayReportSearch.select_task_id.value = data.task_id
        setConfirmModel(true)
    }
    const reassign_task_assignee = async () => {
        await dispatch(insert_day_report_reassign(dayReportSearch))
        setConfirmModel(false)
    }
    // useEffect(() => {

    //     let multipleTab = [];
    //     let subCollapse = [];
    //     let checkDupliactesProjectIds = [];
    //     props?.dayReport?.map((data, i) => {
    //         let rowDataList = {}
    //         let sample = {};
    //         let tableRow1 = [];
    //         let tableRow = [];
    //         let tableRow2 = [];
    //         let tableRow3 = [];
    //         let tableRow4 = [];
    //         let tableRow5 = [];
    //         checkDupliactesProjectIds?.push(data.project_type_id)
    //         if (data.project_type_id === 1) {

    //             sample["Design"] = data.project_details.filter((val) => val?.sub_project_id === 2)
    //             sample["Patent"] = data.project_details.filter((val) => val?.sub_project_id === 3)
    //             sample["Trademark"] = data.project_details.filter((val) => val?.sub_project_id === 1)
    //             sample["Copyright"] = data.project_details.filter((val) => val?.sub_project_id === 4)
    //             sample["IPABTrademark"] = data.project_details.filter((val) => val?.sub_project_id === 5)
    //             sample["IPABDesign"] = data.project_details.filter((val) => val?.sub_project_id === 6)

    //             if (sample?.Design.length > 0) {
    //                 sample?.Design.map((dat, k) => {
    //                     let currentData = {}
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow1.push(currentData);
    //                 })

    //             }
    //             if (tableRow1.length) {
    //                 sample["Design"] = tableRow1;
    //             }

    //             if (sample?.Patent.length > 0) {
    //                 let currentData = {}
    //                 sample?.Patent.map((dat, k) => {
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow2.push(currentData);
    //                 })
    //             }
    //             if (tableRow2.length) {
    //                 sample["Patent"] = tableRow2;
    //             }


    //             if (sample?.Trademark.length > 0) {
    //                 let currentData = {}
    //                 sample?.Trademark.map((dat, k) => {
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow.push(currentData);
    //                 })
    //             }
    //             if (tableRow.length) {
    //                 sample["Trademark"] = tableRow;
    //             }

    //             if (sample?.Copyright.length > 0) {
    //                 let currentData = {}
    //                 sample?.Copyright.map((dat, k) => {
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow3.push(currentData);
    //                 })
    //             }
    //             if (tableRow3.length) {
    //                 sample["Copyright"] = tableRow3;
    //             }


    //             if (sample?.IPABTrademark.length > 0) {
    //                 let currentData = {}
    //                 sample?.IPABTrademark.map((dat, k) => {
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow4.push(currentData);
    //                 })
    //             }
    //             if (tableRow4.length) {
    //                 sample["IPABTrademark"] = tableRow4;
    //             }

    //             if (sample?.IPABDesign.length > 0) {
    //                 let currentData = {}
    //                 sample?.IPABDesign.map((dat, k) => {
    //                     let aEndDate = dat.actual_end_date;
    //                     let endDate = dat.end_date;
    //                     currentData["actitvity"] = dat.activity;
    //                     currentData["subactivity"] = dat.sub_activity;
    //                     currentData["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                     currentData["by"] = dat.assigned_name;;
    //                     currentData["tag"] = dat.tag
    //                     tableRow5.push(currentData);
    //                 })
    //             }
    //             if (tableRow5.length) {
    //                 sample["IPABDesign"] = tableRow5;

    //             }
    //             for (let [index, [key, value]] of Object.entries(Object.entries(sample))) {
    //                 subCollapse.push(
    //                     value.length &&
    //                     <Panel
    //                         header={`${key} (${value.length})`}
    //                         key={index + 1}
    //                     >

    //                         <EnhancedTable
    //                             headCells={
    //                                 headCells
    //                             }
    //                             rows={value}
    //                             tabletitle={""}
    //                         />
    //                     </Panel>
    //                 )

    //             }
    //             multipleTab.push(
    //                 <Panel
    //                     header={`${data.project_type} (${data?.project_details?.length})`}
    //                     key={i + 1}
    //                 >
    //                     <Collapse>{subCollapse}</Collapse>

    //                 </Panel>
    //             );
    //         } else if ((data.project_type_id !== 1) && (checkDupliactesProjectIds[i] == data.project_type_id)) {
    //             let otherDataList = []
    //             data.project_details.length && data.project_details.map((dat, k) => {
    //                 let aEndDate = dat.actual_end_date;
    //                 let endDate = dat.end_date;
    //                 rowDataList["actitvity"] = dat.activity;
    //                 rowDataList["subactivity"] = dat.sub_activity;
    //                 rowDataList["completion"] = aEndDate > endDate ? "DELYED" : aEndDate <= endDate ? "ON TIME" : "DELAYED";
    //                 rowDataList["by"] = dat.assigned_name;;
    //                 rowDataList["tag"] = dat.tag
    //                 otherDataList.push(rowDataList)

    //             })
    //             multipleTab.push(
    //                 data?.project_details?.length &&
    //                 <Panel
    //                     header={`${data.project_type} (${data?.project_details?.length})`}
    //                     key={i + 1}
    //                 >
    //                     <EnhancedTable
    //                         headCells={
    //                             headCells
    //                         }
    //                         rows={otherDataList}

    //                     />
    //                 </Panel>
    //             );
    //         }
    //         setMultiplePanel(multipleTab);
    //     })

    // }, [props.dayReport]);




    return (
        <div>
            <div className="DRtitle">Day Report</div>
            <div className="DayReportContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">From</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "from_date")}
                            value={dayReportSearch?.from_date?.value}
                            error={dayReportSearch?.from_date?.error}
                            errmsg={dayReportSearch?.from_date?.errmsg}
                        />
                    </Grid>
                    <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">To</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "to_date")}
                            value={dayReportSearch?.to_date?.value}
                            error={dayReportSearch?.to_date?.error}
                            errmsg={dayReportSearch?.to_date?.errmsg}
                        />
                    </Grid>
                    {/* <Grid item xs={3} container direction="column" spacing={1}>
                        <div className="Reporthead">Employee</div>
                        <Labelbox type="select"
                            dropdown={projectList?.empList}
                            changeData={(data) => checkValidation(data, "emp_name")}
                            value={dayReportSearch?.emp_name.value}
                            error={dayReportSearch?.emp_name.error}
                            errmsg={dayReportSearch?.emp_name.errmsg}
                        />
                    </Grid> */}
                    <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                        <CustomButton btnName={"Search"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
                    </Grid>
                </Grid>
            </div>
            <div className="DRcollapsecss">
                {/* <Collapse>
                    {multiplePanel}
                </Collapse> */}
                <EnhancedTable headCells={headCells}
                    rows={TableData.length == 0 ? TableData : TableData.rowDataList} />
            </div>


            <ReactToPrint
                trigger={() => <div className="printBtn">  <Grid item xs={2} container direction="row" justify="center" alignItems="center">
                <CustomButton btnName={"Print"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="Reportbtnsearch" onBtnClick={SearchData} />
            </Grid></div>}
                content={() => componentRef.current}
            // onAfterPrint={()=>setProductDetails([])}
            />
            <div style={{display:'none'}} ><ComponentToPrint ref={componentRef} productDetails={TableData.length == 0 ? TableData : TableData.rowDataList} /></div>
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