import React, { useState } from 'react';
import './projectIp.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox } from 'antd';
import UploadIcon from '../../images/uploadIcon.svg';
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { InesertResume } from "../../actions/ResumeAction";



function OpeModel() {


    const dispatch = useDispatch()


    const [OPE_Model, setResumeFrom] = useState({

        amount: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ourReference: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },



    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(OPE_Model);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                OPE_Model[targetkeys[i]].value,
                OPE_Model[targetkeys[i]].validation
            );
            OPE_Model[targetkeys[i]].error = !errorcheck.state;
            OPE_Model[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = OPE_Model[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => OPE_Model[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(OPE_Model)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "mark", "projecttype"
        ]

        ResumeFrom_key.map((data) => {
            OPE_Model[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            OPE_Model[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: OPE_Model[key].validation
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

        setResumeFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };
    return (
        <div>
            <div className="opeHeader">
                <div>IP Project </div>
                <div>Project Name</div>
                <div>Johnson & Johnson</div>
            </div>
            <div className="opeFields">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <Labelbox type="select"
                            placeholder={" Expence Type"}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="text"
                            placeholder={" Amount"}
                            changeData={(data) => checkValidation(data, "amount")}
                            value={OPE_Model.amount.value}
                            error={OPE_Model.amount.error}
                            errmsg={OPE_Model.amount.errmsg} />
                    </Grid>
                    <Grid item xs={6}>
                        <Labelbox type="select"
                            placeholder={" Mode of Payment"} />
                    </Grid>
                    <Grid item xs={2} className="opeHeader">

                        <div>BILL</div>
                        <Checkbox />
                        <div><img src={UploadIcon} /></div>
                    </Grid>
                </Grid>

                <div className="opeComments">
                    
                    <Labelbox type="textarea" placeholder={"comments"} />
                </div>
                <div className="opebtn">
                    <CustomButton
                        btnName={"Save "}
                        btnCustomColor="customPrimary"
                        onBtnClick={onSubmit}
                    />
                </div>



            </div>
        </div>
    )


}
export default OpeModel;