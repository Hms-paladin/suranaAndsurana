import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './search.scss'
import { Radio,Select} from 'antd';
import EnhancedTable from './table'
import DynModel from './model' 
import {apiurl} from '../../utils/baseUrl'
import {useDispatch,connect} from "react-redux";
import { ResumeSearchStatus } from "../../actions/ResumeSearchAction"
import Axios from 'axios'
import SelectionIcon from '../../images/select.svg'

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
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
  {name:'Ranjith', age:23,gender:"male",basic:"BE",language:'tamil',certification:"-",specialization:"Nil",acheivements:'none',talents:"coder"},
];
function Search(props){
    const [value, setValue] = React.useState(1);
    const [ modelOpen, setModelOpen ] = useState(false)
    const dispatch = useDispatch();
    const [optionvalues,setoptionvalues]=useState([]);
    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    }
    useEffect(()=>{
            
      dispatch(ResumeSearchStatus())
      // get value from redux store
      console.log(props.ResumeSearchStatus,"ResumeSearchStatus")
      // console.log(optionvalues,"vbdfg")
      Axios({
        method:"get",
        url:apiurl+"get_Interview_Status",
    }).then((response)=>{
        setoptionvalues(response.data.data.map((data)=>({
                name:data.status
      })))
    })
     
},[dispatch])

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
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Skills</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Traits</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Certifications</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Acheivements</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>

               </div>
               <div className="searchfilterflex2">
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Specialization</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Capabilities</span> <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Talents</span><Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >

                            </Select></div>
                  <div className="searchfilterdrpdwn"><span className="dropdown_title">Status</span>
                  <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >
                               {optionvalues.map((data,index)=>(
                    <Option value={data.name} key={index}>{data.name}</Option>))} 
                            </Select></div>
                <Button>Go</Button>
               </div>

           </div>
           <EnhancedTable headCells={headCells} rows={rows} tabletitle={""}  />
           <div className="searchinterviewbtn"><Button onClick={()=>setModelOpen(true)} >Interview Details</Button></div>
           <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />

                      
        </div>
    )
}
const mapStateToProps = state => ({
  ResumeSearchStatus: state.ResumeSearchStatus
})

export default connect(mapStateToProps)(Search);