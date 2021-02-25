import { Button } from "@material-ui/core";
import React,{useState} from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './search.scss'
import { Radio } from 'antd';
import EnhancedTable from './table'
import DynModel from './model' 

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
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
];
function Search(){
    const [value, setValue] = React.useState(1);
    const [ modelOpen, setModelOpen ] = useState(false)


    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    }
    return(
        <div>
           <div className="searchflex1">
           <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>Resume</Radio>
      <Radio value={2}>Project</Radio>
      <Radio value={3}>HR</Radio>
      <Radio value={4}>Label 4</Radio>
      <Radio value={5}>Label 5</Radio>
      <Radio value={6}>Label 6</Radio>

    </Radio.Group>
           </div>
           <div className="searchfilterflex">
               <div className="searchfilterflex1">
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>

               </div>
               <div className="searchfilterflex2">
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Labelbox type="select"/></div>
                <Button>Go</Button>
               </div>

           </div>
           <EnhancedTable headCells={headCells} rows={rows} tabletitle={"tests"}  />
           <div className="searchinterviewbtn"><Button onClick={()=>setModelOpen(true)} >Interview Details</Button></div>
           <DynModel modelTitle={"Candidate's Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />

                      
        </div>
    )
}

export default Search;