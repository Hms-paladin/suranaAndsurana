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




const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const { Option } = Select;
const headCells = [
  { id: 'name', label: 'Project Type' },
  { id: 'age', label: 'Project Name' },
  { id: 'gender', label: 'Client Type' },
  { id: 'basic', label: 'Client Name' },
  { id: 'language', label: 'Billing Type' },
  { id: 'certification', label: 'Reserved' },
  { id: 'specialization', label: 'Reserved' },
  { id: 'acheivements', label: 'Reserved' },
  { id: 'talents', label: 'Reserved' },
  { id: 'radio', label: '' },


];

const rows = [
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },

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
  const dispatch = useDispatch();
  const [optionvalues, setoptionvalues] = useState([]);


  const [projectform, setprojectform] = useState({
    clienttype: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    client: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    },
    projecttype: {
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
    billabletype: {
      value: "",
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

    dispatch(ResumeSearchStatus())
    // get value from redux store
    console.log(props.ResumeSearchStatus, "ResumeSearchStatus")
    // console.log(optionvalues,"vbdfg")
    Axios({
      method: "get",
      url: apiurl + "get_Interview_Status",
    }).then((response) => {
      setoptionvalues(response.data.data.map((data) => ({
        name: data.status
      })))
    })

  }, [dispatch])

  useEffect(() => {
    dispatch(getClientType())
    dispatch(getProjectType())
    dispatch(getProjectName())
    dispatch(getBillableType())

  }, [])

  // Client Type
  useEffect(() => {

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
          <Button className="projectsearchgo">Go</Button>

        </div>


      </div>
      <div className="projectsearch_collapse">
        <Collapse onChange={callback}>
          <Panel header="IP Project (5)" key="1">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
          <Panel header="Litigation Project (5)" key="2">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
          <Panel header="Retainer Project (5)" key="3">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
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

    ResumeSearchStatus: state.ResumeSearchStatus,
    ClientType: state.getOptions.getClientType,
    Client: state.getOptions.getClient,
    ProjectType: state.getOptions.getProjectType,
    ProjectName: state.getOptions.getProjectName,
    BillableType: state.getOptions.getBillableType,
  }
)

export default connect(mapStateToProps)(Projectsearch);