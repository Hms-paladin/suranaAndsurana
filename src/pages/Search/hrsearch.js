import react, { useEffect, useState } from 'react';
import './search.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import EnhancedTable from "../../component/DynTable/table";
import { searchRowdata } from "../../actions/HrSearchAction";
import { Checkbox } from 'antd';
import DynModel from '../../component/Model/model';
import HrInterviewModel from './hrinterviewmodel.js';
import { useDispatch, connect } from "react-redux";
import Axios from 'axios';
import Eyes from "../../images/neweye.svg";
import DynModelView from "../Interview/model";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../utils/baseUrl";
import moment from 'moment';
import { roundToNearestMinutes } from 'date-fns/esm';
import { notification } from "antd";
import {
  getInterviewStatus
} from "../../actions/MasterDropdowns";


const headCells = [
  { id: "view", label: "View" },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'gender', label: 'Gender' },
  { id: 'basicqualification', label: 'Qualification' },
  { id: 'interviewedby', label: 'Interviewed by' },
  { id: 'intervieweddate', label: 'Interviewed Date' },
  { id: 'score', label: 'Score' },
  { id: 'round', label: 'Round' },
  { id: 'result', label: 'Status' },

];
function Hrsearch(props) {
  const dispatch = useDispatch();
  const [hrmodelOpen, setHRModelOpen] = useState(false)
  const [roundDropdownValues, setroundDropdownValues] = useState({})
  const [designationdata, setdesignationdata] = useState([]);
  const [multipleTable, setMultipleTable] = useState([]);
  const [interviewStatus, setinterviewStatus] = useState([]);
  const [checkList, setCheckedList] = useState({})
  const [selectedCandidateId, setSelectedCandidateId] = useState([]);
  const [deignationID, setDeignationID] = useState([]);
  const [viewId, setViewId] = useState("")
  const [candidateViewModel, setCandidateViewModel] = useState(false)
  const [test, setTest] = useState(true)
  const [roundValue, setRoundValue] = useState()
  const [goRights, setGoRights] = useState([])
  const [interviewScheduleRights, setInterviewScheduleRights] = useState([])
  const [statusId, setStatusId] = useState()

  const [HrSearch_Form, setHrSearchFrom] = useState({
    designation_id: {
      value: "0",
      validation: [],
      error: null,
      errmsg: null,
    },
    round: {
      value: "0",
      validation: [],
      error: null,
      errmsg: null,
    },
    status_id: {
      value: "0",
      validation: [],
      error: null,
      errmsg: null,
    },
  })

  useEffect(() => {

    dispatch(searchRowdata(HrSearch_Form))
  }, [])

  const handleCheck = (event, resume_id, designation_id, round) => {
    setRoundValue(round)

    if (event.target.checked === true) {
      setSelectedCandidateId([resume_id])
      setDeignationID(designation_id)
    } else {
      setSelectedCandidateId([])
      setDeignationID()
    }
    // if (selectedCandidateId.includes(resume_id)) {
    //   selectedCandidateId.map((data, index) => {
    //     if (data === resume_id) {
    //       selectedCandidateId.splice(index, 1);
    //     }
    //   })

    // } else {
    //   selectedCandidateId.push(resume_id)
    //   setDeignationID(designation_id)
    // }
    // console.log(event.target.checked,"checkList")
    setCheckedList(
      prevState => ({
        // ...prevState,
        [event.target.name]: !checkList[event.target.name],
      })
    )
    setTest(!test)
  }
  // console.log(checkList,selectedCandidateId,"checkList")
  const viewCandidate = (id) => {
    setViewId(id)
    setCandidateViewModel(true)
  }
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
      console.log(roundDropdownValues.hr_round, "hr_round")
    })
    Axios({
      method: "GET",
      url: apiurl + "get_s_tbl_m_designation",
    }).then((response) => {
      let Designation = []
      response.data.data.map((data, index) =>
        Designation.push({ id: data.designation_id, value: data.designation }))

      setdesignationdata({ Designation })

    }, [dispatch])

  }, [])

  useEffect(() => {
    let multipleTable = []
    console.log(props.GetRowData, "GetRowData")
    props.GetRowData.map((data) => {
      let rowDataList = []
      if (data.result.length > 0) {
        data.result.length > 0 && data.result.map((data, index) => {

          rowDataList.push({
            view: <img
              src={Eyes}
              className="viewCandidatesList"
              onClick={() => viewCandidate(data.resume_id)}
            />, name: data.name, age: data.age, gender: data.gender === "M" ? "Male" : "Female",
            basic: data.basic_qualifciation, interviewedby: data.interviewed_by, interviewed_date: moment(data.interviewed_date).format('DD-MM-YYYY'),
            score: data.score, round: data.round, result: data.status,
            box: <Checkbox onClick={(event) => handleCheck(event, data.resume_id, data.designation_id, data.round)} name={"checked" + data.resume_id + data.designation_id}
              checked={checkList["checked" + data.resume_id + data.designation_id]} value={checkList["checked" + data.resume_id]} />
          })
        })
        multipleTable.push(
          <EnhancedTable
            headCells={headCells}
            rows={rowDataList}
            tabletitle={data.designation}
          />
        )
      }
    })
    setMultipleTable(multipleTable)

  }, [props.GetRowData, test])


  function checkValidation(data, key) {

    if (key == "round") {
      dispatch(getInterviewStatus(data))
      setStatusId(true)
    }


    var errorcheck = ValidationLibrary.checkValidation(
      data,
      HrSearch_Form[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: HrSearch_Form[key].validation
    }


    setHrSearchFrom(prevState => ({
      ...prevState,
      [key]: dynObj,
    }));

  };


  function scheduleInterview() {
    setHRModelOpen(true)
  }


  const onSearch = () => {
    dispatch(searchRowdata(HrSearch_Form)).then((response) => {
      stateClear();
    }
    )
  }

  const stateClear = () => {

    let Form_key = [
      "designation_id",
      "round",
      "status_id",
    ];

    Form_key.map((data) => {

      try {
        HrSearch_Form[data].value = "0";
      } catch (error) {
        throw (error)
      }
    });

    setHrSearchFrom((prevState) => ({
      ...prevState,
    }));
  };
  console.log(roundValue, "rowDataList")

  ///*****user permission**********/

  useEffect(() => {
    if (props.UserPermission.length > 0 && props.UserPermission) {
      let data_res_id = props.UserPermission.find((val) => {
        return (
          "HR - Go" == val.control
        )
      })
      setGoRights(data_res_id)

      data_res_id = props.UserPermission.find((val) => {
        return (
          "HR - Schedule Interview" == val.control
        )
      })
      setInterviewScheduleRights(data_res_id)
    }

  }, [props.UserPermission]);

  //For page render dropdowns
  useEffect(() => {
    let statusList = []
    props.getInterviewStatus.map((data) => {
      statusList.push({ id: data.status_id, value: data.status })
    })
    setinterviewStatus({ statusList })
  }, [props.getInterviewStatus])


  function rightsNotification() {
    notification.success({
      message: "You are not Authorized. Please Contact Administrator",
    });
  }
  /////////////

  return (

    < div className="hrContainer" >


      <div className="hrHeader">
        <Grid item xs={12} container direction="row" spacing={1}>
          <Grid item xs={3}>
            {" "}
            <Labelbox
              type="select"
              placeholder="Designation"
              dropdown={designationdata.Designation}
              changeData={(data) => checkValidation(data, "designation_id")}
              value={HrSearch_Form.designation_id.value}
            />
          </Grid>
          <Grid item xs={3}>
            <Labelbox
              type="select"
              placeholder="Rounds"
              dropdown={roundDropdownValues.hr_round}
              changeData={(data) => checkValidation(data, "round")}
              value={HrSearch_Form.round.value}
            />
          </Grid>
          <>
            { statusId && <Grid item xs={3}>
              <Labelbox
                type="select"
                placeholder="Status"
                dropdown={interviewStatus.statusList}
                changeData={(data) => checkValidation(data, "status_id")}
                value={HrSearch_Form.status_id.value}
              />
            </Grid>}
          </>
          <Grid item xs={3}>
            <CustomButton btnName={"Go"} btnCustomColor="customPrimary" btnDisable={!goRights || goRights.display_control && goRights.display_control === 'N' ? true : false} onBtnClick={onSearch} />
          </Grid>
        </Grid>
      </div>
      {multipleTable}
      <div className="hrsearchbtn">
        <CustomButton
          btnName={"Schedule Interview"}
          btnCustomColor="customPrimary"
          custombtnCSS={"goSearchbtn"}
          btnDisable={selectedCandidateId.length <= 0 || !interviewScheduleRights || interviewScheduleRights.display_control && interviewScheduleRights.display_control === 'N' ? true : false}
          onBtnClick={() => scheduleInterview()}

        />
        <DynModel
          modelTitle={"Interview Details"}
          handleChangeModel={hrmodelOpen}
          handleChangeCloseModel={(bln) => setHRModelOpen(bln)}
          content={
            <HrInterviewModel
              handleChangeCloseModel={(bln) => setHRModelOpen(bln)}
              selectedId={selectedCandidateId}
              selectedDesignationID={deignationID}
              roundName={roundValue}
            />
          }
        />
      </div>
      <DynModelView
        modelTitle={"Candidate's Details"}
        handleChangeModel={candidateViewModel}
        handleChangeCloseModel={(bln) => setCandidateViewModel(bln)}
        res_data_id={viewId}
      />
    </div >
  );
}


const mapStateToProps = state => (
  {
    GetRowData: state.HrSearchRowData,
    UserPermission: state.UserPermissionReducer.getUserPermission,
    getInterviewStatus: state.getOptions.getInterviewStatus || [],
  }
)


export default connect(mapStateToProps)(Hrsearch);