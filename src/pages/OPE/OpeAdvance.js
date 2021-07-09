import React,{useState,useEffect}from 'react'
import { Input, Icon } from 'antd';
import './OpeAdvance.scss'
import Dollar from '../../images/dollar.svg'
import CustomButton from '../../component/Butttons/button'
import Divider from '@material-ui/core/Divider';
import { useDispatch, connect } from "react-redux";
import { GetOpeAdvance,InsertOpeAdvance} from '../../actions/OutofPacketActions'
function OPE(props) {
    let dispatch=useDispatch()
    const [saveRights, setSaveRights] = useState([])
    const [OpeDetails,setOpeDetails]=useState([])
    const [Advance_amt,setAdvance_amt]=useState("")
    const [Error,setError]=useState("")
    ///***********user permission**********/
useEffect(() => {
if(props.UserPermission.length>0&&props.UserPermission){
   let  data_res_id = props.UserPermission.find((val) => { 
    return (
        "OPA/ Expenses- OPA - Save" == val.control 
    ) 
   })
   setSaveRights(data_res_id)

   
}

}, [props.UserPermission]);
const OnChangeData=(e)=>{
    // setError(false)
    setAdvance_amt(e.target.value)
    var re = /^(?=.*?[1-9])[0-9()-]+$/;
    if(re.test(Advance_amt)){
        setError("")
    }
    else{
        setError("Please Enter Numeric Value Only")
    }
}
const SubmitAdvanceAmt=()=>{
    if(Advance_amt===""){
        setError("Please Enter Advance Amount")
    }else{
  dispatch(InsertOpeAdvance(Advance_amt)).then((data)=>{
  })
}
setAdvance_amt("")

}
console.log("setAdvance_amt",Advance_amt)


useEffect(() => {
    dispatch(GetOpeAdvance())
},[])
useEffect(() => {
    let AdvanceData=[]
    props.OpeAdvance.map((data)=>{
        AdvanceData.push(data)
    })
    setOpeDetails(AdvanceData)
},[props.OpeAdvance])
console.log("setOpeDetails",OpeDetails)
////////
    return (
        <div>
            <div className="lib_master_h">OP Advances</div>
            <div className="parent_div_ope">
                <div className="noposition">
                    <div><div>Employee</div><div>{OpeDetails[0]?.name}</div></div>
                    <div><div>Designation</div><div>{OpeDetails[0]?.designation}</div></div>
                    <div><div>Department</div><div>{OpeDetails[0]?.department}</div></div>
                </div>
                <Divider />
                <div className="noposition_snd">
                    <div><div>Current Advance Amount</div><div>₹ {OpeDetails[0]?.advance_amount}</div></div>
                    <div><div>Amount Spent</div><div>₹ {OpeDetails[0]?.amount_spent===null?"0":OpeDetails[0]?.amount_spent}</div></div>
                    <div><div>Balance</div><div>₹ {OpeDetails[0]?.balance===null?"0":OpeDetails[0]?.balance}</div></div>
                </div>

                <div className="advance_amt">
                    <div>Advance Amount</div>
                    <Input prefix={<img src={Dollar}/>} style={{ width: "40%" }} onChange={OnChangeData} value={Advance_amt}/>
                    <div style={{color:"red",fontSize:"13px",marginTop:"5px"}}>{Error?Error:""}</div>
                </div>
                <div className="ope_advance_btns">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary"  btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} custombtnCSS="ope_save"   onBtnClick={SubmitAdvanceAmt}/>
                    <CustomButton btnName={"Cancel"} custombtnCSS="ope_save" onBtnClick={()=>setAdvance_amt("")}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
    OpeAdvance:state.OutofPacket.Ope_advance
});
export default connect(mapStateToProps) (OPE);