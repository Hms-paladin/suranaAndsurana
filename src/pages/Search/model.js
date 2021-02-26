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
            <div className="interviewdetailform">
            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Proposed Designation" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >
                             {optiondata.map((data,index)=>(
                    <Option value={data.designation} key={index}>{data.designation}</Option>))} 
                            </Select>
            </div>
            <div className="interviewdetailform">
            <DatePicker suffixIcon={<img src={CalenderIcon} className="DateInput_svg" />} onChange={onChange} placeholder="Proposed Date"  className="DatePicker_View" />
 
            </div>
            <div className="interviewdetailform">
            <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch
                                placeholder="Interviewer" optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                className="SelectionInput"  >
                             {optionvalues.map((data,index)=>(
                    <Option value={data.name} key={index}>{data.name}</Option>))} 
                            </Select>
            </div>
            <div className="interviewdetailsubmnit"><Button>Submit</Button></div>
            </div>
        </Modal>
    )
}

export default DynModel;