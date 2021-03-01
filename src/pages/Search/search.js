import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Radio, Select, Checkbox } from 'antd';
import EnhancedTable from '../../component/DynTable/table';
import DynModel from './model';
import { apiurl } from '../../utils/baseUrl';
import { useDispatch, connect } from "react-redux";
import { ResumeSearchStatus } from "../../actions/ResumeSearchAction";
import { getSkills } from "../../actions/SearchAction";
import Axios from 'axios';
import CustomButton from "../../component/Butttons/button";

import './search.scss'


const { Option } = Select;
const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'gender', label: 'Gender' },
  { id: 'basic', label: 'Basic Quailification' },
  { id: 'language', label: 'Languages Known' },
  { id: 'certification', label: 'Certification' },
  { id: 'specialization', label: 'Specialization' },
  { id: 'acheivements', label: 'Acheivements' },
  { id: 'talents', label: 'Talents' },

];

const rows = [
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
  { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder", box:<Checkbox/> },
];
function Search(props) {
  const [value, setValue] = React.useState(1);
  const [modelOpen, setModelOpen] = useState(false)
  const dispatch = useDispatch();
  const [optionvalues, setoptionvalues] = useState([]);
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }
  useEffect(() => {
    dispatch(getSkills())
    dispatch(ResumeSearchStatus())
    // get value from redux store
    Axios({
      method: "get",
      url: apiurl + "get_Interview_Status",
    }).then((response) => {
      setoptionvalues(response.data.data.map((data) => ({
        name: data.status
      })))
    })

  }, [dispatch])

  function onSearch(params) {
    return (
      <></>
    )
  }

  return (
    <div>
      <div className="radioBoxContainer">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Resume</Radio>
          <Radio value={2}>Project</Radio>
          <Radio value={3}>HR</Radio>
          <Radio value={4}>Label 4</Radio>
          <Radio value={5}>Label 5</Radio>
          <Radio value={6}>Label 6</Radio>
        </Radio.Group>
      </div>

      <div className="searchBoxContainer">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Labelbox type="select" placeholder="Skills" dropdown={props.GetSkills.map((data)=>{return({id:data.skill_id,value:data.skill_name})})} />
          </Grid>
          <Grid item xs={3} >
            <Labelbox type="select" placeholder="Traits" />
          </Grid>
          <Grid item xs={3} >
            <Labelbox type="select" placeholder="Certifications" />
          </Grid>
          <Grid item xs={3} >
            <Labelbox type="select" placeholder="Achivements" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Labelbox type="select" placeholder="Specialization" />
          </Grid>
          <Grid item xs={3} >
            <Labelbox type="select" placeholder="Capabilities" />
          </Grid>
          <Grid item xs={3} >
            <Labelbox type="select" placeholder="Talents" />
          </Grid>
          <Grid container item xs={3} >
            <Grid item xs={9}>
              
              <Labelbox type="select" placeholder="Status" />
            </Grid>
            <Grid item xs={3}>
              <CustomButton btnName={"Go"} btnCustomColor="customPrimary" onBtnClick={onSearch} custombtnCSS={"goSearchbtn"} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />
    </div>
  )
}
const mapStateToProps = state => ({
  ResumeSearchStatus: state.ResumeSearchStatus,
  GetSkills:state.getSkills,
})

export default connect(mapStateToProps)(Search);


{/* <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />
            <div className="searchinterviewbtn"><Button onClick={() => setModelOpen(true)} >Interview Details</Button></div>
            <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} /> */}
