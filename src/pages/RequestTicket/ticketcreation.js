import react, { useState, useEffect } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import './ticketcreation.scss';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import {
    getDepartment, getDesignationList, getLoactionsList, getQualification, getStates, getLanguages, getSkills,
    getTraits,
    getCertification,
    getSpecilization,
    getCapability,
    getTalents, getEmployeeListForTicket
} from "../../actions/MasterDropdowns";
import { InsertTicketTemplate, InsertRecruitmentTicket, getTicketTemplate } from '../../actions/TicketCreationAction';
import { notification } from "antd";

function TicketCreation(props) {
    const dispatch = useDispatch();
    const [department, setDepartment] = useState({})
    const [designationList, setDesignationList] = useState({})
    const [locationList, setLocationList] = useState({})
    const [qualificationList, setQualificationList] = useState({})
    const [stateList, setStateList] = useState({})
    const [languages, setLanguages] = useState({})
    const [requestGetList, setGetList] = useState({});
    const [employeeList, setEmployeeList] = useState({});
    const [changemsg, setChangesmsg] = useState(false)
    const [generateRights, setGenerateRights] = useState([])
    const [saveRights, setSaveRights] = useState([])

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [TicketCreation, setTicketCreation] = useState({
        department: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        designation: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        location: {
            value: "",
            valueById: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        position: {
            value: "",
            validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        req_by: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        experience: {
            value: "",
            validation: [{ name: "required" }, { name: "allowNumaricOnlyWithZero" }],
            error: null,
            errmsg: null,
        },
        language: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        qualification: {
            value: "",
            valueById: "",
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
        age_limit: {
            value: "",
            validation: [{ name: "allowNumaricOnly" }],
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
        traits: {
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
        specialization: {
            value: "",
            valueById: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        capablities: {
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
        assignedto: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        remarks: {
            value: "",
            validation: [{ name: "required" }, , { name: "custommaxLength", params: "250" }],
            error: null,
            errmsg: null,
        },
    });

    useEffect(() => {
        dispatch(getDepartment());
        dispatch(getLoactionsList());
        dispatch(getDesignationList());
        dispatch(getQualification());
        dispatch(getStates());
        dispatch(getLanguages());
        dispatch(getSkills());
        dispatch(getTraits());
        dispatch(getCertification());
        dispatch(getSpecilization());
        dispatch(getCapability());
        dispatch(getTalents());
        dispatch(getEmployeeListForTicket());


    }, []);

    useEffect(() => {

        // Department
        let Department = [];
        props.Department.map((data) =>
            Department.push({ id: data.department_id, value: data.department })
        );
        setDepartment({ Department });

        // DesignationList
        let DesignationList = [];
        props.DesignationList.map((data) =>
            DesignationList.push({ id: data.designation_id, value: data.designation })
        );
        setDesignationList({ DesignationList });

        // LocationList
        let LocationList = [];
        props.LocationList.map((data) =>
            LocationList.push({ id: data.office_location_id, value: data.office_location })
        );
        setLocationList({ LocationList });

        // Qualification
        let Qualification = [];
        props.Qualification.map((data) =>
            Qualification.push({ id: data.qualification_id, value: data.qual_name })
        );
        setQualificationList({ Qualification });

        // StateList
        let stateList = [];
        props.getState.map((data, index) => {
            stateList.push({ value: data.state, id: data.state_id });
        });
        setStateList({ stateList });

        // Languages
        let Languages = [];
        props.Languages.map((data) =>
            Languages.push({ id: data.language_id, value: data.language })
        );
        setLanguages({ Languages });

        // skillsList

        let skillsList = [];
        props.getSkills.map((data, index) => {
            skillsList.push({ value: data.skill_name, id: data.skill_id });
        });

        // traitsList

        let traitsList = [];
        props.getTraits.map((data, index) => {
            traitsList.push({ value: data.traits, id: data.traitTable });
        });

        // certificateList

        let certificateList = [];
        props.getCertification.map((data, index) => {
            certificateList.push({
                value: data.certification,
                id: data.certification_id,
            });
        });

        // capabilityList

        let capabilityList = [];
        props.getCapability.map((data, index) => {
            capabilityList.push({ value: data.capability, id: data.capability_id });
        });

        // specilalizaionsList

        let specilalizaionsList = [];
        props.getSpecilization.map((data) => {
            specilalizaionsList.push({
                value: data.specilization,
                id: data.specialization_id,
            });
        });

        // talentList

        let talentList = [];
        props.getTalents.map((data) => {
            talentList.push({ value: data.talent, id: data.talent_id });
        });

        setGetList({ skillsList, traitsList, certificateList, specilalizaionsList, talentList, capabilityList })

        //getEmpListDepartment
        let EmployeeList = [];
        props.EmployeeList?.map((data) => {
            EmployeeList.push({
                value: data.name,
                id: data.emp_id,
            });
        });
        setEmployeeList({ EmployeeList })

    }, [
        props.Department, props.DesignationList, props.Qualification, props.getState, props.Languages, props.getSkills, props.getTraits, props.getCertification, props.getCapability, props.getSpecilization, props.talentList, props.EmployeeList
    ]);

    useEffect(() => {

        if (props.TicketTemplate.length > 0) {
            setChangesmsg(true)
            // Languages
            let languageValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.language_id + "]").map((data) => {
                languages && languages?.Languages?.map((list) => {
                    if (data === list.id) {
                        languageValue.push(list.value)
                    }
                })
            })

            // QualificationValue
            let QualificationValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.qualification_id + "]").map((data) => {
                qualificationList && qualificationList?.Qualification?.map((list) => {
                    if (data === list.id) {
                        QualificationValue.push(list.value)
                    }
                })
            })


            // skills
            let skillsValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.skill_id + "]").map((data) => {
                requestGetList && requestGetList?.skillsList?.map((list) => {
                    if (data === list.id) {
                        skillsValue.push(list.value)
                    }
                })
            })


            // traits
            let traitsValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.trait_id + "]").map((data) => {
                requestGetList && requestGetList?.traitsList?.map((list) => {
                    if (data === list.id) {
                        traitsValue.push(list.value)
                    }
                })
            })

            // certificationsValue
            let certificationsValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.certification_id + "]").map((data) => {
                requestGetList && requestGetList?.certificateList?.map((list) => {
                    if (data === list.id) {
                        certificationsValue.push(list.value)
                    }
                })
            })

            // capablitiesValue
            let capablitiesValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.capability_id + "]").map((data) => {
                requestGetList && requestGetList?.capabilityList?.map((list) => {
                    if (data === list.id) {
                        capablitiesValue.push(list.value)
                    }
                })
            })

            // specialization
            let specializationValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.specialization_id + "]").map((data) => {
                requestGetList && requestGetList?.specilalizaionsList?.map((list) => {
                    if (data === list.id) {
                        specializationValue.push(list.value)
                    }
                })
            })

            // talentValue
            let talentValue = [];
            JSON.parse("[" + props.TicketTemplate[0]?.talent_id + "]").map((data) => {
                requestGetList && requestGetList?.talentList?.map((list) => {
                    if (data === list.id) {
                        talentValue.push(list.value)
                    }
                })
            })


            TicketCreation.position.value = props.TicketTemplate[0]?.number_of_position;
            TicketCreation.req_by.value = props.TicketTemplate[0]?.required_by;

            TicketCreation.qualification.value = QualificationValue;
            TicketCreation.qualification.valueById = props.TicketTemplate[0]?.qualification_id;

            TicketCreation.experience.value = props.TicketTemplate[0]?.experience;

            TicketCreation.language.value = languageValue;
            TicketCreation.language.valueById = props.TicketTemplate[0]?.language_id;

            TicketCreation.state.value = props.TicketTemplate[0]?.state_id;
            TicketCreation.age_limit.value = props.TicketTemplate[0]?.age_limit;

            TicketCreation.skills.value = skillsValue;
            TicketCreation.skills.valueById = props.TicketTemplate[0]?.skill_id;

            TicketCreation.traits.value = traitsValue;
            TicketCreation.traits.valueById = props.TicketTemplate[0]?.trait_id;

            TicketCreation.certifications.value = certificationsValue;
            TicketCreation.certifications.valueById = props.TicketTemplate[0]?.certification_id;

            TicketCreation.specialization.value = specializationValue;
            TicketCreation.specialization.valueById = props.TicketTemplate[0]?.specialization_id;

            TicketCreation.capablities.value = capablitiesValue;
            TicketCreation.capablities.valueById = props.TicketTemplate[0]?.capability_id;

            TicketCreation.talents.value = talentValue;
            TicketCreation.talents.valueById = props.TicketTemplate[0]?.talent_id;

            TicketCreation.assignedto.value = props.TicketTemplate[0]?.assigned_to;

            TicketCreation.location.value = props.TicketTemplate[0]?.location_office_id;

            TicketCreation.location.valueById = props.TicketTemplate[0]?.location_office_id;
            TicketCreation.remarks.value = props.TicketTemplate[0]?.remarks;


        }

        setTicketCreation((prevState) => ({
            ...prevState,
        }));

    }, [props.TicketTemplate])

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            TicketCreation[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: TicketCreation[key].validation,
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

        if (data && key === "designation") {
            let values = { designation: data, department: TicketCreation.department.value }
            dispatch(getTicketTemplate(values))
        }




        setTicketCreation((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }




    function onSubmit(id) {
        var mainvalue = {};

        var targetkeys = Object.keys(TicketCreation);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                TicketCreation[targetkeys[i]].value,
                TicketCreation[targetkeys[i]].validation
            );
            TicketCreation[targetkeys[i]].error = !errorcheck.state;
            TicketCreation[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = TicketCreation[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter((obj) => TicketCreation[obj].error == true);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            if (id === 1) {
                // Save as template
                dispatch(InsertTicketTemplate(TicketCreation, changemsg)).then(
                    (response) => {
                        handleCancel();
                    }
                )
            } else {
                // Generate Ticket

                dispatch(InsertRecruitmentTicket(TicketCreation)).then(
                    (response) => {
                        handleCancel();
                    }
                )

            }
        }

        setTicketCreation((prevState) => ({
            ...prevState,
        }));
    }

    const handleCancel = () => {
        let ResumeFrom_key = [
            "department",
            "designation",
            "location",
            "position",
            "req_by",
            "experience",
            "language",
            "qualification",
            "state",
            "age_limit",
            "skills",
            "traits",
            "certifications",
            "specialization",
            "capablities",
            "talents",
            "assignedto",
            "remarks"

        ];

        ResumeFrom_key.map((data) => {
            TicketCreation[data].value = "";
        });

        setTicketCreation((prevState) => ({
            ...prevState,
        }));
    };

    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Ticket Creation - Save as Template" == val.control
                )
            })
            setSaveRights(data_res_id)

            data_res_id = props.UserPermission.find((val) => {
                return (
                    "Ticket Creation - Generate Ticket" == val.control
                )
            })
            setGenerateRights(data_res_id)
        }

    }, [props.UserPermission]);




    function rightsNotification() {
        notification.success({
            message: "You are not Authorized. Please Contact Administrator",
        });
    }
    /////////////
    return (

        <div>


            <div className="Titlediv">Recruitment Request Tickets</div>
            <div className="ticketContainer">
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <div className="TThead">Department</div>
                            <Labelbox type="select" //placeholder="Department"
                                dropdown={department.Department}
                                changeData={(data) => checkValidation(data, "department")}
                                value={TicketCreation.department.value}
                                error={TicketCreation.department.error}
                                errmsg={TicketCreation.department.errmsg} />
                        </Grid>
                        <Grid item xs={3}>
                            <div className="TThead">Designation</div>
                            <Labelbox type="select" //placeholder="Designation"
                                dropdown={designationList.DesignationList}
                                changeData={(data) => checkValidation(data, "designation")}
                                value={TicketCreation.designation.value}
                                error={TicketCreation.designation.error}
                                errmsg={TicketCreation.designation.errmsg} />
                        </Grid>
                        <Grid item xs={3}>
                            <div className="TThead">Location</div>
                            <Labelbox type="select" //placeholder="Location"
                                dropdown={locationList.LocationList}
                                changeData={(data) => checkValidation(data, "location")}
                                value={TicketCreation.location.value}
                                error={TicketCreation.location.error}
                                errmsg={TicketCreation.location.errmsg} />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <div className="TThead">No of positions</div>
                            <Labelbox type="text" //placeholder="No. of Positions"
                                changeData={(data) => checkValidation(data, "position")}
                                value={TicketCreation.position.value}
                                error={TicketCreation.position.error}
                                errmsg={TicketCreation.position.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Required by</div>
                            <Labelbox type="datepicker" //placeholder="Required by" disablePast={true} minDate={tomorrow}
                                changeData={(data) => checkValidation(data, "req_by")}
                                value={TicketCreation.req_by.value}
                                error={TicketCreation.req_by.error}
                                errmsg={TicketCreation.req_by.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Qualification</div>
                            <Labelbox type="select" //placeholder="Qualification"
                                dropdown={qualificationList.Qualification}
                                changeData={(data) => checkValidation(data, "qualification", qualificationList.Qualification)}
                                value={TicketCreation.qualification.value}
                                error={TicketCreation.qualification.error}
                                errmsg={TicketCreation.qualification.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Experience</div>
                            <Labelbox type="text" //placeholder="Experience"
                                //  dropdown={resumeGetList.cityList}
                                changeData={(data) => checkValidation(data, "experience")}
                                value={TicketCreation.experience.value}
                                error={TicketCreation.experience.error}
                                errmsg={TicketCreation.experience.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Language</div>
                            <Labelbox type="select" //placeholder="Language"
                                dropdown={languages.Languages}
                                changeData={(data) => checkValidation(data, "language", languages.Languages)}
                                value={TicketCreation.language.value}
                                error={TicketCreation.language.error}
                                errmsg={TicketCreation.language.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">State</div>
                            <Labelbox type="select" //placeholder="State"
                                dropdown={stateList.stateList}
                                changeData={(data) => checkValidation(data, "state")}
                                value={TicketCreation.state.value}
                                error={TicketCreation.state.error}
                                errmsg={TicketCreation.state.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Age Limit</div>
                            <Labelbox type="text" //placeholder="Age Limit"
                                changeData={(data) => checkValidation(data, "age_limit")}
                                value={TicketCreation.age_limit.value}
                                error={TicketCreation.age_limit.error}
                                errmsg={TicketCreation.age_limit.errmsg} />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <div className="TThead">Skills</div>
                            <Labelbox type="select" //placeholder="Skills"
                                dropdown={requestGetList.skillsList}
                                changeData={(data) => checkValidation(data, "skills", requestGetList.skillsList)}
                                value={TicketCreation.skills.value}
                                error={TicketCreation.skills.error}
                                errmsg={TicketCreation.skills.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Traits</div>
                            <Labelbox type="select" //placeholder="Traits"
                                dropdown={requestGetList.traitsList}
                                changeData={(data) => checkValidation(data, "traits", requestGetList.traitsList)}
                                value={TicketCreation.traits.value}
                                error={TicketCreation.traits.error}
                                errmsg={TicketCreation.traits.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Certifications</div>
                            <Labelbox type="select" //placeholder="Certifications"
                                dropdown={requestGetList.certificateList}
                                changeData={(data) => checkValidation(data, "certifications", requestGetList.certificateList)}
                                value={TicketCreation.certifications.value}
                                error={TicketCreation.certifications.error}
                                errmsg={TicketCreation.certifications.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Specialization</div>
                            <Labelbox type="select" //placeholder="Specialization"
                                dropdown={requestGetList.specilalizaionsList}
                                changeData={(data) => checkValidation(data, "specialization", requestGetList.specilalizaionsList)}
                                value={TicketCreation.specialization.value}
                                error={TicketCreation.specialization.error}
                                errmsg={TicketCreation.specialization.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Capablities</div>
                            <Labelbox type="select" //placeholder="Capablities"
                                dropdown={requestGetList.capabilityList}
                                changeData={(data) => checkValidation(data, "capablities", requestGetList.capabilityList)}
                                value={TicketCreation.capablities.value}
                                error={TicketCreation.capablities.error}
                                errmsg={TicketCreation.capablities.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Talents</div>
                            <Labelbox type="select" //placeholder="Talents"
                                dropdown={requestGetList.talentList}
                                changeData={(data) => checkValidation(data, "talents", requestGetList.talentList)}
                                value={TicketCreation.talents.value}
                                error={TicketCreation.talents.error}
                                errmsg={TicketCreation.talents.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3}>
                            <div className="TThead">Assigned to</div>
                            <Labelbox type="select" //placeholder="Assigned to"
                                dropdown={employeeList.EmployeeList}
                                changeData={(data) => checkValidation(data, "assignedto")}
                                value={TicketCreation.assignedto.value}
                                error={TicketCreation.assignedto.error}
                                errmsg={TicketCreation.assignedto.errmsg}></Labelbox>
                        </Grid>
                        <Grid item xs={3} >
                            <div className="TThead">Remarks</div>
                            <Labelbox type="textarea" //placeholder="Tell us your Remarks"
                                changeData={(data) => checkValidation(data, "remarks")}
                                value={TicketCreation.remarks.value}
                                error={TicketCreation.remarks.error}
                                errmsg={TicketCreation.remarks.errmsg} />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketbtn">
                    <CustomButton btnName={"Save as Template"} btnCustomColor="customPrimary" custombtnCSS="btntemplate" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={() => onSubmit(1)} />
                    <CustomButton btnName={"Generate Ticket"} custombtnCSS="btntemplate" btnCustomColor="customPrimary" btnDisable={!generateRights || generateRights.display_control && generateRights.display_control === 'N' ? true : false} onBtnClick={() => onSubmit("")} />

                    {/* <CustomButton btnName={"Save as Template"} btnCustomColor="customPrimary" custombtnCSS="btntemplate" onBtnClick={()=>onSubmit(1)}  />
                    <CustomButton btnName={"Generate Ticket"} custombtnCSS="btntemplate" btnCustomColor="customPrimary" onBtnClick={()=>onSubmit("")}  /> */}
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                </div>

            </div >
            {/* </div > } */}

        </div>
    )
}
const mapStateToProps = (state) => ({
    Department: state.getOptions.getDepartment || [],
    DesignationList: state.getOptions.getDesignationList || [],
    LocationList: state.getOptions.getLoactionList || [],
    Qualification: state.getOptions.getQualification || [],
    getState: state.getOptions.getState || [],
    Languages: state.getOptions.getLanguages || [],
    getSkills: state.getOptions.getSkills || [],
    getTraits: state.getOptions.getTraits || [],
    getCertification: state.getOptions.getCertification || [],
    getSpecilization: state.getOptions.getSpecilization || [],
    getCapability: state.getOptions.getCapability || [],
    getTalents: state.getOptions.getTalents || [],
    EmployeeList: state.getOptions.getEmpListDepartment || [],
    TicketTemplate: state.TicketCreationReducer.getTicketTemplate || [],
    UserPermission: state.UserPermissionReducer.getUserPermission,
});

export default connect(mapStateToProps)(TicketCreation);

