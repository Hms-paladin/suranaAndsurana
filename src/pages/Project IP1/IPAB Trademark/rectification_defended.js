import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import './IPABTrademark.scss'
import ValidationLibrary from "../../../helpers/validationfunction";
import { useDispatch, connect } from "react-redux";
import { getTradeMarkStatus, getClassDetails, insertIPAB, getIPAP } from "../../../actions/tradeMarkAction";
import moment from 'moment'
import { useParams } from "react-router-dom";
import { getFilingType, getFilingTypeIpab } from "../../../actions/MasterDropdowns";

function IPABRectificationDefended(props) {
    const [tradeStatusList, settradeStatusList] = useState({})
    const [classDetList, setclassDetList] = useState({})
    const [filingTypeList, setFilingTypeList] = useState({})
    const dispatch = useDispatch()
    let { rowId } = useParams()

    
    const [TradeMarkForm, setTradeMarkForm] = useState({
        client_applicant: {
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
        mark: {
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
        class_id: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,

        },
        rectification_filing_date: {
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
        applicant: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,

        },
        applicant_rep: {
            value: "",
            validation: [{ "name": "required" },],
            error: null,
            errmsg: null,
            disabled: false,

        },
        filing_type_id: {
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

        }
    })

    useEffect(() => {
        dispatch(getFilingTypeIpab());
        dispatch(getIPAP(rowId));
        dispatch(getTradeMarkStatus());
        dispatch(getClassDetails());
        // dispatch(getFilingTypeIpab());

    }, []);

    useEffect(() => {
        handleCancel()
        let filingTypeData = []
        props.filingTypeList.map((data) =>
            filingTypeData.push({
                value: data.filing_type,
                id: data.filing_type_id
            })
        )
        setFilingTypeList({ filingTypeData })

        if (props.tradeMark && props.tradeMark[0]) {
            let obj = props.tradeMark[0];
            TradeMarkForm.project_id = obj.project_id;
            TradeMarkForm.trademark_ipab_id.value = obj.trademark_ipab_id;
            TradeMarkForm.status_id.value = obj.status_id;
            // if(obj.status_id && obj.status_id.length)
            // TradeMarkForm.status_id.disabled = true;

            TradeMarkForm.client_applicant.value = obj.client_applicant;
            // if(obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.class_id.value = obj.class_id;
            // if(obj.class_id && obj.class_id.length)
            // TradeMarkForm.class_id.disabled = true;

            TradeMarkForm.comments.value = obj.comments
            // if(obj.comments && obj.comments.length)
            // TradeMarkForm.comments.disabled = true;

            TradeMarkForm.trade_mark_no.value = obj.trademark_no;
            // if(obj.trademark_no && obj.trademark_no.length)
            // TradeMarkForm.trade_mark_no.disabled = true;

            TradeMarkForm.serial_no.value = obj.serial_no;
            // if(obj.serial_no && obj.serial_no.length)
            // TradeMarkForm.serial_no.disabled = true;

            TradeMarkForm.org_appeal_no.value = obj.org_appeal_no;
            // if(obj.org_appeal_no && obj.org_appeal_no.length)
            // TradeMarkForm.org_appeal_no.disabled = true;

            obj.hearing_date&&(TradeMarkForm.date_of_hearing.value = obj.hearing_date);
            // if(obj.hearing_date && obj.hearing_date.length)
            // TradeMarkForm.date_of_hearing.disabled = true;

            obj.rectification_filing&&(TradeMarkForm.rectification_filing_date.value = obj.rectification_filing);
            // if(obj.hearing_date && obj.hearing_date.length)
            // TradeMarkForm.date_of_hearing.disabled = true;

            TradeMarkForm.applicant.value = obj.opp_applicant;
            // if(obj.opp_applicant && obj.opp_applicant.length)
            // TradeMarkForm.opp_applicant.disabled = true;

            TradeMarkForm.applicant_rep.value = obj.opp_applicant_rep;
            // if(obj.opp_applicant_rep && obj.opp_applicant_rep.length)
            // TradeMarkForm.opp_applicant_rep.disabled = true;

            TradeMarkForm.filing_type_id.valueById = obj.filing_type_id ? JSON.parse("[" + obj.filing_type_id + "]") : [];
            let arr = [];
            for (var val of TradeMarkForm.filing_type_id.valueById) {
                for (var t of filingTypeData) {
                    if (t.id == val) {
                        arr.push(t.value);
                    }

                }
            }
            TradeMarkForm.filing_type_id.value = arr;

            TradeMarkForm.mark.value = obj.mark;
            // if(obj.mark && obj.mark.length)
            // TradeMarkForm.mark.disabled = true;

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

    }, [props.tradeStatusList, props.classDetailsList, props.filingTypeList,props.tradeMark]);


    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(TradeMarkForm);
        var filtererr = targetkeys.filter((obj) => TradeMarkForm[obj].error == true);

        console.log(filtererr.length);
        let params = {
            "ip_type": 0,
            "client_status_type": null,
            "client_applicant": TradeMarkForm.client_applicant.value,
            "trademark_ipab_id": TradeMarkForm.trademark_ipab_id.value,
            "project_id": rowId,
            "trademark_no": TradeMarkForm.trade_mark_no.value || null,
            "class_id": TradeMarkForm.class_id.value || 0,
            "rectification_filing": TradeMarkForm.rectification_filing_date.value || null,
            "serial_no": TradeMarkForm.serial_no.value || null,
            "org_appeal_no": TradeMarkForm.org_appeal_no.value,
            "hearing_date": TradeMarkForm.date_of_hearing.value || null,
            "opp_applicant": TradeMarkForm.applicant.value || null,
            "opp_applicant_rep": TradeMarkForm.applicant_rep.value,
            "filing_type_id": TradeMarkForm.filing_type_id.valueById&&TradeMarkForm.filing_type_id.valueById.toString()|| '0',
            "status_id": TradeMarkForm.status_id.value || 0,
            "comments": TradeMarkForm.comments.value || null,
            "created_on": moment().format('YYYY-MM-DD HH:m:s') || null,
            "updated_on": moment().format('YYYY-MM-DD HH:m:s') || null,
            "created_by": localStorage.getItem("empId"),
            "updated_by": localStorage.getItem("empId"),
            "mark": TradeMarkForm.mark.value || null,
            "respondent": null,
            "respondent_rep": null,
            "client_respondent": null,
            "revocation_filing_date": null,
            "applicant_no": null,
            "patent_title": null,
            "appeal_filing_date": null
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
            "client_applicant", "mark", "trade_mark_no", "class_id", "rectification_filing_date", "serial_no", "org_appeal_no", "date_of_hearing", "applicant",
            "applicant_rep", "filing_type_id", "status_id", "comments"
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
                        changeData={(data) => checkValidation(data, "mark")}
                        value={TradeMarkForm.mark.value}
                        error={TradeMarkForm.mark.error}
                        errmsg={TradeMarkForm.mark.errmsg}
                        disabled={TradeMarkForm.mark.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Trade Mark No</div>
                    <Labelbox type="text"
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
                    <div className="copyFieldheadings">Rectification Filing Date</div>
                    <Labelbox type="datepicker"
                       
                        changeData={(data) => checkValidation(data, "rectification_filing_date")}
                        value={TradeMarkForm.rectification_filing_date.value}
                        error={TradeMarkForm.rectification_filing_date.error}
                        errmsg={TradeMarkForm.rectification_filing_date.errmsg}
                        disabled={TradeMarkForm.rectification_filing_date.disabled}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Serial No</div>
                    <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "serial_no")}
                        value={TradeMarkForm.serial_no.value}
                        error={TradeMarkForm.serial_no.error}
                        errmsg={TradeMarkForm.serial_no.errmsg}
                        disabled={TradeMarkForm.serial_no.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Org Appeal No</div>
                    <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "org_appeal_no")}
                        value={TradeMarkForm.org_appeal_no.value}
                        error={TradeMarkForm.org_appeal_no.error}
                        errmsg={TradeMarkForm.org_appeal_no.errmsg}
                        disabled={TradeMarkForm.org_appeal_no.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Date of Hearing</div>
                    <Labelbox type="datepicker"
                       
                        changeData={(data) => checkValidation(data, "date_of_hearing")}
                        value={TradeMarkForm.date_of_hearing.value}
                        error={TradeMarkForm.date_of_hearing.error}
                        errmsg={TradeMarkForm.date_of_hearing.errmsg}
                        disabled={TradeMarkForm.date_of_hearing.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                <div className="copyFieldheadings">Applicant</div>
                    <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "applicant")}
                        value={TradeMarkForm.applicant.value}
                        error={TradeMarkForm.applicant.error}
                        errmsg={TradeMarkForm.applicant.errmsg}
                        disabled={TradeMarkForm.applicant.disabled}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings"> Applicant - Rep</div>
                    <Labelbox type="text"
                        changeData={(data) => checkValidation(data, "applicant_rep")}
                        value={TradeMarkForm.applicant_rep.value}
                        error={TradeMarkForm.applicant_rep.error}
                        errmsg={TradeMarkForm.applicant_rep.errmsg}
                        disabled={TradeMarkForm.applicant_rep.disabled}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Filing Type</div>
                    <Labelbox type="select"
                        mode={"multiple"}
                        changeData={(data) => checkValidation(data, "filing_type_id", filingTypeList.filingTypeData)}
                        dropdown={filingTypeList.filingTypeData}
                        value={TradeMarkForm.filing_type_id.value}
                        error={TradeMarkForm.filing_type_id.error}
                        errmsg={TradeMarkForm.filing_type_id.errmsg}
                        disabled={TradeMarkForm.filing_type_id.disabled}
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
                </Grid>
                <Grid item xs={2}>
                    <div className="copyFieldheadings">Comments</div>
                    <Labelbox type="textarea"
                        
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
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>
({

    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    classDetailsList: state.tradeMarkReducer.getClassDetailsList || [],
    filingTypeList: state.tradeMarkReducer.getFilingTypeIpab || [],
    // ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    tradeMark: state.tradeMarkReducer.getIPAP || {},
});

export default connect(mapStateToProps)(IPABRectificationDefended);