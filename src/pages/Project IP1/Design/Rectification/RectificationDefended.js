import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign } from "../../../../actions/InsertDesign";

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
            dispatch(InsertDesign(RectificationDefended, props.projectDetails && props.projectDetails[0])).then(() => {
                handleCancel()
              })
        }
        setRectificationDefended(prevState => ({
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
                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={RectificationDefended.des_number.value}
                        error={RectificationDefended.des_number.error}
                        errmsg={RectificationDefended.des_number.errmsg}
                    />
                    <Labelbox type="text"
                        placeholder={"Respondent"}
                        changeData={(data) => checkValidation(data, "respondent")}
                        value={RectificationDefended.respondent.value}
                        error={RectificationDefended.respondent.error}
                        errmsg={RectificationDefended.respondent.errmsg}
                    />
                    <Labelbox type="text"
                        placeholder={"Petitioner Rep"}
                        changeData={(data) => checkValidation(data, "petitioner_rep")}
                        value={RectificationDefended.petitioner_rep.value}
                        error={RectificationDefended.petitioner_rep.error}
                        errmsg={RectificationDefended.petitioner_rep.errmsg}
                    />
                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        dropdown={rectDefGetList.getStatusList}
                        value={RectificationDefended.status.value}
                        error={RectificationDefended.status.error}
                        errmsg={RectificationDefended.status.errmsg}
                    />
                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={RectificationDefended.comments.value}
                        error={RectificationDefended.comments.error}
                        errmsg={RectificationDefended.comments.errmsg}
                    />
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