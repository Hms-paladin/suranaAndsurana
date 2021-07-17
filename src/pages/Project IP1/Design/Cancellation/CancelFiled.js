import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign, getDesignDetails } from "../../../../actions/InsertDesign";
import moment from "moment";

function CancelFiled(props) {
    const [CancelFiled, setCancelFiled] = useState({
        client_petition: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false
        },
        des_number: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        petitioner: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        respondent_rep: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        status: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        comments: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        app_date: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
    })
    const [cancFilGetList, setCancFilGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
    const getDesign = useSelector((state) => state.getDesignDetails)
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
            dispatch(InsertDesign(CancelFiled, props.projectDetails && props.projectDetails[0], getDesign[0])).then(() => {
                // handleCancel()
            })
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

    const handleCancel = () => {
        let cancFil_key = ["client_petition", "des_number", "petitioner", "respondent_rep", "status", "comments"]

        let cancFil_value = ["client_petitioner", "design_number", "petitioner", "responent_rep", "status", "comments"]

        if (getDesign.length > 0) {
            cancFil_key.map((data, index) => {
                CancelFiled[data].value = getDesign[0][cancFil_value[index]] ? getDesign[0][cancFil_value[index]] : "";
            });
        } else {
            cancFil_key.map((data) => {
                CancelFiled[data].value = "";
            });
        }
        setCancFilGetList((prevState) => ({
            ...prevState,
        }));
    };

    useEffect(() => {
        dispatch(getDesignDetails(props.projectDetails && props.projectDetails[0].project_id,getDesign));
    }, [props.projectDetails])

    useEffect(() => {
        if (getDesign.length > 0) {
            let cancFil_key = ["client_petition", "des_number", "petitioner", "respondent_rep", "status", "comments"]

            let cancFil_value = ["client_petitioner", "design_number", "petitioner", "responent_rep", "status_id", "comments"]

            cancFil_key.map((data, index) => {
                if (cancFil_value[index] !== "application_date" && cancFil_value[index] !== "priority_date" && cancFil_value[index] !== "renewal_date") {
                    CancelFiled[data].value = getDesign[0][cancFil_value[index]];
                    CancelFiled[data].disabled = cancFil_value[index]!=='status_id'&&getDesign[0][cancFil_value[index]] ? true : false;
                }
                else {
                    console.log(getDesign[0][cancFil_value[index]], "getDesign[0]")
                    CancelFiled[data].value = getDesign[0][cancFil_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][cancFil_value[index]]);
                    CancelFiled[data].disabled = getDesign[0][cancFil_value[index]] === "0000-00-00" ? false : true;
                }
            });
            setCancFilGetList((prevState) => ({
                ...prevState,
            }));
        }
    }, [getDesign])

    return (
        <div className="container">

            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Grid>
                        <div className="Fieldheadings">Client Petitioner</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "client_petition")}
                            value={CancelFiled.client_petition.value}
                            error={CancelFiled.client_petition.error}
                            errmsg={CancelFiled.client_petition.errmsg}
                            disabled={CancelFiled.client_petition.disabled}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Design Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "des_number")}
                            value={CancelFiled.des_number.value}
                            error={CancelFiled.des_number.error}
                            errmsg={CancelFiled.des_number.errmsg}
                            disabled={CancelFiled.des_number.disabled}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Petitioner</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "petitioner")}
                            value={CancelFiled.petitioner.value}
                            error={CancelFiled.petitioner.error}
                            errmsg={CancelFiled.petitioner.errmsg}
                            disabled={CancelFiled.petitioner.disabled}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Responent Rep</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "respondent_rep")}
                            value={CancelFiled.respondent_rep.value}
                            error={CancelFiled.respondent_rep.error}
                            errmsg={CancelFiled.respondent_rep.errmsg}
                            disabled={CancelFiled.respondent_rep.disabled}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Status</div>
                        <Labelbox type="select"
                            changeData={(data) => checkValidation(data, "status")}
                            dropdown={cancFilGetList.getStatusList}
                            value={CancelFiled.status.value}
                            error={CancelFiled.status.error}
                            errmsg={CancelFiled.status.errmsg}
                            disabled={CancelFiled.status.disabled}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Comments</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "comments")}
                            value={CancelFiled.comments.value}
                            error={CancelFiled.comments.error}
                            errmsg={CancelFiled.comments.errmsg}
                            disabled={CancelFiled.comments.disabled}
                        />
                    </Grid>

                </Grid>
            </Grid>


            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS={"TMopositionbuttons"} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} onBtnClick={handleCancel} />
            </div>
        </div>
    )
}
export default CancelFiled;