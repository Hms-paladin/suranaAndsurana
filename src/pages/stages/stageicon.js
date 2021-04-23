import react, { useState, useEffect } from 'react';
import './stagesicon.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from '../../component/Butttons/button';
import { getProjectDetails } from "../../actions/ProjectFillingFinalAction";  
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getStagesByProjectId,getSubStages,insertStages } from "../../actions/projectTaskAction";
import ValidationLibrary from "../../helpers/validationfunction";
import Axios from "axios";
import moment from 'moment'
function Stages(props) {
    const dispatch = useDispatch();
    const [stages, setstages] = useState({});
    const [substages, setsubstages] = useState({})
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})

    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
        dispatch(getStagesByProjectId(props.ProjectDetails[0].project_id,props.ProjectDetails[0].project_type_id));
       // dispatch(getSubStages(stageId));
        
        
        
      }, []);

    useEffect(() => {
        setProjectDetails(props.ProjectDetails);
        props.ProjectDetails.length > 0 && setidDetails({
            project_id:props.ProjectDetails[0].project_id,
            client_id:props.ProjectDetails[0].client_id,
        })

        let stagesData = []
        let SubstagesData = []
        props.stagesList.map((data) =>
        stagesData.push({ value: data.stage,
        id: data.stage_id })
    )

    props.stagesList.map((data) =>
        
        SubstagesData.push({ value: data.sub_stage,
            id: data.sub_stage_id })
    )
    setstages({ stagesData })
    setsubstages({ SubstagesData })

}, [props.ProjectDetails,
    props.stagesList
  ]);
  const [stageForm, setstageForm] = useState({
    stages: {
      value: "",
      //validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }, 
    subStages: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }
});

    const [addRows, setAddRows] = useState([])


    function Addbox() {
        setAddRows([...addRows, <Grid item xs={9} container direction="row" spacing={2}>
            <Grid item xs={5}>
                <Labelbox type="select"
                placeholder="Stage"
                dropdown={stages.stagesData}
    changeData={(data) => checkValidation(data, "stages")}
                
                value={stageForm.stages.value} />
            </Grid>
            <Grid item xs={5}>
                <Labelbox type="select"
                dropdown={substages.SubstagesData}
                changeData={(data) => checkValidation(data, "subStages")} 
                value={stageForm.subStages.value}  />
            </Grid>
         

        </Grid>])


    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            stageForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: stageForm[key].validation
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

        setstageForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    function onSubmit() {
        let params ={
            "project_id":props.ProjectDetails[0].project_id,
            "project_type_id":props.ProjectDetails[0].project_type_id,
            "sub_project_id":props.ProjectDetails[0].sub_project_id,
            "stage_id":stageForm.stages.value,
            "sub_stage_id":stageForm.subStages.value,
            "created_by" :localStorage.getItem("empId"),
            "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
            "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
            "updated_by" :localStorage.getItem("empId"),
            }

            dispatch(insertStages(params)).then(() => {
                //handleCancel()
            })
       
    };



    return (
        <div>
            <Grid>

                <div className="StagesTitle">Stages</div>



            </Grid>


            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={5}>
                    <Labelbox type="select"
                        placeholder="Stage"
                        dropdown={stages.stagesData}
            changeData={(data) => checkValidation(data, "stages")}
                        
                        value={stageForm.stages.value} />

                </Grid>
                <Grid item xs={5}>
                    <Labelbox type="select" placeholder="Sub Stage"
                    dropdown={substages.SubstagesData}
                    changeData={(data) => checkValidation(data, "subStages")} 
                    value={stageForm.subStages.value} />
                </Grid>
                <Grid item xs={2}>
                    <img src={AddIcon} onClick={() => Addbox()} />
                </Grid>
            </Grid>

            {addRows}

            <Grid item xs={9} container direction="row" spacing={2}>
                <Grid item xs={5}>
                    <div className="stageHeading" >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>
                    <div >Stages</div>

                </Grid>
                <Grid item xs={5}>
                    <div className="stageHeading"> Sub Stages</div>
                    <div > Sub Stages</div>
                    <div >Sub Stages</div>
                    <div >Sub Stages</div>
                    <div >Sub Stages</div>

                </Grid>

            </Grid>
            <div className="stagebtn">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="custom_save" />
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    
    stagesList: state.projectTasksReducer.stagesList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(Stages);