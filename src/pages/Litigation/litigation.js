import react, { useEffect, useState } from "react";
import "./litigation.scss";
import { Tabs, Radio, Divider } from "antd";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import AddIcon from "../../images/addIcon.svg";
import CustomButton from "../../component/Butttons/button";
import { message } from "antd";
import DynModel from "../../component/Model/model";
import AddDataModel from "./adddataModel";
import {
  getCaseType,
  getEmpListDepartment,
  getLocation,
  getSubCaseType,
  getTradeMarkStatus,
} from "../../actions/MasterDropdowns";
import { GetLitigation, InsertLitigation } from "../../actions/Litigation";
import ProjectTaskModel from '../Project IP1/ProjectTaskModel/projecttaskModel';


const { TabPane } = Tabs;

const Litigation = (props) => {
  const dispatch = useDispatch();
  const [litigationCounsel, setLitigationCounsel] = useState(false);
  const [employeeList, setEmployeeList] = useState({});
  const [locationslList, setlocationslList] = useState({});
  const [tradeMarkStatus, setTradeMarkStatus] = useState({});
  const [IdDetails, setIdDetails] = useState({});
  const [CaseType, setCaseType] = useState({});
  const [SubCaseType, setSubCaseType] = useState({});
  const [LitigationCaseDetails, setLitigationCaseDetails] = useState([]);
  const [LitigationCase, setLitigationCase] = useState();
  const [confirmmodel, setConfirmModel] = useState(false);

  const [Litigation_Form, setLitigationForm] = useState({
    internalcaseno: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    status: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    courtname: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    casetype: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    courtcaseno: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    ddra: {
      value: "",
      valueById: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    hearingdate: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    duedate: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    subcase: {
      value: "",
      // validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    suitvalue: {
      value: "",
      validation: [{ name: "numericanddot" }],
      error: null,
      errmsg: null,
    },
  });
  useEffect(() => {
    handleCancel();
    dispatch(getEmpListDepartment());
    dispatch(getLocation());
    dispatch(getTradeMarkStatus());
    dispatch(getCaseType());
  }, []);
  useEffect(() => {

    if (props.id_Props && props.id_Props.project_id) {
      console.log([props.id_Props].length, "props.id_Props")
      handleCancel();
      setIdDetails(props.id_Props);
      dispatch(getSubCaseType(props.id_Props.client_id));
      dispatch(GetLitigation(props.id_Props.project_id));
    }
  }, [props.id_Props]);

  useEffect(() => {
    let subCaseType = [];
    props.getSubCaseType.map((data) =>
      subCaseType.push({ value: data.sub_case, id: data.case_id })
    );
    setSubCaseType({ subCaseType });
    //______________
  }, [props.getSubCaseType]);

  useEffect(() => {
    handleCancel();
    let MultipleSet =
      props.getLitigationDetails &&
      props.getLitigationDetails[0] &&
      props.getLitigationDetails[0].case_details.map((data) => {
        if (data.liti_councel_id === 5) {
          console.log("datadata", data);
        } else {
          //
        }
        let rowDataList = data?.liti_details?.map((val) => {
          return (
            <div className="ourCounselFieldsHeadings">
              {val.liti_councel_id === 5 ? (
                <>
                  <div className="nameFields">{val.interim_name}</div>
                  <div className="phoneFields">{val.interim_appln_no}</div>
                  <div className="mailFields">{val.interim_application_date}</div>
                  <div className="addressFields">{val.interim_details}</div>
                </>
              ) : data.liti_councel === "Adjournment" ? (<>
                <div className="adjournFields">{val.adjournment_taken_by}</div>
                <div className="adjournFields">{val.reason}</div>
              </>) : (
                <>
                  <div className="nameFields">{val.name}</div>
                  <div className="phoneFields">{val.phone_no}</div>
                  <div className="mailFields">{val.email_id}</div>
                  <div className="addressFields">{val.address}</div>
                </>
              )
              }
            </div >
          );
        });

        return (
          <>
            {rowDataList && props.getLitigationDetails[0].case.length > 0 && (
              <div className="litigationCounsel">
                <div className="ourCounselTitle ourCounselHead">
                  {" "}
                  <span>{data.liti_councel}</span>{" "}
                  <img
                    src={AddIcon}
                    style={{ height: "20px" }}
                    onClick={setLitigationCounselModel}
                  />
                </div>
                <div className="ourCounselFieldsHeading">
                  {" "}
                  {data.liti_councel === "Adjournment" ? (
                    <> <div className="adjournFields" style={{ whiteSpace: 'nowrap' }}>Adjournment Taken By</div>
                      <div className="adjournFields">Reason</div></>
                  ) : (<>
                    <div className="nameFields">Name</div>
                    <div className="phoneFields">Phone No</div>
                    <div className="mailFields">Email</div>
                    <div className="addressFields">Address</div></>
                  )}

                </div>
                <div >{rowDataList}</div>
              </div>
            )}
          </>
        );
      });
    setLitigationCaseDetails(MultipleSet);
    // ____________________________________
    let caseDetails =
      props.getLitigationDetails &&
      props.getLitigationDetails[0] &&
      props.getLitigationDetails[0].case[0];
    if (
      props.getLitigationDetails &&
      props.getLitigationDetails[0] &&
      props.getLitigationDetails[0].case[0] &&
      props.EmployeeList
    ) {
      const strArr = [];
      const string = caseDetails.responsible_attorney;
      strArr.push(string.split(","));

      // const PrefillCounsel=[]
      let MultipleCouncelValue = [];

      if (caseDetails) {
        employeeList &&
          employeeList?.EmployeeList?.map((total) => {
            strArr &&
              strArr[0].map((id) => {
                if (total.id === parseInt(id)) {
                  MultipleCouncelValue.push(total.value);
                }
              });
          });
      }
      Litigation_Form["internalcaseno"].value =
        caseDetails.internal_case_no || 0;
      Litigation_Form["status"].value = caseDetails.status_id || 0;
      Litigation_Form["courtname"].value = caseDetails.court_id || 0;
      Litigation_Form["casetype"].value = caseDetails.case_type_id || 0;
      Litigation_Form["courtcaseno"].value = caseDetails.court_case_no || "";
      // _________________________
      Litigation_Form["ddra"].value = MultipleCouncelValue || "";
      Litigation_Form["ddra"].valueById = caseDetails.responsible_attorney;

      // __________________________________________________
      caseDetails.next_hearing_date && caseDetails.next_hearing_date != "0000-00-00" && (Litigation_Form["hearingdate"].value = caseDetails.next_hearing_date);
      caseDetails.due_date && caseDetails.due_date != "0000-00-00" && (Litigation_Form["duedate"].value = caseDetails.due_date);
      Litigation_Form["subcase"].value = caseDetails.sub_case || 0;
      Litigation_Form["suitvalue"].value = caseDetails.suit_value || "";
    }
    setLitigationForm((prevState) => ({
      ...prevState,
    }));

    setLitigationCase(caseDetails);

    //________________________________
  }, [props.getLitigationDetails, props.EmployeeList]);
  useEffect(() => {
    //hod/attony, Counsel ,DRA and DDRA
    let EmployeeList = [];
    props.EmployeeList.map((data) =>
      EmployeeList.push({ value: data.name, id: data.emp_id })
    );
    setEmployeeList({ EmployeeList });
    let locationData = [];
    props.getCourtLocation.map((data) =>
      locationData.push({ value: data.location, id: data.location_id })
    );
    setlocationslList({ locationData });
    let tradeMark = [];
    props.getTradeMarkStatus.map((data) =>
      tradeMark.push({ value: data.Status, id: data.status_id })
    );
    setTradeMarkStatus({ tradeMark });
    let caseType = [];
    props.getCaseType.map((data) =>
      caseType.push({ value: data.case_type, id: data.case_type_id })
    );
    setCaseType({ caseType });
  }, [
    props.EmployeeList,
    props.getCourtLocation,
    props.getTradeMarkStatus,
    props.getCaseType,
  ]);

  const setLitigationCounselModel = () => {
    setLitigationCounsel(true);
  };
  function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(Litigation_Form);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        Litigation_Form[targetkeys[i]].value,
        Litigation_Form[targetkeys[i]].validation
      );
      Litigation_Form[targetkeys[i]].error = !errorcheck.state;
      Litigation_Form[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = Litigation_Form[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => Litigation_Form[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      // setResumeFrom({ error: true });
    } else {
      // setResumeFrom({ error: false });

      dispatch(InsertLitigation(Litigation_Form, IdDetails))

    }
    setConfirmModel(false)
    setLitigationForm((prevState) => ({
      ...prevState,
    }));
  }

  const handleCancel = () => {
    let ResumeFrom_key = [
      "internalcaseno",
      "status",
      "courtname",
      "casetype",
      "courtcaseno",
      "ddra",
      "hearingdate",
      "duedate",
      "subcase",
      "suitvalue",
    ];

    ResumeFrom_key.map((data) => {
      Litigation_Form[data].value = "";
    });
    setLitigationForm((prevState) => ({
      ...prevState,
    }));
  };

  function checkValidation(data, key, multipleId) {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      Litigation_Form[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: Litigation_Form[key].validation,
    };

    if (data && key === "hearingdate") {
      props.TaskModel&&props.TaskModel(true);
    }
    else{
      props.TaskModel&&props.TaskModel(false);
    }

    // only for multi select (start)

    let multipleIdList = [];

    if (multipleId) {
      multipleId.map((item) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === item.value) {
            multipleIdList.push(item.id);
          }
        }
      });
      dynObj.valueById = multipleIdList.toString();
    }
    setLitigationForm((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  }

  return (
    <div>
      <div className="litigationHeader">
        <div className="addCase">Add Case</div>
      </div>
      <Grid item xs={12} container direction="row" spacing={2}>


        <Grid item xs={4} container direction="column" spacing={2}>
          <div className="AddClientHead">Internal Case No.</div>
          <Labelbox
            type="text"
            // placeholder={"Internal Case No."}
            changeData={(data) => checkValidation(data, "internalcaseno")}
            value={Litigation_Form.internalcaseno.value}
            error={Litigation_Form.internalcaseno.error}
            errmsg={Litigation_Form.internalcaseno.errmsg}
          />
          <div className="AddClientHead">Status</div>
          <Labelbox
            type="select"
            // placeholder={"Status"}
            dropdown={tradeMarkStatus.tradeMark}
            changeData={(data) => checkValidation(data, "status")}
            value={Litigation_Form.status.value}
            error={Litigation_Form.status.error}
            errmsg={Litigation_Form.status.errmsg}
          />
          <div className="AddClientHead">Court Name</div>
          <Labelbox
            type="select"
            // placeholder={"Court Name"}
            dropdown={locationslList.locationData}
            changeData={(data) => checkValidation(data, "courtname")}
            value={Litigation_Form.courtname.value}
            error={Litigation_Form.courtname.error}
            errmsg={Litigation_Form.courtname.errmsg}
          />
          <div className="AddClientHead">Case Type</div>
          <Labelbox
            type="select"
            // placeholder={"Case Type"}
            dropdown={CaseType.caseType}
            changeData={(data) => checkValidation(data, "casetype")}
            value={Litigation_Form.casetype.value}
            error={Litigation_Form.casetype.error}
            errmsg={Litigation_Form.casetype.errmsg}
          />
          <div className="AddClientHead">Court Case No.</div>
          <Labelbox
            type="text"
            // placeholder={"Court Case No."}
            changeData={(data) => checkValidation(data, "courtcaseno")}
            value={Litigation_Form.courtcaseno.value}
            error={Litigation_Form.courtcaseno.error}
            errmsg={Litigation_Form.courtcaseno.errmsg}
          />
          <div className="AddClientHead">DDRA</div>
          <Labelbox
            type="select"
            // placeholder={"DDRA"}
            mode={"multiple"}
            dropdown={employeeList.EmployeeList}
            changeData={(data) =>
              checkValidation(data, "ddra", employeeList.EmployeeList)
            }
            value={Litigation_Form.ddra.value}
            error={Litigation_Form.ddra.error}
            errmsg={Litigation_Form.ddra.errmsg}
          />

          <div className="litigationDatepicker">
            <div>
              <div className="AddClientHead">Next Hearing Date</div>
              <Labelbox
                type="datepicker"
                // placeholder={"Next Hearing Date"}
                disablePast={true}
                changeData={(data) => checkValidation(data, "hearingdate")}
                value={Litigation_Form.hearingdate.value}
                error={Litigation_Form.hearingdate.error}
                errmsg={Litigation_Form.hearingdate.errmsg}
              />
            </div>
            <div>
              <div className="AddClientHead">Due Date</div>
              <Labelbox
                type="datepicker"
                // placeholder={"Due Date"}
                disablePast={true}
                changeData={(data) => checkValidation(data, "duedate")}
                value={Litigation_Form.duedate.value}
                error={Litigation_Form.duedate.error}
                errmsg={Litigation_Form.duedate.errmsg}
                minDate={Litigation_Form.hearingdate.value}
              />
            </div>
          </div>
          <div className="AddClientHead">Sub case</div>
          <Labelbox
            type="select"
            // placeholder={"Sub case"}
            dropdown={SubCaseType.subCaseType}
            changeData={(data) => checkValidation(data, "subcase")}
            value={Litigation_Form.subcase.value}
            error={Litigation_Form.subcase.error}
            errmsg={Litigation_Form.subcase.errmsg}
          />
          <div className="AddClientHead">Suit Value (Numeric)</div>
          <Labelbox
            type="text"
            // placeholder={"Suit Value (Numeric)"}
            changeData={(data) => checkValidation(data, "suitvalue")}
            value={Litigation_Form.suitvalue.value}
            error={Litigation_Form.suitvalue.error}
            errmsg={Litigation_Form.suitvalue.errmsg}
          />
        </Grid>

        <Grid item xs={8} container direction="row">
          <div className="litigationScroller">{LitigationCaseDetails}</div>
          <DynModel
            modelTitle={"Litigation Details"}
            handleChangeModel={litigationCounsel}
            handleChangeCloseModel={(bln) => setLitigationCounsel(bln)}
            content={
              <AddDataModel
                id={IdDetails}
                Litigation_ID={LitigationCase && LitigationCase.ligitation_id}
                handleChangeCloseModel={(bln) => setLitigationCounsel(bln)}
              />
            }
          />
          <div className="customAddcasebtn">
            <CustomButton
              btnName={"SAVE "}
              btnCustomColor="customPrimary"
              custombtnCSS={"btnProjectForm"}
              onBtnClick={() => setConfirmModel(true)}
            />

            <CustomButton
              btnName={"CANCEL "}
              custombtnCSS={"btnProjectForm"}
              onBtnClick={handleCancel}
            />
          </div>
        </Grid>
      </Grid>

      <DynModel
        modelTitle={"Litigation Save"}
        handleChangeModel={confirmmodel}
        handleChangeCloseModel={(bln) => setConfirmModel(bln)}
        content={
          <div className="successModel">
            <div>
              {" "}
              <label className="notfound_label">
                Are You Sure Want to Save ?
              </label>
            </div>
            <div className="customNotFoundbtn">
              <CustomButton btnName={"YES"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onSubmit} />
              <CustomButton btnName={"NO "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setConfirmModel(false)} />
            </div>
          </div>
        }
        width={500}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  EmployeeList: state.getOptions.getEmpListDepartment || [],
  getCourtLocation: state.getOptions.getCourtLocation || [],
  getTradeMarkStatus: state.getOptions.getTradeMarkStatus || [],
  getCaseType: state.getOptions.getCaseType || [],
  getSubCaseType: state.getOptions.getSubCaseType || [],
  getLitigationDetails: state.LitigationReducer.getLitigation || [],
});

export default connect(mapStateToProps)(Litigation);
