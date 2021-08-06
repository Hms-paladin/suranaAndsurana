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
    getCheckListsAssigned, insertCheckListsAssigned
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

import { Checkbox } from 'antd';
import CustomButton from '../../component/Butttons/button';
import Tasks from '../../images/menuicon.svg';
import EnhancedTable from "../../component/DynTable/table";
import DeleteIcon from "@material-ui/icons/Delete";
import SuccessIcon from "../../images/successicon.svg";
import AddVarData from "../../images/addvardata.svg";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import {
    InsertProjectVariableRate, getProjectVariableRate, deleteVariableRate,
    UpdateVariableRate, Update_Variable_Rate, InsertVariableRate
} from "../../actions/VariableRateMaster"

const { TabPane } = Tabs;

function ProjectIp(props) {
    const dispatch = useDispatch()
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

    const [AmountChange, setAmountChange] = useState(false)

    function callback(key) {
        console.log(key);
    }

    function callbackinside(key) {
        console.log(key);
    }


    const [Trade_Mark, setResumeFrom] = useState({

        mark: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        projecttype: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        goodsdescription: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        internalstutus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amendment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        prioritydetails: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        applicationNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        internalstutus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        allotment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        order: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        usagedetails: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        coments: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        indiaStatus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        restrictions: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        clientname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        process_type: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        filling_type: {
            value: "",
            validation: [{ "name": "required" },],
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

    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))

    }, [])



    useEffect(() => {
        setProjectDetails(props.ProjectDetails);
        props.ProjectDetails.length > 0 && setidDetails({
            project_id: props.ProjectDetails[0].project_id,
            client_id: props.ProjectDetails[0].client_id,
            billable_type_id: props.ProjectDetails[0].billable_type_id
        })
        if (props.ProjectDetails && props.ProjectDetails.length > 0) {
            dispatch(getCheckListsAssigned(props.ProjectDetails[0].project_id, props.ProjectDetails[0].project_type_id))
        }
    }, [props.ProjectDetails])
    const [checkListsView, setcheckListsView] = useState([])
    const [checkListsToGlobalSave, setcheckListsToGlobalSave] = useState([])
    function handleCheck(event, data) {
        console.log("mapping", data);
        let oo = checkListsView;
        let d = [];
        for (var i = 0; i < oo.length; i++) {
            if (oo[i] && oo[i].check_list_id == data.check_list_id) {
                if (data.check_list_status == null || data.check_list_status == 0) {
                    oo[i].check_list_status = 1;
                    data.check_list_status = 1;
                } else {
                    oo[i].check_list_status = 0;
                    data.check_list_status = 0;
                }
                d.push(data);
            } else {
                d.push(oo[i]);
            }
        }

        setcheckListsView(
            prevState => ({
                ...prevState,
            })
        );


        setcheckListsView(d);
    }

    function submitCheckList() {

        let obj = { "checklist": [] };
        for (let i = 0; i < checkListsView.length; i++) {
            let oo = checkListsView[i];
            let pOb = {
                "check_list_id": oo.check_list_id,
                "project_id": rowId,
                "check_list_status": oo.check_list_status == null || oo.check_list_status == 0 ? 0 : 1
            }
            obj.checklist.push(pOb);
        }


        dispatch(insertCheckListsAssigned(obj));
        setChecklistModelOpen(false)
    }
    useEffect(() => {

        if (props.getCheckListsAssigned && props.getCheckListsAssigned.length > 0) {
            var lists = [];
            for (var i = 0; i < props.getCheckListsAssigned.length; i++) {

                if (props.ProjectDetails && props.ProjectDetails[0] &&
                    props.ProjectDetails[0].project_type_id == props.getCheckListsAssigned[i].project_type_id
                    && props.ProjectDetails[0].sub_project_id == props.getCheckListsAssigned[i].project_sub_type_id) {
                    lists.push(props.getCheckListsAssigned[i]);
                } else if (props.ProjectDetails && props.ProjectDetails[0] &&
                    props.ProjectDetails[0].project_type_id == props.getCheckListsAssigned[i].project_type_id
                    && props.ProjectDetails[0].sub_project_id == 0) {
                    lists.push(props.getCheckListsAssigned[i]);
                }
            }
            setcheckListsView(lists)
        }
        //setValue(props.rowData.data.priority_id)
    }, [props.getCheckListsAssigned])

    console.log(props.ProjectDetails, "props.ProjectDetails")

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Trade_Mark);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Trade_Mark[targetkeys[i]].value,
                Trade_Mark[targetkeys[i]].validation
            );
            Trade_Mark[targetkeys[i]].error = !errorcheck.state;
            Trade_Mark[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Trade_Mark[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Trade_Mark[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(Trade_Mark)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype", "goodsdescription", "internalstutus", "basicQualification", "additionalQualification1", "additionalQualification2", "institution", "lastEmployer", "startDate", "endDate", "email1", "email2", "phone1", "phone2", "skills", "Traits", "certifications", "specializations", "talents", "intrests", "contactPhone", "emailId", "mailAddress", "state", "city", "language", "industry"
        ]

        ResumeFrom_key.map((data) => {
            Trade_Mark[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Trade_Mark[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Trade_Mark[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setResumeFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    const modelContent = () => {
        return (
            <ProjectTaskModel />
        )
    }

    const timesheetmodelContent = () => {

        return (

            <TimeSheets projectrow={projectDetails} />
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
    const openProjectTask = () => {
        setModelOpen(true)
    }
    function projectTaskModel(boxName) {
        if (boxName === "TASKS") {
            setModelOpen(true)
        }
        else if (boxName === "STAGE") {
            setStage(true)
            setProjecttypes(false)
            setStageMonitor(false)
        }
        else if (boxName === "STAGE  MONITOR") {
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

    // console.log(props.ProjectDetails[0].sub_project_type, "props.ProjectDetails[0].sub_project_type")
    console.log(projectSearchCreate.amountSearch0, "projectSearchCreate")
    //----------

    function onsubmitvariablerate() {
        setVariableid(false)
        let AddRow = props.searchVariableRate.find((data) => {
            return data.stage_list_id
        })
        dispatch(UpdateVariableRate(sendVariableData, projectSearchCreate, props.searchVariableRate
            , applicableamount, props.getProjectVariableRate
        )).then((response) => {
            setDisableCondition(false)
        })


    }

    function PlusInsertVariableRate(id) {
        // setDisableCondition(true)
        let AddRow = props.searchVariableRate.find((data) => {
            return data.stage_list_id == id
        })
        var mainvalue = {}

        //   if(AmountChange){
        //      dispatch(Update_Variable_Rate(sendVariableData,projectSearchCreate.amountSearch0,AddRow)).then((response)=>{
        //       setDisableCondition(true)
        //       setAmountChange(false)
        //      })
        //   }
        //   else{
        dispatch(InsertProjectVariableRate(AddRow, sendVariableData)).then((response) => {
            setVariableid(true);

        });
        // }
        setPrpjectSearchCreate((prevState) => ({
            ...prevState,
        }));
    }
    const onDelete = (id) => {
        dispatch(deleteVariableRate(id, props.getProjectVariableRate[0].project_id))
    };

    const onchangeAmount = (data, key) => {
        setAmountChange(true)
        console.log(parseInt(data), key, "onchangeAmount")
        // if (key && data) {
        setDisableCondition(false)
        setPrpjectSearchCreate((prevState) => ({
            ...prevState,
            [key]: data,
        }));
        console.log(disableCondition, "console")

        // }
    };

    const onchangeapplicableAmount = (data, key) => {
        setAmountChange(true)
        console.log(parseInt(data), key, "onchangeAmountappli")
        setDisableCondition(false)
        // if (key === "amt" && data) {
        setApplicableamount((prevState) => ({
            ...prevState,
            [key]: parseInt(data),
        }));
        console.log(disableCondition, "console")
        // }


    };
    //applicableamount,props.getProjectVariableRate
    useEffect(() => {
        let searchVariableTableData = [];
        let sendprojVariableTableData = [];
        let tableData = [];
        const TabLen = props.getProjectVariableRate.length;
        console.log("ddddd", props.getProjectVariableRate)
        props.getProjectVariableRate.length > 0 && props.getProjectVariableRate.map((data, index) => {
            tableData.push(data)
            const Index = index
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

    console.log(applicableamount, "applicableamount")
    ///
    useEffect(() => {
        if (props.lenghtData !== 0) {
            let searchVariableTableData = [];
            setNotfoundmodel(false);
            console.log("sho", props.searchVariableRate)
            props.searchVariableRate.map((data, index) => {
                if (disableCondition) {
                    console.log(disableCondition, "disblecondit")
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
                            onClick={() => PlusInsertVariableRate(data.stage_list_id)}
                        />
                    ),
                });
            });
            setAddTableData({ searchVariableTableData });
        } else {
            setAddsearchdata(false);
            setNotfoundmodel(true)
        }

    }, [props.searchVariableRate, props.lenghtData, projectSearchCreate, disableCondition]);
    console.log(showVariableTable, "showVariableTable")

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
                                rows={addTableData.searchVariableTableData || []}
                            />
                        </div>
                    </>
                )}
                {console.log(showVariableTable, "showid")}
                {showVariableTable.length !== 0 &&
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Applicable Rates</div>
                        <EnhancedTable headCells={headers} rows={showVariableTable || []} />
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
                                    Do You Want To Continue ?
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
    console.log()
    return (
        
        <div>
            {console.log(props.insertChangeLog, "insertChangeLog")}
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
                                        <div className="projectTitle">HOD / Attorney</div>
                                        <div>{data.HR}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Counsel</div>
                                        <div>{data.councel}</div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    <div className="data">
                                        <div className="projectTitle">Comments</div>
                                        <div>{data.comments}</div>
                                    </div>
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

                        {/* {props.ProjectDetails[0].project_type !== "IP Projects" && props.ProjectDetails[0].project_type !== "" &&
                            props.ProjectDetails[0].project_type} */}
                    </div>
                    <div className="TabIconsview"
                    ><TabIcons variableRate={idDetails} checkListsAssigned={props.getCheckListsAssigned} projectDetails={props.ProjectDetails[0]} onChangeTabBox={(data) => projectTaskModel(data)} /></div>
                    {/* <DynModel modelTitle={"Variable Rate"} handleChangeModel={variablemodelOpen} handleChangeCloseModel={(bln) => setVariableModelOpen(bln)} content={<RateMaster  variablebtnchange={true} variabletablechange={true}   setShowSearchTable={() => setAddsearchdata(true)} project_ip={props.ProjectDetails[0]} />} width={1200} />
                     */}

                    <DynModel modelTitle={"BACK LOG TIME SHEET"} handleChangeModel={changeLogTimeSheetModelOpen} handleChangeCloseModel={(bln) => setChangeLogTimeSheetModelOpen(bln)} content={changeLogTimesheetmodelContent()} width={800} />
                    <DynModel
                        modelTitle={"Variable Rate"}
                        handleChangeModel={variableid}
                        handleChangeCloseModel={(bln) => setVariableid(bln)}
                        content={variablerateModel()} width={1300} />
                    <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetModelOpen} handleChangeCloseModel={(bln) => setTimesheetModelOpen(bln)} content={timesheetmodelContent()} width={1000} />
                    <DynModel modelTitle={"OPE"} handleChangeModel={opeModelOpen} handleChangeCloseModel={(bln) => setOpeModelOpen(bln)} content={opeModel()} width={800} />
                    <DynModel modelTitle={"Check List"} handleChangeModel={checklistModelOpen} handleChangeCloseModel={(bln) => setChecklistModelOpen(bln)}
                        content={
                            <div style={{ textAlign: 'center' }}>
                                <Grid container spacing={1}>

                                    {checkListsView.map((data, index) =>

                                        <Grid item xs={12} container direction="row" className="spaceBtGrid" alignItems="center">

                                            <Grid item xs={7}>
                                                <label className="checklist_label">{data.check_list}</label>
                                            </Grid>

                                            <Grid item xs={2}><Checkbox checked={data.check_list_status == null || data.check_list_status == 0 ? false : true}
                                                name={data.check_list} value={data.check_list_id} onClick={(event) => handleCheck(event, data)}
                                            />
                                            </Grid>

                                            {/* <Grid item xs={3}>
                                                 {<img src={data.check_list_type != 'Simple' ? Tasks : ""} className="tabIconImage"

                                                onClick={data.check_list_type != 'Simple' ? () => openProjectTask() : ""} />}

                                            </Grid> */}

                                        </Grid>
                                    )}


                                    {/* <div className="customchecklistbtn">
                                        <CustomButton
                                            btnName={"Save"}
                                            btnCustomColor="customPrimary"
                                            custombtnCSS={"btnchecklist"}
                                            onBtnClick={submitCheckList}
                                        />
                                    </div> */}
                                </Grid>
                            </div>

                        } width={300} />

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
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "Litigation Projects" && <LitigationAddcase id_Props={idDetails} />
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
                            <TradeMarkTab Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="Design" key="2">
                            <Design Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="Patent" key="3">
                            <Patent Type={Trade_Mark} />
                        </TabPane>
                        <TabPane tab="CopyRight" key="4">
                            <CopyRight />
                        </TabPane>
                    </Tabs>
                </TabPane>

            </Tabs>
 */}
            </div>
        </div>
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