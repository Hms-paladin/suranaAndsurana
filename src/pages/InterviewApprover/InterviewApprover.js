import React, { useState, useEffect } from "react";
import Back from "../../images/Vector.svg";
import "./InterviewApprover.scss";
import EnhancedTable from "../../component/DynTable/table";
import { Grid } from "@material-ui/core";
import { Select } from "antd";
import { useDispatch, connect } from "react-redux";
import { apiurl } from "../../utils/baseUrl";
import SelectionIcon from "../../images/select.svg";
import Axios from "axios";
import CustomButton from "../../component/Buttons/button";
import ValidationLibrary from "../../helpers/validationfunction";
import Labelbox from "../../helpers/labelbox/labelbox";

import {
  InsertApprove,
  interviewApproverTableData,
} from "../../actions/InterviewApproveraction";
import logo from "../../images/Approvelogo.png";
import moment from "moment";
import { Button } from "@material-ui/core";
const { Option } = Select;

function InterviewApprover(props) {
  const Header = [
    { label: "Date" },
    { label: "Initial Score" },
    { label: "Comments" },
    { label: "Interviewer" }, { label: "Round" }, { label: "Status" },
  ];

  const [modelOpen, setModelOpen] = useState(false);
  const [Rows, setRows] = useState([]);
  const [nameAndDesg, setNameAndDesg] = useState();

  // approve form
  const [ApproveForm, setApproveForm] = useState({
    final_score: {
      value: "",
      validation: [{ name: "required" }, { name: "allowNumaricOnly1" }, { name: "custommaxValue", params: 100 }],
      error: null,
      errmsg: null,
    },
    comment: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    init_status: {
      value: 3,
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });
  //   interview dropdown api function

  const [optionvalues, setoptionvalues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(interviewApproverTableData(props.int_resume_id, props.int_props.designationID));
  }, []);

  useEffect(() => {
    let interviewList = [];
    props.interviewData.map((data) => {
      interviewList.push({
        date: moment(data.Date).format("DD-MMM-YYYY"),
        score: data.score_inital,
        cmts: data.comment,
        viewer: data.interviewer,
        round: data.round, status: data.status,
      });
    });
    setRows(interviewList);
    props.interviewData.length > 0 &&
      setNameAndDesg({
        name: props.interviewData[0].name,
        Designation: props.interviewData[0].designation,
      });
  }, [props.interviewData]);


  useEffect(() => {
    Axios({
      method: "post",
      url: apiurl + "get_Interview_Status",
      data: {
        status_id: props.interviewStatus,
      },
    }).then((response) => {
      let interview_status = [];
      response.data.data.map((data, index) =>
        interview_status.push({ value: data.status, id: data.status_id })
      );
      setoptionvalues({ interview_status });
    });
  }, [dispatch, props]);

  function checkValidation(data, key) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      ApproveForm[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: ApproveForm[key].validation,
    };

    setApproveForm((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }
  const handleCancel = () => {
    let From_key = ["final_score", "comment", "init_status"];

    From_key.map((data) => {
      ApproveForm[data].value = "";
    });
    setApproveForm((prevState) => ({
      ...prevState,
    }));
  };

  //  insert approve
  function Submit_approve() {
    var mainvalue = {};
    var targetkeys = Object.keys(ApproveForm);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        ApproveForm[targetkeys[i]].value,
        ApproveForm[targetkeys[i]].validation
      );
      ApproveForm[targetkeys[i]].error = !errorcheck.state;
      ApproveForm[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = ApproveForm[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => ApproveForm[obj].error == true);
 
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else {
      // setResumeFrom({ error: false });
      dispatch(
        InsertApprove(
          ApproveForm,
          optionvalues,
          props.int_details_id,
          props.int_props,
          props.props_resid,
          props.task_id
        )
      ).then(() => {
        handleCancel()
        props.handleAproverModelClose();
        props.handleModelClose();
      });
    }

    setApproveForm((prevState) => ({
      ...prevState,
    }));
  }

  return (
    <div className="interviewapprove_root">
      {/* <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} contents={<div>sdfghjkl</div>}> */}
      {/* <div>
        <img src={Back} style={{ width: "30px" }} />
      </div> */}
      <div className="interview_head">
        <div>
          <label>
            Name : <span>
              {/* {nameAndDesg && nameAndDesg.name}  */}
              {props.props_name && props.props_name}
            </span>
          </label>
        </div>
        <div>
          <label>
            Designation : <span
            >
              {/* {nameAndDesg && nameAndDesg.Designation}  */}
              {props.props_design && props.props_design}</span>
          </label>
        </div>
      </div>
      <EnhancedTable headCells={Header} rows={Rows} />
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <div className="inter_status_div">
          <Labelbox
            type="select"
            placeholder="Interview Status"
            disabled={true}
            dropdown={optionvalues.interview_status}
            changeData={(data) => checkValidation(data, "init_status")}
            value={ApproveForm.init_status.value}
            error={ApproveForm.init_status.error}
            errmsg={ApproveForm.init_status.errmsg}
          />
        </div>
      </Grid>

      <Grid xs={12} spacing={1} container className="interviewScore">
        <div className="score_div">
          <Labelbox
            type="text"
            placeholder={"Final Score"}
            changeData={(data) => checkValidation(data, "final_score")}
            value={ApproveForm.final_score.value}
            error={ApproveForm.final_score.error}
            errmsg={ApproveForm.final_score.errmsg}
          />
        </div>
        <div className="approve_comments">
          {" "}
          <Labelbox
            type="textarea"
            rows={"100"}
            placeholder={"Comment"}
            changeData={(data) => checkValidation(data, "comment")}
            value={ApproveForm.comment.value}
            error={ApproveForm.comment.error}
            errmsg={ApproveForm.comment.errmsg}
          />
        </div>
        <div className="int_approve_btn">
          <Button className="submit_approve" onClick={Submit_approve}>
            <div>
              <img src={logo} />
              <label>Approve</label>
            </div>
          </Button>
        </div>
      </Grid>

      {/* </DynModel> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  interviewData: state.interviewApproverTableData,
});

export default connect(mapStateToProps)(InterviewApprover);
