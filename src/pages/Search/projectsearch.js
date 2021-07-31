import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import "./search.scss";
import { Radio, Select } from "antd";
import EnhancedTable from "../../component/DynTable/table";
import { useDispatch, connect } from "react-redux";
import {
  getClientType,
  getClient,
  getProjectType,
  getProjectName,
  getBillableType,
  getClientlist,
} from "../../actions/MasterDropdowns";
import Axios from "axios";
import { Collapse } from "antd";
import CustomButton from "../../component/Butttons/button";
import { Redirect, Link } from "react-router-dom";
import AdhocTaskModel from "./adhoctask";
import DynModel from "../../component/Model/model";
import ValidationLibrary from "../../helpers/validationfunction";
import { getProjectSearchTableData } from "../../actions/ProjectSearchAction"
import ProjectIp from '../Project IP1/projectIp';
import LitigationAddcase from '../Litigation/litigation';
import { notification } from "antd";


const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const { Option } = Select;
const ipProjectHead = [
  { id: "ProjectName", label: "Project Name" },
  { id: "clientname", label: "Client Name" },
  { id: "subprojectype", label: "Sub Project Type" },
  { id: "processtype", label: "Process Type" },
  { id: "fillingtype", label: "Filing Type" },
  { id: "billabletype", label: "Billable Type" },
];
const litigationHead = [
  { id: "projectname", label: "Project Name" },
  { id: "clientname", label: "Client Name" },
  { id: "DRA", label: "DRA" },
  { id: "DDRA", label: "DDRA" },
  { id: "fillingtype", label: "Filing Type" },
  { id: "billabletype", label: "Billable Type" },
];
const OtherHead = [
  { id: "projectname", label: "Project Name" },
  { id: "clientname", label: "Client Name" },
  { id: "hodAttorney", label: "HOD/Attorney" },
  { id: "Counsel", label: "Counsel" },
  { id: "rangeOfCost", label: "Project Cost Range" },
  { id: "billabletype", label: "Billable Type" },
];

