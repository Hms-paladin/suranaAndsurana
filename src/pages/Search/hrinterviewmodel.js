import react,{useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from '../../helpers/validationfunction';
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import { InesertInterviewDetails } from "../../actions/InterviewDetailsAction";

function HrInterviewModel(props) {
    const dispatch = useDispatch();
    const[roundDropdownValues,setroundDropdownValues] =useState({})
    const [interviewerdata, setinterviewerdata] = useState([]);
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
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },     round: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        }
    })
    useEffect(()=> {
      console.log("asraf",props.selectedId)
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
                console.log(roundDropdownValues.hr_round,"hr_round")
        })
        Axios({
            method: "GET",
            url: apiurl + "get_s_tbl_m_designation",
        }).then((response) => {
            let Designation = []
            response.data.data.map((data, index) =>
                Designation.push({ id: data.designation_id, value: data.designation }))
    
            setdesignationdata({ Designation })

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

// ____________________

function checkValidation(data, key, multipleId) {

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
            // handleCancel()
            // setVisible(false)
            props.handleChangeCloseModel(false)
        })
    }

    setInterviewschedule(prevState => ({
        ...prevState
    }));
};


function handleCancel() {
    // setVisible(false)
    props.handleChangeCloseModel(false)
}
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
        //   value={Interviewschedule.desgination.value}
        disabled={true}
              value={props.selectedDesignationID}
          error={Interviewschedule.desgination.error}
          errmsg={Interviewschedule.desgination.errmsg}
        />
        <Labelbox
          type="datepicker"
          placeholder="Proposed Date"
          changeData={(data) => checkValidation(data, "propsedDate")}
          value={Interviewschedule.propsedDate.value}
          error={Interviewschedule.propsedDate.error}
          errmsg={Interviewschedule.propsedDate.errmsg}
        />
        <Labelbox
          type="select"
          placeholder="Interviewer"
          changeData={(data) => checkValidation(data, "interviewer")}
          dropdown={interviewerdata.Interviewer}
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
export default HrInterviewModel;