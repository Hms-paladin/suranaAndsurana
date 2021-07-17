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
import { insertPatent,getPatentDetails } from "../../../actions/PatentAction";
import moment from 'moment'

function OppositionDefended(props) {

    const [projectDetails, setProjectDetails] = useState({})
    const [idDetails, setidDetails] = useState({})
    const dispatch = useDispatch()
    const [tradeStatusList, settradeStatusList] = useState({})
    const [countryDetList, setcountryDetList] = useState({})
    const [patentForm, setpatentForm] = useState({

        opp_fill_date: {
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
        opponent_agent: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

        comments: {
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
        setProjectDetails(props.ProjectDetails);
        props.ProjectDetails.length > 0 && setidDetails({
            project_id: props.ProjectDetails[0].project_id,
            client_id: props.ProjectDetails[0].client_id,
        })

        let tradeStatusData = []
        props.tradeStatusList.map((data) =>
            tradeStatusData.push({
                value: data.Status,
                id: data.status_id
            })
        )
        settradeStatusList({ tradeStatusData })

        let countryListsData = []
        props.countriesList.map((data) =>
            countryListsData.push({
                value: data.country,
                id: data.country_id
            })
        )
        setcountryDetList({ countryListsData })



    }, [props.ProjectDetails,
    props.tradeStatusList, props.countriesList
    ]);
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
        console.log(filtererr.length);
        let params = {
            "project_id": idDetails.project_id,
            "opposition_filled_date": patentForm.opp_fill_date.value,
            "types_of_grant": patentForm.type_grant.value,
            "application_no": patentForm.app_num.value,
            "patent_title": patentForm.title.value,
            "publication_date": patentForm.publicationdate.value,
            "opponent": patentForm.opponent.value,
            "opponent_agent": patentForm.opponent_agent.value,
            "comments": patentForm.comments.value,
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

    useEffect(() => {
        console.log(props.getPatentDetails,"testttttttttt")
        if (props.getPatentDetails&&props.getPatentDetails.length > 0) {
          let indiaFil_key = [ "opp_fill_date", "type_grant", "app_num", "opponent", "publicationdate", "title", "opponent_agent", "comments"]
    
          let indiaFil_value = ["opposition_filled_date", "types_of_grant", "application_no", "opponent","publication_date", "patent_title", "opponent_agent", "comments"]
    
          indiaFil_key.map((data, index) => {
            // console.log(indiaFil_value[index], indiaFil_value[index] !== "application_date", props.getPatentDetails[0][indiaFil_value[index]],"indiaFil_value[index]")
            if (indiaFil_value[index] !== "application_date" && indiaFil_value[index] !== "priority_date" ) {
              patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]];
              patentForm[data].disabled = indiaFil_value[index]!=='status_id'&&props.getPatentDetails[0][indiaFil_value[index]] ? true : false;
            }
            else {
              console.log(props.getPatentDetails[0][indiaFil_value[index]], "props.getPatentDetails[0]")
              patentForm[data].value = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? "" : moment(props.getPatentDetails[0][indiaFil_value[index]]);
              patentForm[data].disabled = props.getPatentDetails[0][indiaFil_value[index]] === "0000-00-00" ? false : true;
    
            } 
          });
          setpatentForm((prevState) => ({
            ...prevState,
          }));
        }
      }, [props.getPatentDetails])

    const handleCancel = () => {
        let formKey = [
            "opp_fill_date", "type_grant", "app_num", "opponent", "publicationdate", "title", "opponent_agent", "comments"
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
                    <Grid>
                        <div className="Fieldheadings">Opposition Filed Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "opp_fill_date")}
                            value={patentForm.opp_fill_date.value}
                            error={patentForm.opp_fill_date.error}
                            errmsg={patentForm.opp_fill_date.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Types of Grant</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "type_grant")}
                            value={patentForm.type_grant.value}
                            error={patentForm.type_grant.error}
                            errmsg={patentForm.type_grant.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Patent Application Number</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "app_num")}
                            value={patentForm.app_num.value}
                            error={patentForm.app_num.error}
                            errmsg={patentForm.app_num.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Patent Title</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "title")}
                            value={patentForm.title.value}
                            error={patentForm.title.error}
                            errmsg={patentForm.title.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Publication Date</div>
                        <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "publicationdate")}
                            value={patentForm.publicationdate.value}
                            error={patentForm.publicationdate.error}
                            errmsg={patentForm.publicationdate.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Opponent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "opponent")}
                            value={patentForm.opponent.value}
                            error={patentForm.opponent.error}
                            errmsg={patentForm.opponent.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Opponent Agent</div>
                        <Labelbox type="text"
                            changeData={(data) => checkValidation(data, "opponent_agent")}
                            value={patentForm.opponent_agent.value}
                            error={patentForm.opponent_agent.error}
                            errmsg={patentForm.opponent_agent.errmsg} />
                    </Grid>

                    <Grid>
                        <div className="Fieldheadings">Comments</div>
                        <div className="foreign_div"><Labelbox type="textarea"
                            changeData={(data) => checkValidation(data, "comments")}
                            value={patentForm.comments.value}
                            error={patentForm.comments.error}
                            errmsg={patentForm.comments.errmsg} /></div>
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

    tradeStatusList: state.tradeMarkReducer.getTradeMarkStatusList || [],
    countriesList: state.tradeMarkReducer.getCountryList || [],
    ProjectDetails: state.ProjectFillingFinalReducer.getProjectDetails || [],
    getPatentDetails: state.PatentReducer.getPatentDetails || [],
});

export default connect(mapStateToProps)(OppositionDefended);