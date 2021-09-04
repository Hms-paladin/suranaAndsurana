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
import { Redirect, Link } from 'react-router-dom';
import { GetAreaDevelopment } from '../../actions/MasterDropdowns';
import { ApplyAppraisal, InsertAreaDevelopment, GetEmpAppraisalDetails, UpdateApplyAppraisal, InsertApraisalSupervisor, GetEmpAppraisal, InsertManagingPartnerEmpAppraisal, GetEmpAppraisalDetailbyEmpid } from '../../actions/AppraisalAction';
import moment from 'moment';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EnhancedTable from '../../component/DynTable/table'

import axios from "axios";
import { apiurl } from "../../utils/baseUrl";



const { Panel } = Collapse;

function Appraisal(props) {
    const dispatch = useDispatch();
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
    const [rowID, setRowID] = useState("")
    const [todoListdata, setTodoListdata] = useState([])
    const [emp_appr_id, setEmp_appr_id] = useState()
    const [enableSave, setEnableSave] = useState(false)
    const [emp_id, setEmp_id] = useState()
    const [viewEmployee, setViewEmployee] = useState()
    const [showRatingDatas, setShowRatingDatas] = useState([])
    const [showApprovecmd, setShowApprovecmd] = useState()
    const [showmanagecmd, setShowmanagecmd] = useState()
    const [showrating, setShowrating] = useState()
    const [showratingDetails, setShowratingDetails] = useState([])
    const [ratingAttribute, setRatingAttribute] = useState({
        punchuvality: [{ key: "Always on time and completes the task well ahead of time", value: [9, 8, 7] }, { key: "Maintains the time and complete the tasks with few reminders", value: [6, 5, 4] }, { key: "Unable to keep up with time and requires constant reminders to complete the tasks", value: [3, 2, 1] }],
        communication: [{ key: "Able to express very clearly", value: [9, 8, 7] }, { key: "Able to express with some difficulty", value: [6, 5, 4] }, { key: "Improvement required to express the thoughts", value: [3, 2, 1] }],
        teamwork: [{ key: "Team Player", value: [9, 8, 7] }, { key: "Contributes, if requested", value: [6, 5, 4] }, { key: "Unable to cope up with team work", value: [3, 2, 1] }],
        endurance: [{ key: "Quality of work never varies in a stressed environment and ready to put in long hours", value: [9, 8, 7] }, { key: "Encouragement required once in a while", value: [6, 5, 4] }, { key: "Constant encouragement requires and breaks down very easily", value: [3, 2, 1] }],
        initiative: [{ key: "On Own, takes lot initiative in improving the quality of work", value: [9, 8, 7] }, { key: "With little push, takes initiative to improve the quality of work", value: [6, 5, 4] }, { key: "Carries out the woek only as instructed", value: [3, 2, 1] }],
        personalhabit: [{ key: "Courteous to superiors and colleagues", value: [9, 8, 7] }, { key: "Respectful and work along with other colleagues", value: [6, 5, 4] }, { key: "Respectful to superiors but doesn't have any concern for sub-ordinates", value: [3, 2, 1] }],
        commitment: [{ key: "Highly committed to the cause", value: [9, 8, 7] }, { key: "Does the needful", value: [6, 5, 4] }, { key: "Constant monitoring required.", value: [3, 2, 1] }],
        supervision: [{ key: "No supervision is required", value: [9, 8, 7] }, { key: "Supervision required sometimes", value: [6, 5, 4] },
        { key: "Supervision required all the times", value: [3, 2, 1] }],
        presentassignment: [{ key: "Very through in the area", value: [9, 8, 7] }, { key: "Satisfactory", value: [6, 5, 4] }, { key: "Needs lot of improvement", value: [3, 2, 1] }],
        applicationknowledge: [{ key: "Applies very efficiently", value: [9, 8, 7] }, { key: "Needs guidance sometimes", value: [6, 5, 4] }, { key: "Need to be guided always", value: [3, 2, 1] }],
        meatingdeadlines: [{ key: "Finishes assignments well ahead of deadlines", value: [9, 8, 7] }, { key: "Finishes in time and some degree of  monitoring required", value: [6, 5, 4] }, { key: "Always lag behind and requires constant prodding", value: [3, 2, 1] }],
        presentationskills: [{ key: "Excellent", value: [9, 8, 7] }, { key: "Satisfactory", value: [6, 5, 4] }, { key: "Needs lot of improvement", value: [3, 2, 1] }],
        suitableassignment: [{ key: "High Suitable", value: [9, 8, 7] }, { key: "With some hard work can do better", value: [6, 5, 4] }, { key: "Not suitable", value: [3, 2, 1] }],
        preparationdocument: [{ key: "Excellent", value: [9, 8, 7] }, { key: "Satisfactory", value: [6, 5, 4] }, { key: "Needs lot of improvements", value: [3, 2, 1] }],
        additionwork: [{ key: "Adds lot of value to any job", value: [9, 8, 7] }, { key: "Adds value once in a while", value: [6, 5, 4] }, { key: "PErforms a mediocre job", value: [3, 2, 1] }],
        clientmanagement: [{ key: "Handles client very effeciently", value: [9, 8, 7] }, { key: "Handles Satisfactorily", value: [6, 5, 4] }, { key: "Requires lot of improvement", value: [3, 2, 1] }],
        practicedevelopment: [{ key: "With own initiative brings in new business", value: [9, 8, 7] }, { key: "Occassionally uses the opportinities to bring in new business", value: [6, 5, 4] }, { key: "Never takes initiative to bring in new business", value: [3, 2, 1] }],
        prnetworking: [{ key: "Utilizes all the avenues  extensively, to promote the firm", value: [9, 8, 7] }, { key: "Whenever possible promotes the firm", value: [6, 5, 4] }, { key: "Never Utilizes, even the available opportunities to promote the firm.", value: [3, 2, 1] }]
    })
    const { punchuvality, communication, teamwork, endurance, initiative, personalhabit, commitment, supervision, presentassignment, applicationknowledge, meatingdeadlines, presentationskills, suitableassignment, preparationdocument, additionwork, clientmanagement, practicedevelopment, prnetworking } = ratingAttribute

    const rating = [punchuvality, communication, teamwork, endurance, initiative, personalhabit, commitment, supervision, presentassignment, applicationknowledge, meatingdeadlines, presentationskills, suitableassignment, preparationdocument, additionwork, clientmanagement, practicedevelopment, prnetworking]


    // Appraisal apply
    const [modelComment, setModelComment] = useState({
        area_of_speci: { value: "" }, self_work_des: { value: "" }, current_duties: { value: "" }, major_achievement: { value: "" }, urge_to_learn: { value: "" }, enhance_your_productivity: { value: "" }, improvement_ssia: { value: "" }, opinion_remark: { value: "" }, growth_plan_three_yrs: { value: "" }, growth_plan_five_yrs: { value: "" },
    })
    const { area_of_speci, self_work_des, current_duties, major_achievement, urge_to_learn, enhance_your_productivity, improvement_ssia, opinion_remark, growth_plan_three_yrs, growth_plan_five_yrs } = modelComment

    const EmpApply = [area_of_speci, self_work_des, current_duties, major_achievement, urge_to_learn, enhance_your_productivity, improvement_ssia, opinion_remark, growth_plan_three_yrs, growth_plan_five_yrs]


    //Approval
    const [supmodelComment, setSupModelComment] = useState({
        appraisar_comments: { values: "" }, instruction_action: { values: "" }, advice_manage_parter: { values: "" },
        area_of_speci_remarks: { values: "" },
        self_work_des_remarks: { values: "" },
        current_duties_remarks: { values: "" },
        major_achievement_remarks: { values: "" },
        urge_to_learn_remarks: { values: "" },
        enhance_your_productivity_remarks: { values: "" },
        improvement_ssia_remarks: { values: "" },
        opinion_remark_remarks: { values: "" },
        growth_plan_three_yrs_remarks: { values: "" },
        growth_plan_five_yrs_remarks: { values: "" },
        current_responsibilites_remarks: { values: "" }

    })

    const { appraisar_comments, instruction_action, advice_manage_parter, area_of_speci_remarks, self_work_des_remarks, current_duties_remarks,
        major_achievement_remarks, urge_to_learn_remarks, enhance_your_productivity_remarks, improvement_ssia_remarks, opinion_remark_remarks, growth_plan_three_yrs_remarks, growth_plan_five_yrs_remarks } = supmodelComment
    const Supervisor = [appraisar_comments, instruction_action, advice_manage_parter, area_of_speci_remarks, self_work_des_remarks, current_duties_remarks,
        major_achievement_remarks, urge_to_learn_remarks, enhance_your_productivity_remarks, improvement_ssia_remarks, opinion_remark_remarks, growth_plan_three_yrs_remarks, growth_plan_five_yrs_remarks]


    // Managing
    const [managemodelComment, setManageModelComment] = useState({
        instruction_to_appraise: { value: "" }, advice_to_hod: { value: "" }, instruction_to_admin_hod: { value: "" }, fb_managing_parter: { value: "" },
    })

    const { instruction_to_appraise, advice_to_hod, instruction_to_admin_hod, fb_managing_parter } = managemodelComment
    const Manageing = [instruction_to_appraise, advice_to_hod, instruction_to_admin_hod, fb_managing_parter]

    const [Appraisal, setAppraisal] = useState({
        area_dev: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        details: {
            value: "",
            validation: [{ "name": "required" }],
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
    const test = localStorage.getItem("designation").toString()

    const header = [
        { label: 'Area of Assessment' },
        { label: 'Appraisee  Response' },
        { label: 'Appraiser Remarks' },

    ];
    const rowData = null

    useEffect(() => {
        dispatch(GetAreaDevelopment())
        dispatch(GetEmpAppraisal())
        dispatch(GetEmpAppraisalDetails(props.location.state?.appraisalData?.emp_appr_id))
        dispatch(GetEmpAppraisalDetailbyEmpid())
        setEmp_appr_id(props.location.state?.appraisalData?.emp_appr_id);
        setSupModelComment(props.location?.prevState?.supmodelComment !== undefined ? props.location?.prevState?.supmodelComment : {
            appraisar_comments: { values: "" }, instruction_action: { values: "" }, advice_manage_parter: { values: "" },
            area_of_speci_remarks: { values: "" },
            self_work_des_remarks: { values: "" },
            current_duties_remarks: { values: "" },
            major_achievement_remarks: { values: "" },
            urge_to_learn_remarks: { values: "" },
            enhance_your_productivity_remarks: { values: "" },
            improvement_ssia_remarks: { values: "" },
            opinion_remark_remarks: { values: "" },
            growth_plan_three_yrs_remarks: { values: "" },
            growth_plan_five_yrs_remarks: { values: "" },
            current_responsibilites_remarks: { values: "" }
        })

        let designation = test.substring(1, 5 - 1)
        if (props.location.state?.appraisalData?.task === "Employee Appraisal") {
            if (designation === "HoD") {
                setRowID(1)
            } else {
                setRowID(2)
            }
        }
        // setRowID(props.location.state?.appraisalData.task === "Employee Appraisal" ? 1 : 2)
    }, [props.location.state, props.location.prevState])


    useEffect(() => {
        setEmpDetail(props.GetEmpAppraisal && props.GetEmpAppraisal[0])
        if (props.GetEmpAppraisal?.doj == props.GetEmpAppraisal?.period_from) {

        } else {
            setViewEmployee(3)
            setTodoListdata(props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.details[0])

            Appraisal.comment.value = props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0]?.current_assignment_command
            let apprDetails = props.GetEmpAppraisalDetailbyEmpid[0]?.details[0];
            modelComment["area_of_speci"].value = apprDetails?.area_of_speci;
            modelComment["self_work_des"].value = apprDetails?.self_work_des;
            modelComment["current_duties"].value = apprDetails?.current_duties;
            modelComment["major_achievement"].value = apprDetails?.major_achievement;
            modelComment["urge_to_learn"].value = apprDetails?.urge_to_learn;
            modelComment["enhance_your_productivity"].value = apprDetails?.enhance_your_productivity;
            modelComment["improvement_ssia"].value = apprDetails?.improvement_ssia;
            modelComment["opinion_remark"].value = apprDetails?.opinion_remark;
            modelComment["growth_plan_three_yrs"].value = apprDetails?.growth_plan_three_yrs;
            modelComment["growth_plan_five_yrs"].value = apprDetails?.growth_plan_five_yrs;
            setRespbtn(apprDetails?.current_responsibilites == "No" ? 2 : 1);
            setAssignbtn(apprDetails?.current_assignment == "No" ? 2 : 1);
            setModelComment((prevState) => ({
                ...prevState,
            }));

            Appraisal.comment.value = props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.details[0]?.current_assignment_command
            let details = props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.details[0]


            if (details?.appraisar_comments !== null, details?.advice_manage_parter !== null, details?.instruction_action !== null) {
                setShowApprovecmd(4)
            }
            if (details?.instruction_to_appraise !== null, details?.advice_to_hod !== null, details?.instruction_to_admin_hod !== null, details?.fb_managing_parter !== null) {
                setShowmanagecmd(5)
            }

            if (props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.rating.length == 18) {
                setShowrating(6)
                setShowratingDetails(props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.rating)
            }
            let arrVal = []

            addemployeeDetails.length == 0 && addemployeeseminar.length == 0 && addemployeeProgram.length == 0 && props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.qualification.forEach((data) => {
                if (data.area_development_id === 1) {
                    addemployeeDetails.push({ details: data.details, date: data.details_date })
                    // setAddemployeeDetails([...addemployeeDetails])
                } else if (data.area_development_id === 2) {
                    addemployeeseminar.push({ details: data.details, date: data.details_date })
                    // setAddemployeeSeminar([...addemployeeseminar])
                }
                else {
                    addemployeeProgram.push({ details: data.details, date: data.details_date })
                    // setAddemployeeProgram([...addemployeeProgram])
                }
            })

            props.GetEmpAppraisalDetailbyEmpid && props.GetEmpAppraisalDetailbyEmpid[0]?.rating.map((data, index) => {
                let obj = {}

                if (data.rating === 9 || data.rating === 8 || data.rating === 7) {
                    obj.key1 = data.rating
                    obj.key2 = "-"
                    obj.key3 = "-"
                }
                else if (data.rating === 6 || data.rating === 5 || data.rating === 4) {
                    obj.key2 = data.rating
                    obj.key1 = "-"
                    obj.key3 = "-"
                }
                else {
                    obj.key3 = data.rating
                    obj.key1 = "-"
                    obj.key2 = "-"
                }

                arrVal.push(obj)
            })
            setShowRatingDatas(arrVal)
        }

    }, [props.GetEmpAppraisal, props.GetEmpAppraisalDetailbyEmpid])

    useEffect(() => {
        let AreDevelopment = []
        props.GetAreaDevelopment.map((data) =>
            AreDevelopment.push({ id: data.area_development_id, value: data.area_development })
        );
        setAreDevelopment({ AreDevelopment });



        if (props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails.length > 0) {
            props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0]?.area_development?.map((val) => {
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
            setEmp_id(props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0]?.emp_id)

            setTodoListdata(props.GetEmpAppraisalDetails && props.GetEmpAppraisalDetails[0])



        }


    }, [props.GetAreaDevelopment, props.GetEmpAppraisalDetails])


    const AddempDetails = () => {
        dispatch(InsertAreaDevelopment(showKeys, Appraisal.details.value, Appraisal.date.value))
        if (showKeys === 1) {
            addemployeeDetails.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            // setAddemployeeDetails([...addemployeeDetails])
        }
        else if (showKeys === 3) {
            addemployeeseminar.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            // setAddemployeeSeminar([...addemployeeseminar])
        }
        else {
            addemployeeProgram.push({ details: Appraisal.details.value, date: Appraisal.date.value })
            // setAddemployeeProgram([...addemployeeProgram])
        }
        handleCancel()
    }

    function checkValidation(data, key) {


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



    }, [props.UserPermission]);


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
            else if (value === "area_of_speci_remarks") {
                supmodelComment.area_of_speci_remarks.values = data
            }
            else if (value === "self_work_des_remarks") {
                supmodelComment.self_work_des_remarks.values = data
            }
            else if (value === "current_duties_remarks") {
                supmodelComment.current_duties_remarks.values = data
            }
            else if (value === "major_achievement_remarks") {
                supmodelComment.major_achievement_remarks.values = data
            }
            else if (value === "urge_to_learn_remarks") {
                supmodelComment.urge_to_learn_remarks.values = data
            }
            else if (value === "enhance_your_productivity_remarks") {
                supmodelComment.enhance_your_productivity_remarks.values = data
            }
            else if (value === "improvement_ssia_remarks") {
                supmodelComment.improvement_ssia_remarks.values = data
            }
            else if (value === "opinion_remark_remarks") {
                supmodelComment.opinion_remark_remarks.values = data
            }
            else if (value === "growth_plan_three_yrs_remarks") {
                supmodelComment.growth_plan_three_yrs_remarks.values = data
            }
            else if (value === "growth_plan_five_yrs_remarks") {
                supmodelComment.growth_plan_five_yrs_remarks.values = data
            }
            else if (value === "current_responsibilites_remarks") {
                supmodelComment.current_responsibilites_remarks.values = data
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
            else if (value === "area_of_speci") {
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


    const onsubmit = (key) => {
        if (rowID === 1) {
            let checkQuestion = Supervisor.find((data) => {
                return data.values == ""
            })
            if (checkQuestion === undefined) {
                if (props.GetEmpAppraisalDetails[0]?.rating.length === 0) {
                    notification.error({
                        message: ' Please give a Rating',
                    });
                } else {
                    dispatch(InsertApraisalSupervisor(supmodelComment, emp_appr_id))
                }

            } else if (checkQuestion !== undefined) {
                notification.error({
                    message: ' Please Answer all the Questions',
                });
            } else {
                dispatch(InsertApraisalSupervisor(supmodelComment, emp_appr_id))
            }
        }
        else {
            if (key === 1) {


                dispatch(ApplyAppraisal(modelComment, respbtn, assignbtn, Appraisal, props.GetEmpAppraisalDetailbyEmpid[0]?.details[0]?.emp_appr_id))


                // dispatch(InsertManagingPartnerEmpAppraisal(managemodelComment, emp_appr_id))

            } else if (key === 2) {
                if (props.GetEmpAppraisalDetailbyEmpid[0]?.details?.length) {
                    dispatch(UpdateApplyAppraisal(props.GetEmpAppraisalDetailbyEmpid[0]?.details[0]?.emp_appr_id))
                    dispatch(GetAreaDevelopment())
                    dispatch(GetEmpAppraisal())
                    dispatch(GetEmpAppraisalDetails(props.location.state?.appraisalData?.emp_appr_id))
                    dispatch(GetEmpAppraisalDetailbyEmpid())
                }
                else {
                    dispatch(InsertManagingPartnerEmpAppraisal(managemodelComment, emp_appr_id))
                }
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

    function addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }

    const periodDate = new Date(moment(empDetail?.period_from).format("yyy-MM-DD")).getDate()
    const periodMonth = new Date(moment(empDetail?.period_from).format("yyy-MM-DD")).getMonth()
    const periodYear = new Date(moment(empDetail?.period_from).format("yyy-MM-DD")).getFullYear()

    const listratingDetails = (data, dropDownID) => {
        return (
            data.map((val, index) => {
                return (
                    <div className="showRatings" >
                        <div className="showratingContent">{val.key}</div>
                        <div className="showratingValue" >
                            {(showRatingDatas[dropDownID] && showRatingDatas[dropDownID]["key" + (index + 1)])}
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            {<div>
                {/* { permission.allow_view==='Y'&& <div> */}
                <div>Appraisal</div>
                <div className="appraisalContainer">
                    <div className="empDetails">
                        <div>
                            <div>Employee Name</div>

                            <div>{(rowID == 1 || rowID == 2) ? todoListdata && todoListdata.employee_name : JSON.parse(localStorage.getItem("token")).user_name}</div>
                        </div>
                        {/* {(rowID == 1 || rowID == 2) && <div>
                        <div>DOB</div>
                        <div>{moment(empDetail?.dob).format("DD-MMM-yyy")}</div>
                    </div>} */}
                        {(rowID == 1 || rowID == 2) && <div>
                            <div>DOJ</div>
                            <div>{moment(empDetail?.doj).format("DD-MMM-yyy")}</div>
                        </div>}
                        {(rowID == 1 || rowID == 2) ? <div>
                            <div>Period</div>
                            <div>{moment(empDetail?.period_from).format("DD-MMM-yyy") + " to " + moment(new Date(new Date(addMonths(new Date(Number(periodYear), Number(periodMonth), Number(periodDate)), 6).toString()))).format("DD-MMM-yyy")}</div>
                        </div>
                            :
                            <div>
                                <div>Period</div>
                                <div>{moment(empDetail?.period_from).format("DD-MMM-yyy") + " to " + moment(new Date(addMonths(new Date(Number(periodYear), Number(periodMonth), Number(periodDate)), 6).toString())).format("DD-MMM-yyy")}</div>
                            </div>
                        }
                    </div>

                    {rowID == 1 || rowID == 2 || viewEmployee == 3 ? null : <div>
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
                        {rowID == 1 || rowID == 2 || viewEmployee == 3 ? addemployeeDetails.length > 0 && qualification() :
                            showQual && addemployeeDetails.length > 0 && qualification()}
                        {rowID == 1 || rowID == 2 || viewEmployee == 3 ? addemployeeProgram.length > 0 && program() :
                            showProgram && addemployeeProgram.length > 0 && program()}
                        {rowID == 1 || rowID == 2 || viewEmployee == 3 ? addemployeeseminar.length > 0 && seminar() :
                            showSeminar && addemployeeseminar.length > 0 && seminar()}
                    </div>
                </div>


                {rowID == 1 &&
                    <>
                        {/* <div className="appraisal_collapse">
                            <Collapse onChange={callback}></Collapse> <Panel header="Area of Specialization" ><div>{todoListdata && todoListdata.area_of_speci}</div></Panel>
                        </div> */}

                        <Grid item xs={12} container direction="row" >
                            <div className=" linkChoose3">
                                <Grid item xs={4} >
                                    <div>
                                        Area of Assessment
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>
                                        Appraisee Response
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>
                                        Appraiser Remarks
                                    </div>
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Area of Specialization
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata && todoListdata.area_of_speci}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "area_of_speci_remarks")
                                        }
                                        value={todoListdata?.area_of_speci_remarks ? todoListdata?.area_of_speci_remarks : supmodelComment.area_of_speci_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Self work descripition (List out the details of works carried and the frequency)
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata && todoListdata.self_work_des}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "self_work_des_remarks")
                                        }
                                        value={todoListdata?.self_work_des_remarks ? todoListdata?.self_work_des_remarks : supmodelComment.self_work_des_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Out of the above, list out your current duties/work, which is your opinion, are not you competency
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata && todoListdata.current_duties}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "current_duties_remarks")
                                        }
                                        value={todoListdata?.current_duties_remarks ? todoListdata?.current_duties_remarks : supmodelComment.current_duties_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Major Achievements in the review period</div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata && todoListdata.self_work_des}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "major_achievement_remarks")
                                        }
                                        value={todoListdata?.major_achievement_remarks ? todoListdata?.major_achievement_remarks : supmodelComment.major_achievement_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Was your comfort level in your current responsibilities was adequate</div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div className="yesorNoView">{todoListdata && todoListdata.current_responsibilites == "No" ? "No" : "Yes"}</div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "current_responsibilites_remarks")
                                        }
                                        value={todoListdata?.current_responsibilites_remarks ? todoListdata?.current_responsibilites_remarks : supmodelComment.current_responsibilites_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Urge to learn
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata && todoListdata.urge_to_learn}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "urge_to_learn_remarks")
                                        }
                                        value={todoListdata?.urge_to_learn_remarks ? todoListdata?.urge_to_learn_remarks : supmodelComment.urge_to_learn_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Do you feel any specific training is required to enhance your productivity? if so, please specify
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"

                                        value={todoListdata && todoListdata.enhance_your_productivity}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "enhance_your_productivity_remarks")
                                        }
                                        value={todoListdata?.enhance_your_productivity_remarks ? todoListdata?.enhance_your_productivity_remarks : supmodelComment.enhance_your_productivity_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Suggestions, If any for improvement at SSIA
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        disabled={true}
                                        value={todoListdata && todoListdata.improvement_ssia}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "improvement_ssia_remarks")
                                        }
                                        value={todoListdata?.improvement_ssia_remarks ? todoListdata?.improvement_ssia_remarksS : supmodelComment.improvement_ssia_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Any other specific opinion/remarks
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        disabled={true}
                                        value={todoListdata && todoListdata.opinion_remark}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "opinion_remark_remarks")
                                        }
                                        value={todoListdata?.opinion_remark_remarks ? todoListdata?.opinion_remark_remarks : supmodelComment.opinion_remark_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Spell out your growth plan for the next three years
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        disabled={true}
                                        value={todoListdata && todoListdata.growth_plan_three_yrs}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "growth_plan_three_yrs_remarks")
                                        }
                                        value={todoListdata?.growth_plan_five_yrs_remarks ? todoListdata?.growth_plan_five_yrs_remarks : supmodelComment.growth_plan_three_yrs_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Spell out your growth plan for the next five years
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        disabled={true}
                                        value={todoListdata && todoListdata.growth_plan_five_yrs}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "growth_plan_five_yrs_remarks")
                                        }
                                        value={todoListdata?.growth_plan_three_yrs_remarks ? todoListdata?.growth_plan_three_yrs_remarks : supmodelComment.growth_plan_five_yrs_remarks.values}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Is your potential utilized fully in the current assignment
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div className="yesorNoView">{todoListdata && todoListdata.current_assignment == "No" ? "No" : "Yes"}</div>
                                </Grid>
                            </div>
                            {todoListdata && todoListdata.current_assignment === "No" || assignbtn == 2 &&
                                <div className=" linkChoose">
                                    <Grid item xs={4} >
                                        <div>
                                            Reason for why the potential was not fully utilized
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <div className="reasonBox">
                                            <div className="reasonscmt">
                                                <Labelbox type="textarea"
                                                    disabled={true}
                                                    value={Appraisal.comment.value}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Labelbox type="text"
                                            changeData={(data) =>
                                                addAppraisalcmt(data, "comment")
                                            }
                                            value={todoListdata?.current_assignment_remarks ? todoListdata?.current_assignment_remarks : todoListdata && todoListdata.current_assignment_remarks}
                                            error={Appraisal.comment.error}
                                            errmsg={Appraisal.comment.errmsg}
                                        />
                                    </Grid>
                                </div>
                            }
                        </Grid>
                    </>
                }
                {rowID !== 1 &&
                    <>
                        <Grid item xs={12} container direction="row" >
                            <div className=" linkChoose3">
                                <Grid item xs={4} >
                                    <div>
                                        Area of Assessment
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>
                                        Appraisee Response
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>
                                        Appraiser Remarks
                                    </div>
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Area of Specialization
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "area_of_speci")
                                        }
                                        value={modelComment?.area_of_speci.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.area_of_speci_remarks ? todoListdata?.area_of_speci_remarks : supmodelComment.area_of_speci_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Self work descripition (List out the details of works carried and the frequency)
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "self_work_des")
                                        }
                                        value={modelComment?.self_work_des.value} error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.self_work_des_remarks ? todoListdata?.self_work_des_remarks : supmodelComment.self_work_des_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Out of the above, list out your current duties/work, which is your opinion, are not you competency
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "current_duties")
                                        }
                                        value={modelComment?.current_duties.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.current_duties_remarks ? todoListdata?.current_duties_remarks : supmodelComment.current_duties_remarks.values}

                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Major Achievements in the review period</div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "major_achievement")
                                        }
                                        value={modelComment?.major_achievement.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.major_achievement_remarks ? todoListdata?.major_achievement_remarks : supmodelComment.major_achievement_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Was your comfort level in your current responsibilities was adequate</div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Radio.Group onChange={onChange} value={respbtn}>
                                        <Radio value={1}>Yes</Radio>
                                        <Radio value={2}>No</Radio>
                                    </Radio.Group>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.current_responsibilites_remarks ? todoListdata?.current_responsibilites_remarks : supmodelComment.current_responsibilites_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Urge to learn
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "urge_to_learn")
                                        }
                                        value={modelComment?.urge_to_learn.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.urge_to_learn_remarks ? todoListdata?.urge_to_learn_remarks : supmodelComment.urge_to_learn_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Do you feel any specific training is required to enhance your productivity? if so, please specify
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "enhance_your_productivity")
                                        }
                                        value={modelComment?.enhance_your_productivity.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.enhance_your_productivity_remarks ? todoListdata?.enhance_your_productivity_remarks : supmodelComment.enhance_your_productivity_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Suggestions, If any for improvement at SSIA
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "improvement_ssia")
                                        }
                                        value={modelComment?.improvement_ssia.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.improvement_ssia_remarks ? todoListdata?.improvement_ssia_remarksS : supmodelComment.improvement_ssia_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Is your potential utilized fully in the current assignment
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Radio.Group onChange={linkChoose} value={assignbtn}>
                                        <Radio value={1}>Yes</Radio>
                                        <Radio value={2}>No</Radio>

                                    </Radio.Group>
                                </Grid>
                            </div>
                            {changeCheckbox &&
                                <div className=" linkChoose">
                                    <Grid item xs={4} >
                                        <div>
                                            Reason for why the potential was not fully utilized
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Labelbox type="text"
                                            changeData={(data) =>
                                                checkValidation(data, "comment")
                                            }
                                            // value={modelComment?.improvement_ssia.value}
                                            error={Appraisal.comment.error}
                                            errmsg={Appraisal.comment.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Labelbox type="text"
                                            value={todoListdata?.current_assignment_remarks ? todoListdata?.current_assignment_remarks : todoListdata && todoListdata.current_assignment_remarks}
                                            disabled={true}
                                        />
                                    </Grid>
                                </div>}
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Any other specific opinion/remarks
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "opinion_remark")
                                        }
                                        value={modelComment?.opinion_remark.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.opinion_remark_remarks ? todoListdata?.opinion_remark_remarks : supmodelComment.opinion_remark_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Spell out your growth plan for the next three years
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "growth_plan_three_yrs")
                                        }
                                        value={modelComment?.growth_plan_three_yrs.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.growth_plan_five_yrs_remarks ? todoListdata?.growth_plan_five_yrs_remarks : supmodelComment.growth_plan_three_yrs_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                            <div className=" linkChoose">
                                <Grid item xs={4} >
                                    <div>
                                        Spell out your growth plan for the next five years
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            addAppraisalcmt(data, "growth_plan_five_yrs")
                                        }
                                        value={modelComment?.growth_plan_five_yrs.value}
                                        error={Appraisal.comment.error}
                                        errmsg={Appraisal.comment.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <Labelbox type="text"
                                        value={todoListdata?.growth_plan_three_yrs_remarks ? todoListdata?.growth_plan_three_yrs_remarks : supmodelComment.growth_plan_five_yrs_remarks.values}
                                        disabled={true}
                                    />
                                </Grid>
                            </div>
                        </Grid>

                    </>

                }
                {/* <DynModel modelTitle={"Appraisal"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={<AppraisalModel modelTitle={modelTitle} modelCommentID={modelCommentID} addAppraisalcmt={(data, value) => addAppraisalcmt(data, value)} handleChangeCloseModel={(bln) => setModelOpen(bln)} modelComment={modelComment} supmodelComment={supmodelComment} managemodelComment={managemodelComment} />} /> */}

                {
                    (rowID == 1) &&
                    <>
                        <div className="commentLine">------------------------------------------------------------- {rowID == 2 || showApprovecmd == 4 ? " Appraisal Section" : "Your comment "} -----------------------------------------------------</div>
                    </>
                }

                {
                    (rowID == 2 || showApprovecmd == 4) && (todoListdata?.appraisar_comments || todoListdata?.instruction_action || todoListdata?.advice_manage_parter) &&
                    <>
                        <div className="commentLine">------------------------------------------------------------- {rowID == 2 || showApprovecmd == 4 ? " Appraisal Section" : "Your comment "} -----------------------------------------------------</div>
                    </>
                }
                {
                    rowID == 1 && (todoListdata?.appraisar_comments || todoListdata?.advice_manage_parter || todoListdata?.instruction_actioN) &&
                    <>
                        <Grid item xs={12} container direction="row" spacing={2}>
                            <div className=" linkChooseBox">
                                <Grid item xs={4} >
                                    <div>Appraiser Comments</div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            changeData={(data) =>
                                                addAppraisalcmt(data, "appraisar_comments")
                                            }
                                            value={supmodelComment.appraisar_comments.values}
                                            error={Appraisal.comment.error}
                                            errmsg={Appraisal.comment.errmsg}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>Instruction/Advice</div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            changeData={(data) =>
                                                addAppraisalcmt(data, "instruction_action")
                                            }
                                            value={supmodelComment.instruction_action.values}
                                            error={Appraisal.comment.error}
                                            errmsg={Appraisal.comment.errmsg}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>Advice to managing patner </div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            changeData={(data) =>
                                                addAppraisalcmt(data, "advice_manage_parter")
                                            }
                                            value={supmodelComment.advice_manage_parter.values}
                                            error={Appraisal.comment.error}
                                            errmsg={Appraisal.comment.errmsg}
                                        />
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </>
                }

                {
                    (rowID == 2 || showApprovecmd == 4) && (todoListdata?.appraisar_comments || todoListdata?.instruction_action || todoListdata?.advice_manage_parter) &&
                    <>
                        <Grid item xs={12} container direction="row" spacing={2}>
                            <div className=" linkChooseBox">
                                <Grid item xs={4} >
                                    <div>Appraiser Comments</div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            value={todoListdata && todoListdata.appraisar_comments}
                                            disabled={true}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>Instruction/Advice</div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            value={todoListdata && todoListdata.instruction_action}
                                            disabled={true}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4} >
                                    <div>Advice to managing patner </div>
                                    <div className="linkChooseBoxReason">
                                        <Labelbox type="textarea"
                                            value={todoListdata && todoListdata.advice_manage_parter}
                                            disabled={true}
                                        />
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </>
                }
                {
                    // rowID == 2 || showmanagecmd == 5 &&
                    // <>
                    //     <div className="commentLine">-------------------------------------------------------------{showmanagecmd == 5 ? "Managing Partner" : "Your comment"}   -----------------------------------------------------</div>
                    // </>
                }

                {
                    // rowID == 2 &&
                    // <>

                    //     <Grid item xs={12} container direction="row" spacing={2}>
                    //         <div className=" linkChooseBox">
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Advice/Instruction to Appraise</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "instruction_to_appraise")
                    //                         }
                    //                         value={managemodelComment.instruction_to_appraise.value}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Advice to HOD</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "advice_to_hod")
                    //                         }
                    //                         value={managemodelComment.advice_to_hod.value}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Instruction to Head Admin/HOD</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "instruction_to_admin_hod")
                    //                         }
                    //                         value={managemodelComment.instruction_to_admin_hod.value}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Feedback of Managing Partner</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "fb_managing_parter")
                    //                         }
                    //                         value={managemodelComment.fb_managing_parter.value}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //         </div>
                    //     </Grid>
                    // </>
                }
                {
                    // showmanagecmd == 5 &&
                    // <>
                    //     {/* <div className="appraisal_collapse">
                    //         <Collapse onChange={callback}><Panel header="Advice/Instruction to Appraise" ><div>{todoListdata && todoListdata.instruction_to_appraise}</div></Panel></Collapse>
                    //     </div>
                    //     <div className="appraisal_collapse">
                    //         <Collapse onChange={callback}><Panel header="Advice to HOD" ><div>{todoListdata && todoListdata.advice_to_hod}</div></Panel></Collapse>
                    //     </div>
                    //     <div className="appraisal_collapse">
                    //         <Collapse onChange={callback}><Panel header="Instruction to Head Admin/HOD" ><div>{todoListdata && todoListdata.instruction_to_admin_hod}</div></Panel></Collapse>
                    //     </div>
                    //     <div className="appraisal_collapse">
                    //         <Collapse onChange={callback}><Panel header="Feedback of Managing Partner" ><div>{todoListdata && todoListdata.fb_managing_parter}</div></Panel></Collapse>
                    //     </div> */}
                    //     <Grid item xs={12} container direction="row" spacing={2}>
                    //         <div className=" linkChooseBox">
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Advice/Instruction to Appraise</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "instruction_to_appraise")
                    //                         }
                    //                         value={todoListdata && todoListdata.instruction_to_appraise}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Advice to HOD</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "advice_to_hod")
                    //                         }
                    //                         value={todoListdata && todoListdata.advice_to_hod}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Instruction to Head Admin/HOD</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "instruction_to_admin_hod")
                    //                         }
                    //                         value={todoListdata && todoListdata.instruction_to_admin_hod}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //             <Grid item xs={3} >
                    //                 <div className="boxHeader">Feedback of Managing Partner</div>
                    //                 <div className="linkChooseBoxReason">
                    //                     <Labelbox type="textarea"
                    //                         changeData={(data) =>
                    //                             addAppraisalcmt(data, "fb_managing_parter")
                    //                         }
                    //                         value={todoListdata && todoListdata.fb_managing_parter}
                    //                         error={Appraisal.comment.error}
                    //                         errmsg={Appraisal.comment.errmsg}
                    //                     />
                    //                 </div>
                    //             </Grid>
                    //         </div>
                    //     </Grid>
                    // </>
                }
                {
                    showrating == 6 &&
                    <>
                        <div className="commentLine">---------------------------------------------------------------- Rating  ------------------------------------------------------------</div>
                        <div className="showRatingtable">
                            {showratingDetails && showratingDetails.map((val, index) => {

                                return (
                                    <div className="showRateingscontainer">
                                        <div className="ratingHeading">{val.area_of_development}</div>
                                        <div> {listratingDetails(rating[val.development_id - 1], index)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
                <div className="appraisalBtn">
                    {rowID && (rowID == 1 || rowID == 2) && <>
                        {props.GetEmpAppraisalDetails[0]?.rating?.length === 0 ?
                            <Link to={{
                                pathname: '/Home/ratingModel',
                                ids: { emp_appr_id: emp_appr_id, employeeID: emp_id, rowID: rowID, empDetail: empDetail },
                                state: props.location?.state,
                                prevState: { supmodelComment }
                            }}>
                                <CustomButton btnName={"Rating"} btnCustomColor="customPrimary" btnDisable={props.GetEmpAppraisalDetails[0]?.rating.length === 0 ? false : true} custombtnCSS="custom_save" />
                            </Link>
                            : <CustomButton btnName={"Rating"} btnDisable={true} custombtnCSS="custom_save" />}</>}
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={() => onsubmit(1)} />

                    {
                        (viewEmployee === 3) &&
                        <CustomButton btnName={"Submit"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={(props.GetEmpAppraisalDetailbyEmpid[0]?.details?.length === 1) ? false : true} onBtnClick={() => onsubmit(2)} />
                    }
                    {(rowID == 1 || rowID == 2 || viewEmployee !== 3) && <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />}
                </div>
            </div >
            }
        </div >
    )
}

const mapStateToProps = (state) =>
(
    {
        GetAreaDevelopment: state.getOptions.GetAreaDevelopment || [],
        GetEmpAppraisalDetails: state.GetEmpAppraisalDetails.GetEmpAppraisalDetails || [],
        GetEmpAppraisal: state.GetEmpAppraisalDetails.GetEmpAppraisal || [],
        GetEmpAppraisalDetailbyEmpid: state.GetEmpAppraisalDetails.GetEmpAppraisalDetailbyEmpid || []
    });
export default connect(mapStateToProps)(Appraisal);