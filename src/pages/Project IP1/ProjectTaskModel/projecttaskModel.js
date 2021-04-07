import react, { useState } from 'react';
import './projectModel.scss';
import Labelbox from "../../../helpers/labelbox/labelbox";
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Butttons/button';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";




function ProjectTaskModel() {

    const dispatch = useDispatch()
    const [ProjectTask_Model, setResumeFrom] = useState({

        startdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        enddate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        description: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },




    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(ProjectTask_Model);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ProjectTask_Model[targetkeys[i]].value,
                ProjectTask_Model[targetkeys[i]].validation
            );
            ProjectTask_Model[targetkeys[i]].error = !errorcheck.state;
            ProjectTask_Model[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ProjectTask_Model[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => ProjectTask_Model[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });

            dispatch(InesertResume(ProjectTask_Model)).then(() => {
                handleCancel()
            })
        }

        setResumeFrom(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "startdate", "enddate", "description"
        ]

        ResumeFrom_key.map((data) => {
            ProjectTask_Model[data].value = ""
        })
        setResumeFrom(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ProjectTask_Model[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ProjectTask_Model[key].validation
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
        <div className="projectTaskModel">

            <Grid item xs={12} container direction="row" justify="center" alignItems="center" spacing={1} className="projectTasktitle">
                <Grid item xs={4} container justify="center" alignItems="center"> IP Project</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Project Name</Grid>
                <Grid item xs={4} container justify="center" alignItems="center">Johnson & Johnson</Grid>

            </Grid>

            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                        placeholder={"Activity"} />
                </Grid>
            </div>
            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                        placeholder={"Sub Activity"} />
                </Grid>
            </div>
            <div className="activityTask">
                <Grid item xs={7} >
                    <Labelbox type="select"
                        placeholder={"Location"} />
                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker"
                            placeholder={"Start Date"}
                            changeData={(data) => checkValidation(data, "startdate")}
                            value={ProjectTask_Model.startdate.value}
                            error={ProjectTask_Model.startdate.error}
                            errmsg={ProjectTask_Model.startdate.errmsg}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="datepicker"
                            placeholder={" End Date"}
                            changeData={(data) => checkValidation(data, "enddate")}
                            value={ProjectTask_Model.enddate.value}
                            error={ProjectTask_Model.enddate.error}
                            errmsg={ProjectTask_Model.enddate.errmsg}

                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Labelbox type="select"
                            placeholder={"Assign To"} />
                    </Grid>

                </Grid>
            </div>
            <div className="projectTaskDatealign">
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <div className="projectTaskCmd">
                            <Labelbox type="textarea"
                                placeholder={"Description"}
                                changeData={(data) => checkValidation(data, "description")}
                                value={ProjectTask_Model.description.value}
                                error={ProjectTask_Model.description.error}
                                errmsg={ProjectTask_Model.description.errmsg} />
                        </div>
                    </Grid>

                    <Grid item xs={5} >
                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Tag"} />
                        </Grid>

                        <Grid item xs={12} >
                            <Labelbox type="select"
                                placeholder={"Priority"} />
                        </Grid>

                    </Grid>
                </Grid>
            </div>
            <div className="projectTaskModelButtons">
                <CustomButton btnName={"CANCEL"} custombtnCSS={"projectTaskGo"} />
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"projectTaskGo"} onBtnClick={onSubmit} />

            </div>



        </div>
    )
}

export default ProjectTaskModel;