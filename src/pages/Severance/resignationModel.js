import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import { Checkbox } from 'antd'
import {useDispatch,connect} from 'react-redux'
import moment from 'moment'
import {GetResignationApproval,InsertResignation,GetSeverance} from '../../actions/ExitSeveranceAction'
import './severance.scss';
import ValidationLibrary from "../../helpers/validationfunction";
import severance from './severance';

function ResignationApproveval(props) {
    const [modeltitles, setModeltitles] = useState()
    const [severanceData,setseveranceData]=useState([])
    const [Resignation,setResignation]=useState({
        accept_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        releive_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
    })
    let dispatch=useDispatch()
    useEffect(() => {
        setModeltitles(props.modelTitles)
        dispatch(GetResignationApproval(props.severanceId))
        dispatch(GetSeverance())
       
    }, [props.modelTitles,props.severanceId])
    useEffect(() => {
        props.GetResignation.map((data)=>{
            setseveranceData({
                empname:data.name===null?"-":data.name,
                designation:data.designation===null?"-":data.designation,
                department:data.department==null?"-":data.department,
                severanceId:data.severece_id,
                resignationDate:moment(data.date_of_resignation).format("DD-MMM-YYYY")
            })
        })
    },[props.GetResignation])
   console.log("props",props)
   function checkValidation(data, key) {
    var errorcheck = ValidationLibrary.checkValidation(
        data,
        Resignation[key].validation
    );
    let dynObj = {
        value: data,
        error: !errorcheck.state,
        errmsg: errorcheck.msg,
        validation: Resignation[key].validation,
    };
    setResignation((prevState) => ({
        ...prevState,
        [key]: dynObj,
    }));
}
   function ResignationApproval(name){
    var mainvalue = {};
    var targetkeys = Object.keys(Resignation);
    for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(
            Resignation[targetkeys[i]].value,
            Resignation[targetkeys[i]].validation
        );
        Resignation[targetkeys[i]].error = !errorcheck.state;
        Resignation[targetkeys[i]].errmsg = errorcheck.msg;
        mainvalue[targetkeys[i]] = Resignation[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => Resignation[obj].error == true);
    if(filtererr.length>0){
    }else{
       let status=false
       if(name==="accept"){
       status=true
       } if(name==="reject"){
        status=false
       }
       dispatch(InsertResignation(status,Resignation,props.GetResignation[0]&&props.GetResignation[0].employee_id,severanceData)).then(()=>{
           props.closemodal()
           HandleCancel()
       })
    }   
   }
   function HandleCancel(){
       let key=["accept_date","releive_date"]
       key.map((data)=>{
           Resignation[data].value=""
       })
   }
    return (
        <div>
            <div className="severancemodelsContainer">
                <div>
                    <div>Employee</div>
                    <div className="severanceData">{severanceData.empname}</div>
                </div>
                <div>
                    <div>Designation</div>
                    <div className="severanceData">{severanceData.designation}</div>
                </div>
                <div>
                    <div>Department</div>
                    <div className="severanceData">{severanceData.department}</div>
                </div>
                {props.TaskModelTitle === "Resignation Approval" &&
                    <div>
                        <div>Date of Resignation</div>
                        <div className="severanceData">{severanceData.resignationDate}</div>
                    </div>
                }
                {(props.TaskModelTitle==="HR NOC" || props.TaskModelTitle === "IT NOC" || props.TaskModelTitle === "ADMIN NOC") &&
                    <div>
                        <div>Noc</div>
                        <div><Checkbox /></div>
                    </div>}
            </div>



            { props.TaskModelTitle === "Resignation Approval" && <div className="ResigContent">
                <Grid item xs={12} container direction="row" spacing={3}>

                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Resignation accepted on</div>
                        <div>
                            <Labelbox type="datepicker" 
                            changeData={(data) =>
                                checkValidation(data, "accept_date")
                            }
                            value={Resignation.accept_date.value}
                            error={Resignation.accept_date.error}
                            errmsg={Resignation.accept_date.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Proposed date of relieving</div>
                        <div>
                            <Labelbox type="datepicker" 
                            changeData={(data) =>
                                checkValidation(data, "releive_date")
                            }
                            value={Resignation.releive_date.value}
                            error={Resignation.releive_date.error}
                            errmsg={Resignation.releive_date.errmsg}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className="appraisalBtn">
                    <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>ResignationApproval("reject")}/>
                    <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={()=>ResignationApproval("accept")}/>
                </div>

            </div>}
            {(props.TaskModelTitle==="HR NOC" || props.TaskModelTitle === "IT NOC" || props.TaskModelTitle === "ADMIN NOC") && <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>}


            { modeltitles === "Final Relieving" &&
                <>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>Date of resignation</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>Resignation accepted on</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>Proposed date for relieving</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                    </div>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>IT Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>HR Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                        <div>
                            <div>Admin Date of NOC</div>
                            <div className="severanceData">12-May-2021</div>
                        </div>
                    </div>

                    <div className="finalmodeldate">
                        <div className="appraisalFieldheading"> Actual Date of relieving</div>
                        <div>
                            <Labelbox type="datepicker" />
                        </div>
                    </div>

                    <div className="appraisalBtn">
                        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                        <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
                    </div>

                </>
            }


        </div >
    )
}
const mapStateToProps = state => (
    {
        GetResignation:state.ExitSeverance.getResignation,
        GetSeverance:state.ExitSeverance.GetSeverance
    }
)

    export default connect(mapStateToProps)(ResignationApproveval);