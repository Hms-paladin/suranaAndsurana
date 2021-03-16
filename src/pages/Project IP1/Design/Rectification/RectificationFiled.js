import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import Checklist from "../../../../images/checklist.png";
import Stage from "../../../../images/stage.png";
import Task from "../../../../images/task.png";
import Application from "../../../../images/application.png";

function RectificationFiled(){
    const [ RectificationFiled, setCancelDefended ] = useState({
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
        respondent: {
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
    
        function onSubmit(){   
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
    return(
        <div className="container">
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            <div style={{margin:'5px'}}>
              <img src={Checklist} />
              <p>CHECKLIST</p>
            </div>
            <div style={{margin:'5px'}}>
              <img src={Stage} />
              <p>STAGE</p>
            </div>
            <div style={{margin:'5px'}}>
              <img src={Task} />
              <p>TASKS</p>
            </div>
            <div style={{margin:'5px'}}>
              <img src={Application} />
              <p>APPLICATION</p>
            </div>
            <div style={{margin:'5px'}}>
              <img src={Application} />
              <p>STAGE MONITOR</p>
            </div>
         </div>
            <Grid  container spacing={2}   >
                <Grid item md={2}>
                    <Labelbox  type="select"
                    placeholder={"Client Petitioner"}
                    changeData={(data) => checkValidation(data, "client_petitioner")}
                    value={RectificationFiled.client_petitioner.value}
                    error={RectificationFiled.client_petitioner.error}
                    errmsg={RectificationFiled.client_petitioner.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Design Number"}
                    changeData={(data) => checkValidation(data, "des_number")}
                    value={RectificationFiled.des_number.value}
                    error={RectificationFiled.des_number.error}
                    errmsg={RectificationFiled.des_number.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Respondent"}
                    changeData={(data) => checkValidation(data, "respondent")}
                    value={RectificationFiled.respondent.value}
                    error={RectificationFiled.respondent.error}
                    errmsg={RectificationFiled.respondent.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Respondent Rep"}
                    changeData={(data) => checkValidation(data, "respondent_rep")}
                    value={RectificationFiled.respondent_rep.value}
                    error={RectificationFiled.respondent_rep.error}
                    errmsg={RectificationFiled.respondent_rep.errmsg}
                    />
                </Grid>
                <Grid item md={3}/>
                <Grid item md={2} >
                   <Labelbox  type="select"
                    placeholder={"Status"}
                    changeData={(data) => checkValidation(data, "status")}
                    value={RectificationFiled.status.value}
                    error={RectificationFiled.status.error}
                    errmsg={RectificationFiled.status.errmsg}
                    />
                </Grid>
                <Grid item md={4} >
                   <Labelbox  type="text"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={RectificationFiled.comments.value}
                    error={RectificationFiled.comments.error}
                    errmsg={RectificationFiled.comments.errmsg}
                    />
                </Grid>
                <Grid item md={2} >
                   <Labelbox  type="datepicker"
                    placeholder={"Application Date"}
                    changeData={(data) => checkValidation(data, "app_date")}
                    value={RectificationFiled.app_date.value}
                    error={RectificationFiled.app_date.error}
                    errmsg={RectificationFiled.app_date.errmsg}
                    />
                </Grid>
           </Grid>   
           <div className="ipdesign_savebtn" direction="row" justify="center">
                <CustomButton  btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit}/>
                <CustomButton  btnName={"cancel"} btnCustomColor="customPrimary"/>
           </div>
                   
        </div>
    )
}
export default RectificationFiled;