import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../utils/baseUrl";
import axios from "axios";
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import { InesertResume } from "../../actions/ResumeAction";
import EducationModel from "./educationModel";
import ExperienceModel from "./experienceModel";
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getResourceType,
  getInstitute,
  getSpecialInterest,
  getStates,
  getCity,
  getLanguages,
  getSkills,
  getTraits,
  getCertification,
  getAchievement,
  getSpecilization,
  getCapability,
  getTalents,
  getIndustry,
} from "../../actions/MasterDropdowns";
import "./resume.scss";

const ResumePage = (props) => {
  const dispatch = useDispatch();
  const [resumeGetList, setGetList] = useState({});
  const [educationModelOpen, setEducationModelOpen] = useState(false);
  const [experienceModelOpen, setExperienceModelOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [employererr, setEmployererr] = useState(false);
  const [educationerr, setEducationerr] = useState(false);
  const [expReq, setExpReq] = useState(false);
  const [educationid, setEducationid] = useState();
  const [experienceid, setExperienceid] = useState();
  const [educationrow, setEducationrow] = useState([]);
  const [experiencerow, setExperiencerow] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [nullFieldValue, SetNullFieldValue] = useState(false);
  const [nullFieldValueExp, SetNullFieldValueExp] = useState(false);

  const [Resume_Form, setResumeFrom] = useState({
    name: {
      value: "",
      validation: [{ name: "required" }, { name: "50Char" }],
      error: null,
      errmsg: null,
    },
    candidate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    gender: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    DOB: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    name1: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    organization1: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    email1: {
      value: "",
      validation: [{ name: "email" }],
      error: null,
      errmsg: null,
    },
    phone1: {
      value: "",
      validation: [{ name: "mobileSurana" }],
      error: null,
      errmsg: null,
    },
    name2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    organization2: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    email2: {
      value: "",
      validation: [{ name: "email" }],
      error: null,
      errmsg: null,
    },
    phone2: {
      value: "",
      validation: [{ name: "mobileSurana" }],
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
      // valueById: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    contactPhone: {
      value: "",
      validation: [{ name: "required" }, { name: "mobileSurana" }],
      error: null,
      errmsg: null,
    },
    emailId: {
      value: "",
      validation: [{ name: "required" }, { name: "email" }],
      error: null,
      errmsg: null,
    },
    mailAddress: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    state: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    city: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    language: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    linkedin: {
      value: "",
      validation: [{ name: "50Char" }],
      error: null,
      errmsg: null,
    },
    twitter: {
      value: "",
      validation: [{ name: "50Char" }],
      error: null,
      errmsg: null,
    },
    achivements: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    capability: {
      value: "",
      valueById: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });

  useEffect(() => {
    dispatch(getResourceType());
    dispatch(getInstitute());
    dispatch(getSpecialInterest());
    dispatch(getStates());
    dispatch(getCity());
    dispatch(getLanguages());
    dispatch(getSkills());
    dispatch(getTraits());
    dispatch(getCertification());
    dispatch(getAchievement());
    dispatch(getSpecilization());
    dispatch(getCapability());
    dispatch(getTalents());
    dispatch(getIndustry());
    dispatch(getTalents());
  }, []);

  useEffect(() => {
    let candidateList = [];
    props.getResourcesType.map((data, index) => {
      candidateList.push({
        value: data.resource_type,
        id: data.resource_type_id,
      });
    });

    let qualificationList = [];
    props.getQualification.map((data, index) => {
      qualificationList.push({
        value: data.qual_name,
        id: data.qualification_id,
      });
    });

    let institutionList = [];

    props.getInstitute.map((data, index) => {
      institutionList.push({
        value: data.institute,
        id: data.institute_id,
      });
    });
    let skillsList = [];
    props.getSkills.map((data, index) => {
      skillsList.push({ value: data.skill_name, id: data.skill_id });
    });
    let traitsList = [];
    props.getTraits.map((data, index) => {
      traitsList.push({ value: data.traits, id: data.traitTable });
    });
    let certificateList = [];
    props.getCertification.map((data, index) => {
      certificateList.push({
        value: data.certification,
        id: data.certification_id,
      });
    });
    let specilalizaionsList = [];
    props.getSpecilization.map((data, index) => {
      specilalizaionsList.push({
        value: data.specilization,
        id: data.specialization_id,
      });
    });
    let talentList = [];
    props.getTalents.map((data, index) => {
      talentList.push({ value: data.talent, id: data.talent_id });
    });

    let interestList = [];
    props.getSpecialInterest.map((data, index) => {
      interestList.push({
        value: data.special_interest,
        id: data.SpecInterest_id,
      });
    });
    let stateList = [];
    props.getState.map((data, index) => {
      stateList.push({ value: data.state, id: data.state_id });
    });
    let cityList = [];
    props.getCity.map((data, index) => {
      cityList.push({ value: data.state, id: data.city_id });
    });

    let languagesList = [];
    props.getLanguages.map((data, index) => {
      languagesList.push({ value: data.language, id: data.language_id });
    });
    // let industryList = [];
    // responseThirteen.map((data, index) => {
    //   industryList.push({ value: data.industry, id: data.industry_id });
    // });
    let achivementsList = [];
    props.getAchievement.map((data, index) => {
      achivementsList.push({
        value: data.achievement,
        id: data.achievement_id,
      });
    });
    let capabilityList = [];
    props.getCapability.map((data, index) => {
      capabilityList.push({ value: data.capability, id: data.capability_id });
    });

    setGetList({
      candidateList,
      qualificationList,
      institutionList,
      skillsList,
      traitsList,
      certificateList,
      specilalizaionsList,
      talentList,
      interestList,
      stateList,
      cityList,
      languagesList,
      // industryList,
      achivementsList,
      capabilityList,
    });
  }, [props]);

  function checkValidation(data, key, multipleId) {
    if (data !== 1 && key === "candidate") {
      console.log("candidate", data);
      setExpReq(true);
    } else {
      setExpReq(false);
    }
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      Resume_Form[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: Resume_Form[key].validation,
    };

    // only for multi select (start)

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    // (end)

    setResumeFrom((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

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
    var filtererr = targetkeys.filter((obj) => Resume_Form[obj].error == true);
    // console.log(filtererr.length);
    // console.log(educationList.length, "educationList.length")
    if (educationList.length === 0 && experienceList.length === 0) {
      !educationerr && setEducationerr(true);
      !employererr && setEmployererr(true);
    }
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else if (
      educationList.length !== 0 &&
      experienceList.length !== 0 &&
      filtererr.length === 0
    ) {
      // setResumeFrom({ error: false });
      dispatch(InesertResume(Resume_Form, educationList, experienceList)).then(
        () => {
          handleCancel();
        }
      );
    }

    setResumeFrom((prevState) => ({
      ...prevState,
    }));
  }

  const handleCancel = () => {
    let ResumeFrom_key = [
      "name",
      "candidate",
      "gender",
      "DOB",
      "email1",
      "email2",
      "phone1",
      "phone2",
      "skills",
      "Traits",
      "certifications",
      "specializations",
      "talents",
      "intrests",
      "contactPhone",
      "emailId",
      "mailAddress",
      "state",
      "city",
      "language",
      "organization1",
      "organization2",
      "name1",
      "name2",
      "linkedin",
      "twitter",
      "achivements",
      "capability",
    ];

    ResumeFrom_key.map((data) => {
      Resume_Form[data].value = "";
    });
    setEducationList([]);
    setExperienceList([]);
    setResumeFrom((prevState) => ({
      ...prevState,
    }));
  };

  function showEducationModel() {
    setEducationModelOpen(true);
  }

  const showEditEducationModel = (x) => {
    setEducationModelOpen(true);
    setEducationid(x);
    setEducationrow(educationList[x]);
    setOnEdit(true);
  };
  const showDeleteEducationModel = (x) => {
    console.log(educationList[x], "educationList");
    if (x > -1) {
      educationList.splice(x, 1);
    }
    setEducationrow([...educationList]);
  };

  function addEducations(data) {
    setEducationList([
      ...educationList,
      {
        qualification: data.basicQualification.value,
        institution: data.institution.value,
        year_of_passing: moment(data.yearpassing.value).format("YYYY"),
        cgpa: data.percentage.value,
        certification_no: "1",
      },
    ]);
    setEducationModelOpen(false);
    setEducationerr(false);
  }

  const EditEducation = (data, id) => {
    educationList[id] = {
      qualification: data.basicQualification.value,
      institution: data.institution.value,
      year_of_passing: moment(data.yearpassing.value).format("YYYY"),
      cgpa: data.percentage.value,
      certification_no: "1",
    };
  };

  const handleFieldNull = (bln) => {
    setEducationModelOpen(bln);
    SetNullFieldValue(!nullFieldValue);
    setOnEdit(false);
  };

  //Experience Model

  function showExperienceModel() {
    setExperienceModelOpen(true);
  }

  const showEditExperienceModel = (y) => {
    setExperienceModelOpen(true);
    setExperienceid(y);
    setExperiencerow(experienceList[y]);
    setOnEdit(true);
  };

  function addExperience(data) {
    console.log(data, "addExperience");

    setExperienceList([
      ...experienceList,
      {
        type_of_industry: data.industry.value,
        company_name: data.companyname.value,
        city: data.city.value,
        department: data.department.value,
        designation: data.designation.value,
        period_from: data.periodfrom.value,
        period_to: data.periodto.value,
        responsible: data.responsibilities.value,
      },
    ]);
    setExperienceModelOpen(false);
    setEmployererr(false);
  }

  const EditExperience = (data, id) => {
    experienceList[id] = {
      type_of_industry: data.industry.value,
      company_name: data.companyname.value,
      city: data.city.value,
      department: data.department.value,
      designation: data.designation.value,
      period_from: data.periodfrom.value,
      period_to: data.periodto.value,
      responsible: data.responsibilities.value,
    };
  };

  const showDeleteExperienceModel = (y) => {
    console.log(experienceList[y], "educationList");
    if (y > -1) {
      experienceList.splice(y, 1);
    }
    setExperiencerow([...experienceList]);
  };

  const handleFieldNullExp = (bln) => {
    setExperienceModelOpen(bln);
    SetNullFieldValueExp(!nullFieldValueExp);
    setOnEdit(false);
  };

  return (
    <div>
      <Grid item xs={12} className="ContentTitle">
        Add Resume
      </Grid>
      <div className="Container">
        <div className="leftContainer">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                placeholder={"Type of Resource *"}
                dropdown={resumeGetList.candidateList}
                changeData={(data) => checkValidation(data, "candidate")}
                value={Resume_Form.candidate.value}
                error={Resume_Form.candidate.error}
                errmsg={Resume_Form.candidate.errmsg}
              />
            </Grid>

            <Grid item xs={12}>
              <Labelbox
                type="text"
                placeholder={"Name *"}
                changeData={(data) => checkValidation(data, "name")}
                value={Resume_Form.name.value}
                error={Resume_Form.name.error}
                errmsg={Resume_Form.name.errmsg}
                maxLength={100}
              />
            </Grid>

            <Grid item xs={12} container direction="row" alignItems="center">
              <Grid item xs={6}>
                <div className="genderDobFlex">
                  <Labelbox
                    type="select"
                    placeholder={"Gender *"}
                    dropdown={[
                      { id: 1, value: "Male" },
                      { id: 2, value: "Female" },
                    ]}
                    changeData={(data) => checkValidation(data, "gender")}
                    value={Resume_Form.gender.value}
                    error={Resume_Form.gender.error}
                    errmsg={Resume_Form.gender.errmsg}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="genderDobFlex">
                  <Labelbox
                    type="datepicker"
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
            <Grid item xs={12}>
              <Labelbox
                type="text"
                placeholder={"Contact Phone *"}
                changeData={(data) => checkValidation(data, "contactPhone")}
                value={Resume_Form.contactPhone.value}
                error={Resume_Form.contactPhone.error}
                errmsg={Resume_Form.contactPhone.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="text"
                placeholder={"Email ID *"}
                changeData={(data) => checkValidation(data, "emailId")}
                value={Resume_Form.emailId.value}
                error={Resume_Form.emailId.error}
                errmsg={Resume_Form.emailId.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="text"
                placeholder={"Mail Address *"}
                changeData={(data) => checkValidation(data, "mailAddress")}
                value={Resume_Form.mailAddress.value}
                error={Resume_Form.mailAddress.error}
                errmsg={Resume_Form.mailAddress.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                placeholder={"State of Domicile *"}
                dropdown={resumeGetList.stateList}
                changeData={(data) => checkValidation(data, "state")}
                value={Resume_Form.state.value}
                error={Resume_Form.state.error}
                errmsg={Resume_Form.state.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                placeholder={"City *"}
                dropdown={resumeGetList.cityList}
                changeData={(data) => checkValidation(data, "city")}
                value={Resume_Form.city.value}
                error={Resume_Form.city.error}
                errmsg={Resume_Form.city.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                placeholder={"Languages Known *"}
                mode={"multiple"}
                dropdown={resumeGetList.languagesList}
                changeData={(data) =>
                  checkValidation(data, "language", resumeGetList.languagesList)
                }
                value={Resume_Form.language.value}
                error={Resume_Form.language.error}
                errmsg={Resume_Form.language.errmsg}
              />
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Linkedin"}
                  changeData={(data) => checkValidation(data, "linkedin")}
                  value={Resume_Form.linkedin.value}
                  error={Resume_Form.linkedin.error}
                  errmsg={Resume_Form.linkedin.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Twitter"}
                  changeData={(data) => checkValidation(data, "twitter")}
                  value={Resume_Form.twitter.value}
                  error={Resume_Form.twitter.error}
                  errmsg={Resume_Form.twitter.errmsg}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            alignItems="center"
            className="educationContainer"
          >
            {educationerr && (
              <span className="errmsgClrResume">
                Please Add Atleast One Education
              </span>
            )}

            <div className="educationList">
              <div>Education*</div>
              <div>
                <img src={PlusIcon} onClick={showEducationModel} />
              </div>
            </div>
            {educationList && educationList.length > 0 && (
              <div className="educationOuterBox">
                {educationList &&
                  educationList.map((data, index) => {
                    return (
                      <div className="educationKeyValue">
                        <div className="educationKey">
                          <div>Qualification</div>
                          <div>Insitution/University</div>
                          <div>Year of Passing</div>
                          <div>Percentage/CGPA</div>
                        </div>
                        <div className="educationValue">
                          <div>
                            {resumeGetList.qualificationList.map((getName) => {
                              if (data.qualification === getName.id) {
                                return getName.value;
                              }
                            })}
                          </div>
                          <div>{data.institution}</div>
                          <div>{data.year_of_passing}</div>
                          <div>{data.cgpa}</div>
                        </div>
                        <EditIcon
                          fontSize="small"
                          onClick={() => showEditEducationModel(index)}
                        />
                        <DeleteIcon
                          fontSize="small"
                          onClick={() => showDeleteEducationModel(index)}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </Grid>
        </div>
        <div className="rightContainer">
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  mode={"multiple"}
                  placeholder={"Skills"}
                  dropdown={resumeGetList.skillsList}
                  changeData={(data) =>
                    checkValidation(data, "skills", resumeGetList.skillsList)
                  }
                  value={Resume_Form.skills.value}
                  error={Resume_Form.skills.error}
                  errmsg={Resume_Form.skills.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  mode={"multiple"}
                  placeholder={"Traits"}
                  dropdown={resumeGetList.traitsList}
                  changeData={(data) =>
                    checkValidation(data, "Traits", resumeGetList.traitsList)
                  }
                  value={Resume_Form.Traits.value}
                  error={Resume_Form.Traits.error}
                  errmsg={Resume_Form.Traits.errmsg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  mode={"multiple"}
                  placeholder={"Capabilities"}
                  dropdown={resumeGetList.capabilityList}
                  changeData={(data) =>
                    checkValidation(
                      data,
                      "capability",
                      resumeGetList.capabilityList
                    )
                  }
                  value={Resume_Form.capability.value}
                  error={Resume_Form.capability.error}
                  errmsg={Resume_Form.capability.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  mode={"multiple"}
                  placeholder={"Achievements"}
                  dropdown={resumeGetList.achivementsList}
                  changeData={(data) =>
                    checkValidation(
                      data,
                      "achivements",
                      resumeGetList.achivementsList
                    )
                  }
                  value={Resume_Form.achivements.value}
                  error={Resume_Form.achivements.error}
                  errmsg={Resume_Form.achivements.errmsg}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                mode={"multiple"}
                placeholder={"Certifications"}
                dropdown={resumeGetList.certificateList}
                changeData={(data) =>
                  checkValidation(
                    data,
                    "certifications",
                    resumeGetList.certificateList
                  )
                }
                value={Resume_Form.certifications.value}
                error={Resume_Form.certifications.error}
                errmsg={Resume_Form.certifications.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                mode={"multiple"}
                placeholder={"Specializations "}
                dropdown={resumeGetList.specilalizaionsList}
                changeData={(data) =>
                  checkValidation(
                    data,
                    "specializations",
                    resumeGetList.specilalizaionsList
                  )
                }
                value={Resume_Form.specializations.value}
                error={Resume_Form.specializations.error}
                errmsg={Resume_Form.specializations.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="select"
                mode={"multiple"}
                placeholder={"Talents"}
                dropdown={resumeGetList.talentList}
                changeData={(data) =>
                  checkValidation(data, "talents", resumeGetList.talentList)
                }
                value={Resume_Form.talents.value}
                error={Resume_Form.talents.error}
                errmsg={Resume_Form.talents.errmsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Labelbox
                type="text"
                // mode={"multiple"}
                placeholder={"Special Interest"}
                // dropdown={resumeGetList.interestList}
                // changeData={(data) => checkValidation(data, "intrests", resumeGetList.interestList)}
                changeData={(data) => checkValidation(data, "intrests")}
                value={Resume_Form.intrests.value}
                error={Resume_Form.intrests.error}
                errmsg={Resume_Form.intrests.errmsg}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Name 1"}
                  changeData={(data) => checkValidation(data, "name1")}
                  value={Resume_Form.name1.value}
                  error={Resume_Form.name1.error}
                  errmsg={Resume_Form.name1.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Organization 1"}
                  changeData={(data) => checkValidation(data, "organization1")}
                  value={Resume_Form.organization1.value}
                  error={Resume_Form.organization1.error}
                  errmsg={Resume_Form.organization1.errmsg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Email 1"}
                  changeData={(data) => checkValidation(data, "email1")}
                  value={Resume_Form.email1.value}
                  error={Resume_Form.email1.error}
                  errmsg={Resume_Form.email1.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Phone Number 1"}
                  changeData={(data) => checkValidation(data, "phone1")}
                  value={Resume_Form.phone1.value}
                  error={Resume_Form.phone1.error}
                  errmsg={Resume_Form.phone1.errmsg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="spaceBtGrid"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Name 2"}
                  changeData={(data) => checkValidation(data, "name2")}
                  value={Resume_Form.name2.value}
                  error={Resume_Form.name2.error}
                  errmsg={Resume_Form.name2.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Organization 2"}
                  changeData={(data) => checkValidation(data, "organization2")}
                  value={Resume_Form.organization2.value}
                  error={Resume_Form.organization2.error}
                  errmsg={Resume_Form.organization2.errmsg}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              className="spaceBtGrid"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Email 2"}
                  changeData={(data) => checkValidation(data, "email2")}
                  value={Resume_Form.email2.value}
                  error={Resume_Form.email2.error}
                  errmsg={Resume_Form.email2.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Reference Phone 2"}
                  changeData={(data) => checkValidation(data, "phone2")}
                  value={Resume_Form.phone2.value}
                  error={Resume_Form.phone2.error}
                  errmsg={Resume_Form.phone2.errmsg}
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="experienceContainer"
            >
              {Resume_Form.candidate.value !== 1 && employererr && (
                <span className="errmsgClrResume">
                  Please Add Perivous Employer
                </span>
              )}
              <div className="experienceList">
                <div>Previous Employer Details{expReq && "*"}</div>
                <div>
                  <img src={PlusIcon} onClick={showExperienceModel} />
                </div>
              </div>
              {experienceList.length > 0 && (
                <div className="experienceOuterBox">
                  {experienceList.map((data, index) => {
                    return (
                      <div className="experienceKeyValue">
                        <div className="experienceKey">
                          <div>Type of Industry</div>
                          <div>Company Name</div>
                          <div>City</div>
                          <div>Department</div>
                          <div>Designation</div>
                          <div>Period From</div>
                          <div>Period To</div>
                          <div>Responsibilities</div>
                        </div>
                        <div className="experienceValue">
                          <div>
                            {resumeGetList.industryList.map((getName) => {
                              if (data.type_of_industry === getName.id) {
                                return getName.value;
                              }
                            })}
                          </div>
                          <div>{data.company_name}</div>
                          <div>
                            {" "}
                            {resumeGetList.cityList.map((getName) => {
                              if (data.city === getName.id) {
                                return getName.value;
                              }
                            })}
                          </div>

                          <div>{data.department}</div>
                          <div>{data.designation}</div>
                          <div>{data.period_from}</div>
                          <div>{data.period_to}</div>
                          <div>{data.responsible}</div>
                        </div>
                        <EditIcon
                          fontSize="small"
                          onClick={() => showEditExperienceModel(index)}
                        />
                        <DeleteIcon
                          fontSize="small"
                          onClick={() => showDeleteExperienceModel(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="resumeBtnContainer"
            >
              <CustomButton
                btnName={"SAVE"}
                btnCustomColor="customPrimary"
                onBtnClick={onSubmit}
              />
              <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} />
            </Grid>
          </Grid>
          <DynModel
            modelTitle={"Education"}
            handleChangeModel={educationModelOpen}
            handleChangeCloseModel={(bln) => handleFieldNull(bln)}
            content={
              <EducationModel
                nullFieldValue={nullFieldValue}
                editEducationid={educationid}
                editEducations={educationrow}
                addEducations={(data) => addEducations(data)}
                editbtn={onEdit}
                handleChangeCloseModel={(bln) => handleFieldNull(bln)}
                EditEducation={(data, id) => EditEducation(data, id)}
              />
            }
          />

          <DynModel
            modelTitle={"Experience"}
            handleChangeModel={experienceModelOpen}
            handleChangeCloseModel={(bln) => handleFieldNullExp(bln)}
            width={700}
            content={
              <ExperienceModel
                addExperience={(data) => addExperience(data)}
                nullFieldValueExp={nullFieldValueExp}
                editExperienceid={experienceid}
                editExperiences={experiencerow}
                editbtn={onEdit}
                handleChangeCloseModel={(bln) => handleFieldNullExp(bln)}
                EditExperience={(data, id) => EditExperience(data, id)}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  getResourcesType: state.getOptions.getResourcesType || [],
  getInstitute: state.getOptions.getInstitute || [],
  getSpecialInterest: state.getOptions.getSpecialInterest || [],
  getState: state.getOptions.getState || [],
  getCity: state.getOptions.getCity || [],
  getLanguages: state.getOptions.getLanguages || [],
  getSkills: state.getOptions.getSkills || [],
  getTraits: state.getOptions.getTraits || [],
  getCertification: state.getOptions.getCertification || [],
  getAchievement: state.getOptions.getAchievement || [],
  getSpecilization: state.getOptions.getSpecilization || [],
  getCapability: state.getOptions.getCapability || [],
  getTalents: state.getOptions.getTalents || [],
  getStatus: state.getOptions.getStatus || [],
  getQualification: state.getOptions.getQualification || [],
  getIndustry: state.getOptions.getIndustry || [],
});

export default connect(mapStateToProps)(ResumePage);
