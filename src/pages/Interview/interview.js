import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./interview.scss";
import Eyes from "../../images/neweye.svg";
import DynModelView from "./model";
import DynModel from "../../component/Model/model";
import { useDispatch, connect } from "react-redux";
import { GetCandiateDetails } from "../../actions/interviewActions";
import CustomButton from "../../component/Butttons/button";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { InsertInterviewquestions } from "../../actions/interviewActions";
import { getInterviewStatus } from "../../actions/MasterDropdowns";
import { getInterviewQuestions, getSelectedCandidates } from '../../actions/TodoListAction'
import EnhancedTable from '../../component/DynTable/table';
import { apiurl } from "../../utils/baseUrl";
import moment from "moment";
import Axios from "axios";
import { getOnlineTestDetails } from '../../actions/OnlineTestAction';

// Model
import InterviewApprover from "../InterviewApprover/InterviewApprover";

function InerviewScreen(props) {
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const [getdata, setgetData] = useState([]);
  const [cand_data, setcand_data] = useState([]);
  const [data_id, setdata_id] = useState([]);
  const [int_details, setint_details] = useState({});
  const [optionvalues, setoptionvalues] = useState({});
  const [selectedCandidateId, setSelectedCandidateId] = useState();
  const [comments, setComments] = useState(false);
  const [candDetails, setCandDetails] = useState([]);
  const [appModelOpen, setAppModelOpen] = useState(false);
  const [canDesig, setCandDesig] = useState(false);
  const [canName, setcanName] = useState("");
  const [dropDownSel, setdropDownSel] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({})
  const [testDetails, setTestDetails] = useState({})
  
  const headCells = [
    { id: "testname", label: "Test Name" },
    { id: "testdate", label: "Test Date" },
    { id: "score", label: "Score" }
  ];
  const rows = [
    { testname: "Aptitude", testdata: "02-Mar-2021", score: "45" },
    { testname: "General Knowledge", testdata: "02-Mar-2021", score: "23" }
  ];
  const [postData, setpostData] = useState({
    init_status: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    initial_score: {
      value: "",
      validation: [
        { name: "required" },
        { name: "allowNumaricOnly1" },
        { name: "custommaxValue", params: 100 },
      ],
      error: null,
      errmsg: null,
    },
    comment: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });
  useEffect(() => {
    dispatch(getInterviewStatus());
    dispatch(getInterviewQuestions());
   
  }, []);

  useEffect(() => {
    dispatch(getOnlineTestDetails(cand_data[0]?.resume_id&&cand_data[0].resume_id));
  }, [cand_data[0]?.resume_id&&cand_data[0].resume_id]);

  useEffect(() => {
    let interview_status = [];
    props.getInterviewStatus.map((data, index) =>
      interview_status.push({ value: data.status, id: data.status_id })
    );
    setoptionvalues({ interview_status });

    //test details
    let test_details = [];
    props.getOnlineTestDetails&&props.getOnlineTestDetails.length>0&&props.getOnlineTestDetails.map((data, index) =>
      test_details.push({ test_name: data.TestTempName,Test_Date: data.Test_Date,score:data.Score_Percentage})
    );
    setTestDetails({ test_details });

    //Questions
    setgetData(props.getQuestions);
  }, [props.getInterviewStatus, props.getQuestions,props.getOnlineTestDetails]);

  console.log(cand_data[0]?.resume_id&&cand_data[0].resume_id,testDetails,"testDetails")
  useEffect(() => {
    Axios({
      method: "POST",
      url: apiurl + "get_selected_candidates",
      data: {
        int_detail_id:
          props.interviewer_id && props.interviewer_id.int_details_id,
      },
    }).then((response) => {
      const Intview_data = [];
      response.data.data.map((data) =>
        Intview_data.push({
          id: data.int_details_id,
          date: moment(data.prop_date_time).format("DD-MM-YYYY"),
          designation: data.designation,
          candiates: data.total_number_candidates,
          approver: data.approver,
          round: data.round

        })
      );
      const CandList = [];
      response.data.data.map((data) =>
        CandList.push({
          date: data.prop_date_time,
          designation: data.designation, designationID: data.prop_designation,
          round: data.round
        })
      );

      setCandDesig(response.data.data[0].designation)
      setCandDetails({ CandList })
      setcand_data(response.data.data[0].output);
      // setint_details(props.interviewer_id.map((data,index)=>{
      //     // console.log("datacheck",data),
      //     return(
      //     ({id:data.int_details_id})
      //     // propsdata.push(data)
      //     )}))
      setint_details({ Intview_data });
    });
  }, [props]);

  function ViewCandiate(id) {
    setdata_id(
      cand_data.find((data) => {
        return id == data.resume_id;
      })
    );
    setdata_id((prevState) => ({
      ...prevState,
    }));
    setModelOpen(true);
  }

  function checkValidation(data, key) {
    let initId = optionvalues.interview_status.find((item) => {
      return item.id === data;
    });

    if (key === "init_status" && "Selected" !== initId.value) {
      setAppModelOpen(false);
    }
    if (key === "init_status" && "Selected" === initId.value) {
      if (
        // int_details.Intview_data[0].approver !== null &&
        int_details.Intview_data[0].round == 27
      ) {
        setdropDownSel(true);
        setAppModelOpen(true);
      } else {
        setAppModelOpen(false);
      }
      // postData.final_score.validation = [{ "name": "required" }]
      // setpostData(prevState => ({
      //     ...prevState,
      // }));
    }

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      postData[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: postData[key].validation,
    };

    setpostData((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

  useEffect(() => {
    setComments(false);
    onStateClear();
    setSelectedCandidateId("");
    setcanName("");
  }, [props.stateClear])

  const onStateClear = () => {
    let InterviewState = [
      "init_status",
      "initial_score",
      "comment"
    ];

    InterviewState.map((data) => {
      postData[data].value = "";
      postData[data].error = null;
      // postData[data].validation = "";

    });

    setpostData((prevState) => ({
      ...prevState,
    }));
  }

  function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(postData);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        postData[targetkeys[i]].value,
        postData[targetkeys[i]].validation
      );
      postData[targetkeys[i]].error = !errorcheck.state;
      postData[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = postData[targetkeys[i]].value;
    }
    let filtererr = targetkeys.filter((obj) => postData[obj].error == true);
    if (filtererr.length > 0) {
      // setpostData({ error: true });
    } else {
      // setpostData({ error: false });
      dispatch(
        InsertInterviewquestions(
          postData,
          selectedCandidateId,
          props.interviewer_id,
          candDetails.CandList[0].round
        )
      ).then(() => {
        props.handleAproverModelClose();
        onStateClear();
      });
    }

    setpostData((prevState) => ({
      ...prevState,
    }));
  }

  const selectCandidate = (id, name) => {
    setSelectedCandidateId(id);
    setComments(true);
    setcanName(name);
  };
  // const
  return (
    <div>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={4}>
          <div className="interviewTitle">Interview Date</div>
          <div className="interview_cont">
            {/* {interviewDetails.date?interviewDetails.date:'--' } */}
            {int_details.Intview_data ? int_details.Intview_data[0].date : "-"}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="interviewTitle">Designation</div>
          <div className="interview_cont">
            {/* {interviewDetails.designation?interviewDetails.designation:'--' } */}
            {int_details.Intview_data
              ? int_details.Intview_data[0].designation
              : "-"}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="interviewTitle">No of Candidates</div>
          <div className="interview_cont">
            {/* {interviewDetails.candidates?interviewDetails.candidates:'--' } */}
            {int_details.Intview_data
              ? int_details.Intview_data[0].candiates
              : "-"}
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="left"
        alignItems="left"
        className="interviewQuesions"
      >
        <Grid item xs={8} className="scrollbar">
          <div>List of guiding questions</div>
          <ul>
            {getdata.map((get, index) => {
              return (
                <>
                  <li>{get.questions}</li>
                </>
              );
            })}
          </ul>
        </Grid>
        <Grid item xs={3} className="candidateBox">
          <div className="candidatesList"> List of Candidates </div>
          <div className="scrollerCandidates">
            <Grid
              item
              xs={12}
              container
              direction="column"
              justify="left"
              alignItems="left"
            >
              {
                // cand_data.length===0&& cand_data.length>=0&&
                cand_data &&
                cand_data.map((data, index) => {
                  return (
                    <Grid
                      xs={12}
                      container
                      direction="row"
                      justify="center"
                      alignItems="left"
                      display="flex"
                      style={{cursor:'pointer'}}
                      className={`${data &&
                        data.resume_id &&
                        data.resume_id === selectedCandidateId &&
                        "selectedCandidateBG"
                        } ordercandidates`}
                      onClick={() =>
                        selectCandidate(data.resume_id, data.name)
                      }
                    >
                      <Grid item xs={10} className="candidateName">
                        {data && data.name}
                      </Grid>
                      <Grid item xs={2}>
                        <img
                          src={Eyes}
                          className="viewCandidatesList"
                          onClick={() => ViewCandiate(data.resume_id)}
                        />
                      </Grid>
                    </Grid>
                  );
                })
              }
              {data_id.resume_id && (
                <DynModelView
                  modelTitle={"Candidate's Details"}
                  handleChangeModel={modelOpen}
                  handleChangeCloseModel={(bln) => setModelOpen(bln)}
                  data_id={data_id}
                />
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      {comments === true ? (
        <>
          {/* Changes here */}
          <div className="candidate_det">
            <div>Name of the Candidate</div>
            <div>{canName}</div>
          </div>
          <div className="score_table">
            <EnhancedTable headCells={headCells} rows={testDetails.test_details}></EnhancedTable>
          </div>
          <div className="inter_status_div">
            <Labelbox
              type="select"
              placeholder={"Interview Status"}
              dropdown={optionvalues.interview_status}
              changeData={(data) => checkValidation(data, "init_status")}
              value={postData.init_status.value}
              error={postData.init_status.error}
              errmsg={postData.init_status.errmsg}
            />
          </div>

          <Grid xs={12} spacing={1} container className="interviewScore">
            <div className="score_div">
              <Labelbox
                type="text"
                placeholder="Score"
                changeData={(data) => checkValidation(data, "initial_score")}
                value={postData.initial_score.value}
                error={postData.initial_score.error}
                errmsg={postData.initial_score.errmsg}
              />
            </div>
            <div className="int_comments_div">
              <Labelbox
                type="textarea"
                placeholder="Comment"
                changeData={(data) => checkValidation(data, "comment")}
                value={postData.comment.value}
                error={postData.comment.error}
                errmsg={postData.comment.errmsg}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <CustomButton
                btnName={"Save"}
                btnCustomColor="customPrimary"
                custombtnCSS="int_btn_save"
                onBtnClick={onSubmit}
              />
            </div>
            <DynModel
              modelTitle={"Interview Approver"}
              handleChangeModel={appModelOpen}
              handleChangeCloseModel={(bln) => setAppModelOpen(bln)}
              width={1000}
              content={
                <InterviewApprover
                  props_resid={selectedCandidateId}
                  props_name={canName}
                  props_design={canDesig}
                  int_props={candDetails.CandList && candDetails.CandList[0]}
                  int_details_id={
                    int_details.Intview_data && int_details.Intview_data[0].id
                  }
                  int_resume_id={selectedCandidateId}
                  task_id={props.interviewer_id.task_id}
                  sel_appr_drop={dropDownSel}
                  //______________________
                  handleAproverModelClose={(bln) => setAppModelOpen(bln)}
                  handleModelClose={props.handleAproverModelClose}
                />
              }
            />
          </Grid>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  getInterviewquestions: state,
  GetCandiateDetails: state.getcandiate,
  getInterviewStatus: state.getOptions.getInterviewStatus || [],
  getQuestions: state.getHrTodoList.getQuestions || [],
  getSelectedCandidates: state.getHrTodoList.getSelectedCandidates || [],
  getOnlineTestDetails: state.OnlineTest.getOnlineTestDetails || []
});

export default connect(mapStateToProps)(InerviewScreen);
