import react, { useState } from 'react';
import './projectFormcreate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
import { useDispatch, connect } from "react-redux";
import { withWidth } from '@material-ui/core';



function ProjectFormCreate() {

    const dispatch = useDispatch()

    const [Trade_Mark, setTrade_Mark] = useState({

        process_type: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        filling_type: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,

        }

    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Trade_Mark);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Trade_Mark[targetkeys[i]].value,
                Trade_Mark[targetkeys[i]].validation
            );
            Trade_Mark[targetkeys[i]].error = !errorcheck.state;
            Trade_Mark[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Trade_Mark[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => Trade_Mark[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setTrade_Mark({ error: true });
        } else {
            // setTrade_Mark({ error: false });

            dispatch(InesertResume(Trade_Mark)).then(() => {
                handleCancel()
            })
        }

        setTrade_Mark(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "process_type", "filling_type"
        ]

        ResumeFrom_key.map((data) => {
            Trade_Mark[data].value = ""
        })
        setTrade_Mark(prevState => ({
            ...prevState,
        }));
    }



    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Trade_Mark[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Trade_Mark[key].validation
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

        setTrade_Mark(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };
    return (
        <div>
            <Grid item xs={12} className="projectFormTitle">Project Form</Grid>
            <div className="projectFormContent">

                <Grid item xs={12} container direction="row" justify="center" spacing={3}>
                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Client"}


                        />
                    </Grid>
                    <Grid item xs={5} >
                        <Labelbox type="select"
                            placeholder={"Project Name "}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Project Type "}
                            dropdown={[{ id: "1", value: "Application" }, { id: "2", value: "Rectification" }, { id: "3", value: "Cancellation" }, { id: "4", value: "Opposition" }]}
                            changeData={(data) => checkValidation(data, "process_type")}
                            value={Trade_Mark.process_type.value}
                            error={Trade_Mark.process_type.error}
                            errmsg={Trade_Mark.process_type.errmsg}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Project Sub Type "}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Process Type"}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Filling Type "}
                            dropdown={Trade_Mark.process_type.value == 1 ? [{ id: "1", value: "IndiaFilling" }, { id: "2", value: "InternationalFilling" }, { id: "3", value: "Domestic" }, { id: "4", value: "Foreign" }, { id: "5", value: "PCT" }]
                                : [{ id: "1", value: "Filed" }, { id: "2", value: "Defended" }]}
                            changeData={(data) => checkValidation(data, "filling_type")}
                            value={Trade_Mark.filling_type.value}
                            error={Trade_Mark.filling_type.error}
                            errmsg={Trade_Mark.filling_type.errmsg}



                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={" billable Type "}


                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"HOD/Attorney "}


                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Labelbox type="select"
                            placeholder={"Councel "}
                            
                        />
                    </Grid>
                   
                    <Grid item xs={5}>
                        <div className="projectTestArea">
                            <Labelbox type="textarea"
                                placeholder={"Comments"}

                            />
                        </div>
                    </Grid>




                </Grid>
               
            </div>
            <div className="customFormbtn">
                <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />

            </div>
        </div>
    )
}
export default ProjectFormCreate;