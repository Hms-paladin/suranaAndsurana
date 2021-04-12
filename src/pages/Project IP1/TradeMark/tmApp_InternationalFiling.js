
import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import CustomButton from '../../../component/Butttons/button';
import PublishIcon from '@material-ui/icons/Publish';
import { Upload, message, Button, Icon } from 'antd';
import moment from 'moment'
import { getTradeMarkStatus,getClassDetails,getPoaDetails,getCountryDetails,
    getUsageDetails,insertTradeMark} from "../../../actions/tradeMarkAction";
// import Tab icons

import TabsTcons from '../../../component/TradeMarkTabIcons/trademarktabIcons';


function TradeMarkInternational(properties) {

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
    useEffect(() => {
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails());
        dispatch(getUsageDetails());
        dispatch(getCountryDetails());
        
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

let countryListsData = []
    properties.countriesList.map((data) =>
    countryListsData.push({ value: data.country,
    id: data.country_id })
) 
setcountryDetList({ countryListsData })



}, [
    properties.tradeStatusList,properties.classDetailsList,properties.POAList,properties.tmUsageDetailsList, properties.countriesList
  ]);

  const dispatch = useDispatch()


  const [TradeMarkForm, setTradeMarkForm] = useState({
      project_id: {
          value: "",
          validation: [{ "name": "required" },],
          error: null,
          errmsg: null,
      },associateRefernce: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    },ourRefernce : {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    },associate: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    }, userclaim : {
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
      }, country_id : {
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
        let params  = {
            "project_id" :"71",//radeMarkForm.project_id.value,
            "status_id" :TradeMarkForm.status_id.value,
            "associateRefernce": "dd",
            "ourRefernce": "ddff",
            "class_id" :"1",//TradeMarkForm.class_id.value,
            "mark_id":TradeMarkForm.mark_id.value,
             "upload_image" :selectedFile,
            "associate":"ddda",
            "application_no" :TradeMarkForm.application_no.value,
              "application_date":TradeMarkForm.application_date.value,
            "country_id":1,
            "priority_details":TradeMarkForm.priority_details.value,
                "userclaim" : "ddgg",
                "allotment":TradeMarkForm.allotment.value,
                "goods_description":TradeMarkForm.goods_description.value,

          /*   "usage_details_id":TradeMarkForm.usage_details_id.value,
             
              "usage_from_date":TradeMarkForm.usage_from_date.value,
              "ip_india_status":TradeMarkForm.ip_india_status.value,
               "comments":TradeMarkForm.comments.value,
                "internal_status":TradeMarkForm.internal_status.value,
                 
              "amendment":TradeMarkForm.amendment.value,
              // "orders":TradeMarkForm.orders.value,
                
                 "tmj_number":TradeMarkForm.tmj_number.value,
                  "tmj_date":TradeMarkForm.tmj_date.value,
                   "journel_extract":TradeMarkForm.journel_extract.value,
              "poa":TradeMarkForm.poa.value, 
              "certificate_date":TradeMarkForm.certificate_date.value,
               "renewal_certificate_date":TradeMarkForm.renewal_certificate_date.value, */
               "created_by" :localStorage.getItem("empId"),
                "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_by" :localStorage.getItem("empId"),
               "ip_address" :"ddf"
        }
        dispatch(insertTradeMark(params)).then(() => {
            handleCancel()
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
            "project_id","associateRefernce","ourRefernce", "status_id", "class_id","associate","userclaim", "usage_details_id", "mark_id", "application_no", "application_date", 
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

        // <Grid container direction={"column"}>
        //        <Grid item xs={12} md={12} className="app_cont_domestic">
        //          <Labelbox type="text" placeholder={"Name of Opponent"}/>
        //          <Labelbox type="datepicker" placeholder={"Opposition Filled Date"}/>
        //          <Labelbox type="text" placeholder={"Types of Grant"}/>
        //          <Labelbox type="text" placeholder={"Patent Application Number"}/>
        //          <Labelbox type="text" placeholder={"Patent Title"}/>
        //          <Labelbox type="datepicker" placeholder={"Publication Date"}/>
        //          <Labelbox type="text" placeholder={"Patent Applicant"}/>
        //          <Labelbox type="text" placeholder={"Application Agent"}/>
        //        </Grid>

        //     </Grid>

        <div className="tradeMarkContainer">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Labelbox type="select"
                        placeholder={" Status"} changeData={(data) => checkValidation(data, "status_id")}
                        dropdown={tradeStatusList.tradeStatusData} 
                        value={TradeMarkForm.status_id.value}
                        error={TradeMarkForm.status_id.error}
                        errmsg={TradeMarkForm.status_id.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Associate Reference"}
                        changeData={(data) => checkValidation(data, "associateRefernce")}
                        value={TradeMarkForm.associateRefernce.value}
                        error={TradeMarkForm.associateRefernce.error}
                        errmsg={TradeMarkForm.associateRefernce.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Our Reference"}
                        changeData={(data) => checkValidation(data, "ourRefernce")}
                        value={TradeMarkForm.ourRefernce.value}
                        error={TradeMarkForm.ourRefernce.error}
                        errmsg={TradeMarkForm.ourRefernce.errmsg} />

                    <Labelbox type="select"
                        placeholder={" Class"} 
                        dropdown={classDetList.classDetailsData}  
                        changeData={(data) => checkValidation(data, "class_id")}
                                        value={TradeMarkForm.class_id.value}
                                        error={TradeMarkForm.class_id.error}
                                        errmsg={TradeMarkForm.class_id.errmsg}/>

                    <Labelbox type="text"
                        placeholder={" Mark"}
                        changeData={(data) => checkValidation(data, "mark_id")}
                        value={TradeMarkForm.mark_id.value}
                        error={TradeMarkForm.mark_id.error}
                        errmsg={TradeMarkForm.mark_id.errmsg} />
                    {/* <Labelbox> */}
                    <div className="uploadbox">
                        <div style={{ width: "280%" }}>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Upload Image  </label><PublishIcon /></div>
                            </Upload>,
                            </div>
                    </div>
                    {/* </Labelbox> */}

                    <Labelbox type="text"
                        placeholder={" Associate"} 
                        changeData={(data) => checkValidation(data, "associate")}
                        value={TradeMarkForm.associate.value}
                        error={TradeMarkForm.associate.error}
                        errmsg={TradeMarkForm.associate.errmsg} 
                        />

                    <Labelbox type="text"
                        placeholder={" Application Number"}
                        changeData={(data) => checkValidation(data, "application_no")}
                        value={TradeMarkForm.application_no.value}
                        error={TradeMarkForm.application_no.error}
                        errmsg={TradeMarkForm.application_no.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" Application Date"}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "application_date")}
                        value={TradeMarkForm.application_date.value}
                        error={TradeMarkForm.application_date.error}
                        errmsg={TradeMarkForm.application_date.errmsg} />

                    <Labelbox type="select"
                        placeholder={" Country"} 
                        dropdown={countryDetList.countryListsData}  
                        changeData={(data) => checkValidation(data, "country_id")}
                                        value={TradeMarkForm.country_id.value}
                                        error={TradeMarkForm.country_id.error}
                                        errmsg={TradeMarkForm.country_id.errmsg}/>

                    <Labelbox type="text"
                        placeholder={" Priority Details"}
                        changeData={(data) => checkValidation(data, "priority_details")}
                        value={TradeMarkForm.priority_details.value}
                        error={TradeMarkForm.priority_details.error}
                        errmsg={TradeMarkForm.priority_details.errmsg} />

                    <Labelbox type="text"
                        placeholder={" User Claim"}
                        changeData={(data) => checkValidation(data, "userclaim")}
                        value={TradeMarkForm.userclaim.value}
                        error={TradeMarkForm.userclaim.error}
                        errmsg={TradeMarkForm.userclaim.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Allotment"}
                        changeData={(data) => checkValidation(data, "allotment")}
                        value={TradeMarkForm.allotment.value}
                        error={TradeMarkForm.allotment.error}
                        errmsg={TradeMarkForm.allotment.errmsg} />
                    <div className="projectFormComments">
                        <Labelbox type="textarea"
                            placeholder={" Goods and Services Description"}
                            changeData={(data) => checkValidation(data, "goods_description")}
                            value={TradeMarkForm.goods_description.value}
                            error={TradeMarkForm.goods_description.error}
                            errmsg={TradeMarkForm.goods_description.errmsg} />
                    </div>


                </Grid>
            </Grid>

            <Grid item xs={12} container justify="flex-end" >
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="timeSheetButtons" />
                <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel}   custombtnCSS="timeSheetButtons" />

            </Grid>
        </div >


    )
}
const mapStateToProps = (state) =>
({
    
    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList : state.tradeMarkReducer.getClassDetailsList || [],
    POAList: state.tradeMarkReducer.getPOAList || [],
    tmUsageDetailsList : state.tradeMarkReducer.gettradeMarkUsageList || [],
    countriesList : state.tradeMarkReducer.getCountryList || [],
});

export default connect(mapStateToProps)(TradeMarkInternational);