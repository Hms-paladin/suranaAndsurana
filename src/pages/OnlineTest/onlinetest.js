import React, { useEffect, useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import DynModel from "../../component/Model/model";
import InstructionModal from '../OnlineTest/instructionModal'
import { getDesignationList, getCandidateName, GetTemplateName } from "../../actions/MasterDropdowns";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import './onlinetest.scss';

function OnlineTest(props) {
    const dispatch = useDispatch();
    const [pathname, setPathName] = useState(window.location.pathname)
    const [instModal, setInstModal] = useState(false)
    const [designation, setDesignation] = useState({})
    const [candidate, setCandidate] = useState({})
    const [templateName, setTemplateName] = useState({})
    // const [testTemplateId, setTestTemplateId] = useState()
    const [onlinetest, setOnlinetest] = useState({
        candidate: {
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
        temp_name: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    });


    useEffect(() => {
        dispatch(getDesignationList())
        dispatch(getCandidateName())
        dispatch(GetTemplateName())
    }, [])

    useEffect(() => {
        let Candidate = [];
        props.getCandidateName.map((data, index) => {
            Candidate.push({ value: data.name, id: data.resume_id });
        });
        setCandidate({ Candidate })

        let Designation = [];
        props.getDesignationList.map((data, index) => {
            Designation.push({ value: data.designation, id: data.designation_id });
        });
        setDesignation({ Designation })

        let TemplateName = [];
        props.GetTemplateName.map((data, index) => {
            TemplateName.push({ value: data.TestTempName, id: data.TestTempId });
        });
        setTemplateName({ TemplateName })
    }, [props.getDesignationList, props.getCandidateName, props.GetTemplateName])

    function checkValidation(data, key,) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            onlinetest[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: onlinetest[key].validation,
        };

        // if (data && key === "temp_name") {
        //     setTestTemplateId(data)
        // }

        setOnlinetest((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    // useEffect(() => {
    //     console.log(props.GettemplateQuetions, "props.GettemplateQuetions")
    // }, [props.GettemplateQuetions])

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(onlinetest);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                onlinetest[targetkeys[i]].value,
                onlinetest[targetkeys[i]].validation
            );
            onlinetest[targetkeys[i]].error = !errorcheck.state;
            onlinetest[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = onlinetest[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => onlinetest[obj].error == true);

        if (filtererr.length > 0) {
            // setOnlinetest({ error: true });
        } else {
            // setOnlinetest({ error: false });
            setInstModal(true)

            // dispatch(GettemplateQuetions(testTemplateId)).then(
            //     () => {
            
            //     }
            // );
        }

        
        setOnlinetest((prevState) => ({
            ...prevState,
        }));
        console.log(onlinetest,"onlinetestonlinetest")
    }


    const handleCancel = () => {
        let ResumeFrom_key = [
            "candidate",
            "designation",
            "temp_name",

        ];

        ResumeFrom_key.map((data) => {
            onlinetest[data].value = "";
        });
        setOnlinetest((prevState) => ({
            ...prevState,
        }));
    };

    ///***********user permission**********/
    const [saveRights, setSaveRights] = useState([])
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Online Test - Submit" == val.control
                )
            })
            setSaveRights(data_res_id)
        }

    }, [props.UserPermission]);

    /////////////
    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Candidate Name"
                            dropdown={candidate.Candidate}
                            changeData={(data) => checkValidation(data, "candidate")}
                            value={onlinetest.candidate.value}
                            error={onlinetest.candidate.error}
                            errmsg={onlinetest.candidate.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Designation"
                            dropdown={designation.Designation}
                            changeData={(data) => checkValidation(data, "designation")}
                            value={onlinetest.designation.value}
                            error={onlinetest.designation.error}
                            errmsg={onlinetest.designation.errmsg}></Labelbox>
                    </Grid>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Template Name"
                            dropdown={templateName.TemplateName}
                            changeData={(data) => checkValidation(data, "temp_name")}
                            value={onlinetest.temp_name.value}
                            error={onlinetest.temp_name.error}
                            errmsg={onlinetest.temp_name.errmsg}></Labelbox>
                    </Grid>
                </Grid>
                <div id="TTbtns">
                    <CustomButton btnName={"Submit"} btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
                    <DynModel modelTitle="Online Test Instructions" handleChangeModel={instModal} handleChangeCloseModel={(bln) => setInstModal(bln)} width={700}
                        content={<InstructionModal test_data={onlinetest} />} handle_hancel={()=>handleCancel()} closeModel={() => setInstModal(false)} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    console.log(state, "checkscheckstatetate"),
    {
        getDesignationList: state.getOptions.getDesignationList || [],
        getCandidateName: state.getOptions.getCandidateName || [],
        GetTemplateName: state.getOptions.GetTemplateName || [],
        UserPermission: state.UserPermissionReducer.getUserPermission,

    }
);

export default connect(mapStateToProps)(OnlineTest);