import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { Upload, message, Button, Icon } from 'antd';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../../../component/Butttons/button';
import moment from 'moment'
import {
    getTradeMarkStatus, getClassDetails, getPoaDetails, getCountryDetails, getTradeMark,
    getUsageDetails, insertTradeMark
} from "../../../actions/tradeMarkAction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";
function TradeMarkOposition2(properties) {

    const props = {
        name: 'file',

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setselectedFile(info.file.originFileObj);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [poaList, setpoaList] = useState({})
    const [usageDetList, setusageDetList] = useState({})
    const [countryDetList, setcountryDetList] = useState({})
    const [selectedFile, setselectedFile] = useState([]);
    const [selectedFile1, setselectedFile1] = useState([]);
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    useEffect(() => {
        dispatch(getTradeMark(rowId));
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails());
        dispatch(getUsageDetails());
        dispatch(getCountryDetails());



    }, []);

    useEffect(() => {

        if (properties.tradeMark && properties.tradeMark[0]) {
            let obj = properties.tradeMark[0];
            TradeMarkForm.trademark_id.value = obj.trademark_id;


            TradeMarkForm.status_id.value = obj.status_id;
            if (obj.status_id && obj.status_id.length)
                TradeMarkForm.status_id.disabled = true;

            TradeMarkForm.mark_id.value = obj.mark_id;
            if (obj.mark_id && obj.mark_id.length)
                TradeMarkForm.mark_id.disabled = true;

            TradeMarkForm.ourReference.value = obj.our_reference;
            if (obj.ourReference && obj.ourReference.length)
                TradeMarkForm.ourReference.disabled = true;


            // "upload_image" :selectedFile,
            TradeMarkForm.application_no.value = obj.application_no;
            if (obj.application_no && obj.application_no.length)
                TradeMarkForm.application_no.disabled = true;

            TradeMarkForm.application_date.value = obj.application_date;
            if (obj.application_date && obj.application_date.length)
                TradeMarkForm.application_date.disabled = true;

            TradeMarkForm.tmj_number.value = obj.tmj_number;
            if (obj.tmj_number && obj.tmj_number.length)
                TradeMarkForm.tmj_number.disabled = true;

            TradeMarkForm.status_id.value = obj.status_id;
            if (obj.status_id && obj.status_id.length)
                TradeMarkForm.status_id.disabled = true;



            TradeMarkForm.tmj_date.value = obj.tmj_date;
            if (obj.tmj_date && obj.tmj_date.length)
                TradeMarkForm.tmj_date.disabled = true;

            TradeMarkForm.opositionNumber.value = obj.oposition_Number;
            if (obj.opositionNumber && obj.opositionNumber.length)
                TradeMarkForm.opositionNumber.disabled = true;

            TradeMarkForm.applicant.value = obj.applicant;
            if (obj.applicant && obj.applicant.length)
                TradeMarkForm.applicant.disabled = true;

            TradeMarkForm.applicantAgent.value = obj.applicant_agent;
            if (obj.applicantAgent && obj.applicantAgent.length)
                TradeMarkForm.applicantAgent.disabled = true;

            TradeMarkForm.internal_status.value = obj.internal_status;
            if (obj.internal_status && obj.internal_status.length)
                TradeMarkForm.internal_status.disabled = true;
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

        let POADetailsData = []
        properties.POAList.map((data) =>
            POADetailsData.push({
                value: data.POA,
                id: data.client_id
            })
        )
        setpoaList({ POADetailsData })

        let tmUsageDetailsData = []
        properties.tmUsageDetailsList.map((data) =>
            tmUsageDetailsData.push({
                value: data.status,
                id: data.status_id
            })
        )
        setusageDetList({ tmUsageDetailsData })

        let countryListsData = []
        properties.countriesList.map((data) =>
            countryListsData.push({
                value: data.country,
                id: data.country_id
            })
        )
        setcountryDetList({ countryListsData })



    }, [
        properties.tradeStatusList, properties.classDetailsList, properties.POAList, properties.tmUsageDetailsList, properties.countriesList
    ]);

    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
    }, [])
    useEffect(() => {
        setProjectDetails(properties.ProjectDetails);
        properties.ProjectDetails.length > 0 && setidDetails({
            project_id: properties.ProjectDetails[0].project_id,
            client_id: properties.ProjectDetails[0].client_id,
        })
    }, [properties.ProjectDetails])


    const [TradeMarkForm, setTradeMarkForm] = useState({
        trademark_id: {
            value: 0,
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        project_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, associateRefernce: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, ourRefernce: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, associate: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, userclaim: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, agent: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        opositionNumber: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, opponent: {
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
        class_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        usage_details_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        mark_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, internalstutus: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, end_date: {
            value: "",
            validation: [{ "name": "required" },],
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
        upload_image: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, country_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, ourReference: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        goods_description: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        usage_from_date: {
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
        internal_status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        allotment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        ip_india_status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        amendment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        orders: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        priority_details: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        tmj_number: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        tmj_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        journel_extract: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        poa: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        certificate_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, renewal_certificate_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, created_on: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, updated_on: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, created_by: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, updated_by: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, ip_address: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        nextRenewal: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },


    })

    function onSubmit() {
        /*  var mainvalue = {};
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
          ); */
        //console.log(filtererr.length);
        let params = {
            "project_id": idDetails.project_id,//radeMarkForm.project_id.value,
            "status_id": TradeMarkForm.status_id.value,
            "our_reference": TradeMarkForm.ourReference.value,
            "mark_id": TradeMarkForm.mark_id.value,
            "upload_image": selectedFile,
            "application_no": TradeMarkForm.application_no.value,
            "application_date": TradeMarkForm.application_date.value,
            "tmj_number": TradeMarkForm.tmj_number.value,
            "tmj_date": TradeMarkForm.tmj_date.value,
            "opposition_no": TradeMarkForm.opositionNumber.value,
            "applicant": TradeMarkForm.applicant.value,
            "applicant_agent": TradeMarkForm.applicantAgent.value,
            "internal_status": TradeMarkForm.internal_status.value,
            "end_date": moment().format('YYYY-MM-DD HH:m:s'),
            "created_by": localStorage.getItem("empId"),
            "created_on": moment().format('YYYY-MM-DD HH:m:s'),
            "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
            "updated_by": localStorage.getItem("empId"),
            "ip_address": "ddf"
        }
        if (TradeMarkForm.class_id.value != "") {
            params["class_id"] = TradeMarkForm.class_id.value;
        }
        dispatch(insertTradeMark(params)).then(() => {
            //handleCancel()
        })
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
        let From_key = [
            "project_id", "associateRefernce", "ourRefernce", "status_id", "class_id", "associate", "userclaim", "aplicant", "applicantAgent", "usage_details_id", "mark_id", "application_no", "application_date",
            "end_date", "upload_image", "ourReference", "opositionNumber", "goods_description", "usage_from_date", "comments", "internal_status", "allotment",
            "ip_india_status", "amendment", "orders", "priority_details", "tmj_number", "tmj_date", "journel_extract",
            "poa", "certificate_date", "renewal_certificate_date", "created_on", "updated_on", "updated_by",
            "ip_address"
        ]

        From_key.map((data) => {
            try {
                TradeMarkForm[data].value = "";
                console.log("mapping", TradeMarkForm[data].value);
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
                            disabled={TradeMarkForm.ourRefernce.disabled}
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
                        <div className="uploadbox_div" >
                            <div>
                                <Upload {...props} className="uploadbox_tag"
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                    <div className="upload_file_inside"><PublishIcon /></div>
                                </Upload>,
                            </div>
                        </div>
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
                        <div className="Tradeheadings">Ma Application Numberrk</div>
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
                        <div className="Tradeheadings">Oposition Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "opositionNumber")}
                            value={TradeMarkForm.opositionNumber.value}
                            error={TradeMarkForm.opositionNumber.error}
                            errmsg={TradeMarkForm.opositionNumber.errmsg}
                            disabled={TradeMarkForm.opositionNumber.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Applicant</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "opponent")}
                            value={TradeMarkForm.opponent.value}
                            error={TradeMarkForm.opponent.error}
                            errmsg={TradeMarkForm.opponent.errmsg}
                            disabled={TradeMarkForm.opponent.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Applicant Agent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "agent")}
                            value={TradeMarkForm.agent.value}
                            error={TradeMarkForm.agent.error}
                            errmsg={TradeMarkForm.agent.errmsg}
                            disabled={TradeMarkForm.agent.disabled}
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
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "end_date")}
                            value={TradeMarkForm.end_date.value}
                            error={TradeMarkForm.end_date.error}
                            errmsg={TradeMarkForm.end_date.errmsg}
                            disabled={TradeMarkForm.end_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Order</div>
                        <div className="uploadbox_div" >
                            <div>
                                <Upload {...props} className="uploadbox_tag"
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >
                                    <div className="upload_file_inside"><PublishIcon /></div>
                                </Upload>,
                            </div>
                        </div>
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
    POAList: state.tradeMarkReducer.getPOAList || [],
    tmUsageDetailsList: state.tradeMarkReducer.gettradeMarkUsageList || [],
    countriesList: state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    tradeMark: state.tradeMarkReducer.getTrademark || {},
});

export default connect(mapStateToProps)(TradeMarkOposition2);