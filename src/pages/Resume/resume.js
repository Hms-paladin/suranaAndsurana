import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import CustomButton from "../../component/Butttons/button";
import { InesertResume, UpdateResume } from "../../actions/ResumeAction";
import EducationModel from "./educationModel";
import ExperienceModel from "./experienceModel";
import PlusIcon from "../../images/plusIcon.svg";
import DynModel from "../../component/Model/model";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ResumeSearchStatus, searchRowdata } from "../../actions/ResumeSearchAction";
import {
  getResourceType,
  getInstitute,
  getSpecialInterest,
  getStates,
  getCity_By_Id,
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
  const [editResume, setEditResume] = useState(false)
  const [resume_id, setResume_id] = useState()
  const [editcity, setEditcity] = useState(false)


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
      // validation: [{ name: "required" }, { name: "alphabetsandSpecialChar" }],
      error: null,
      errmsg: null,
    },

    capability: {
      value: "",
      valueById: "",
      // validation: [{ name: "required" },],
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
    dispatch(getCity_By_Id(Resume_Form.state.value))
  }, [Resume_Form.state.value])

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

    let cityListAll = [];
    props.getCityAll.map((data, index) => {
      cityListAll.push({ value: data.state, id: data.city_id });
    });

    let languagesList = [];
    props.getLanguages.map((data, index) => {
      languagesList.push({ value: data.language, id: data.language_id });
    });
    let industryList = [];
    props.getIndustry.map((data, index) => {
      industryList.push({ value: data.industry, id: data.industry_id });
    });
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
      cityListAll,
      languagesList,
      industryList,
      achivementsList,
      capabilityList,
    });
  }, [props]);

  function checkValidation(data, key, multipleId) {
    if (data !== 1 && data !== 10 && key === "candidate") {
      console.log("candidate", data);
      setExpReq(true);
      !employererr && setEmployererr(true);
    } else {
      setExpReq(false);
      employererr && setEmployererr(false);
    }

    // key === "candidate"&&data!==10&&!employererr && setEmployererr(true)&&setExpReq(true);
    // key === "candidate"&&data===10&&employererr && setEmployererr(false)&&setExpReq(true);

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

  useEffect(() => {
    console.log(props.resumeEditrow && props.resumeEditrow[0]?.experience, "Resume_Form")


    if (props.resumeEditrow && props.resumeEditrow[0]?.qualification.length > 0) {
      setEducationList(props.resumeEditrow[0]?.qualification)
    }

    if (props.resumeEditrow && props.resumeEditrow[0]?.experience.length > 0) {
      setExperienceList(props.resumeEditrow[0]?.experience)
    }else{
      setExperienceList([])
    }

    if (props.resumeEditrow && props.resumeEditrow.length > 0) {
      setEditcity(true)
      setEditResume(true)
      setResume_id(props.resumeEditrow[0].resume_id)

      let languageValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.language_id + "]").map((data) => {
        resumeGetList && resumeGetList?.languagesList?.map((list) => {
          if (data === list.id) {
            console.log(data, list.value, "testinglan")
            languageValue.push(list.value)
          }
        })
      })


      // skills
      let skillsValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.skill_id + "]").map((data) => {
        resumeGetList && resumeGetList?.skillsList?.map((list) => {
          if (data === list.id) {
            skillsValue.push(list.value)
          }
        })
      })


      // traits
      let traitsValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.trait_id + "]").map((data) => {
        resumeGetList && resumeGetList?.traitsList?.map((list) => {
          if (data === list.id) {
            traitsValue.push(list.value)
          }
        })
      })

      // certificationsValue
      let certificationsValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.certification_id + "]").map((data) => {
        resumeGetList && resumeGetList?.certificateList?.map((list) => {
          if (data === list.id) {
            certificationsValue.push(list.value)
          }
        })
      })

      // capablitiesValue
      let capablitiesValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.capability_id + "]").map((data) => {
        resumeGetList && resumeGetList?.capabilityList?.map((list) => {
          if (data === list.id) {
            capablitiesValue.push(list.value)
          }
        })
      })

      // specialization
      let specializationValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.specialization_id + "]").map((data) => {
        resumeGetList && resumeGetList?.specilalizaionsList?.map((list) => {
          if (data === list.id) {
            specializationValue.push(list.value)
          }
        })
      })

      // talentValue
      let talentValue = [];
      JSON.parse("[" + props.resumeEditrow[0]?.talent_id + "]").map((data) => {
        resumeGetList && resumeGetList?.talentList?.map((list) => {
          if (data === list.id) {
            talentValue.push(list.value)
          }
        })
      })

      Resume_Form.candidate.value = props.resumeEditrow[0].type_of_resource_id
      Resume_Form.name.value = props.resumeEditrow[0].name
      Resume_Form.gender.value = props.resumeEditrow[0].gender === "M" ? 1 : 2
      Resume_Form.DOB.value = props.resumeEditrow[0].dob
      Resume_Form.contactPhone.value = props.resumeEditrow[0].con_ph_no
      Resume_Form.emailId.value = props.resumeEditrow[0].email_addr
      Resume_Form.mailAddress.value = props.resumeEditrow[0].email_addr
      Resume_Form.state.value = props.resumeEditrow[0].state_id
      Resume_Form.city.value = props.resumeEditrow[0].city_id

      Resume_Form.language.value = languageValue;
      Resume_Form.language.valueById = props.resumeEditrow[0]?.language_id;

      Resume_Form.linkedin.value = props.resumeEditrow[0].linkedin
      Resume_Form.twitter.value = props.resumeEditrow[0].twitter

      Resume_Form.skills.value = skillsValue;
      Resume_Form.skills.valueById = props.resumeEditrow[0]?.skill_id;

      Resume_Form.Traits.value = traitsValue;
      Resume_Form.Traits.valueById = props.resumeEditrow[0]?.trait_id;

      Resume_Form.certifications.value = certificationsValue;
      Resume_Form.certifications.valueById = props.resumeEditrow[0]?.certification_id;

      Resume_Form.specializations.value = specializationValue;
      Resume_Form.specializations.valueById = props.resumeEditrow[0]?.specialization_id;

      Resume_Form.capability.value = capablitiesValue;
      Resume_Form.capability.valueById = props.resumeEditrow[0]?.capability_id;

      Resume_Form.talents.value = talentValue;
      Resume_Form.talents.valueById = props.resumeEditrow[0]?.talent_id;

      Resume_Form.achivements.value = props.resumeEditrow[0].achievement
      Resume_Form.intrests.value = props.resumeEditrow[0].special_interest
      Resume_Form.name1.value = props.resumeEditrow[0].ref_name1
      Resume_Form.organization1.value = props.resumeEditrow[0].organization1
      Resume_Form.email1.value = props.resumeEditrow[0].ref_email_1
      Resume_Form.phone1.value = props.resumeEditrow[0].ref_phone_1
      Resume_Form.name2.value = props.resumeEditrow[0].ref_name2
      Resume_Form.organization2.value = props.resumeEditrow[0].organization2
      Resume_Form.email2.value = props.resumeEditrow[0].ref_email_2
      Resume_Form.phone2.value = props.resumeEditrow[0].ref_phone_2

      setResumeFrom((prevState) => ({
        ...prevState,
      }));


    }
    else {

    }

  }, [props.resumeEditrow])



  function onSubmit(text) {
    console.log(text, "testing")
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

      Resume_Form.candidate.value !== 10 && !employererr && setEmployererr(true);
      Resume_Form.candidate.value === 10 && employererr && setEmployererr(false);
    }
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else if (text === "SAVE" && educationList.length !== 0 &&
      (experienceList.length !== 0 || Resume_Form.candidate.value === 1 || Resume_Form.candidate.value === 10) &&
      filtererr.length === 0
    ) {
      // setResumeFrom({ error: false });

      dispatch(InesertResume(Resume_Form, educationList, experienceList)).then(
        () => {
          // handleCancel();
        }
      );
    }
    else if (text === "UPDATE" && educationList.length !== 0 &&
      (experienceList.length !== 0 || Resume_Form.candidate.value === 1) &&
      filtererr.length === 0) {
      dispatch(UpdateResume(Resume_Form, educationList, experienceList, resume_id)).then(
        () => {
          handleCancel();
          setEditResume(false)
          setEditcity(false)
          // dispatch(GetResumeList(resume_id))
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
          props.handleChangeCloseModel(false)
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
    props.handleChangeCloseModel()
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
    alert("test")
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
    setEditcity(false)
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
      city_id: data.city.value,
      department: data.department.value,
      designation: data.designation.value,
      period_from: data.periodfrom.value,
      period_to: data.periodto.value,
      responsible: data.responsibilities.value,
    };
  };

  const showDeleteExperienceModel = (y) => {
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
  console.log(experienceList,"yyyyyyyy")
  return (
    <div>
      {props.EditResume ? null : <Grid item xs={12} className="ContentTitle">
        Add Resume
      </Grid>}
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
                placeholder={"Postal Address *"}
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
              <div style={{ fontWeight: 600 }}>Education*</div>
              <div>
                <img src={PlusIcon} onClick={showEducationModel} />
              </div>
            </div>

            {educationList && educationList.length > 0 ? (
              <div className="educationOuterBox">
                {educationList && educationList.map((data, index) => {
                  return (
                    <div className="educationKeyValue">
                      <div>
                        <div className="qualheading">Qualification</div>
                        <div>
                          {resumeGetList.qualificationList.map((getName) => {
                            if (data.qualification === getName.id) {
                              return getName.value || "-";
                            }
                          })}
                        </div>

                      </div>
                      <div>
                        <div className="qualheading">Insitution/University</div>
                        <div>{data.institution || "-"}</div>
                      </div>
                      <div>
                        <div className="qualheading">Year of Passing</div>
                        <div>{data.year_of_passing || "-"}</div>
                      </div>
                      <div>
                        <div className="qualheading">Percentage</div>
                        <div>{data.cgpa || "-"}</div>
                      </div>
                    </div>

                  );
                })}
              </div>
            )
              :
              <>
              </>
            }

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
              {/* <Grid item xs={6}>
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
              </Grid> */}
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Achievements"}
                  changeData={(data) => checkValidation(data, "achivements")}
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
              {Resume_Form.candidate.value !== 1 && Resume_Form.candidate.value !== 10 && employererr && (
                <span className="errmsgClrResume">
                  Please Add Previous Employer
                </span>
              )}
              <div className="experienceList">
                <div style={{ fontWeight: 600 }}>Previous Employer Details{expReq && "*"}</div>
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
                          <div title={data.company_name} className="companyname">{data.company_name}</div>
                          <div>

                            {console.log(experienceList,"resumeGetList.cityList")}
                            {
                            // editcity ?
                            //   <> {data.city || "-"}</> :
                              <> {resumeGetList.cityListAll.map((getName) => {
                                if (data.city_id&&Number(data.city_id) === getName.id ) {
                                  return getName.value || '-';
                                }
                              })}</>
                               }

                          </div>

                          <div>{data.department || "-"}</div>
                          <div>{data.designation || "-"}</div>
                          <div>{data.period_from || "-"}</div>
                          <div>{data.period_to || "-"}</div>
                          <div>{data.responsible || "-"}</div>
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
                btnName={editResume ? "UPDATE" : "SAVE"}
                btnCustomColor="customPrimary"
                onBtnClick={() => onSubmit(editResume ? "UPDATE" : "SAVE")}
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
                // city={resumeGetList.cityList}
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

const mapStateToProps = (state) => (
  console.log(state, "checkstate"),
  {
    getResourcesType: state.getOptions.getResourcesType || [],
    getInstitute: state.getOptions.getInstitute || [],
    getSpecialInterest: state.getOptions.getSpecialInterest || [],
    getState: state.getOptions.getState || [],
    getCity: state.getOptions.getCity_By_Id || [],
    getCityAll: state.getOptions.getCity || [],
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

  }
);

export default connect(mapStateToProps)(ResumePage);
