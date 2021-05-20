import react, { useEffect, useState } from "react";
import "./projectFormcreate.scss";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import Axios from "axios";
import ValidationLibrary from "../../../helpers/validationfunction";
import { apiurl } from "../../../utils/baseUrl";
import { Redirect, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import DynModel from "../../../component/Model/model";
import {
  getProjectSubType,
  getProcessType,
  getFilingType,
  getEmployeeList,
  getProjectCostRange,
  getClientlist,
} from "../../../actions/MasterDropdowns";
import VariableRate from "../../stages/RateMaster";
import EnhancedTable from "../../../component/DynTable/table";
import AddVarData from "../../../images/addvardata.svg";
import SuccessIcon from "../../../images/successicon.svg";
import { InsertIpProject } from "../../../actions/ProjectformAction";
import PlusIcon from "../../../images/plusIcon.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import { SearchVariableRate } from "../../../actions/VariableRateMaster"
// Table Data ==>

const header = [
  { id: "designation", label: "Designation" },
  { id: "activity", label: "Activity" },
  { id: "sub_activity", label: "Sub Activity" },
  { id: "court", label: "Court" },
  { id: "range", label: "Range of Project cost" },
  { id: "lower_limit", label: "Lower Limit" },
  { id: "upper_limit", label: "Upper Limit" },
  { id: "amount", label: "Amount" },
  { id: "unit", label: "Unit of Measurement" },
  { id: "add", label: "Add" },
];
const headers = [
  { id: "designation", label: "Designation" },
  { id: "activity", label: "Activity" },
  { id: "sub_activity", label: "Sub Activity" },
  { id: "court", label: "Court" },
  { id: "range", label: "Range of Project cost" },
  { id: "lower_limit", label: "Lower Limit" },
  { id: "upper_limit", label: "Upper Limit" },
  { id: "amount", label: "Amount" },
  { id: "unit", label: "Unit of Measurement" },
  { id: "del", label: "Delete" },
];

function ProjectFormCreate(props) {
  const dispatch = useDispatch();
  const [pathname, setpathname] = useState(window.location.pathname);
  const [ProjectType, setProjectType] = useState({});
  const [ProcessType, setProcessType] = useState({});
  const [SubType_Project, setSubType_Project] = useState({});
  const [BillableType, setBillableType] = useState({});
  const [projectUnit, setprojectUnit] = useState({});
  const [variableid, setVariableid] = useState(false);
  const [successmodel, setSuccessmodel] = useState(false);
  const [searchdata, setSearchdata] = useState();
  const [addsearchdata, setAddsearchdata] = useState();
  const [filingType, setFilingType] = useState({});
  const [employeeList, setEmployeeList] = useState({});
  const [projectCostRange, setProjectCostRange] = useState({});
  const [client, setClient] = useState({});
  const [addTableData, setAddTableData] = useState();
  const [showVariableTable, setShowVariableTable] = useState([]);
  const [sendVariableData, setSendVariableData] = useState([]);
  const [varRatePlusIcon, setVarRatePlusIcon] = useState(false);
  const [disableCondition, setDisableCondition] = useState(true);
  const [projectSearchCreate, setPrpjectSearchCreate] = useState({});
  const [proj_type_name, setProj_type_name] = useState();
  const [activityid, setActivityid] = useState();
  const [notfoundmodel, setNotfoundmodel] = useState(false);
  const [projectform, setprojectform] = useState({
    client: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    project_type: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    projectname: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    //IP
    project_Subtype: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    process_type: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    filing_type: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    hod_attorny: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    employeelist: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    billable_type: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    unit_measurement: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    projectcostrange: {
      value: "",
      validation: [{ name: "required" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    comments: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    baseRate: {
      value: "",
      validation: [{ name: "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    limits: {
      value: "",
      validation: [{ "name": "required" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
    additionalRate: {
      value: "",
      validation: [{ "name": "required" }, { "name": "allowNumaricOnly1" }],
      error: null,
      errmsg: null,
    },
  });

  useEffect(() => {
    Axios({
      method: "GET",
      url: apiurl + "get_project_type",
    }).then((response) => {
      // SubType_Project_Api()
      console.log(response.data.data, " response.data.data");
      let projectTypedata = [];
      response.data.data.map((data) =>
        projectTypedata.push({
          value: data.project_type,
          id: data.project_type_id,
        })
      );
      setProjectType({ projectTypedata });
      console.log({ projectTypedata }, " {projectTypedata}");
    });

    // billable type
    Axios({
      method: "GET",
      url: apiurl + "get_billable_type",
    }).then((response) => {
      console.log("response", response);
      let BillableData = [];
      response.data.data.map((data) =>
        BillableData.push({
          id: data.billable_type_id,
          value: data.billable_type,
        })
      );
      setBillableType({ BillableData });
    });

    // Unit of Measurement
    Axios({
      method: "GET",
      url: apiurl + "get_unit_of_measure",
    }).then((response) => {
      let projectUnitdata = [];
      response.data.data.map((data) =>
        projectUnitdata.push({ value: data.unit, id: data.unit_id })
      );
      setprojectUnit({ projectUnitdata });
    });

    //
  }, []);

  useEffect(() => {
    dispatch(getEmployeeList());
    dispatch(getProjectCostRange());
    dispatch(getClientlist());
  }, []);

  const onchangeAmount = (data, key) => {
    console.log(parseInt(data), key, "onchangeAmount")
    // if (key === "amountSearch" && data) {
    setPrpjectSearchCreate((prevState) => ({
      ...prevState,
      [key]: data,
    }));
    setDisableCondition(false)
    // }
  };


  function checkValidation(data, key, multipleId) {
    console.log(data, "test")

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      projectform[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: projectform[key].validation,
    };

    console.log(key, data, "key")

    if (data === 1 && key === "project_type") {

      let IP_project_key = [
        "client",
        "project_type",
        "project_Subtype",
        "billable_type",
        "process_type",
        "filing_type",
        "employeelist",
        "hod_attorny",
        "projectcostrange",
        "projectname",
        "process_type",
        "comments",

      ];

      IP_project_key.map((data) => {
        if (data === "projectcostrange") {
          projectform[data].validation = ([{ name: "required" }, { "name": "allowNumaricOnly1" }])
        } else {
          projectform[data].validation = ([{ name: "required" }])
        }
      });
      // hideValidation(["employeelist", "hod_attorny", "comments", "projectcostrange"])
    }

    if (data === 2 || data === 3 || data === 4 || data === 5 && key === "project_type") {

      let Other_key = [
        "projectname",
        "client",
        "project_type",
        "billable_type",
        "employeelist",
        "hod_attorny",
        "projectcostrange",
        "comments",
      ];

      Other_key.map((data) => {
        if (data === "projectcostrange") {
          projectform[data].validation = ([{ name: "required" }, { "name": "allowNumaricOnly1" }])
        } else {
          projectform[data].validation = ([{ name: "required" }])
        }
      });
      hideValidation(["project_Subtype", "process_type", "filing_type"])
    }



    if (data === 6 && key === "project_type") {

      let Litigation_key = [
        "client",
        "project_type",
        "filing_type",
        "billable_type",
        "employeelist",
        "hod_attorny",
        "projectcostrange",
        "projectname",
        "comments",

      ];

      Litigation_key.map((data) => {
        if (data === "projectcostrange") {
          projectform[data].validation = ([{ name: "required" }, { "name": "allowNumaricOnly1" }])
        } else {
          projectform[data].validation = ([{ name: "required" }])
        }
      });
      hideValidation(["project_Subtype", "process_type"])




    }

    if (data && key === "project_Subtype") {
      if (data === 4) {

        projectform.process_type.validation = ([])
        projectform.filing_type.validation = ([])

      }
      else {
        projectform.process_type.validation = ([{ name: "required" }])
        projectform.filing_type.validation = ([{ name: "required" }])
      }
    }


    console.log(data, key, "additonaldata")

    if (data && key === "billable_type") {
      if (data === 1 || data === 4 || data === 5) {
        projectform.baseRate.validation = ([{ name: "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly1" }])
        projectform.unit_measurement.validation = ([{ name: "required" }])
        projectform.limits.validation = []
        projectform.additionalRate.validation = []
      }
      else if (data === 3) {
        projectform.limits.validation = ([{ "name": "required" }, { "name": "allowNumaricOnly1" }])
        projectform.additionalRate.validation = ([{ "name": "required" }, { "name": "allowNumaricOnly1" }])
        projectform.baseRate.validation = ([{ name: "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly1" }])
        projectform.unit_measurement.validation = ([{ name: "required" }])
      } else if (data === 2) {
        projectform.limits.validation = []
        projectform.additionalRate.validation = []
        projectform.baseRate.validation = []
        projectform.unit_measurement.validation = []
      }
    }

    //  projectSubTypeValue

    if (key === "project_type" && data) {

      dispatch(getProjectSubType(data));

      if (data === 6) {
        let values = {
          ProjectType: data,
          ProjectSubtype: "0",
          ProcessType: "0",
        };
        dispatch(getFilingType(values));
      }

      if (ProjectType.projectTypedata.length > 0 && ProjectType.projectTypedata) {
        let data_res_id = ProjectType.projectTypedata.find((val) => {
          return (
            data == val.id
          )
        })
        setProj_type_name(data_res_id.value)
      }
    }

    //Process type

    if (key === "project_Subtype" && data) {
      let values = {
        ProjectType: projectform.project_type.value,
        ProjectSubtype: data,
      };
      dispatch(getProcessType(values));
    }

    // Filing type

    if (key === "process_type" && data) {
      let values = {
        ProjectType: projectform.project_type.value,
        ProjectSubtype: projectform.project_Subtype.value,
        ProcessType: data,
      };
      dispatch(getFilingType(values));
    }

    // only for multi select (start)

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    // (end)
    // console.log(projectform.baseRate.validation, "projectform.baseRate.validation")
    if (data && key == "projectcostrange") {
      if (projectform.baseRate.validation[1]) {
        projectform.baseRate.validation[1].params = data
      } else {
        projectform.baseRate.validation.push({ "params": data })
      }
    }
    setprojectform((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

    // variable popup==>
    if (key === "billable_type" && data === 2) {
      setVarRatePlusIcon(true);
      // setVariableid(true);
    }
    else if (key === "billable_type" && data !== 2) {
      setVarRatePlusIcon(false);
    }
  }

  console.log(projectform, "projectforms")

  const hideValidation = (From_key) => {
    From_key.map((data) => {
      try {
        projectform[data].validation = [];
      } catch (error) {
        throw error;
      }
    });

    setprojectform((prevState) => ({
      ...prevState,
    }));
  }
  console.log(projectform, "baseRate")


  function onsubmit() {



    var mainvalue = {};
    var targetkeys = Object.keys(projectform);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        projectform[targetkeys[i]].value,
        projectform[targetkeys[i]].validation
      );
      projectform[targetkeys[i]].error = !errorcheck.state;
      projectform[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = projectform[targetkeys[i]].value;
    }

    var filtererr = targetkeys.filter((obj) => projectform[obj].error == true);
    console.log(filtererr.length, projectform, "projectform ")

    if (projectform.billable_type.value && projectform.billable_type.value === 2 && filtererr.length === 0) {
      dispatch(InsertIpProject(projectform, sendVariableData, proj_type_name)).then(
        (response) => {
          handleCancel();
        }
      );
    }
    else if (filtererr.length > 1) {
    }
    else if (filtererr.length == 0) {
      dispatch(InsertIpProject(projectform, sendVariableData, proj_type_name)).then(
        (response) => {
          handleCancel();
        }
      );
    }
    setprojectform((prevState) => ({
      ...prevState,
    }));
  }


  const handleCancel = () => {
    let From_key = [
      "client",
      "project_type",
      "project_Subtype",
      "billable_type",
      "process_type",
      "filing_type",
      "employeelist",
      "hod_attorny",
      "unit_measurement",
      "projectcostrange",
      "projectname",
      "process_type",
      "comments",
      "baseRate",
      "limits",
      "additionalRate",
    ];

    From_key.map((data) => {
      try {
        projectform[data].value = "";
      } catch (error) {
        throw error;
      }
    });
    setSendVariableData([]);
    setShowVariableTable([]);
    setAddTableData([]);
    setprojectform((prevState) => ({
      ...prevState,
    }));
  };

  const onCancel = () => {
    handleCancel()
  }

  useEffect(() => {
    // Client
    let Client = [];
    props.Client.map((data) =>
      Client.push({ value: data.client, id: data.client_id })
    );
    setClient({ Client });

    // ProjectSubType
    let projectSubTypeValue = [];
    props.ProjectSubType.map((data) =>
      projectSubTypeValue.push({
        value: data.sub_project_type,
        id: data.sub_project_type_id,
      })
    );
    setSubType_Project({ projectSubTypeValue });

    //  ProcessType
    let Processtypevalue = [];
    props.ProcessType.map((data) =>
      Processtypevalue.push({ value: data.process, id: data.process_id })
    );
    console.log("test", Processtypevalue);
    setProcessType({ Processtypevalue });

    //filing type

    let FilingType = [];
    props.FilingType.map((data) =>
      FilingType.push({ value: data.filing_type, id: data.filing_type_id })
    );
    setFilingType({ FilingType });

    //hod/attony, Counsel ,DRA and DDRA
    let EmployeeList = [];
    props.EmployeeList.map((data) =>
      EmployeeList.push({ value: data.name, id: data.emp_id })

    );
    setEmployeeList({ EmployeeList });


    // Project Value

    let ProjectCostRange = [];
    props.ProjectCostRange.map((data) =>
      ProjectCostRange.push({ value: data.range, id: data.range_id })
    );
    setProjectCostRange({ ProjectCostRange });
  }, [
    props.Client,
    props.ProjectSubType,
    props.ProcessType,
    props.FilingType,
    props.EmployeeList,
    props.ProjectCostRange,
  ]);

  const variablerateModel = () => {
    function onSearch() {
      setSearchdata(true);
      setAddsearchdata(false);
      // setVariableRateCall(!variableRateCall)
      setNotfoundmodel(true);
    }

    function addSearchData() {
      setAddsearchdata(true);
      setSearchdata(false);
      setSuccessmodel(true);
    }



    const newInsertrow = (data) => {
      console.log(data, "datadatadatas")
      // setActivityid(id)

    }


    return (
      <div>
        <VariableRate
          variablebtnchange={true}
          variabletablechange={true}
          setShowSearchTable={() => setAddsearchdata(true)}
          setNoSearchResult={() => setNotfoundmodel(true)}
          newInsertrow={(data) => newInsertrow(data)}
        />
        {searchdata && (
          <div className="addvariableData">
            <img src={AddVarData} onClick={addSearchData} />
          </div>
        )}
        {addsearchdata && (
          <>
            <div>
              <EnhancedTable
                headCells={header}
                rows={addTableData.searchVariableTableData || []}
              />
            </div>
            {showVariableTable.length !== 0 ? (
              <div>
                <EnhancedTable headCells={headers} rows={showVariableTable || []} />
              </div>
            ) : (
              ""
            )}
          </>
        )}
        <DynModel
          modelTitle={"Success"}
          handleChangeModel={successmodel}
          handleChangeCloseModel={(bln) => setSuccessmodel(bln)}
          content={
            <div className="successModel">
              <img src={SuccessIcon} />
              <div>Data Successfully Added in Variable Rate Master</div>
            </div>
          }
          width={400}
        />

      </div>
    );
  };
  useEffect(() => {
    if (props.lenghtData !== 0) {
      let searchVariableTableData = [];
      setNotfoundmodel(false);
      props.searchVariableRate.map((data, index) => {
        if (disableCondition) {
          projectSearchCreate['amountSearch' + index] = data.Amount;
        }
        searchVariableTableData.push({
          designation: data.designation,
          activity: data.activity,
          sub_activity: data.sub_activity,
          court: data.location,
          costRange: data.range,
          lowerLimit: data.lower_limit,
          upperLimit: data.upper_limit,
          amount: (
            <Labelbox
              type="text"
              placeholder={"Amount"}
              changeData={(data) => onchangeAmount(data, "amountSearch" + index)}
              value={projectSearchCreate['amountSearch' + index]}
            />
          ),
          UOM: data.unit,
          add: (
            <img
              src={PlusIcon}
              style={{ cursor: "pointer", width: 19 }}
              onClick={() => addTempTable(data, index)}
            />
          ),
        });
      });
      setAddTableData({ searchVariableTableData });
    } else {
      setAddsearchdata(false);
      setNotfoundmodel(true)
    }

  }, [props.searchVariableRate, props.lenghtData, projectSearchCreate]);

  //----------
  const addTempTable = (data, index) => {

    const TabLen = showVariableTable.length;
    showVariableTable.push({
      designation: data.designation,
      activity: data.activity,
      sub_activity: data.sub_activity,
      court: data.location,
      costRange: data.range,
      lowerLimit: data.lower_limit,
      upperLimit: data.upper_limit,
      amount: projectSearchCreate['amountSearch' + index],
      UOM: data.unit,
      del: (
        <DeleteIcon
          style={{ cursor: "pointer", width: 19 }}
          fontSize="small"
          onClick={() => onDelete(TabLen)}
        />
      ),
    });
    setShowVariableTable([...showVariableTable]);
    sendVariableData.push({
      designation_id: data.designation_id,
      activity_id: data.activity_id,
      sub_activity_id: data.sub_activity_id,
      location_id: data.location_id,
      range_id: data.range_id,
      lower_limit: data.lower_limit,
      upper_limit: data.upper_limit,
      base_rate: data.Amount,
      unit_of_measure: data.unit_id,
    });
    setSendVariableData([...sendVariableData]);
  };

  const onDelete = (i) => {
    console.log(i, "check")
    if (i > -1) {
      showVariableTable.splice(i, 1);
      sendVariableData.splice(i, 1);
    }
    setShowVariableTable([...showVariableTable]);
    setSendVariableData([...sendVariableData]);
  };

  return (
    <div>
      <Grid item xs={12} className="projectFormTitle">
        Project Form
      </Grid>
      <div className="projectFormContent">
        <Grid
          item
          xs={12}
          container
          direction="row"
          justify="center"
          spacing={2}
        >
          <Grid item xs={4}>
            <div className="Fieldheading">Client</div>
            <Labelbox
              type="select" dropdown={client.Client}
              changeData={(data) => checkValidation(data, "client")}
              value={projectform.client.value}
              error={projectform.client.error}
              errmsg={projectform.client.errmsg} />
          </Grid>
          <Grid item xs={2}><br />
            <Link to="/addclient">
              <CustomButton btnName={"Create Client "} btnCustomColor="customPrimary" custombtnCSS="btnCreateClient" onBtnClick={() => setpathname("/addclient")} />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <div className="Fieldheading">Project Name</div>
            <Labelbox type="text"
              changeData={(data) => checkValidation(data, "projectname")}
              value={projectform.projectname.value}
              error={projectform.projectname.error}
              errmsg={projectform.projectname.errmsg} /></Grid>
          <Grid item xs={6}> <div className="Fieldheading">Project Type</div>
            <Labelbox type="select"
              dropdown={ProjectType.projectTypedata}
              changeData={(data) => checkValidation(data, "project_type")}
              value={projectform.project_type.value}
              error={projectform.project_type.error}
              errmsg={projectform.project_type.errmsg} /></Grid>
          {projectform.project_type.value === 1 ? (
            <> <Grid item xs={6}> <div className="Fieldheading">Project Sub Type</div>
              <Labelbox type="select"
                dropdown={SubType_Project.projectSubTypeValue}
                changeData={(data) => checkValidation(data, "project_Subtype")}
                value={projectform.project_Subtype.value}
                error={projectform.project_Subtype.error}
                errmsg={projectform.project_Subtype.errmsg} />
            </Grid>
              {projectform.project_Subtype.value === 4 ?
                <Grid item xs={12}></Grid>
                :
                <>
                  <Grid item xs={6}> <div className="Fieldheading">Process Type</div>
                    <Labelbox type="select"
                      dropdown={ProcessType.Processtypevalue}
                      changeData={(data) => checkValidation(data, "process_type")}
                      value={projectform.process_type.value}
                      error={projectform.process_type.error}
                      errmsg={projectform.process_type.errmsg} />  </Grid>
                  <Grid item xs={6}> <div className="Fieldheading">Filing Type</div>
                    <Labelbox type="select"
                      dropdown={filingType.FilingType}
                      changeData={(data) => checkValidation(data, "filing_type")}
                      value={projectform.filing_type.value}
                      error={projectform.filing_type.error}
                      errmsg={projectform.filing_type.errmsg} /></Grid>
                </>
              }

              <Grid item xs={6}> <div className="Fieldheading">HOD/Attorney</div>
                <Labelbox type="select"
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "hod_attorny")}
                  value={projectform.hod_attorny.value}
                  error={projectform.hod_attorny.error}
                  errmsg={projectform.hod_attorny.errmsg} /> </Grid>
              <Grid item xs={6}> <div className="Fieldheading">Counsel</div>
                <Labelbox type="select"
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "employeelist")}
                  value={projectform.employeelist.value}
                  error={projectform.employeelist.error}
                  errmsg={projectform.employeelist.errmsg} /></Grid>
              <Grid item xs={6}> <div className="Fieldheading">Billable Type</div>
                <Labelbox type="select"
                  dropdown={BillableType.BillableData}
                  changeData={(data) => checkValidation(data, "billable_type")}
                  value={projectform.billable_type.value}
                  error={projectform.billable_type.error}
                  errmsg={projectform.billable_type.errmsg} />
                {varRatePlusIcon === true ? (<div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={PlusIcon} style={{ cursor: "pointer", width: 19 }} onClick={() => setVariableid(true)} /> </div>) : ("")}
                {varRatePlusIcon === true ? showVariableTable.length !== 0 ? `Variable Rate Selected(${showVariableTable.length})` : "" : ""}
              </Grid>
              <Grid item xs={6}> <div className="Fieldheading">Project Value</div>
                <Labelbox type="text"
                  changeData={(data) => checkValidation(data, "projectcostrange")}
                  value={projectform.projectcostrange.value}
                  error={projectform.projectcostrange.error}
                  errmsg={projectform.projectcostrange.errmsg} /> </Grid>
              {projectform.billable_type.value === 3 ? (
                <Grid xs={12} container direction="row" spacing={2}>
                  <Grid item xs={3}> <div className="Fieldheading">Base Rate</div>
                    <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg} /></Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Unit of Measurement</div>
                    <Labelbox type="select"
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) => checkValidation(data, "unit_measurement")}
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg} />
                  </Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Limit</div> <Labelbox type="text" /></Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Additional Rate Hourly</div>
                    <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "additionalRate")}
                      value={projectform.additionalRate.value}
                      error={projectform.additionalRate.error}
                      errmsg={projectform.additionalRate.errmsg} /></Grid> </Grid>
              ) : projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4 ? (
                <Grid item xs={6} container direction="row" spacing={2}>
                  <Grid item xs={6}> <div className="Fieldheading">Base Rate</div>
                    <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg} />  </Grid>
                  <Grid item xs={6}> <div className="Fieldheading">Unit of Measurement</div>
                    <Labelbox type="select"
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) => checkValidation(data, "unit_measurement")}
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg} /> </Grid></Grid>
              ) : (
                <Grid item xs={6}>
                  
                </Grid>
              )}
              <Grid item xs={6}> <div className="Fieldheading">Comments</div>
                <div className="projectFormComments">
                  <Labelbox type="textarea"
                    changeData={(data) => checkValidation(data, "comments")}
                    value={projectform.comments.value}
                    error={projectform.comments.error}
                    errmsg={projectform.comments.errmsg} /> </div></Grid>
              <Grid item xs={6}></Grid>
            </>) : projectform.project_type.value === 6 ? (
              <><Grid item xs={6}> <div className="Fieldheading">Filing Type</div>
                <Labelbox type="select"
                  dropdown={filingType.FilingType}
                  changeData={(data) => checkValidation(data, "filing_type")}
                  value={projectform.filing_type.value}
                  error={projectform.filing_type.error}
                  errmsg={projectform.filing_type.errmsg} /></Grid>
                <Grid item xs={6}> <div className="Fieldheading">Direct Responsible Attorney</div>
                  <Labelbox type="select"
                    dropdown={employeeList.EmployeeList}
                    changeData={(data) => checkValidation(data, "hod_attorny")}
                    value={projectform.hod_attorny.value}
                    error={projectform.hod_attorny.error}
                    errmsg={projectform.hod_attorny.errmsg} /></Grid>
                <Grid item xs={6}> <div className="Fieldheading">Deputy Direct Responsible Attorney</div>
                  <Labelbox type="select"
                    dropdown={employeeList.EmployeeList}
                    changeData={(data) => checkValidation(data, "employeelist")}
                    value={projectform.employeelist.value}
                    error={projectform.employeelist.error}
                    errmsg={projectform.employeelist.errmsg} /></Grid>
                <Grid item xs={6}> <div className="Fieldheading">Billable Type</div>
                  <Labelbox type="select"
                    dropdown={BillableType.BillableData}
                    changeData={(data) => checkValidation(data, "billable_type")}
                    value={projectform.billable_type.value}
                    error={projectform.billable_type.error}
                    errmsg={projectform.billable_type.errmsg} />

                  {varRatePlusIcon === true ? (<div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src={PlusIcon} style={{ cursor: "pointer", width: 19 }} onClick={() => setVariableid(true)} /> </div>) : ("")}
                  {varRatePlusIcon === true ? showVariableTable.length !== 0 ? `Variable Rate Selected(${showVariableTable.length})` : "" : ""} </Grid>

                <Grid item xs={6}> <div className="Fieldheading">Project Value</div>
                  <Labelbox type="text"
                    changeData={(data) => checkValidation(data, "projectcostrange")}
                    value={projectform.projectcostrange.value}
                    error={projectform.projectcostrange.error}
                    errmsg={projectform.projectcostrange.errmsg} />
                </Grid>
                {projectform?.billable_type?.value === 3 ? (
                  <Grid xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3}> <div className="Fieldheading">Base Rate</div>
                      <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "baseRate")}
                        value={projectform.baseRate.value}
                        error={projectform.baseRate.error}
                        errmsg={projectform.baseRate.errmsg} />
                    </Grid>
                    <Grid item xs={3}> <div className="Fieldheading">Unit of Measurement</div>
                      <Labelbox type="select"
                        dropdown={projectUnit.projectUnitdata}
                        changeData={(data) => checkValidation(data, "unit_measurement")}
                        value={projectform.unit_measurement.value}
                        error={projectform.unit_measurement.error}
                        errmsg={projectform.unit_measurement.errmsg} />
                    </Grid>
                    <Grid item xs={3}> <div className="Fieldheading">Limit</div>
                      <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "limits")}
                        value={projectform.limits.value}
                        error={projectform.limits.error}
                        errmsg={projectform.limits.errmsg} />
                    </Grid>
                    <Grid item xs={3}> <div className="Fieldheading">Additional Rate Hourly</div>
                      <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "additionalRate")}
                        value={projectform.additionalRate.value}
                        error={projectform.additionalRate.error}
                        errmsg={projectform.additionalRate.errmsg} />
                    </Grid>  </Grid>
                ) : projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4 ? (
                  <Grid item xs={6} container direction="row" spacing={2}>
                    <Grid item xs={6}> <div className="Fieldheading">Base Rate</div>
                      <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "baseRate")}
                        value={projectform.baseRate.value}
                        error={projectform.baseRate.error}
                        errmsg={projectform.baseRate.errmsg} /> </Grid>
                    <Grid item xs={6}> <div className="Fieldheading">Unit of Measurement</div>
                      <Labelbox type="select"
                        dropdown={projectUnit.projectUnitdata}
                        changeData={(data) => checkValidation(data, "unit_measurement")}
                        value={projectform.unit_measurement.value}
                        error={projectform.unit_measurement.error}
                        errmsg={projectform.unit_measurement.errmsg} />
                    </Grid> </Grid>
                ) : (<Grid item xs={6}></Grid>
                )}
                <Grid item xs={6}> <div className="Fieldheading">Comments</div>
                  <div className="projectFormComments">
                    <Labelbox type="textarea"
                      changeData={(data) => checkValidation(data, "comments")}
                      value={projectform.comments.value}
                      error={projectform.comments.error}
                      errmsg={projectform.comments.errmsg} />
                  </div>
                </Grid>
                <Grid item xs={6}></Grid>
              </>
            ) : projectform.project_type.value === 2 || projectform.project_type.value === 3 || projectform.project_type.value === 4 || projectform.project_type.value === 5 ? (<>
              <Grid item xs={6}> <div className="Fieldheading">Counsel</div>
                <Labelbox type="select"
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "employeelist")}
                  value={projectform.employeelist.value}
                  error={projectform.employeelist.error}
                  errmsg={projectform.employeelist.errmsg} />
              </Grid>
              <Grid item xs={6}> <div className="Fieldheading">HOD/Attorney</div>
                <Labelbox type="select"
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "hod_attorny")}
                  value={projectform.hod_attorny.value}
                  error={projectform.hod_attorny.error}
                  errmsg={projectform.hod_attorny.errmsg}
                />
              </Grid>
              <Grid item xs={6}> <div className="Fieldheading">Project Value</div>
                <Labelbox type="text"
                  changeData={(data) => checkValidation(data, "projectcostrange")}
                  value={projectform.projectcostrange.value}
                  error={projectform.projectcostrange.error}
                  errmsg={projectform.projectcostrange.errmsg} />
              </Grid>
              <Grid item xs={6}> <div className="Fieldheading">Billable Type</div>
                <Labelbox
                  type="select"
                  dropdown={BillableType.BillableData}
                  changeData={(data) => checkValidation(data, "billable_type")}
                  value={projectform.billable_type.value}
                  error={projectform.billable_type.error}
                  errmsg={projectform.billable_type.errmsg} />

                {varRatePlusIcon === true ? (<div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={PlusIcon} style={{ cursor: "pointer", width: 19 }} onClick={() => setVariableid(true)} /> </div>) : ("")}
                {varRatePlusIcon === true ? showVariableTable.length !== 0 ? `Variable Rate Selected(${showVariableTable.length})` : "" : ""} </Grid>

              <Grid item xs={6}> <div className="Fieldheading">Comments</div>
                <div className="projectFormComments">
                  <Labelbox type="textarea"
                    changeData={(data) => checkValidation(data, "comments")}
                    value={projectform.comments.value}
                    error={projectform.comments.error}
                    errmsg={projectform.comments.errmsg} />
                </div>
              </Grid>
              {console.log(projectform.billable_type.value, "projectform.limits.errors")}

              {projectform.billable_type.value === 3 ? (
                <Grid xs={12} container direction="row" spacing={2}>
                  <Grid item xs={3}> <div className="Fieldheading">Base Rate</div>
                    <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg} />
                  </Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Unit of Measurement</div>
                    <Labelbox type="select"
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) => checkValidation(data, "unit_measurement")}
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg} />
                  </Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Limit</div>
                    {console.log(projectform.limits.error, "projectform.limits.errors")}
                    <Labelbox
                      type="text"
                      changeData={(data) => checkValidation(data, "limits")}
                      value={projectform.limits.value}
                      error={projectform.limits.error}
                      errmsg={projectform.limits.errmsg} />
                  </Grid>
                  <Grid item xs={3}> <div className="Fieldheading">Additional Rate Hourly</div>
                    <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "additionalRate")}
                      value={projectform.additionalRate.value}
                      error={projectform.additionalRate.error}
                      errmsg={projectform.additionalRate.errmsg} />
                  </Grid>
                </Grid>
              ) : projectform.billable_type.value === 5 || projectform.billable_type.value === 1 || projectform.billable_type.value === 4 ? (
                <Grid item xs={6} container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <div className="Fieldheading">Base Rate</div> <Labelbox type="text"
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg} />
                  </Grid>
                  <Grid item xs={6}>
                    <div className="Fieldheading">Unit of Measurement</div> <Labelbox
                      type="select"
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) => checkValidation(data, "unit_measurement")}
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg} />
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={6}></Grid>
              )}
              <Grid item xs={6}> </Grid>
            </>
            ) : (<Grid item xs={6}></Grid>
          )}  </Grid>
      </div>
      <div className="customFormbtn">
        <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnClick={onsubmit} />
        <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} onBtnClick={onCancel} />
      </div> <DynModel
        modelTitle={""}
        handleChangeModel={variableid}
        handleChangeCloseModel={(bln) => setVariableid(bln)}
        content={variablerateModel()} width={1300} />
    </div>
  );
}
const mapStateToProps = (state) =>
({
  ProjectSubType: state.getOptions.getProjectSubType || [],
  ProcessType: state.getOptions.getProcessType || [],
  FilingType: state.getOptions.getFilingType || [],
  EmployeeList: state.getOptions.getEmployeeList || [],
  ProjectCostRange: state.getOptions.getProjectCostRange || [],
  Client: state.getOptions.getClientlist,
  searchVariableRate: state.variableRateMaster.searchVariableRate,
  lenghtData: state.variableRateMaster.lengthData,
});

export default connect(mapStateToProps)(ProjectFormCreate);
