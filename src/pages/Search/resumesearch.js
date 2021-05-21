import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Radio, Select, Checkbox } from 'antd';
import EnhancedTable from '../../component/DynTable/table';
import DynModel from './model';
import DynModelcom from "../../component/Model/model";
import { GetResumeList } from '../../actions/ResumeAction';
import { useDispatch, connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { ResumeSearchStatus, searchRowdata } from "../../actions/ResumeSearchAction";
import { getSkills, getTraits, getCertification, getAchievement, getSpecilization, getCapability, getTalents, getStatus, getQualification } from "../../actions/MasterDropdowns";
import CustomButton from "../../component/Butttons/button";
import ValidationLibrary from "../../helpers/validationfunction";
import Eyes from "../../images/neweye.svg";
import DynModelView from "../Interview/model";
import './search.scss'
import ResumeForm from '../Resume/resume';
import Edit from "../../images/editable.svg";
// import ResumePage from '../Resume/resume'



const headCells = [
    { id: "view", label: "View/Edit" },
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'basic', label: ' Qualification' },
    { id: 'language', label: 'Languages ' },
    { id: 'certification', label: 'Certification' },
    { id: 'specialization', label: 'Specialization' },
    // { id: 'acheivements', label: 'Achievements' },
    { id: 'talents', label: 'Talents' },
    { id: 'experience', label: 'Experience' },


];

