import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";

export default function OppositionDefended() {

    const dispatch = useDispatch()
    const [Oppo_defended, setResumeFrom] = useState({

        opp_fill_date: {
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
        opponent_agent: {
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
        var targetkeys = Object.keys(Oppo_defended);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Oppo_defended[targetkeys[i]].value,
                Oppo_defended[targetkeys[i]].validation
            );
            Oppo_defended[targetkeys[i]].error = !errorcheck.state;
            Oppo_defended[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Oppo_defended[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Oppo_defended[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(Oppo_defended)).then(() => {
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
            Oppo_defended[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Oppo_defended[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Oppo_defended[key].validation
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

                    <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}
                        changeData={(data) => checkValidation(data, "opp_fill_date")}
                        value={Oppo_defended.opp_fill_date.value}
                        error={Oppo_defended.opp_fill_date.error}
                        errmsg={Oppo_defended.opp_fill_date.errmsg} />

                    <Labelbox type="text" placeholder={"Types of Grant"}
                        changeData={(data) => checkValidation(data, "type_grant")}
                        value={Oppo_defended.type_grant.value}
                        error={Oppo_defended.type_grant.error}
                        errmsg={Oppo_defended.type_grant.errmsg} />

                    <Labelbox type="text" placeholder={"Patent Apllication Number"}
                        changeData={(data) => checkValidation(data, "app_num")}
                        value={Oppo_defended.app_num.value}
                        error={Oppo_defended.app_num.error}
                        errmsg={Oppo_defended.app_num.errmsg} />

                    <Labelbox type="text" placeholder={"Patent Title"}
                        changeData={(data) => checkValidation(data, "title")}
                        value={Oppo_defended.title.value}
                        error={Oppo_defended.title.error}
                        errmsg={Oppo_defended.title.errmsg} />

                    <Labelbox type="datepicker" placeholder={"Publication Date"}
                        changeData={(data) => checkValidation(data, "publicationdate")}
                        value={Oppo_defended.publicationdate.value}
                        error={Oppo_defended.publicationdate.error}
                        errmsg={Oppo_defended.publicationdate.errmsg} />

                    <Labelbox type="text" placeholder={"Opponent"}
                        changeData={(data) => checkValidation(data, "opponent")}
                        value={Oppo_defended.opponent.value}
                        error={Oppo_defended.opponent.error}
                        errmsg={Oppo_defended.opponent.errmsg} />

                    <Labelbox type="text" placeholder={"Opponent Agent"}
                        changeData={(data) => checkValidation(data, "opponent_agent")}
                        value={Oppo_defended.opponent_agent.value}
                        error={Oppo_defended.opponent_agent.error}
                        errmsg={Oppo_defended.opponent_agent.errmsg} />

                    <div className="foreign_div"><Labelbox type="text" placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={Oppo_defended.comments.value}
                        error={Oppo_defended.comments.error}
                        errmsg={Oppo_defended.comments.errmsg} /></div>
                </Grid>

            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}