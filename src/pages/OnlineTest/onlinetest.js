import React, { useEffect, useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import DynModel from "../../component/Model/model";
import InstructionModal from '../OnlineTest/instructionModal'
import { getDesignationList } from "../../actions/MasterDropdowns";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import './onlinetest.scss';

function OnlineTest(props) {
    const dispatch = useDispatch();
    const [pathname, setPathName] = useState(window.location.pathname)
    const [instModal, setInstModal] = useState(false)
    const [designation, setDesignation] = useState({})
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
    }, [])

    useEffect(() => {
        let Designation = [];
        props.getDesignationList.map((data, index) => {
            Designation.push({ value: data.designation, id: data.designation_id });
        });
        setDesignation({Designation})
    }, [props.getDesignationList])

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



        setOnlinetest((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }


    function onSubmit(text) {
        console.log(text, "testing")
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

            //   dispatch(InesertResume(onlinetest, educationList, experienceList)).then(
            //     () => {
            //       handleCancel();
            //     }
            //   );
        }


        setOnlinetest((prevState) => ({
            ...prevState,
        }));
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


    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Candidate Name"
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
                            changeData={(data) => checkValidation(data, "temp_name")}
                            value={onlinetest.temp_name.value}
                            error={onlinetest.temp_name.error}
                            errmsg={onlinetest.temp_name.errmsg}></Labelbox>
                    </Grid>
                </Grid>
                <div id="TTbtns">
                    <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={() => setInstModal(true)} />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                    <DynModel modelTitle="Online Test Instructions" handleChangeModel={instModal} handleChangeCloseModel={(bln) => setInstModal(bln)} width={700}
                        content={<InstructionModal />} closeModel={() => setInstModal(false)} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    console.log(state, "checkstate"),
    {
        getDesignationList: state.getOptions.getDesignationList || [],


    }
);

export default connect(mapStateToProps)(OnlineTest);