import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import './StagesMaster.scss'
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import Axios from 'axios';
import { notification } from 'antd';
import { apiurl } from "../../utils/baseUrl";
import moment from 'moment'
import { connect, useDispatch } from 'react-redux';
import { getSubStage } from '../../actions/MasterDropdowns';
const StagesMaster = (props) => {
  const header = [
    // { id: 'table_name', label: 'Table Name' },
    { id: 'project_type', label: 'Project Type' },
    { id: 'sub_project_type', label: 'Sub Project Type' },
    { id: 'process_type', label: 'Process Type' },
    { id: 'stage', label: 'Stage' },
    { id: 'sub_stage', label: 'Sub Stage' },
    { id: 'no_days', label: 'Number of Days' },
    { id: 'remainder_days', label: 'Remainder Days' },
  ];

  // const rows = [
  //    {table_name:"Table 1",project_type:"project 1",sub_project_type:"sub Project1",process_type:"Type1",stage:"Stage 1",sub_stage:"Substage1",no_days:"Number"}

  // ];
  /*
  get_table_names
get_project_type
get_project_sub_type
get_stage_list
get_sub_stage setsubStage
insert_stage_master
*/
  const dispatch = useDispatch()
  const [StageMasterList, setStageMasterList] = useState([])
  const [projectType, setprojectType] = useState({})
  const [projectSubType, setprojectSubType] = useState({})
  const [Stage, setStage] = useState({})
  const [subStage, setsubStage] = useState({})
  const [processType, setprocessType] = useState({})
  const [projectTableName, setprojectTableName] = useState({})
  const [disabled, setEnabled] = useState(true);
  const [stageDisable, setStageEnabled] = useState(true);
  const [RateMaster, setRateMaster] = useState({
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
      validation: [{ "name": "required" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    compliance: {
      value: "",
      validation: [{ "name": "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
  })
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {

    if (isLoaded) {
      Axios({
        method: "GET",
        url: apiurl + 'get_stage_master',
      })
        .then((response) => {
          let stageMasterListData = []
          response.data.data.map((data) =>
            stageMasterListData.push(data)

          )
          var rateList = [];

          for (var m = 0; m < stageMasterListData.length; m++) {
            var listarray = {
              "project_type": stageMasterListData[m].project_type,
              "sub_project_type": stageMasterListData[m].sub_project_type,
              "process_type": stageMasterListData[m].process,
              "stage": stageMasterListData[m].stage,
              "sub_stage": stageMasterListData[m].sub_stage,
              "noOfdays": stageMasterListData[m].no_of_compliance_days,
              "reminderDays": stageMasterListData[m].remainder_days,
            }
            rateList.push(listarray);
          }
          setStageMasterList({ rateList })
        })

      // project type
      Axios({
        method: "GET",
        url: apiurl + 'get_project_type',
      })
        .then((response) => {
          let projectTypedata = []
          response.data.data.map((data) =>
            projectTypedata.push({ value: data.project_type, id: data.project_type_id })
          )
          setprojectType({ projectTypedata })
        })

      // Stage
      Axios({
        method: "GET",
        url: apiurl + 'get_stage_list',
      })
        .then((response) => {
          let projectStagedata = []
          response.data.data.map((data) =>
            projectStagedata.push({ value: data.stage, id: data.stage_id })
          )
          setStage({ projectStagedata })
        })


      // Table Name
      Axios({
        method: "GET",
        url: apiurl + 'get_table_names',
      })
        .then((response) => {
          let projectTableNamedata = []
          response.data.data.map((data) =>
            projectTableNamedata.push({ value: data.table_names, id: data.table_id })
          )
          setprojectTableName({ projectTableNamedata })
        })
      setIsLoaded(false);
    }

  })


  const onSubmit = () => {
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
    Axios({
      method: "POST",
      url: apiurl + 'insert_stage_master',
      data: {
        // "project_id":RateMaster.table_name.value,
        "project_type_id": RateMaster.project_type.value,
        "process_id": RateMaster.process_type.value || 0,
        "sub_project_id": RateMaster.sub_project_type.value || 0,
        "stage_id": RateMaster.stages.value,
        "sub_stage_id": RateMaster.sub_stages.value || 0,
        "no_of_compliance_days": RateMaster.compliance.value,
        "remainder_days": RateMaster.noOfDays.value,
        "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
        "created_by": localStorage.getItem("empId"),
        "updated_by": localStorage.getItem("empId"),
      }

    })
      .then((response) => {
        if (response.data.status === 1) {

          getstageMaster();
          notification.success({
            message: 'Stage Master Updated Successfully',
          });
          handleCancel();
          return Promise.resolve();
        }
      })
    var filtererr = targetkeys.filter(
      (obj) => RateMaster[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });

    } else {
      // setResumeFrom({ error: false });

    }
    setRateMaster(prevState => ({
      ...prevState
    }));


  };

  const getstageMaster = () => {
    Axios({
      method: "GET",
      url: apiurl + 'get_stage_master',
    })
      .then((response) => {
        let stageMasterListData = []
        response.data.data.map((data) =>
          stageMasterListData.push(data)

        )
        var rateList = [];
        for (var m = 0; m < stageMasterListData.length; m++) {
          var listarray = {
            //"table_names" : stageMasterListData[m].project_name,
            "project_type": stageMasterListData[m].project_type,
            "sub_project_type": stageMasterListData[m].sub_project_type,
            "process_type": stageMasterListData[m].process,
            "stage": stageMasterListData[m].stage,
            "sub_stage": stageMasterListData[m].sub_stage,
            "noOfdays": stageMasterListData[m].no_of_compliance_days,
            "reminderDays": stageMasterListData[m].remainder_days,
          }
          rateList.push(listarray);
        }
        setStageMasterList({ rateList })
      })
  }

  function checkValidation(data, key, multipleId) {
    if (data === 1 && key == "project_type") {
      setEnabled(false)
    } else if (data !== 1 && key == "project_type") { setEnabled(true) }

    if (key === "stages" && data) {

      dispatch(getSubStage(data))
      setStageEnabled(false)
    } else if (data !== 1 && key == "project_type") { setStageEnabled(true) }

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
    let multipleIdList = []

    // no.of Days Validation==>

    if (data && key == "compliance") {
      RateMaster[key].validation[1].params = RateMaster.noOfDays.value
    }


    if (key == "project_type") {

      // Sub project type
      Axios({
        method: "POST",
        url: apiurl + 'get_project_sub_type',
        data: {
          "project_type_id": data
        }
      })
        .then((response) => {
          let projectSubTypedata = []
          response.data.data.map((data) =>
            projectSubTypedata.push({ value: data.sub_project_type, id: data.sub_project_type_id })
          )
          setprojectSubType({ projectSubTypedata })
        })
    }
    else if (key == "sub_project_type") {
      //process type
      Axios({
        method: "POST",
        url: apiurl + 'get_process_type',
        data: {
          "project_type_id": RateMaster.project_type.value,
          "sub_project_type_id": data
        }
      })
        .then((response) => {
          let processTypedata = []
          response.data.data.map((data) =>
            processTypedata.push({ value: data.process, id: data.process_id })
          )
          setprocessType({ processTypedata })
        })

    }



    setRateMaster(prevState => ({
      ...prevState,
      [key]: dynObj,

    }));
  }
  const handleCancel = () => {
    let From_key = ["project_type", "sub_project_type", "process_type", "stages", "sub_stages", "noOfDays", "compliance"]
    setStageEnabled(true)
    setEnabled(true)
    From_key.map((data) => {
      RateMaster[data].value = ""
    })
    setRateMaster(prevState => ({
      ...prevState,
    }));
  }
  useEffect(() => {
    let substagedata = []
    props.getSubStage.map((data) =>
      substagedata.push({ value: data.sub_stage, id: data.sub_stage_id })
    )
    setsubStage({ substagedata })

  }, [props.getSubStage])


  return (
    <div>
      <Grid container spacing={3} className="stage_firstgrid">
        <Grid item xs={5} spacing={4} direction={"column"}>
        </Grid>
        <Grid item xs={5} spacing={2}>
        </Grid>
        <Grid item xs={4} spacing={4} direction={"column"}>
          <Labelbox type="select" placeholder={"Project Type"}
            dropdown={projectType.projectTypedata}
            changeData={(data) => checkValidation(data, "project_type")}
            value={RateMaster.project_type.value}
            error={RateMaster.project_type.error}
            errmsg={RateMaster.project_type.errmsg}
          />
          <Labelbox type="select" placeholder={"Stage"}

            dropdown={Stage.projectStagedata}
            changeData={(data) => checkValidation(data, "stages")}
            value={RateMaster.stages.value}
            error={RateMaster.stages.error}
            errmsg={RateMaster.stages.errmsg}
          />
          <Labelbox type="text" placeholder={"Remainder Days"}
            changeData={(data) => checkValidation(data, "compliance")}
            value={RateMaster.compliance.value}
            error={RateMaster.compliance.error}
            errmsg={RateMaster.compliance.errmsg}
          />
        </Grid>
        <Grid item xs={4} spacing={2}>
          <Labelbox type="select" placeholder={"Sub Project Type"}
            disabled={disabled}
            dropdown={projectSubType.projectSubTypedata}
            changeData={(data) => checkValidation(data, "sub_project_type")}
            value={RateMaster.sub_project_type.value}
            error={RateMaster.sub_project_type.error}
            errmsg={RateMaster.sub_project_type.errmsg}
          />
          <Labelbox type="select" placeholder={"Sub Stage"}
            disabled={stageDisable}
            changeData={(data) => checkValidation(data, "sub_stages")}
            dropdown={subStage.substagedata}
            value={RateMaster.sub_stages.value}
            error={RateMaster.sub_stages.error}
            errmsg={RateMaster.sub_stages.errmsg}
          />
        </Grid>

        <Grid item xs={4} spacing={2}>
          <Labelbox type="select" placeholder={"Process Type"}
            dropdown={processType.processTypedata}
            disabled={disabled}
            changeData={(data) => checkValidation(data, "process_type")}
            value={RateMaster.process_type.value}
            error={RateMaster.process_type.error}
            errmsg={RateMaster.process_type.errmsg}
          />
          <Labelbox type="text" placeholder={"Number of Days"}
            changeData={(data) => checkValidation(data, "noOfDays")}
            value={RateMaster.noOfDays.value}
            error={RateMaster.noOfDays.error}
            errmsg={RateMaster.noOfDays.errmsg}
          />
        </Grid>
        {/* <Grid  item xs={4} spacing={2}>
        
          </Grid>   */}
        <Grid item xs={10} spacing={4} alignItems={"flex-end"}>
          <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit} />
          <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
        </Grid>
      </Grid>
      <div className="rate_enhanced_table">
        <EnhancedTable headCells={header}
          rows={StageMasterList.length == 0 ? StageMasterList : StageMasterList.rateList} />
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  getSubStage: state.getOptions.getSubStage || [],
});

export default connect(mapStateToProps)(StagesMaster);