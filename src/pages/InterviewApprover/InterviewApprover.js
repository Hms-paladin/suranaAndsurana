import React,{useState,useEffect} from 'react'
import Back from '../../images/Vector.svg'
import './InterviewApprover.scss'
import EnhancedTable from "../../component/DynTable/table";
import DynModel from "../../component/Model/model";
import { Grid } from "@material-ui/core";
import { BackTop, Select,Input} from 'antd';
import Eyes from '../../images/neweye.svg'
import {useDispatch,connect} from "react-redux";
import Approve from '../../images/APPROVE.png'
import SelectionIcon from '../../images/select.svg'
import Axios from 'axios';
export default function InterviewApprover(){
const { Option } = Select;

const rows = [
    {date:'11-Jan-2020', score:45,cmts:"Comments about the candiates",viewer:"Ranjith"},
    {date:'11-Jan-2020', score:45,cmts:"Comments about the candiates",viewer:"Ranjith"},
    {date:'11-Jan-2020', score:45,cmts:"Comments about the candiates",viewer:"Ranjith"},

];
    const Header = [
        {  label: 'Date' },{  label: 'Initial Score' },{  label: 'Comments' },{  label: 'Interviewer' }
     ];
        
     const [ modelOpen, setModelOpen ] = useState(false)
//   interview dropdown api function

const [optionvalues,setoptionvalues]=useState([]);
const dispatch = useDispatch();
useEffect(()=>{
        let values=[]
        Axios({
            method:"get",
            url:"http://54.198.55.249:8159/api/v1/get_interviewers",
        }).then((response)=>{
            setoptionvalues(response.data.data.map((data)=>({
                    name:data.name,id:data.emp_id
          })))
        })
        setoptionvalues(values)
        console.log(optionvalues,"data")


},[dispatch])
    return(
        <div className="interviewapprove_root">
            {/* <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} contents={<div>sdfghjkl</div>}> */}
                <div><img src={Back} style={{width:"30px"}}/></div>
                <div className="interview_head">

                    <div><label>Interview Id:3</label></div>
                    <div><label>Designation:Attorney</label></div>
                </div>
                <EnhancedTable headCells={Header} rows={rows}/>
                <Grid item xs={12} container direction="row" justify="center" alignItems="center" className="interviewstatus" >
                <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Interview Status"
                    optionFilterProp="children" filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    className="SelectionInput" style={{ width: "40%" }} 
                    >
                 {optionvalues.map(data=>(
                    <Option value={data.name} key={data.id}>{data.name}</Option>))} 
                </Select>

            </Grid>
            <Grid item xs={12} spacing={1} container direction="row" justify="center" alignItems="center" className="interviewScore">
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <Input placeholder="Initial Score"  style={{height:"70px",width:"60%"}}/>
                </Grid>
                <Grid item xs={6} className="ContainerInput" container direction="row" justify="center">
                    <Input placeholder="comment"  style={{height:"80px",width:"100%"}}/>
                </Grid>
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <div className="interviewapprove"><img src={Approve}/>Approve</div>
                </Grid>


            </Grid>
            {/* </DynModel> */}
        </div>
    )
}
