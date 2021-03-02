import React,{useState,useEffect} from "react";
import { Modal } from 'antd';
import LabelBox from '../../helpers/labelbox/labelbox'
import './search.scss'
import { Button } from "@material-ui/core";
import SelectionIcon from '../../images/select.svg'
import { Select, Row, Col } from 'antd'
import { Layout, Input, DatePicker, message,Space } from 'antd';
import CalenderIcon from '../../images/calender.svg'
import Axios from 'axios'
import {useDispatch,connect} from "react-redux";
import {apiurl} from '../../utils/baseUrl'
import { GetInterviewers } from "../../actions/GetInterviewersActions"
import { GetDesignation } from "../../actions/GetDesignationActions"
import ValidationLibrary from '../../helpers/validationfunction'



const { Option } = Select;




function DynModel(props){

    const [visible, setVisible] = React.useState(false);
    const [interviewerdata,setinterviewerdata]=useState([]);
    const [designationdata,setdesignationdata]=useState([]);
    const [Interviewschedule, setInterviewschedule] = useState({
        desgination: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        interviewer: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        }
    })

    function onChange(date, dateString) {
        console.log(date, dateString);
      }

    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
    }
    function checkValidation(data, key, multipleId) {
        console.log("key", key);
        console.log("data>>", data);
        // if(key==="supervisor_name"){

        //    Sup_nameGetId(data)
        // }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Interviewschedule[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Interviewschedule[key].validation
        }
        setInterviewschedule(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    React.useEffect(()=>{
        setVisible(props.handleChangeModel)
    },[props.handleChangeModel])
    const dispatch = useDispatch();
    useEffect(()=>{
            
        // dispatch(GetInterviewers())
        // get value from redux store
        console.log(props.GetInterviewers,"GetInterviewers")
        // console.log(optionvalues,"vbdfg")
        Axios({
          method:"get",
          url:apiurl+"get_interviewers",
      }).then((response)=>{
        let Interviewer=[]
        response.data.data.map((data,index)=>
        Interviewer.push({id:data.emp_id,value:data.name}))
        
        setinterviewerdata({Interviewer})
        
      })
    //   dispatch(GetDesignation())
      // get value from redux store
      console.log(props.GetDesignation,"GetDesignation")
      // console.log(optionvalues,"vbdfg")
      Axios({
        method:"get",
        url:apiurl+"get_s_tbl_m_designation",
    }).then((response)=>{
        let Designation=[]
        response.data.data.map((data,index)=>
        Designation.push({id:data.designation_id,value:data.designation}))
        
        setdesignationdata({Designation})

    }
    )
   
       
  },[dispatch])
  

    return(
        <Modal
        className="modelContainer"
        title={props.modelTitle}
        centered={props.centered ? true : false}
        visible={visible}
        footer={null}
        width={props.width ? props.width : 520}
        zIndex={1201}
        onCancel={handleCancel}
        >
            <div className="interviewdetailformdiv">
            <div className="interviewdetailform"><LabelBox type="select" placeholder={"Proposed Designation"} 
            dropdown={designationdata.Designation} 
            changeData={(data) => checkValidation(data, "desgination")}
            value={Interviewschedule.desgination.value} />
            </div>
            <div className="interviewdetailform"><LabelBox type="datepicker" placeholder={"Proposed Date"}/></div>
            <div className="interviewdetailform"><LabelBox type="select" placeholder={"Interviewer"}
            dropdown={interviewerdata.Interviewer} 
            changeData={(data) => checkValidation(data, "interviewer")}
            value={Interviewschedule.interviewer.value} />
            </div>
            <div className="interviewdetailsubmnit"><Button>Submit</Button></div>
            </div>
        </Modal>
    )
}

export default DynModel;