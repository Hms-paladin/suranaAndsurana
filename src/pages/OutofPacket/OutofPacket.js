import React,{useState,useEffect}from 'react'
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
import { notification,Spin } from "antd";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../helpers/validationfunction";
import { GetOpeSearch } from '../../actions/OutofPacketActions'
import { getEmployeeList} from '../../actions/MasterDropdowns'
import moment from 'moment'
function OutofPacket(props){
    let dispatch=useDispatch()
    const [attchOpen,setattchOpen]=useState(false)
    const [searchRights, setSearchRights] = useState([])
    const [OpeList,setOpeList]=useState([])
    const [PacketList,setPacketList]=useState([])
    const [spinner,setspinner]=useState(false)
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
        {ope:"Advance",date:"02-May-2021",expensetype:"",amount:"10,000.00",mop:"",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Travel",amount:"500.00",mop:"Credit Card",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Food",amount:"120.00",mop:"Cash",bill:"No",comment:<div className="comment_txt_pack"></div>},
        {ope:"Advance",date:"02-May-2021",expensetype:"",amount:"10,000.00",mop:"",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"></div>},
        {ope:"Expense",date:"02-May-2021",expensetype:"Stationery",amount:"1200.00",mop:"Cash",bill:<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,comment:<div className="comment_txt_pack"></div>},
    ]
    const [OpeSearch, setOpeSearch] = useState({
        from_date: {
          value: "",
          validation: [{name:"required"}],
          errmsg: null,
          error: null,
        },
        to_date: {
            value: "",
            validation: [{name:"required"}],
            errmsg: null,
            error: null,
          },
        employee: {
          value: "",
          validation: [{name:"required"}],
          errmsg: null,
          error: null,
          },
          total_advance:"-",
          total_expense:"-",
          balance:"-",
          fromDate:"-",
          ToDate:"-",

        })
        function checkValidation(data, key) {
           
            var errorcheck = ValidationLibrary.checkValidation(
              data,
              OpeSearch[key].validation
            );
            let dynObj = {
              value: data,
              error: !errorcheck.state,
              errmsg: errorcheck.msg,
              validation: OpeSearch[key].validation
            }
            setOpeSearch(prevState => ({
              ...prevState,
              [key]: dynObj,
            }));
        
          };
        ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let data_res_id = props.UserPermission.find((val) => { 
       return (
           "OPA/ Expenses - Search" == val.control 
       ) 
      })
      setSearchRights(data_res_id)

    }
    
    }, [props.UserPermission]);
    useEffect(() => {
        dispatch(getEmployeeList())
        // dispatch(GetOpeSearch(OpeSearch))
    },[])
    useEffect(() => {
        let employeeName=[]
        let PacketList=[]
        props.EmployeeList.map((data)=>{
            employeeName.push({id:data.emp_id,value:data.name})
        })
        props.OutOfPacket.length>0&&props.OutOfPacket.map((data)=>{
            PacketList.push({
                ope_type_id:data.ope_type,
                date:moment(data.date).format("DD-MMM-YYYY"),
                expanse_type:data.expence_type,
                amount:data.amount,
                mop:data.mode_of_payment,
                bill:data.bill===null?"No":<AttachmentIcon className="attch" onClick={()=>setattchOpen(true)}/>,
                description:data.description

            })
            OpeSearch.total_advance=data.Total_advance
            OpeSearch.total_expense=data.total_expense===null?"0":data.total_expense
            OpeSearch.balance=OpeSearch.total_advance-OpeSearch.total_expense
            OpeSearch.fromDate=moment(data.from_date).format("DD-MMM-YYYY")
            OpeSearch.ToDate=moment(data.to_date).format("DD-MMM-YYYY")
            setOpeSearch(prevState => ({
                ...prevState,
              }))
        })
        setOpeList({employeeName})
        setPacketList(PacketList)
       
    },[props.EmployeeList,props.OutOfPacket])

    const OpeSearchData=()=>{
  
        
          setspinner(true)
          HandleCancel()
          dispatch(GetOpeSearch(OpeSearch)).then((response)=>{
              StateClear()
              setspinner(false)
          })
      
       
        setOpeSearch(prevState => ({
            ...prevState,
          }))
         
    }
    const StateClear=()=>{
        let Key=["from_date","to_date","employee"]
        Key.map((data,index)=>{
            OpeSearch[data].value=""
        })
        setOpeSearch(prevState => ({
            ...prevState,
          }));
    }
    const HandleCancel=()=>{
      let Key=["fromDate","ToDate","total_expense","total_advance","balance"]
      Key.map((data,index)=>{
          OpeSearch[data]=""
      })
      setOpeSearch(prevState => ({
          ...prevState,
        }));
    }
    console.log("props",props)
    // console.log(searchRights,"rights")
    
    function rightsNotification(){
    notification.success({
        message: "You are not Authorized. Please Contact Administrator",
    });
    }
    /////////////

    return(
        <div className="parent_root_outpack">
             <div className="pack_master_h">Out of Pocket Advances / Expenses</div>
                <div className="parent_div_pack">
                <Grid container spacing={2} className="cont_parent_lib_grid">
                    <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="cont_lib_item_grid">
                        <Grid item xs={3}>
                            <Labelbox type="datepicker" labelname="From Date" 
                             
                              changeData={(data) => checkValidation(data, "from_date")}
                              value={OpeSearch.from_date.value}
                              error={OpeSearch.from_date.error}
                              errmsg={OpeSearch.from_date.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker" labelname="To Date" 
                             changeData={(data) => checkValidation(data, "to_date")}
                             value={OpeSearch.to_date.value}
                             error={OpeSearch.to_date.error}
                             errmsg={OpeSearch.to_date.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="select" labelname="Employee" 
                            dropdown={OpeList.employeeName}
                            changeData={(data) => checkValidation(data, "employee")}
                            value={OpeSearch.employee.value}
                            error={OpeSearch.employee.error}
                            errmsg={OpeSearch.employee.errmsg}
                            />
                        </Grid>
                        <Grid item xs={2} className="btn_grid_cont_pack">
                            <CustomButton btnName={"Search"}
                             custombtnCSS={"pack_btn_css"}
                             btnDisable={!searchRights||searchRights.display_control&&searchRights.display_control==='N'?true:false}
                              onBtnClick={OpeSearchData}
                               btnCustomColor="customPrimary"/>
                        </Grid>
                  </Grid> 
                  </Grid> 
                           <div className="div_pack_cont">
                           <div><div>From Date</div><div>{OpeSearch.fromDate?OpeSearch.fromDate:"-"}</div></div>
                    
                           <div><div>To Date</div><div>{OpeSearch.ToDate?OpeSearch.ToDate:"-"}</div></div>
                
                           <div><div>Total Advance</div> <div>{OpeSearch.total_advance?OpeSearch.total_advance:"-"}</div></div>
                       
                           <div><div>Total Expense</div><div>{OpeSearch.total_expense?OpeSearch.total_expense:"-"}</div></div>
                    
                           <div><div>Balance</div><div>{OpeSearch.balance?OpeSearch.balance:"-"}</div></div>
                           <NavLink to="/OpeExpense"><div className="div_ope"><img src={OPExp}/><div className="ope_text">OPE Expenses</div></div></NavLink> 
                           <NavLink to="/ope_advance"><div  className="div_ope"><img src={OPAdv}/><div className="ope_text">OPE Advances</div></div></NavLink> 
                           </div>
                       
                  <Spin spinning={spinner}>
                  <EnhancedTable headCells={Header}
                    rows={PacketList}
                    aligncss="aligncss" /> 
                    </Spin> 
                      <DynModel modelTitle={"Attached Bills"} handleChangeModel={attchOpen} handleChangeCloseModel={(bln) => setattchOpen(bln)} content={<AttachView />} width={600} />
                </div>
       </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    EmployeeList: state.getOptions.getEmployeeList,
    OutOfPacket:state.OutofPacket.OutofPacketList
});
export default connect(mapStateToProps) (OutofPacket);