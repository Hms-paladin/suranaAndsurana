import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign ,getDesignDetails} from "../../../../actions/InsertDesign";
import moment from "moment";
import { useParams } from "react-router-dom";

function RectificationDefended(props) {
    const [RectificationDefended, setRectificationDefended] = useState({
        des_number: {
            value: "",
            validation: [{ "name": "required" }],
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
    const [rectDefGetList, setRectDefGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
    const dispatch = useDispatch();
    const getDesign = useSelector((state) => state.getDesignDetails)

    useEffect(() => {
        dispatch(getIPStatus());
        dispatch(getDesignDetails(rowId))
    }, [])

    function checkValidation(data, key) {

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

        setRectificationDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {
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
        } else {
            dispatch(InsertDesign(RectificationDefended, props.projectDetails && props.projectDetails[0],getDesign[0])).then(() => {
                handleCancel()
            })
        }
        setRectificationDefended(prevState => ({
            ...prevState
        }));
    }
    let { rowId } = useParams()


    useEffect(() => {
        handleCancel()
        if (getDesign.length > 0) {
          let indiaFil_key = ["des_number", "respondent", "petitioner_rep", "status", "comments"]
    
          let indiaFil_value = ["design_number",  "responent_rep","petitioner", "status_id", "comments"]
    
          indiaFil_key.map((data, index) => {
            console.log(indiaFil_value[index], indiaFil_value[index] !== "application_date", getDesign[0][indiaFil_value[index]],"indiaFil_value[index]")
            if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date" && indiaFil_value[index] !== "renewal_date") {
              RectificationDefended[data].value = getDesign[0][indiaFil_value[index]];
            //   RectificationDefended[data].disabled = indiaFil_value[index]!=='status_id'&&getDesign[0][indiaFil_value[index]] ? true : false;
            }
            else {
              console.log(getDesign[0][indiaFil_value[index]], "getDesign[0]")
              RectificationDefended[data].value = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][indiaFil_value[index]]);
            //   RectificationDefended[data].disabled = getDesign[0][indiaFil_value[index]] === "0000-00-00" ? false : true;
    
            }
          });
          setRectificationDefended((prevState) => ({
            ...prevState,
          }));
        }
      }, [getDesign])

    useEffect(() => {

        const getStatusList = []

        DesignDropDowns.getIPStatus.map((data) => {
            getStatusList.push({ id: data.status_id, value: data.Status })
        })

        setRectDefGetList({ getStatusList })
    }, [DesignDropDowns])

    const handleCancel = () => {
        let rectDef_key = ["des_number", "respondent", "petitioner_rep", "status", "comments"]

        rectDef_key.map((data) => {
            RectificationDefended[data].value = "";
        });
        setRectificationDefended((prevState) => ({
            ...prevState,
        }));
    };

    return (
        <div className="container">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Grid>
                        <div className="Fieldheadings">Design Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "des_number")}
                            value={RectificationDefended.des_number.value}
                            error={RectificationDefended.des_number.error}
                            errmsg={RectificationDefended.des_number.errmsg}
                        />
                    </Grid>


                    <Grid>
                        <div className="Fieldheadings">Respondent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "respondent")}
                            value={RectificationDefended.respondent.value}
                            error={RectificationDefended.respondent.error}
                            errmsg={RectificationDefended.respondent.errmsg}
                        />
                    </Grid>


                    <Grid>
                        <div className="Fieldheadings">Petitioner Rep</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "petitioner_rep")}
                            value={RectificationDefended.petitioner_rep.value}
                            error={RectificationDefended.petitioner_rep.error}
                            errmsg={RectificationDefended.petitioner_rep.errmsg}
                        />
                    </Grid>


                    <Grid>
                        <div className="Fieldheadings">Status</div>
                        <Labelbox type="select"
                            changeData={(data) => checkValidation(data, "status")}
                            dropdown={rectDefGetList.getStatusList}
                            value={RectificationDefended.status.value}
                            error={RectificationDefended.status.error}
                            errmsg={RectificationDefended.status.errmsg}
                        />
                    </Grid>


                    <Grid>
                        <div className="Fieldheadings">Comments</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "comments")}
                            value={RectificationDefended.comments.value}
                            error={RectificationDefended.comments.error}
                            errmsg={RectificationDefended.comments.errmsg}
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
export default RectificationDefended;