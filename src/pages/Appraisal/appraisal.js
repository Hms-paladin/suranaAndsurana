import react, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import ValidationLibrary from "../../helpers/validationfunction";
import PlusIcon from "../../images/plusIcon.svg";
import { useDispatch, connect } from "react-redux";
import { Checkbox, Collapse, Radio } from 'antd';
import AppraisalModel from './appraisalModel';
import DynModel from "../../component/Model/model";
import RatingModel from './ratingModel';
import { useParams } from "react-router-dom";
import './appraisal.scss';
import { notification } from "antd";
import { GetAreaDevelopment } from '../../actions/MasterDropdowns';
import { ApplyAppraisal, InsertAreaDevelopment, GetEmpAppraisalDetails, InsertApraisalSupervisor, GetEmpAppraisal, InsertManagingPartnerEmpAppraisal } from '../../actions/AppraisalAction';
import moment from 'moment';



const { Panel } = Collapse;

function Appraisal(props) {
    const dispatch = useDispatch();
    // const rowID = ""
    const [addemployeeDetails, setAddemployeeDetails] = useState([])
    const [addemployeeseminar, setAddemployeeSeminar] = useState([])
    const [addemployeeProgram, setAddemployeeProgram] = useState([])
    const [changeCheckbox, setChangeCheckbox] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
    const [ratingModelOpen, setRatingModelOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState()
    const [saveRights, setSaveRights] = useState([])
    const [areDevelopment, setAreDevelopment] = useState({})
    const [showQual, setShowQual] = useState(false)
    const [showProgram, setShowProgram] = useState(false)
    const [showSeminar, setShowSeminar] = useState(false)
    const [showKeys, setShowKeys] = useState(false)
    const [modelCommentID, setModelCommentID] = useState()
    const [respbtn, setRespbtn] = useState()
    const [assignbtn, setAssignbtn] = useState()
    const [rowID, setRowID] = useState()
    const [todoListdata, setTodoListdata] = useState([])
    const [emp_appr_id, setEmp_appr_id] = useState()
    const [enableSave, setEnableSave] = useState(false)
    const [emp_id, setEmp_id] = useState()
    const [modelComment, setModelComment] = useState({
        area_of_speci: { value: "" },
        self_work_des: { value: "" },
        current_duties: { value: "" },
        major_achievement: { value: "" },
        urge_to_learn: { value: "" },
        enhance_your_productivity: { value: "" },
        improvement_ssia: { value: "" },
        opinion_remark: { value: "" },
        growth_plan_three_yrs: { value: "" },
        growth_plan_five_yrs: { value: "" },
    })
    const [supmodelComment, setSupModelComment] = useState({
        appraisar_comments: { values: "" },
        instruction_action: { values: "" },
        advice_manage_parter: { values: "" },
    })
    const [managemodelComment, setManageModelComment] = useState({
        instruction_to_appraise: { values: "" },
        advice_to_hod: { values: "" },
        instruction_to_admin_hod: { values: "" },
        fb_managing_parter: { values: "" },

    })
    const [Appraisal, setAppraisal] = useState({
        area_dev: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        details: {
            value: "",
            validation: [{ "name": "required" }, { "name": "allownumspace" }],
            error: null,
            errmsg: null,
        },
        date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        comment: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })
    const [empDetail, setEmpDetail] = useState({})

    useEffect(() => {
        dispatch(GetAreaDevelopment())
        dispatch(GetEmpAppraisal())
        dispatch(GetEmpAppraisalDetails(props.location.state?.appraisalData.emp_appr_id))
        setEmp_appr_id(props.location.state?.appraisalData.emp_appr_id)

        if (props.location.state?.appraisalData.task === "Employee Appraisal") {
            if (Number(localStorage.getItem("empId")) === 1) {
                setRowID(2)
            } else {
                setRowID(1)
            }
        }
        // setRowID(props.location.state?.appraisalData.task === "Employee Appraisal" ? 1 : 2)
    }, [props.location.state])


    useEffect(() => {
        let AreDevelopment = []
        props.GetAreaDevelopment.map((data) =>
            AreDevelopment.push({ id: data.area_development_id, value: data.area_development })
        );
        setAreDevelopment({ AreDevelopment });

        if (props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails.length > 0) {
            props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0][0]?.area_development.map((val) => {
                if (val.area_development_id === 1) {
                    addemployeeDetails.push({ details: val.details, date: val.details_date })
                    setAddemployeeDetails([...addemployeeDetails])
                } else if (val.area_development_id === 3) {
                    addemployeeseminar.push({ details: val.details, date: val.details_date })
                    setAddemployeeSeminar([...addemployeeseminar])
                } else {
                    addemployeeProgram.push({ details: val.details, date: val.details_date })
                    setAddemployeeProgram([...addemployeeProgram])
                }
            })

            Appraisal.comment.value = props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0][0]?.current_assignment_command
            setEmp_id(props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0][0]?.emp_id)
            console.log(props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0][0]?.emp_id, "emp")
            setTodoListdata(props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0][0])
        }


    }, [props.GetAreaDevelopment, props.GetEmpAppraisalDetails])

    useEffect(() => {
        setEmpDetail(props.GetEmpAppraisal)
    }, [props.GetEmpAppraisal])

    const AddempDetails = () => {
        dispatch(InsertAreaDevelopment(showKeys, Appraisal.details.value, Appraisal.date.value))
        if (showKeys === 1) {
            addemployeeDetails.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            setAddemployeeDetails([...addemployeeDetails])
        }
        else if (showKeys === 3) {
            addemployeeseminar.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            setAddemployeeSeminar([...addemployeeseminar])
        }
        else {
            addemployeeProgram.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            setAddemployeeProgram([...addemployeeProgram])
        }
        handleCancel()
    }

    function callback(key) {
        console.log(key);
    }

    // useEffect(() => {
    //     setRowID(rowId)

    // },[])


    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        if (data === 1 && key === "area_dev") {
            setShowKeys(data)
            setShowQual(true)
        }
        if (data === 2 && key === "area_dev") {
            setShowProgram(true)
            setShowKeys(data)
        }
        if (data === 3 && key === "area_dev") {
            setShowSeminar(true)
            setShowKeys(data)
        }

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Appraisal[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Appraisal[key].validation,
        };


        setAppraisal((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const appraisalModelOpen = (data, id) => {
        setModelOpen(true)
        setModelTitle(data)
        setModelCommentID(id)
    }
    // console.log(rowID, "rowID")


    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission && props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Appraisal - Save" == val.control
                )
            })
            setSaveRights(data_res_id)
        }


        var cars = 2;
        do {
            cars /= 2;
        } while (cars < 1);

        console.log("Number of cars: " + cars)

    }, [props.UserPermission]);


    // console.log(saveRights,"rights")

    function rightsNotification() {
        notification.success({
            message: "You are not Authorized. Please Contact Administrator",
        });
    }
    /////////////

    const onChange = e => {
        setRespbtn(e.target.value)
    }

    const linkChoose = (e) => {
        if (e.target.value === 2) {
            setChangeCheckbox(!changeCheckbox)
        }
        else {
            setChangeCheckbox(false)
        }
        setAssignbtn(e.target.value)
    }

    const addAppraisalcmt = (data, value) => {
        if (rowID === 1) {
            if (value === "appraisar_comments") {
                supmodelComment.appraisar_comments.values = data
            } else if (value === "instruction_action") {
                supmodelComment.instruction_action.values = data
            } else if (value === "advice_manage_parter") {
                supmodelComment.advice_manage_parter.values = data
            }
            setSupModelComment((prevState) => ({
                ...prevState,
            }));
        } else if (rowID == 2) {
            if (value === "instruction_to_appraise") {
                managemodelComment.instruction_to_appraise.value = data
            } else if (value === "advice_to_hod") {
                managemodelComment.advice_to_hod.value = data
            } else if (value === "instruction_to_admin_hod") {
                managemodelComment.instruction_to_admin_hod.value = data
            } else if (value === "fb_managing_parter") {
                managemodelComment.fb_managing_parter.value = data
            }
            setManageModelComment((prevState) => ({
                ...prevState,
            }));

        } else {
            if (value === "area_of_speci") {
                modelComment.area_of_speci.value = data
            } else if (value === "self_work_des") {
                modelComment.self_work_des.value = data
            } else if (value === "current_duties") {
                modelComment.current_duties.value = data
            } else if (value === "major_achievement") {
                modelComment.major_achievement.value = data
            } else if (value === "urge_to_learn") {
                modelComment.urge_to_learn.value = data
            } else if (value === "enhance_your_productivity") {
                modelComment.enhance_your_productivity.value = data
            } else if (value === "improvement_ssia") {
                modelComment.improvement_ssia.value = data
            } else if (value === "opinion_remark") {
                modelComment.opinion_remark.value = data
            } else if (value === "growth_plan_three_yrs") {
                modelComment.growth_plan_three_yrs.value = data
            } else if (value === "growth_plan_five_yrs") {
                modelComment.growth_plan_five_yrs.value = data
            }
            setModelComment((prevState) => ({
                ...prevState,
            }));
        }
    }


    const onsubmit = () => {
        if (enableSave === true) {
            if (rowID === 1) {
                dispatch(InsertApraisalSupervisor(supmodelComment, emp_appr_id))
            } else if (rowID == 2) {
                dispatch(InsertManagingPartnerEmpAppraisal(managemodelComment, emp_appr_id))
            }
        }
        else {
            if (rowID === 1) {
                notification.error({
                    message: ' Please give a Rating',
                });
            } else if (rowID == 2) {
                notification.error({
                    message: ' Please approve a Rating',
                });
            }
            else {
                dispatch(ApplyAppraisal(modelComment, respbtn, assignbtn, Appraisal))

            }

        }
    }


    const handleCancel = () => {
        let From_key = [
            "area_dev",
            "details",
            "date",
            "comment",
        ];

        From_key.map((data) => {
            try {
                Appraisal[data].value = "";
            } catch (error) {
                throw error;
            }
        });
        setAppraisal((prevState) => ({
            ...prevState,
        }));
    };


    const qualification = () => {
        return (
            <div className="employeeApprisal_Child_Container">
                <div className="TitleChildDiv">
                    <div>Qualification</div>
                    <div>Date</div>
                </div>
                <div className="gridDatashow">
                    {addemployeeDetails.map((data) => {
                        return (
                            <div className="ValueChildDiv">
                                <div>{data.details}</div>
                                <div>{data.date}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const program = () => {
        return (
            <div className="employeeApprisal_Child_Container">
                <div className="TitleChildDiv">
                    <div>Program</div>
                    <div>Date</div>
                </div>
                <div className="gridDatashow">
                    {addemployeeProgram.map((data) => {
                        return (
                            <div className="ValueChildDiv">
                                <div>{data.details}</div>
                                <div>{data.date}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const seminar = () => {
        return (
            <div className="employeeApprisal_Child_Container">
                <div className="TitleChildDiv">
                    <div>Seminar</div>
                    <div>Date</div>
                </div>
                <div className="gridDatashow">
                    {addemployeeseminar.map((data) => {
                        console.log(addemployeeseminar, "addemployeeseminar")
                        return (
                            <div className="ValueChildDiv">
                                <div>{data.details}</div>
                                <div>{data.date}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const changeenable = (data) => {
        setEnableSave(data)
    }


    return (
        <div>
            {/* { permission.allow_view==='Y'&& <div> */}
            <div>Appraisal</div>
            <div className="appraisalContainer">
                <div className="empDetails">
                    <div>
                        <div>Employee Name</div>
                        <div>{JSON.parse(localStorage.getItem("token")).user_name}</div>
                    </div>
                    {(rowID == 1 || rowID == 2) && <div>
                        <div>DOB</div>
                        <div>{moment(empDetail?.dob).format("DD-MMM-yyy")}</div>
                    </div>}
                    {(rowID == 1 || rowID == 2) && <div>
                        <div>DOJ</div>
                        <div>{moment(empDetail?.doj).format("DD-MMM-yyy")}</div>
                    </div>}
                    <div>
                        <div>Period</div>
                        <div>{moment(empDetail?.period_from).format("DD-MMM-yyy") + " to " + moment(empDetail?.period_to).format("DD-MMM-yyy")}</div>
                    </div>
                </div>

                {rowID == 1 || rowID == 2 ? null : <div>
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Area of Development</div>
                            <div>
                                <Labelbox type="select"
                                    changeData={(data) =>
                                        checkValidation(data, "area_dev")
                                    }
                                    value={Appraisal.area_dev.value}
                                    error={Appraisal.area_dev.error}
                                    errmsg={Appraisal.area_dev.errmsg}
                                    dropdown={areDevelopment.AreDevelopment}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Details</div>
                            <div>
                                <Labelbox type="text"
                                    changeData={(data) =>
                                        checkValidation(data, "details")
                                    }
                                    value={Appraisal.details.value}
                                    error={Appraisal.details.error}
                                    errmsg={Appraisal.details.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading">Date</div>
                            <div>
                                <Labelbox type="datepicker"
                                    changeData={(data) =>
                                        checkValidation(data, "date")
                                    }
                                    value={Appraisal.date.value}
                                    error={Appraisal.date.error}
                                    errmsg={Appraisal.date.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <br />
                            <img src={PlusIcon} onClick={AddempDetails} className="plusiconview" />
                        </Grid>
                    </Grid>

                </div>

                }
                <div className="employeeApprisal_Container">
                    {rowID == 1 || rowID == 2 ? addemployeeDetails.length > 0 && qualification() :
                        showQual && addemployeeDetails.length > 0 && qualification()}
                    {rowID == 1 || rowID == 2 ? addemployeeProgram.length > 0 && program() :
                        showProgram && addemployeeProgram.length > 0 && program()}
                    {rowID == 1 || rowID == 2 ? addemployeeseminar.length > 0 && seminar() :
                        showSeminar && addemployeeseminar.length > 0 && seminar()}
                </div>
            </div>


            {rowID == 1 || rowID == 2 ?
                <>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Area of Specialization" ><div>{todoListdata && todoListdata.area_of_speci}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Self work descripition (List out the details of works carried and the frequency)" ><div>{todoListdata && todoListdata.self_work_des}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Out of the above, list out your current duties/work, which is your opinion, are not you competency" ><div>{todoListdata && todoListdata.current_duties}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Major Achievements in the review period" ><div>{todoListdata && todoListdata.major_achievement}</div></Panel></Collapse>
                    </div>
                    <div className="linkChoose">
                        <div>Was your comfort level in your current responsibilities was adequate </div>
                        <div><Radio value={1}>{todoListdata && todoListdata.current_responsibilites}</Radio></div>
                    </div>

                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Urge to learn" ><div>{todoListdata && todoListdata.urge_to_learn}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Do you feel any specific training is required to enhance your productivity? if so, please specify" ><div>{todoListdata && todoListdata.enhance_your_productivity}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Suggestions, If any for improvement at SSIA" ><div>{todoListdata && todoListdata.improvement_ssia}</div></Panel></Collapse>
                    </div>
                    <div className="chooseleave">
                        <div className="linkChooseOption">
                            <div>Is your potential utilized fully in the current assignment </div>
                            <div> <Radio value={1}>{todoListdata && todoListdata.current_assignment}</Radio></div>
                        </div>
                        {todoListdata && todoListdata.current_assignment === "No" &&
                            <div className="reasonBox">
                                <div>Reason for why the potential was not fully utilized</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "comment")
                                        }
                                        value={Appraisal.comment.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Any other specific opinion/remarks" ><div>{todoListdata && todoListdata.opinion_remark}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Spell out your growth plan for the next three years" ><div>{todoListdata && todoListdata.growth_plan_three_yrs}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Spell out your growth plan for the next five years" ><div>{todoListdata && todoListdata.growth_plan_five_yrs}</div></Panel></Collapse>
                    </div>

                </>
                : <>
                    <div className="linkingModel">
                        <div className="linkview" id="areaofspec" onClick={() => appraisalModelOpen("Area of Specialization", "area_of_speci")}>Area of Specialization</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Self work descripition (List out the details of works carried and the frequency)", "self_work_des")}>Self work descripition (List out the details of works carried and the frequency)</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Out of the above, list out your current duties/work, which is your opinion, are not you competency", "current_duties")}>Out of the above, list out your current duties/work, which is your opinion, are not you competency</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Major Achievements in the review period", "major_achievement")}>Major Achievements in the review period</div>
                    </div>
                    <div className="subheading">In your opinion</div>
                    <div className="linkChoose">
                        <div>Was your comfort level in your current responsibilities was adequate </div>
                        <Radio.Group onChange={onChange} value={respbtn}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={2}>No</Radio>

                        </Radio.Group>
                        {/* <div><Checkbox /> Yes</div>
                        <div><Checkbox /> No</div> */}
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Urge to learn", "urge_to_learn")}>Urge to learn</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Do you feel any specific training is required to enhance your productivity? if so, please specify", "enhance_your_productivity")}>Do you feel any specific training is required to enhance your productivity? if so, please specify</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Suggestions, If any for improvement at SSIA", "improvement_ssia")}>Suggestions, If any for improvement at SSIA</div>
                    </div>
                    <div className="chooseleave">
                        <div className="linkChooseOption">
                            <div>Is your potential utilized fully in the current assignment </div>
                            <Radio.Group onChange={linkChoose} value={assignbtn}>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>

                            </Radio.Group>
                        </div>
                        {changeCheckbox &&
                            <div className="reasonBox">
                                <div>Reason for why the potential was not fully utilized</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "comment")
                                        }
                                        value={Appraisal.comment.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Any other specific opinion/remarks", "opinion_remark")}>Any other specific opinion/remarks</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Spell out your growth plan for the next three years", "growth_plan_three_yrs")}>Spell out your growth plan for the next three years</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Spell out your growth plan for the next five years", "growth_plan_five_yrs")}>Spell out your growth plan for the next five years</div>
                    </div>
                </>}
            <DynModel modelTitle={"Appraisal"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={<AppraisalModel modelTitle={modelTitle} modelCommentID={modelCommentID} addAppraisalcmt={(data, value) => addAppraisalcmt(data, value)} handleChangeCloseModel={(bln) => setModelOpen(bln)} />} />

            {(rowID == 1 || rowID == 2) &&
                <>
                    <div className="commentLine">------------------------------------------------------------- {rowID == 2 ? " Appraisal Section" : "Your comment "} ----------------------------------------------------------------</div>
                </>}
            {rowID == 1 &&
                <>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Appraiser Comments", "appraisar_comments")}>Appraiser Comments</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Instruction/Advice", "instruction_action")}>Instruction/Advice</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice to Managing Partner", "advice_manage_parter")}>Advice to Managing Partner</div>
                    </div>
                </>
            }

            {rowID == 2 &&
                <>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Appraiser Comments" ><div>{todoListdata && todoListdata.appraisar_comments}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Instruction/Advice" ><div>{todoListdata && todoListdata.instruction_action}</div></Panel></Collapse>
                    </div>
                    <div className="appraisal_collapse">
                        <Collapse onChange={callback}><Panel header="Advice to Managing Partner" ><div>{todoListdata && todoListdata.advice_manage_parter}</div></Panel></Collapse>
                    </div>
                </>}
            {rowID == 2 &&
                <>
                    <div className="commentLine">------------------------------------------------------------- Your comment  ----------------------------------------------------------------</div>
                </>}

            {
                rowID == 2 &&
                <>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice/Instruction to Appraise", "instruction_to_appraise")}>Advice/Instruction to Appraise</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice to HOD", "advice_to_hod")}>Advice to HOD</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Instruction to Head Admin/HOD", "instruction_to_admin_hod")}>Instruction to Head Admin/HOD</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Feedback of Managing Partner", "instruction_to_appraise")}>Feedback of Managing Partner</div>
                    </div>

                </>
            }

            <div className="appraisalBtn">
                {(rowID == 1 || rowID == 2) && <CustomButton btnName={"Rating"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => setRatingModelOpen(true)} />}
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={onsubmit} />

                <DynModel modelTitle={"Rating"} handleChangeModel={ratingModelOpen} handleChangeCloseModel={(bln) => setRatingModelOpen(bln)} content={<RatingModel employeeID={emp_id} rowID={rowID} empDetail={empDetail} handleChangeCloseModel={(bln) => setRatingModelOpen(bln)} changeenable={(data) => changeenable(data)} />} width={700} />


                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>



            {/* </div > } */}
        </div>
    )
}

const mapStateToProps = (state) =>
(
    console.log(state, "tesdfghjst"),
    {
        GetAreaDevelopment: state.getOptions.GetAreaDevelopment || [],
        GetEmpAppraisalDetails: state.GetEmpAppraisalDetails.GetEmpAppraisalDetails || [],
        GetEmpAppraisal: state.GetEmpAppraisalDetails.GetEmpAppraisal
    });
export default connect(mapStateToProps)(Appraisal);