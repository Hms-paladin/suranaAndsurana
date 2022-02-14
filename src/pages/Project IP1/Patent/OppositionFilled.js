import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import './Patent.scss'
import Labelbox from "../../../helpers/labelbox/labelbox";
import CustomButton from "../../../component/Butttons/button";
import { useDispatch, connect } from "react-redux";
import ValidationLibrary from "../../../helpers/validationfunction";
import { getProjectDetails } from "../../../actions/ProjectFillingFinalAction";
import { useParams } from "react-router-dom";
import {
    getTradeMarkStatus, getCountryDetails,
} from "../../../actions/tradeMarkAction";
import { insertPatent, getPatentDetails } from "../../../actions/PatentAction";
import moment from 'moment'

function OppositionFilled(props) {

    const [idDetails, setidDetails] = useState({})
    const dispatch = useDispatch()
    const [patentForm, setpatentForm] = useState({

        opp_fill_date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        app_agent: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        type_grant: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        app_num: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        opponent: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        publicationdate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        title: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        applicant: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    let { rowId } = useParams()
    useEffect(() => {
        dispatch(getProjectDetails(rowId))
        dispatch(getTradeMarkStatus());
        dispatch(getCountryDetails());
        dispatch(getPatentDetails(rowId));
    }, []);

    useEffect(() => {
        props.ProjectDetails.length > 0 && setidDetails({
            project_id: props.ProjectDetails[0].project_id,
            client_id: props.ProjectDetails[0].client_id,
        })
    }, [props.ProjectDetails]);

    useEffect(() => {
        handleCancel()
        if (props.getPatentDetails && props.getPatentDetails.length > 0) {
            let indiaFil_key = ["opp_fill_date", "app_agent", "type_grant", "app_num", "opponent", "publicationdate", "title", "applicant"]

            let indiaFil_value = ["opposition_filled_date", "application_agent", "types_of_grant", "application_agent", "opponent_agent", "publication_date", "patent_title", "patent_applicant"]

            indiaFil_key.map((data, index) => {

                if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date") {
                    patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]];
                    //   patentForm[data].disabled = indiaFil_value[index]!=='status_id'&&props.getPatentDetails[0][indiaFil_value[index]] ? true : false;
                }
                else {

                    patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(props.getPatentDetails[0][indiaFil_value[index]]);
                    //   patentForm[data].disabled = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? false : true;

                }
            });
            setpatentForm((prevState) => ({
                ...prevState,
            }));
        }
    }, [props.getPatentDetails])
    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(patentForm);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                patentForm[targetkeys[i]].value,
                patentForm[targetkeys[i]].validation
            );
            patentForm[targetkeys[i]].error = !errorcheck.state;
            patentForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = patentForm[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => patentForm[obj].error == true
        );

        let params = {
            "project_id": idDetails.project_id,
            "opponent_agent": patentForm.opponent.value,
            "opposition_filled_date": patentForm.opp_fill_date.value,
            "types_of_grant": patentForm.type_grant.value,
            "patent_applicant": patentForm.applicant.value,
            "patent_title": patentForm.title.value,
            "publication_date": patentForm.publicationdate.value,
            "application_agent": patentForm.app_agent.value,
            "application_no": patentForm.app_num.value,
            "created_by": localStorage.getItem("empId"),
            "created_on": moment().format('YYYY-MM-DD HH:m:s'),
            "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
            "updated_by": localStorage.getItem("empId"),
        }

        if (props.getPatentDetails[0]?.patent_id != "0") {
            params["patent_id"] = props.getPatentDetails[0]?.patent_id;
        }

        if (filtererr.length > 0) {
            // setpatentForm({ error: true });
        } else {
            // setpatentForm({ error: false });

            dispatch(insertPatent(params)).then(() => {
                handleCancel()
            })
        }

        setpatentForm(prevState => ({
            ...prevState
        }));
    };

    const handleCancel = () => {
        let formKey = [
            "opp_fill_date", "app_agent", "type_grant", "app_num", "opponent", "publicationdate", "title", "applicant"
        ]

        formKey.map((data) => {
            patentForm[data].value = ""
        })
        setpatentForm(prevState => ({
            ...prevState,
        }));
    }

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            patentForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: patentForm[key].validation
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

        setpatentForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));

    };
    return (
        <div>
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">
                    <Grid item xs={2}>
                        <div className="Fieldheadings">Name of Opponent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "opponent")}
                            value={patentForm.opponent.value}
                            error={patentForm.opponent.error}
                            errmsg={patentForm.opponent.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Opposition Filed Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "opp_fill_date")}
                            value={patentForm.opp_fill_date.value}
                            error={patentForm.opp_fill_date.error}
                            errmsg={patentForm.opp_fill_date.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Types of Grant</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "type_grant")}
                            value={patentForm.type_grant.value}
                            error={patentForm.type_grant.error}
                            errmsg={patentForm.type_grant.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Patent Application Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "app_num")}
                            value={patentForm.app_num.value}
                            error={patentForm.app_num.error}
                            errmsg={patentForm.app_num.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Patent Title</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "title")}
                            value={patentForm.title.value}
                            error={patentForm.title.error}
                            errmsg={patentForm.title.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Publication Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "publicationdate")}
                            value={patentForm.publicationdate.value}
                            error={patentForm.publicationdate.error}
                            errmsg={patentForm.publicationdate.errmsg} />
                    </Grid>

                    <Grid item xs={2}>
                        <div className="Fieldheadings">Patent Applicant</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "applicant")}
                            value={patentForm.applicant.value}
                            error={patentForm.applicant.error}
                            errmsg={patentForm.applicant.errmsg} />
                    </Grid>


                    <Grid item xs={2}>
                        <div className="Fieldheadings">Application Agent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "app_agent")}
                            value={patentForm.app_agent.value}
                            error={patentForm.app_agent.error}
                            errmsg={patentForm.app_agent.errmsg} />
                    </Grid>


                </Grid>

            </Grid>
            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS={"TMopositionbuttons"} onBtnClick={onSubmit} />
                <CustomButton btnName={"CANCEL"} onBtnClick={handleCancel} custombtnCSS={"TMopositionbuttons"} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    getPatentDetails: state.PatentReducer.getPatentDetails || [],
});

export default connect(mapStateToProps)(OppositionFilled);