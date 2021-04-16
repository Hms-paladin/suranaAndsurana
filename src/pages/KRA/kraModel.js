import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from '../../component/Butttons/button';

import ValidationLibrary from "../../helpers/validationfunction";
import DynModel from "../../component/Model/model";
import './KRA.scss'
import PlusIcon from "../../images/plusIcon.svg";
import EditIcon from "../../images/edit.svg";

const KRA = (props) => {
    const header = [
        // { id: 'table_name', label: 'Table Name' },
        { id: 'activity', label: 'Activity' },
        { id: 'subactivity', label: 'Subactivity' },
        { id: 'target', label: 'Target' },
        { id: 'achievement', label: 'Achievement' },
    ];

    const [kramodel, setKramodel] = useState(false);

    const [isLoaded, setIsLoaded] = useState(true);

    const [kpi_form, setKpi_form] = useState({

        activity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        subactivity: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        percentage: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },

    });

    function checkValidation(data, key, multipleId) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            kpi_form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: kpi_form[key].validation,
        };



        setKpi_form((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }



    return (
        <div>
            <div>
                <div className="kpi_sudb">
                    <Grid container spacing={2} className="ratemaster_firstgrid" className="kpi_sub">
                        <Grid item xs={7} container direction="row" className="spaceBtGrid" alignItems="center">
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 11 }}>Employee Name</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>Rajesh</label></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div><label style={{ fontSize: 11 }}>Period</label></div>
                                <div><label style={{ fontWeight: 'bold' }}>April 2021 to March 2021</label></div>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>


                <div className="kpi_table">
                    <Grid container >
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" style={{ height: 45 }}>
                            <Grid item xs={4}><label className="maintitle">Activity</label></Grid>
                            <Grid item xs={4}> <label className="maintitle">Sub Activity</label> </Grid>
                            <Grid item xs={4}><label className="maintitle">Percentage</label></Grid>

                        </Grid>


                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" >
                            <Grid item xs={4}><label className="maintitle">Hearing</label></Grid>
                            <Grid item xs={4}><label className="maintitle">In Effective</label></Grid>
                            <Grid item xs={4}> <div className="kra_img"><label className="maintitle">20</label> &nbsp;&nbsp;<img src={EditIcon} style={{ cursor: 'pointer', width: 19, marginTop: -23 }} /></div> </Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" >
                            <Grid item xs={4}><label className="maintitle">Documentation</label></Grid>
                            <Grid item xs={4}><label className="maintitle"></label></Grid>
                            <Grid item xs={4}> <div className="kra_img"><label className="maintitle">20</label> &nbsp;&nbsp;<img src={EditIcon} style={{ cursor: 'pointer', width: 19, marginTop: -23 }} /></div> </Grid>

                        </Grid>
                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" >
                            <Grid item xs={4}> <label className="maintitle">Research</label></Grid>
                            <Grid item xs={4}> <label className="maintitle"></label></Grid>
                            <Grid item xs={4}> <div className="kra_img"><label className="maintitle">20</label> &nbsp;&nbsp;<img src={EditIcon} style={{ cursor: 'pointer', width: 19, marginTop: -23 }} /></div> </Grid>

                        </Grid>

                        <Grid item xs={12} container direction="row" className="spaceBtGrid kra_table_row" alignItems="center" style={{ backgroundColor: "#D8D8D8" }}>
                            <Grid item xs={4}><label className="maintitle" style={{ color: 'black' }}>Total </label></Grid>
                            <Grid item xs={4}><label className="maintitle" style={{ color: 'black' }}></label></Grid>
                            <Grid item xs={4}><label className="maintitle" style={{ color: 'black' }}>60</label></Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className="kpi_btn">
                    <CustomButton
                        btnName={"Approve"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        onBtnClick={() => setKramodel(false)}
                    />
                    <CustomButton
                        btnName={"Return"}
                        btnCustomColor="customPrimary"
                        custombtnCSS={"btnUsergroup"}
                        onBtnClick={() => setKramodel(false)}

                    />
                </div>
            </div>

        </div>
    )
}


export default (KRA);