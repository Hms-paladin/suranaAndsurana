import react,{useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from '../../helpers/validationfunction';
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import { InesertInterviewDetails } from "../../actions/InterviewDetailsAction";
import {getInterviewApprover,getDesignationList} from "../../actions/MasterDropdowns";

const HrInterviewModel=(props)=> {
    const dispatch = useDispatch();
    const[roundDropdownValues,setroundDropdownValues] =useState({})
    const [interviewerdata, setinterviewerdata] = useState([]);
    const [interviewApprover, setInterviewApprover] = useState([]);
    const [finalRound, setFinalRound] = useState(false);
    const [designationdata, setdesignationdata] = useState([]);
    const [Interviewschedule, setInterviewschedule] = useState({
        desgination: {
            value: props.selectedDesignationID,
            validation: [],
            error: null,
            errmsg: null,
        },
        interviewer: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        propsedDate: {
            value: "",
            validation: [{ "name": "required" },{ "name": "futureDate" }],
            error: null,
            errmsg: null,
        },round: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        }
    })
    useEffect(()=> {
        Axios({
            method: 'GET',
            url: apiurl +'get_round',
        }).then((response) => {
                    let hr_round = []
                response.data.data.map((data, index) =>
                hr_round.push({ 
                    id: data.status_id,
                    value: data.status
                  
                   })
                )
                setroundDropdownValues({hr_round})
        })
        Axios({
            method: "GET",
            url: apiurl + "get_s_tbl_m_designation",
        }).then((response) => {
            let Designation = []
            response.data.data.map((data, index) =>
                Designation.push({ id: data.designation_id, value: data.designation }))
    
            // setdesignationdata({ Designation })

            Axios({
                method: "get",
                url: apiurl + "get_interviewers",
            }).then((response) => {
                let Interviewer = []
                response.data.data.map((data, index) =>
                    Interviewer.push({ id: data.emp_id, value: data.name }))
                setinterviewerdata({ Interviewer })
    
            })
    }, [dispatch])

},[])
// 
useEffect(() => {
dispatch(getDesignationList());
dispatch(getInterviewApprover());
}
,[])
// 
useEffect(() => {
    let InterviewApprover = []
    props.getInterviewApprover.map((data, index) =>
    InterviewApprover.push({ id: data.emp_id, value: data.name }))
        setInterviewApprover({ InterviewApprover })

        let Designation = []
        props.getDesignationList.map((data, index) =>
        Designation.push({ id: data.designation_id, value: data.designation })
      )
      setdesignationdata({ Designation })
    }
    ,[props.getInterviewApprover, props.getDesignationList])
// ____________________

function checkValidation(data, key, multipleId) {

    if(data==27 && key ==="round"){
        setFinalRound(true)
    }else{
        setFinalRound(false)
      }
    var errorcheck = ValidationLibrary.checkValidation(
        data,
        Interviewschedule[key].validation
    );
    let dynObj = {
        value: data,
        error: !errorcheck.state,
        errmsg: errorcheck.msg,
        validation: Interviewschedule[key].validation
    }

    setInterviewschedule(prevState => ({
        ...prevState,
        [key]: dynObj,
    }));
}

function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(Interviewschedule);
    for (var i in targetkeys) {
        var errorcheck = ValidationLibrary.checkValidation(
            Interviewschedule[targetkeys[i]].value,
            Interviewschedule[targetkeys[i]].validation
        );
        Interviewschedule[targetkeys[i]].error = !errorcheck.state;
        Interviewschedule[targetkeys[i]].errmsg = errorcheck.msg;
        mainvalue[targetkeys[i]] = Interviewschedule[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
        (obj) => Interviewschedule[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
    } else {
        dispatch(InesertInterviewDetails(Interviewschedule,props.selectedId)).then(()=>{
            stateClear()
            // props.handleChangeCloseModel(false)
        })
    }

    setInterviewschedule(prevState => ({
        ...prevState
    }));
};
const stateClear = () => {
 
    let Form_key = [
      "desgination",
    "interviewer",
    "propsedDate","round"
   ];

    Form_key.map((data) => {
     
      try {
        Interviewschedule[data].value = "";
      } catch (error) {
        throw(error)
      }
    });
    props.handleChangeCloseModel(false)
    setInterviewschedule((prevState) => ({
      ...prevState,
    }));
  };

    return (
      <div>
        <Labelbox
          type="select"
          placeholder="Round"
          dropdown={roundDropdownValues.hr_round}
          changeData={(data) => checkValidation(data, "round")}
          value={Interviewschedule.round.value}
          error={Interviewschedule.round.error}
          errmsg={Interviewschedule.round.errmsg}
        />
        <Labelbox
          type="select"
          placeholder="Designation"
          changeData={(data) => checkValidation(data, "desgination")}
          dropdown={designationdata.Designation}
        disabled={true}
              value={props.selectedDesignationID}
          error={Interviewschedule.desgination.error}
          errmsg={Interviewschedule.desgination.errmsg}
        />
        <Labelbox
          type="datepicker"
          placeholder="Proposed Date"
          disablePast={true}
          changeData={(data) => checkValidation(data, "propsedDate")}
          value={Interviewschedule.propsedDate.value}
          error={Interviewschedule.propsedDate.error}
          errmsg={Interviewschedule.propsedDate.errmsg}
        />
        <Labelbox
          type="select"
          placeholder="Interviewer"
          changeData={(data) => checkValidation(data, "interviewer")}
        //   dropdown={interviewerdata.Interviewer}
          dropdown={ finalRound? interviewApprover.InterviewApprover:interviewerdata.Interviewer}
          value={Interviewschedule.interviewer.value}
          error={Interviewschedule.interviewer.error}
          errmsg={Interviewschedule.interviewer.errmsg}
        />

        <div className="hrbtnInterview">
          <CustomButton
            btnName={"Save"}
            btnCustomColor="customPrimary"
            onBtnClick={onSubmit}
          />
        </div>
      </div>
    );
}

const mapStateToProps = (state) => (
    // console.log(state.getOptions.getInterviewApprover, "getProcessType")
    {
        getInterviewApprover: state.getOptions.getInterviewApprover || [],
        getDesignationList: state.getOptions.getDesignationList  || [],

    }
);

export default connect(mapStateToProps)(HrInterviewModel);