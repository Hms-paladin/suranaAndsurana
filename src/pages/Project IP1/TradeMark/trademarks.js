
import react, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
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
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import moment from 'moment'
import {
    getTradeMarkStatus, getClassDetails, getPoaDetails,
    getUsageDetails, insertTradeMark, getTradeMark
} from "../../../actions/tradeMarkAction";

function TradeMark(properties) {

    const history = useHistory();
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [poaList, setpoaList] = useState({})
    const [usageDetList, setusageDetList] = useState({})
    const [selectedFile, setselectedFile] = useState([]);
    const [selectedFile1, setselectedFile1] = useState([]);
    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getTradeMark(rowId))
        dispatch(getProjectDetails(rowId))
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        dispatch(getPoaDetails(properties.ProjectDetails[0].client_id));
        dispatch(getUsageDetails());


    }, []);

    useEffect(() => {
        handleCancel()
        if (properties.tradeMark && properties.tradeMark[0]) {
            let obj = properties.tradeMark[0];
            console.log(obj, "objobjobj")

            TradeMarkForm.comments.value = obj.comments;
            TradeMarkForm.trademark_id.value = obj.trademark_id;

            if (obj.next_renewal != '0000-00-00')
                TradeMarkForm.next_renewal.value = obj.next_renewal;
            // if (obj.next_renewal && obj.next_renewal.length)
            //     TradeMarkForm.next_renewal.disabled = false;

            TradeMarkForm.poa.value = obj.poa;
            // if (obj.poa && obj.poa.length)
            //     TradeMarkForm.poa.disabled = false;

            TradeMarkForm.class_id.value = obj.class_id;
            // if (obj.class_id && obj.class_id.length)
            //     TradeMarkForm.class_id.disabled = false;

            TradeMarkForm.status_id.value = obj.status_id;
            // if (obj.status_id && obj.status_id.length)
            //     TradeMarkForm.status_id.disabled = false;

            if (obj.mark_id != 0)
                TradeMarkForm.mark_id.value = obj.mark_id
            // if (obj.mark_id && obj.mark_id.length)
            //     TradeMarkForm.mark_id.disabled = false;

            // "upload_image" :selectedFile,
            // if(selectedFile)


            TradeMarkForm.application_no.value = obj.application_no;
            // if (obj.application_no && obj.application_no.length)
            //     TradeMarkForm.application_no.disabled = false;


            TradeMarkForm.application_date.value = obj.application_date;
            // if (obj.application_date && obj.application_date.length)
            //     TradeMarkForm.application_date.disabled = false;


            TradeMarkForm.usage_details_id.value = obj.usage_details_id;
            // if (obj.usage_details_id && obj.usage_details_id.length)
            //     TradeMarkForm.usage_details_id.disabled = false;


            TradeMarkForm.goods_description.value = obj.goods_description;
            // if (obj.goods_description && obj.goods_description.length)
            //     TradeMarkForm.goods_description.disabled = false;

            if (obj.usage_from_date != '0000-00-00')
                TradeMarkForm.usage_from_date.value = obj.usage_from_date;
            // if (obj.usage_from_date && obj.usage_from_date.length)
            //     TradeMarkForm.usage_from_date.disabled = false;

            TradeMarkForm.ip_india_status.value = obj.ip_india_status;
            // if (obj.ip_india_status && obj.ip_india_status.length)
            //     TradeMarkForm.ip_india_status.disabled = false;

            TradeMarkForm.internal_status.value = obj.internal_status;
            // if (obj.internal_status && obj.internal_status.length)
            //     TradeMarkForm.internal_status.disabled = false;


            TradeMarkForm.allotment.value = obj.allotment;
            // if (obj.allotment && obj.allotment.length)
            //     TradeMarkForm.allotment.disabled = false;


            TradeMarkForm.amendment.value = obj.amendment;
            // if (obj.amendment && obj.amendment.length)
            //     TradeMarkForm.amendment.disabled = false;


            // "orders":TradeMarkForm.orders.value,
            TradeMarkForm.priority_details.value = obj.priority_details;
            // if (obj.priority_details && obj.priority_details.length)
            //     TradeMarkForm.priority_details.disabled = false;


            TradeMarkForm.tmj_number.value = obj.tmj_number;
            // if (obj.tmj_number && obj.tmj_number.length)
            //     TradeMarkForm.tmj_number.disabled = false;

            if (obj.tmj_date != '0000-00-00')
                TradeMarkForm.tmj_date.value = obj.tmj_date;
            // if (obj.tmj_date && obj.tmj_date.length)
            //     TradeMarkForm.status_id.disabled = false;


            TradeMarkForm.journel_extract.value = obj.journel_extract;
            // if (obj.journel_extract && obj.journel_extract.length)
            //     TradeMarkForm.journel_extract.disabled = false;

            if (obj.certificate_date != '0000-00-00')
                TradeMarkForm.certificate_date.value = obj.certificate_date;
            // if (obj.certificate_date && obj.certificate_date.length)
            //     TradeMarkForm.certificate_date.disabled = false;

            if (obj.renewal_certificate_date != '0000-00-00')
                TradeMarkForm.renewal_certificate_date.value = obj.renewal_certificate_date;
            // if (obj.renewal_certificate_date && obj.renewal_certificate_date.length)
            //     TradeMarkForm.renewal_certificate_date.disabled = false;
            obj.upload_image && (obj.upload_image != '') && (TradeMarkForm.upload.view_file = obj.upload_image);
            obj.orders && (obj.orders != '') && (TradeMarkForm.orders.view_file = obj.orders);

        }
        setProjectDetails(properties.ProjectDetails);
        properties.ProjectDetails.length > 0 && setidDetails({
            project_id: properties.ProjectDetails[0].project_id,
            client_id: properties.ProjectDetails[0].client_id,
        })

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

    }, [properties.ProjectDetails, properties.tradeMark,
    properties.tradeStatusList, properties.classDetailsList, properties.POAList, properties.tmUsageDetailsList
    ]);


    /*useEffect(() => {
        dispatch(getProjectDetails(rowId))
    }, [])
    useEffect(() => {
        setProjectDetails(properties.ProjectDetails);
        properties.ProjectDetails.length > 0 && setidDetails({
            project_id:properties.ProjectDetails[0].project_id,
            client_id:properties.ProjectDetails[0].client_id,
        })
    }, [properties.ProjectDetails])
  
    */
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

    console.log(selectedFile, "selectedFile")

    const [TradeMarkForm, setTradeMarkForm] = useState({
        trademark_id: {
            value: 0,
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
        // upload_image: {
        //     value: "",
        // validation: [{ "name": "required" },],
        //     error: null,
        //     errmsg: null,
        //     disabled: false,

        // },
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
        // orders: {
        //     value: "",
        // validation: [{ "name": "required" },],
        //     error: null,
        //     errmsg: null,
        //     disabled: false,

        // },
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

        },
        next_renewal: {
            value: "",
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false,

        },
        upload: {
            value: null,
            id: "upload",
            empty:false,
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

        let formData = new FormData();
        formData.append("project_id", rowId)
        formData.append("status_id", TradeMarkForm.status_id.value === '' ? '0' : TradeMarkForm.status_id.value)
        // formData.append("our_reference",TradeMarkForm.ourReference.value||'')
        formData.append("mark_id", TradeMarkForm.mark_id.value)
        formData.append("upload_image", (!TradeMarkForm.upload.view_file && !TradeMarkForm.upload.value) ? [] : (TradeMarkForm.upload.value ? TradeMarkForm.upload.value : TradeMarkForm.upload.view_file.substr(35)))
        formData.append("orders", (!TradeMarkForm.orders.view_file && !TradeMarkForm.orders.value) ? [] : (TradeMarkForm.orders.value ? TradeMarkForm.orders.value : TradeMarkForm.orders.view_file.substr(35)))
        formData.append("application_no", TradeMarkForm.application_no.value || '')
        formData.append("application_date", TradeMarkForm.application_date.value === '' ? '0000-00-00' : TradeMarkForm.application_date.value)

        formData.append("usage_details_id", TradeMarkForm.usage_details_id.value === '' ? '0' : TradeMarkForm.usage_details_id.value)
        formData.append("goods_description", TradeMarkForm.goods_description.value || '')
        formData.append("usage_from_date", TradeMarkForm.usage_from_date.value === '' ? '0000-00-00' : TradeMarkForm.usage_from_date.value)
        formData.append("ip_india_status", TradeMarkForm.ip_india_status.value || '')
        formData.append("comments", TradeMarkForm.comments.value)
        formData.append("internal_status", TradeMarkForm.internal_status.value)

        formData.append("allotment", TradeMarkForm.allotment.value || '')
        formData.append("amendment", TradeMarkForm.amendment.value || '')
        formData.append("journel_extract", TradeMarkForm.journel_extract.value || '')
        formData.append("certificate_date", TradeMarkForm.certificate_date.value === '' ? '0000-00-00' : TradeMarkForm.certificate_date.value)
        formData.append("renewal_certificate_date", TradeMarkForm.renewal_certificate_date.value === '' ? '0000-00-00' : TradeMarkForm.renewal_certificate_date.value)
        formData.append("next_renewal", TradeMarkForm.next_renewal.value === '' ? '0000-00-00' : TradeMarkForm.next_renewal.value)

        formData.append("created_by", localStorage.getItem("empId"))
        formData.append("created_on", moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("updated_on", moment().format('YYYY-MM-DD HH:m:s'))
        formData.append("updated_by", localStorage.getItem("empId"))
        formData.append("ip_address", "ddf")

        if (TradeMarkForm.class_id.value && TradeMarkForm.class_id.value != "") {
            formData.set("class_id", TradeMarkForm.class_id.value)
            // params["class_id"] = TradeMarkForm.class_id.value;
        }

        if (TradeMarkForm.trademark_id.value != 0) {
            formData.set("trademark_id", TradeMarkForm.trademark_id.value)
        }

        if (TradeMarkForm.poa.value && TradeMarkForm.poa.value != "") {
            formData.set("poa", TradeMarkForm.poa.value)
        }

        if (filtererr.length > 0) {
            // setTradeMarkForm({ error: true });
        } else {
            // setTradeMarkForm({ error: false });
            TradeMarkForm.upload.empty =true;
            dispatch(insertTradeMark(formData, TradeMarkForm, rowId)).then(() => {
                handleCancel()
                // dispatch(getTradeMark(rowId))
            })
        }

        setTradeMarkForm(prevState => ({
            ...prevState
        }));
    };
console.log(TradeMarkForm.upload.value,"TradeMarkForm.upload.value")
    const handleCancel = () => {
        let From_key = [
            "status_id", "class_id", "usage_details_id", "mark_id", "application_no", "application_date", "goods_description", "usage_from_date", "comments", "internal_status", "allotment",
            "ip_india_status", "amendment", "priority_details", "tmj_number", "tmj_date", "journel_extract",
            "poa", "certificate_date", "renewal_certificate_date", "upload", "orders"
        ]

        From_key.map((data) => {
            try {
                if (data != "upload" || data != "orders") {
                    TradeMarkForm[data].value = ""
                    TradeMarkForm[data].empty = false
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
                        <div className="Tradeheadings">Mark</div>
                        <Labelbox type="textarea"
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
                            empty={TradeMarkForm.upload.empty}
                            value={TradeMarkForm.upload.value}
                            upload_id={"upload"}
                            error={TradeMarkForm.upload.error}
                            errmsg={TradeMarkForm.upload.errmsg}
                            disabled={TradeMarkForm.upload.disabled}
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
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Usage Details</div>
                        <Labelbox type="select"
                            dropdown={usageDetList.tmUsageDetailsData}
                            changeData={(data) => checkValidation(data, "usage_details_id")}
                            value={TradeMarkForm.usage_details_id.value}
                            error={TradeMarkForm.usage_details_id.error}
                            errmsg={TradeMarkForm.usage_details_id.errmsg}
                            disabled={TradeMarkForm.usage_details_id.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Date of Use</div>
                        <Labelbox type="datepicker"
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "usage_from_date")}
                            value={TradeMarkForm.usage_from_date.value}
                            error={TradeMarkForm.usage_from_date.error}
                            errmsg={TradeMarkForm.usage_from_date.errmsg}
                            disabled={TradeMarkForm.usage_from_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">IP India Status</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "ip_india_status")}
                            value={TradeMarkForm.ip_india_status.value}
                            error={TradeMarkForm.ip_india_status.error}
                            errmsg={TradeMarkForm.ip_india_status.errmsg}
                            disabled={TradeMarkForm.ip_india_status.disabled}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Tradeheadings">Next Renewal</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "next_renewal")}
                            value={TradeMarkForm.next_renewal.value}
                            error={TradeMarkForm.next_renewal.error}
                            errmsg={TradeMarkForm.next_renewal.errmsg}
                            disabled={TradeMarkForm.next_renewal.disabled}
                            disablePast={true}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Comments</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "comments")}
                            value={TradeMarkForm.comments.value}
                            error={TradeMarkForm.comments.error}
                            errmsg={TradeMarkForm.comments.errmsg}
                            disabled={TradeMarkForm.comments.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Internal Status</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "internal_status")}
                            value={TradeMarkForm.internal_status.value}
                            error={TradeMarkForm.internal_status.error}
                            errmsg={TradeMarkForm.internal_status.errmsg}
                            disabled={TradeMarkForm.internal_status.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Allotment</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "allotment")}
                            value={TradeMarkForm.allotment.value}
                            error={TradeMarkForm.allotment.error}
                            errmsg={TradeMarkForm.allotment.errmsg}
                            disabled={TradeMarkForm.allotment.disabled}
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
                            upload_id={TradeMarkForm.orders.id}
                            value={TradeMarkForm.orders.value}
                            error={TradeMarkForm.orders.error}
                            errmsg={TradeMarkForm.orders.errmsg}
                            disabled={TradeMarkForm.orders.disabled}
                        />

                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Amendment</div>
                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "amendment")}
                            value={TradeMarkForm.amendment.value}
                            error={TradeMarkForm.amendment.error}
                            errmsg={TradeMarkForm.amendment.errmsg}
                            disabled={TradeMarkForm.amendment.disabled}
                        />
                    </Grid>
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
                        <div className="Tradeheadings">TMJ Number</div>
                        <Labelbox type="textarea"
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
                        <div className="Tradeheadings">Journal Extract</div>

                        <Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "journel_extract")}
                            value={TradeMarkForm.journel_extract.value}
                            error={TradeMarkForm.journel_extract.error}
                            errmsg={TradeMarkForm.journel_extract.errmsg}
                            disabled={TradeMarkForm.journel_extract.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">POA</div>
                        <Labelbox type="select"
                            changeData={(data) => checkValidation(data, "poa")}
                            value={TradeMarkForm.poa.value}
                            error={TradeMarkForm.poa.error}
                            errmsg={TradeMarkForm.poa.errmsg} dropdown={poaList.POADetailsData}
                            disabled={TradeMarkForm.poa.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Certificate Date</div>
                        <Labelbox type="datepicker"
                            disableFuture={true}
                            changeData={(data) => checkValidation(data, "certificate_date")}
                            value={TradeMarkForm.certificate_date.value}
                            error={TradeMarkForm.certificate_date.error}
                            errmsg={TradeMarkForm.certificate_date.errmsg}
                            disabled={TradeMarkForm.certificate_date.disabled}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div className="Tradeheadings">Renewal Certificate Date</div>
                        <Labelbox type="datepicker"
                            disablePast={true}
                            changeData={(data) => checkValidation(data, "renewal_certificate_date")}
                            value={TradeMarkForm.renewal_certificate_date.value}
                            error={TradeMarkForm.renewal_certificate_date.error}
                            errmsg={TradeMarkForm.renewal_certificate_date.errmsg}
                            disabled={TradeMarkForm.renewal_certificate_date.disabled}
                        />
                    </Grid>


                </Grid>

            </Grid>
            <Grid item xs={12} container justify="flex-end" >
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS="timeSheetButtons" />
                <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} custombtnCSS="timeSheetButtons" />

            </Grid>




        </div>

    )
}
const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({

    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList: state.tradeMarkReducer.getClassDetailsList || [],
    POAList: state.tradeMarkReducer.getPOAList || [],
    tmUsageDetailsList: state.tradeMarkReducer.gettradeMarkUsageList || [],
    countriesList: state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    tradeMark: state.tradeMarkReducer.getTrademark || {},
});

//export default connect(mapStateToProps)(ProjectTaskModel);
export default connect(mapStateToProps)(TradeMark);