function Resumesearch(props) {

    const [pathname, setpathname] = useState(window.location.pathname);
    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)
    const [optionvalues, setoptionvalues] = useState([]);
    const [resumeSearchList, setGetList] = useState({})
    const [rows, setRowData] = useState([])
    const [checkList, setCheckedList] = useState({})
    const [test, setTest] = useState(true)
    const [selectedCandidateId, setSelectedCandidateId] = useState([]);
    const [viewId, setViewId] = useState("")
    const [editResumeRow, setEditResumeRow] = useState({})
    const [candidateViewModel, setCandidateViewModel] = useState(false)
    const [editModel, setEditModel] = useState(false)
    const [ResumeSearch_Form, setResumeSearchFrom] = useState({
        skills: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        traits: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        certification: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        acheivements: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        specialization: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        capabilities: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        talents: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        status: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        exp_min: {
            value: "",
            validation: [{ "name": "numericanddot" }],
            error: null,
            errmsg: null,
        },
        exp_max: {
            value: "",
            validation: [{ "name": "allowNumaricOnly" }, { "name": "customminValue", "params": "0" }],
            error: null,
            errmsg: null,
        },
        qualification: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        }
    })



    useEffect(() => {
        dispatch(getSkills())
        dispatch(getTraits())
        dispatch(getCertification())
        dispatch(getAchievement())
        dispatch(getSpecilization())
        dispatch(getCapability())
        dispatch(getTalents())
        // dispatch(getStatus())
        dispatch(getQualification())

        dispatch(searchRowdata({
            "skill_id": "",
            "trait_id": "",
            "certification_id": "",
            "achievement_id": "",
            "specialization_id": "",
            "capability_id": "",
            "talent_id": "",
            "status_id": "",
            "qualification_id": "",
            "exp_min": "",
            "exp_max": ""

        }))
    }, [])

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ResumeSearch_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ResumeSearch_Form[key].validation
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


        // experience max

        if (data && key == "exp_min") {
            ResumeSearch_Form.exp_max.validation[1].params = data
            setResumeSearchFrom((prevState) => ({
                ...prevState,
            }));
        }

        setResumeSearchFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    useEffect(() => {
        const { getSkills, getTraits, getCertification, getAchievement, getSpecilization, getCapability, getTalents, getStatus, getQualification } = props.GetOptions

        let skillList = []
        let traitsList = []
        let certificationList = []
        let achievementList = []
        let specilizationList = []
        let capabilityList = []
        let talentList = []
        let statusList = []
        let qualification = []
        getQualification.map((data) => {
            qualification.push({ id: data.qualification_id, value: data.qual_name })
        })
        getSkills.map((data) => {
            skillList.push({ id: data.skill_id, value: data.skill_name })
        })

        getTraits.map((data) => {
            traitsList.push({ id: data.traitTable, value: data.traits })
        })

        getCertification.map((data) => {
            certificationList.push({ id: data.certification_id, value: data.certification })
        })

        getAchievement.map((data) => {
            achievementList.push({ id: data.achievement_id, value: data.achievement })
        })

        getSpecilization.map((data) => {
            specilizationList.push({ id: data.specialization_id, value: data.specilization })
        })

        getCapability.map((data) => {
            capabilityList.push({ id: data.capability_id, value: data.capability })
        })

        getTalents.map((data) => {
            talentList.push({ id: data.talent_id, value: data.talent })
        })

        getStatus.map((data) => {
            statusList.push({ id: data.status_id, value: data.status })
        })

        setGetList({ skillList, traitsList, certificationList, achievementList, specilizationList, capabilityList, talentList, talentList, statusList, qualification })
    }, [props.GetOptions])


    const handleCheck = (event, resume_id) => {
        if (selectedCandidateId.includes(resume_id)) {
            selectedCandidateId.map((data, index) => {
                if (data === resume_id) {
                    selectedCandidateId.splice(index, 1);
                }
            })

        } else {
            selectedCandidateId.push(resume_id)
        }

        setCheckedList(
            prevState => ({
                ...prevState,
                [event.target.name]: !checkList[event.target.name],
            })
        )
        setTest(!test)
    }

    const handleUnCheck = () => {
        let obj = Object.keys(checkList);
        setCheckedList({})
        obj.map((data) => {
            setCheckedList(
                prevState => ({
                    ...prevState,
                    [data]: false,
                })
            )
        })
        obj = [];
    }
    const viewCandidate = (id) => {
        setViewId(id)
        setCandidateViewModel(true)
    }
    const editResume = (id) => {
        // setEditId(id)
        dispatch(GetResumeList(id))

        setEditModel(true)
    }



    useEffect(() => {
        setEditResumeRow(props.GetResumeList[0]?.result)
    }, [props.GetResumeList])

    console.log(editResumeRow, "GetResumeList")



    useEffect(() => {
        let rowDataList = []
        console.log(props.GetRowData, "GetRowData")
        props.GetRowData && props.GetRowData.map((data, index) => {
            rowDataList.push({
                view: <> <img
                    src={Eyes}
                    className="viewCandidatesList"
                    onClick={() => viewCandidate(data.resume_id)}
                />  <img
                        src={Edit}
                        className="viewCandidatesList"
                        onClick={() => editResume(data.resume_id)}
                    // onClick={() => viewCandidate(data.resume_id)}
                    />
                </>, name: data.name, age: data.age, gender: data.gender === "M" ? "Male" : "Female",
                basic: data.basic_qual, language: data.language, certification: data.certifications,
                specialization: data.specialization, talents: data.talent, experience: data.experience,
                box: <Checkbox onClick={(event) => handleCheck(event, data.resume_id)} name={"checked" + index}
                    checked={checkList["checked" + index]} value={checkList["checked" + index]} />
            })
        })

        setRowData(rowDataList)
        console.log()
    }, [props.GetRowData, test, checkList])

    // const resumeEditPage = () => {
    //     return (
    //         <ResumeForm resumeEditid={editId} />

    //     )
    // }


    function onSearch() {
        dispatch(searchRowdata({
            "skill_id": ResumeSearch_Form.skills.valueById ? ResumeSearch_Form.skills.valueById : "",
            "trait_id": ResumeSearch_Form.traits.valueById ? ResumeSearch_Form.traits.valueById : "",
            "certification_id": ResumeSearch_Form.certification.valueById ? ResumeSearch_Form.certification.valueById : "",
            "achievement_id": ResumeSearch_Form.acheivements.valueById ? ResumeSearch_Form.acheivements.valueById : "",
            "specialization_id": ResumeSearch_Form.specialization.valueById ? ResumeSearch_Form.specialization.valueById : "",
            "capability_id": ResumeSearch_Form.capabilities.valueById ? ResumeSearch_Form.capabilities.valueById : "",
            "talent_id": ResumeSearch_Form.talents.valueById ? ResumeSearch_Form.talents.valueById : "",
            "status_id": ResumeSearch_Form.status.valueById ? ResumeSearch_Form.status.valueById : "",
            "qualification_id": ResumeSearch_Form.qualification.valueById ? ResumeSearch_Form.qualification.valueById : "",
            "exp_min": ResumeSearch_Form.exp_min.value ? ResumeSearch_Form.exp_min.value : "",
            "exp_max": ResumeSearch_Form.exp_max.value ? ResumeSearch_Form.exp_max.value : "",
            // "experience": ResumeSearch_Form.status.valueById ? ResumeSearch_Form.status.valueById : ""

        }))
    }

    return (
        <div>
            <div>
                <div className="searchBoxContainer">
                    <Grid item xs={12} container spacing={2} direction="row">
                        <Grid item xs={1} ></Grid>
                        <Grid item xs={2}>
                            <Labelbox type="select"
                                placeholder="Skills"
                                dropdown={resumeSearchList.skillList}
                                changeData={(data) => checkValidation(data, "skills", resumeSearchList.skillList)}
                                value={ResumeSearch_Form.skills.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Traits"
                                dropdown={resumeSearchList.traitsList}
                                changeData={(data) => checkValidation(data, "traits", resumeSearchList.traitsList)}
                                value={ResumeSearch_Form.traits.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Certifications"
                                dropdown={resumeSearchList.certificationList}
                                changeData={(data) => checkValidation(data, "certification", resumeSearchList.certificationList)}
                                value={ResumeSearch_Form.certification.value}
                                mode="multiple"
                            />
                        </Grid>
                        {/* <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Achievements"
                                dropdown={resumeSearchList.achievementList}
                                changeData={(data) => checkValidation(data, "acheivements", resumeSearchList.achievementList)}
                                value={ResumeSearch_Form.acheivements.value}
                                mode="multiple"
                            />
                        </Grid> */}
                        <Grid item xs={2}>
                            <Labelbox type="select"
                                placeholder="Specialization"
                                dropdown={resumeSearchList.specilizationList}
                                changeData={(data) => checkValidation(data, "specialization", resumeSearchList.specilizationList)}
                                value={ResumeSearch_Form.specialization.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Capabilities"
                                dropdown={resumeSearchList.capabilityList}
                                changeData={(data) => checkValidation(data, "capabilities", resumeSearchList.capabilityList)}
                                value={ResumeSearch_Form.capabilities.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={1} >

                        </Grid>
                        <Grid item xs={1} ></Grid>


                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Talents"
                                dropdown={resumeSearchList.talentList}
                                changeData={(data) => checkValidation(data, "talents", resumeSearchList.talentList)}
                                value={ResumeSearch_Form.talents.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <Labelbox type="select"
                                placeholder="Qualification"
                                dropdown={resumeSearchList.qualification}
                                changeData={(data) => checkValidation(data, "qualification", resumeSearchList.qualification)}
                                value={ResumeSearch_Form.qualification.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="experienceSearch">
                                <div>Experience</div>
                                <div><Labelbox type="text"
                                    placeholder="Min"
                                    changeData={(data) => checkValidation(data, "exp_min")}
                                    value={ResumeSearch_Form.exp_min.value}
                                    error={ResumeSearch_Form.exp_min.error}
                                    errmsg={ResumeSearch_Form.exp_min.errmsg}
                                /></div>
                                <div> <Labelbox type="text"
                                    placeholder="Max"
                                    changeData={(data) => checkValidation(data, "exp_max")}
                                    value={ResumeSearch_Form.exp_max.value}
                                    error={ResumeSearch_Form.exp_max.error}
                                    errmsg={ResumeSearch_Form.exp_max.errmsg}
                                /></div>
                            </div>
                        </Grid>
                        <Grid container item xs={3} >

                            <Grid item xs={4}>
                                <CustomButton btnName={"Go"} btnCustomColor="customPrimary" onBtnClick={onSearch} custombtnCSS={"goSearchbtn"} />

                            </Grid>
                            <Grid item xs={8}>
                                <Link to='resume'>
                                    <CustomButton btnName={"Create Resume"} btnCustomColor="customPrimary" custombtnCSS={"createResumeSearchbtn"} />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="resume_searchtable">
                    <EnhancedTable headCells={headCells} rows={rows && rows} />
                </div>
                <div className="searchinterviewbtn">
                    <CustomButton btnName={"Interview Details "} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setModelOpen(true)} btnDisable={selectedCandidateId.length <= 0} /></div>
                <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} selectedId={selectedCandidateId} checkList={checkList} handleUnCheck={handleUnCheck} />

            </div>
            <DynModelView
                modelTitle={"Candidate's Details"}
                handleChangeModel={candidateViewModel}
                handleChangeCloseModel={(bln) => setCandidateViewModel(bln)}
                res_data_id={viewId}
            />
            <DynModelcom
                modelTitle={"Edit Resume"}
                handleChangeModel={editModel}
                handleChangeCloseModel={(bln) => setEditModel(bln)}
                content={<ResumeForm resumeEditrow={editResumeRow} handleChangeCloseModel={(bln) => setEditModel(bln)} />}
                width={1000}
            />
        </div>


    )
}
const mapStateToProps = state => ({
    ResumeSearchStatus: state.ResumeSearchStatus,
    GetOptions: state.getOptions,
    GetRowData: state.getResumeSearchRowdata,
    GetResumeList: state.GetResumeList || []

})

export default connect(mapStateToProps)(Resumesearch);