import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import CustomButton from '../../../component/Butttons/button';
import moment from 'moment'
import {
    getTradeMarkStatus, getClassDetails, getPoaDetails, getCountryDetails, getTradeMark,
    getUsageDetails, insertTradeMark
} from "../../../actions/tradeMarkAction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";
function TradeMarkOposition2(properties) {

    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    useEffect(() => {
        dispatch(getTradeMark(rowId));
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails());
        dispatch(getUsageDetails());
        dispatch(getCountryDetails());

    }, []);

    useEffect(() => {
        handleCancel()
        if (properties.tradeMark && properties.tradeMark[0]) {
            let obj = properties.tradeMark[0];
            TradeMarkForm.trademark_id.value = obj.trademark_id;

            TradeMarkForm.status_id.value = obj.status_id;
            // if (obj.status_id && obj.status_id.length)
            //     TradeMarkForm.status_id.disabled = true;
            
            if(obj.deadline!=null&&obj.deadline!="0000-00-00"){    
                TradeMarkForm.end_date.value = obj.deadline;
                // if (obj.deadline && obj.deadline.length)
                //     TradeMarkForm.end_date.disabled = true;
            }  
            TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            //     TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.oppositionNumber.value = obj.application_no;
            // if (obj.application_no && obj.application_no.length)
            //     TradeMarkForm.oppositionNumber.disabled = true;

            TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            // TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            // TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;
        
            TradeMarkForm.mark_id.value = obj.mark_id;
            // if (obj.mark_id && obj.mark_id.length)
            //     TradeMarkForm.mark_id.disabled = true;

            TradeMarkForm.ourReference.value = obj.our_reference;
            // if (obj.ourReference && obj.ourReference.length)
            //     TradeMarkForm.ourReference.disabled = true;

            // "upload_image" :selectedFile,
            TradeMarkForm.application_no.value = obj.application_no;
            // if (obj.application_no && obj.application_no.length)
            //     TradeMarkForm.application_no.disabled = true;

            TradeMarkForm.application_date.value = obj.application_date;
            // if (obj.application_date && obj.application_date.length)
            //     TradeMarkForm.application_date.disabled = true;

            TradeMarkForm.tmj_number.value = obj.tmj_number;
            // if (obj.tmj_number && obj.tmj_number.length)
            //     TradeMarkForm.tmj_number.disabled = true;

            TradeMarkForm.status_id.value = obj.status_id;
            // if (obj.status_id && obj.status_id.length)
            //     TradeMarkForm.status_id.disabled = true;

            if(obj.tmj_date!="0000-00-00"){
                TradeMarkForm.tmj_date.value = obj.tmj_date;
                // if (obj.tmj_date && obj.tmj_date.length)
                //     TradeMarkForm.tmj_date.disabled = true;
            }

            TradeMarkForm.oppositionNumber.value = obj.opposition_no;
            // if (obj.opposition_no && obj.opposition_no.length)
            //     TradeMarkForm.oppositionNumber.disabled = true;

            TradeMarkForm.applicant.value = obj.applicant;
            // if (obj.applicant && obj.applicant.length)
            //     TradeMarkForm.applicant.disabled = true;

            TradeMarkForm.applicantAgent.value = obj.applicant_agent;
            // if (obj.applicantAgent && obj.applicantAgent.length)
            //     TradeMarkForm.applicantAgent.disabled = true;

            TradeMarkForm.internal_status.value = obj.internal_status;
            // if (obj.internal_status && obj.internal_status.length)
            //     TradeMarkForm.internal_status.disabled = true;

            obj.upload_image && (obj.upload_image != '') && (TradeMarkForm.upload.view_file = obj.upload_image);
            obj.orders && (obj.orders != '') && (TradeMarkForm.orders.view_file = obj.orders);
        }


        let tradeStatusData = []
        properties.tradeStatusList.map((data) =>
            tradeStatusData.push({
                value: data.Status,
                id: data.status_id
            })
        )
        settradeStatusList({ tradeStatusData })

        let classDetailsData = []
        properties.classDetailsList.map((data) =>
            classDetailsData.push({
                value: data.class,
                id: data.class_id
            })
        )
        setclassDetList({ classDetailsData })

    }, [properties.tradeStatusList, properties.classDetailsList,properties.tradeMark  ]);

    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
    }, [])
  
    const [TradeMarkForm, setTradeMarkForm] = useState({
        trademark_id: {
            value: 0,
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        applicantAgent: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        oppositionNumber: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },  
        status_id: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        class_id: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        mark_id: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, 
        end_date: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        applicant: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        application_no: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        application_date: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        ourReference: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        internal_status: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        tmj_number: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        tmj_date: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        upload: {
            value: null,
            error: null,
            errmsg: null,
            disabled: false,
            view_file: null
        },
        orders: {
            value: null,
            error: null,
            errmsg: null,
            disabled: false,
            view_file: null
        },


    })

    function onSubmit() {

          var mainvalue = {};
          var targetkeys = Object.keys(TradeMarkForm);
          for (var i in targetkeys) {
              var errorcheck = ValidationLibrary.checkValidation(
                  TradeMarkForm[targetkeys[i]].value,
                  TradeMarkForm[targetkeys[i]].validation
              );
              TradeMarkForm[targetkeys[i]].error = !errorcheck.state;
              TradeMarkForm[targetkeys[i]].errmsg = errorcheck.msg;
              mainvalue[targetkeys[i]] = TradeMarkForm[targetkeys[i]].value;
          }
          var filtererr = targetkeys.filter(
              (obj) => TradeMarkForm[obj].error == true
          ); 
        console.log(filtererr.length);
        
        // let params = {
        //     "project_id": rowId,//radeMarkForm.project_id.value,
        //     "status_id":TradeMarkForm.status_id.value===''?'0':TradeMarkForm.status_id.value,
        //     "our_reference": TradeMarkForm.ourReference.value,
        //     "mark_id": TradeMarkForm.mark_id.value===''?'0':TradeMarkForm.mark_id.value,
        //     "upload_image": selectedFile,
        //     "application_no": TradeMarkForm.application_no.value,
        //     "application_date": TradeMarkForm.application_date.value,
        //     "tmj_number": TradeMarkForm.tmj_number.value,
        //     "tmj_date": TradeMarkForm.tmj_date.value===''?'0000-00-00':TradeMarkForm.tmj_date.value, 
        //     "opposition_no": TradeMarkForm.oppositionNumber.value,
        //     "applicant": TradeMarkForm.applicant.value,
        //     "applicant_agent": TradeMarkForm.applicantAgent.value,
        //     "internal_status": TradeMarkForm.internal_status.value,
        //     "deadline":TradeMarkForm.end_date.value===''?'0000-00-00':TradeMarkForm.end_date.value,
        //     "created_by": localStorage.getItem("empId"),
        //     "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        //     "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
        //     "updated_by": localStorage.getItem("empId"),
        //     "ip_address": "ddf"
        // }
// console.log(TradeMarkForm.orders.value,"TradeMarkForm.orders.value")
        let formData = new FormData();
        formData.append("project_id",rowId)
        formData.append("status_id",TradeMarkForm.status_id.value===''?'0':TradeMarkForm.status_id.value)
        formData.append("our_reference",TradeMarkForm.ourReference.value||'')
        formData.append("mark_id",TradeMarkForm.mark_id.value)
        formData.append("upload_image",(!TradeMarkForm.upload.view_file&&!TradeMarkForm.upload.value)?[]:(TradeMarkForm.upload.value?TradeMarkForm.upload.value:TradeMarkForm.upload.view_file.substr(35) ))
        formData.append("orders", (!TradeMarkForm.orders.view_file&&!TradeMarkForm.orders.value)?[]:(TradeMarkForm.orders.value?TradeMarkForm.orders.value:TradeMarkForm.orders.view_file.substr(35) ))
        formData.append("application_no",TradeMarkForm.application_no.value||'')
        formData.append("application_date",TradeMarkForm.application_date.value===''?'0000-00-00':TradeMarkForm.application_date.value)
        formData.append("tmj_number",TradeMarkForm.tmj_number.value||'')
        formData.append("tmj_date",TradeMarkForm.tmj_date.value===''?'0000-00-00':TradeMarkForm.tmj_date.value)

        formData.append("opposition_no",TradeMarkForm.oppositionNumber.value||'')
        formData.append("applicant",TradeMarkForm.applicant.value||'')
        formData.append("applicant_agent",TradeMarkForm.applicantAgent.value||'')
        
        formData.append("deadline",TradeMarkForm.end_date.value===''?'0000-00-00':TradeMarkForm.end_date.value)
        formData.append("internal_status",TradeMarkForm.internal_status.value)

        formData.append("created_by",localStorage.getItem("empId"))
        formData.append("created_on",moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("updated_on",moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("updated_by",localStorage.getItem("empId"))
        formData.append("ip_address","ddf")

        if (TradeMarkForm.class_id.value&&TradeMarkForm.class_id.value != "") {
            formData.set("class_id",TradeMarkForm.class_id.value)
            // params["class_id"] = TradeMarkForm.class_id.value;
        }

        if (TradeMarkForm.trademark_id.value != 0) {
            formData.set("trademark_id",TradeMarkForm.trademark_id.value)
        }

        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
        dispatch(insertTradeMark(formData,TradeMarkForm,rowId)).then(() => {
            handleCancel()
        })
    }
        /* if (filtererr.length > 0) {
             // setResumeFrom({ error: true });
         } else {
             
            
         }
 */
        setTradeMarkForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let From_key = ["ourReference", "status_id", "class_id", "applicant", "applicantAgent", "mark_id", "application_no", "application_date",
            "end_date","oppositionNumber", "internal_status", "tmj_number", "tmj_date","upload","orders"
        ]

        From_key.map((data) => {
            try {
                if (data != "upload"||data != "orders") {
                    TradeMarkForm[data].value = ""
                } else {
                    TradeMarkForm[data].view_file = ""
                    TradeMarkForm[data].value = null;
                }
            } catch (error) {
                throw error;
            }
        });
        setTradeMarkForm(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            TradeMarkForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            view_file: TradeMarkForm[key].view_file && TradeMarkForm[key].view_file,
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
        <div className="trademarkOpsosotionContainer">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Status</div>
                        <Labelbox type="select"
                             changeData={(data) => checkValidation(data, "status_id")}
                            dropdown={tradeStatusList.tradeStatusData}
                            value={TradeMarkForm.status_id.value}
                            error={TradeMarkForm.status_id.error}
                            errmsg={TradeMarkForm.status_id.errmsg}
                            disabled={TradeMarkForm.status_id.disabled}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Tradeheadings">Our Reference</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "ourReference")}
                            value={TradeMarkForm.ourReference.value}
                            error={TradeMarkForm.ourReference.error}
                            errmsg={TradeMarkForm.ourReference.errmsg}
                            disabled={TradeMarkForm.ourReference.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Mark</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "mark_id")}
                            value={TradeMarkForm.mark_id.value}
                            error={TradeMarkForm.mark_id.error}
                            errmsg={TradeMarkForm.mark_id.errmsg}
                            disabled={TradeMarkForm.mark_id.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Upload</div>
                        <Labelbox type="upload"
                            changeData={(data) => checkValidation(data, "upload")}
                            view_file={TradeMarkForm.upload.view_file}
                            remove_file={() => (setTradeMarkForm(prevState => ({
                                ...prevState,
                                upload: {
                                    value: null, error: TradeMarkForm.upload.error, errmsg: TradeMarkForm.upload.errmsg, disabled: TradeMarkForm.upload.disabled, view_file: null
                                },
                            })))}
                            value={TradeMarkForm.upload.value}
                            error={TradeMarkForm.upload.error}
                            errmsg={TradeMarkForm.upload.errmsg}
                            disabled={TradeMarkForm.upload.disabled}
                        />

                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Class</div>
                        <Labelbox type="select"
                            dropdown={classDetList.classDetailsData}
                            changeData={(data) => checkValidation(data, "class_id")}
                            value={TradeMarkForm.class_id.value}
                            error={TradeMarkForm.class_id.error}
                            errmsg={TradeMarkForm.class_id.errmsg}
                            disabled={TradeMarkForm.class_id.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Application Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "application_no")}
                            value={TradeMarkForm.application_no.value}
                            error={TradeMarkForm.application_no.error}
                            errmsg={TradeMarkForm.application_no.errmsg}
                            disabled={TradeMarkForm.application_no.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings"> Application Date</div>
                        <Labelbox type="datepicker"
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "application_date")}
                            value={TradeMarkForm.application_date.value}
                            error={TradeMarkForm.application_date.error}
                            errmsg={TradeMarkForm.application_date.errmsg}
                            disabled={TradeMarkForm.application_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">TMJ Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "tmj_number")}
                            value={TradeMarkForm.tmj_number.value}
                            error={TradeMarkForm.tmj_number.error}
                            errmsg={TradeMarkForm.tmj_number.errmsg}
                            disabled={TradeMarkForm.tmj_number.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">TMJ Date</div>
                        <Labelbox type="datepicker"
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "tmj_date")}
                            value={TradeMarkForm.tmj_date.value}
                            error={TradeMarkForm.tmj_date.error}
                            errmsg={TradeMarkForm.tmj_date.errmsg}
                            disabled={TradeMarkForm.tmj_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Opposition Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "oppositionNumber")}
                            value={TradeMarkForm.oppositionNumber.value}
                            error={TradeMarkForm.oppositionNumber.error}
                            errmsg={TradeMarkForm.oppositionNumber.errmsg}
                            disabled={TradeMarkForm.oppositionNumber.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Applicant</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "applicant")}
                            value={TradeMarkForm.applicant.value}
                            error={TradeMarkForm.applicant.error}
                            errmsg={TradeMarkForm.applicant.errmsg}
                            disabled={TradeMarkForm.applicant.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Applicant Agent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "applicantAgent")}
                            value={TradeMarkForm.applicantAgent.value}
                            error={TradeMarkForm.applicantAgent.error}
                            errmsg={TradeMarkForm.applicantAgent.errmsg}
                            disabled={TradeMarkForm.applicantAgent.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">International status</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "internal_status")}
                            value={TradeMarkForm.internal_status.value}
                            error={TradeMarkForm.internal_status.error}
                            errmsg={TradeMarkForm.internal_status.errmsg}
                            disabled={TradeMarkForm.internal_status.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Deadline</div>
                        <Labelbox type="datepicker"
                            // disableFuture={true}
                            changeData={(data) => checkValidation(data, "end_date")}
                            value={TradeMarkForm.end_date.value}
                            error={TradeMarkForm.end_date.error}
                            errmsg={TradeMarkForm.end_date.errmsg}
                            disabled={TradeMarkForm.end_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Order</div>
                        <Labelbox type="upload"
                            changeData={(data) => checkValidation(data, "orders")}
                            view_file={TradeMarkForm.orders.view_file}
                            remove_file={() => (setTradeMarkForm(prevState => ({
                                ...prevState,
                                orders: {
                                    value: null, error: TradeMarkForm.orders.error, errmsg: TradeMarkForm.orders.errmsg, disabled: TradeMarkForm.orders.disabled, view_file: null
                                },
                            })))}
                            value={TradeMarkForm.orders.value}
                            error={TradeMarkForm.orders.error}
                            errmsg={TradeMarkForm.orders.errmsg}
                            disabled={TradeMarkForm.orders.disabled}
                        />

                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item xs={12} container direction="column" spacing={1} >
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={2} >
                       
                    </Grid>
                    <Grid item xs={2} >
                        
                    </Grid>
                    <Grid item xs={2} >
                        
                    </Grid>
                    <Grid item xs={3} >
                       
                    </Grid>
                    <Grid item xs={3} >
                       
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={2} >
                       
                    </Grid>
                    <Grid item xs={2} >
                       
                    </Grid>
                    <Grid item xs={2} >
                        
                    </Grid>
                    <Grid item xs={3} >
                       
                    </Grid>
                    <Grid item xs={3} >
                       
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={2}  >
                    <Grid item xs={4} >
                      
                    </Grid>
                    <Grid item xs={4} >
                      
                    </Grid>
                    <Grid item xs={4} >
                        
                    </Grid>
                </Grid>
                <Grid container justify="left" direction="row"  >
                  
                </Grid>
            </Grid> */}
            <div className="customButtonOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="TMOpositionButton" />
                <CustomButton btnName={"CANCEL"} custombtnCSS="TMOpositionButton" />

            </div>

        </div>
    )
}
const mapStateToProps = (state) =>
({

    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList: state.tradeMarkReducer.getClassDetailsList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    tradeMark: state.tradeMarkReducer.getTrademark || {},
});

export default connect(mapStateToProps)(TradeMarkOposition2);