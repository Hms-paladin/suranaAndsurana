import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Buttons/button';
import './employeeFeedback.scss';
import { Checkbox } from 'antd'
import { notification } from "antd";
import { useDispatch, connect } from "react-redux";
import react, { useState,useEffect } from 'react';
import {InsertFeedback} from '../../actions/ExitSeveranceAction'
import ValidationLibrary from "../../helpers/validationfunction";
function EmployeeFeedback(props) {


    let dispatch=useDispatch()

    const [feedback,setfeedback]=useState([
        {id:1,value:false,name:"Compensation"}, {id:2,value:false,name:"New job"},{id:3,value:false,name:"Personal Reasons"},
        {id:4,value:false,name:"Relocation"},{id:5,value:false,name:"Conflict with works"},{id:6,value:false,name:"Retirement"},
        {id:7,value:false,name:"Benefits"},{id:8,value:false,name:"Others"},
    ])
    const [checked,setchecked]=useState({})
    const [feedbackInput,setfeedbackInput]=useState({
        feedback:{
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        compansation:{
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        }
    })

    const handlecheck=(e)=>{
      setchecked({...checked,[e.target.name]:e.target.checked})
       
      setchecked(prevState =>({
      ...prevState,
    }))
    
    }
    function checkValidation(data, key) {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            feedbackInput[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: feedbackInput[key].validation,
        };
        setfeedbackInput((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const submit=()=>{
        let feedbackId=Object.keys(checked)
        const feedbackDataId=feedbackId.toString()
        var mainvalue = {};
    var targetkeys = Object.keys(feedbackInput);
    for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(
            feedbackInput[targetkeys[i]].value,
            feedbackInput[targetkeys[i]].validation
        );
        feedbackInput[targetkeys[i]].error = !errorcheck.state;
        feedbackInput[targetkeys[i]].errmsg = errorcheck.msg;
        mainvalue[targetkeys[i]] = feedbackInput[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => feedbackInput[obj].error == true);
    if(filtererr.length>0){
        
    }else{
          dispatch(InsertFeedback(feedbackInput,feedbackDataId)).then(()=>{
            HandleCancel()
            
          })
    }
   
    setfeedbackInput(prevState =>({
        ...prevState,
      }))
      setchecked({})
         
    }
    function HandleCancel(){
        let key=["feedback","compansation"]
        key.map((data)=>{
            feedbackInput[data].value=""
        })
        setfeedbackInput((prevState) => ({
         ...prevState,
        }));
        setchecked({})
    }

    const [saveRights, setSaveRights] = useState([])

    ///***********user permission**********/
useEffect(() => {
   if(props.UserPermission.length>0&&props.UserPermission){
      let data_res_id = props.UserPermission.find((val) => { 
      return (
          "Employee Feedback - Save" == val.control
      ) 
     })
     setSaveRights(data_res_id)
  }
 
  }, [props.UserPermission]);
 

 /////////////
    return (
        <div>
           
            <div className="headerpage">Employee Feedback</div>
            <div className="fbContainer">
                <div className="feedbackSubheading">Which of the following influenced your decision to leave the company?  </div>
                <div className="checkboxChooser">
                    {feedback.map((data,index)=>
                
                    <div key={index}>
                        <Checkbox checked={checked[data.name]} onChange={handlecheck} name={data.name} value={data.id}/>
                        <div>{data.name}</div>
                    </div>
                    
                    )}
                    

                </div>
                <div className="feedbackSubheading">How do you feel about the following?</div>
                <Grid item xs={12} container direction="row" spacing={1} className="cmdbox">
                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Work Environment</div>
                        <div className="reasonBoxseverance">
                            <div className="reasonsSeverance">
                                <Labelbox type="textarea"
                                  changeData={(data) =>
                                    checkValidation(data, "feedback")
                                }
                                value={feedbackInput.feedback.value}
                                error={feedbackInput.feedback.error}
                                errmsg={feedbackInput.feedback.errmsg}
                                />
                            
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Compensation</div>
                        <div className="reasonBoxseverance">
                            <div className="reasonsSeverance">
                                <Labelbox type="textarea"
                                   changeData={(data) =>
                                    checkValidation(data, "compansation")
                                }
                                value={feedbackInput.compansation.value}
                                error={feedbackInput.compansation.error}
                                errmsg={feedbackInput.compansation.errmsg}
                            
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="feedbacbtn">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" btnDisable={!saveRights||saveRights.display_control&&saveRights.display_control==='N'?true:false} onBtnClick={submit} />
                    <CustomButton btnName={"Cancel"} onBtnClick={HandleCancel} custombtnCSS="custom_save" />
                </div>


            </div>
          

    </div>
    )
}
const mapStateToProps = (state) =>
({
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps) (EmployeeFeedback);