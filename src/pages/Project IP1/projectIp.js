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
import OPEModel from './opemodel';
import StageMonitor from '../stages/StageMonitering';


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

    // useEffect(()=>{
    //     useParams()
    // },[])

    let { rowId } = useParams()
    useEffect(() => {
        console.log("test", rowId)
        dispatch(getProjectDetails(rowId))
    }, [])
    useEffect(() => {

        setProjectDetails(props.ProjectDetails);
        console.log("test", projectDetails)

    }, [props.ProjectDetails])

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
            <TimeSheets />
        )
    }

    const opeModel = () => {
        return (
            <OPEModel />
        )
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
        else if (boxName === "TIME SHEET") {
            setTimesheetModelOpen(true)
        }
        else if (boxName === "OPE") {
            setOpeModelOpen(true)
        }


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
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Project Sub type</div>
                                        <div>{data.sub_project_type}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Process type</div>
                                        <div>{data.process}</div>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Filling Type</div>
                                        <div>{data.filing_type}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Billable Type</div>
                                        <div>{data.billable_type}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">HOD / Attorney</div>
                                        <div>{data.hod_hr_id}</div>
                                    </div>
                                    <div className="projectIpdata">
                                        <div className="projectTitle">counsel</div>
                                        <div>{data.councel}</div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="projectIpFields">
                                    <div className="projectIpdata">
                                        <div className="projectTitle">Comments</div>
                                        <div>text</div>
                                    </div>
                                </div>

                            </Grid>
                        </div>

                    )
                })}


                <div className="projectTypedef">
                    <div className="projectTypeHeader">
                        Intellectual Property -  <div> {props.ProjectDetails[0] && props.ProjectDetails[0].sub_project_type}</div>
                    </div>
                    <div className="TabIconsview"><TabIcons onChangeTabBox={(data) => projectTaskModel(data)} /></div>
                    <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={timesheetModelOpen} handleChangeCloseModel={(bln) => setTimesheetModelOpen(bln)} content={timesheetmodelContent()} width={1000} />
                    <DynModel modelTitle={"Time Sheet"} handleChangeModel={opeModelOpen} handleChangeCloseModel={(bln) => setOpeModelOpen(bln)} content={opeModel()} width={800} />


                    {/* TradeMark */}
                    {stageMonitor && <StageMonitor />}
                    {stage && <Stages />}

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
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Domestic" && <ApplicationIndiaFiling />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Application" && props.ProjectDetails[0].filing_type === "Foreign" && <ApplicationInternationalFiling />

                        }

                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Cancellation" && props.ProjectDetails[0].filing_type === "Filed" && <CancelFiled />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Cancellation" && props.ProjectDetails[0].filing_type === "Defended" && <CancelDefended />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Filed" && <RectificationFiled />
                        }
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Design" && props.ProjectDetails[0].process === "Rectification" && props.ProjectDetails[0].filing_type === "Defended" && <RectificationDefended />
                        }

                        {/* CopyRight */}
                        {
                            props.ProjectDetails[0] && props.ProjectDetails[0].project_type === "IP Projects" && props.ProjectDetails[0].sub_project_type === "Copyright" && <CopyRights />
                        }
                    </div>}

                    {/* 
                    {stage ?
                        <Stages />
                        :
                       
                    } */}
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

    }
);

export default connect(mapStateToProps)(ProjectIp);