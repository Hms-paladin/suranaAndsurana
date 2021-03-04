import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './search.scss'
import { Radio, Select } from 'antd';
import EnhancedTable from "../../component/DynTable/table";
import DynModel from './model'
import { apiurl } from '../../utils/baseUrl'
import { useDispatch, connect } from "react-redux";
import { ResumeSearchStatus } from "../../actions/ResumeSearchAction"
import Axios from 'axios';
import SelectionIcon from '../../images/select.svg'
import { Collapse } from 'antd';
import CustomButton from "../../component/Butttons/button";
import { Redirect, Link } from 'react-router-dom';



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
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", radio: <Radio /> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", radio: <Radio /> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", radio: <Radio /> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", radio: <Radio /> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", radio: <Radio /> },

];
function Projectsearch(props) {
  const [pathname, setpathname] = useState(window.location.pathname)

  const [value, setValue] = React.useState(1);
  const [modelOpen, setModelOpen] = useState(false)
  const dispatch = useDispatch();
  const [optionvalues, setoptionvalues] = useState([]);
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



  return (
    <div>
      <div className="searchflex1">

      </div>
      <div className="searchfilterflex">
        <div className="searchfilterflex1">
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="Client type" />
          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="Client" />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="project type" />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="project name" />

          </div>
          <div className="projsearchfilterdrpdwn">
            <Labelbox type="select" placeholder="billing type" />

          </div>
          <Button className="projectsearchgo">Go</Button>

        </div>


      </div>
      <div className="projectsearch_collapse">
        <Collapse onChange={callback}>
          <Panel header="IP Project (5)" key="1">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
          <Panel header="Cases (5)" key="2">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
          <Panel header="Copyright (5)" key="3">
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />

          </Panel>
        </Collapse>
      </div>
      <div className="createTaskbtn">
        <Link to="/projectFormCreate" >
          <CustomButton btnName={"Create Project "} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setpathname("/projectFormCreate")} />
        </Link>
      </div>
      {/* <CustomButton btnName={"Create Project "} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={() => setModelOpen(true)} /> */}
      {/* <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} /> */}


    </div>
  )
}
const mapStateToProps = state => ({
  ResumeSearchStatus: state.ResumeSearchStatus
})

export default connect(mapStateToProps)(Projectsearch);