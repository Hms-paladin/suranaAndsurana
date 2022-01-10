import react, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";
import { Tabs } from 'antd';
import TabIcons from '../../component/TradeMarkTabIcons/trademarktabIcons';
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction"
import ProjectTaskModel from '../Project IP1/ProjectTaskModel/projecttaskModel';
import DynModel from '../../component/Model/model';
import Stages from '../stages/stageicon';
import TimeSheets from '../Search/TimeSheets/timesheetStart';
import ChangeLogTimeSheet from '../Search/TimeSheets/changeLogTimeSheet';
import OPEModel from './opemodel';
import StageMonitor from '../stages/StageMonitering';
import {
    getCheckListsAssigned
} from "../../actions/CheckListAction";

// IP Project:
// 1.TradeMark==>
import Trade1 from '../Project IP1/TradeMark/trademarks';
import Trade2 from '../Project IP1/TradeMark/tmApp_InternationalFiling';
import Trade3 from '../Project IP1/TradeMark/tmOppo_Filed';
import Trade4 from '../Project IP1/TradeMark/tmOppo_Defended';

// 2.Patent

import ApplicationDomestic from '../Project IP1/Patent/ApplicationDomestic';
import ApplicationForeign from '../Project IP1/Patent/ApplicationForeign';
import ApplicationPCT from '../Project IP1/Patent/ApplicationPCT';
import OppositionFilled from '../Project IP1/Patent/OppositionFilled';
import OppositionDefended from '../Project IP1/Patent/OppositionDefended';

// 3.Design 

import ApplicationIndiaFiling from '../Project IP1/Design/Application/IndiaFilling';
import ApplicationInternationalFiling from '../Project IP1/Design/Application/InternationalFilling';
import CancelDefended from '../Project IP1/Design/Cancellation/CancelDefended';
import CancelFiled from '../Project IP1/Design/Cancellation/CancelFiled';
import RectificationDefended from '../Project IP1/Design/Rectification/RectificationDefended';
import RectificationFiled from '../Project IP1/Design/Rectification/RectificationFiled';

// 4.copyRight

import CopyRights from '../Project IP1/CopyRight';

// Litigation  ==>
import LitigationAddcase from '../Litigation/litigation';

//IPAB Trademark
import IPABRectificationFiled from './IPAB Trademark/rectification_filed'

import IPABRectificationDefended from './IPAB Trademark/rectification_defended'
import AppealFiling from './IPAB Trademark/appeal_filing';
import RevocationFiled from './IPAB Trademark/revocation_filed'
import RevocationDefended from './IPAB Trademark/revocation_defended'

//IPAB Patent
import PatentRectificationFiled from './IPAB Patent/patent_rectificationfiled'
import PatentRectificationDef from './IPAB Patent/patent_rectificationdef'
import PatentAppealFiling from './IPAB Patent/patent_appealfiling'
import PatentRevocationFiled from './IPAB Patent/patent_revocationfiled'
import PatentRevocationDef from './IPAB Patent/patent_revocationdef'

// Variable Rate master  ==>
import VariableRate from "../stages/RateMaster";

import CustomButton from '../../component/Butttons/button';
import EnhancedTable from "../../component/DynTable/table";
import DeleteIcon from "@material-ui/icons/Delete";
import SuccessIcon from "../../images/successicon.svg";
import AddVarData from "../../images/addvardata.svg";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import {
    InsertProjectVariableRate, getProjectVariableRate, deleteVariableRate,
    UpdateVariableRate, Update_Variable_Rate, InsertVariableRate, UpdateCheckListNoTaskLink
} from "../../actions/VariableRateMaster"
import { Collapse } from "antd";
import { Checkbox } from 'antd'
import moment from 'moment';
import litigation from '../Litigation/litigation';

const { TabPane } = Tabs;

