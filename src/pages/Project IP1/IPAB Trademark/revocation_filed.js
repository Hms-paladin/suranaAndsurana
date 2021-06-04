import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getTradeMarkStatus,getClassDetails, insertIPAB, getIPAP} from "../../../actions/tradeMarkAction";
import moment from 'moment'
import { useParams } from "react-router-dom";

function RevocationFiled(props) {
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [filingTypeList, setFilingTypeList] = useState({})
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    const dispatch = useDispatch()
    let { rowId } = useParams()
    var params = {};
    
    useEffect(() => {
        dispatch(getIPAP(rowId));
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        
        
      }, []);

      useEffect(() => {
          
        if(props.tradeMark && props.tradeMark[0]){
            let obj = props.tradeMark[0];
            TradeMarkForm.project_id =obj.project_id;
            TradeMarkForm.trademark_ipab_id = obj.trademark_ipab_id;
            TradeMarkForm.status_id.value = obj.status_id;
            if(obj.status_id && obj.status_id.length)
            TradeMarkForm.status_id.disabled = true;
            
            TradeMarkForm.class_id.value = obj.class_id;
            if(obj.class_id && obj.class_id.length)
            TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.comments.value =obj.comments
            if(obj.comments && obj.comments.length)
            TradeMarkForm.comments.disabled = true;
            
            TradeMarkForm.trademark_no.value =obj.trademark_no;
            if(obj.trademark_no && obj.trademark_no.length)
            TradeMarkForm.trademark_no.disabled = true;

            TradeMarkForm.serial_no.value =obj.serial_no;
            if(obj.serial_no && obj.serial_no.length)
            TradeMarkForm.serial_no.disabled = true;

            TradeMarkForm.org_appeal_no.value=obj.org_appeal_no;
            if(obj.org_appeal_no && obj.org_appeal_no.length)
            TradeMarkForm.org_appeal_no.disabled = true;

            TradeMarkForm.hearing_date.value =obj.hearing_date;
            if(obj.hearing_date && obj.hearing_date.length)
            TradeMarkForm.hearing_date.disabled = true;

            TradeMarkForm.filing_type_id.value =obj.filing_type_id;
            if(obj.filing_type_id && obj.filing_type_id.length)
            TradeMarkForm.filing_type_id.disabled = true;
            
            TradeMarkForm.mark.value =obj.mark;
            if(obj.mark && obj.mark.length)
            TradeMarkForm.mark.disabled = true;
            
            TradeMarkForm.respondent.value =obj.respondent;
            if(obj.respondent && obj.respondent.length)
            TradeMarkForm.respondent.disabled = true;
            
            TradeMarkForm.respondent_rep.value =obj.respondent_rep;
            if(obj.respondent_rep && obj.respondent_rep.length)
            TradeMarkForm.respondent_rep.disabled = true;
            
            TradeMarkForm.client_responent.value =obj.client_responent;
            if(obj.client_responent && obj.client_responent.length)
            TradeMarkForm.client_responent.disabled = true;
            
            TradeMarkForm.revocation_filing_date.value =obj.revocation_filing_date;
            if(obj.revocation_filing_date && obj.revocation_filing_date.length)
            TradeMarkForm.revocation_filing_date.disabled = true;
        }

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
        "ip_type":"ddf",
        "client_status_type": null,
        "trademark_ipab_id":  TradeMarkForm.trademark_ipab_id,
        "project_id": projectDetails.project_id,
        "trademark_no" :TradeMarkForm.trade_mark_no.value,
        "class_id" :TradeMarkForm.class_id.value,
        "rectification_filing" :"",
        "serial_no" :TradeMarkForm.serial_no.value,
        "org_appeal_no" :TradeMarkForm.org_appeal_no.value,
        "hearing_date":TradeMarkForm.date_of_hearing.value || "",
        "opp_applicant" :"",
        "opp_applicant_rep" :"",
        "filing_type_id" :TradeMarkForm.filing_type_id.value,
        "status_id" :TradeMarkForm.status_id.value,
        "comments":TradeMarkForm.comments.value,
        "created_on" : moment().format('YYYY-MM-DD HH:m:s')  || ""  ,
        "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   || "" ,
        "created_by" :localStorage.getItem("empId"),
        "updated_by" :localStorage.getItem("empId"),
        "client_application" :"",
        "mark" :TradeMarkForm.mark.value,
        "respondent" :TradeMarkForm.respondent.value,
        "respondent_rep" :TradeMarkForm.respondent_rep.value,
        "client_responent" :TradeMarkForm.client_responent.value,
        "revocation_filing_date" :TradeMarkForm.revocation_filing_date.value || "",
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
        "ip_type",  "client_status_type", "trademark_ipab_id", "project_id", "trademark_no",  "class_id", "rectification_filing", "serial_no", "org_appeal_no", "hearing_date", 
        "opp_applicant", "opp_applicant_rep", "filing_type_id", "status_id", "comments", "created_on", "updated_on", "created_by",  "updated_by", "client_application", 
        "mark", "respondent", "respondent_rep", "client_responent", "revocation_filing_date", "applicant_no", "patent_title", "appeal_filing_date"
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
    client_applicant: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    trademark_ipab_id: {
        value: 0,
        validation: [],
        error: null,
        errmsg: null,
        disabled: false,
    },
    mark: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    trade_mark_no: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    class_id: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    revocation_filing_date: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    serial_no: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    org_appeal_no: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    date_of_hearing: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    respondent: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    respondent_rep: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    filing_type_id: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    status_id: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    comments: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
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
    return (
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
                        placeholder={" Mark "}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "mark")}
                              value={TradeMarkForm.mark.value}
                               error={TradeMarkForm.mark.error}
                               errmsg={TradeMarkForm.mark.errmsg}
                               disabled={TradeMarkForm.mark.disabled}
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
                        placeholder={" Revocation Filing Date "}
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "revocation_filing_date")}
                        value={TradeMarkForm.revocation_filing_date.value}
                        error={TradeMarkForm.revocation_filing_date.error}
                        errmsg={TradeMarkForm.revocation_filing_date.errmsg} 
                        disabled={TradeMarkForm.revocation_filing_date.disabled}
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
                        placeholder={" Org Appeal No."}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "org_appeal_no")}
                              value={TradeMarkForm.org_appeal_no.value}
                               error={TradeMarkForm.org_appeal_no.error}
                               errmsg={TradeMarkForm.org_appeal_no.errmsg}
                               disabled={TradeMarkForm.org_appeal_no.disabled}
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
                    <Labelbox type="text"
                        placeholder={" Respondent "}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "respondent")}
                              value={TradeMarkForm.respondent.value}
                               error={TradeMarkForm.respondent.error}
                               errmsg={TradeMarkForm.respondent.errmsg}
                               disabled={TradeMarkForm.respondent.disabled}
                               />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Respondent - Rep "}
                        disableFuture={false}
                              changeData={(data) => checkValidation(data, "respondent_rep")}
                              value={TradeMarkForm.respondent_rep.value}
                               error={TradeMarkForm.respondent_rep.error}
                               errmsg={TradeMarkForm.respondent_rep.errmsg}
                               disabled={TradeMarkForm.respondent_rep.disabled}
                               />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="select"
                        placeholder={" Filing Type"} changeData={(data) => checkValidation(data, "filing_type_id")}
                        dropdown={tradeStatusList.filingTypeData} 
                        value={TradeMarkForm.filing_type_id.value}
                        error={TradeMarkForm.filing_type_id.error}
                        errmsg={TradeMarkForm.filing_type_id.errmsg}
                        disabled={TradeMarkForm.filing_type_id.disabled}
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
    tradeMark: state.tradeMarkReducer.getIPAP || {},
});

export default connect(mapStateToProps)(RevocationFiled);