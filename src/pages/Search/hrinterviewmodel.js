import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Buttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from '../../helpers/validationfunction';
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import { InesertInterviewDetails } from "../../actions/InterviewDetailsAction";
import { getDesignationListByDept } from "../../actions/MasterDropdowns";
import { GetInterviewers, GetInterviewersApprFinal } from "../../actions/GetInterviewersActions";
const HrInterviewModel = (props) => {
  const dispatch = useDispatch();
  const [roundDropdownValues, setroundDropdownValues] = useState({})
  const [interviewApprover, setInterviewApprover] = useState([]);
  const [finalRound, setFinalRound] = useState(false);
  const [rounds, setRounds] = useState();
  const [designationdata, setdesignationdata] = useState([]);
  const [finalIntId, setFinalIntId] = useState(0);

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
      validation: [{ "name": "required" }, { "name": "futureDate" }],
      error: null,
      errmsg: null,
    }, round: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    }
  })

  useEffect(() => {
    Axios({
      method: 'GET',
      url: apiurl + 'get_round',
    }).then((response) => {
      let hr_round = []
      response.data.data.map((data, index) =>
        hr_round.push({
          id: data.status_id,
          value: data.status

        })
      )
      setroundDropdownValues({ hr_round })
    })
    Axios({
      method: "POST",
      url: apiurl + "get_designation_by_departmentId",
      data: {
        department_id: localStorage.getItem("department_id"),
      },
    }).then((response) => {
      let Designation = []
      response.data.data.map((data, index) =>
        Designation.push({ id: data.designation_id, value: data.designation }))

      // setdesignationdata({ Designation })

    }, [dispatch])

  }, [])
  // 
  useEffect(() => {
    dispatch(getDesignationListByDept());
    dispatch(GetInterviewers());
  }
    , [])


  useEffect(() => {
    let InterviewApprover = []
    props.GetInterviewers.map((data, index) =>
      InterviewApprover.push({ id: data.emp_id, value: data.name }))
    setInterviewApprover({ InterviewApprover })


    // if (props.GetInterviewers.length > 0 && props.GetInterviewers) {
    //   let data_res_id = props.GetInterviewers.find((val) => {
    //     return (
    //       "Venkat" == val.name
    //     )
    //   })
    //   setFinalIntId(data_res_id.emp_id)
    // }

    let Designation = []
    props.getDesignationListByDept.map((data, index) =>
      Designation.push({
        value: data.designation,
        id: data.designation_id
      })
    )
    setdesignationdata({ Designation })
  }, [props.GetInterviewers, props.getDesignationListByDept])

  useEffect(() => {
    let InterviewApprover = []
    props.GetInterviewersApprFinal.length > 0 && props.GetInterviewersApprFinal.map((data, index) =>
      InterviewApprover.push({ id: data.emp_id, value: data.name }))
    setInterviewApprover({ InterviewApprover })

  }, [props.GetInterviewersApprFinal])
  // ____________________

  function checkValidation(data, key, multipleId) {

    if (data === 27 && key === "round") {
      // Interviewschedule.interviewer.value = finalIntId
      dispatch(GetInterviewersApprFinal());
      // setFinalRound(true)
    }
    if (data !== 27 && key === "round") {
      // setFinalRound(false)
      dispatch(GetInterviewers());
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

    if (filtererr.length > 0) {
    } else {
      dispatch(InesertInterviewDetails(Interviewschedule, props.selectedId)).then(() => {
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
      "propsedDate", "round"
    ];

    Form_key.map((data) => {

      try {
        Interviewschedule[data].value = "";
      } catch (error) {
        throw (error)
      }
    });
    props.handleChangeCloseModel(false)
    setInterviewschedule((prevState) => ({
      ...prevState,
    }));
  };

  // roundName
  useEffect(() => {
    if (roundDropdownValues.hr_round) {
      const getDisableId = roundDropdownValues.hr_round.filter((data) => {
        return (props.roundName === data.value)
      })
      for (let i = 0; i < getDisableId[0].id; i++) {
        if (roundDropdownValues.hr_round[i])
          roundDropdownValues.hr_round[i].disable = true
      }
    }

  }, [props])

  return (
    <div>
      <Labelbox
        type="select"
        placeholder="Round"
        dropdown={roundDropdownValues.hr_round}
        changeData={(data) => checkValidation(data, "round")}
        // disabled={rounds === 1 && true}
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
        minDate={new Date(new Date().getTime() + 86400000)}
        changeData={(data) => checkValidation(data, "propsedDate")}
        value={Interviewschedule.propsedDate.value}
        error={Interviewschedule.propsedDate.error}
        errmsg={Interviewschedule.propsedDate.errmsg}
      />
      <Labelbox
        type="select"
        placeholder="Interviewer"
        changeData={(data) => checkValidation(data, "interviewer")}
        // disabled={finalRound ? true : false}
        dropdown={interviewApprover.InterviewApprover}
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
  {
    GetInterviewers: state.InterviewSchedule.GetInterviewers || [],
    getDesignationListByDept: state.getOptions.getDesignationListByDept || [],
    GetInterviewersApprFinal: state.InterviewSchedule.GetInterviewersApprFinal || [],

  }
);

export default connect(mapStateToProps)(HrInterviewModel);