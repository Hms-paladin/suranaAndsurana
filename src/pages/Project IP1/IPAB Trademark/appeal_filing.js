import React,{useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getTradeMarkStatus, getClassDetails, insertIPAB} from "../../../actions/tradeMarkAction";
import moment from 'moment'

function AppealFiling(props){
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [filingTypeList, setFilingTypeList] = useState({})
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    console.log("appeal Filing", props);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());        
        
      }, []);

      useEffect(() => {
//         if(props.tradeMark && props.tradeMark[0]){
//             let obj = props.tradeMark[0];
//         TradeMarkForm.comments.value =obj.comments;
//         // TradeMarkForm.trademark_id.value = obj.trademark_id;

//         TradeMarkForm.status_id.value = obj.status_id;
//         if(obj.status_id && obj.status_id.length)
//         TradeMarkForm.status_id.disabled = true;


//         TradeMarkForm.date_of_hearing.value =obj.date_of_hearing
//         if(obj.date_of_hearing && obj.date_of_hearing.length)
//          TradeMarkForm.date_of_hearing.disabled = true;

//         //"upload_image" :selectedFile,
//         TradeMarkForm.serial_no.value =obj.serial_no;
//         if(obj.serial_no && obj.serial_no.length)
//         TradeMarkForm.serial_no.disabled = true;

//         "status_id", "class_id", "comments", "client_applicant", "client_mark", "trade_mark_no", "appeal_filing_date", "", ""
//         TradeMarkForm.application_date.value =obj.application_date;
//         if(obj.application_date && obj.application_date.length)
//         TradeMarkForm.application_date.disabled = true;

//         TradeMarkForm.usage_from_date.value=obj.usage_from_date;
//         if(obj.usage_from_date && obj.usage_from_date.length)
//         TradeMarkForm.usage_from_date.disabled = true;

//         TradeMarkForm.ip_india_status.value =obj.ip_india_status;
//         if(obj.ip_india_status && obj.ip_india_status.length)
//         TradeMarkForm.ip_india_status.disabled = true;

//         TradeMarkForm.internal_status.value =obj.internal_status;
//         if(obj.internal_status && obj.internal_status.length)
//         TradeMarkForm.internal_status.disabled = true;


//         TradeMarkForm.allotment.value=obj.allotment;
//         if(obj.allotment && obj.allotment.length)
//         TradeMarkForm.allotment.disabled = true;


//         TradeMarkForm.amendment.value =obj.amendment;
//         if(obj.amendment && obj.amendment.length)
//         TradeMarkForm.amendment.disabled = true;


//          // "orders":TradeMarkForm.orders.value,
//         TradeMarkForm.priority_details.value =obj.priority_details;
//         if(obj.priority_details && obj.priority_details.length)
//         TradeMarkForm.priority_details.disabled = true;


//         TradeMarkForm.tmj_number.value =obj.tmj_number;
//         if(obj.tmj_number && obj.tmj_number.length)
//         TradeMarkForm.tmj_number.disabled = true;


//        TradeMarkForm.tmj_date.value = obj.tmj_date;
//        if(obj.tmj_date && obj.tmj_date.length)
//         TradeMarkForm.status_id.disabled = true;

//         }
    setProjectDetails(props.ProjectDetails);
  props.ProjectDetails.length > 0 && setidDetails({
      project_id:props.ProjectDetails[0].project_id,
      client_id:props.ProjectDetails[0].client_id,
  })

    let tradeStatusData = []
    props.tradeStatusList.map((data) =>
tradeStatusData.push({ value: data.Status,
    id: data.status_id })
)
  settradeStatusList({ tradeStatusData })

  let classDetailsData = []
  props.classDetailsList.map((data) =>
  classDetailsData.push({ value: data.class,
  id: data.class_id })
)
setclassDetList({ classDetailsData })
let filingTypeData = []
props.filingTypeList.map((data) =>
filingTypeData.push({ value: data.filing_type,
id: data.filing_type_id })
)
setFilingTypeList({ filingTypeData })
}, [props.tradeStatusList,props.classDetailsList, props.filingTypeData, props.ProjectDetails]);



function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(TradeMarkForm);
    var filtererr = targetkeys.filter(
        (obj) => TradeMarkForm[obj].error == true
    ); 
    console.log(filtererr.length);
    let params  = {
         "ip_type":0,
        "client_status_type": null,
        "trademark_ipab_id": 0,
        "project_id": projectDetails.project_id,
        "trademark_no" :TradeMarkForm.trade_mark_no.value,
        "class_id" :TradeMarkForm.class_id.value,
        "rectification_filing" :null,
        "serial_no" :TradeMarkForm.serial_no.value,
        "org_appeal_no" :0,
        "hearing_date":TradeMarkForm.date_of_hearing.value  || "",
        "opp_applicant" :"",
        "opp_applicant_rep" :"",
        "filing_type_id" :0,
        "status_id" :TradeMarkForm.status_id.value,
        "comments":TradeMarkForm.comments.value,
        "created_on" : moment().format('YYYY-MM-DD HH:m:s') || ""  ,
        "updated_on" : moment().format('YYYY-MM-DD HH:m:s')  || ""  ,
        "created_by" :localStorage.getItem("empId"),
        "updated_by" :localStorage.getItem("empId"),
        "client_application" :"",
        "mark" :TradeMarkForm.client_mark.value,
        "respondent" :"",
        "respondent_rep" :"",
        "client_responent" :"",
        "revocation_filing_date" :"",
        "applicant_no":"",
        "patent_title":"",
        "appeal_filing_date":""
    }
    console.log("paramscheck", params);
    if(TradeMarkForm.class_id.value != ""){
        params["class_id"] =TradeMarkForm.class_id.value;
    }
    if (filtererr.length > 0) {
        // setTradeMarkForm({ error: true });
    } else {
        // setTradeMarkForm({ error: false });

        dispatch(insertIPAB(params)).then(() => {
            handleCancel()
        })
    }

    setTradeMarkForm(prevState => ({
        ...prevState
    }));
};


