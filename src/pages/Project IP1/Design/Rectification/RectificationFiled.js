import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign } from "../../../../actions/InsertDesign";
import moment from "moment";

function RectificationFiled(props) {
    const [RectificationFiled, setCancelDefended] = useState({
        des_number: {
            value: "",
            validation: [{ "name": "required" }],
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
    })
    const [rectFilGetList, setRectFilGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
    const dispatch = useDispatch();
    const getDesign = useSelector((state) => state.getDesignDetails)

    useEffect(() => {
        if (getDesign.length > 0) {
          let indiaFil_key = ["des_number", "petitioner", "respondent_rep", "status", "comments"]
    
          let indiaFil_value = ["design_number", "petitioner", "responent_rep", "status_id", "comments"]
    
          indiaFil_key.map((data, index) => {
            console.log(indiaFil_value[index], indiaFil_value[index] !== "application_date", getDesign[0][indiaFil_value[index]],"indiaFil_value[index]")
            if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date" && indiaFil_value[index] !== "renewal_date") {
              RectificationFiled[data].value = getDesign[0][indiaFil_value[index]];
              RectificationFiled[data].disabled = indiaFil_value[index]!=='status_id'&&getDesign[0][indiaFil_value[index]] ? true : false;
            }
            else {
              console.log(getDesign[0][indiaFil_value[index]], "getDesign[0]")
              RectificationFiled[data].value = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][indiaFil_value[index]]);
              RectificationFiled[data].disabled = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? false : true;
    
            }
          });
          setCancelDefended((prevState) => ({
            ...prevState,
          }));
        }
      }, [getDesign])
    function checkValidation(data, key) {

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
        setCancelDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
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
        } else {
            console.log(props.projectDetails && props.projectDetails[0],"dsignid")
            dispatch(InsertDesign(RectificationFiled, props.projectDetails && props.projectDetails[0],getDesign[0])).then(() => {
                handleCancel()
            })
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

        setRectFilGetList({ getStatusList })
    }, [DesignDropDowns])

    const handleCancel = () => {
        let rectFil_key = ["des_number", "petitioner", "respondent_rep", "status", "comments"]

        rectFil_key.map((data) => {
            RectificationFiled[data].value = "";
        });
        setCancelDefended((prevState) => ({
            ...prevState,
        }));
    };

    console.log(RectificationFiled, "RectificationFiled")

    return (
        <div className="container">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Grid>
                        <div className="Fieldheadings">Design Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "des_number")}
                            value={RectificationFiled.des_number.value}
                            error={RectificationFiled.des_number.error}
                            errmsg={RectificationFiled.des_number.errmsg}
                        />
                    </Grid>


                    <Grid>
                        <div className="Fieldheadings">Petitioner</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "petitioner")}
                            value={RectificationFiled.petitioner.value}
                            error={RectificationFiled.petitioner.error}
                            errmsg={RectificationFiled.petitioner.errmsg}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Respondent Rep</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "respondent_rep")}
                            value={RectificationFiled.respondent_rep.value}
                            error={RectificationFiled.respondent_rep.error}
                            errmsg={RectificationFiled.respondent_rep.errmsg}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Status</div>
                        <Labelbox type="select"
                            changeData={(data) => checkValidation(data, "status")}
                            dropdown={rectFilGetList.getStatusList}
                            value={RectificationFiled.status.value}
                            error={RectificationFiled.status.error}
                            errmsg={RectificationFiled.status.errmsg}
                        />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Comments</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "comments")}
                            value={RectificationFiled.comments.value}
                            error={RectificationFiled.comments.error}
                            errmsg={RectificationFiled.comments.errmsg}
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
export default RectificationFiled;