import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign } from "../../../../actions/InsertDesign";

function CancelDefended() {
    const [CancelDefended, setCancelDefended] = useState({
        client_respontent: {
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
        respondent: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        petitioner_rep: {
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
        }
    })
    const [cancDefGetList, setCancDefGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
    const dispatch = useDispatch();

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
        setCancelDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
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
        } else {
            // dispatch(InesertResume(CancelDefended)).then(()=>{
            //     handleCancel()
            // })
        }
        setCancelDefended(prevState => ({
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
    
        setCancDefGetList({ getStatusList })
      }, [DesignDropDowns])

    return (
        <div className="container">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">


                    <Labelbox type="text"
                        placeholder={"Client Respondent"}
                        changeData={(data) => checkValidation(data, "client_respontent")}
                        value={CancelDefended.client_respontent.value}
                        error={CancelDefended.client_respontent.error}
                        errmsg={CancelDefended.client_respontent.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={CancelDefended.des_number.value}
                        error={CancelDefended.des_number.error}
                        errmsg={CancelDefended.des_number.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Respondent"}
                        changeData={(data) => checkValidation(data, "respondent")}
                        value={CancelDefended.respondent.value}
                        error={CancelDefended.respondent.error}
                        errmsg={CancelDefended.respondent.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={"Petitioner Rep"}
                        changeData={(data) => checkValidation(data, "petitioner_rep")}
                        value={CancelDefended.petitioner_rep.value}
                        error={CancelDefended.petitioner_rep.error}
                        errmsg={CancelDefended.petitioner_rep.errmsg}
                    />

                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        dropdown={cancDefGetList.getStatusList}
                        value={CancelDefended.status.value}
                        error={CancelDefended.status.error}
                        errmsg={CancelDefended.status.errmsg}
                    />
                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={CancelDefended.comments.value}
                        error={CancelDefended.comments.error}
                        errmsg={CancelDefended.comments.errmsg}
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