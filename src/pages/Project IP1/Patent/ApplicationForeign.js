import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";


export default function ApplicationForeign() {
    const dispatch = useDispatch()
    const [App_Foreign, setResumeFrom] = useState({

        file_cover: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        our_ref: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        associate: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        country: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        class: {
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
        client_ref: {
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
        app_date: {
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
        status: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        priority_country: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        priority_num: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },

        priority_date: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },





    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(App_Foreign);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                App_Foreign[targetkeys[i]].value,
                App_Foreign[targetkeys[i]].validation
            );
            App_Foreign[targetkeys[i]].error = !errorcheck.state;
            App_Foreign[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = App_Foreign[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => App_Foreign[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(App_Foreign)).then(() => {
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
            App_Foreign[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            App_Foreign[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: App_Foreign[key].validation
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
                    <Labelbox type="text" placeholder={"File Cover"}
                        changeData={(data) => checkValidation(data, "file_cover")}
                        value={App_Foreign.file_cover.value}
                        error={App_Foreign.file_cover.error}
                        errmsg={App_Foreign.file_cover.errmsg} />

                    <Labelbox type="text" placeholder={"Our Reference"}
                        changeData={(data) => checkValidation(data, "our_ref")}
                        value={App_Foreign.our_ref.value}
                        error={App_Foreign.our_ref.error}
                        errmsg={App_Foreign.our_ref.errmsg} />

                    <Labelbox type="text" placeholder={"Client Reference"}
                        changeData={(data) => checkValidation(data, "client_ref")}
                        value={App_Foreign.client_ref.value}
                        error={App_Foreign.client_ref.error}
                        errmsg={App_Foreign.client_ref.errmsg} />

                    <Labelbox type="number" placeholder={"Application number"}
                        changeData={(data) => checkValidation(data, "app_num")}
                        value={App_Foreign.app_num.value}
                        error={App_Foreign.app_num.error}
                        errmsg={App_Foreign.app_num.errmsg} />

                    <Labelbox type="datepicker" placeholder={"Application Date"}
                        changeData={(data) => checkValidation(data, "app_date")}
                        value={App_Foreign.app_date.value}
                        error={App_Foreign.app_date.error}
                        errmsg={App_Foreign.app_date.errmsg} />

                    <Labelbox type="number" placeholder={"Priority No"}
                        changeData={(data) => checkValidation(data, "priority_num")}
                        value={App_Foreign.priority_num.value}
                        error={App_Foreign.priority_num.error}
                        errmsg={App_Foreign.priority_num.errmsg} />
                    <Labelbox type="datepicker" placeholder={"Priority Date"}
                        changeData={(data) => checkValidation(data, "priority_date")}
                        value={App_Foreign.priority_date.value}
                        error={App_Foreign.priority_date.error}
                        errmsg={App_Foreign.priority_date.errmsg} />

                    <Labelbox type="text" placeholder={"Title"}
                        changeData={(data) => checkValidation(data, "title")}
                        value={App_Foreign.title.value}
                        error={App_Foreign.title.error}
                        errmsg={App_Foreign.title.errmsg} />

                    <Labelbox type="select" placeholder={"Country"} />


                    <Labelbox type="text" placeholder={"Associate"}
                        changeData={(data) => checkValidation(data, "associate")}
                        value={App_Foreign.associate.value}
                        error={App_Foreign.associate.error}
                        errmsg={App_Foreign.associate.errmsg} />

                    <Labelbox type="select" placeholder={"Status"}
                    />
                    <div className="coments_div"><Labelbox type="text" placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={App_Foreign.comments.value}
                        error={App_Foreign.comments.error}
                        errmsg={App_Foreign.comments.errmsg} /></div>


                </Grid>


            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}