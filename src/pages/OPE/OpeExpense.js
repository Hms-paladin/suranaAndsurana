import React,{useState,useEffect}from 'react'
import {Upload,Button,message, notification} from 'antd';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import { Checkbox, Collapse } from 'antd';
import CustomButton from '../../component/Butttons/button';
import './OpeAdvance.scss'
import { getProjectType,getProjectName,getClientlist} from '../../actions/MasterDropdowns'
import { getExpenseType ,getPaymentMode} from '../../actions/projectTaskAction'
import { InsertOpeExpenses } from '../../actions/OutofPacketActions'
import { useDispatch, connect } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import PublishIcon from '@material-ui/icons/Publish';
import ValidationLibrary from "../../helpers/validationfunction";
function OPE_Expense(props) {
    const [saveRights, setSaveRights] = useState([])
    const [ListItems,setListItems]=useState("")
    let dispatch=useDispatch()
    const [FileList,setFileList]=useState("")
    const [bill,setbill]=useState(false)
    const [Expenses,setExpenses]=useState({
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
            validation:[{name:"required"},{name:"allowNumaricOnly1"}],
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
    

const upload = {
    name: 'file',

    onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            setFileList(info.file.originFileObj?.name);
            console.log(FileList,"FileList");

            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};   
function onFileChange(e) {
    if(bill===false){
      notification.success({
          message:"Please check the bill then upload"
      })
    }
    else{
    setFileList(e.target.files[0])
    }
}  
// console.log("files",FileList)
    
useEffect(() => {
    dispatch(getProjectType())
    dispatch(getProjectName())
    dispatch(getClientlist())
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
        Client_list.push({id:data.client_id,value:data.client})
    })


    props.ExpenseType.map((data)=>{
        Expense.push({id:data.status_id,value:data.expense_type})
    })


    props.ModeOfPayment.map((data)=>{
        PaymentMode.push({id:data.status_id,value:data.payment_mode})
    })


    setListItems({Proj_Name,Project_type,Client_list,Expense,PaymentMode})


},[props.ProjectName,props.ProjectType,props.ClientName,props.ExpenseType,props.ModeOfPayment])
console.log("props",props)
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
            dispatch(InsertOpeExpenses(Expenses,FileList)).then(() => {
                handleCancel()
                setFileList([])
                setbill(false)
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
            <div style={{ fontSize: "20px", fontWeight: "600" }}>OPE</div>
            <div className="ope_container">
                <Grid item xs={12} spacing={2} container direction="row">
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
                    <Grid item xs={4} container direction="column">
                        <div>Client Name</div>
                        <Labelbox type="select"
                         dropdown={ListItems.Client_list}
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
                    {/* <Upload
                    {...upload}
                     action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    //  onChange={(info) => handleChange(info)}
                    //  fileList={FileList}
                     accept={'.jpg', '.pdf', '.png'}
                    //  customRequest={dummyRequest}
                    >
                      <Button icon={<PublishIcon />} className="ope_upload">Upload</Button>
                   </Upload>, */}
                   <div className="upload_div">
                    <div style={{width:"70%",backgroundColor:"#023e7d"}}>
                   
                        <input type="file" name="img" accept="image/*" style={{fontSize:"14px",color:"#fff"}}
                            onChange={onFileChange} id="img" /> <PublishIcon className="publish_ic"/>
                    </div>

                </div>
                    {/* <CustomButton btnName={"Upload"}  btnCustomColor="customPrimary" custombtnCSS="custom_save" /> */}
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
    ProjectName: state.getOptions.getProjectName||[],
    ProjectType : state.getOptions.getProjectType || [],
    ClientName:state.getOptions.getClientlist || [],
    ExpenseType:state.projectTasksReducer.expenseType || [],
    ModeOfPayment:state.projectTasksReducer.paymentMode || []
});
export default connect(mapStateToProps) (OPE_Expense);