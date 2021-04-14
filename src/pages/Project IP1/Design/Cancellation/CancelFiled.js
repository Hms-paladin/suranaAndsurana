import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign } from "../../../../actions/InsertDesign";

function CancelFiled() {
    const [CancelFiled, setCancelFiled] = useState({
        client_petition: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        des_number: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        petitioner: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        respondent_rep: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        status: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        comments: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        app_date: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
    })
    const [cancFilGetList, setCancFilGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
    const dispatch = useDispatch();

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
        setCancelFiled(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {
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
        } else {
            // dispatch(InesertResume(CancelFiled)).then(()=>{
            //     handleCancel()
            // })
        }
        setCancelFiled(prevState => ({
            ...prevState
        }));
    }

    useEffect(() => {
        dispatch(getIPStatus());
      }, [])
    
      useEffect(() => {
    
        const getStatusList = []

        DesignDropDowns.getIPStatus.map((data) => {
          getStatusList.push({ id: data.status_id, value: data.Status })
        })
    
        setCancFilGetList({ getStatusList })
      }, [DesignDropDowns])

    return (
        <div className="container">

            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">

                    <Labelbox type="text"
                        placeholder={"Client Petitioner"}
                        changeData={(data) => checkValidation(data, "client_petition")}
                        value={CancelFiled.client_petition.value}
                        error={CancelFiled.client_petition.error}
                        errmsg={CancelFiled.client_petition.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={CancelFiled.des_number.value}
                        error={CancelFiled.des_number.error}
                        errmsg={CancelFiled.des_number.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Petitioner"}
                        changeData={(data) => checkValidation(data, "petitioner")}
                        value={CancelFiled.petitioner.value}
                        error={CancelFiled.petitioner.error}
                        errmsg={CancelFiled.petitioner.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Responent Rep"}
                        changeData={(data) => checkValidation(data, "respondent_rep")}
                        value={CancelFiled.respondent_rep.value}
                        error={CancelFiled.respondent_rep.error}
                        errmsg={CancelFiled.respondent_rep.errmsg}
                    />

                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        dropdown={cancFilGetList.getStatusList}
                        value={CancelFiled.status.value}
                        error={CancelFiled.status.error}
                        errmsg={CancelFiled.status.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={CancelFiled.comments.value}
                        error={CancelFiled.comments.error}
                        errmsg={CancelFiled.comments.errmsg}
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
export default CancelFiled;