
import react, { useState, useEffect } from 'react';
import './trademark.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { InesertResume } from "../../../actions/ResumeAction";
import CustomButton from '../../../component/Butttons/button';
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import PublishIcon from '@material-ui/icons/Publish';
import { Upload, message, Button, Icon } from 'antd';
import moment from 'moment'
import { getTradeMarkStatus,getClassDetails,getPoaDetails,
    getUsageDetails,insertTradeMark} from "../../../actions/tradeMarkAction";





function TradeMark(properties) {


    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [poaList, setpoaList] = useState({})
    const [usageDetList, setusageDetList] = useState({})
    const [selectedFile, setselectedFile] = useState([]);
    const [selectedFile1, setselectedFile1] = useState([]);
    useEffect(() => {
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails());
        dispatch(getUsageDetails());
        
        
      }, []);

    useEffect(() => {

        let tradeStatusData = []
        properties.tradeStatusList.map((data) =>
    tradeStatusData.push({ value: data.Status,
        id: data.status_id })
    )
    settradeStatusList({ tradeStatusData })
    
    let classDetailsData = []
    properties.classDetailsList.map((data) =>
    classDetailsData.push({ value: data.activity,
    id: data.activity_id })
)
setclassDetList({ classDetailsData })

let POADetailsData = []
    properties.POAList.map((data) =>
    POADetailsData.push({ value: data.activity,
    id: data.activity_id })
)
setpoaList({ POADetailsData })

let tmUsageDetailsData = []
    properties.tmUsageDetailsList.map((data) =>
    tmUsageDetailsData.push({ value: data.status,
    id: data.status_id })
)
setusageDetList({ tmUsageDetailsData })

}, [
    properties.tradeStatusList,properties.classDetailsList,properties.POAList,properties.tmUsageDetailsList
  ]);


  
    const props = {
        name: 'file',
       // action: '//jsonplaceholder.typicode.com/posts/',
      //  headers: {
       //     authorization: 'authorization-text',
       // },
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
    const dispatch = useDispatch()


    const [TradeMarkForm, setTradeMarkForm] = useState({
        project_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        status_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        class_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        usage_details_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        mark_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        application_no: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        application_date: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        upload_image: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        goods_description: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        usage_from_date: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        comments: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        internal_status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        allotment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        ip_india_status: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        amendment: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        orders: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
        },
        priority_details: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tmj_number: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tmj_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        journel_extract: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        poa: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        certificate_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },renewal_certificate_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },created_on: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },updated_on: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },created_by: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },updated_by: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },ip_address: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        nextRenewal: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },


    })

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(TradeMarkForm);
      /*  for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                TradeMarkForm[targetkeys[i]].value,
                TradeMarkForm[targetkeys[i]].validation
            );
            TradeMarkForm[targetkeys[i]].error = !errorcheck.state;
            TradeMarkForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = TradeMarkForm[targetkeys[i]].value;
        } */
        var filtererr = targetkeys.filter(
            (obj) => TradeMarkForm[obj].error == true
        ); 
        console.log(filtererr.length);
        let params  = {
            "project_id" :TradeMarkForm.project_id.value,
             "status_id" :TradeMarkForm.status_id.value,
              "class_id" :TradeMarkForm.class_id.value,
             "usage_details_id":TradeMarkForm.usage_details_id.value,
              "mark_id":TradeMarkForm.mark_id.value,
               "application_no" :TradeMarkForm.application_no.value,
                "application_date":TradeMarkForm.application_date.value, 
            "upload_image" :selectedFile,
             "goods_description":TradeMarkForm.goods_description.value,
              "usage_from_date":TradeMarkForm.usage_from_date.value,
               "comments":TradeMarkForm.comments.value,
                "internal_status":TradeMarkForm.internal_status.value,
                 "allotment":TradeMarkForm.allotment.value,
             "ip_india_status":TradeMarkForm.ip_india_status.value,
              "amendment":TradeMarkForm.amendment.value,
               "orders":TradeMarkForm.orders.value,
                "priority_details":TradeMarkForm.priority_details.value,
                 "tmj_number":TradeMarkForm.tmj_number.value,
                  "tmj_date":TradeMarkForm.tmj_date.value,
                   "journel_extract":TradeMarkForm.journel_extract.value,
              "poa":TradeMarkForm.poa.value, 
              "certificate_date":TradeMarkForm.certificate_date.value,
               "renewal_certificate_date":TradeMarkForm.renewal_certificate_date.value,
               "created_by" :localStorage.getItem("empId"),
                "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_by" :localStorage.getItem("empId"),
               "ip_address" :"ddf"
        }
        if (filtererr.length > 0) {
            // setTradeMarkForm({ error: true });
        } else {
            // setTradeMarkForm({ error: false });

            dispatch(insertTradeMark(params)).then(() => {
                handleCancel()
            })
        }

        setTradeMarkForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let From_key = [
            "project_id", "status_id", "class_id", "usage_details_id", "mark_id", "application_no", "application_date", 
            "upload_image", "goods_description", "usage_from_date", "comments", "internal_status", "allotment",
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


        <div className="tradeMarkContainer">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Labelbox type="select"
                        placeholder={" Status"} changeData={(data) => checkValidation(data, "status_id")}
                dropdown={tradeStatusList.tradeStatusData} 
                value={TradeMarkForm.status_id.value}
                error={TradeMarkForm.status_id.error}
                errmsg={TradeMarkForm.status_id.errmsg}/>
                    <Labelbox type="text"
                        placeholder={" Mark"}
                        changeData={(data) => checkValidation(data, "mark_id")}
                        value={TradeMarkForm.mark_id.value}
                        error={TradeMarkForm.mark_id.error}
                        errmsg={TradeMarkForm.mark_id.errmsg} />

                    <div className="uploadbox" >
                        <div>
                            <Upload {...props} className="uploadbox_tag" data={"upload1"}
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Upload</label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>

                    <Labelbox type="text"
                        placeholder={" Application Number "}
                        changeData={(data) => checkValidation(data, "application_no")}
                        value={TradeMarkForm.application_no.value}
                        error={TradeMarkForm.application_no.error}
                        errmsg={TradeMarkForm.application_no.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" Application Date "}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "application_date")}
                        value={TradeMarkForm.application_date.value}
                        error={TradeMarkForm.application_date.error}
                        errmsg={TradeMarkForm.application_date.errmsg} />

                    <Labelbox type="select"
                        placeholder={" Class"}
                        
