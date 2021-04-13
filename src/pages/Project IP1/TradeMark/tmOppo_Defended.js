import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { Upload, message, Button, Icon } from 'antd';
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../../../component/Butttons/button';
import moment from 'moment'
import { getTradeMarkStatus,getClassDetails,getPoaDetails,getCountryDetails,
    getUsageDetails,insertTradeMark} from "../../../actions/tradeMarkAction";
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
    classDetailsData.push({ value: data.class,
    id: data.class_id })
)
setclassDetList({ classDetailsData })

let POADetailsData = []
    properties.POAList.map((data) =>
    POADetailsData.push({ value: data.POA,
    id: data.client_id })
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
  let { rowId } = useParams()
  useEffect(() => {
      dispatch(getProjectDetails(rowId))
  }, [])
  useEffect(() => {
      setProjectDetails(properties.ProjectDetails);
      properties.ProjectDetails.length > 0 && setidDetails({
          project_id:properties.ProjectDetails[0].project_id,
          client_id:properties.ProjectDetails[0].client_id,
      })
  }, [properties.ProjectDetails])


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
    },agent: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    },
     opositionNumber: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    },opponent : {
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
      },internalstutus: {
        value: "",
        validation: [{ "name": "required" },],
        error: null,
        errmsg: null,
    }, end_date: {
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
    },ourReference: {
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
         // validation: [{ "name": "required" }],
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
            "project_id" :idDetails.project_id,//radeMarkForm.project_id.value,
            "status_id" :TradeMarkForm.status_id.value,
            "ourRefernce": "ddff",
            "mark_id":TradeMarkForm.mark_id.value,
             "upload_image" :selectedFile,

            "application_no" :TradeMarkForm.application_no.value,
              "application_date":TradeMarkForm.application_date.value,
              "tmj_number":TradeMarkForm.tmj_number.value,
                  "tmj_date":TradeMarkForm.tmj_date.value,
                  "opositionNumber":"dddf",
            "aplicant": "applicant",
            "applicantAgent": "ddd",
            "internal_status":TradeMarkForm.internal_status.value,
            "end_date" : moment().format('YYYY-MM-DD HH:m:s'),

               "created_by" :localStorage.getItem("empId"),
                "created_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_on" : moment().format('YYYY-MM-DD HH:m:s')   ,
                 "updated_by" :localStorage.getItem("empId"),
               "ip_address" :"ddf"
        }
        if(TradeMarkForm.class_id.value != ""){
            params["class_id"] =TradeMarkForm.class_id.value;
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
            "project_id","associateRefernce","ourRefernce", "status_id", "class_id","associate","userclaim","aplicant","applicantAgent", "usage_details_id", "mark_id", "application_no", "application_date", 
            "end_date","upload_image","ourReference","opositionNumber", "goods_description", "usage_from_date", "comments", "internal_status", "allotment",
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
                    <Labelbox type="select"
                        placeholder={" Status"} placeholder={" Status"} changeData={(data) => checkValidation(data, "status_id")}
                        dropdown={tradeStatusList.tradeStatusData} 
                        value={TradeMarkForm.status_id.value}
                        error={TradeMarkForm.status_id.error}
                        errmsg={TradeMarkForm.status_id.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Our Reference"}
                        changeData={(data) => checkValidation(data, "ourReference")}
                        value={TradeMarkForm.ourReference.value}
                        error={TradeMarkForm.ourReference.error}
                        errmsg={TradeMarkForm.ourReference.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Mark"}
                        changeData={(data) => checkValidation(data, "mark_id")}
                        value={TradeMarkForm.mark_id.value}
                        error={TradeMarkForm.mark_id.error}
                        errmsg={TradeMarkForm.mark_id.errmsg} />

                    <div className="uploadbox_div" >
                        <div>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label>Upload</label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>

                    <Labelbox type="select"
                        placeholder={" Class"} dropdown={classDetList.classDetailsData}  
                        changeData={(data) => checkValidation(data, "class_id")}
                                        value={TradeMarkForm.class_id.value}
                                        error={TradeMarkForm.class_id.error}
                                        errmsg={TradeMarkForm.class_id.errmsg}
                                        />

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

                    <Labelbox type="text"
                        placeholder={" TMJ Number "}
                        changeData={(data) => checkValidation(data, "tmj_number")}
                        value={TradeMarkForm.tmj_number.value}
                        error={TradeMarkForm.tmj_number.error}
                        errmsg={TradeMarkForm.tmj_number.errmsg} />

                    <Labelbox type="datepicker"
                        placeholder={" TMJ Date "}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "tmj_date")}
                        value={TradeMarkForm.tmj_date.value}
                        error={TradeMarkForm.tmj_date.error}
                        errmsg={TradeMarkForm.tmj_date.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Oposition Number "}
                        changeData={(data) => checkValidation(data, "opositionNumber")}
                        value={TradeMarkForm.opositionNumber.value}
                        error={TradeMarkForm.opositionNumber.error}
                        errmsg={TradeMarkForm.opositionNumber.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Applicant"}
                        changeData={(data) => checkValidation(data, "opponent")}
                        value={TradeMarkForm.opponent.value}
                        error={TradeMarkForm.opponent.error}
                        errmsg={TradeMarkForm.opponent.errmsg} />

                    <Labelbox type="text"
                        placeholder={" Applicant Agent"}
                        changeData={(data) => checkValidation(data, "agent")}
                        value={TradeMarkForm.agent.value}
                        error={TradeMarkForm.agent.error}
                        errmsg={TradeMarkForm.agent.errmsg} />

                    <Labelbox type="text"
                        placeholder={" International status"}

                        changeData={(data) => checkValidation(data, "internal_status")}
                        value={TradeMarkForm.internal_status.value}
                        error={TradeMarkForm.internal_status.error}
                        errmsg={TradeMarkForm.internal_status.errmsg}
                    />


                    <Labelbox type="datepicker"
                        placeholder={" Deadline "}
                        disableFuture={true}
                        changeData={(data) => checkValidation(data, "end_date")}
                        value={TradeMarkForm.end_date.value}
                        error={TradeMarkForm.end_date.error}
                        errmsg={TradeMarkForm.end_date.errmsg} />

                    <div className="uploadbox_div" >
                        <div>
                            <Upload {...props} className="uploadbox_tag"
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76' >

                                <div className="upload_file_inside"><label> Order </label><PublishIcon /></div>
                            </Upload>,
                                     </div>
                    </div>

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
    classDetailsList : state.tradeMarkReducer.getClassDetailsList || [],
    POAList: state.tradeMarkReducer.getPOAList || [],
    tmUsageDetailsList : state.tradeMarkReducer.gettradeMarkUsageList || [],
    countriesList : state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
});

export default connect(mapStateToProps)(TradeMarkOposition2);