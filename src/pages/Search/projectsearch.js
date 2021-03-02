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
function Projectsearch(props){
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
           
           </div>
           <div className="searchfilterflex">
               <div className="searchfilterflex1">
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="client type"/>
                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="client"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="project type"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="project name"/>

                  </div>
                  <div className="projsearchfilterdrpdwn">
                  <Labelbox type="select" placeholder="billing type"/>

                  </div>
                  <Button >Go</Button>

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

export default connect(mapStateToProps)(Projectsearch);