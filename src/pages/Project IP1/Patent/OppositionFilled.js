import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";


export default function OppositionFilled() {

    const dispatch = useDispatch()
    const [Oppo_filled, setResumeFrom] = useState({

        opp_fill_date: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        app_agent: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        type_grant: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        app_num: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        opponent: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        publicationdate: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        title: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        applicant: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },

        comments: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Oppo_filled);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Oppo_filled[targetkeys[i]].value,
                Oppo_filled[targetkeys[i]].validation
            );
            Oppo_filled[targetkeys[i]].error = !errorcheck.state;
            Oppo_filled[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Oppo_filled[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Oppo_filled[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(Oppo_filled)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype"
        ]

        ResumeFrom_key.map((data) => {
            Oppo_filled[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Oppo_filled[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Oppo_filled[key].validation
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

    };
    return (
        <div>
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Labelbox type="text" placeholder={"Name of Opponent"}
                        changeData={(data) => checkValidation(data, "opponent")}
                        value={Oppo_filled.opponent.value}
                        error={Oppo_filled.opponent.error}
                        errmsg={Oppo_filled.opponent.errmsg} />

                    <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}
                        changeData={(data) => checkValidation(data, "opp_fill_date")}
                        value={Oppo_filled.opp_fill_date.value}
                        error={Oppo_filled.opp_fill_date.error}
                        errmsg={Oppo_filled.opp_fill_date.errmsg} />

                    <Labelbox type="text" placeholder={"Types of Grant"}
                        changeData={(data) => checkValidation(data, "type_grant")}
                        value={Oppo_filled.type_grant.value}
                        error={Oppo_filled.type_grant.error}
                        errmsg={Oppo_filled.type_grant.errmsg} />

                    <Labelbox type="text" placeholder={"Patent Apllication Number"}
                        changeData={(data) => checkValidation(data, "app_num")}
                        value={Oppo_filled.app_num.value}
                        error={Oppo_filled.app_num.error}
                        errmsg={Oppo_filled.app_num.errmsg} />

                    <Labelbox type="text" placeholder={"Patent Title"}
                        changeData={(data) => checkValidation(data, "title")}
                        value={Oppo_filled.title.value}
                        error={Oppo_filled.title.error}
                        errmsg={Oppo_filled.title.errmsg} />

                    <Labelbox type="datepicker" placeholder={"Publication Date"}
                        changeData={(data) => checkValidation(data, "publicationdate")}
                        value={Oppo_filled.publicationdate.value}
                        error={Oppo_filled.publicationdate.error}
                        errmsg={Oppo_filled.publicationdate.errmsg} />


                    <Labelbox type="text" placeholder={"Patent Applicant"}
                        changeData={(data) => checkValidation(data, "applicant")}
                        value={Oppo_filled.applicant.value}
                        error={Oppo_filled.applicant.error}
                        errmsg={Oppo_filled.applicant.errmsg} />

                    <Labelbox type="text" placeholder={"Application Agent"}
                        changeData={(data) => checkValidation(data, "app_agent")}
                        value={Oppo_filled.app_agent.value}
                        error={Oppo_filled.app_agent.error}
                        errmsg={Oppo_filled.app_agent.errmsg} />

                </Grid>

            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}