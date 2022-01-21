
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../../helpers/labelbox/labelbox";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import CustomButton from '../../../component/Butttons/button';
import './trademark.scss'
import moment from 'moment'
import {
    getTradeMarkStatus, getClassDetails, getPoaDetails, getCountryDetails, getTradeMark,
    getUsageDetails, insertTradeMark
} from "../../../actions/tradeMarkAction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";


function TradeMarkInternational(properties) {

    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [countryDetList, setcountryDetList] = useState({})

    useEffect(() => {
        dispatch(getTradeMark(rowId))
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails());
        dispatch(getUsageDetails());
        dispatch(getCountryDetails());
    },[]);

    useEffect(() => {
        handleCancel()
        if (properties.tradeMark && properties.tradeMark[0]) {
            let obj = properties.tradeMark[0];
            TradeMarkForm.trademark_id.value = obj.trademark_id;

            TradeMarkForm.status_id.value = obj.status_id;
            // if (obj.status_id && obj.status_id.length)
            //     TradeMarkForm.status_id.disabled = true;

            TradeMarkForm.associateRefernce.value = obj.associatereference;
            // if (obj.associateRefernce && obj.associatereference.length)
            //     TradeMarkForm.associateRefernce.disabled = true;

            TradeMarkForm.application_no.value = obj.application_no;
            // if (obj.application_no && obj.application_no.length)
            //     TradeMarkForm.application_no.disabled = true;

            TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.ourRefernce.value = obj.our_reference;
            // if (obj.ourRefernce && obj.our_reference.length)
            //     TradeMarkForm.our_reference.disabled = true;

            TradeMarkForm.associateRefernce.value = obj.associate_reference;
            // if (obj.associate_reference && obj.associate_reference.length)
            //     TradeMarkForm.associateRefernce.disabled = true;

            TradeMarkForm.mark_id.value = obj.mark_id;
            // if (obj.mark_id && obj.mark_id.length)
            //     TradeMarkForm.mark_id.disabled = true;

            //"upload_image" :selectedFile,

            TradeMarkForm.associate.value = obj.associate;
            // if (obj.associate && obj.associate.length)
            //     TradeMarkForm.associate.disabled = true;

            TradeMarkForm.opositionNumber.value = obj.opposition_no;
            // if (obj.opositionNumber && obj.opositionNumber.length)
            //     TradeMarkForm.opositionNumber.disabled = true;

            TradeMarkForm.application_date.value = obj.application_date;
            // if (obj.application_date && obj.application_date.length)
            //     TradeMarkForm.application_date.disabled = true;

            TradeMarkForm.country_id.value = obj.country_id;
            // if (obj.country_id && obj.country_id.length)
            //     TradeMarkForm.country_id.disabled = true;

            TradeMarkForm.priority_details.value = obj.priority_details;
            // if (obj.priority_details && obj.priority_details.length)
            //     TradeMarkForm.priority_details.disabled = true;

            TradeMarkForm.userclaim.value = obj.user_claim;
            // if (obj.user_claim && obj.user_claim.length)
            //     TradeMarkForm.userclaim.disabled = true;

            TradeMarkForm.allotment.value = obj.allotment;
            // if (obj.allotment && obj.allotment.length)
            //     TradeMarkForm.allotment.disabled = true;

            TradeMarkForm.goods_description.value = obj.goods_description;
            // if (obj.goods_description && obj.goods_description.length)
            //     TradeMarkForm.goods_description.disabled = true;

            obj.upload_image && (obj.upload_image !== '') && (TradeMarkForm.upload.view_file = obj.upload_image);

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

        let countryListsData = []
        properties.countriesList.map((data) =>
            countryListsData.push({
                value: data.country,
                id: data.country_id
            })
        )
        setcountryDetList({ countryListsData })

    }, [properties.tradeMark, properties.tradeStatusList, properties.classDetailsList, properties.POAList, properties.tmUsageDetailsList, properties.countriesList
    ]);

    const dispatch = useDispatch()
    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
    },[])
 
    const [TradeMarkForm, setTradeMarkForm] = useState({
        trademark_id: {
            value: 0,
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        project_id: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, associateRefernce: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, ourRefernce: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, associate: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, userclaim: {
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
        usage_details_id: {
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
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        }, country_id: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        goods_description: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        usage_from_date: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        comments: {
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
        allotment: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        ip_india_status: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        amendment: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        orders: {
            value: "",
            // validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,
        },
        priority_details: {
            value: "",
            // validation: [{ "name": "required" }],
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
        journel_extract: {
            value: "",
            // validation: [{ "name": "required" }],
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
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, renewal_certificate_date: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, created_on: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, updated_on: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, created_by: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, updated_by: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        }, ip_address: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        nextRenewal: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,
        },
        opositionNumber: {
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
            view_file: null,
            empty: false,
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
            (obj) => TradeMarkForm[obj].error === true
        );

        if (filtererr.length > 0) {
        } else {

            let formData = new FormData();
            formData.append("project_id", rowId)
            formData.append("status_id", TradeMarkForm.status_id.value === '' ? '0' : TradeMarkForm.status_id.value)
            formData.append("associate_reference", TradeMarkForm.associateRefernce.value || '')
            formData.append("our_reference", TradeMarkForm.ourRefernce.value || '')
            formData.append("mark_id", TradeMarkForm.mark_id.value)
            formData.append("upload_image", (!TradeMarkForm.upload.view_file && !TradeMarkForm.upload.value) ? [] : (TradeMarkForm.upload.value ? TradeMarkForm.upload.value : TradeMarkForm.upload.view_file.substr(36)))
            formData.append("associate", TradeMarkForm.associate.value || '')
            formData.append("application_no", TradeMarkForm.application_no.value || '')
            formData.append("application_date", TradeMarkForm.application_date.value === '' ? '0000-00-00' : TradeMarkForm.application_date.value)
            formData.append("country_id", TradeMarkForm.country_id.value === '' ? '0' : TradeMarkForm.country_id.value)
            formData.append("priority_details", TradeMarkForm.priority_details.value || '')
            formData.append("user_claim", TradeMarkForm.userclaim.value || '')
            formData.append("allotment", TradeMarkForm.allotment.value || '')
            formData.append("goods_description", TradeMarkForm.goods_description.value || '')
            formData.append("created_by", localStorage.getItem("empId"))
            formData.append("created_on", moment().format('YYYY-MM-DD HH:m:s'))
            formData.append("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
            formData.append("updated_by", localStorage.getItem("empId"))
            formData.append("ip_address", "ddf")

            if (TradeMarkForm.class_id.value && TradeMarkForm.class_id.value !== "") {
                formData.set("class_id", TradeMarkForm.class_id.value)
                // params["class_id"] = TradeMarkForm.class_id.value;
            }

            if (TradeMarkForm.trademark_id.value !== 0) {
                formData.set("trademark_id", TradeMarkForm.trademark_id.value)
            }
            
            dispatch(insertTradeMark(formData, TradeMarkForm, rowId)).then(() => {
                // handleCancel()
            })
        }

        setTradeMarkForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let From_key = [
            "project_id", "associateRefernce", "ourRefernce", "status_id", "class_id", "associate", "userclaim", "usage_details_id", "mark_id", "application_no", "application_date",
            "upload_image", "goods_description", "usage_from_date", "comments", "internal_status", "allotment",
            "ip_india_status", "amendment", "orders", "priority_details", "tmj_number", "tmj_date", "journel_extract",
            "poa", "certificate_date", "renewal_certificate_date", "created_on", "updated_on", "updated_by", "country_id",
            "ip_address", "upload"
        ]

        From_key.map((data) => {
            try {
                if (data !== "upload") {
                    TradeMarkForm[data].value = ""
                } else {
                    TradeMarkForm[data].view_file = "";
                    TradeMarkForm[data].value = null;
                    TradeMarkForm[data].empty = true;
                }
            } catch (error) {
                throw error;
            }
            return 0;
        });
        setTradeMarkForm(prevState => ({
            ...prevState,
        }));
        // history.goBack();
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
                return 0;
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
                    <Grid item xs={1}></Grid>
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
                        <div className="Tradeheadings">Associate Reference</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "associateRefernce")}
                            value={TradeMarkForm.associateRefernce.value}
                            error={TradeMarkForm.associateRefernce.error}
                            errmsg={TradeMarkForm.associateRefernce.errmsg}
                            disabled={TradeMarkForm.associateRefernce.disabled}

                        />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Tradeheadings">Our Reference</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "ourRefernce")}
                            value={TradeMarkForm.ourRefernce.value}
                            error={TradeMarkForm.ourRefernce.error}
                            errmsg={TradeMarkForm.ourRefernce.errmsg}
                            disabled={TradeMarkForm.ourRefernce.disabled}
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
                        <div className="Tradeheadings">Mark</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "mark_id")}
                            value={TradeMarkForm.mark_id.value}
                            error={TradeMarkForm.mark_id.error}
                            errmsg={TradeMarkForm.mark_id.errmsg}
                            disabled={TradeMarkForm.mark_id.disabled}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>

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
                            empty={TradeMarkForm.upload.empty}
                            upload_id='TmAppInternationalUpload'
                        />

                    </Grid>
                    {/* </Labelbox> */}
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Associate</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "associate")}
                            value={TradeMarkForm.associate.value}
                            error={TradeMarkForm.associate.error}
                            errmsg={TradeMarkForm.associate.errmsg}
                            disabled={TradeMarkForm.associate.disabled}
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
                        <div className="Tradeheadings">Application Date</div>
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
                        <div className="Tradeheadings">Country</div>
                        <Labelbox type="select"
                            dropdown={countryDetList.countryListsData}
                            changeData={(data) => checkValidation(data, "country_id")}
                            value={TradeMarkForm.country_id.value}
                            error={TradeMarkForm.country_id.error}
                            errmsg={TradeMarkForm.country_id.errmsg}
                            disabled={TradeMarkForm.country_id.disabled}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Priority Details</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "priority_details")}
                            value={TradeMarkForm.priority_details.value}
                            error={TradeMarkForm.priority_details.error}
                            errmsg={TradeMarkForm.priority_details.errmsg}
                            disabled={TradeMarkForm.priority_details.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings"> User Claim</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "userclaim")}
                            value={TradeMarkForm.userclaim.value}
                            error={TradeMarkForm.userclaim.error}
                            errmsg={TradeMarkForm.userclaim.errmsg}
                            disabled={TradeMarkForm.userclaim.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Allotment</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "allotment")}
                            value={TradeMarkForm.allotment.value}
                            error={TradeMarkForm.allotment.error}
                            errmsg={TradeMarkForm.allotment.errmsg}
                            disabled={TradeMarkForm.allotment.disabled}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <div className="Tradeheadings">Goods and Services Description</div>
                        <div className="projectFormComments">
                            <Labelbox type="textarea"
                                changeData={(data) => checkValidation(data, "goods_description")}
                                value={TradeMarkForm.goods_description.value}
                                error={TradeMarkForm.goods_description.error}
                                errmsg={TradeMarkForm.goods_description.errmsg}
                                disabled={TradeMarkForm.goods_description.disabled}
                            />
                        </div>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12} container justify="flex-end" >
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="timeSheetButtons" />
                <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} custombtnCSS="timeSheetButtons" />

            </Grid>
        </div >


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

export default connect(mapStateToProps)(TradeMarkInternational);