dropdown={classDetList.classDetailsData}  />
                    <div className="projectFormComments">
                        <Labelbox type="textarea"
                            placeholder={" Goods and Services Description"}
                            changeData={(data) => checkValidation(data, "goods_description")}
                            value={TradeMarkForm.goods_description.value}
                            error={TradeMarkForm.goods_description.error}
                            errmsg={TradeMarkForm.goods_description.errmsg} />
                    </div>

                    <Labelbox type="select"
                        placeholder={" Usage Details "} 
                        dropdown={usageDetList.tmUsageDetailsData}
                        changeData={(data) => checkValidation(data, "usage_details_id")}
                        value={TradeMarkForm.usage_details_id.value}
                        error={TradeMarkForm.usage_details_id.error}
                        errmsg={TradeMarkForm.usage_details_id.errmsg}/>

                    <Labelbox type="datepicker"
                        placeholder={"  Date of Use "}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "usage_from_date")}
                        value={TradeMarkForm.usage_from_date.value}
                        error={TradeMarkForm.usage_from_date.error}
                        errmsg={TradeMarkForm.usage_from_date.errmsg} />

                    <Labelbox type="text"
                        placeholder={" IP India Status"}
                        changeData={(data) => checkValidation(data, "ip_india_status")}
                        value={TradeMarkForm.ip_india_status.value}
                        error={TradeMarkForm.ip_india_status.error}
                        errmsg={TradeMarkForm.ip_india_status.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" Next Renewal "}
                        changeData={(data) => checkValidation(data, "nextRenewal")}
                        value={TradeMarkForm.nextRenewal.value}
                        error={TradeMarkForm.nextRenewal.error}
                        errmsg={TradeMarkForm.nextRenewal.errmsg}
                    />

                    <Labelbox type="textarea"
                        placeholder={" comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={TradeMarkForm.comments.value}
                        error={TradeMarkForm.comments.error}
                        errmsg={TradeMarkForm.comments.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Internal Status"}
                        changeData={(data) => checkValidation(data, "internal_status")}
                        value={TradeMarkForm.internal_status.value}
                        error={TradeMarkForm.internal_status.error}
                        errmsg={TradeMarkForm.internal_status.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Allotment"}
                        changeData={(data) => checkValidation(data, "allotment")}
                        value={TradeMarkForm.allotment.value}
                        error={TradeMarkForm.allotment.error}
                        errmsg={TradeMarkForm.allotment.errmsg} />

                    <div className="uploadbox" >
                        <div>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Order</label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>

                    <Labelbox type="text"
                        placeholder={" Amendment"}
                        changeData={(data) => checkValidation(data, "amendment")}
                        value={TradeMarkForm.amendment.value}
                        error={TradeMarkForm.amendment.error}
                        errmsg={TradeMarkForm.amendment.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Priority Details"}
                        changeData={(data) => checkValidation(data, "priority_details")}
                        value={TradeMarkForm.priority_details.value}
                        error={TradeMarkForm.priority_details.error}
                        errmsg={TradeMarkForm.priority_details.errmsg} />

                    <Labelbox type="text"
                        placeholder={" TMJ Number "}
                        changeData={(data) => checkValidation(data, "tmj_number")}
                        value={TradeMarkForm.tmj_number.value}
                        error={TradeMarkForm.tmj_number.error}
                        errmsg={TradeMarkForm.tmj_number.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" TMJ Date"}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "tmj_date")}
                        value={TradeMarkForm.tmj_date.value}
                        error={TradeMarkForm.tmj_date.error}
                        errmsg={TradeMarkForm.tmj_date.errmsg}
                    />

                    <Labelbox type="text"
                        placeholder={" Journal Extract"}
                        changeData={(data) => checkValidation(data, "journel_extract")}
                        value={TradeMarkForm.journel_extract.value}
                        error={TradeMarkForm.journel_extract.error}
                        errmsg={TradeMarkForm.journel_extract.errmsg} />

                    <Labelbox type="select"
                        placeholder={" POA"} 
                        changeData={(data) => checkValidation(data, "poa")}
                        value={TradeMarkForm.poa.value}
                        error={TradeMarkForm.poa.error}
                        errmsg={TradeMarkForm.poa.errmsg}
dropdown={poaList.POADetailsData}
/>

                    <Labelbox type="datepicker"
                        placeholder={" Certificate Date"}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "certificate_date")}
                        value={TradeMarkForm.certificate_date.value}
                        error={TradeMarkForm.certificate_date.error}
                        errmsg={TradeMarkForm.certificate_date.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" Renewal Certificate Date"}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "renewal_certificate_date")}
                        value={TradeMarkForm.certificate_date.value}
                        error={TradeMarkForm.certificate_date.error}
                        errmsg={TradeMarkForm.certificate_date.errmsg} />


                </Grid>

            </Grid>
            <Grid item xs={12} container justify="flex-end" >
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="timeSheetButtons" />
                <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />

            </Grid>




        </div>

    )
}
const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList : state.tradeMarkReducer.getClassDetailsList || [],
    POAList: state.tradeMarkReducer.getPOAList || [],
    tmUsageDetailsList : state.tradeMarkReducer.gettradeMarkUsageList || [],
    countriesList : state.tradeMarkReducer.getCountryList || [],
});

//export default connect(mapStateToProps)(ProjectTaskModel);
export default connect(mapStateToProps)(TradeMark);
