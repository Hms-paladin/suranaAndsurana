import React,{useState,useEffect}from 'react'
import {Upload,Button,message, notification} from 'antd';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox, Collapse } from 'antd';
import CustomButton from '../../component/Butttons/button';
import './OpeAdvance.scss'
import { getProjectType} from '../../actions/MasterDropdowns'
import { getExpenseType ,getPaymentMode} from '../../actions/projectTaskAction'
import { InsertOpeExpenses,GetOpeProjectType,ProjectBased_ClientName} from '../../actions/OutofPacketActions'
import { useDispatch, connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import PublishIcon from '@material-ui/icons/Publish';
import ValidationLibrary from "../../helpers/validationfunction";
import moment from 'moment'

function OPE_Expense(props) {
    const [saveRights, setSaveRights] = useState([])
    const [ListItems,setListItems]=useState("")
    let dispatch=useDispatch()
    const [FileList,setFileList]=useState("")
    const [bill,setbill]=useState(false)
    const [disable,setdisable]=useState(false)
    const [minDate,setminDate]=useState("")
    const [Expenses,setExpenses]=useState({
        date: {
            value: moment().format("YYYY-MM-DD"),
            validation: [{name:"required"}],
            errmsg: null,
            error: null,
          },
        project_type:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },
        project_name:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },
        client:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },
        expense:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },
        modeofpayment:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },
        amount:{
            value:"",
            validation:[{name:"required"}, { name: "custommaxLength", "params": "15" }, { name: "allowNumaricOnly" }],
            errmsg:null,
            error:null
        },
        description:{
            value:"",
            validation:[{name:"required"}],
            errmsg:null,
            error:null
        },

    })   
function onFileChange(e) {
  
    setFileList(e.target.files[0])
    
}  
const Notification=()=>{
    if(bill){
        onFileChange()
      }
      else{
        notification.warning({
            message:"Please check the bill then upload"
        })
      }
}
// console.log("files",FileList)
    
useEffect(() => {
    dispatch(getProjectType())
    dispatch(getExpenseType())
    dispatch(getPaymentMode())
},[])
useEffect(() => {
    let Proj_Name=[]
    let Client_list=[]
    let Project_type=[]
    let Expense=[]
    let PaymentMode=[]
    props.ProjectName.map((data)=>{
        Proj_Name.push({id:data.project_id,value:data.project_name})
    })


    props.ProjectType.map((data)=>{
        Project_type.push({id:data.project_type_id,value:data.project_type})
    })


    props.ClientName.map((data)=>{
        setdisable(true)
        setExpenses((prevState)=>({
            ...prevState,
            client:{value:data.client,id:data.client_id}
        }))
    })


    props.ExpenseType.map((data)=>{
        Expense.push({id:data.status_id,value:data.expense_type})
    })


    props.ModeOfPayment.map((data)=>{
        PaymentMode.push({id:data.status_id,value:data.payment_mode})
    })


    setListItems({Proj_Name,Project_type,Client_list,Expense,PaymentMode})


},[props.ProjectName,props.ProjectType,props.ClientName,props.ExpenseType,props.ModeOfPayment])
console.log("props",Expenses.client.id)
        ///***********user permission**********/
