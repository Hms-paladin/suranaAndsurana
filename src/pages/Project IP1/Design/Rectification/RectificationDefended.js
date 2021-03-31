import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import Checklist from "../../../../images/checklist.png";
import Stage from "../../../../images/stage.png";
import Task from "../../../../images/task.png";
import Application from "../../../../images/application.png";

function RectificationDefended(){
    const [RectificationDefended, setRectificationDefended] = useState({
        client_respontent: {
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
            RectificationDefended[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: RectificationDefended[key].validation
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
    
        setRectificationDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         RectificationDefended[obj].error == true ||
        //         RectificationDefended[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setResumeFrom({ error: true, errordummy: false });
        // } else {
        //     setResumeFrom({ error: false });
        // }
    };
    
        function onSubmit(){   
        var mainvalue = {};
        var targetkeys = Object.keys(RectificationDefended);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                RectificationDefended[targetkeys[i]].value,
                RectificationDefended[targetkeys[i]].validation
            );
            RectificationDefended[targetkeys[i]].error = !errorcheck.state;
            RectificationDefended[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = RectificationDefended[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => RectificationDefended[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setRectificationDefended({ error: true });
        } else {
            // setRectificationDefended({ error: false });
            
            // dispatch(InesertResume(RectificationDefended)).then(()=>{
            //     handleCancel()
            // })
        }
    
        setRectificationDefended(prevState => ({
            ...prevState
        }));
    
    
        }
    return(
        <div className="container">
           
            <Grid  container spacing={2}   >
                <Grid item md={2}>
                    <Labelbox  type="select"
                    placeholder={"Client Respondent"}
                    changeData={(data) => checkValidation(data, "client_respontent")}
                    value={RectificationDefended.client_respontent.value}
                    error={RectificationDefended.client_respontent.error}
                    errmsg={RectificationDefended.client_respontent.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Design Number"}
                    changeData={(data) => checkValidation(data, "des_number")}
                    value={RectificationDefended.des_number.value}
                    error={RectificationDefended.des_number.error}
                    errmsg={RectificationDefended.des_number.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Petitioner"}
                    changeData={(data) => checkValidation(data, "petitioner")}
                    value={RectificationDefended.petitioner.value}
                    error={RectificationDefended.petitioner.error}
                    errmsg={RectificationDefended.petitioner.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Petitioner Rep"}
                    changeData={(data) => checkValidation(data, "petitioner_rep")}
                    value={RectificationDefended.petitioner_rep.value}
                    error={RectificationDefended.petitioner_rep.error}
                    errmsg={RectificationDefended.petitioner_rep.errmsg}
                    />
                </Grid>
                <Grid item md={3}/>
                <Grid item md={2} >
                   <Labelbox  type="select"
                    placeholder={"Status"}
                    changeData={(data) => checkValidation(data, "status")}
                    value={RectificationDefended.status.value}
                    error={RectificationDefended.status.error}
                    errmsg={RectificationDefended.status.errmsg}
                    />
                </Grid>
                <Grid item md={4} >
                   <Labelbox  type="text"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={RectificationDefended.comments.value}
                    error={RectificationDefended.comments.error}
                    errmsg={RectificationDefended.comments.errmsg}
                    />
                </Grid>
                <Grid item md={2} >
                   <Labelbox  type="datepicker"
                    placeholder={"Application Date"}
                    changeData={(data) => checkValidation(data, "app_date")}
                    value={RectificationDefended.app_date.value}
                    error={RectificationDefended.app_date.error}
                    errmsg={RectificationDefended.app_date.errmsg}
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
export default RectificationDefended;