import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction"

function CancelFiled(){
    const [CancelFiled, setCancelFiled] = useState({
        client_petition: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        des_num: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        responetent: {
            value: "",
            validation: [{ "name": "required" }, { "name": "alphabetwithspace" }],
            error: null,
            errmsg: null,
        },
        res_rep: {
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
            CancelFiled[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: CancelFiled[key].validation
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
    
        setCancelFiled(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         CancelFiled[obj].error == true ||
        //         CancelFiled[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setResumeFrom({ error: true, errordummy: false });
        // } else {
        //     setResumeFrom({ error: false });
        // }
    };
    
        function onSubmit(){   
        var mainvalue = {};
        var targetkeys = Object.keys(CancelFiled);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                CancelFiled[targetkeys[i]].value,
                CancelFiled[targetkeys[i]].validation
            );
            CancelFiled[targetkeys[i]].error = !errorcheck.state;
            CancelFiled[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = CancelFiled[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => CancelFiled[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setCancelFiled({ error: true });
        } else {
            // setCancelFiled({ error: false });
            
            // dispatch(InesertResume(CancelFiled)).then(()=>{
            //     handleCancel()
            // })
        }
    
        setCancelFiled(prevState => ({
            ...prevState
        }));
    
    
        }
    return(
        <div className="container">
        

            <Grid  container spacing={2}   >
                <Grid item md={2}>
                    <Labelbox  type="select"
                    placeholder={"Client Petitioner"}
                    changeData={(data) => checkValidation(data, "client_petition")}
                    value={CancelFiled.client_petition.value}
                    error={CancelFiled.client_petition.error}
                    errmsg={CancelFiled.client_petition.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Design Number"}
                    changeData={(data) => checkValidation(data, "des_num")}
                    value={CancelFiled.des_num.value}
                    error={CancelFiled.des_num.error}
                    errmsg={CancelFiled.des_num.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Responent"}
                    changeData={(data) => checkValidation(data, "responetent")}
                    value={CancelFiled.responetent.value}
                    error={CancelFiled.responetent.error}
                    errmsg={CancelFiled.responetent.errmsg}
                    />
                </Grid>
                <Grid item md={2}>
                    <Labelbox  type="text"
                    placeholder={"Responent Rep"}
                    changeData={(data) => checkValidation(data, "res_rep")}
                    value={CancelFiled.res_rep.value}
                    error={CancelFiled.res_rep.error}
                    errmsg={CancelFiled.res_rep.errmsg}
                    />
                </Grid>
                <Grid item md={3}/>
                <Grid item md={2} >
                   <Labelbox  type="select"
                    placeholder={"Status"}
                    changeData={(data) => checkValidation(data, "status")}
                    value={CancelFiled.status.value}
                    error={CancelFiled.status.error}
                    errmsg={CancelFiled.status.errmsg}
                    />
                </Grid>
                <Grid item md={4} >
                   <Labelbox  type="text"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={CancelFiled.comments.value}
                    error={CancelFiled.comments.error}
                    errmsg={CancelFiled.comments.errmsg}
                    />
                </Grid>
                <Grid item md={2} >
                   <Labelbox  type="datepicker"
                    placeholder={"Application Date"}
                    changeData={(data) => checkValidation(data, "app_date")}
                    value={CancelFiled.app_date.value}
                    error={CancelFiled.app_date.error}
                    errmsg={CancelFiled.app_date.errmsg}
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
export default CancelFiled;