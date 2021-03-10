import React,{useState,useEffect} from 'react'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import {useDispatch,connect} from "react-redux";
import {GetEmployeeApprove} from '../../actions/EmployeeApproveAction'
import {apiurl} from '../../utils/baseUrl'
import Axios from 'axios'
import CustomButton from '../../component/Butttons/button';
import {notification} from 'antd'
import { BottomNavigationAction } from '@material-ui/core';
 function EmployeeApprove(props){
    const dispatch = useDispatch();
    const [employee,setemployee]=useState([])
    const [resume_id,setresume_id]=useState("")
    const [accept,setaccept]=useState(false)
    const [reject,setreject]=useState(false)
useEffect(()=>{
    
    setresume_id(props.int_details_id)
    Axios({
        method:"post",
        url:apiurl+"get_employee_approval",
        data:{
            emp_id:props.emp_viewer_id&&props.emp_viewer_id.interviewer_id,
        }
    }).then((response)=>{
        console.log(response.data.data,"approve")
        setemployee(response.data.data.map((data)=>
            ({id:data.emp_id,name:data.name,designation:data.designation})
        ))
    })
      
},[dispatch,props])
const GetEmployee=()=>{
    Axios({
        method:"post",
        url:apiurl+"get_employee_approval",
        data:{
            emp_id:props.emp_viewer_id&&props.emp_viewer_id.interviewer_id
        }
    }).then((response)=>{
        console.log(response,"divya")
        setemployee(response.data.data.map((data)=>
            ({id:data.emp_id,name:data.name,designation:data.designation})
        ))
    })
}
const InsertEmployee=(data)=>{
    
    if(data==="accept"){
        setaccept(true)
        setreject(false)
    }
    if(data==="reject"){
        setaccept(false)
        setreject(true)
    }
    Axios({
        method:"post",
        url:apiurl+"insert_employee_status",
        data:{
            "emp_id":employee.id,
            "approved_by":"3",
            "approved_date":"2021-02-21",
            "emp_status":accept?1:reject?2:"",
        },
    }).then((response)=>{
        GetEmployee()
        if(data==1){
            notification.success({
                message: `Employee approved successfully`,
                placement: "topRight",
              });
        }
        if(data==2){
            notification.warning({
                message: `Employee rejected`,
                placement: "topRight",
              });
        }
     
    })
    props.closemodal()
}
    return(
        <div>
            {employee.map((data)=>
            <div>
        <Labelbox type="text" placeholder="Employee Id" value={data.id}/>
        <Labelbox type="text" placeholder="Employee N" value={data.name}/>
         <Labelbox type="text" placeholder="Designation" value={data.designation}/> 
        <div className="employeeform_save">
            <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="int_btn_save" onBtnClick={()=>InsertEmployee("reject")} />
            <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="int_btn_save" onBtnClick={()=>InsertEmployee("accept")} />
            </div>
            </div>
            )}
           
        </div>
    )
}
const mapStateToProps = state => ({
    GetEmployeeApprove: state.getemployee
  })
  
  
export default connect(mapStateToProps)(EmployeeApprove);