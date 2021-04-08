import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";


function RectificationFiled() {
    const [RectificationFiled, setCancelDefended] = useState({
        client_petitioner: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        des_number: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        petitioner: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        respondent_rep: {
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
        comments: {
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
    })

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            RectificationFiled[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: RectificationFiled[key].validation
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

        setCancelDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         RectificationFiled[obj].error == true ||
        //         RectificationFiled[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setResumeFrom({ error: true, errordummy: false });
        // } else {
        //     setResumeFrom({ error: false });
        // }
    };

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(RectificationFiled);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                RectificationFiled[targetkeys[i]].value,
                RectificationFiled[targetkeys[i]].validation
            );
            RectificationFiled[targetkeys[i]].error = !errorcheck.state;
            RectificationFiled[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = RectificationFiled[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => RectificationFiled[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setCancelDefended({ error: true });
        } else {
            // setCancelDefended({ error: false });

            // dispatch(InesertResume(RectificationFiled)).then(()=>{
            //     handleCancel()
            // })
        }

        setCancelDefended(prevState => ({
            ...prevState
        }));


    }
    return (
        <div className="container">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">



                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={RectificationFiled.des_number.value}
                        error={RectificationFiled.des_number.error}
                        errmsg={RectificationFiled.des_number.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Petitioner"}
                        changeData={(data) => checkValidation(data, "petitioner")}
                        value={RectificationFiled.petitioner.value}
                        error={RectificationFiled.petitioner.error}
                        errmsg={RectificationFiled.petitioner.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Respondent Rep"}
                        changeData={(data) => checkValidation(data, "respondent_rep")}
                        value={RectificationFiled.respondent_rep.value}
                        error={RectificationFiled.respondent_rep.error}
                        errmsg={RectificationFiled.respondent_rep.errmsg}
                    />

                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        value={RectificationFiled.status.value}
                        error={RectificationFiled.status.error}
                        errmsg={RectificationFiled.status.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={RectificationFiled.comments.value}
                        error={RectificationFiled.comments.error}
                        errmsg={RectificationFiled.comments.errmsg}
                    />

                </Grid>
            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS={"TMopositionbuttons"} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}
export default RectificationFiled;