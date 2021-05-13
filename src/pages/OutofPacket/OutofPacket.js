import React,{useState}from 'react'
import './OutofPacket.scss'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table'
import AttachmentIcon from '@material-ui/icons/Attachment';
import OPExp from "../../images/dashboard/opexp.svg";
import OPAdv from "../../images/dashboard/opadv.svg";
import DynModel from '../../component/Model/model'
import AttachView from './AttachView'
import {NavLink} from 'react-router-dom'
export default function OutofPacket(){
    const [attchOpen,setattchOpen]=useState(false)
    const Header=[
        {id:"ope",label:"OPE/OPA"},
        {id:"date",label:"Date"},
        {id:"expensetype",label:"Expense Type"},
        {id:"amount",label:"Amount"},
        {id:"mop",label:"MOP"},
        {id:"bill",label:"Bill"},
        {id:"comment",label:"Comment"}
    ]
    const Rows=[
        {ope:"Advance",date:"02-May-2021",expensetype:"",amount:"10,000.00",mop:"",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"><Labelbox type="text" placeholder="Type your comment ..."/></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Travel",amount:"500.00",mop:"Credit Card",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"><Labelbox type="text" placeholder="Type your comment ..."/></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Food",amount:"120.00",mop:"Cash",bill:"No",comment:<div className="comment_txt_pack"><Labelbox type="text" placeholder="Type your comment ..."/></div>},
        {ope:"Advance",date:"02-May-2021",expensetype:"",amount:"10,000.00",mop:"",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"><Labelbox type="text" placeholder="Type your comment ..."/></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Stationery",amount:"1200.00",mop:"Cash",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"><Labelbox type="text" placeholder="Type your comment ..."/></div>},
    ]
    return(
        <div className="parent_root_outpack">
             <div className="pack_master_h">Out of Pocket Advances / Expenses</div>
                <div className="parent_div_pack">
                <Grid container spacing={2} className="cont_parent_lib_grid">
                    <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="cont_lib_item_grid">
                        <Grid item xs={3}>
                            <Labelbox type="datepicker" labelname="From Date" />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker" labelname="To Date" />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select" labelname="Employee" />
                        </Grid>
                        <Grid item xs={2} className="btn_grid_cont_pack">
                            <CustomButton btnName={"Search"}
                             custombtnCSS={"pack_btn_css"} onBtnClick={""} btnCustomColor="customPrimary"/>
                        </Grid>
                  </Grid> 
                  </Grid> 
                           <div className="div_pack_cont">
                           <div><div>e</div><div>11-Mar-2021</div></div>
                    
                           <div><div>To Date</div><div>30-Mar-2021</div></div>
                
                           <div><div>Total Advance</div> <div>20,000</div></div>
                       
                           <div><div>Total Expense</div><div>1,820</div></div>
                    
                           <div><div>Balance</div><div>18,180</div></div>
                           <NavLink to="/OpeExpense"><div className="div_ope"><img src={OPExp}/><div className="ope_text">OPE Expenses</div></div></NavLink> 
                           <NavLink to="/ope_advance"><div  className="div_ope"><img src={OPAdv}/><div className="ope_text">OPE Advances</div></div></NavLink> 
                           </div>
                       
                 
                  <EnhancedTable headCells={Header}
                    rows={Rows}
                    aligncss="aligncss" />  
                      <DynModel modelTitle={"Attached Bills"} handleChangeModel={attchOpen} handleChangeCloseModel={(bln) => setattchOpen(bln)} content={<AttachView />} width={600} />
                </div>
       </div>
    )
}