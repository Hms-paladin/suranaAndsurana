import react, { useEffect, useState } from 'react';
import './litigation.scss';
import { Tabs, Radio, Divider } from 'antd';
import Grid from '@material-ui/core/Grid';
import Tabcontent from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { InesertResume } from "../../actions/ResumeAction";
import AddIcon from '../../images/addIcon.svg';
import CustomButton from "../../component/Butttons/button";
import { message } from 'antd';
import DynModel from '../../component/Model/model';
import AddDataModel from './adddataModel';
import InterimModel from './interimModel';
import { getCaseType, getEmployeeList, getLocation, getSubCaseType, getTradeMarkStatus } from '../../actions/MasterDropdowns';
import { GetLitigation, InsertLitigation } from '../../actions/Litigation';

const { TabPane } = Tabs;

const Litigation=(props)=> {
    const dispatch = useDispatch()
    const [litigationCounsel, setLitigationCounsel] = useState(false)
    const [litigationInterim, setLitigationInterim] = useState(false)
    const [employeeList, setEmployeeList] = useState({}); const [locationslList, setlocationslList] = useState({});
    const [tradeMarkStatus, setTradeMarkStatus] = useState({});
    const [IdDetails, setIdDetails] = useState({});
    const [CaseType, setCaseType] = useState({});
    const [SubCaseType, setSubCaseType] = useState({});
    const [LitigationCaseDetails, setLitigationCaseDetails] = useState([]);
    const [LitigationCase, setLitigationCase] = useState();
    
    const [Litigation_Form, setLitigationForm] = useState({
        internalcaseno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        courtname: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        casetype: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        courtcaseno: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ddra: {
            value: "", valueById: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        hearingdate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        duedate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        subcase: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        suitvalue: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },

    })
    useEffect(() => {
        dispatch(getEmployeeList());
        dispatch(getLocation());
        dispatch(getTradeMarkStatus());
       dispatch(getCaseType());
      }, []);
      useEffect(() => {
        console.log("id_Props",props.id_Props)
        setIdDetails(props.id_Props)
        dispatch(getSubCaseType(props.id_Props.client_id))
        dispatch(GetLitigation(props.id_Props.project_id))
      }, [props.id_Props])

      useEffect(() => {
        let subCaseType = [];
        props.getSubCaseType.map((data) =>
          subCaseType.push({ value: data.sub_case, id: data.case_id })
        );
        setSubCaseType({subCaseType})
        //______________
    
      
        let MultipleSet = props.getLitigationDetails && props.getLitigationDetails[0] && props.getLitigationDetails[0].case_details.map((data) => {
            let rowDataList= data?.liti_details?.map((val) =>{
                return(
                    <div className="ourCounselFields">
                    <div>{val.name}</div>
                    <div>{val.phone_no}</div>
                    <div>{val.email_id}</div>
                    <div>{val.address}</div>
                    <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />
                </div>
                   )
            })
           return(
               <div className="litigationCounsel">
        <div className="ourCounselTitle">{data.liti_councel}</div>
             {rowDataList}
       </div>
          )
        })
        setLitigationCaseDetails(MultipleSet)
      }, [props.getSubCaseType,props.getLitigationDetails])
      useEffect(() => {
        //hod/attony, Counsel ,DRA and DDRA
        let EmployeeList = [];
        props.EmployeeList.map((data) =>
          EmployeeList.push({ value: data.name, id: data.emp_id })
    
        );
        setEmployeeList({ EmployeeList });
        let locationData = []
        props.getCourtLocation.map((data) =>
        locationData.push({ value: data.location,
            id: data.location_id })
        )
        setlocationslList({ locationData })
        let tradeMark = []
        props.getTradeMarkStatus.map((data) =>
        tradeMark.push({ value: data.Status,
            id: data.status_id })
        )
        setTradeMarkStatus({ tradeMark })
        let caseType = []
        props.getCaseType.map((data) =>
        caseType.push({ value: data.case_type,
            id: data.case_type_id })
        )
        setCaseType({ caseType })
      }, [
        props.EmployeeList,props.getCourtLocation,props.getTradeMarkStatus,props.getCaseType
      ]);
    function onSubmit() {
        // var mainvalue = {};
        // var targetkeys = Object.keys(Litigation_Form);
        // for (var i in targetkeys) {
        //     var errorcheck = ValidationLibrary.checkValidation(
        //         Litigation_Form[targetkeys[i]].value,
        //         Litigation_Form[targetkeys[i]].validation
        //     );
        //     Litigation_Form[targetkeys[i]].error = !errorcheck.state;
        //     Litigation_Form[targetkeys[i]].errmsg = errorcheck.msg;
        //     mainvalue[targetkeys[i]] = Litigation_Form[targetkeys[i]].value;
        // }
        // var filtererr = targetkeys.filter(
        //     (obj) => Litigation_Form[obj].error == true
        // );
        // console.log(filtererr.length);
        // if (filtererr.length > 0) {
        //     // setResumeFrom({ error: true });
        // } else {
        //     // setResumeFrom({ error: false });

            dispatch(InsertLitigation(Litigation_Form,IdDetails)).then(() => {
                handleCancel()
            })
        // }

        setLitigationForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let ResumeFrom_key = [
            "internalcaseno", "status", "courtname", "casetype", "courtcaseno", "ddra", "hearingdate", "duedate", "subcase", "suitvalue"
        ]

        ResumeFrom_key.map((data) => {
            Litigation_Form[data].value = ""
        })
        setLitigationForm(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Litigation_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Litigation_Form[key].validation
        }

        // only for multi select (start)

        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueById = multipleIdList.toString()
        }
        // (end)

        setLitigationForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };

    return (
        <div>
            <div   className="litigationHeader">
                <div className="addCase">Add Case</div>
            </div>
            <Grid item xs={12} container direction="row" spacing={2}>
                <Grid item xs={4} container direction="column" spacing={2} >
                    <Labelbox type="text" placeholder={"Internal Case No."}
                        changeData={(data) => checkValidation(data, "internalcaseno")}
                        value={Litigation_Form.internalcaseno.value}
                        error={Litigation_Form.internalcaseno.error}
                        errmsg={Litigation_Form.internalcaseno.errmsg} />

                    <Labelbox type="select" placeholder={"Status"}
                    dropdown={tradeMarkStatus.tradeMark}
                        changeData={(data) => checkValidation(data, "status")}
                        value={Litigation_Form.status.value}
                        error={Litigation_Form.status.error}
                        errmsg={Litigation_Form.status.errmsg} />

                    <Labelbox type="select" placeholder={"Court Name"}
                    dropdown={locationslList.locationData}
                        changeData={(data) => checkValidation(data, "courtname")}
                        value={Litigation_Form.courtname.value}
                        error={Litigation_Form.courtname.error}
                        errmsg={Litigation_Form.courtname.errmsg} />

                    <Labelbox type="select" placeholder={"Case Type"}
                    dropdown={CaseType.caseType}
                        changeData={(data) => checkValidation(data, "casetype")}
                        value={Litigation_Form.casetype.value}
                        error={Litigation_Form.casetype.error}
                        errmsg={Litigation_Form.casetype.errmsg} />

                    <Labelbox type="text" placeholder={"Court Case No."}
                        changeData={(data) => checkValidation(data, "courtcaseno")}
                        value={Litigation_Form.courtcaseno.value}
                        error={Litigation_Form.courtcaseno.error}
                        errmsg={Litigation_Form.courtcaseno.errmsg} />

                    <Labelbox type="select" placeholder={"DDRA"}
                    mode={"multiple"}
                   dropdown={employeeList.EmployeeList}
                        changeData={(data) => checkValidation(data, "ddra")}
                        value={Litigation_Form.ddra.value}
                        error={Litigation_Form.ddra.error}
                        errmsg={Litigation_Form.ddra.errmsg} />

                    <div className="litigationDatepicker" >
                        <div > <Labelbox type="datepicker" placeholder={"Next Hearing Date"}
                            changeData={(data) => checkValidation(data, "hearingdate")}
                            value={Litigation_Form.hearingdate.value}
                            error={Litigation_Form.hearingdate.error}
                            errmsg={Litigation_Form.hearingdate.errmsg} />
                        </div>
                        <div > <Labelbox type="datepicker" placeholder={"Due Date"}
                            changeData={(data) => checkValidation(data, "duedate")}
                            value={Litigation_Form.duedate.value}
                            error={Litigation_Form.duedate.error}
                            errmsg={Litigation_Form.duedate.errmsg} />
                        </div>
                    </div>
                    <Labelbox type="select" placeholder={"Sub case"}
                    dropdown={SubCaseType.subCaseType}
                        changeData={(data) => checkValidation(data, "subcase")}
                        value={Litigation_Form.subcase.value}
                        error={Litigation_Form.subcase.error}
                        errmsg={Litigation_Form.subcase.errmsg} />

                    <Labelbox type="text" placeholder={"Suit Value (Numeric)"}
                        changeData={(data) => checkValidation(data, "suitvalue")}
                        value={Litigation_Form.suitvalue.value}
                        error={Litigation_Form.suitvalue.error}
                        errmsg={Litigation_Form.suitvalue.errmsg} />


                </Grid>

                <Grid item xs={8} container direction="row"  >
                    <div className="litigationScroller">
                        {/* <div className="litigationCounsel">
                            <div className="ourCounselTitle">Our Counsel</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                            </div>
                        </div>
                        <div className="litigationCounsel">
                            <div className="ourCounselTitle">External Counsel</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                            </div>
                        </div>
                        <div className="litigationCounsel">
                            <div className="ourCounselTitle">Opposite Party </div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                            </div>
                        </div>
                        <div className="litigationCounsel">
                            <div className="ourCounselTitle">Opposite Party Counsel</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />

                            </div>
                        </div>
                        <div className="litigationCounsel">
                            <div className="ourCounselTitle">Opposite Party Counsel</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationCounsel(true)} />
                            </div>
                        </div>
                        <div className="litigationCounsel">
                            <div className="ourCounselTitle">Adjournment</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                            </div>
                        </div>*/}
                        {/* <div className="litigationCounsel"> 
                            <div className="ourCounselTitle">Interim</div>
                            <div className="ourCounselFields">
                                <div>Name</div>
                                <div>Phone No</div>
                                <div>Email ID</div>
                                <div>Address</div>
                                <img src={AddIcon} onClick={() => setLitigationInterim(true)} />
                            </div>
                        </div> */}
                        {LitigationCaseDetails}
                    </div>
                    <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationCounsel} handleChangeCloseModel={(bln) => setLitigationCounsel(bln)} content={<AddDataModel />} />
                    <DynModel modelTitle={"Litigation Details"} handleChangeModel={litigationInterim} handleChangeCloseModel={(bln) => setLitigationInterim(bln)} content={<InterimModel />} />
                    <div className="customAddcasebtn">
                        <CustomButton btnName={"SAVE "} btnCustomColor="customPrimary" custombtnCSS={"btnProjectForm"} onBtnClick={onSubmit} />

                        <CustomButton btnName={"CANCEL "} custombtnCSS={"btnProjectForm"}  onBtnClick={handleCancel}/>


                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = (state) => ({
    EmployeeList: state.getOptions.getEmployeeList || [],
    getCourtLocation: state.getOptions.getCourtLocation || [],
    getTradeMarkStatus: state.getOptions.getTradeMarkStatus || [],
    getCaseType: state.getOptions.getCaseType || [],
    getSubCaseType: state.getOptions.getSubCaseType || [],
    getLitigationDetails:state.LitigationReducer.getLitigation || []
  });
  
  export default connect(mapStateToProps)(Litigation);
