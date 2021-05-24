import React,{useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABpatent.scss'
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getTradeMarkStatus,getClassDetails, insertPatentRectificationDef} from "../../../actions/tradeMarkAction";
import moment from 'moment'

function PatentAppealFiling(props){
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        
        
      }, []);

      useEffect(() => {
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
}, [props.tradeStatusList,props.classDetailsList]);


function onSubmit() {
    var mainvalue = {};
    var targetkeys = Object.keys(TradeMarkForm);
    var filtererr = targetkeys.filter(
        (obj) => TradeMarkForm[obj].error == true
    ); 
    console.log(filtererr.length);
    let params  = {
        
        "client_application":TradeMarkForm.client_applicant.value,
        "applicant_no":TradeMarkForm.applicant_no.value,
        "patent_title":TradeMarkForm.patent_title.value,
        "appeal_filing_date":TradeMarkForm.appeal_filing_date.value,
        "serial_no":TradeMarkForm.serial_no.value,
        "org_appeal_no":TradeMarkForm.org_appeal_no.value,
        "date_of_hearing":TradeMarkForm.date_of_hearing.value, 
        "status_id":TradeMarkForm.status_id.value,
        "comments":TradeMarkForm.comments.value,
         "created_by" :localStorage.getItem("empId"),
         "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
         "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
         "updated_by" :localStorage.getItem("empId"),
         "ip_address" :"ddf"
    }
    if(TradeMarkForm.class_id.value != ""){
        params["class_id"] =TradeMarkForm.class_id.value;
    }
    if (filtererr.length > 0) {
        // setTradeMarkForm({ error: true });
    } else {
        // setTradeMarkForm({ error: false });

        dispatch(insertPatentRectificationDef(params)).then(() => {
            handleCancel()
        })
    }

    setTradeMarkForm(prevState => ({
        ...prevState
    }));
};


const handleCancel = () => {
    let From_key = [
        "client_application", "applicant_no", "patent_title", "appeal_filing_date", "serial_no", "org_appeal_no", "date_of_hearing", "status_id", "comments"
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
    client_application: {
        value: 0,
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    applicant_no: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
        disabled: false,

    },
    patent_title: {
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
    org_appeal_no: {
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

    },
    status_id: {
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
                        changeData={(data) => checkValidation(data, "client_application")}
                        value={TradeMarkForm.client_application.value}
                        error={TradeMarkForm.client_application.error}
                        errmsg={TradeMarkForm.client_application.errmsg} 
                        disabled={TradeMarkForm.client_application.disabled}
                        />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Applicant No "}
                        changeData={(data) => checkValidation(data, "applicant_no")}
                        value={TradeMarkForm.applicant_no.value}
                        error={TradeMarkForm.applicant_no.error}
                        errmsg={TradeMarkForm.applicant_no.errmsg} 
                        disabled={TradeMarkForm.applicant_no.disabled}
                        />
                </Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Patent Title "}
                        changeData={(data) => checkValidation(data, "patent_title")}
                        value={TradeMarkForm.patent_title.value}
                        error={TradeMarkForm.patent_title.error}
                        errmsg={TradeMarkForm.patent_title.errmsg} 
                        disabled={TradeMarkForm.patent_title.disabled}
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
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Serial No "}
                        changeData={(data) => checkValidation(data, "serial_no")}
                        value={TradeMarkForm.serial_no.value}
                        error={TradeMarkForm.serial_no.error}
                        errmsg={TradeMarkForm.serial_no.errmsg} 
                        disabled={TradeMarkForm.serial_no.disabled}
                        />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Labelbox type="text"
                        placeholder={" Org Appeal No "}
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
            <div className="patentbtn">
                <CustomButton btnName={"Save"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={onSubmit} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel"   onBtnClick={handleCancel}  />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList : state.tradeMarkReducer.getClassDetailsList || []
});

export default connect(mapStateToProps)(PatentAppealFiling);