useEffect(() => {
    if(props.UserPermission.length>0&&props.UserPermission){
       let  data_res_id = props.UserPermission.find((val) => { 
        return (
            "OPA/ Expenses- OPE - Save" == val.control 
        ) 
       })
       setSaveRights(data_res_id)

    }
    
    }, [props.UserPermission]);
    function checkValidation(data, key) {
       if(key==="project_type"){
        dispatch(GetOpeProjectType(data))
       }
       if(key==="project_name"){
           Expenses.client.value=""
           dispatch(ProjectBased_ClientName(data))
       }

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Expenses[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Expenses[key].validation,
        };

        setExpenses((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Expenses);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Expenses[targetkeys[i]].value,
                Expenses[targetkeys[i]].validation
            );
            Expenses[targetkeys[i]].error = !errorcheck.state;
            Expenses[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Expenses[targetkeys[i]].value;
        }

        var filtererr = targetkeys.filter(
            (obj) => Expenses[obj].error == true
        );
        if (filtererr.length > 0) {

        } else {
            dispatch(InsertOpeExpenses(Expenses,FileList,props.location.state)).then(() => {
                handleCancel()
                setFileList("")
                setbill(false)
                setdisable(false)
            })
        }

        setExpenses((prevState) => ({
            ...prevState,
        }));
    }
    const handleCancel=()=>{
        let Key=["project_type","project_name","client","expense","amount","modeofpayment","description"]
        Key.map((data)=>{
            Expenses[data].value=""
        })
        setExpenses((prevState) => ({
            ...prevState,
        }));
    }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

    return (
        <div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>OP Expenses</div>
            <div className="ope_container">
                <Grid item xs={12} spacing={2} container direction="row">

                <Grid item xs={4} direction="column">
                            <Labelbox type="datepicker" labelname="Date" 
                              //  maxDate={Expenses.to_date.value}
                               maxDate={new Date()}
                              changeData={(data) => checkValidation(data, "date")}
                              value={Expenses.date.value}
                              error={Expenses.date.error}
                              errmsg={Expenses.date.errmsg}
                            />
                        </Grid>


                    <Grid item xs={4} container direction="column">
                        <div>Project Type</div>
                        <Labelbox type="select"
                        dropdown={ListItems.Project_type}
                        changeData={(data) => checkValidation(data, "project_type")}
                        value={Expenses.project_type.value}
                        error={Expenses.project_type.error}
                        errmsg={Expenses.project_type.errmsg}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Project Name</div>
                        <Labelbox type="select"
                        dropdown={ListItems.Proj_Name}
                        changeData={(data) => checkValidation(data, "project_name")}
                        value={Expenses.project_name.value}
                        error={Expenses.project_name.error}
                        errmsg={Expenses.project_name.errmsg}
                        />
                    </Grid>
                    </Grid>
                    <Grid item xs={12} spacing={2} container direction="row">
                    <Grid item xs={4} container direction="column">
                        <div>Client Name</div>
                        <Labelbox type="text"
                        //  dropdown={ListItems.Client_list}
                         disabled={disable}
                         changeData={(data) => checkValidation(data, "client")}
                         value={Expenses.client.value}
                         error={Expenses.client.error}
                         errmsg={Expenses.client.errmsg}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Expense Type</div>
                        <Labelbox type="select"
                        dropdown={ListItems.Expense}
                        changeData={(data) => checkValidation(data, "expense")}
                         value={Expenses.expense.value}
                         error={Expenses.expense.error}
                         errmsg={Expenses.expense.errmsg}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Amount</div>
                        <Labelbox type="text"
                         changeData={(data) => checkValidation(data, "amount")}
                         value={Expenses.amount.value}
                         error={Expenses.amount.error}
                         errmsg={Expenses.amount.errmsg}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column">
                        <div>Mode of Payment</div>
                        <Labelbox type="select"
                        dropdown={ListItems.PaymentMode}
                        changeData={(data) => checkValidation(data, "modeofpayment")}
                        value={Expenses.modeofpayment.value}
                         error={Expenses.modeofpayment.error}
                         errmsg={Expenses.modeofpayment.errmsg}
                        />
                    </Grid>
                </Grid>
                <div className="bill_contianer">
                    <div>BILL <Checkbox checked={bill} onChange={()=>setbill(!bill)}/></div>
                   {bill?
                   <div className="upload_div">
                    <div style={{width:"70%",backgroundColor:"#023e7d"}}>
                   
                        <input type="file" name="img" accept="image/*" style={{fontSize:"14px",color:"#fff"}}
                            onChange={onFileChange} id="img" /> <PublishIcon className="publish_ic"/>
                    </div>

                   </div>:
                    <CustomButton btnName={"Upload"}  btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={Notification}/>
                   }
                </div>
                <div className="des_grid">
                    <Grid item xs={6} spacing={2}>
                        <div>Description</div>
                        <Labelbox type="textarea"
                         changeData={(data) => checkValidation(data, "description")}
                         value={Expenses.description.value}
                         error={Expenses.description.error}
                         errmsg={Expenses.description.errmsg}
                        />
                    </Grid>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CustomButton btnName={"Save"}  btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} 
                    btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    EmployeeList: state.getOptions.getEmployeeList||[],
    ProjectName: state.OutofPacket.projectTypebase_projectName||[],
    ProjectType : state.getOptions.getProjectType || [],
    ClientName:state.OutofPacket.projectNameBased_ClientName || [],
    ExpenseType:state.projectTasksReducer.expenseType || [],
    ModeOfPayment:state.projectTasksReducer.paymentMode || []
});
export default connect(mapStateToProps) (OPE_Expense);