function Projectsearch(props) {
  const [pathname, setpathname] = useState(window.location.pathname);
  const [value, setValue] = React.useState(1);
  const [modelOpen, setModelOpen] = useState(false);
  const [clientType, setClientType] = useState({});
  const [client, setClient] = useState({});
  const [projectType, setProjectType] = useState({});
  const [projectName, setProjectName] = useState({});
  const [billableType, setBillableType] = useState({});
  const [multiplePanel, setMultiplePanel] = useState([]);

  const [goRights, setGoRights] = useState([])
  const [createProjectRights, setCreateProjectRights] = useState([])
  const [createAdhocRights, setCreateAdhocRights] = useState([])

  const [redirectToProject, setRedirectToProject] = useState(false)
  const dispatch = useDispatch();

  const [projectform, setprojectform] = useState({
    clienttype: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    client: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    projecttype: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    projectname: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    billabletype: {
      value: "0",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getProjectSearchTableData(projectform));
    dispatch(getClientType());
    dispatch(getClientlist());
    dispatch(getProjectType());
    dispatch(getProjectName());
    dispatch(getBillableType());
  }, []);

  useEffect(() => {
    // Client Type
    let ClientType = [];
    props.ClientType.map((data) =>
      ClientType.push({ id: data.client_type_id, value: data.client_type })
    );
    setClientType({ ClientType });
    //Client List
    let Client = [];
    props.Client.map((data) =>
      Client.push({ value: data.client, id: data.client_id })
    );
    setClient({ Client });

    //Project Type
    let ProjectType = [];
    props.ProjectType.map((data) =>
      ProjectType.push({ id: data.project_type_id, value: data.project_type })
    );
    setProjectType({ ProjectType });

    // Project Name

    let ProjectName = [];
    props.ProjectName.map((data) =>
      ProjectName.push({ id: data.project_id, value: data.project_name })
    );
    setProjectName({ ProjectName });

    // Billable Type

    let BillableType = [];
    props.BillableType.map((data) =>
      BillableType.push({
        id: data.billable_type_id,
        value: data.billable_type,
      })
    );
    setBillableType({ BillableType });
  }, [
    props.ClientType,
    props.Client,
    props.ProjectType,
    props.ProjectName,
    props.BillableType,
  ]);

  function checkValidation(data, key, multipleId) {
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

    //  projectSubTypeValue

    // if (key === "clienttype" && data) {
    //   dispatch(getClient(data))
    // }

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
  }

  // useEffect(() => {
  //   let Client = []
  //   props.Client.map((data) =>
  //     Client.push({ value: data.client, id: data.client_id })
  //   )
  //   setClient({ Client })

  // }, [props.Client])

  const onSearch = () => {
    // if (projectLength === 0) {
    //   notification.success({
    //     message: " No Found Data",
    //   });
    // }


    dispatch(getProjectSearchTableData(projectform)).then((project_details) => {

      stateClear();
    });
  };

  const stateClear = () => {
    let Form_key = [
      "clienttype",
      "client",
      "projecttype",
      "projectname",
      "billabletype",
    ];

    Form_key.map((data) => {
      try {
        projectform[data].value = "0";
      } catch (error) {
        throw error;
      }
    });

    setprojectform((prevState) => ({
      ...prevState,
    }));
  };

  useEffect(() => {
    console.log(props.TableData, "projectLength")

    let multipleTab = [];
    props.TableData.map((data, index) => {
      let ipProjectDataList = [];

      data.project_details.map((data, index) => {


        var rowdataListobj = {};
        if (data.project_type_id === 1) {
          rowdataListobj["ProjectName"] = <Link to={`/Home/projectIp/${data.project_id}`}>{data.project_name}</Link>;
          rowdataListobj["clientname"] = data.client;
          rowdataListobj["subprojectype"] = data.sub_project_type;
          rowdataListobj["processtype"] = data.process;
          rowdataListobj["fillingtype"] = data.filing_type;
          rowdataListobj["billabletype"] = data.billable_type;
        } else if (data.project_type_id === 6) {
          rowdataListobj["projectname"] = <Link to={`/Home/projectIp/${data.project_id}`}>{data.project_name}</Link>;
          rowdataListobj["clientname"] = data.client;
          rowdataListobj["DRA"] = data.HR_name;
          rowdataListobj["DDRA"] = data.councel_name;
          rowdataListobj["fillingtype"] = data.filing_type;
          rowdataListobj["billabletype"] = data.billable_type;
        } else {
          rowdataListobj["projectname"] = <Link to={`/Home/projectIp/${data.project_id}`}>{data.project_name}</Link>;
          rowdataListobj["clientname"] = data.client;
          rowdataListobj["hodAttorney"] = data.councel_name;
          rowdataListobj["Counsel"] = data.HR_name;
          rowdataListobj["rangeOfCost"] = data.filing_type;
          rowdataListobj["billabletype"] = data.billable_type;
        }
        ipProjectDataList.push(rowdataListobj);
      });

      multipleTab.push(
        <Panel
          header={`${data.project_type} (${data.project_details.length})`}
          key={index + 1}
        >
          <EnhancedTable
            headCells={
              data.project_type_id === 1
                ? ipProjectHead
                : data.project_type_id === 6
                  ? litigationHead
                  : OtherHead
            }
            rows={ipProjectDataList}
            tabletitle={""}
          />
        </Panel>
      );

    });

    setMultiplePanel(multipleTab);
  }, [props.TableData]);


  ///*****user permission**********/

  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "Project - Go" == val.control
        )
      })
      setGoRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => {
        return (
          "Project - Create Project" == val.control
        )
      })
      setCreateProjectRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => {
        return (
          "Project - Create Adhoc Task" == val.control
        )
      })
      setCreateAdhocRights(data_res_id)
    }

  }, [props.UserPermission]);


  console.log(goRights, "rights")

  function rightsNotification() {
    notification.success({
      message: "You are not Authorized. Please Contact Administrator",
    });
  }
  /////////////
  return (
    <div>
      <div className="searchflex1"></div>
      <div className="searchfilterflex">
        <div className="searchfilterflex1">
          <div className="projsearchfilterdrpdwn">

            <div className="Fieldheading">Client Type</div>
            <Labelbox
              type="select"
              dropdown={clientType.ClientType}
              changeData={(data) => checkValidation(data, "clienttype")}
              value={projectform.clienttype.value}
              error={projectform.clienttype.error}
              errmsg={projectform.clienttype.errmsg}
            />
          </div>
          <div className="projsearchfilterdrpdwn">
            <div className="Fieldheading">Client</div>
            <Labelbox
              type="select"
              dropdown={client.Client}
              changeData={(data) => checkValidation(data, "client")}
              value={projectform.client.value}
              error={projectform.client.error}
              errmsg={projectform.client.errmsg}
            />
          </div>
          <div className="projsearchfilterdrpdwn">
            <div className="Fieldheading">Project Type</div>
            <Labelbox
              type="select"
              dropdown={projectType.ProjectType}
              changeData={(data) => checkValidation(data, "projecttype")}
              value={projectform.projecttype.value}
              error={projectform.projecttype.error}
              errmsg={projectform.projecttype.errmsg}
            />
          </div>
          <div className="projsearchfilterdrpdwn">
            <div className="Fieldheading">Project Name</div>
            <Labelbox
              type="select"
              dropdown={projectName.ProjectName}
              changeData={(data) => checkValidation(data, "projectname")}
              value={projectform.projectname.value}
              error={projectform.projectname.error}
              errmsg={projectform.projectname.errmsg}
            />
          </div>
          <div className="projsearchfilterdrpdwn">
            <div className="Fieldheading">Billing Type</div>
            <Labelbox
              type="select"
              dropdown={billableType.BillableType}
              changeData={(data) => checkValidation(data, "billabletype")}
              value={projectform.billabletype.value}
              error={projectform.billabletype.error}
              errmsg={projectform.billabletype.errmsg}
            />
          </div>
          <CustomButton btnName={"Go "} btnCustomColor="customPrimary" custombtnCSS={"btnGo"} btnDisable={!goRights || goRights.display_control && goRights.display_control === 'N' ? true : false} onBtnClick={onSearch} />

        </div>
      </div>

      <div className="projectsearch_collapse">
        <Collapse onChange={callback}>{multiplePanel}</Collapse>
      </div>
      <div className="createTaskbtn">
        <CustomButton
          btnName={"Create Adhoc Task"}
          btnCustomColor="customPrimary"
          custombtnCSS={"goSearchbtn"}
          btnDisable={!createAdhocRights || createAdhocRights.display_control && createAdhocRights.display_control === 'N' ? true : false}
          onBtnClick={() => setModelOpen(true)}
        />
        <DynModel
          modelTitle={"Adhoc Task"}
          handleChangeModel={modelOpen}
          handleChangeCloseModel={(bln) => setModelOpen(bln)}
          content={<AdhocTaskModel />}
        />

        {/* <Link to={createProjectRights===undefined||(createProjectRights.display_control&&createProjectRights.display_control==='N')?'search':'projectFormCreate'}>
          <CustomButton
            btnName={"Create Project "}
            btnCustomColor="customPrimary"
            custombtnCSS={"goSearchbtn"}
            // onBtnClick={createProjectRights===undefined||(createProjectRights.display_control&&createProjectRights.display_control==='N')&&rightsNotification}
            onBtnClick={() => createProjectRights===undefined||(createProjectRights.display_control&&createProjectRights.display_control==='N')?rightsNotification():''}
          />
        </Link> */}

        <CustomButton
          btnName={"Create Project "}
          btnCustomColor="customPrimary"
          custombtnCSS={"goSearchbtn"}
          btnDisable={!createProjectRights || createProjectRights.display_control && createProjectRights.display_control === 'N' ? true : false}
          onBtnClick={() => setRedirectToProject(true)}
        />
      </div>
      {redirectToProject && createProjectRights && createProjectRights.display_control && createProjectRights.display_control === 'Y' &&
        <Redirect push to="/Home/projectFormCreate" />
      }
      {/* {console.log(pathname, "projectFormCreate")} */}

      {/* <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} /> */}
    </div>
  );
}
const mapStateToProps = (state) =>
  // console.log(state,"statestatestate")
  ({
    TableData: state.projectSearchReducer.getProjectSearchTableData,
    ClientType: state.getOptions.getClientType,
    Client: state.getOptions.getClientlist,
    ProjectType: state.getOptions.getProjectType,
    ProjectName: state.getOptions.getProjectName,
    BillableType: state.getOptions.getBillableType,
    UserPermission: state.UserPermissionReducer.getUserPermission,
  });

export default connect(mapStateToProps)(Projectsearch);
