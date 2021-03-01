import React,{useState,useEffect} from 'react'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import {useDispatch,connect} from "react-redux";
import {GetEmployeeApprove} from '../../actions/EmployeeApproveAction'
import {apiurl} from '../../utils/baseUrl'
import Axios from 'axios'
import {notification} from 'antd'
import { BottomNavigationAction } from '@material-ui/core';
 function EmployeeApprove(props){
    const dispatch = useDispatch();
    const [employee,setemployee]=useState([])
  
    const [accept,setaccept]=useState(false)
    const [reject,setreject]=useState(false)
useEffect(()=>{
    Axios({
        method:"post",
        url:apiurl+"get_employee_approval",
        data:{
            emp_id:"3",
        }
    }).then((response)=>{
        console.log(response.data.data,"divya")
        setemployee(response.data.data.map((data)=>
            ({id:data.emp_id,name:data.name,designation:data.designation})
        ))
    })
      
},[dispatch])
const GetEmployee=()=>{
    Axios({
        method:"post",
        url:apiurl+"get_employee_approval",
        data:{
            emp_id:"3",
        }
    }).then((response)=>{
        console.log(response.data.data,"divya")
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
            "emp_id":"3",
            "approved_by":"3",
            "approved_date":"2021-02-21",
            "emp_status":accept?1:reject?2:"",
        },
    }).then((response)=>{
        console.log(response.data.msg,"data")
        GetEmployee()
        if(accept===true){
            notification.success({
                message: `Employee approved successfully`,
                placement: "topRight",
              });
        }
        if(reject===true){
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
            <Button onClick={()=>InsertEmployee("reject")}>Reject</Button>
            <Button onClick={()=>InsertEmployee("accept")}>Approve</Button>
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