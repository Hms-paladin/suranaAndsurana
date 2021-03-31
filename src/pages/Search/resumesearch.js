import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Radio, Select, Checkbox } from 'antd';
import EnhancedTable from '../../component/DynTable/table';
import DynModel from './model';
import { apiurl } from '../../utils/baseUrl';
import { useDispatch, connect } from "react-redux";
import { ResumeSearchStatus, searchRowdata } from "../../actions/ResumeSearchAction";
import { getSkills, getTraits, getCertification, getAchievement, getSpecilization, getCapability, getTalents, getStatus } from "../../actions/MasterDropdowns";
import Axios from 'axios';
import CustomButton from "../../component/Butttons/button";
import ValidationLibrary from "../../helpers/validationfunction";
import DynModelView from "../Interview/model";
import './search.scss'

const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'basic', label: 'Basic Quailification' },
    { id: 'language', label: 'Languages Known' },
    { id: 'certification', label: 'Certification' },
    { id: 'specialization', label: 'Specialization' },
    // { id: 'acheivements', label: 'Acheivements' },
    { id: 'talents', label: 'Talents' },

];

function Resumesearch(props) {


    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)


    const [value, setValue] = React.useState();
    const [optionvalues, setoptionvalues] = useState([]);
    const [resumeSearchList, setGetList] = useState({})
    const [rows, setRowData] = useState([])
    const [checkList, setCheckedList] = useState({})
    const [test, setTest] = useState(true)
    const [selectedCandidateId, setSelectedCandidateId] = useState([]);
    const [viewId,setViewId]=useState("")
    const [candidateViewModel,setCandidateViewModel] =useState(false)
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
    })



    useEffect(() => {
        dispatch(getSkills())
        dispatch(getTraits())
        dispatch(getCertification())
        dispatch(getAchievement())
        dispatch(getSpecilization())
        dispatch(getCapability())
        dispatch(getTalents())
        dispatch(getStatus())

        dispatch(searchRowdata({
            "skill_id": "",
            "trait_id": "",
            "certification_id": "",
            "achievement_id": "",
            "specialization_id": "",
            "capability_id": "",
            "talent_id": "",
            "status_id": ""
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

        setResumeSearchFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    useEffect(() => {
        const { getSkills, getTraits, getCertification, getAchievement, getSpecilization, getCapability, getTalents, getStatus } = props.GetOptions

        let skillList = []
        let traitsList = []
        let certificationList = []
        let achievementList = []
        let specilizationList = []
        let capabilityList = []
        let talentList = []
        let statusList = []

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

        setGetList({ skillList, traitsList, certificationList, achievementList, specilizationList, capabilityList, talentList, talentList, statusList })



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
      const viewCandidate=(id)=>{
        setViewId(id)
        setCandidateViewModel(true)
        console.log("//",id)
      }

    useEffect(() => {
        let rowDataList = []

        props.GetRowData && props.GetRowData.map((data,index) => {
            rowDataList.push({ name:<span onClick={()=>viewCandidate(data.resume_id)}> {data.name}</span>, age: data.age, gender: data.gender === "M" ? "Male" : "Female",
             basic: data.basic_qual, language: data.language, certification: data.certifications, 
             specialization: data.specialization, talents: data.talent,
             box:<Checkbox onClick={(event)=>handleCheck(event,data.resume_id)} name={"checked"+index} 
             checked={checkList["checked"+index]} value={checkList["checked"+index]} /> })
        })

        setRowData(rowDataList)
        console.log("resumeSearchList.skillList", resumeSearchList.skillList)
    }, [props.GetRowData, test])

    function onSearch() {
        dispatch(searchRowdata({
            "skill_id": ResumeSearch_Form.skills.valueById ? ResumeSearch_Form.skills.valueById : "",
            "trait_id": ResumeSearch_Form.traits.valueById ? ResumeSearch_Form.traits.valueById : "",
            "certification_id": ResumeSearch_Form.certification.valueById ? ResumeSearch_Form.certification.valueById : "",
            "achievement_id": ResumeSearch_Form.acheivements.valueById ? ResumeSearch_Form.acheivements.valueById : "",
            "specialization_id": ResumeSearch_Form.specialization.valueById ? ResumeSearch_Form.specialization.valueById : "",
            "capability_id": ResumeSearch_Form.capabilities.valueById ? ResumeSearch_Form.capabilities.valueById : "",
            "talent_id": ResumeSearch_Form.talents.valueById ? ResumeSearch_Form.talents.valueById : "",
            "status_id": ResumeSearch_Form.status.valueById ? ResumeSearch_Form.status.valueById : ""
        }))
    }

    return (
        <div>


            <div>
                <div className="searchBoxContainer">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder="Skills"
                                dropdown={resumeSearchList.skillList}
                                changeData={(data) => checkValidation(data, "skills", resumeSearchList.skillList)}
                                value={ResumeSearch_Form.skills.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder="Traits"
                                dropdown={resumeSearchList.traitsList}
                                changeData={(data) => checkValidation(data, "traits", resumeSearchList.traitsList)}
                                value={ResumeSearch_Form.traits.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder="Certifications"
                                dropdown={resumeSearchList.certificationList}
                                changeData={(data) => checkValidation(data, "certification", resumeSearchList.certificationList)}
                                value={ResumeSearch_Form.certification.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder="Achivements"
                                dropdown={resumeSearchList.achievementList}
                                changeData={(data) => checkValidation(data, "acheivements", resumeSearchList.achievementList)}
                                value={ResumeSearch_Form.acheivements.value}
                                mode="multiple"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Labelbox type="select"
                                placeholder="Specialization"
                                dropdown={resumeSearchList.specilizationList}
                                changeData={(data) => checkValidation(data, "specialization", resumeSearchList.specilizationList)}
                                value={ResumeSearch_Form.specialization.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder="Capabilities"
                                dropdown={resumeSearchList.capabilityList}
                                changeData={(data) => checkValidation(data, "capabilities", resumeSearchList.capabilityList)}
                                value={ResumeSearch_Form.capabilities.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select"
                                placeholder="Talents"
                                dropdown={resumeSearchList.talentList}
                                changeData={(data) => checkValidation(data, "talents", resumeSearchList.talentList)}
                                value={ResumeSearch_Form.talents.value}
                                mode="multiple"
                            />
                        </Grid>
                        <Grid container item xs={3} >
                            <Grid item xs={9}>
                                {/* <Labelbox type="select"
                                placeholder="Status"
                                dropdown={resumeSearchList.statusList}
                                changeData={(data) => checkValidation(data, "status", resumeSearchList.statusList)}
                                value={ResumeSearch_Form.status.value}
                                mode="multiple"
                            /> */}
                            </Grid>
                            <Grid item xs={3}>
                                <CustomButton btnName={"Go"} btnCustomColor="customPrimary" onBtnClick={onSearch} custombtnCSS={"goSearchbtn"} />

                            </Grid>
                            {/* <Grid item xs={3}>
                                <CustomButton btnName={"Create Resume"} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} />
                            </Grid> */}
                        </Grid>
                    </Grid>
                </div>
                <div className="resume_searchtable">
                    <EnhancedTable headCells={headCells} rows={rows && rows} />
                </div>
                <div className="searchinterviewbtn">
                    <CustomButton btnName={"Interview Details "} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setModelOpen(true)} btnDisable={selectedCandidateId.length <= 0} /></div>
                <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} selectedId={selectedCandidateId} />

            </div>
            <DynModelView
                modelTitle={"Candidate's Details"}
                handleChangeModel={candidateViewModel}
                handleChangeCloseModel={(bln) => setCandidateViewModel(bln)}
                res_data_id={viewId}
              />
                    </div>
       

    )
}
const mapStateToProps = state => ({
    ResumeSearchStatus: state.ResumeSearchStatus,
    GetOptions: state.getOptions,
    GetRowData: state.getResumeSearchRowdata
})

export default connect(mapStateToProps)(Resumesearch);


//  <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />
//             <div className="searchinterviewbtn"><Button onClick={() => setModelOpen(true)} >Interview Details</Button></div>/
