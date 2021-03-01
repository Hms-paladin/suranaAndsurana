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



const { Option } = Select;




function DynModel(props){

    const [visible, setVisible] = React.useState(false);
    const [optionvalues,setoptionvalues]=useState([]);
    const [optiondata,setoptiondata]=useState([]);

    function onChange(date, dateString) {
        console.log(date, dateString);
      }

    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
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
          setoptionvalues(response.data.data.map((data)=>({
                  name:data.name
        })))
      })
    //   dispatch(GetDesignation())
      // get value from redux store
      console.log(props.GetDesignation,"GetDesignation")
      // console.log(optionvalues,"vbdfg")
      Axios({
        method:"get",
        url:apiurl+"get_s_tbl_m_designation",
    }).then((response)=>{
        setoptiondata(response.data.data.map((data)=>({
                designation:data.designation
      })))
    })
       
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
            <div className="interviewdetailform"><LabelBox type="select" placeholder={"Proposed Designation"} /></div>
            <div className="interviewdetailform"><LabelBox type="datepicker" placeholder={"Proposed Date"}/></div>
            <div className="interviewdetailform"><LabelBox type="select" placeholder={"Interviewer"}/></div>
            <div className="interviewdetailsubmnit"><Button>Submit</Button></div>
            </div>
        </Modal>
    )
}

export default DynModel;