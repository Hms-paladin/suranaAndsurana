import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../utils/baseUrl"
import axios from "axios";
import {useDispatch,connect} from "react-redux";
import './resume.scss'
import CustomButton from '../../component/Butttons/button';
import { InesertResume } from "../../actions/ResumeAction"


function ResumePage() {
    const dispatch = useDispatch()
    const [resumeGetList, setGetList] = useState({})
    const [Resume_Form, setResumeFrom] = useState({
        // userId: {
        //     value: "",
        //     validation: [{ "name": "required"}],
        //     error: null,
        //     errmsg: null,
        // },
        name: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        candidate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        gender: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        DOB: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        basicQualification: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        additionalQualification1: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        additionalQualification2: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        institution: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        lastEmployer: {
            value: "",
            validation: [{ "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        startDate: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        endDate: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        email1: {
            value: "",
            validation: [{ "name": "email" }],
            error: null,
            errmsg: null,
        },
        email2: {
            value: "",
            validation: [{ "name": "email" }],
            error: null,
            errmsg: null,
        },
        phone1: {
            value: "",
            validation: [{ "name": "mobileSurana" }],
            error: null,
            errmsg: null,
        },
        phone2: {
            value: "",
            validation: [{ "name": "mobileSurana" }],
            error: null,
            errmsg: null,
        },
        skills: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        Traits: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        certifications: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        specializations: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        talents: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        intrests: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        contactPhone: {
            value: "",
            validation: [{ "name": "required" },{ "name": "mobileSurana" }],
            error: null,
            errmsg: null,
        },
        emailId: {
            value: "",
            validation: [{ "name": "required" }, { "name": "email" }],
            error: null,
            errmsg: null,
        },
        mailAddress: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        state: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        city: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        language: {
            value: "",
            valueById:"",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        industry: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    useEffect(() => {

        let one = apiurl + "get_s_tbl_m_resource_type"
        let two = apiurl + "get_s_tbl_m_qual"
        let three = apiurl + "get_s_tbl_m_institute"
        let four = apiurl + "get_s_tbl_m_skills"
        let five = apiurl + "get_s_tbl_m_traits"
        let six = apiurl + "get_s_tbl_m_certification"
        let seven = apiurl + "get_s_tbl_m_specialization"
        // let nine = apiurl + "get_s_tbl_m_achievement"
        // let ten = apiurl + "get_s_tbl_m_capability" 
        let eight = apiurl + "get_s_tbl_m_talents"
        let nine = apiurl + "get_s_tbl_m_special_interest"
        let ten = apiurl + "get_s_tbl_m_state"
        let eleven = apiurl + "get_s_tbl_m_city"
        // let fiveteen = apiurl + "get_s_tbl_m_status"
        let twevel = apiurl + "get_s_tbl_m_language"
        let thirteen = apiurl + "get_s_tbl_m_industry"


        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        const requestThree = axios.get(three);
        const requestFour = axios.get(four);
        const requestFive = axios.get(five);
        const requestSix = axios.get(six);
        const requestSeven = axios.get(seven);
        const requestEight = axios.get(eight);
        const requestNine = axios.get(nine);
        const requestTen = axios.get(ten);
        const requestEleven = axios.get(eleven);
        const requestTwevel = axios.get(twevel);
        const requestThirteen = axios.get(thirteen);
        // const requestFourteen = axios.get(fourteen);
        // const requestFiveteen = axios.get(fiveteen);
        // const requestSixteen = axios.get(sixteen);
        // const requestSeventeen = axios.get(seventeen);
        // requestFourteen, requestFiveteen, requestSixteen, requestSeventeen

        axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight, requestNine, requestTen, requestEleven, requestTwevel, requestThirteen]).then(axios.spread((...responses) => {
            const responseOne = responses[0].data.data
            const responseTwo = responses[1].data.data
            const responseThree = responses[2].data.data
            const responseFour = responses[3].data.data
            const responseFive = responses[4].data.data
            const responseSix = responses[5].data.data
            const responseSeven = responses[6].data.data
            const responseEight = responses[7].data.data
            const responseNine = responses[8].data.data
            const responseTen = responses[9].data.data
            const responseEleven = responses[10].data.data
            const responseTwevel = responses[11].data.data
            const responseThirteen = responses[12].data.data
            // const requestFourteen = responses[12].data.data
            // const requestFiveteen = responses[13].data.data
            // const requestSixteen = responses[14].data.data
            // const requestSeventeen = responses[15].data.data

            let candidateList = []
            let qualificationList = []
            let institutionList = []
            let skillsList = []
            let traitsList = []
            let certificateList = []
            let specilalizaionsList = []
            let talentList = []
            let interestList = []
            let stateList = []
            let cityList = []
            let languagesList = []
            let industryList = []


            responseOne.map((data, index) => {
                candidateList.push({ value: data.resource_type, id: data.resource_type_id })
            })

            responseTwo.map((data, index) => {
                qualificationList.push({ value: data.qual_name, id: data.qualification_id })
            })

            responseThree.map((data, index) => {
                institutionList.push({ value: data.institute, id: data.institute_id })
            })

            responseFour.map((data, index) => {
                skillsList.push({ value: data.skill_name, id: data.skill_id })
            })

            responseFive.map((data, index) => {
                traitsList.push({ value: data.traits, id: data.traitTable })
            })

            responseSix.map((data, index) => {
                certificateList.push({ value: data.certification, id: data.certification_id })
            })

            responseSeven.map((data, index) => {
                specilalizaionsList.push({ value: data.specilization, id: data.specialization_id })
            })

            responseEight.map((data, index) => {
                talentList.push({ value: data.talent, id: data.talent_id })
            })

            responseNine.map((data, index) => {
                interestList.push({ value: data.special_interest, id: data.SpecInterest_id })
            })

            responseTen.map((data, index) => {
                stateList.push({ value: data.state, id: data.state_id })
            })

            responseEleven.map((data, index) => {
                cityList.push({ value: data.state, id: data.city_id })
            })

            responseTwevel.map((data, index) => {
                languagesList.push({ value: data.language, id: data.language_id })
            })

            responseThirteen.map((data, index) => {
                industryList.push({ value: data.industry, id: data.industry_id })
            })

            setGetList({ candidateList, qualificationList, institutionList, skillsList, traitsList, certificateList, specilalizaionsList, talentList, interestList, stateList, cityList, languagesList, industryList })

        })).catch(errors => {
        })
    }, [])


    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Resume_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Resume_Form[key].validation
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
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         Resume_Form[obj].error == true ||
        //         Resume_Form[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setResumeFrom({ error: true, errordummy: false });
        // } else {
        //     setResumeFrom({ error: false });
        // }
    };



    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Resume_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Resume_Form[targetkeys[i]].value,
                Resume_Form[targetkeys[i]].validation
            );
            Resume_Form[targetkeys[i]].error = !errorcheck.state;
            Resume_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Resume_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Resume_Form[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });
            
            dispatch(InesertResume(Resume_Form)).then(()=>{
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () =>{
        let ResumeFrom_key = [
            "name","candidate","gender","DOB","basicQualification","additionalQualification1","additionalQualification2","institution","lastEmployer","startDate","endDate","email1","email2","phone1","phone2","skills","Traits","certifications","specializations","talents","intrests","contactPhone","emailId","mailAddress","state","city","language","industry"
        ]

        ResumeFrom_key.map((data)=>{
            Resume_Form[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    console.log( localStorage. getItem('token',), "Resume_Form")

    return (
        <>
            <Grid item xs={12} className="ContentTitle">
                Add Resume
            </Grid>
            <div className="Container">
                <div className="leftContainer">
                    <Grid container spacing={3}>
                      
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Name *"}
                                changeData={(data) => checkValidation(data, "name")}
                                value={Resume_Form.name.value}
                                error={Resume_Form.name.error}
                                errmsg={Resume_Form.name.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7} >
                            <Labelbox type="select"
                                placeholder={"Type of Resource *"}
                                dropdown={resumeGetList.candidateList}
                                changeData={(data) => checkValidation(data, "candidate")}
                                value={Resume_Form.candidate.value}
                                error={Resume_Form.candidate.error}
                                errmsg={Resume_Form.candidate.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center" >
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="select"
                                        placeholder={"Gender *"}
                                        dropdown={[{ id: "1", value: "Male" }, { id: "2", value: "Female" }]}
                                        changeData={(data) => checkValidation(data, "gender")}
                                        value={Resume_Form.gender.value}
                                        error={Resume_Form.gender.error}
                                        errmsg={Resume_Form.gender.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="genderDobFlex">
                                    <Labelbox type="datepicker"
                                        placeholder={"Date of Birth *"}
                                        disableFuture={true}
                                        changeData={(data) => checkValidation(data, "DOB")}
                                        value={Resume_Form.DOB.value}
                                        error={Resume_Form.DOB.error}
                                        errmsg={Resume_Form.DOB.errmsg}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="select"
                                placeholder={"Basic Qualification *"}
                                dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "basicQualification")}
                                value={Resume_Form.basicQualification.value}
                                error={Resume_Form.basicQualification.error}
                                errmsg={Resume_Form.basicQualification.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="select"
                                placeholder={"Additional Qualification 1"}
                                dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "additionalQualification1")}
                                value={Resume_Form.additionalQualification1.value}
                                error={Resume_Form.additionalQualification1.error}
                                errmsg={Resume_Form.additionalQualification1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="select"
                                placeholder={"Additional Qualification 2"}
                                dropdown={resumeGetList.qualificationList}
                                changeData={(data) => checkValidation(data, "additionalQualification2")}
                                value={Resume_Form.additionalQualification2.value}
                                error={Resume_Form.additionalQualification2.error}
                                errmsg={Resume_Form.additionalQualification2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="select"
                                placeholder={"Institution"}
                                dropdown={resumeGetList.institutionList}
                                changeData={(data) => checkValidation(data, "institution")}
                                value={Resume_Form.institution.value}
                                error={Resume_Form.institution.error}
                                errmsg={Resume_Form.institution.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Last Employer"}
                                changeData={(data) => checkValidation(data, "lastEmployer")}
                                value={Resume_Form.lastEmployer.value}
                                error={Resume_Form.lastEmployer.error}
                                errmsg={Resume_Form.lastEmployer.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center">
                            <Grid item xs={6} >
                                <div className="startdateEnddateFlex">
                                    <Labelbox type="datepicker"
                                        placeholder={"Start date"}
                                        disableFuture={true}
                                        changeData={(data) => checkValidation(data, "startDate")}
                                        value={Resume_Form.startDate.value}
                                        error={Resume_Form.startDate.error}
                                        errmsg={Resume_Form.startDate.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="startdateEnddateFlex">
                                    <Labelbox type="datepicker"
                                        placeholder={"End date"}
                                        disableFuture={true}
                                        changeData={(data) => checkValidation(data, "endDate")}
                                        value={Resume_Form.endDate.value}
                                        error={Resume_Form.endDate.error}
                                        errmsg={Resume_Form.endDate.errmsg}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="text"
                                placeholder={"Reference Email 1"}
                                changeData={(data) => checkValidation(data, "email1")}
                                value={Resume_Form.email1.value}
                                error={Resume_Form.email1.error}
                                errmsg={Resume_Form.email1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="text"
                                placeholder={"Reference Email 2"}
                                changeData={(data) => checkValidation(data, "email2")}
                                value={Resume_Form.email2.value}
                                error={Resume_Form.email2.error}
                                errmsg={Resume_Form.email2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="text"
                                placeholder={"Reference Phone 1"}
                                changeData={(data) => checkValidation(data, "phone1")}
                                value={Resume_Form.phone1.value}
                                error={Resume_Form.phone1.error}
                                errmsg={Resume_Form.phone1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="text"
                                placeholder={"Reference Phone 2"}
                                changeData={(data) => checkValidation(data, "phone2")}
                                value={Resume_Form.phone2.value}
                                error={Resume_Form.phone2.error}
                                errmsg={Resume_Form.phone2.errmsg}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="rightContainer">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Skills"}
                                dropdown={resumeGetList.skillsList}
                                changeData={(data) => checkValidation(data, "skills", resumeGetList.skillsList)}
                                value={Resume_Form.skills.value}
                                error={Resume_Form.skills.error}
                                errmsg={Resume_Form.skills.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Traits"}
                                dropdown={resumeGetList.traitsList}
                                changeData={(data) => checkValidation(data, "Traits", resumeGetList.traitsList)}
                                value={Resume_Form.Traits.value}
                                error={Resume_Form.Traits.error}
                                errmsg={Resume_Form.Traits.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Certifications"}
                                dropdown={resumeGetList.certificateList}
                                changeData={(data) => checkValidation(data, "certifications", resumeGetList.certificateList)}
                                value={Resume_Form.certifications.value}
                                error={Resume_Form.certifications.error}
                                errmsg={Resume_Form.certifications.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Specializations "}
                                dropdown={resumeGetList.specilalizaionsList}
                                changeData={(data) => checkValidation(data, "specializations", resumeGetList.specilalizaionsList)}
                                value={Resume_Form.specializations.value}
                                error={Resume_Form.specializations.error}
                                errmsg={Resume_Form.specializations.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Talents"}
                                dropdown={resumeGetList.talentList}
                                changeData={(data) => checkValidation(data, "talents", resumeGetList.talentList)}
                                value={Resume_Form.talents.value}
                                error={Resume_Form.talents.error}
                                errmsg={Resume_Form.talents.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                mode={"multiple"}
                                placeholder={"Special Interest"}
                                dropdown={resumeGetList.interestList}
                                changeData={(data) => checkValidation(data, "intrests", resumeGetList.interestList)}
                                value={Resume_Form.intrests.value}
                                error={Resume_Form.intrests.error}
                                errmsg={Resume_Form.intrests.errmsg}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Labelbox type="text"
                                placeholder={"Contact Phone *"}
                                changeData={(data) => checkValidation(data, "contactPhone")}
                                value={Resume_Form.contactPhone.value}
                                error={Resume_Form.contactPhone.error}
                                errmsg={Resume_Form.contactPhone.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Email ID *"}
                                changeData={(data) => checkValidation(data, "emailId")}
                                value={Resume_Form.emailId.value}
                                error={Resume_Form.emailId.error}
                                errmsg={Resume_Form.emailId.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="text"
                                placeholder={"Mail Address *"}
                                changeData={(data) => checkValidation(data, "mailAddress")}
                                value={Resume_Form.mailAddress.value}
                                error={Resume_Form.mailAddress.error}
                                errmsg={Resume_Form.mailAddress.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"State of Domecile *"}
                                dropdown={resumeGetList.stateList}
                                changeData={(data) => checkValidation(data, "state")}
                                value={Resume_Form.state.value}
                                error={Resume_Form.state.error}
                                errmsg={Resume_Form.state.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"City *"}
                                dropdown={resumeGetList.cityList}
                                changeData={(data) => checkValidation(data, "city")}
                                value={Resume_Form.city.value}
                                error={Resume_Form.city.error}
                                errmsg={Resume_Form.city.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Languages Known *"}
                                mode={"multiple"}
                                dropdown={resumeGetList.languagesList}
                                changeData={(data) => checkValidation(data, "language", resumeGetList.languagesList)}
                                value={Resume_Form.language.value}
                                error={Resume_Form.language.error}
                                errmsg={Resume_Form.language.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Labelbox type="select"
                                placeholder={"Industry *"}
                                dropdown={resumeGetList.industryList}
                                changeData={(data) => checkValidation(data, "industry")}
                                value={Resume_Form.industry.value}
                                error={Resume_Form.industry.error}
                                errmsg={Resume_Form.industry.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            alignItems="center"
                            className="resumeBtnContainer"
                        >
                            <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit}  />
                            <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} />
                        </Grid>
                    </Grid>

                </div>
            </div>
        </>
    )
}
export default ResumePage;