import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './search.scss'
import { Radio, Select } from 'antd';
import EnhancedTable from "../../component/DynTable/table";
import { apiurl } from '../../utils/baseUrl'
import { useDispatch, connect } from "react-redux";
import { ResumeSearchStatus } from "../../actions/ResumeSearchAction";
import { getClientType, getClient, getProjectType, getProjectName, getBillableType } from '../../actions/MasterDropdowns';
import Axios from 'axios';
import { Collapse } from 'antd';
import CustomButton from "../../component/Butttons/button";
import { Redirect, Link } from 'react-router-dom';
import AdhocTaskModel from './adhoctask';
import DynModel from '../../component/Model/model';
import ValidationLibrary from "../../helpers/validationfunction";
import { getProjectSearchTableData } from "../../actions/ProjectSearchAction"




const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const { Option } = Select;
const headCells = [
  { id: 'projectname', label: 'Project Name' },
  { id: 'clientname', label: 'Client Name' },
  { id: 'subprojectype', label: 'Sub Project Type' },
  { id: 'processtype', label: 'Process Type' },
  { id: 'fillingtype', label: 'Filling Type' },
  { id: 'billabletype', label: 'Billable Type' },

];


function Projectsearch(props) {
  const [pathname, setpathname] = useState(window.location.pathname)
  const [value, setValue] = React.useState(1);
  const [modelOpen, setModelOpen] = useState(false)
  const [clientType, setClientType] = useState({})
  const [client, setClient] = useState({})
  const [projectType, setProjectType] = useState({})
  const [projectName, setProjectName] = useState({})
  const [billableType, setBillableType] = useState({})
  const [multiplePanel, setMultiplePanel] = useState([]);
  const dispatch = useDispatch();



  const [projectform, setprojectform] = useState({
    clienttype: {
      value: "0",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    client: {
      value: "0",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    projecttype: {
      value: "0",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    projectname: {
      value: "0",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    billabletype: {
      value: "0",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },

  })

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }

  useEffect(() => {
    dispatch(getProjectSearchTableData(projectform))
    dispatch(getClientType())
    dispatch(getProjectType())
    dispatch(getProjectName())
    dispatch(getBillableType())

  }, [])


  useEffect(() => {
    // Client Type
    let ClientType = []
    props.ClientType.map((data) =>
      ClientType.push({ id: data.client_type_id, value: data.client_type })
    )
    setClientType({ ClientType })

    //Project Type
    let ProjectType = []
    props.ProjectType.map((data) =>
      ProjectType.push({ id: data.project_type_id, value: data.project_type })
    )
    setProjectType({ ProjectType })

    // Project Name

    let ProjectName = []
    props.ProjectName.map((data) =>
      ProjectName.push({ id: data.project_id, value: data.project_name })
    )
    setProjectName({ ProjectName })

    // Billable Type


    let BillableType = []
    props.BillableType.map((data) =>
      BillableType.push({ id: data.billable_type_id, value: data.billable_type })
    )
    setBillableType({ BillableType })


  }, [props.ClientType, props.ProjectType, props.ProjectName, props.BillableType])



  function checkValidation(data, key, multipleId) {

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      projectform[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: projectform[key].validation
    }

    //  projectSubTypeValue

    if (key === "clienttype" && data) {
      dispatch(getClient(data))
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


    setprojectform(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));
  }


  useEffect(() => {
    let Client = []
    props.Client.map((data) =>
      Client.push({ value: data.client, id: data.client_id })
    )
    setClient({ Client })

  }, [props.Client])

  const onSearch = () => {
    dispatch(getProjectSearchTableData(projectform)).then((response) => {
      stateClear();
    }
    )
  }

  const stateClear = () => {

    let Form_key = [
      "clienttype",
      "client",
      "projecttype", "projectname", "billabletype"
    ];

    Form_key.map((data) => {

      try {
        projectform[data].value = "0";
      } catch (error) {
        throw (error)
      }
    });

    setprojectform((prevState) => ({
      ...prevState,
    }));
  };


  useEffect(() => {
    let multipleTab = []
    props.TableData.map((data, index) => {
      let rowDataList = []

      data.project_details.map((data, index) => {
        rowDataList.push({
          ProjectName: data.project_name,
          ClientName: data.client,
          SubProjectType:data.sub_project_type,
          Process: data.process, ClientType: data.client_type,
           BillingType: data.billable_type, 
        })
      })
      multipleTab.push(
        <Panel header={`${data.project_type} (${data.project_details.length})`} key={index + 1}>
          <EnhancedTable headCells={headCells} rows={rowDataList} tabletitle={""} />
        </Panel>
      )
    })
    setMultiplePanel(multipleTab)

  }, [props.TableData])

  return (
    <div>
      <div className="searchflex1">

      </div>
      <div className="searchfilterflex">
        <div className="searchfilterflex1">
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="Client type"
              dropdown={clientType.ClientType}
              changeData={(data) => checkValidation(data, "clienttype")}
              value={projectform.clienttype.value}
              error={projectform.clienttype.error}
              errmsg={projectform.clienttype.errmsg}
            />
          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="Client"
              dropdown={client.Client}
              changeData={(data) => checkValidation(data, "client")}
              value={projectform.client.value}
              error={projectform.client.error}
              errmsg={projectform.client.errmsg}
            />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="project type"
              dropdown={projectType.ProjectType}
              changeData={(data) => checkValidation(data, "projecttype")}
              value={projectform.projecttype.value}
              error={projectform.projecttype.error}
              errmsg={projectform.projecttype.errmsg} />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="project name"
              dropdown={projectName.ProjectName}
              changeData={(data) => checkValidation(data, "projectname")}
              value={projectform.projectname.value}
              error={projectform.projectname.error}
              errmsg={projectform.projectname.errmsg} />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="billing type"
              dropdown={billableType.BillableType}
              changeData={(data) => checkValidation(data, "billabletype")}
              value={projectform.billabletype.value}
              error={projectform.billabletype.error}
              errmsg={projectform.billabletype.errmsg} />

          </div>
          <Button className="projectsearchgo" onClick={onSearch} >Go</Button>

        </div>


      </div>
      <div className="projectsearch_collapse">
        <Collapse onChange={callback}>
          {multiplePanel}
        </Collapse>
      </div>
      <div className="createTaskbtn">
        <CustomButton btnName={"Create Adhoc Task"} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setModelOpen(true)} />
        <DynModel modelTitle={"Adhoc Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={<AdhocTaskModel />} />
        <Link to="/projectFormCreate" >
          <CustomButton btnName={"Create Project "} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setpathname("/projectFormCreate")} />
        </Link>
      </div>

      {/* <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} /> */}


    </div>
  )
}
const mapStateToProps = state => (
  // console.log(state,"statestatestate")
  {
    TableData: state.projectSearchReducer.getProjectSearchTableData,
    ClientType: state.getOptions.getClientType,
    Client: state.getOptions.getClient,
    ProjectType: state.getOptions.getProjectType,
    ProjectName: state.getOptions.getProjectName,
    BillableType: state.getOptions.getBillableType,
  }
)

export default connect(mapStateToProps)(Projectsearch);