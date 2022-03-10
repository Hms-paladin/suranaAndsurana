import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Buttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import { connect, useDispatch } from 'react-redux';
import { getStageMasterSearch, InsertStageMaster, getStageMaster } from '../../actions/StageMasterAction'
import { getProjectType, getProjectSubType, getProcessType, getStageList, getSubStage } from '../../actions/MasterDropdowns';
import './StagesMaster.scss'
import { useLocation } from 'react-router-dom';
import Edit from "../../images/editable.svg";

const StagesMaster = (props) => {
  const header = [
    { id: 'project_type', label: 'Project Type' },
    { id: 'sub_project_type', label: 'Sub Project Type' },
    { id: 'process_type', label: 'Process Type' },
    { id: 'stage', label: 'Stage' },
    { id: 'sub_stage', label: 'Sub Stage' },
    { id: 'no_days', label: 'Number of Days' },
    { id: 'reminder_days', label: 'Reminder Days' },
    { id: 'edit', label: 'Edit' },
  ];
  const location = useLocation();
  const dispatch = useDispatch()
  const [StageMasterList, setStageMasterList] = useState([])
  const [projectType, setprojectType] = useState({})
  const [projectSubType, setprojectSubType] = useState({})
  const [Stage, setStage] = useState({})
  const [subStage, setsubStage] = useState({})
  const [processType, setprocessType] = useState({})
  const [disabled, setEnabled] = useState(true);
  const [SearchAdd, setSearchAdd] = useState(false);
  const [saveRights, setSaveRights] = useState([])
  const [PageLoad, setPageLoad] = useState(false)
  const [edit, setEdit] = useState(false)

  const [RateMaster, setRateMaster] = useState({
    map_stage_id: {
      value: "0",
      validation: [],
      error: null,
      errmsg: null,
    },
    project_type: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    sub_project_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    process_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    stages: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    sub_stages: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    noOfDays: {
      value: "",
      validation: [{ "name": "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    compliance: {
      value: "",
      validation: [{ "name": "required" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    process_type_search: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
      disabled: true
    },
    sub_project_type_search: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
      disabled: true
    },
    project_type_search: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
  })


  useEffect(() => {
    dispatch(getStageMaster());
    dispatch(getProjectType());
    dispatch(getStageList());
  }, []);

  /////////// 

  const onEdit = (editData) => {
    setEdit(true)
    RateMaster.noOfDays.validation[1].params = editData.no_of_compliance_days
    RateMaster.noOfDays.validation[1].params = editData.no_of_compliance_days
    setRateMaster({
      ...RateMaster,
      map_stage_id: { ...RateMaster.map_stage_id, value: editData.map_stage_id },
      process_type: { ...RateMaster.process_type, value: editData.process_id, disabled: true },
      project_type: { ...RateMaster.project_type, value: editData.project_type_id, disabled: true },
      sub_project_type: { ...RateMaster.sub_project_type, value: editData.sub_proj_type_id, disabled: true },
      sub_stages: { ...RateMaster.sub_stages, value: editData.sub_stage_id ,disabled: true},
      compliance: { ...RateMaster.compliance, value: editData.no_of_compliance_days },
      noOfDays: { ...RateMaster.noOfDays, value: editData.remainder_days },
      stages: { ...RateMaster.stage_id, value: editData.stage_id ,disabled: true},
    });
    dispatch(getProjectSubType(editData.project_type_id))
    dispatch(getSubStage(editData.stage_id))
    setEnabled(false)
    setSearchAdd(true)
  }

  useEffect(() => {
    //stageTableData
    let stageMasterListData = []
    !PageLoad && props.getStageMasterSearch.map((data) =>
      stageMasterListData.push(data)
    )
    const rateList = stageMasterListData.map((data) => {
      return (
        {
          "project_type": data.project_type,
          "sub_project_type": data.sub_project_type,
          "process_type": data.process,
          "stage": data.stage,
          "sub_stage": data.sub_stage,
          "noOfdays": data.no_of_compliance_days,
          "reminderDays": data.remainder_days,
          "edit": <img src={Edit} className="editImage" alt="edit" style={{ cursor: 'pointer' }} onClick={() => onEdit(data)} />,
        });
    });
    setStageMasterList(rateList)
    //ProjectType
    let projectTypedata = []
    props.ProjectType.map((data) =>
      projectTypedata.push({ value: data.project_type, id: data.project_type_id })
    )
    setprojectType({ projectTypedata })
    //StageList
    let projectStagedata = []
    props.StageList.map((data) =>
      projectStagedata.push({ value: data.stage, id: data.stage_id })
    )
    setStage({ projectStagedata })
  }, [props.getStageMasterSearch, props.ProjectType, props.StageList])

  useEffect(() => {
    //ProjectSubtype
    let projectSubTypedata = []
    props.ProjectSubtype.map((data) =>
      projectSubTypedata.push({ value: data.sub_project_type, id: data.sub_project_type_id })
    )
    setprojectSubType({ projectSubTypedata })
    //ProcessType
    let processTypedata = []
    props.ProcessType.map((data) =>
      processTypedata.push({ value: data.process, id: data.process_id })
    )
    setprocessType({ processTypedata })
    //SubStage
    let substagedata = []
    props.getSubStage.map((data) =>
      substagedata.push({ value: data.sub_stage, id: data.sub_stage_id })
    )
    setsubStage({ substagedata })

  }, [props.ProcessType, props.ProcessType, props.getSubStage, props.ProjectSubtype])

  const onSearch = () => {
    setPageLoad(false)
    let From_key = ["process_type_search", "sub_project_type_search", "project_type_search"]
    var mainvalue = {};
    for (var i in From_key) {
      var errorcheck = ValidationLibrary.checkValidation(
        RateMaster[From_key[i]].value,
        RateMaster[From_key[i]].validation
      );
      RateMaster[From_key[i]].error = !errorcheck.state;
      RateMaster[From_key[i]].errmsg = errorcheck.msg;
      mainvalue[From_key[i]] = RateMaster[From_key[i]].value;
    }

    let filtererr = From_key.filter(
      (obj) => RateMaster[obj].error == true
    );

    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });

    } else {
      dispatch(getStageMasterSearch(RateMaster)).then(() => {
        // handleCancel()
      });
      // setResumeFrom({ error: false });
    }
    setRateMaster(prevState => ({
      ...prevState
    }));


  };
  const onSubmit = () => {

    let From_key = ["process_type_search", "sub_project_type_search", "project_type_search"]

    From_key.map((data) => {
      RateMaster[data].validation = []
    })
    setRateMaster(prevState => ({
      ...prevState,
    }));
    if (RateMaster.project_type.value !== 1) {
      ValidationHide()
    }
    var mainvalue = {};
    var targetkeys = Object.keys(RateMaster);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        RateMaster[targetkeys[i]].value,
        RateMaster[targetkeys[i]].validation
      );
      RateMaster[targetkeys[i]].error = !errorcheck.state;
      RateMaster[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = RateMaster[targetkeys[i]].value;
    }

    let filtererr = targetkeys.filter(
      (obj) => RateMaster[obj].error == true
    );

    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });

    } else {

      dispatch(InsertStageMaster(RateMaster)).then(() => {
        handleCancel()
      });

      // setResumeFrom({ error: false });
    }
    setRateMaster(prevState => ({
      ...prevState
    }));


  };

  function checkValidation(data, key, multipleId) {
    //_____________________

    if (data === 1 && key == "project_type") {
      // ValidationHide()
      RateMaster.sub_project_type.validation.push({ name: "required" })
      RateMaster.process_type.validation.push({ name: "required" })
      dispatch(getProjectSubType(data))
      setEnabled(false)
    } else if (data !== 1 && key == "project_type") {
      ValidationHide()
      setEnabled(true)
    }

    if (data === 1 && key == "project_type_search") {
      // ValidationHide()
      RateMaster.sub_project_type_search.validation = [{ name: "required" }]
      RateMaster.process_type_search.validation = [{ name: "required" }]
      dispatch(getProjectSubType(data))
      RateMaster.sub_project_type_search.disabled = false
      RateMaster.process_type_search.disabled = false
    } else if (data !== 1 && key == "project_type_search") {
      RateMaster.sub_project_type_search.validation = []
      RateMaster.process_type_search.validation = []
      RateMaster.process_type_search.errmsg = null
      RateMaster.sub_project_type_search.errmsg = null
      RateMaster.process_type_search.error = false
      RateMaster.sub_project_type_search.error = false
      RateMaster.sub_project_type_search.disabled = true
      RateMaster.process_type_search.disabled = true
    }
    //________________________________________________________________

    if (key == "sub_project_type_search" && data) {
      //process type
      dispatch(getProcessType({
        ProjectType: RateMaster.project_type_search.value, ProjectSubtype: data
      }))
    }

    if (data === 4 && key == "sub_project_type_search") {
      RateMaster.process_type_search.value = ""
      RateMaster.process_type_search.validation = [{ name: "" }]
    }
    else if (data !== 4 && key == "sub_project_type_search") {
      RateMaster.process_type_search.value = ""
      RateMaster.process_type_search.validation = [{ name: "required" }]
    }

    if (key == "sub_project_type" && data) {
      //process type
      dispatch(getProcessType({
        ProjectType: RateMaster.project_type.value, ProjectSubtype: data
      }))
    }
    if (data === 4 && key == "sub_project_type") {
      RateMaster.process_type.value = ""
      RateMaster.process_type.validation = [{ name: "" }]
    }
    else if (data !== 4 && key == "sub_project_type") {
      RateMaster.process_type.value = ""
      RateMaster.process_type.validation = [{ name: "required" }]
    }
    //________________________________________________________________
    if (key === "stages" && data) {
      // RateMaster.sub_stages.validation.push(({name:"required"}))
      dispatch(getSubStage(data))
      // setStageEnabled(false)
    } else if (data !== 1 && key == "project_type") {
      // setStageEnabled(true) 
    }

    if (data && key === "noOfDays") {
      RateMaster[key].validation[1].params = RateMaster.compliance.value
    }
    if (key === "sub_stages") {
      RateMaster.sub_stages.validation = []
    }
    if (key === "sub_project_type") {
      RateMaster.sub_project_type.validation = []
      // RateMaster.process_type.validation=[]
    }
    if (key === "process_type") {
      RateMaster.process_type.validation = []
    }
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      RateMaster[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: RateMaster[key].validation
    }
    setRateMaster(prevState => ({
      ...prevState,
      [key]: dynObj,

    }));

  }
  const handleCancel = () => {
    let From_key = ["project_type", "sub_project_type", "process_type", "stages", "sub_stages", "noOfDays", "compliance","map_stage_id"]
    setEnabled(true)
    From_key.map((data) => {
      RateMaster[data].value = "";
      RateMaster[data].disabled = false;
    })
    setRateMaster(prevState => ({
      ...prevState,
    }));
    setSearchAdd(false)
    setStageMasterList([])

    let From_key_validate = ["process_type_search", "sub_project_type_search", "project_type_search"]

    From_key_validate.map((data) => {
      RateMaster[data].validation = [{ "name": "required" }]
    })
    setEdit(false)
    dispatch(getStageMasterSearch(RateMaster))
  }
  const ValidationHide = () => {
    let From_key = ["sub_project_type", "process_type", "sub_stages", "process_type_search", "sub_project_type_search", "project_type_search"]

    From_key.map((data) => {
      RateMaster[data].validation = []
    })
    setRateMaster(prevState => ({
      ...prevState,
    }));
    
  }

  ///*****user permission**********/
  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "Stage Template - Save" == val.control
        )
      })
      setSaveRights(data_res_id)
    }

  }, [props.UserPermission]);

  useEffect(() => {
    setPageLoad(true)
  }, [location]);
  /////////////

  return (
    <div>
      <div className="var_rate_master">Stage Template</div>

      {!SearchAdd && <>
        <Grid item xs={12} container spacing={2} direction={"rows"}>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="select" placeholder={"Project Type"}
              dropdown={projectType.projectTypedata}
              changeData={(data) => checkValidation(data, "project_type_search")}
              value={RateMaster.project_type_search.value}
              error={RateMaster.project_type_search.error}
              errmsg={RateMaster.project_type_search.errmsg}
            />
          </Grid>
          <Grid item xs={4} spacing={2}>
            <Labelbox type="select" placeholder={"Sub Project Type"}
              dropdown={projectSubType.projectSubTypedata}
              changeData={(data) => checkValidation(data, "sub_project_type_search")}
              value={RateMaster.sub_project_type_search.value}
              error={RateMaster.sub_project_type_search.error}
              errmsg={RateMaster.sub_project_type_search.errmsg}
              disabled={RateMaster.sub_project_type_search.disabled}
            />
          </Grid>
          <Grid item xs={4} spacing={2}>
            <Labelbox type="select" placeholder={"Process Type"}
              dropdown={processType.processTypedata}
              changeData={(data) => checkValidation(data, "process_type_search")}
              value={RateMaster.process_type_search.value}
              error={RateMaster.process_type_search.error}
              errmsg={RateMaster.process_type_search.errmsg}
              disabled={RateMaster.process_type_search.disabled}
            />

          </Grid>
        </Grid>
      </>
      }
      <Grid container spacing={2} >

        {SearchAdd && <>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="select" placeholder={"Project Type"}
              dropdown={projectType.projectTypedata}
              changeData={(data) => checkValidation(data, "project_type")}
              value={RateMaster.project_type.value}
              error={RateMaster.project_type.error}
              errmsg={RateMaster.project_type.errmsg}
              disabled={RateMaster.project_type?.disabled}
            />
          </Grid>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="select" placeholder={"Sub Project Type"}
              disabled={disabled||RateMaster.sub_project_type?.disabled}
              dropdown={projectSubType.projectSubTypedata}
              changeData={(data) => checkValidation(data, "sub_project_type")}
              value={RateMaster.sub_project_type.value}
              error={RateMaster.sub_project_type.error}
              errmsg={RateMaster.sub_project_type.errmsg}
            />
          </Grid>
          <Grid item xs={4} spacing={2}>
            <Labelbox type="select" placeholder={"Process Type"}
              dropdown={processType.processTypedata}
              disabled={disabled||RateMaster.process_type?.disabled}
              changeData={(data) => checkValidation(data, "process_type")}
              value={RateMaster.process_type.value}
              error={RateMaster.process_type.error}
              errmsg={RateMaster.process_type.errmsg}
            />
          </Grid>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="select" placeholder={"Stage"}
              dropdown={Stage.projectStagedata}
              changeData={(data) => checkValidation(data, "stages")}
              value={RateMaster.stages.value}
              error={RateMaster.stages.error}
              errmsg={RateMaster.stages.errmsg}
              disabled={RateMaster.stages?.disabled}
            />
          </Grid>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="select" placeholder={"Sub Stage"}
              changeData={(data) => checkValidation(data, "sub_stages")}
              dropdown={subStage.substagedata}
              value={RateMaster.sub_stages.value}
              error={RateMaster.sub_stages.error}
              errmsg={RateMaster.sub_stages.errmsg}
              disabled={RateMaster.sub_stages?.disabled}
            />
          </Grid>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="text" placeholder={"Reminder Days"}
              changeData={(data) => checkValidation(data, "noOfDays")}
              value={RateMaster.noOfDays.value}
              error={RateMaster.noOfDays.error}
              errmsg={RateMaster.noOfDays.errmsg}

            />
          </Grid>
          <Grid item xs={4} spacing={2} >
            <Labelbox type="text" placeholder={"Number of Days"}
              changeData={(data) => checkValidation(data, "compliance")}
              value={RateMaster.compliance.value}
              error={RateMaster.compliance.error}
              errmsg={RateMaster.compliance.errmsg}
            />
          </Grid>
        </>
        }

        <Grid item xs={10} spacing={4} alignItems={"flex-end"}>
          {!SearchAdd && <><CustomButton btnName={"Search"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSearch} />
            <CustomButton btnName={"Add"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={() => setSearchAdd(true)} />
          </>}

          {SearchAdd && <><CustomButton btnName={edit ? "Update" : "Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} onBtnClick={onSubmit} />
            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} /></>}
        </Grid>
      </Grid>
      {!SearchAdd && <div className="rate_enhanced_table">
        <EnhancedTable headCells={header}
          rows={StageMasterList}
        />
      </div>}
    </div>
  )
}


const mapStateToProps = (state) => ({
  getTableData: state.StageMasterReducer.getStageMaster || [],
  getStageMasterSearch: state.StageMasterReducer.getStageMasterSearch || [],
  ProjectType: state.getOptions.getProjectType || [],
  StageList: state.getOptions.getStageList || [],
  ProcessType: state.getOptions.getProcessType || [],
  ProjectSubtype: state.getOptions.getProjectSubType || [],
  getSubStage: state.getOptions.getSubStage || [],
  UserPermission: state.UserPermissionReducer.getUserPermission,
});

export default connect(mapStateToProps)(StagesMaster);