import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import Checklist from "../../../../images/checklist.png";
import Stage from "../../../../images/stage.png";
import Task from "../../../../images/task.png";
import Application from "../../../../images/application.png";

function CancelDefended() {
    const [CancelDefended, setCancelDefended] = useState({
        client_responten: {
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
        petitioner_rep: {
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
            CancelDefended[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: CancelDefended[key].validation
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
        //         CancelDefended[obj].error == true ||
        //         CancelDefended[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setResumeFrom({ error: true, errordummy: false });
        // } else {
        //     setResumeFrom({ error: false });
        // }
    };

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(CancelDefended);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                CancelDefended[targetkeys[i]].value,
                CancelDefended[targetkeys[i]].validation
            );
            CancelDefended[targetkeys[i]].error = !errorcheck.state;
            CancelDefended[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = CancelDefended[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => CancelDefended[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setCancelDefended({ error: true });
        } else {
            // setCancelDefended({ error: false });

            // dispatch(InesertResume(CancelDefended)).then(()=>{
            //     handleCancel()
            // })
        }

        setCancelDefended(prevState => ({
            ...prevState
        }));


    }
    return (
        <div className="container">

            <Grid container spacing={2}   >
                <Grid item md={2}>
                    <Labelbox type="select"
                        placeholder={"Client Respondent"}
                        changeData={(data) => checkValidation(data, "client_respontent")}
                        value={CancelDefended.client_responten.value}
                        error={CancelDefended.client_responten.error}
                        errmsg={CancelDefended.client_responten.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={CancelDefended.des_number.value}
                        error={CancelDefended.des_number.error}
                        errmsg={CancelDefended.des_number.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox type="text"
                        placeholder={"Petitioner"}
                        changeData={(data) => checkValidation(data, "petitioner")}
                        value={CancelDefended.petitioner.value}
                        error={CancelDefended.petitioner.error}
                        errmsg={CancelDefended.petitioner.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox type="text"
                        placeholder={"Petitioner Rep"}
                        changeData={(data) => checkValidation(data, "petitioner_rep")}
                        value={CancelDefended.petitioner_rep.value}
                        error={CancelDefended.petitioner_rep.error}
                        errmsg={CancelDefended.petitioner_rep.errmsg}
                    />
                </Grid>
                <Grid item md={3} />
                <Grid item md={2} >
                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        value={CancelDefended.status.value}
                        error={CancelDefended.status.error}
                        errmsg={CancelDefended.status.errmsg}
                    />
                </Grid>
                <Grid item md={4} >
                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={CancelDefended.comments.value}
                        error={CancelDefended.comments.error}
                        errmsg={CancelDefended.comments.errmsg}
                    />
                </Grid>
                <Grid item md={2} >
                    <Labelbox type="datepicker"
                        placeholder={"Application Date"}
                        changeData={(data) => checkValidation(data, "app_date")}
                        value={CancelDefended.app_date.value}
                        error={CancelDefended.app_date.error}
                        errmsg={CancelDefended.app_date.errmsg}
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
export default CancelDefended;