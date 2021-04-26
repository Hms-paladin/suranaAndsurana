import react, { useState, useEffect } from 'react';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import './ticketcreation.scss';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import {
    getDepartment, getDesignationList, getQualification, getStates, getLanguages, getSkills,
    getTraits,
    getCertification,
    getSpecilization,
    getCapability,
    getTalents,
} from "../../actions/MasterDropdowns";



function TicketCreation(props) {
    const dispatch = useDispatch();
    const [department, setDepartment] = useState({})
    const [designationList, setDesignationList] = useState({})
    const [qualificationList, setQualificationList] = useState({})
    const [stateList, setStateList] = useState({})
    const [languages, setLanguages] = useState({})
    const [requestGetList, setGetList] = useState({});


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
            validation: [{ name: "required" }, { name: "allowNumaricOnly" }],
            error: null,
            errmsg: null,
        },
        language: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        qualification: {
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
        age_limit: {
            value: "",
            validation: [{ name: "allowNumaricOnly" }, { "name": "custommaxLength", "params": "2" }],
            error: null,
            errmsg: null,
        },
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
        certifications: {
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
        capablities: {
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
    });

    useEffect(() => {
        dispatch(getDepartment());
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

    }, []);

    useEffect(() => {
        console.log(props.StateList, "props.Department")
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
        props.getSpecilization.map((data, index) => {
            specilalizaionsList.push({
                value: data.specilization,
                id: data.specialization_id,
            });
        });

        // talentList

        let talentList = [];
        props.getTalents.map((data, index) => {
            talentList.push({ value: data.talent, id: data.talent_id });
        });

        setGetList({ skillsList, traitsList, certificateList, specilalizaionsList, talentList, capabilityList })

    }, [
        props.Department, props.DesignationList, props.Qualification, props.getState, props.Languages, props.getSkills, props.getTraits, props.getCertification, props.getCapability, props.getSpecilization, props.talentList
    ]);

    function checkValidation(data, key, multipleId) {
        console.log(data, "TicketCreation.skills.value")

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

        if (data && key == "age_limit") {
            TicketCreation.age_limit.validation[1].params = 2
            setTicketCreation((prevState) => ({
                ...prevState,
            }));
        }




        setTicketCreation((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    function onSubmit() {
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

        // dispatch(InsertIpProject(TicketCreation, sendVariableData)).then(
        //   (response) => {
        //     handleCancel();
        //   }
        // );
        setTicketCreation((prevState) => ({
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

        ];


        setTicketCreation((prevState) => ({
            ...prevState,
        }));
    };

    // TicketCreation.map((data)=>{
    //     return(
    //         console.log(data.designation,"designation")
    //     )
    // })


    return (
        <div >
            <div className="Titlediv">Recruitment Request Tickets</div>
            <div className="ticketContainer">
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Department"
                                dropdown={department.Department}
                                changeData={(data) => checkValidation(data, "department")}
                                value={TicketCreation.department.value}
                                error={TicketCreation.department.error}
                                errmsg={TicketCreation.department.errmsg} />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select" placeholder="Designation"
                                dropdown={designationList.DesignationList}
                                changeData={(data) => checkValidation(data, "designation")}
                                value={TicketCreation.designation.value}
                                error={TicketCreation.designation.error}
                                errmsg={TicketCreation.designation.errmsg} />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="row" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="text" placeholder="No. of Positions"
                                changeData={(data) => checkValidation(data, "position")}
                                value={TicketCreation.position.value}
                                error={TicketCreation.position.error}
                                errmsg={TicketCreation.position.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="datepicker" placeholder="Required by"
                                changeData={(data) => checkValidation(data, "req_by")}
                                value={TicketCreation.req_by.value}
                                error={TicketCreation.req_by.error}
                                errmsg={TicketCreation.req_by.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Qualification"
                                dropdown={qualificationList.Qualification}
                                changeData={(data) => checkValidation(data, "qualification")}
                                value={TicketCreation.qualification.value}
                                error={TicketCreation.qualification.error}
                                errmsg={TicketCreation.qualification.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="text" placeholder="Experience"
                                //  dropdown={resumeGetList.cityList}
                                changeData={(data) => checkValidation(data, "experience")}
                                value={TicketCreation.experience.value}
                                error={TicketCreation.experience.error}
                                errmsg={TicketCreation.experience.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Language"
                                dropdown={languages.Languages}
                                changeData={(data) => checkValidation(data, "language")}
                                value={TicketCreation.language.value}
                                error={TicketCreation.language.error}
                                errmsg={TicketCreation.language.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="State"
                                dropdown={stateList.stateList}
                                changeData={(data) => checkValidation(data, "state")}
                                value={TicketCreation.state.value}
                                error={TicketCreation.state.error}
                                errmsg={TicketCreation.state.errmsg} />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="text" placeholder="Age Limit"
                                changeData={(data) => checkValidation(data, "age_limit")}
                                value={TicketCreation.age_limit.value}
                                error={TicketCreation.age_limit.error}
                                errmsg={TicketCreation.age_limit.errmsg} />
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketGrid">
                    <Grid item xs={12} container direction="column" spacing={1}>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Skills"
                                dropdown={requestGetList.skillsList}
                                changeData={(data) => checkValidation(data, "skills", requestGetList.skillsList)}
                                value={TicketCreation.skills.value}
                                error={TicketCreation.skills.error}
                                errmsg={TicketCreation.skills.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Traits"
                                dropdown={requestGetList.traitsList}
                                changeData={(data) => checkValidation(data, "traits", requestGetList.traitsList)}
                                value={TicketCreation.traits.value}
                                error={TicketCreation.traits.error}
                                errmsg={TicketCreation.traits.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Certifications"
                                dropdown={requestGetList.certificateList}
                                changeData={(data) => checkValidation(data, "certifications", requestGetList.certificateList)}
                                value={TicketCreation.certifications.value}
                                error={TicketCreation.certifications.error}
                                errmsg={TicketCreation.certifications.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Specialization"
                                dropdown={requestGetList.specilalizaionsList}
                                changeData={(data) => checkValidation(data, "specialization", requestGetList.specilalizaionsList)}
                                value={TicketCreation.specialization.value}
                                error={TicketCreation.specialization.error}
                                errmsg={TicketCreation.specialization.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Capablities"
                                dropdown={requestGetList.capabilityList}
                                changeData={(data) => checkValidation(data, "capablities", requestGetList.capabilityList)}
                                value={TicketCreation.capablities.value}
                                error={TicketCreation.capablities.error}
                                errmsg={TicketCreation.capablities.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3} >
                            <Labelbox type="select" placeholder="Talents"
                                dropdown={requestGetList.talentList}
                                changeData={(data) => checkValidation(data, "talents", requestGetList.talentList)}
                                value={TicketCreation.talents.value}
                                error={TicketCreation.talents.error}
                                errmsg={TicketCreation.talents.errmsg}
                                mode="multiple" />
                        </Grid>
                        <Grid item xs={3}>
                        <Labelbox type="select" placeholder="Assigned to"></Labelbox>
                        </Grid>
                    </Grid>
                </div>
                <div className="ticketbtn">
                    <CustomButton btnName={"Save as Template"} btnCustomColor="customPrimary" custombtnCSS="btntemplate" />
                    <CustomButton btnName={"Generate Ticket"} custombtnCSS="btntemplate" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                </div>

            </div >
        </div >
    )
}
const mapStateToProps = (state) => ({
    Department: state.getOptions.getDepartment || [],
    DesignationList: state.getOptions.getDesignationList || [],
    Qualification: state.getOptions.getQualification || [],
    getState: state.getOptions.getState || [],
    Languages: state.getOptions.getLanguages || [],
    getSkills: state.getOptions.getSkills || [],
    getTraits: state.getOptions.getTraits || [],
    getCertification: state.getOptions.getCertification || [],
    getSpecilization: state.getOptions.getSpecilization || [],
    getCapability: state.getOptions.getCapability || [],
    getTalents: state.getOptions.getTalents || [],

    // getSpecialInterest: state.getOptions.getSpecialInterest || [],
    // getCity: state.getOptions.getCity || [],

    // getStatus: state.getOptions.getStatus || [],
    // getIndustry: state.getOptions.getIndustry || [],
    // getAchievement: state.getOptions.getAchievement || [],

});

export default connect(mapStateToProps)(TicketCreation);

