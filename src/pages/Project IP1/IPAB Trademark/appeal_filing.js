import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getTradeMarkStatus, getClassDetails, insertIPAB, getIPAP } from "../../../actions/tradeMarkAction";
import { getFilingType } from "../../../actions/MasterDropdowns";
import moment from 'moment'
import { useParams } from "react-router-dom";

function AppealFiling(props) {
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})

    let { rowId } = useParams()
    var params = {};
    const dispatch = useDispatch()

    const [TradeMarkForm, setTradeMarkForm] = useState({
        status_id: {
            value: "",
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


    useEffect(() => {
        dispatch(getIPAP(rowId));
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());

    }, []);

    useEffect(() => {
        handleCancel()
        if (props.tradeMark && props.tradeMark[0]) {
            let obj = props.tradeMark[0];
            TradeMarkForm.project_id = obj.project_id;
            TradeMarkForm.trademark_ipab_id.value = obj.trademark_ipab_id;
            TradeMarkForm.status_id.value = obj.status_id;
            // if(obj.status_id && obj.status_id.length)
            // TradeMarkForm.status_id.disabled = true;

            TradeMarkForm.class_id.value = obj.class_id;
            // if(obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.comments.value = obj.comments
            // if(obj.comments && obj.comments.length)
            // TradeMarkForm.comments.disabled = true;

            TradeMarkForm.client_applicant.value = obj.client_applicant;
            // if(obj.client_applicant && obj.client_applicant.length)
            // TradeMarkForm.client_applicant.disabled = true;

            TradeMarkForm.client_mark.value = obj.client_mark;
            // if(obj.client_mark && obj.client_mark.length)
            // TradeMarkForm.client_mark.disabled = true;

            TradeMarkForm.trade_mark_no.value = obj.trademark_no;
            // if(obj.trade_mark_no && obj.trade_mark_no.length)
            // TradeMarkForm.trade_mark_no.disabled = true;

            TradeMarkForm.appeal_filing_date.value = obj.appeal_filing_date || moment().format('YYYY-MM-DD');
            // if(obj.appeal_filing_date && obj.appeal_filing_date.length)
            // TradeMarkForm.appeal_filing_date.disabled = true;

            TradeMarkForm.serial_no.value = obj.serial_no;
            // if(obj.serial_no && obj.serial_no.length)
            // TradeMarkForm.serial_no.disabled = true;

            TradeMarkForm.date_of_hearing.value = obj.date_of_hearing || moment().format('YYYY-MM-DD');

            TradeMarkForm.client_mark.value = obj.mark;
            TradeMarkForm.appeal_no.value = obj.org_appeal_no;
            // if(obj.date_of_hearing && obj.date_of_hearing.length)
            // TradeMarkForm.date_of_hearing.disabled = true;
        }

        let tradeStatusData = []
        props.tradeStatusList.map((data) =>
            tradeStatusData.push({
                value: data.Status,
                id: data.status_id
            })
        )
        settradeStatusList({ tradeStatusData })

        let classDetailsData = []
        props.classDetailsList.map((data) =>
            classDetailsData.push({
                value: data.class,
                id: data.class_id
            })
        )
        setclassDetList({ classDetailsData })

        const id = {
            ProjectType: props.ProjectDetails[0].project_type_id,
            ProjectSubtype: props.ProjectDetails[0].sub_project_id,
            ProcessType: props.ProjectDetails[0].process_id
        }
        dispatch(getFilingType(id));
    }, [props.tradeStatusList, props.classDetailsList, props.filingTypeData, props.ProjectDetails,props.tradeMark]);


    const errorMessege = () => {
        let From_key = [
            "status_id", "class_id", "comments", "client_applicant", "client_mark", "trade_mark_no", "appeal_filing_date", "serial_no", "date_of_hearing"
        ]

        From_key.map((data) => {
            try {
                if (TradeMarkForm[data].value = "") {
                    TradeMarkForm[data].error = true;

                }
            } catch (error) {
                throw error;
            }
        });
        setTradeMarkForm(prevState => ({
            ...prevState,
        }));
    }



    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(TradeMarkForm);
     
        var filtererr = targetkeys.filter((obj) => TradeMarkForm[obj].error == true);
        params = {
            "ip_type": 0,
            "client_status_type": null,
            "trademark_ipab_id": TradeMarkForm.trademark_ipab_id.value,
            "project_id": rowId,
            "trademark_no": TradeMarkForm.trade_mark_no.value,
            "class_id": TradeMarkForm.class_id.value,
            "rectification_filing": null,
            "serial_no": TradeMarkForm.serial_no.value,
            "org_appeal_no": TradeMarkForm.appeal_no.value,
            "hearing_date": TradeMarkForm.date_of_hearing.value,
            "opp_applicant": "",
            "opp_applicant_rep": "",
            "filing_type_id": 0,
            "status_id": TradeMarkForm.status_id.value,
            "comments": TradeMarkForm.comments.value,
            "created_on": moment().format('YYYY-MM-DD HH:m:s') || null,
            "updated_on": moment().format('YYYY-MM-DD HH:m:s') || null,
            "created_by": localStorage.getItem("empId"),
            "updated_by": localStorage.getItem("empId"),
            "respondent": "",
            "respondent_rep": "",
            "client_responent": "",
            "revocation_filing_date": null,
            "applicant_no": "",
            "patent_title": "",
            "appeal_filing_date": TradeMarkForm.appeal_filing_date.value,
            "client_applicant": TradeMarkForm.client_applicant.value,
            "mark": TradeMarkForm.client_mark.value
        }
        console.log("paramscheck", params);
        if (TradeMarkForm.class_id.value != "") {
            params["class_id"] = TradeMarkForm.class_id.value;
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
            "status_id", "class_id", "comments", "client_applicant", "client_mark", "trade_mark_no", "appeal_filing_date", "serial_no", "date_of_hearing",
            "appeal_no"
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
                    <div className="copyFieldheadings">Client - Applicant</div>
                    <Labelbox type="text"
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "client_applicant")}
                        value={TradeMarkForm.client_applicant.value}
                        error={TradeMarkForm.client_applicant.error}
                        errmsg={TradeMarkForm.client_applicant.errmsg}
                        disabled={TradeMarkForm.client_applicant.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Mark</div>
                    <Labelbox type="text"
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "client_mark")}
                        value={TradeMarkForm.client_mark.value}
                        error={TradeMarkForm.client_mark.error}
                        errmsg={TradeMarkForm.client_mark.errmsg}
                        disabled={TradeMarkForm.client_mark.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Trade Mark No</div>
                    <Labelbox type="text"
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "trade_mark_no")}
                        value={TradeMarkForm.trade_mark_no.value}
                        error={TradeMarkForm.trade_mark_no.error}
                        errmsg={TradeMarkForm.trade_mark_no.errmsg}
                        disabled={TradeMarkForm.trade_mark_no.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Class</div>
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
                    <div className="copyFieldheadings">Appeal Filing Date</div>
                    <Labelbox type="datepicker"
                        disablePast={true}
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
                    <div className="copyFieldheadings"> Serial No</div>
                    <Labelbox type="text"
                        disableFuture={false}
                        changeData={(data) => checkValidation(data, "serial_no")}
                        value={TradeMarkForm.serial_no.value}
                        error={TradeMarkForm.serial_no.error}
                        errmsg={TradeMarkForm.serial_no.errmsg}
                        disabled={TradeMarkForm.serial_no.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Appeal No</div>
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
                    <div className="copyFieldheadings">Date of Hearing</div>
                    <Labelbox type="datepicker"
                        disablePast={true}
                        changeData={(data) => checkValidation(data, "date_of_hearing")}
                        value={TradeMarkForm.date_of_hearing.value}
                        error={TradeMarkForm.date_of_hearing.error}
                        errmsg={TradeMarkForm.date_of_hearing.errmsg}
                        disabled={TradeMarkForm.date_of_hearing.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Status</div>
                    <Labelbox type="select"
                        changeData={(data) => checkValidation(data, "status_id")}
                        dropdown={tradeStatusList.tradeStatusData}
                        value={TradeMarkForm.status_id.value}
                        error={TradeMarkForm.status_id.error}
                        errmsg={TradeMarkForm.status_id.errmsg}
                        disabled={TradeMarkForm.status_id.disabled}
                    />
                    {/* <Labelbox type="select" placeholder="Status"></Labelbox> */}
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Comments</div>
                    <Labelbox type="textarea"
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
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({

    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList: state.tradeMarkReducer.getClassDetailsList || [],
    filingTypeList: state.tradeMarkReducer.getFilingTypeList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    tradeMark: state.tradeMarkReducer.getIPAP || {},
});

export default connect(mapStateToProps)(AppealFiling);