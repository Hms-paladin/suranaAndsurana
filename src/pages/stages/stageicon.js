import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import AddIcon from '../../images/addIcon.svg';
import { connect, useDispatch } from "react-redux";
import { getStagesByProjectId, getSubStages, insertStages, getProjectStageList } from "../../actions/projectTaskAction";
import ValidationLibrary from "../../helpers/validationfunction";
import moment from 'moment';
import { getStageMonitor } from "../../actions/StageMonotorrAction";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";
import './stagesicon.scss';


function Stages(props) {
    const dispatch = useDispatch();
    const [stageForm, setstageForm] = useState({
        stages: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        subStages: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        }
    });
    const [stages, setstages] = useState({});
    const [substages, setsubstages] = useState({})
    const [stageItem, setStageItem] = useState([])
    const [subStageItem, setSubStageItem] = useState([])
    const [Litigation, setLitigation] = useState(false)
    let { rowId } = useParams();

    useEffect(() => {
        dispatch(getProjectDetails(rowId))
        dispatch(getStageMonitor(props.ProjectDetails))
    }, []);

    useEffect(() => {
        if (props.projectDetails && props.projectDetails.length > 0) {
            if (props.projectDetails[0].project_type_id === 6) {
                setLitigation(true)
            } else {
                setLitigation(false)
            }
            dispatch(getStagesByProjectId(props.projectDetails[0].project_id, props.projectDetails[0].project_type_id, props.projectDetails[0].sub_project_id));
            dispatch(getProjectStageList(props.projectDetails[0].project_type_id, props.projectDetails[0].sub_project_id, props.projectDetails[0].process_id))
        }
    }, [props.projectDetails]);

    useEffect(() => {

        let stagesData = []
        props.stagesList.map((data) =>
            stagesData.push({
                value: data.stage,
                id: data.stage_id
            })
        )

        setstages({ stagesData })

    }, [props.stagesList]);


    useEffect(() => {
        let SubstagesData = []

        props.subStagesList.map((data) =>
            SubstagesData.push({
                value: data.sub_stage,
                id: data.sub_stage_id
            })
        )

        setsubstages({ SubstagesData })

    }, [props.subStagesList])


    function checkValidation(data, key) {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            stageForm[key].validation
        );

        if (key === "stages") {
            dispatch(getSubStages(data));
        }

        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: stageForm[key].validation
        }
        setstageForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(stageForm);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                stageForm[targetkeys[i]].value,
                stageForm[targetkeys[i]].validation
            );
            stageForm[targetkeys[i]].error = !errorcheck.state;
            stageForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = stageForm[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter(
            (obj) => stageForm[obj].error == true
        );
        if (filtererr.length > 0) {
        } else {
            let params = {
                "project_id": props.projectDetails[0].project_id,
                "project_type_id": props.projectDetails[0].project_type_id,
                "sub_project_id": props.projectDetails[0].sub_project_id,
                "stage_id": stageForm.stages.value,
                "sub_stage_id": stageForm.subStages.value,
                "created_by": localStorage.getItem("empId"),
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_by": localStorage.getItem("empId"),
            }
            dispatch(insertStages(params, props.projectDetails[0].project_id, props.projectDetails[0].project_type_id, props.projectDetails[0].sub_project_id)).then(() => {
                handleCancel();
                // dispatch(getStageMonitor(props.ProjectDetails))
            })
        }

        setstageForm((prevState) => ({
            ...prevState,
        }));
    }

    const handleCancel = () => {
        let Stages_key = [
            "stages",
            "subStages"
        ];

        Stages_key.map((data) => {
            stageForm[data].value = "";
        });
        setstageForm((prevState) => ({
            ...prevState,
        }));
    };

    useEffect(() => {
        let stageArrItem = []
        let subStageArrItem = []

        props.getAllStages.map((data) => {
            stageArrItem.push(data.stage)
            subStageArrItem.push(data.sub_stage)
        })

        setStageItem(stageArrItem)
        setSubStageItem(subStageArrItem)

    }, [props.getAllStages])

    return (
        <div>
            <Grid>
                <div className="StagesTitle">{Litigation ? 'Case Types' : 'Stages'}</div>
            </Grid>
            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={5}>
                    <Labelbox type="select"
                        placeholder={Litigation ? 'Case Type' : 'Stage'}
                        dropdown={stages.stagesData}
                        changeData={(data) => checkValidation(data, "stages")}
                        value={stageForm.stages.value} />

                </Grid>
                <Grid item xs={5}>
                    <Labelbox type="select"
                        placeholder={Litigation ? 'Sub Case Types' : 'Sub Stages'}
                        dropdown={substages.SubstagesData}
                        changeData={(data) => checkValidation(data, "subStages")}
                        value={stageForm.subStages.value} />
                </Grid>
                <Grid item xs={2}>
                    <img src={AddIcon} onClick={onSubmit} />
                </Grid>
            </Grid>

            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={4}>
                    <div className="stageHeading" >{Litigation ? 'Case Types' : 'Stages'}</div>
                    {stageItem.map((data) => {
                        return <div >{data}</div>
                    })}
                </Grid>

                <Grid item xs={4}>
                    <div className="stageHeading"> Sub {Litigation ? 'Case Types' : 'Stages'}</div>
                    {subStageItem.map((data) => {
                        return <div >{!data ? '-' : data}</div>
                    })}
                </Grid>

                <Grid item xs={2}>
                    <div className="stageHeading"> No of Days</div>
                    {props.getAllStages.length > 0 && props.getAllStages.map((data) => {
                        return <div >{data.no_of_compliance_days}</div>
                    })}
                </Grid>

                <Grid item xs={2}>
                    <div className="stageHeading"> Reminder Days</div>
                    {props.getAllStages.length > 0 && props.getAllStages.map((data) => {
                        return <div >{data.remainder_days}</div>
                    })}
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = (state) => ({
    stagesList: state.projectTasksReducer.getProjectStageList || [],
    subStagesList: state.projectTasksReducer.SubStagesList || [],
    getAllStages: state.projectTasksReducer.getAllStage || [],
    stageList: state.StageMonotorReducer.getStageMonitor || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(Stages);