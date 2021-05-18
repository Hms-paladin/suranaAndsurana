import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import LabelBox from '../../helpers/labelbox/labelbox';
import { Button } from "@material-ui/core";
import Axios from 'axios';
import { useDispatch, connect } from "react-redux";
import { apiurl } from '../../utils/baseUrl';
import { GetInterviewers } from "../../actions/GetInterviewersActions";
import { GetDesignation } from "../../actions/GetDesignationActions";
import ValidationLibrary from '../../helpers/validationfunction';
import CustomButton from "../../component/Butttons/button";
import { InesertInterviewDetails } from "../../actions/InterviewDetailsAction";
import { getInterviewApprover } from "../../actions/MasterDropdowns";


import './search.scss'


function DynModel(props) {
  const dispatch = useDispatch();
  const [roundDropdownValues, setroundDropdownValues] = useState({})
  const [visible, setVisible] = React.useState(false);
  const [interviewerdata, setinterviewerdata] = useState([]);
  const [designationdata, setdesignationdata] = useState([]);
  const [finalRound, setFinalRound] = useState(false);
  const [interviewApprover, setInterviewApprover] = useState([]);
  const [finalIntId, setFinalIntId] = useState(0);
  const [uncheck, setUncheck] = useState(false)

  const [Interviewschedule, setInterviewschedule] = useState({
    desgination: {
      value: "",
      validation: [{ "name": "required" }],
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
    },
    round: {
      value: "",
      validation: [{ "name": "required" }],
      error: null,
      errmsg: null,
    }
  })
  useEffect(() => {
    // dispatch(getInterviewApprover());
    dispatch(GetInterviewers());

  }
    , [])
  const stateClear = () => {

    let Form_key = [
      "desgination",
      "interviewer",
      "propsedDate", "round"
    ];

    Form_key.map((data) => {

      try {
        Interviewschedule[data].value = "";
        Interviewschedule[data].error = null;
      } catch (error) {
        throw (error)
      }
    });
    setVisible(false)
    props.handleChangeCloseModel(false)
    setInterviewschedule((prevState) => ({
      ...prevState,
    }));
  };
  useEffect(() => {
    let InterviewApprover = []
    props.GetInterviewers.length > 0 && props.GetInterviewers.map((data, index) =>
      InterviewApprover.push({ id: data.emp_id, value: data.name }))
    setInterviewApprover({ InterviewApprover })

    if (props.GetInterviewers.length > 0 && props.GetInterviewers) {
      let data_res_id = props.GetInterviewers.find((val) => {
        return (
          "Venkat" == val.name
        )
      })
      setFinalIntId(data_res_id.emp_id)
    }
  }, [props.GetInterviewers])

  console.log(finalIntId, "GetInterviewers")
  function checkValidation(data, key, multipleId) {

    if (data === 27 && key === "round") {
      Interviewschedule.interviewer.value = finalIntId
      setFinalRound(true)
    } 
    if (data !== 27 && key === "round") {
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


  React.useEffect(() => {
    setVisible(props.handleChangeModel)
  }, [props.handleChangeModel])

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
      dispatch(InesertInterviewDetails(Interviewschedule, props.selectedId)).then((response) => {
        // console.log(props.checkList, "checkList")
        stateClear()

      })
    }

    setInterviewschedule(prevState => ({
      ...prevState
    }));
    props.handleUnCheck();
  };
 
  useEffect(() => {

    // Axios({
    //   method: "get",
    //   url: apiurl + "get_interviewers",
    // }).then((response) => {
    //   let Interviewer = []
    //   response.data.data.map((data, index) =>
    //     Interviewer.push({ id: data.emp_id, value: data.name }))

    //   setinterviewerdata({ Interviewer })

    // })

    Axios({
      method: "get",
      url: apiurl + "get_s_tbl_m_designation",
    }).then((response) => {
      let Designation = []
      response.data.data.map((data, index) =>
        Designation.push({ id: data.designation_id, value: data.designation }))

      setdesignationdata({ Designation })

    }
    )

    Axios({
      method: 'GET',
      url: apiurl + 'get_resume_round_search',
    }).then((response) => {
      let hr_round = []
      response.data.data.map((data, index) =>
        hr_round.push({
          id: data.status_id,
          value: data.status

        })
      )
      setroundDropdownValues({ hr_round })
      console.log(roundDropdownValues.hr_round, "hr_round")
    })

  }, [dispatch])


  return (
    <Modal
      className="modelContainer"
      title={props.modelTitle}
      centered={props.centered ? true : false}
      visible={visible}
      footer={null}
      width={props.width ? props.width : 520}
      zIndex={1201}
      onCancel={stateClear}
    >
      <div className="interviewdetailformdiv">
        <div className="interviewdetailform">
          {" "}
          <LabelBox
            type="select"
            placeholder="Round"
            dropdown={roundDropdownValues.hr_round}
            changeData={(data) => checkValidation(data, "round")}
            value={Interviewschedule.round.value}
            error={Interviewschedule.round.error}
            errmsg={Interviewschedule.round.errmsg}
          />
        </div>
        <div className="interviewdetailform">
          <LabelBox
            type="select"
            placeholder={"Proposed Designation"}
            dropdown={designationdata.Designation}
            changeData={(data) => checkValidation(data, "desgination")}
            value={Interviewschedule.desgination.value}
            error={Interviewschedule.desgination.error}
            errmsg={Interviewschedule.desgination.errmsg}
          />
        </div>
        <div className="interviewdetailform">
          <LabelBox
            type="datepicker"
            placeholder={"Proposed Date"}
            disablePast={true}
            changeData={(data) => checkValidation(data, "propsedDate")}
            value={Interviewschedule.propsedDate.value}
            error={Interviewschedule.propsedDate.error}
            errmsg={Interviewschedule.propsedDate.errmsg}
          />
        </div>
        <div className="interviewdetailform">
          <LabelBox
            type="select"
            placeholder={"Interviewer"}
            // dropdown={interviewerdata.Interviewer}
            disabled={finalRound ? true : false}
            dropdown={interviewApprover.InterviewApprover}
            changeData={(data) => checkValidation(data, "interviewer")}
            value={Interviewschedule.interviewer.value}
            error={Interviewschedule.interviewer.error}
            errmsg={Interviewschedule.interviewer.errmsg}
          />
        </div>
        {/* <div className="interviewdetailsubmnit"><Button>Submit</Button></div> */}
        <div className="interviewdetailSubmit">
          <CustomButton
            btnName={"Submit"}
            btnCustomColor="customPrimary"
            onBtnClick={onSubmit}
          />
          
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => (
  // console.log(state.getOptions.getInterviewApprover, "getProcessType")
  {
    GetInterviewers: state.InterviewSchedule.GetInterviewers || [],

  }
);

export default connect(mapStateToProps)(DynModel);
// export default DynModel;