const handleCancel = () => {
    let From_key = [
        "status_id", "class_id", "comments", "client_applicant", "client_mark", "trade_mark_no", "appeal_filing_date", "serial_no", "date_of_hearing"
    ]

    From_key.map((data) => {
        try {
            TradeMarkForm[data].value = "";
          console.log("appealFiling cancel", TradeMarkForm[data].value);
        } catch (error) {
          throw error;
        }
      });
    setTradeMarkForm(prevState => ({
        ...prevState,
    }));
}

const [TradeMarkForm, setTradeMarkForm] = useState({
    status_id: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    class_id: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    client_applicant: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    trade_mark_no: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    client_mark: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    appeal_filing_date: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    serial_no: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    appeal_no: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    comments: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    date_of_hearing: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    }
})



function checkValidation(data, key, multipleId) {

    var errorcheck = ValidationLibrary.checkValidation(
        data,
        TradeMarkForm[key].validation
    );
    let dynObj = {
        value: data,
        error: !errorcheck.state,
        errmsg: errorcheck.msg,
        validation: TradeMarkForm[key].validation
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

    setTradeMarkForm(prevState => ({
        ...prevState,
        [key]: dynObj,
    }));

};
    return(
        <div>
            <Grid item xs={12} container direction="row" spacing={2}>
            <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Client - Applicant"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "client_applicant")}
                              value={TradeMarkForm.client_applicant.value}
                               error={TradeMarkForm.client_applicant.error}
                               errmsg={TradeMarkForm.client_applicant.errmsg}
                               disabled={TradeMarkForm.client_applicant.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Mark"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "client_mark")}
                              value={TradeMarkForm.client_mark.value}
                               error={TradeMarkForm.client_mark.error}
                               errmsg={TradeMarkForm.client_mark.errmsg}
                               disabled={TradeMarkForm.client_mark.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Trade Mark No"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "trade_mark_no")}
                              value={TradeMarkForm.trade_mark_no.value}
                               error={TradeMarkForm.trade_mark_no.error}
                               errmsg={TradeMarkForm.trade_mark_no.errmsg}
                               disabled={TradeMarkForm.trade_mark_no.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    {/* <Labelbox type="select" placeholder="Class"></Labelbox> */}
                    <Labelbox type="select"
                        placeholder={" Class"}
                        
                              dropdown={classDetList.classDetailsData}  
                              changeData={(data) => checkValidation(data, "class_id")}
                              value={TradeMarkForm.class_id.value}
                               error={TradeMarkForm.class_id.error}
                               errmsg={TradeMarkForm.class_id.errmsg}
                               disabled={TradeMarkForm.class_id.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="datepicker"
                        placeholder={" Appeal Filing Date "}
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "appeal_filing_date")}
                        value={TradeMarkForm.appeal_filing_date.value}
                        error={TradeMarkForm.appeal_filing_date.error}
                        errmsg={TradeMarkForm.appeal_filing_date.errmsg} 
                        disabled={TradeMarkForm.appeal_filing_date.disabled}
                        />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Serial No"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "serial_no")}
                              value={TradeMarkForm.serial_no.value}
                               error={TradeMarkForm.serial_no.error}
                               errmsg={TradeMarkForm.serial_no.errmsg}
                               disabled={TradeMarkForm.serial_no.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Appeal No"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "appeal_no")}
                              value={TradeMarkForm.appeal_no.value}
                               error={TradeMarkForm.appeal_no.error}
                               errmsg={TradeMarkForm.appeal_no.errmsg}
                               disabled={TradeMarkForm.appeal_no.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="datepicker"
                        placeholder={" Date of Hearing "}
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "date_of_hearing")}
                        value={TradeMarkForm.date_of_hearing.value}
                        error={TradeMarkForm.date_of_hearing.error}
                        errmsg={TradeMarkForm.date_of_hearing.errmsg} 
                        disabled={TradeMarkForm.date_of_hearing.disabled}
                        />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="select"
                        placeholder={" Status"} changeData={(data) => checkValidation(data, "status_id")}
                dropdown={tradeStatusList.tradeStatusData} 
                value={TradeMarkForm.status_id.value}
                error={TradeMarkForm.status_id.error}
                errmsg={TradeMarkForm.status_id.errmsg}
                disabled={TradeMarkForm.status_id.disabled}
                />
                    {/* <Labelbox type="select" placeholder="Status"></Labelbox> */}
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Comments"}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "comments")}
                              value={TradeMarkForm.comments.value}
                               error={TradeMarkForm.comments.error}
                               errmsg={TradeMarkForm.comments.errmsg}
                               disabled={TradeMarkForm.comments.disabled}
                               />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <div className="trademarkbtn">
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"   onBtnClick={handleCancel}  />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList : state.tradeMarkReducer.getClassDetailsList || [],
    filingTypeList : state.tradeMarkReducer.getFilingTypeList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(AppealFiling);