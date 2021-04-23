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
  const [notfoundmodel, setNotfoundmodel] = useState(false);
  const [varRatePlusIcon, setVarRatePlusIcon] = useState(false);
  const [disableCondition, setDisableCondition] = useState(true);
  const [projectSearchCreate, setPrpjectSearchCreate] = useState({});
  const [projectform, setprojectform] = useState({
    client: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    project_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    projectname: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    //IP
    project_Subtype: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    process_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    filing_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    hod_attorny: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    employeelist: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    billable_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    unit_measurement: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    projectcostrange: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    comments: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    baseRate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    limit: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    additionalRate: {
      value: "",
      validation: [{ name: "required" }],
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
    console.log(parseInt(data),key,"onchangeAmount")
    // if (key === "amountSearch" && data) {
      setPrpjectSearchCreate((prevState) => ({
        ...prevState,
        [key]: data ,
      }));
      setDisableCondition(false)
    // }
  };


  function checkValidation(data, key, multipleId) {
    console.log(data,"onchangeValue")
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
    // console.log(projectform.project_type.value, "projectform.client.value")


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

    setprojectform((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));

    // variable popup==>

    if (key === "billable_type" && data === 2) {
      setVarRatePlusIcon(true);
      // setVariableid(true);
    } 
    else if(key === "billable_type" && data !== 2)  {
      setVarRatePlusIcon(false);
    }
  }

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
    // if (filtererr.length < 0) {
    //     // setpostData({ error: true });
    // } else {
    // setpostData({ error: false });
    dispatch(InsertIpProject(projectform, sendVariableData)).then(
      (response) => {
        handleCancel();
      }
    );
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
      "limit",
      "additionalRate",
    ];

    From_key.map((data) => {
      try {
        projectform[data].value = "";
        console.log("mapping", projectform[data].value);
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
  function addSearchData() {
    setAddsearchdata(true);
    setSearchdata(false);
    setSuccessmodel(true);
  }
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

    return (
      <div>
        <VariableRate
          variablebtnchange={true}
          variabletablechange={true}
          setShowSearchTable={() => setAddsearchdata(true)}
          setNoSearchResult={() => setNotfoundmodel(true)}
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
                rows={addTableData.searchVariableTableData ||[]} 
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
        <DynModel
          modelTitle={"Billing Criteria Not Found"}
          handleChangeModel={notfoundmodel}
          handleChangeCloseModel={(bln) => setNotfoundmodel(bln)}
          content={
            <div className="successModel">
              <div>
                {" "}
                <label className="notfound_label">
                  Do You Want To Continue ?
                </label>
              </div>
              <div className="customNotFoundbtn">
                <CustomButton
                  btnName={"Yes"}
                  btnCustomColor="customPrimary"
                  custombtnCSS={"btnNotFound"}
                  onBtnClick={() => setNotfoundmodel(false)}
                />
                <CustomButton
                  btnName={"No "}
                  btnCustomColor="customPrimary"
                  custombtnCSS={"btnNotFound"}
                  onBtnClick={() => setNotfoundmodel(false)}
                />
              </div>
            </div>
          }
          width={400}
        />
      </div>
    );
  };
  // {console.log("props.lenght",props.lenghtData)}
  useEffect(() => {
    if(props.lenghtData !== 0){
      let searchVariableTableData = [];
      setNotfoundmodel(false);
      props.searchVariableRate.map((data, index) => {
        if(disableCondition){
        projectSearchCreate['amountSearch'+index] = data.Amount;
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
              changeData={(data) => onchangeAmount(data, "amountSearch"+index)}
              value={projectSearchCreate['amountSearch'+index]}
            />
          ),
          UOM: data.unit,
          add: (
            <img
              src={PlusIcon}
              style={{ cursor: "pointer", width: 19 }}
              onClick={() => addTempTable(data,index)}
            />
          ),
        });
      });
      setAddTableData({ searchVariableTableData });
    }else{
      setAddsearchdata(false);
      setNotfoundmodel(true)
    }
    
  }, [props.searchVariableRate, props.lenghtData, projectSearchCreate]);

  console.log(projectSearchCreate,"projectSearchCreate")

  //----------
  const addTempTable = (data,index) => {
        console.log(projectSearchCreate,index,"projectSearchCreateprojectSearchCreate")

//  ____________________


// _______________________

    const TabLen = showVariableTable.length;
    showVariableTable.push({
      designation: data.designation,
      activity: data.activity,
      sub_activity: data.sub_activity,
      court: data.location,
      costRange: data.range,
      lowerLimit: data.lower_limit,
      upperLimit: data.upper_limit,
      amount: data.Amount,
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
            <Labelbox
              type="select"
              placeholder={"Client"}
              dropdown={client.Client}
              changeData={(data) => checkValidation(data, "client")}
              value={projectform.client.value}
              error={projectform.client.error}
              errmsg={projectform.client.errmsg}
            />
          </Grid>
          <Grid item xs={2}>
            <Link to="/addclient">
              <CustomButton
                btnName={"Create Client "}
                btnCustomColor="customPrimary"
                custombtnCSS="btnCreateClient"
                onBtnClick={() => setpathname("/addclient")}
              />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Labelbox
              type="text"
              placeholder={"Project Name "}
              changeData={(data) => checkValidation(data, "projectname")}
              value={projectform.projectname.value}
              error={projectform.projectname.error}
              errmsg={projectform.projectname.errmsg}
            />
          </Grid>
          <Grid item xs={6}>
            <Labelbox
              type="select"
              placeholder={"Project Type "}
              dropdown={ProjectType.projectTypedata}
              changeData={(data) => checkValidation(data, "project_type")}
              value={projectform.project_type.value}
              error={projectform.project_type.error}
              errmsg={projectform.project_type.errmsg}
            />
          </Grid>
          {projectform.project_type.value === 1 ? (
            <>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Project Sub Type"}
                  dropdown={SubType_Project.projectSubTypeValue}
                  changeData={(data) =>
                    checkValidation(data, "project_Subtype")
                  }
                  value={projectform.project_Subtype.value}
                  error={projectform.project_Subtype.error}
                  errmsg={projectform.project_Subtype.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Process Type"}
                  dropdown={ProcessType.Processtypevalue}
                  changeData={(data) => checkValidation(data, "process_type")}
                  value={projectform.process_type.value}
                  error={projectform.process_type.error}
                  errmsg={projectform.process_type.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Filing Type"}
                  dropdown={filingType.FilingType}
                  changeData={(data) => checkValidation(data, "filing_type")}
                  value={projectform.filing_type.value}
                  error={projectform.filing_type.error}
                  errmsg={projectform.filing_type.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"HOD/Attorney"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "hod_attorny")}
                  value={projectform.hod_attorny.value}
                  error={projectform.hod_attorny.error}
                  errmsg={projectform.hod_attorny.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Counsel"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "employeelist")}
                  value={projectform.employeelist.value}
                  error={projectform.employeelist.error}
                  errmsg={projectform.employeelist.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Billable Type"}
                  dropdown={BillableType.BillableData}
                  changeData={(data) => checkValidation(data, "billable_type")}
                  value={projectform.billable_type.value}
                  error={projectform.billable_type.error}
                  errmsg={projectform.billable_type.errmsg}
                />
                {varRatePlusIcon === true ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img
                      src={PlusIcon}
                      style={{ cursor: "pointer", width: 19 }}
                      onClick={() => setVariableid(true)}
                    />
                  </div>
                ) : (
                  ""
                )}
                {varRatePlusIcon === true
                  ? showVariableTable.length !== 0
                    ? `Variable Rate Selected(${showVariableTable.length})`
                    : ""
                  : ""}
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="text"
                  placeholder={"Project Value "}
                  // dropdown={projectCostRange.ProjectCostRange}
                  changeData={(data) =>
                    checkValidation(data, "projectcostrange")
                  }
                  value={projectform.projectcostrange.value}
                  error={projectform.projectcostrange.error}
                  errmsg={projectform.projectcostrange.errmsg}
                />
              </Grid>
              {projectform.billable_type.value === 3 ? (
                <Grid xs={12} container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox type="text" placeholder={"Limit"} />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Additional Rate Hourly"}
                      changeData={(data) =>
                        checkValidation(data, "additionalRate")
                      }
                      value={projectform.additionalRate.value}
                      error={projectform.additionalRate.error}
                      errmsg={projectform.additionalRate.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : projectform.billable_type.value === 5 ||
                projectform.billable_type.value === 1 ||
                projectform.billable_type.value === 4 ? (
                <Grid item xs={6} container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) =>
                        checkValidation(data, "unit_measurement")
                      }
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={6}></Grid>
              )}
              <Grid item xs={6}>
                <div className="projectFormComments">
                  <Labelbox
                    type="textarea"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={projectform.comments.value}
                    error={projectform.comments.error}
                    errmsg={projectform.comments.errmsg}
                  />
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
            </>
          ) : projectform.project_type.value === 6 ? (
            <>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Filing Type"}
                  dropdown={filingType.FilingType}
                  changeData={(data) => checkValidation(data, "filing_type")}
                  value={projectform.filing_type.value}
                  error={projectform.filing_type.error}
                  errmsg={projectform.filing_type.errmsg}
                />
              </Grid>

              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Direct Responsible Attorney"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "hod_attorny")}
                  value={projectform.hod_attorny.value}
                  error={projectform.hod_attorny.error}
                  errmsg={projectform.hod_attorny.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Deputy Direct Responsible Attorney"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "employeelist")}
                  value={projectform.employeelist.value}
                  error={projectform.employeelist.error}
                  errmsg={projectform.employeelist.errmsg}
                />
              </Grid>

              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Billable Type"}
                  dropdown={BillableType.BillableData}
                  changeData={(data) => checkValidation(data, "billable_type")}
                  value={projectform.billable_type.value}
                  error={projectform.billable_type.error}
                  errmsg={projectform.billable_type.errmsg}
                />
              </Grid>

              <Grid item xs={6}>
              <Labelbox
                  type="text"
                  placeholder={"Project Value "}
                  // dropdown={projectCostRange.ProjectCostRange}
                  changeData={(data) =>
                    checkValidation(data, "projectcostrange")
                  }
                  value={projectform.projectcostrange.value}
                  error={projectform.projectcostrange.error}
                  errmsg={projectform.projectcostrange.errmsg}
                />
              </Grid>
              {projectform?.billable_type?.value === 3 ? (
                <Grid xs={12} container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) =>
                        checkValidation(data, "unit_measurement")
                      }
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Limit"}
                      changeData={(data) => checkValidation(data, "limit")}
                      value={projectform.limit.value}
                      error={projectform.limit.error}
                      errmsg={projectform.limit.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Additional Rate Hourly"}
                      changeData={(data) =>
                        checkValidation(data, "additionalRate")
                      }
                      value={projectform.additionalRate.value}
                      error={projectform.additionalRate.error}
                      errmsg={projectform.additionalRate.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : projectform.billable_type.value === 5 ||
                projectform.billable_type.value === 1 ||
                projectform.billable_type.value === 4 ? (
                <Grid item xs={6} container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) =>
                        checkValidation(data, "unit_measurement")
                      }
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={6}></Grid>
              )}

              <Grid item xs={6}>
                <div className="projectFormComments">
                  <Labelbox
                    type="textarea"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={projectform.comments.value}
                    error={projectform.comments.error}
                    errmsg={projectform.comments.errmsg}
                  />
                </div>
              </Grid>

              <Grid item xs={6}></Grid>
            </>
          ) : projectform.project_type.value === 2 ||
            projectform.project_type.value === 3 ||
            projectform.project_type.value === 4 ||
            projectform.project_type.value === 5 ? (
            <>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Counsel"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "employeelist")}
                  value={projectform.employeelist.value}
                  error={projectform.employeelist.error}
                  errmsg={projectform.employeelist.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"HOD/Attorney"}
                  dropdown={employeeList.EmployeeList}
                  changeData={(data) => checkValidation(data, "hod_attorny")}
                  value={projectform.hod_attorny.value}
                  error={projectform.hod_attorny.error}
                  errmsg={projectform.hod_attorny.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
              <Labelbox
                  type="text"
                  placeholder={"Project Value "}
                  // dropdown={projectCostRange.ProjectCostRange}
                  changeData={(data) =>
                    checkValidation(data, "projectcostrange")
                  }
                  value={projectform.projectcostrange.value}
                  error={projectform.projectcostrange.error}
                  errmsg={projectform.projectcostrange.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <Labelbox
                  type="select"
                  placeholder={"Billable Type"}
                  dropdown={BillableType.BillableData}
                  changeData={(data) => checkValidation(data, "billable_type")}
                  value={projectform.billable_type.value}
                  error={projectform.billable_type.error}
                  errmsg={projectform.billable_type.errmsg}
                />
              </Grid>
              <Grid item xs={6}>
                <div className="projectFormComments">
                  <Labelbox
                    type="textarea"
                    placeholder={"Comments"}
                    changeData={(data) => checkValidation(data, "comments")}
                    value={projectform.comments.value}
                    error={projectform.comments.error}
                    errmsg={projectform.comments.errmsg}
                  />
                </div>
              </Grid>

              {projectform?.billable_type?.value === 3 ? (
                <Grid xs={12} container direction="row" spacing={2}>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) =>
                        checkValidation(data, "unit_measurement")
                      }
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Limit"}
                      changeData={(data) => checkValidation(data, "limit")}
                      value={projectform.limit.value}
                      error={projectform.limit.error}
                      errmsg={projectform.limit.errmsg}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Labelbox
                      type="text"
                      placeholder={"Additional Rate Hourly"}
                      changeData={(data) =>
                        checkValidation(data, "additionalRate")
                      }
                      value={projectform.additionalRate.value}
                      error={projectform.additionalRate.error}
                      errmsg={projectform.additionalRate.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : projectform.billable_type.value === 5 ||
                projectform.billable_type.value === 1 ||
                projectform.billable_type.value === 4 ? (
                <Grid item xs={6} container direction="row" spacing={2}>
                  <Grid item xs={6}>
                    <Labelbox
                      type="text"
                      placeholder={"Base Rate"}
                      changeData={(data) => checkValidation(data, "baseRate")}
                      value={projectform.baseRate.value}
                      error={projectform.baseRate.error}
                      errmsg={projectform.baseRate.errmsg}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Labelbox
                      type="select"
                      placeholder={"Unit of Measurement"}
                      dropdown={projectUnit.projectUnitdata}
                      changeData={(data) =>
                        checkValidation(data, "unit_measurement")
                      }
                      value={projectform.unit_measurement.value}
                      error={projectform.unit_measurement.error}
                      errmsg={projectform.unit_measurement.errmsg}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={6}></Grid>
              )}

              <Grid item xs={6}></Grid>
            </>
          ) : (
            <Grid item xs={6}></Grid>
          )}
        </Grid>
      </div>

      <div className="customFormbtn">
        <CustomButton
          btnName={"SAVE "}
          btnCustomColor="customPrimary"
          custombtnCSS={"btnProjectForm"}
          onBtnClick={onsubmit}
        />
        <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"} />
      </div>
      <DynModel
        modelTitle={"Variable Rate"}
        handleChangeModel={variableid}
        handleChangeCloseModel={(bln) => setVariableid(bln)}
        content={variablerateModel()}
        width={1300}
      />
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