function ProjectIp(props) {
    const dispatch = useDispatch()
    let { rowId } = useParams()
    const { Panel } = Collapse;
    const [projectDetails, setProjectDetails] = useState({})
    const [modelOpen, setModelOpen] = useState(false)
    const [stage, setStage] = useState(false)
    const [stageMonitor, setStageMonitor] = useState(false)
    const [projecttypes, setProjecttypes] = useState(true)
    const [timesheetModelOpen, setTimesheetModelOpen] = useState(false)
    const [opeModelOpen, setOpeModelOpen] = useState(false)
    const [idDetails, setidDetails] = useState({})
    const [checklistModelOpen, setChecklistModelOpen] = useState(false)
    const [changeLogTimeSheetModelOpen, setChangeLogTimeSheetModelOpen] = useState(false)

    const [variableid, setVariableid] = useState(false);
    const [successmodel, setSuccessmodel] = useState(false);
    const [searchdata, setSearchdata] = useState();
    const [addsearchdata, setAddsearchdata] = useState();

    const [addTableData, setAddTableData] = useState();
    const [showVariableTable, setShowVariableTable] = useState([]);
    const [sendVariableData, setSendVariableData] = useState([]);
    const [notfoundmodel, setNotfoundmodel] = useState(false);

    const [disableCondition, setDisableCondition] = useState(true);
    const [projectSearchCreate, setPrpjectSearchCreate] = useState({});
    const [applicableamount, setApplicableamount] = useState({});
    const [Liti_LocationId,setLiti_LocationId]=useState('0')
    const [AmountChange, setAmountChange] = useState(false)
    const [TaskItemModel, setTaskItemModel] = useState(false);
    const [TaskItemModelID, setTaskItemModelID] = useState(0);
    const [multiplePanel, setMultiplePanel] = useState([]);
    const [ProjectTaskOpen_Hearing, setProjectTaskOpen_Hearing] = useState(false)
    const [ChecklistDetails, setChecklistDetails] = useState([])

    const [ChecklistChange, setChecklistChange] = useState(false);
    const [IndexArr, setIndexArr] = useState("");
    function callback(key) {
    }

    function callbackinside(key) {
    }


    const [ProjectIP, setProjectIP] = useState({

        checklist_item_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,

        }

    })

    const header = [
        { id: "designation", label: "Designation" },
        { id: "activity", label: "Activity" },
        { id: "sub_activity", label: "Sub Activity" },
        { id: "court", label: "Court" },
        { id: "range", label: "Range of Project cost" },
        { id: "lower_limit", label: "Lower Limit" },
        { id: "upper_limit", label: "Upper Limit" },
        { id: "amount", label: "Amount" },
        { id: "unit", label: "Unit of Measurement" },
        { id: "add", label: "Add" },
    ];

    const headers = [
        { id: "designation", label: "Designation" },
        { id: "activity", label: "Activity" },
        { id: "sub_activity", label: "Sub Activity" },
        { id: "court", label: "Court" },
        { id: "range", label: "Range of Project cost" },
        { id: "lower_limit", label: "Lower Limit" },
        { id: "upper_limit", label: "Upper Limit" },
        { id: "amount", label: "Amount" },
        { id: "unit", label: "Unit of Measurement" },
        { id: "del", label: "Delete" },
    ];


    useEffect(() => {
        dispatch(getProjectDetails(rowId))
    }, [])


    useEffect(() => {

        if (props.getCheckListsAssigned) {
            setChecklistDetails(props.getCheckListsAssigned)
        }
    }, [props.getCheckListsAssigned])

    useEffect(() => {

        setProjectDetails(props.ProjectDetails);
        props.ProjectDetails.length > 0 && setidDetails({
            project_id: props.ProjectDetails[0].project_id,
            client_id: props.ProjectDetails[0].client_id,
            billable_type_id: props.ProjectDetails[0].billable_type_id
        })
        if (props.ProjectDetails && props.ProjectDetails.length > 0) {
            dispatch(getCheckListsAssigned(props.ProjectDetails[0].project_id))
        }

    }, [props.ProjectDetails])

    useEffect(() => {

        let multipleTab = [];
        ChecklistDetails.map((data, index) => {

            multipleTab.push(
                <Panel
                    header={`${data.check_list} ( ${data.check_list_type} )`}
                    key={index + 1}
                >
                    <div>
                        <div className="taskitem_heading">
                            <div style={{ whiteSpace: 'nowrap' }} >Task Item</div>
                            <div >status</div>
                            <div >Assigned To</div>
                            <div >Task End Date</div>
                        </div>
                        {data.details.map((data1, index1) => {
                            return (<>
                                <div className="taskitem_div">
                                    <div >{data1.task}</div>
                                    <div >{(data.check_list_type === "No Task Linked" && data1.status === "In Progress") ? <Checkbox onClick={(e) => onTaskItemClick(e, data1.check_list_details_id, index, index1, data)} checked={data1.checked ? true : false} /> : <div className="status_Btn">{data1.status}</div>} </div>
                                    <div >{data1.name}</div>
                                    <div >{data.check_list_type === "No Task Linked" && data1.status === "In Progress" ? ' - ' : moment(data1.end_date).format("DD-MMM-YYYY")}</div>
                                </div>
                            </>
                            )
                        })}
                    </div>
                </Panel>
            );


        });

        setMultiplePanel(multipleTab);
    }, [ChecklistDetails, ChecklistChange])

    const onTaskItemClick = (e, data, index, index1, data1) => {
        setIndexArr([index, index1, data1.start_date, data1.end_date])
        if (e.target.checked === true) {
            ChecklistDetails[index].details[index1].checked = true
        }
        else {
            ChecklistDetails[index].details[index1].checked = false
        }
        ProjectIP.checklist_item_date.value = data1.end_date;
        setChecklistChange(!ChecklistChange)

        setTaskItemModel(true)
        setTaskItemModelID(data)
        setProjectIP((prevState) => ({
            ...prevState,
        }));
    }

    const onTaskItemComplete = async () => {
        var mainvalue = {};
        var targetkeys = Object.keys(ProjectIP);

        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ProjectIP[targetkeys[i]].value,
                ProjectIP[targetkeys[i]].validation
            );
            ProjectIP[targetkeys[i]].error = !errorcheck.state;
            ProjectIP[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ProjectIP[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => ProjectIP[obj].error == true
        );

        if (filtererr.length > 0) {
            // setInsertTaskForm({ error: true });
        } else {
            await dispatch(UpdateCheckListNoTaskLink(TaskItemModelID, rowId, ProjectIP.checklist_item_date.value))
            setTaskItemModel(false)

            ProjectIP.checklist_item_date.value = ""

        }
        setProjectIP((prevState) => ({
            ...prevState,
        }));
    }

    const onTaskItemCancel = async () => {
        ChecklistDetails[IndexArr[0]].details[IndexArr[1]].checked = false
        setChecklistDetails((prevState) => ([
            ...prevState,
        ]));
        setTaskItemModel(false)
        setChecklistChange(!ChecklistChange)
        ProjectIP.checklist_item_date.value = ""
        setProjectIP((prevState) => ({
            ...prevState,
        }));
    }


    // const handleCancel = () => {
    //     let ResumeFrom_key = [
    //         "mark", "projecttype", "goodsdescription", "internalstutus", "basicQualification", "additionalQualification1", "additionalQualification2", "institution", "lastEmployer", "startDate", "endDate", "email1", "email2", "phone1", "phone2", "skills", "Traits", "certifications", "specializations", "talents", "intrests", "contactPhone", "emailId", "mailAddress", "state", "city", "language", "industry"
    //     ]

    //     ResumeFrom_key.map((data) => {
    //         ProjectIP[data].value = ""
    //     })
    //     setProjectIP(prevState => ({
    //         ...prevState,
    //     }));
    // }


    const modelContent = () => {
        return (
            <ProjectTaskModel pro_details={Liti_LocationId} ProjectTaskOpen_Hearing={ProjectTaskOpen_Hearing} model_close={() => setModelOpen(false)} />
        )
    }

    const timesheetmodelContent = () => {

        return (

            <TimeSheets close_model={() => setTimesheetModelOpen(false)} projectrow={projectDetails} />
        )
    }

    const changeLogTimesheetmodelContent = () => {

        return (

            <ChangeLogTimeSheet projectrow={projectDetails} />
        )
    }

    const opeModel = () => {

        const handleFieldNullExp = (bln) => {
            setOpeModelOpen(bln);

        };
        return (
            <OPEModel handleChangeCloseModel={(bln) => handleFieldNullExp(bln)} />
        )
    }

    function projectTaskModel(boxName) {
        if (boxName === "TASKS") {
            setProjectTaskOpen_Hearing(false)
            setModelOpen(true)
        }
        else if (boxName === "STAGE" || boxName === "CASE TYPE") {
            setStage(true)
            setProjecttypes(false)
            setStageMonitor(false)
        }
        else if (boxName === "STAGE  MONITOR" || boxName === "CASE LIFE CYCLE") {
            setStageMonitor(true)
            setStage(false)
            setProjecttypes(false)

        }
        else if (boxName === "APPLICATION") {
            setStage(false)
            setProjecttypes(true)
            setStageMonitor(false)

        }
        else if (boxName === "VARIABLE RATE") {

            dispatch(getProjectVariableRate(props.ProjectDetails[0].project_id))
            setVariableid(true)
        }
        else if (boxName === "TIME SHEET") {
            setTimesheetModelOpen(true)
        }
        else if (boxName === "OPE") {
            setOpeModelOpen(true)
        }
        else if (boxName === "CHECKLIST") {
            setChecklistModelOpen(true)
        }

        else if (boxName == "BACK LOG TIME SHEET") {
            setChangeLogTimeSheetModelOpen(true)
            // setChecklistModelOpen(true)
        }


    }

    //----------

    function onsubmitvariablerate() {
        setVariableid(false)
        let AddRow = props.searchVariableRate.find((data) => {
            return data.stage_list_id
        })
        dispatch(UpdateVariableRate(sendVariableData, projectSearchCreate, props.searchVariableRate
            , applicableamount, props.getProjectVariableRate
        )).then((response) => {
            setDisableCondition(true)
        })


    }

    function PlusInsertVariableRate(data, index) {

        data.project_id = rowId
        data.Amount = projectSearchCreate['amountSearch' + index]

        dispatch(InsertProjectVariableRate(data)).then((response) => {
            setVariableid(true);
            ///
            setDisableCondition(true);
            setApplicableamount({});
            setPrpjectSearchCreate({});

        });

        setPrpjectSearchCreate((prevState) => ({
            ...prevState,
        }));
    }
    const onDelete = (id) => {
        dispatch(deleteVariableRate(id, props.getProjectVariableRate[0].project_id))
        ///
        setDisableCondition(true);
        setApplicableamount({});
        setPrpjectSearchCreate({});
    };

    const onchangeAmount = (data, key) => {
        setAmountChange(true)

        // if (key && data) {
        setDisableCondition(false)
        setPrpjectSearchCreate((prevState) => ({
            ...prevState,
            [key]: data,
        }));


        // }
    };

    const onchangeapplicableAmount = (data, key) => {

        if (data === '') {
            data = 0
        }
        setAmountChange(true)

        setDisableCondition(false)
        // if (key === "amt" && data) {
        setApplicableamount((prevState) => ({
            ...prevState,
            [key]: parseInt(data),
        }));

        // }


    };
    //applicableamount,props.getProjectVariableRate
    useEffect(() => {

        let searchVariableTableData = [];
        let sendprojVariableTableData = [];
        let tableData = [];
        const TabLen = props.getProjectVariableRate.length;

        props.getProjectVariableRate.length > 0 && props.getProjectVariableRate.map((data, index) => {
            // setApplicableamount({});
            tableData.push(data)

            if (disableCondition) {
                applicableamount["amt" + index] = data.amount;
            }

            searchVariableTableData.push({
                designation: data.designation,
                activity: data.activity,
                sub_activity: data.sub_activity,
                court: data.court,
                costRange: data.range,
                lowerLimit: data.lower_limit,
                upperLimit: data.upper_limit,
                amount: <Labelbox
                    type="text"
                    placeholder={"Amount"}
                    changeData={(data) => onchangeapplicableAmount(data, "amt" + index)}
                    //   SubmitData={()=>onsubmitvariablerate(data.rate_master_id)}
                    value={applicableamount["amt" + index]}

                />,
                UOM: data.unit_of_measure,
                del: (
                    <DeleteIcon
                        style={{ cursor: "pointer", width: 19 }}
                        fontSize="small"
                        onClick={() => onDelete(data.rate_master_id)}
                    />
                ),
            });
            setShowVariableTable([...showVariableTable]);
            sendprojVariableTableData.push({
                project_id: props.ProjectDetails[0].project_id,
                rate_master_id: data.rate_master_id,
                base_rate: data.amount,
            });

        })
        setShowVariableTable([...searchVariableTableData]);
        setSendVariableData([...sendprojVariableTableData]);

    }, [props.getProjectVariableRate, applicableamount])

    ///
    useEffect(() => {
        if (props.lenghtData !== 0) {
            let searchVariableTableData = [];
            setNotfoundmodel(false);

            props.searchVariableRate.map((data, index) => {
                if (disableCondition) {

                    projectSearchCreate['amountSearch' + index] = data.Amount;

                }
                searchVariableTableData.push({
                    designation: data.designation,
                    activity: data.activity,
                    sub_activity: data.sub_activity,
                    court: data.location,
                    costRange: data.range,
                    lowerLimit: data.lower_limit,
                    upperLimit: data.upper_limit,
                    amount: (
                        <Labelbox
                            type="text"
                            placeholder={"Amount"}
                            changeData={(data) => onchangeAmount(data, "amountSearch" + index)}
                            value={projectSearchCreate["amountSearch" + index]}
                        />
                    ),
                    UOM: data.unit,
                    add: (
                        <img
                            src={PlusIcon}
                            style={{ cursor: "pointer", width: 19 }}
                            onClick={() => PlusInsertVariableRate(data, index)}
                        />
                    ),
                });
            });
            setAddTableData({ searchVariableTableData });
        } else {
            setAddsearchdata(false);
            setNotfoundmodel(true)
        }

    }, [props.getProjectVariableRate, props.searchVariableRate, props.lenghtData, projectSearchCreate, disableCondition]);


    const variablerateModel = () => {
        function onSearch() {
            setSearchdata(true);
            setAddsearchdata(false);
            // setVariableRateCall(!variableRateCall)
            setNotfoundmodel(true);
        }

        function addSearchData() {
            setAddsearchdata(true);
            setSearchdata(false);
            setSuccessmodel(true);
        }

        return (
            <div>
                <VariableRate
                    variablebtnchange={true}
                    variabletablechange={true}
                    AmountChange={true}
                    setShowSearchTable={() => setAddsearchdata(true)}
                    setNoSearchResult={() => setNotfoundmodel(true)}
                />
                {searchdata && (
                    <div className="addvariableData">
                        <img src={AddVarData} onClick={addSearchData} />
                    </div>
                )}
                {addsearchdata && (
                    <>
                        <div>
                            <EnhancedTable
                                headCells={header}
                                var_rate
                                rows={addTableData.searchVariableTableData || []}
                            />
                        </div>
                    </>
                )}

                {showVariableTable.length !== 0 &&
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Applicable Rates</div>
                        <EnhancedTable headCells={headers} var_rate rows={showVariableTable || []} />
                    </div>}


                <div className="VariableRateButton">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => onsubmitvariablerate()} />
                    <CustomButton btnName={"Cancel "} custombtnCSS={"btnNotFound"} onBtnClick={() => setVariableid(false)} />
                </div>

                <DynModel
                    modelTitle={"Success"}
                    handleChangeModel={successmodel}
                    handleChangeCloseModel={(bln) => setSuccessmodel(bln)}
                    content={
                        <div className="successModel">
                            <img src={SuccessIcon} />
                            <div>Data Successfully Added in Variable Rate Master</div>
                        </div>
                    }
                    width={400}
                />
                <DynModel
                    modelTitle={"Billing Criteria Not Found"}
                    handleChangeModel={notfoundmodel}
                    handleChangeCloseModel={(bln) => setNotfoundmodel(bln)}
                    content={
                        <div className="successModel">
                            <div>
                                {" "}
                                <label className="notfound_label">
                                    Do You Want to Add this Item ?
                                </label>
                            </div>
                            <div className="customNotFoundbtn">
                                <CustomButton btnName={"Yes"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setNotfoundmodel(false)} />
                                <CustomButton btnName={"No "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setNotfoundmodel(false)} />
                            </div>
                        </div>
                    }
                    width={400}
                />

            </div>
        );
    };

    function litigationHearingModel(data) {
        setModelOpen(data)
        setProjectTaskOpen_Hearing(data)
    }

    function checkValidation(data, key) {
        let dynObj;

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ProjectIP[key].validation
        );
        dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ProjectIP[key].validation,
        };

        setProjectIP((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    return (

        <div>

            <div className="projectIpContainer">
                {props.ProjectDetails.map((data) => {
                    return (
                        <div>

                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Project Name</div>
                                        <div>{data.project_name}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Client Name</div>
                                        <div>{data.client}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Project type</div>
                                        <div>{data.project_type}</div>
                                    </div>
                                    {props.ProjectDetails[0] && props.ProjectDetails[0].sub_project_type !== null && <div className="projectIpdata">
                                        <div className="projectTitle">Project Sub type</div>
                                        <div>{data.sub_project_type}</div>
                                    </div>}
                                    {props.ProjectDetails[0] && props.ProjectDetails[0].process !== null && <div className="projectIpdata">
                                        <div className="projectTitle">Process type</div>
                                        <div>{data.process}</div>
                                    </div>}
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    {props.ProjectDetails[0] && props.ProjectDetails[0].filing_type !== null && <div className="projectIpdata">
                                        <div className="projectTitle">Filing Type</div>
                                        <div>{data.filing_type}</div>
                                    </div>}
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Billable Type</div>
                                        <div>{data.billable_type}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">{props.ProjectDetails.length > 0 && props.ProjectDetails[0].project_type_id === 6 ? "DDA" : "HOD / Attorney"}</div>
                                        <div>{data.HR}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">{props.ProjectDetails.length > 0 && props.ProjectDetails[0].project_type_id === 6 ? "DDRA" : "Counsel"}</div>
                                        <div>{data.councel}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Comments</div>
                                        <div>{data.comments}</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    {data.project_cost && data.project_cost!=='' && <div className="projectIpdata">
                                        <div className="projectTitle">Project Value</div>
                                        <div>{data.project_cost}</div>
                                    </div>}

                                    {data.billable_type_id !== 2 && data.details && data.details.length > 0 && data.details[0].base_rate != null && <div className="projectIpdata">
                                        <div className="projectTitle">Base Rate</div>
                                        <div>{data.details[0].base_rate}</div>
                                    </div>}

                                    {data.billable_type_id !== 5 && data.billable_type_id !== 2 && data.details && data.details.length > 0 && data.details[0].unit != null && <div className="projectIpdata">
                                        <div className="projectTitle">Unit of Measure</div>
                                        <div>{data.details[0].unit}</div>
                                    </div>}

                                    {data.billable_type_id === 3 && data.details && data.details.length > 0 && data.details[0].limit_in_hours != null && <div className="projectIpdata">
                                        <div className="projectTitle">Limit</div>
                                        <div>{data.details[0].limit_in_hours}</div>
                                    </div>}

                                    {data.billable_type_id === 3 && data.details && data.details.length > 0 && data.details[0].additional_rate != null && <div className="projectIpdata">
                                        <div className="projectTitle">Additional Rate Hourly</div>
                                        <div>{data.details[0].additional_rate}</div>
                                    </div>}
                                </div>

                            </Grid>
                        </div>

                    )
                })}


                <div className="projectTypedef">
                    <div className="projectTypeHeader">
                        {props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" ? <>
                            <div>Intellectual Property -</div>
                            <div> {props.ProjectDetails[0] && props.ProjectDetails[0].sub_project_type}</div>
                        </>
                            :
                            <div>
                                {props.ProjectDetails[0] && props.ProjectDetails[0].project_type}
                            </div>
                        }

                    </div>
                    <div className="TabIconsview"
                    ><TabIcons litigation={props.ProjectDetails.length > 0 && props.ProjectDetails[0].project_type_id === 6 ? 1 : undefined} variableRate={idDetails} checkListsAssigned={props.getCheckListsAssigned} projectDetails={props.ProjectDetails[0]} onChangeTabBox={(data) => projectTaskModel(data)} /></div>

                    <DynModel modelTitle={"BACK LOG TIME SHEET"} handleChangeModel={changeLogTimeSheetModelOpen} handleChangeCloseModel={(bln) => setChangeLogTimeSheetModelOpen(bln)} content={changeLogTimesheetmodelContent()} width={800} />
                    <DynModel
                        modelTitle={"Variable Rate"}
                        handleChangeModel={variableid}
                        handleChangeCloseModel={(bln) => setVariableid(bln)}
                        content={variablerateModel()} width={1300} />
                    <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetModelOpen} handleChangeCloseModel={(bln) => setTimesheetModelOpen(bln)} content={timesheetmodelContent()} width={1000} zIndex={1000}/>
                    <DynModel modelTitle={"OPE"} handleChangeModel={opeModelOpen} handleChangeCloseModel={(bln) => setOpeModelOpen(bln)} content={opeModel()} width={800} />
                    <DynModel modelTitle={"Check List"} handleChangeModel={checklistModelOpen} handleChangeCloseModel={(bln) => setChecklistModelOpen(bln)}
                        content={
                            <div className="checklist_collapse">
                                <Collapse >{multiplePanel}</Collapse>
                            </div>

                        } width={1000} />
                    <DynModel
                        modelTitle={"TaskItem Completion"}
                        handleChangeModel={TaskItemModel}
                        handleChangeCloseModel={onTaskItemCancel}
                        content={
                            <div className="successModel">
                                <div>
                                    {" "}
                                    <label className="notfound_label">
                                        Do You Want Complete This Item ?
                                    </label>
                                </div>
                                <Grid item xs={12} container direction="row" style={{ justifyContent: 'center', marginTop: 10 }} spacing={2}>
                                    <Grid item xs={9} container direction="column">
                                        <Labelbox type="datepicker"
                                            // disablePast={true}
                                            minDate={moment(`${IndexArr[2]} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                            maxDate={moment(`${IndexArr[3]} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                            changeData={(data) =>
                                                checkValidation(data, "checklist_item_date")
                                            }
                                            value={ProjectIP.checklist_item_date.value}
                                            error={ProjectIP.checklist_item_date.error}
                                            errmsg={ProjectIP.checklist_item_date.errmsg} />
                                    </Grid>
                                </Grid>
                                <div className="customNotFoundbtn">
                                    <CustomButton btnName={"Yes"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onTaskItemComplete} />
                                    <CustomButton btnName={"No "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onTaskItemCancel} />
                                </div>
                            </div>
                        }
                        width={400}
                    />

                    {/* TradeMark */}
                    {stageMonitor && <StageMonitor cancel_btn={(data) => projectTaskModel(data)} />}
                    {stage && <Stages projectDetails={props.ProjectDetails} />}

                    {projecttypes && <div>{
                        props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Trademark" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "India Filing" && <Trade1 />
                    }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Trademark" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "International Filing" && <Trade2 />

                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Trademark" && props.ProjectDetails[0].process === "Opposition" && props.ProjectDetails[0].filing_type === "Filed" && <Trade3 />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Trademark" && props.ProjectDetails[0].process === "Opposition" && props.ProjectDetails[0].filing_type === "Defended" && <Trade4 />
                        }
                        {/* Patent */}
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Patent" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Domestic" && <ApplicationDomestic />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Patent" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Foreign" && <ApplicationForeign />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Patent" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "PCT" && <ApplicationPCT />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Patent" && props.ProjectDetails[0].process === "Opposition" && props.ProjectDetails[0].filing_type === "Filed" && <OppositionFilled />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Patent" && props.ProjectDetails[0].process === "Opposition" && props.ProjectDetails[0].filing_type === "Defended" && <OppositionDefended />
                        }

                        {/* Design */}

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Domestic" && <ApplicationIndiaFiling projectDetails={props.ProjectDetails} />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Foreign" && <ApplicationInternationalFiling projectDetails={props.ProjectDetails} />

                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Cancellation" && props.ProjectDetails[0].filing_type === "Filed" && <CancelFiled projectDetails={props.ProjectDetails} />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Cancellation" && props.ProjectDetails[0].filing_type === "Defended" && <CancelDefended projectDetails={props.ProjectDetails} />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Filed" && <RectificationFiled projectDetails={props.ProjectDetails} />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Defended" && <RectificationDefended projectDetails={props.ProjectDetails} />
                        }

                        {/* CopyRight */}
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Copyright" && <CopyRights projectDetails={props.ProjectDetails} id_Props={idDetails} />
                        }


                        {/*  */}

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "Litigation Projects" && <LitigationAddcase TaskModel={(data) => litigationHearingModel(data)} Liti_Location={setLiti_LocationId}id_Props={idDetails} />
                        }

                        {/* IPAB Trademark */}
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Trademark" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Filed" && <IPABRectificationFiled />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Trademark" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Defended" && <IPABRectificationDefended />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Trademark" && props.ProjectDetails[0].process === "Appeal" && props.ProjectDetails[0].filing_type === "Filing" && <AppealFiling />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Trademark" && props.ProjectDetails[0].process === "Revocation" && props.ProjectDetails[0].filing_type === "Filed" && <RevocationFiled />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Trademark" && props.ProjectDetails[0].process === "Revocation" && props.ProjectDetails[0].filing_type === "Defended" && <RevocationDefended />
                        }

                        {/* IPAB Patent */}

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Patent" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Filed" && <PatentRectificationFiled />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Patent" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Defended" && <PatentRectificationDef />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Patent" && props.ProjectDetails[0].process === "Appeal" && props.ProjectDetails[0].filing_type === "Filing" && <PatentAppealFiling />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Patent" && props.ProjectDetails[0].process === "Revocation" && props.ProjectDetails[0].filing_type === "Filed" && <PatentRevocationFiled />
                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "IPAB Patent" && props.ProjectDetails[0].process === "Revocation" && props.ProjectDetails[0].filing_type === "Defended" && <PatentRevocationDef />
                        }

                    </div>}

                </div>


                {/* <Tabs onChange={callback} type="card" className="intellectualPropertyTab">
                <TabPane tab="Intellectual Property" key="1">
                    <Tabs onChange={callbackinside} type="card" className="tradeMarkTab">
                        <TabPane tab="Trade Mark" key="1">
                            <TradeMarkTab Type={ProjectIP} />
                        </TabPane>
                        <TabPane tab="Design" key="2">
                            <Design Type={ProjectIP} />
                        </TabPane>
                        <TabPane tab="Patent" key="3">
                            <Patent Type={ProjectIP} />
                        </TabPane>
                        <TabPane tab="CopyRight" key="4">
                            <CopyRight />
                        </TabPane>
                    </Tabs>
                </TabPane>

            </Tabs>
 */}
            </div>
        </div >
    )
}
const mapStateToProps = (state) => (
    {
        ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
        searchVariableRate: state.variableRateMaster.searchVariableRate,
        getProjectVariableRate: state.variableRateMaster.getProjectVariableRate,
        UpdateProjectVariableRate: state.variableRateMaster.updateProjectVariableRate,
        UpdateVariableRate: state.variableRateMaster.UpdateVariableRate || [],
        getCheckListsAssigned: state.CheckListReducer.getCheckListsAssigned || [],

    }
);

export default connect(mapStateToProps)(ProjectIp);