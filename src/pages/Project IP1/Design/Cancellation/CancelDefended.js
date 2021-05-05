import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import CustomButton from "../../../../component/Butttons/button";
import ValidationLibrary from "../../../../helpers/validationfunction";
import { useSelector, useDispatch } from 'react-redux';
import { getIPStatus } from "../../../../actions/IPDropdown.js";
import { InsertDesign, getDesignDetails } from "../../../../actions/InsertDesign";
import moment from "moment";

function CancelDefended(props) {
    const [CancelDefended, setCancelDefended] = useState({
        client_respontent: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            disabled: false
        },
        des_number: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        respondent: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        petitioner_rep: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        status: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        },
        comments: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
            disabled: false
        }
    })
    const [cancDefGetList, setCancDefGetList] = useState({
        getStatusList: []
    })
    const DesignDropDowns = useSelector((state) => state.IPDropdownReducer)
  const getDesign =useSelector((state) => state.getDesignDetails)
  const dispatch = useDispatch();

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            CancelDefended[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: CancelDefended[key].validation
        }
        setCancelDefended(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(CancelDefended);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                CancelDefended[targetkeys[i]].value,
                CancelDefended[targetkeys[i]].validation
            );
            CancelDefended[targetkeys[i]].error = !errorcheck.state;
            CancelDefended[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = CancelDefended[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => CancelDefended[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
        } else {
            dispatch(InsertDesign(CancelDefended, props.projectDetails && props.projectDetails[0],getDesign)).then(() => {
                // handleCancel()
              })
        }
        setCancelDefended(prevState => ({
            ...prevState
        }));
    }

    useEffect(() => {
        dispatch(getIPStatus());
      }, [])
    
      useEffect(() => {
    
        const getStatusList = []

        DesignDropDowns.getIPStatus.map((data) => {
          getStatusList.push({ id: data.status_id, value: data.Status })
        })
    
        setCancDefGetList({ getStatusList })
      }, [DesignDropDowns])

      const handleCancel = () => {
        let cancDef_key = ["client_respontent", "des_number", "respondent", "petitioner_rep", "status", "comments"]

        let cancDef_value = ["client_petitioner","design_number", "responent_rep", "petitioner", "status", "comments"]

        if(getDesign.length > 0){
            cancDef_key.map((data, index) => {
                CancelDefended[data].value = getDesign[0][cancDef_value[index]] ? getDesign[0][cancDef_value[index]] : "";
          });
        }else{
            cancDef_key.map((data) => {
                CancelDefended[data].value = "";
            });
        }
        setCancDefGetList((prevState) => ({
          ...prevState,
        }));
      };

      useEffect(()=>{
        dispatch(getDesignDetails(props.projectDetails && props.projectDetails[0].project_id));
      },[props.projectDetails])


      useEffect(()=>{
        if(getDesign.length > 0){
            let cancDef_key = ["client_respontent", "des_number", "respondent", "petitioner_rep", "status", "comments"]

            let cancDef_value = ["client_petitioner","design_number", "responent_rep", "petitioner", "status", "comments"]
      
            cancDef_key.map((data, index) => {
            if(cancDef_value[index] !== "application_date" && cancDef_value[index] !== "priority_date" && cancDef_value[index] !== "renewal_date"){
            CancelDefended[data].value = getDesign[0][cancDef_value[index]];
            CancelDefended[data].disabled = getDesign[0][cancDef_value[index]] ? true : false;
            }
            else{
              console.log(getDesign[0][cancDef_value[index]],"getDesign[0]")
            CancelDefended[data].value = getDesign[0][cancDef_value[index]] === "0000-00-00" ? "" : moment(getDesign[0][cancDef_value[index]]);
            CancelDefended[data].disabled = getDesign[0][cancDef_value[index]] === "0000-00-00" ? false : true;
            }
          });
          setCancDefGetList((prevState) => ({
            ...prevState,
          }));
        }
      },[getDesign])


    return (
        <div className="container">
            <Grid container direction={"column"}>
                <Grid item xs={12} md={12} className="app_cont_domestic">


                    <Labelbox type="text"
                        placeholder={"Client Respondent"}
                        changeData={(data) => checkValidation(data, "client_respontent")}
                        value={CancelDefended.client_respontent.value}
                        error={CancelDefended.client_respontent.error}
                        errmsg={CancelDefended.client_respontent.errmsg}
                        disabled={CancelDefended.client_respontent.disabled}
                    />

                    <Labelbox type="text"
                        placeholder={"Design Number"}
                        changeData={(data) => checkValidation(data, "des_number")}
                        value={CancelDefended.des_number.value}
                        error={CancelDefended.des_number.error}
                        errmsg={CancelDefended.des_number.errmsg}
                        disabled={CancelDefended.des_number.disabled}
                    />

                    <Labelbox type="text"
                        placeholder={"Respondent"}
                        changeData={(data) => checkValidation(data, "respondent")}
                        value={CancelDefended.respondent.value}
                        error={CancelDefended.respondent.error}
                        errmsg={CancelDefended.respondent.errmsg}
                        disabled={CancelDefended.respondent.disabled}
                    />

                    <Labelbox type="text"
                        placeholder={"Petitioner Rep"}
                        changeData={(data) => checkValidation(data, "petitioner_rep")}
                        value={CancelDefended.petitioner_rep.value}
                        error={CancelDefended.petitioner_rep.error}
                        errmsg={CancelDefended.petitioner_rep.errmsg}
                        disabled={CancelDefended.petitioner_rep.disabled}
                    />

                    <Labelbox type="select"
                        placeholder={"Status"}
                        changeData={(data) => checkValidation(data, "status")}
                        dropdown={cancDefGetList.getStatusList}
                        value={CancelDefended.status.value}
                        error={CancelDefended.status.error}
                        errmsg={CancelDefended.status.errmsg}
                        disabled={CancelDefended.status.disabled}
                    />
                    <Labelbox type="text"
                        placeholder={"Comments"}
                        changeData={(data) => checkValidation(data, "comments")}
                        value={CancelDefended.comments.value}
                        error={CancelDefended.comments.error}
                        errmsg={CancelDefended.comments.errmsg}
                        disabled={CancelDefended.comments.disabled}
                    />
                </Grid>
            </Grid>

            <div className="custombtnOposition">
                <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" onBtnClick={onSubmit} custombtnCSS={"TMopositionbuttons"} />
                <CustomButton btnName={"CANCEL"} custombtnCSS={"TMopositionbuttons"} onBtnClick={handleCancel} />
            </div>


        </div>
    )
}
export default CancelDefended;